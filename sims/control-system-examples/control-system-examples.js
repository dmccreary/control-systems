// Control System Examples in Daily Life
// Interactive grid showing open-loop vs closed-loop control systems
// Bloom Level: Understand (L2) - identify, classify
// MicroSim template version 2026.02

// Global variables for responsive design
let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

// Control system examples data
const examples = [
  {
    name: "Toaster",
    type: "open-loop",
    icon: "toaster",
    input: "Timer setting",
    output: "Toast darkness",
    feedback: "None - runs for set time regardless of bread color",
    description: "Timer-based operation with no measurement of actual toast color"
  },
  {
    name: "Thermostat",
    type: "closed-loop",
    icon: "thermostat",
    input: "Temperature setpoint",
    output: "Room temperature",
    feedback: "Temperature sensor measures actual room temperature",
    description: "Continuously adjusts heating/cooling based on measured temperature"
  },
  {
    name: "Washing Machine",
    type: "open-loop",
    icon: "washer",
    input: "Cycle selection",
    output: "Clean clothes",
    feedback: "None - fixed cycle regardless of cleanliness",
    description: "Runs predetermined cycles without measuring how clean clothes are"
  },
  {
    name: "Cruise Control",
    type: "closed-loop",
    icon: "car",
    input: "Desired speed",
    output: "Vehicle speed",
    feedback: "Speedometer provides feedback to throttle",
    description: "Adjusts throttle based on actual vs desired speed"
  },
  {
    name: "Fixed Traffic Light",
    type: "open-loop",
    icon: "traffic-fixed",
    input: "Timer schedule",
    output: "Traffic flow",
    feedback: "None - changes on fixed timer regardless of traffic",
    description: "Cycles through colors on a fixed schedule"
  },
  {
    name: "Smart Traffic Light",
    type: "closed-loop",
    icon: "traffic-smart",
    input: "Traffic optimization goal",
    output: "Traffic flow",
    feedback: "Sensors detect vehicles waiting at intersection",
    description: "Adjusts timing based on detected traffic volume"
  }
];

// Grid layout
const cols = 3;
const rows = 2;
let cellWidth, cellHeight;
let selectedExample = null;
let hoverExample = null;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  describe('Interactive grid of 6 control system examples. Click on each icon to see details about whether it uses open-loop or closed-loop control.', LABEL);
}

function draw() {
  updateCanvasSize();

  // Calculate cell dimensions
  cellWidth = (canvasWidth - margin * 2) / cols;
  cellHeight = (drawHeight - 60) / rows; // Leave room for title

  // Drawing area background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Control System Examples in Daily Life', canvasWidth / 2, 10);
  textSize(14);
  fill('#666');
  text('Click on any example to learn more', canvasWidth / 2, 35);

  // Draw grid of examples
  for (let i = 0; i < examples.length; i++) {
    let col = i % cols;
    let row = Math.floor(i / cols);
    let x = margin + col * cellWidth;
    let y = 55 + row * cellHeight;

    drawExampleCard(examples[i], x, y, cellWidth - 10, cellHeight - 10, i);
  }

  // Draw info panel if an example is selected
  if (selectedExample !== null) {
    drawInfoPanel(examples[selectedExample]);
  }

  // Legend in control area
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);

  // Open-loop legend
  fill('#FF8C00');
  rect(20, drawHeight + 15, 20, 20, 3);
  fill('black');
  text('Open-Loop (no feedback)', 50, drawHeight + 25);

  // Closed-loop legend
  fill('#1E90FF');
  rect(canvasWidth / 2 + 20, drawHeight + 15, 20, 20, 3);
  fill('black');
  text('Closed-Loop (with feedback)', canvasWidth / 2 + 50, drawHeight + 25);
}

function drawExampleCard(example, x, y, w, h, index) {
  let isHovered = hoverExample === index;
  let isSelected = selectedExample === index;

  // Card background
  if (example.type === 'open-loop') {
    if (isSelected) {
      fill('#FFB347');
    } else if (isHovered) {
      fill('#FFD699');
    } else {
      fill('#FFF3E6');
    }
    stroke('#FF8C00');
  } else {
    if (isSelected) {
      fill('#87CEEB');
    } else if (isHovered) {
      fill('#B8E0F0');
    } else {
      fill('#E6F3FF');
    }
    stroke('#1E90FF');
  }

  strokeWeight(isSelected ? 3 : 2);
  rect(x, y, w, h, 10);

  // Draw icon (centered, but offset up to make room for larger icons)
  let iconX = x + w / 2;
  let iconY = y + h / 2 - 25;
  drawIcon(example.icon, iconX, iconY, example.type);

  // Label
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(14);
  text(example.name, x + w / 2, y + h - 30);

  // Type indicator
  textSize(11);
  fill(example.type === 'open-loop' ? '#CC6600' : '#0066CC');
  text(example.type === 'open-loop' ? 'Open-Loop' : 'Closed-Loop', x + w / 2, y + h - 15);
}

function drawIcon(iconType, x, y, systemType) {
  let iconColor = systemType === 'open-loop' ? '#CC6600' : '#0066CC';

  push();
  translate(x, y);
  scale(2); // Make icons 2x larger

  switch(iconType) {
    case 'toaster':
      // Toaster body
      stroke(iconColor);
      strokeWeight(1);
      fill('#FFF');
      rect(-25, -15, 50, 35, 5);
      // Slots
      fill(iconColor);
      noStroke();
      rect(-18, -10, 12, 20, 2);
      rect(6, -10, 12, 20, 2);
      // Lever
      stroke(iconColor);
      strokeWeight(1.5);
      line(20, 5, 28, 5);
      break;

    case 'thermostat':
      // Circular thermostat
      stroke(iconColor);
      strokeWeight(1);
      fill('#FFF');
      ellipse(0, 0, 50, 50);
      // Temperature marks
      noFill();
      arc(0, 0, 35, 35, PI + 0.5, TWO_PI - 0.5);
      // Pointer
      fill(iconColor);
      noStroke();
      triangle(-3, 0, 3, 0, 0, -15);
      // Display
      textSize(5);
      textAlign(CENTER, CENTER);
      text('72°', 0, 8);
      break;

    case 'washer':
      // Washer body
      stroke(iconColor);
      strokeWeight(1);
      fill('#FFF');
      rect(-25, -20, 50, 45, 5);
      // Door/drum
      noFill();
      ellipse(0, 5, 30, 30);
      // Control panel
      fill(iconColor);
      noStroke();
      rect(-20, -15, 40, 8, 2);
      break;

    case 'car':
      // Car body
      stroke(iconColor);
      strokeWeight(1);
      fill('#FFF');
      // Body
      beginShape();
      vertex(-25, 5);
      vertex(-25, -5);
      vertex(-15, -5);
      vertex(-10, -15);
      vertex(15, -15);
      vertex(20, -5);
      vertex(25, -5);
      vertex(25, 5);
      endShape(CLOSE);
      // Wheels
      fill(iconColor);
      ellipse(-15, 8, 12, 12);
      ellipse(15, 8, 12, 12);
      // Speedometer indicator
      noFill();
      stroke(iconColor);
      strokeWeight(0.5);
      arc(0, -8, 15, 10, PI, TWO_PI);
      break;

    case 'traffic-fixed':
      // Traffic light pole
      stroke(iconColor);
      strokeWeight(1);
      fill('#FFF');
      rect(-12, -25, 24, 55, 5);
      // Lights (all same size - fixed timing)
      fill('#FFB3B3');
      ellipse(0, -15, 14, 14);
      fill('#FFFFB3');
      ellipse(0, 0, 14, 14);
      fill('#B3FFB3');
      ellipse(0, 15, 14, 14);
      break;

    case 'traffic-smart':
      // Traffic light with sensor
      stroke(iconColor);
      strokeWeight(1);
      fill('#FFF');
      rect(-12, -25, 24, 55, 5);
      // Lights
      fill('#FFB3B3');
      ellipse(0, -15, 14, 14);
      fill('#FFFFB3');
      ellipse(0, 0, 14, 14);
      fill('#90EE90');
      ellipse(0, 15, 14, 14);
      // Sensor waves
      noFill();
      stroke(iconColor);
      strokeWeight(0.5);
      arc(-25, 25, 20, 20, -PI/2, PI/2);
      arc(-25, 25, 30, 30, -PI/2, PI/2);
      break;
  }

  pop();
}

function drawInfoPanel(example) {
  // Semi-transparent overlay
  fill(0, 0, 0, 100);
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Info panel
  let panelWidth = min(canvasWidth - 40, 350);
  let panelHeight = 200;
  let panelX = (canvasWidth - panelWidth) / 2;
  let panelY = (drawHeight - panelHeight) / 2;

  fill(255, 255, 255, 245);
  stroke(example.type === 'open-loop' ? '#FF8C00' : '#1E90FF');
  strokeWeight(3);
  rect(panelX, panelY, panelWidth, panelHeight, 15);

  // Close button
  fill(example.type === 'open-loop' ? '#FF8C00' : '#1E90FF');
  noStroke();
  ellipse(panelX + panelWidth - 20, panelY + 20, 24, 24);
  fill('white');
  textAlign(CENTER, CENTER);
  textSize(16);
  text('X', panelX + panelWidth - 20, panelY + 19);

  // Content
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);

  // Title
  textSize(18);
  text(example.name, panelX + 15, panelY + 15);

  // Type badge
  fill(example.type === 'open-loop' ? '#FF8C00' : '#1E90FF');
  rect(panelX + 15, panelY + 40, example.type === 'open-loop' ? 80 : 95, 22, 5);
  fill('white');
  textSize(12);
  textAlign(CENTER, CENTER);
  text(example.type === 'open-loop' ? 'Open-Loop' : 'Closed-Loop',
       panelX + 15 + (example.type === 'open-loop' ? 40 : 47.5), panelY + 51);

  // Details
  fill('#333');
  textAlign(LEFT, TOP);
  textSize(13);
  let yPos = panelY + 70;
  let lineHeight = 28;

  text('Input: ' + example.input, panelX + 15, yPos);
  text('Output: ' + example.output, panelX + 15, yPos + lineHeight);

  // Feedback (with wrapping)
  textSize(12);
  fill('#555');
  let feedbackText = 'Feedback: ' + example.feedback;
  text(feedbackText, panelX + 15, yPos + lineHeight * 2, panelWidth - 30, 50);
}

function mousePressed() {
  // Check if clicking close button on info panel
  if (selectedExample !== null) {
    let example = examples[selectedExample];
    let panelWidth = min(canvasWidth - 40, 350);
    let panelHeight = 200;
    let panelX = (canvasWidth - panelWidth) / 2;
    let panelY = (drawHeight - panelHeight) / 2;

    let closeX = panelX + panelWidth - 20;
    let closeY = panelY + 20;

    if (dist(mouseX, mouseY, closeX, closeY) < 15) {
      selectedExample = null;
      return;
    }

    // Click outside panel closes it
    if (mouseX < panelX || mouseX > panelX + panelWidth ||
        mouseY < panelY || mouseY > panelY + panelHeight) {
      selectedExample = null;
      return;
    }
    return;
  }

  // Check for card clicks
  if (mouseY < drawHeight && mouseY > 55) {
    for (let i = 0; i < examples.length; i++) {
      let col = i % cols;
      let row = Math.floor(i / cols);
      let x = margin + col * cellWidth;
      let y = 55 + row * cellHeight;

      if (mouseX > x && mouseX < x + cellWidth - 10 &&
          mouseY > y && mouseY < y + cellHeight - 10) {
        selectedExample = i;
        break;
      }
    }
  }
}

function mouseMoved() {
  hoverExample = null;

  if (selectedExample !== null) return;

  if (mouseY < drawHeight && mouseY > 55) {
    for (let i = 0; i < examples.length; i++) {
      let col = i % cols;
      let row = Math.floor(i / cols);
      let x = margin + col * cellWidth;
      let y = 55 + row * cellHeight;

      if (mouseX > x && mouseX < x + cellWidth - 10 &&
          mouseY > y && mouseY < y + cellHeight - 10) {
        hoverExample = i;
        break;
      }
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
