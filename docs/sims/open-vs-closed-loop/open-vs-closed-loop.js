// Open-Loop vs Closed-Loop Comparison Simulator
// Demonstrates disturbance rejection differences between control architectures
// Bloom Level: Analyze (L4) - compare, differentiate
// MicroSim template version 2026.02

// Global variables for responsive design
let containerWidth;
let canvasWidth = 750;
let drawHeight = 400;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 14;

// Plot dimensions (calculated in draw)
let plotWidth, plotHeight;
let leftPlotX, rightPlotX, plotY;

// Simulation parameters
let K = 5;                    // Controller gain for closed-loop
let tau = 1;                  // Plant time constant
let tMax = 10;                // Maximum simulation time
let dt = 0.02;                // Time step
let disturbanceTime = 3;      // Time when disturbance is applied
let disturbanceMag = 0.3;     // Disturbance magnitude

// Simulation state
let time = [];
let olOutput = [];            // Open-loop output
let clOutput = [];            // Closed-loop output
let disturbanceApplied = false;
let isRunning = false;
let currentTime = 0;
let animationSpeed = 0.05;

// UI elements
let disturbanceSlider, gainSlider;
let applyDisturbanceButton, resetButton;

// Colors
const colors = {
  reference: '#1E90FF',       // Blue - reference input
  openLoop: '#FF8C00',        // Orange - open-loop output
  closedLoop: '#228B22',      // Green - closed-loop output
  disturbance: '#DC143C',     // Red - disturbance indicator
  grid: '#E0E0E0',
  axis: '#333333',
  text: '#000000',
  background: '#F8FAFC',
  plotBg: '#FFFFFF'
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textFont('Arial');

  // Initialize simulation
  initializeSimulation();

  // Create UI controls
  createControls();

  describe('Side-by-side comparison of open-loop and closed-loop control systems showing disturbance rejection. Apply disturbance to see how feedback enables the closed-loop system to recover.', LABEL);
}

function createControls() {
  let controlY = drawHeight + 15;
  let sliderWidth = 120;

  // Apply Disturbance button
  applyDisturbanceButton = createButton('Apply Disturbance');
  applyDisturbanceButton.position(10, controlY);
  applyDisturbanceButton.mousePressed(applyDisturbance);
  applyDisturbanceButton.style('padding', '8px 16px');
  applyDisturbanceButton.style('font-size', '13px');
  applyDisturbanceButton.style('background-color', '#DC143C');
  applyDisturbanceButton.style('color', 'white');
  applyDisturbanceButton.style('border', 'none');
  applyDisturbanceButton.style('border-radius', '4px');
  applyDisturbanceButton.style('cursor', 'pointer');

  // Reset button
  resetButton = createButton('Reset Both');
  resetButton.position(165, controlY);
  resetButton.mousePressed(resetSimulation);
  resetButton.style('padding', '8px 16px');
  resetButton.style('font-size', '13px');
  resetButton.style('border-radius', '4px');
  resetButton.style('cursor', 'pointer');

  // Disturbance magnitude slider
  disturbanceSlider = createSlider(-0.5, 0.5, disturbanceMag, 0.05);
  disturbanceSlider.position(430, controlY);
  disturbanceSlider.size(sliderWidth);
  disturbanceSlider.input(onDisturbanceChange);

  // Gain slider
  gainSlider = createSlider(1, 10, K, 0.5);
  gainSlider.position(430, controlY + 40);
  gainSlider.size(sliderWidth);
  gainSlider.input(onGainChange);
}

function onDisturbanceChange() {
  disturbanceMag = disturbanceSlider.value();
  if (disturbanceApplied) {
    calculateResponses();
  }
}

function onGainChange() {
  K = gainSlider.value();
  calculateResponses();
}

function initializeSimulation() {
  time = [];
  olOutput = [];
  clOutput = [];
  disturbanceApplied = false;
  currentTime = tMax;

  // Generate time array
  for (let t = 0; t <= tMax; t += dt) {
    time.push(t);
  }

  calculateResponses();
}

function calculateResponses() {
  olOutput = [];
  clOutput = [];

  // Both systems are calibrated to reach output = 1 with no disturbance
  // Open-loop: uses fixed gain of 1 (pre-calibrated)
  // Closed-loop: uses proportional gain K

  for (let i = 0; i < time.length; i++) {
    let t = time[i];

    // Reference is always 1 (we want output = 1)
    let r = 1;

    // Disturbance enters after disturbanceTime
    let d = 0;
    if (disturbanceApplied && t >= disturbanceTime) {
      d = disturbanceMag;
    }

    // Open-loop response with disturbance
    // Output = input + disturbance (simplified first-order at steady state)
    // For first-order plant G_p = 1/(tau*s + 1), with input u = 1
    // The open-loop steady-state output = 1 (calibrated)
    // With disturbance d acting on output: y_ol = 1 + d (disturbance enters at output)
    let tElapsed = t;
    let yOL = (1 - Math.exp(-tElapsed / tau)); // Startup transient
    if (disturbanceApplied && t >= disturbanceTime) {
      // Disturbance shifts output permanently in open-loop
      let tSinceD = t - disturbanceTime;
      let disturbanceEffect = d * (1 - Math.exp(-tSinceD / tau));
      yOL += disturbanceEffect;
    }
    olOutput.push(yOL);

    // Closed-loop response with disturbance
    // For closed-loop with proportional controller K and plant 1/(tau*s + 1):
    // CL transfer function: K / (tau*s + 1 + K)
    // Steady-state to reference: y_ss = K / (1 + K)
    // Effect of disturbance: attenuated by factor 1/(1 + K)
    let tauCL = tau / (1 + K);
    let ySS = K / (1 + K);
    let yCL = ySS * (1 - Math.exp(-t / tauCL));

    if (disturbanceApplied && t >= disturbanceTime) {
      // Disturbance effect is attenuated in closed-loop
      let tSinceD = t - disturbanceTime;
      let disturbanceAttenuation = 1 / (1 + K);
      let disturbanceEffect = d * disturbanceAttenuation * (1 - Math.exp(-tSinceD / tauCL));
      yCL += disturbanceEffect;
    }
    clOutput.push(yCL);
  }
}

function applyDisturbance() {
  if (!disturbanceApplied) {
    disturbanceApplied = true;
    disturbanceTime = 3; // Fixed at t = 3
    calculateResponses();
    applyDisturbanceButton.html('Disturbance Applied');
    applyDisturbanceButton.style('background-color', '#888');
  }
}

function resetSimulation() {
  disturbanceApplied = false;
  currentTime = tMax;
  K = 5;
  disturbanceMag = 0.3;
  gainSlider.value(K);
  disturbanceSlider.value(disturbanceMag);
  applyDisturbanceButton.html('Apply Disturbance');
  applyDisturbanceButton.style('background-color', '#DC143C');
  calculateResponses();
}

function draw() {
  updateCanvasSize();

  // Calculate plot dimensions
  let plotGap = 30;
  plotWidth = (canvasWidth - 3 * margin - plotGap) / 2;
  plotHeight = drawHeight - 120;
  leftPlotX = margin + 30;
  rightPlotX = leftPlotX + plotWidth + plotGap + 20;
  plotY = 70;

  // Drawing area background
  fill(colors.background);
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Update parameters from sliders
  disturbanceMag = disturbanceSlider.value();
  K = gainSlider.value();

  // Draw main title
  fill(colors.text);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Open-Loop vs Closed-Loop: Disturbance Rejection', canvasWidth / 2, 10);

  // Draw subtitle
  textSize(11);
  fill('#666');
  text('Compare how each architecture responds when a disturbance is applied at t = 3s', canvasWidth / 2, 32);

  // Draw both plots
  drawPlot(leftPlotX, plotY, plotWidth, plotHeight, 'Open-Loop Control', olOutput, colors.openLoop, true);
  drawPlot(rightPlotX, plotY, plotWidth, plotHeight, 'Closed-Loop Control (K=' + K.toFixed(1) + ')', clOutput, colors.closedLoop, false);

  // Draw comparison stats
  drawComparisonStats();

  // Draw control labels
  drawControlLabels();
}

function drawPlot(px, py, pw, ph, title, outputData, outputColor, isOpenLoop) {
  // Plot background
  fill(colors.plotBg);
  stroke(isOpenLoop ? '#FFE4C4' : '#E0FFE0');
  strokeWeight(2);
  rect(px, py, pw, ph);

  // Grid lines
  stroke(colors.grid);
  strokeWeight(0.5);

  // Vertical grid (time)
  for (let t = 0; t <= tMax; t += 2) {
    let x = map(t, 0, tMax, px, px + pw);
    line(x, py, x, py + ph);
  }

  // Horizontal grid (amplitude)
  for (let a = 0; a <= 1.5; a += 0.25) {
    let y = map(a, 0, 1.5, py + ph, py);
    line(px, y, px + pw, y);
  }

  // Disturbance indicator
  if (disturbanceApplied) {
    let dX = map(disturbanceTime, 0, tMax, px, px + pw);
    stroke(colors.disturbance);
    strokeWeight(2);
    drawingContext.setLineDash([4, 4]);
    line(dX, py, dX, py + ph);
    drawingContext.setLineDash([]);

    // Disturbance label
    noStroke();
    fill(colors.disturbance);
    textAlign(CENTER, BOTTOM);
    textSize(9);
    text('d(t)', dX, py - 2);

    // Arrow pointing down
    stroke(colors.disturbance);
    strokeWeight(1.5);
    let arrowY = py + 15;
    line(dX, py + 5, dX, arrowY);
    line(dX - 4, arrowY - 5, dX, arrowY);
    line(dX + 4, arrowY - 5, dX, arrowY);
  }

  // Reference line at y = 1
  stroke(colors.reference);
  strokeWeight(1.5);
  drawingContext.setLineDash([6, 3]);
  let refY = map(1, 0, 1.5, py + ph, py);
  line(px, refY, px + pw, refY);
  drawingContext.setLineDash([]);

  // Draw output trajectory
  stroke(outputColor);
  strokeWeight(2.5);
  noFill();
  beginShape();
  for (let i = 0; i < time.length; i++) {
    let x = map(time[i], 0, tMax, px, px + pw);
    let y = map(outputData[i], 0, 1.5, py + ph, py);
    vertex(x, y);
  }
  endShape();

  // Axes
  stroke(colors.axis);
  strokeWeight(1.5);
  line(px, py + ph, px + pw, py + ph); // X-axis
  line(px, py, px, py + ph);           // Y-axis

  // Title with border color
  noStroke();
  fill(isOpenLoop ? '#D2691E' : '#228B22');
  textAlign(CENTER, BOTTOM);
  textSize(13);
  textStyle(BOLD);
  text(title, px + pw/2, py - 5);
  textStyle(NORMAL);

  // X-axis label
  fill(colors.text);
  textAlign(CENTER, TOP);
  textSize(10);
  text('Time (s)', px + pw/2, py + ph + 18);

  // X-axis tick labels
  textSize(9);
  for (let t = 0; t <= tMax; t += 2) {
    let x = map(t, 0, tMax, px, px + pw);
    text(t, x, py + ph + 5);
  }

  // Y-axis tick labels
  textAlign(RIGHT, CENTER);
  for (let a = 0; a <= 1.5; a += 0.5) {
    let y = map(a, 0, 1.5, py + ph, py);
    text(a.toFixed(1), px - 5, y);
  }

  // Calculate and display steady-state error
  let ssOutput = outputData[outputData.length - 1];
  let ssError = Math.abs(1 - ssOutput);

  // Steady-state indicator
  let ssY = map(ssOutput, 0, 1.5, py + ph, py);
  stroke(outputColor);
  strokeWeight(1);
  drawingContext.setLineDash([2, 2]);
  line(px + pw - 30, ssY, px + pw, ssY);
  drawingContext.setLineDash([]);

  // SS value label
  noStroke();
  fill(outputColor);
  textAlign(LEFT, CENTER);
  textSize(9);
  text('y=' + ssOutput.toFixed(2), px + pw + 3, ssY);

  // Error display box
  let errBoxY = py + ph - 45;
  let errBoxW = 85;
  let errBoxH = 35;

  fill(255, 255, 255, 230);
  stroke(outputColor);
  strokeWeight(1);
  rect(px + pw - errBoxW - 5, errBoxY, errBoxW, errBoxH, 4);

  noStroke();
  fill(colors.text);
  textAlign(LEFT, TOP);
  textSize(9);
  text('SS Error:', px + pw - errBoxW, errBoxY + 5);

  fill(ssError > 0.1 ? colors.disturbance : colors.closedLoop);
  textStyle(BOLD);
  textSize(12);
  text(ssError.toFixed(3), px + pw - errBoxW, errBoxY + 18);
  textStyle(NORMAL);
}

function drawComparisonStats() {
  if (!disturbanceApplied) return;

  // Calculate steady-state errors
  let olSS = olOutput[olOutput.length - 1];
  let clSS = clOutput[clOutput.length - 1];
  let olError = Math.abs(1 - olSS);
  let clError = Math.abs(1 - clSS);

  // Error reduction percentage
  let reduction = 0;
  if (olError > 0.001) {
    reduction = ((olError - clError) / olError) * 100;
  }

  // Comparison box at bottom center
  let boxX = canvasWidth / 2 - 140;
  let boxY = drawHeight - 45;
  let boxW = 280;
  let boxH = 38;

  fill('#E8F4E8');
  stroke('#228B22');
  strokeWeight(2);
  rect(boxX, boxY, boxW, boxH, 6);

  noStroke();
  fill('#228B22');
  textAlign(CENTER, CENTER);
  textSize(12);
  textStyle(BOLD);

  if (reduction > 0) {
    text('Closed-loop reduces error by ' + reduction.toFixed(0) + '%', boxX + boxW/2, boxY + 12);
  } else {
    text('Compare the steady-state errors above', boxX + boxW/2, boxY + 12);
  }

  textStyle(NORMAL);
  textSize(10);
  fill('#333');
  text('Feedback enables automatic disturbance rejection!', boxX + boxW/2, boxY + 27);
}

function drawControlLabels() {
  noStroke();
  fill(colors.text);
  textAlign(LEFT, CENTER);
  textSize(12);

  // Disturbance slider label
  text('Disturbance d: ' + disturbanceMag.toFixed(2), 280, drawHeight + 25);

  // Gain slider label
  text('CL Gain K: ' + K.toFixed(1), 280, drawHeight + 65);

  // Instructions
  textSize(10);
  fill('#666');
  textAlign(RIGHT, CENTER);
  text('Adjust K to see how gain affects disturbance rejection', canvasWidth - 20, drawHeight + 85);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);

  // Resize sliders
  let sliderWidth = min(120, canvasWidth - 500);
  if (sliderWidth > 60) {
    disturbanceSlider.size(sliderWidth);
    gainSlider.size(sliderWidth);
  }

  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
