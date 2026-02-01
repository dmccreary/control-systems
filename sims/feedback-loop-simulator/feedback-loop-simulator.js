// Interactive Feedback Loop Simulator
// Demonstrates how controller gain affects closed-loop step response
// Bloom Level: Apply (L3) - demonstrate, execute
// MicroSim template version 2026.02

// Global variables for responsive design
let containerWidth;
let canvasWidth = 750;
let drawHeight = 450;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 14;

// Plot dimensions
let plotLeft, plotRight, plotTop, plotBottom, plotWidth, plotHeight;

// Simulation parameters
let K = 2;           // Controller gain (default)
let tau = 1;         // Plant time constant (default)
let tMax = 10;       // Maximum simulation time
let dt = 0.02;       // Time step
let stepTime = 1;    // Time when step input occurs
let stepMagnitude = 1; // Step input magnitude

// Simulation state
let time = [];
let reference = [];
let output = [];
let isRunning = false;
let currentTime = 0;
let animationSpeed = 0.05; // seconds per frame

// UI elements
let gainSlider, tauSlider;
let runButton, resetButton;
let showErrorCheckbox;
let showError = false;

// Colors
const colors = {
  reference: '#1E90FF',    // Blue - reference input
  output: '#FF8C00',       // Orange - system output
  error: 'rgba(255, 100, 100, 0.3)', // Light red - error region
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

  // Initialize data arrays
  initializeSimulation();

  // Create UI controls
  createControls();

  describe('Interactive feedback loop simulator. Adjust controller gain K and plant time constant tau to observe step response behavior.', LABEL);
}

function createControls() {
  let controlY = drawHeight + 15;
  let sliderWidth = 150;

  // Gain slider
  gainSlider = createSlider(0.5, 10, K, 0.1);
  gainSlider.position(100, controlY);
  gainSlider.size(sliderWidth);
  gainSlider.input(onParameterChange);

  // Tau slider
  tauSlider = createSlider(0.5, 3, tau, 0.1);
  tauSlider.position(100, controlY + 35);
  tauSlider.size(sliderWidth);
  tauSlider.input(onParameterChange);

  // Run button
  runButton = createButton('Run');
  runButton.position(280, controlY);
  runButton.mousePressed(toggleSimulation);
  runButton.style('padding', '8px 20px');
  runButton.style('font-size', '14px');

  // Reset button
  resetButton = createButton('Reset');
  resetButton.position(385, controlY);
  resetButton.mousePressed(resetSimulation);
  resetButton.style('padding', '8px 20px');
  resetButton.style('font-size', '14px');

  // Show error checkbox
  showErrorCheckbox = createCheckbox(' Show error region', false);
  showErrorCheckbox.position(280, controlY + 35);
  showErrorCheckbox.changed(() => {
    showError = showErrorCheckbox.checked();
  });
}

function onParameterChange() {
  K = gainSlider.value();
  tau = tauSlider.value();

  // Recalculate if not running
  if (!isRunning) {
    calculateFullResponse();
  }
}

function initializeSimulation() {
  time = [];
  reference = [];
  output = [];

  // Generate time array
  for (let t = 0; t <= tMax; t += dt) {
    time.push(t);
  }

  calculateFullResponse();
}

function calculateFullResponse() {
  reference = [];
  output = [];

  // Closed-loop parameters
  let ySS = K / (1 + K);           // Steady-state output
  let tauCL = tau / (1 + K);       // Closed-loop time constant

  for (let i = 0; i < time.length; i++) {
    let t = time[i];

    // Reference: step at t = stepTime
    let r = (t >= stepTime) ? stepMagnitude : 0;
    reference.push(r);

    // Output: first-order step response
    let y = 0;
    if (t >= stepTime) {
      let tElapsed = t - stepTime;
      y = ySS * stepMagnitude * (1 - Math.exp(-tElapsed / tauCL));
    }
    output.push(y);
  }

  currentTime = tMax; // Show full response when not animating
}

function toggleSimulation() {
  if (isRunning) {
    isRunning = false;
    runButton.html('Run');
  } else {
    // Start animation from beginning
    currentTime = 0;
    isRunning = true;
    runButton.html('Pause');
  }
}

function resetSimulation() {
  isRunning = false;
  runButton.html('Run');
  currentTime = 0;
  K = 2;
  tau = 1;
  gainSlider.value(K);
  tauSlider.value(tau);
  calculateFullResponse();
}

function draw() {
  updateCanvasSize();

  // Update plot dimensions based on canvas width
  plotLeft = 70;
  plotRight = canvasWidth - 220;
  plotTop = 80;
  plotBottom = drawHeight - 40;
  plotWidth = plotRight - plotLeft;
  plotHeight = plotBottom - plotTop;

  // Drawing area background
  fill(colors.background);
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Update parameters from sliders
  K = gainSlider.value();
  tau = tauSlider.value();

  // Animate if running
  if (isRunning) {
    currentTime += animationSpeed;
    if (currentTime >= tMax) {
      currentTime = tMax;
      isRunning = false;
      runButton.html('Run Again');
    }
  }

  // Draw title
  fill(colors.text);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Interactive Feedback Loop Simulator', canvasWidth / 2 - 80, 10);

  // Draw subtitle with system equation
  textSize(12);
  fill('#666');
  text('Closed-loop: G(s) = K / (τs + 1 + K)', canvasWidth / 2 - 80, 35);

  // Draw mini block diagram
  drawMiniBlockDiagram();

  // Draw the time-domain plot
  drawPlot();

  // Draw info panel on right side
  drawInfoPanel();

  // Draw control labels
  drawControlLabels();
}

function drawMiniBlockDiagram() {
  let bdX = canvasWidth - 190;
  let bdY = 15;
  let bdW = 170;
  let bdH = 50;

  // Background
  fill(255, 255, 255, 200);
  stroke('#CCC');
  strokeWeight(1);
  rect(bdX, bdY, bdW, bdH, 5);

  // Mini diagram
  let cx = bdX + bdW/2;
  let cy = bdY + bdH/2;

  // Summing junction
  stroke(colors.reference);
  strokeWeight(1.5);
  noFill();
  ellipse(cx - 50, cy, 12, 12);

  // Controller block
  fill('#E8E8E8');
  stroke('#333');
  rect(cx - 35, cy - 8, 30, 16, 2);

  // Plant block
  rect(cx + 5, cy - 8, 30, 16, 2);

  // Labels
  noStroke();
  fill(colors.text);
  textAlign(CENTER, CENTER);
  textSize(8);
  text('K', cx - 20, cy);
  text('Gp', cx + 20, cy);

  // Arrows
  stroke(colors.reference);
  strokeWeight(1);
  line(cx - 60, cy, cx - 56, cy); // Input
  line(cx - 44, cy, cx - 35, cy); // To controller
  line(cx - 5, cy, cx + 5, cy);   // To plant
  line(cx + 35, cy, cx + 50, cy); // Output

  // Feedback path
  stroke(colors.output);
  line(cx + 45, cy, cx + 45, cy + 15);
  line(cx + 45, cy + 15, cx - 50, cy + 15);
  line(cx - 50, cy + 15, cx - 50, cy + 6);

  // Title
  textSize(9);
  fill('#666');
  text('Block Diagram', cx, bdY + 8);
}

function drawPlot() {
  // Plot background
  fill(colors.plotBg);
  stroke('#CCC');
  strokeWeight(1);
  rect(plotLeft, plotTop, plotWidth, plotHeight);

  // Grid lines
  stroke(colors.grid);
  strokeWeight(0.5);

  // Vertical grid (time)
  for (let t = 0; t <= tMax; t += 1) {
    let x = map(t, 0, tMax, plotLeft, plotRight);
    line(x, plotTop, x, plotBottom);
  }

  // Horizontal grid (amplitude)
  for (let a = 0; a <= 1.5; a += 0.25) {
    let y = map(a, 0, 1.5, plotBottom, plotTop);
    line(plotLeft, y, plotRight, y);
  }

  // Draw error region if enabled
  if (showError && currentTime > stepTime) {
    fill(colors.error);
    noStroke();
    beginShape();
    for (let i = 0; i < time.length; i++) {
      if (time[i] <= currentTime && time[i] >= stepTime) {
        let x = map(time[i], 0, tMax, plotLeft, plotRight);
        let yRef = map(reference[i], 0, 1.5, plotBottom, plotTop);
        vertex(x, yRef);
      }
    }
    for (let i = time.length - 1; i >= 0; i--) {
      if (time[i] <= currentTime && time[i] >= stepTime) {
        let x = map(time[i], 0, tMax, plotLeft, plotRight);
        let yOut = map(output[i], 0, 1.5, plotBottom, plotTop);
        vertex(x, yOut);
      }
    }
    endShape(CLOSE);
  }

  // Draw reference input (blue dashed)
  stroke(colors.reference);
  strokeWeight(2);
  drawingContext.setLineDash([8, 4]);
  noFill();
  beginShape();
  for (let i = 0; i < time.length; i++) {
    if (time[i] <= currentTime) {
      let x = map(time[i], 0, tMax, plotLeft, plotRight);
      let y = map(reference[i], 0, 1.5, plotBottom, plotTop);
      vertex(x, y);
    }
  }
  endShape();
  drawingContext.setLineDash([]);

  // Draw system output (orange solid)
  stroke(colors.output);
  strokeWeight(2.5);
  noFill();
  beginShape();
  for (let i = 0; i < time.length; i++) {
    if (time[i] <= currentTime) {
      let x = map(time[i], 0, tMax, plotLeft, plotRight);
      let y = map(output[i], 0, 1.5, plotBottom, plotTop);
      vertex(x, y);
    }
  }
  endShape();

  // Draw steady-state reference line
  if (currentTime > stepTime) {
    let ySS = K / (1 + K);
    let ySteady = map(ySS, 0, 1.5, plotBottom, plotTop);
    stroke('#FF8C00');
    strokeWeight(1);
    drawingContext.setLineDash([4, 4]);
    line(plotLeft, ySteady, plotRight, ySteady);
    drawingContext.setLineDash([]);

    // Label
    noStroke();
    fill(colors.output);
    textAlign(LEFT, CENTER);
    textSize(10);
    text('y_ss=' + ySS.toFixed(2), plotRight + 5, ySteady);
  }

  // Axes
  stroke(colors.axis);
  strokeWeight(1.5);
  line(plotLeft, plotBottom, plotRight, plotBottom); // X-axis
  line(plotLeft, plotTop, plotLeft, plotBottom);     // Y-axis

  // Axis labels
  noStroke();
  fill(colors.text);
  textAlign(CENTER, TOP);
  textSize(12);
  text('Time (seconds)', (plotLeft + plotRight) / 2, plotBottom + 20);

  textAlign(CENTER, CENTER);
  push();
  translate(plotLeft - 45, (plotTop + plotBottom) / 2);
  rotate(-PI / 2);
  text('Amplitude', 0, 0);
  pop();

  // X-axis tick labels
  textAlign(CENTER, TOP);
  textSize(10);
  for (let t = 0; t <= tMax; t += 2) {
    let x = map(t, 0, tMax, plotLeft, plotRight);
    text(t, x, plotBottom + 5);
  }

  // Y-axis tick labels
  textAlign(RIGHT, CENTER);
  for (let a = 0; a <= 1.5; a += 0.5) {
    let y = map(a, 0, 1.5, plotBottom, plotTop);
    text(a.toFixed(1), plotLeft - 8, y);
  }

  // Legend
  let legX = plotLeft + 10;
  let legY = plotTop + 10;

  stroke(colors.reference);
  strokeWeight(2);
  drawingContext.setLineDash([8, 4]);
  line(legX, legY, legX + 30, legY);
  drawingContext.setLineDash([]);

  noStroke();
  fill(colors.text);
  textAlign(LEFT, CENTER);
  textSize(11);
  text('Reference r(t)', legX + 35, legY);

  stroke(colors.output);
  strokeWeight(2.5);
  line(legX, legY + 18, legX + 30, legY + 18);

  noStroke();
  text('Output y(t)', legX + 35, legY + 18);
}

function drawInfoPanel() {
  let panelX = canvasWidth - 200;
  let panelY = 70;
  let panelW = 185;
  let panelH = drawHeight - 90;

  // Panel background
  fill(255, 255, 255, 240);
  stroke('#CCC');
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 8);

  // Title
  noStroke();
  fill(colors.text);
  textAlign(CENTER, TOP);
  textSize(14);
  textStyle(BOLD);
  text('System Parameters', panelX + panelW/2, panelY + 10);
  textStyle(NORMAL);

  // Calculate derived values
  let ySS = K / (1 + K);
  let eSS = 1 / (1 + K);
  let tauCL = tau / (1 + K);
  let settlingTime = 4 * tauCL; // 2% criterion

  // Parameter display
  let infoY = panelY + 40;
  let lineHeight = 28;

  textAlign(LEFT, TOP);
  textSize(12);

  // Controller gain
  fill('#333');
  text('Controller Gain:', panelX + 10, infoY);
  fill(colors.reference);
  textAlign(RIGHT, TOP);
  textStyle(BOLD);
  text('K = ' + K.toFixed(1), panelX + panelW - 10, infoY);
  textStyle(NORMAL);

  // Plant time constant
  infoY += lineHeight;
  fill('#333');
  textAlign(LEFT, TOP);
  text('Plant Time Const:', panelX + 10, infoY);
  fill('#666');
  textAlign(RIGHT, TOP);
  text('τ = ' + tau.toFixed(2) + ' s', panelX + panelW - 10, infoY);

  // Divider
  infoY += lineHeight + 5;
  stroke('#DDD');
  line(panelX + 10, infoY, panelX + panelW - 10, infoY);
  infoY += 15;

  // Calculated values header
  noStroke();
  fill('#666');
  textAlign(LEFT, TOP);
  textSize(11);
  textStyle(ITALIC);
  text('Calculated Values:', panelX + 10, infoY);
  textStyle(NORMAL);
  infoY += 22;
  textSize(12);

  // Closed-loop time constant
  fill('#333');
  textAlign(LEFT, TOP);
  text('CL Time Const:', panelX + 10, infoY);
  textAlign(RIGHT, TOP);
  fill('#666');
  text('τ_CL = ' + tauCL.toFixed(3) + ' s', panelX + panelW - 10, infoY);

  // Steady-state output
  infoY += lineHeight;
  fill('#333');
  textAlign(LEFT, TOP);
  text('Steady-State:', panelX + 10, infoY);
  fill(colors.output);
  textAlign(RIGHT, TOP);
  text('y_ss = ' + ySS.toFixed(3), panelX + panelW - 10, infoY);

  // Steady-state error
  infoY += lineHeight;
  fill('#333');
  textAlign(LEFT, TOP);
  text('SS Error:', panelX + 10, infoY);
  fill('#DC143C');
  textAlign(RIGHT, TOP);
  textStyle(BOLD);
  text('e_ss = ' + eSS.toFixed(3), panelX + panelW - 10, infoY);
  textStyle(NORMAL);

  // Settling time
  infoY += lineHeight;
  fill('#333');
  textAlign(LEFT, TOP);
  text('Settling Time:', panelX + 10, infoY);
  fill('#666');
  textAlign(RIGHT, TOP);
  text('t_s ≈ ' + settlingTime.toFixed(2) + ' s', panelX + panelW - 10, infoY);

  // Insight box
  infoY += lineHeight + 15;
  fill('#E8F4E8');
  stroke('#228B22');
  strokeWeight(1);
  rect(panelX + 5, infoY, panelW - 10, 65, 5);

  noStroke();
  fill('#228B22');
  textAlign(LEFT, TOP);
  textSize(10);
  textStyle(BOLD);
  text('Insight:', panelX + 12, infoY + 8);
  textStyle(NORMAL);

  fill('#333');
  textSize(9);
  let insight = 'Higher K → Faster response\nHigher K → Less SS error\nBut: K cannot eliminate all error';
  text(insight, panelX + 12, infoY + 22, panelW - 24, 50);
}

function drawControlLabels() {
  noStroke();
  fill(colors.text);
  textAlign(LEFT, CENTER);
  textSize(13);

  // Gain slider label
  text('Gain K: ' + K.toFixed(1), 10, drawHeight + 25);

  // Tau slider label
  text('Tau τ: ' + tau.toFixed(2), 10, drawHeight + 60);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);

  // Resize sliders
  let sliderWidth = min(150, canvasWidth - 400);
  gainSlider.size(sliderWidth);
  tauSlider.size(sliderWidth);

  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
