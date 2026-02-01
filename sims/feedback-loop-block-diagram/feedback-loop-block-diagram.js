// Standard Feedback Control Loop Block Diagram
// Interactive block diagram showing signal flow through a closed-loop control system
// Bloom Level: Understand (L2) - explain, describe
// MicroSim template version 2026.02

// Global variables for responsive design
let containerWidth;
let canvasWidth = 800;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 20;
let defaultTextSize = 14;

// Block diagram components
let blocks = [];
let signals = [];
let summingJunction = null;

// Interaction state
let hoveredElement = null;
let selectedElement = null;

// Color scheme
const colors = {
  reference: '#1E90FF',      // Blue - reference/command path
  feedback: '#228B22',       // Green - feedback path
  disturbance: '#DC143C',    // Red - disturbance
  plant: '#696969',          // Gray - plant/actuator
  controller: '#4169E1',     // Royal blue - controller
  sensor: '#228B22',         // Green - sensor
  background: '#F0F8FF',     // Alice blue
  blockFill: '#FFFFFF',
  blockStroke: '#333333',
  highlight: '#FFD700',      // Gold highlight
  textColor: '#000000'
};

// Component descriptions
const descriptions = {
  'Reference Input': {
    symbol: 'r(t)',
    description: 'The desired output or setpoint. This is what we want the system to achieve.',
    example: 'For cruise control: the speed you set (e.g., 65 mph)'
  },
  'Summing Junction': {
    symbol: '\u03A3',
    description: 'Computes the error signal by subtracting the measured output from the reference input: e(t) = r(t) - y_m(t)',
    example: 'Compares desired speed to actual speed'
  },
  'Error Signal': {
    symbol: 'e(t)',
    description: 'The difference between reference and measured output. Drives the controller action.',
    example: 'If desired = 65 mph, actual = 60 mph, then error = +5 mph'
  },
  'Controller': {
    symbol: 'G_c(s)',
    description: 'Processes the error signal and determines the control action. Implements the control law (e.g., PID).',
    example: 'Decides how much to adjust the throttle based on speed error'
  },
  'Control Signal': {
    symbol: 'u(t)',
    description: 'The command signal from the controller to the actuator.',
    example: 'Voltage or command signal to the throttle servo'
  },
  'Actuator': {
    symbol: '',
    description: 'Converts the control signal into physical action on the plant. The "muscle" of the system.',
    example: 'Throttle servo that adjusts engine power'
  },
  'Plant': {
    symbol: 'G_p(s)',
    description: 'The physical system being controlled. This is what we want to regulate.',
    example: 'The vehicle itself (engine, transmission, mass)'
  },
  'Output': {
    symbol: 'y(t)',
    description: 'The actual system response - the quantity we are trying to control.',
    example: 'The actual vehicle speed'
  },
  'Disturbance': {
    symbol: 'd(t)',
    description: 'Unwanted inputs that affect the system. Feedback helps reject these automatically.',
    example: 'Hills, wind, or road surface changes'
  },
  'Sensor': {
    symbol: 'H(s)',
    description: 'Measures the plant output and converts it to a signal for comparison. Closes the feedback loop.',
    example: 'Speedometer measuring actual vehicle speed'
  },
  'Measured Output': {
    symbol: 'y_m(t)',
    description: 'The sensor measurement fed back to the summing junction.',
    example: 'Speed reading from the speedometer'
  }
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textFont('Arial');

  initializeComponents();

  describe('Interactive feedback control loop block diagram. Hover over components to see descriptions. Click to highlight signal paths.', LABEL);
}

function initializeComponents() {
  blocks = [];
  signals = [];

  // Calculate positions based on canvas width
  let startX = margin + 30;
  let endX = canvasWidth - margin - 30;
  let centerY = drawHeight / 2 + 50;
  let blockWidth = 90;
  let blockHeight = 45;
  let spacing = (endX - startX - blockWidth * 3) / 4;

  // Summing junction position
  let sjX = startX + 60;
  let sjY = centerY;
  summingJunction = {
    x: sjX,
    y: sjY,
    radius: 18,
    name: 'Summing Junction',
    type: 'junction'
  };

  // Controller block
  let ctrlX = sjX + spacing;
  blocks.push({
    x: ctrlX,
    y: centerY - blockHeight/2,
    w: blockWidth,
    h: blockHeight,
    name: 'Controller',
    label: 'Controller',
    sublabel: 'Gc(s)',
    color: colors.controller,
    type: 'block'
  });

  // Actuator block
  let actX = ctrlX + blockWidth + spacing * 0.7;
  blocks.push({
    x: actX,
    y: centerY - blockHeight/2,
    w: blockWidth * 0.8,
    h: blockHeight,
    name: 'Actuator',
    label: 'Actuator',
    sublabel: '',
    color: colors.plant,
    type: 'block'
  });

  // Plant block
  let plantX = actX + blockWidth * 0.8 + spacing * 0.7;
  blocks.push({
    x: plantX,
    y: centerY - blockHeight/2,
    w: blockWidth,
    h: blockHeight,
    name: 'Plant',
    label: 'Plant',
    sublabel: 'Gp(s)',
    color: colors.plant,
    type: 'block'
  });

  // Sensor block (in feedback path)
  let sensorX = (sjX + plantX + blockWidth) / 2 - blockWidth/2;
  let sensorY = centerY + 80;
  blocks.push({
    x: sensorX,
    y: sensorY,
    w: blockWidth,
    h: blockHeight,
    name: 'Sensor',
    label: 'Sensor',
    sublabel: 'H(s)',
    color: colors.sensor,
    type: 'block'
  });

  // Define signals (arrows)
  // Reference input
  signals.push({
    x1: startX - 20,
    y1: centerY,
    x2: sjX - summingJunction.radius - 5,
    y2: centerY,
    name: 'Reference Input',
    label: 'r(t)',
    color: colors.reference,
    labelPos: 'above'
  });

  // Error signal
  signals.push({
    x1: sjX + summingJunction.radius + 5,
    y1: centerY,
    x2: ctrlX,
    y2: centerY,
    name: 'Error Signal',
    label: 'e(t)',
    color: colors.reference,
    labelPos: 'above'
  });

  // Control signal
  signals.push({
    x1: ctrlX + blockWidth,
    y1: centerY,
    x2: actX,
    y2: centerY,
    name: 'Control Signal',
    label: 'u(t)',
    color: colors.reference,
    labelPos: 'above'
  });

  // Actuator to Plant
  signals.push({
    x1: actX + blockWidth * 0.8,
    y1: centerY,
    x2: plantX,
    y2: centerY,
    name: 'Actuator Output',
    label: '',
    color: colors.plant,
    labelPos: 'above'
  });

  // Output signal
  let outputEndX = endX + 20;
  signals.push({
    x1: plantX + blockWidth,
    y1: centerY,
    x2: outputEndX,
    y2: centerY,
    name: 'Output',
    label: 'y(t)',
    color: colors.reference,
    labelPos: 'above'
  });

  // Disturbance (from above)
  let distX = plantX + blockWidth/2;
  signals.push({
    x1: distX,
    y1: centerY - 100,
    x2: distX,
    y2: centerY - blockHeight/2 - 5,
    name: 'Disturbance',
    label: 'd(t)',
    color: colors.disturbance,
    labelPos: 'right',
    isDisturbance: true
  });

  // Feedback path: output to sensor
  let feedbackTapX = plantX + blockWidth + 30;
  signals.push({
    x1: feedbackTapX,
    y1: centerY,
    x2: feedbackTapX,
    y2: sensorY + blockHeight/2,
    name: 'Output to Sensor',
    label: '',
    color: colors.feedback,
    labelPos: 'right',
    isFeedback: true,
    noArrow: true
  });

  // Sensor input (horizontal part going to sensor)
  signals.push({
    x1: feedbackTapX,
    y1: sensorY + blockHeight/2,
    x2: sensorX + blockWidth,
    y2: sensorY + blockHeight/2,
    name: 'Feedback Signal',
    label: '',
    color: colors.feedback,
    labelPos: 'below',
    isFeedback: true
  });

  // Sensor output to summing junction
  signals.push({
    x1: sensorX,
    y1: sensorY + blockHeight/2,
    x2: sjX,
    y2: sensorY + blockHeight/2,
    name: 'Measured Output',
    label: 'ym(t)',
    color: colors.feedback,
    labelPos: 'below',
    isFeedback: true,
    noArrow: true
  });

  // Feedback return to summing junction
  signals.push({
    x1: sjX,
    y1: sensorY + blockHeight/2,
    x2: sjX,
    y2: centerY + summingJunction.radius + 5,
    name: 'Feedback to Junction',
    label: '',
    color: colors.feedback,
    labelPos: 'left',
    isFeedback: true
  });
}

function draw() {
  updateCanvasSize();

  // Reinitialize if canvas size changed significantly
  if (abs(canvasWidth - (blocks[0]?.x * 5 || 0)) > 100) {
    initializeComponents();
  }

  // Drawing area background
  fill(colors.background);
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill(colors.textColor);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Standard Feedback Control Loop', canvasWidth/2, 10);

  // Subtitle
  textSize(13);
  fill('#666');
  text('Hover over components for details. Click to highlight signal path.', canvasWidth/2, 32);

  // Draw all signals (arrows)
  for (let sig of signals) {
    drawSignal(sig);
  }

  // Draw summing junction
  drawSummingJunction();

  // Draw all blocks
  for (let block of blocks) {
    drawBlock(block);
  }

  // Draw feedback tap point (small filled circle)
  let feedbackTapX = blocks[2].x + blocks[2].w + 30; // Plant block
  fill(colors.feedback);
  noStroke();
  ellipse(feedbackTapX, drawHeight/2, 8, 8);

  // Draw info panel if something is hovered
  if (hoveredElement) {
    drawInfoPanel(hoveredElement);
  }

  // Instructions in control area
  noStroke();
  fill(colors.textColor);
  textAlign(LEFT, CENTER);
  textSize(13);

  // Legend
  let legendY = drawHeight + 30;
  let legendX = 20;

  // Reference path
  fill(colors.reference);
  rect(legendX, legendY - 8, 25, 4);
  fill(colors.textColor);
  text('Forward Path', legendX + 30, legendY - 5);

  // Feedback path
  legendX += 130;
  fill(colors.feedback);
  rect(legendX, legendY - 8, 25, 4);
  fill(colors.textColor);
  text('Feedback Path', legendX + 30, legendY - 5);

  // Disturbance
  legendX += 130;
  fill(colors.disturbance);
  rect(legendX, legendY - 8, 25, 4);
  fill(colors.textColor);
  text('Disturbance', legendX + 30, legendY - 5);

  // Selected indicator
  if (selectedElement) {
    legendX += 130;
    fill(colors.highlight);
    rect(legendX, legendY - 8, 25, 4);
    fill(colors.textColor);
    text('Selected: ' + selectedElement, legendX + 30, legendY - 5);
  }
}

function drawBlock(block) {
  let isHovered = hoveredElement === block.name;
  let isSelected = selectedElement === block.name;

  // Block shadow for depth
  if (isHovered || isSelected) {
    fill(200);
    noStroke();
    rect(block.x + 3, block.y + 3, block.w, block.h, 5);
  }

  // Block fill
  if (isSelected) {
    fill(colors.highlight);
  } else if (isHovered) {
    fill('#E8E8E8');
  } else {
    fill(colors.blockFill);
  }

  stroke(block.color);
  strokeWeight(isHovered || isSelected ? 3 : 2);
  rect(block.x, block.y, block.w, block.h, 5);

  // Block label
  noStroke();
  fill(colors.textColor);
  textAlign(CENTER, CENTER);
  textSize(14);
  text(block.label, block.x + block.w/2, block.y + block.h/2 - (block.sublabel ? 8 : 0));

  // Sublabel (transfer function)
  if (block.sublabel) {
    textSize(12);
    fill('#666');
    text(block.sublabel, block.x + block.w/2, block.y + block.h/2 + 10);
  }
}

function drawSummingJunction() {
  let sj = summingJunction;
  let isHovered = hoveredElement === sj.name;
  let isSelected = selectedElement === sj.name;

  // Circle
  if (isSelected) {
    fill(colors.highlight);
  } else if (isHovered) {
    fill('#E8E8E8');
  } else {
    fill(colors.blockFill);
  }

  stroke(colors.reference);
  strokeWeight(isHovered || isSelected ? 3 : 2);
  ellipse(sj.x, sj.y, sj.radius * 2, sj.radius * 2);

  // Plus and minus signs
  noStroke();
  fill(colors.textColor);
  textAlign(CENTER, CENTER);
  textSize(16);

  // Plus on left (for reference input)
  text('+', sj.x - sj.radius + 8, sj.y - 2);

  // Minus on bottom (for feedback)
  text('\u2212', sj.x + 2, sj.y + sj.radius - 8);

  // Sigma in center (optional)
  textSize(12);
  fill('#888');
  text('\u03A3', sj.x, sj.y);
}

function drawSignal(sig) {
  let isHovered = hoveredElement === sig.name;
  let isSelected = selectedElement === sig.name;

  // Line
  stroke(sig.color);
  strokeWeight(isHovered || isSelected ? 4 : 2);
  line(sig.x1, sig.y1, sig.x2, sig.y2);

  // Arrowhead (unless noArrow flag)
  if (!sig.noArrow) {
    drawArrowhead(sig.x1, sig.y1, sig.x2, sig.y2, sig.color, isHovered || isSelected);
  }

  // Label
  if (sig.label) {
    noStroke();
    fill(sig.color);
    textSize(12);

    let labelX, labelY;
    let midX = (sig.x1 + sig.x2) / 2;
    let midY = (sig.y1 + sig.y2) / 2;

    if (sig.labelPos === 'above') {
      textAlign(CENTER, BOTTOM);
      labelX = midX;
      labelY = midY - 8;
    } else if (sig.labelPos === 'below') {
      textAlign(CENTER, TOP);
      labelX = midX;
      labelY = midY + 8;
    } else if (sig.labelPos === 'right') {
      textAlign(LEFT, CENTER);
      labelX = midX + 8;
      labelY = midY;
    } else {
      textAlign(RIGHT, CENTER);
      labelX = midX - 8;
      labelY = midY;
    }

    text(sig.label, labelX, labelY);
  }
}

function drawArrowhead(x1, y1, x2, y2, col, isHighlighted) {
  let angle = atan2(y2 - y1, x2 - x1);
  let arrowSize = isHighlighted ? 12 : 10;

  push();
  translate(x2, y2);
  rotate(angle);

  fill(col);
  noStroke();
  triangle(0, 0, -arrowSize, -arrowSize/2, -arrowSize, arrowSize/2);

  pop();
}

function drawInfoPanel(elementName) {
  let info = descriptions[elementName];
  if (!info) return;

  let panelWidth = min(320, canvasWidth - 40);
  let panelHeight = 100;
  let panelX = canvasWidth - panelWidth - 20;
  let panelY = 55;

  // Panel background
  fill(255, 255, 255, 240);
  stroke('#333');
  strokeWeight(1);
  rect(panelX, panelY, panelWidth, panelHeight, 8);

  // Title
  noStroke();
  fill(colors.textColor);
  textAlign(LEFT, TOP);
  textSize(14);
  textStyle(BOLD);
  let title = elementName;
  if (info.symbol) {
    title += '  [' + info.symbol + ']';
  }
  text(title, panelX + 10, panelY + 8);

  // Description
  textStyle(NORMAL);
  textSize(12);
  fill('#333');
  text(info.description, panelX + 10, panelY + 28, panelWidth - 20, 40);

  // Example
  if (info.example) {
    textSize(11);
    fill('#666');
    textStyle(ITALIC);
    text('Example: ' + info.example, panelX + 10, panelY + 72, panelWidth - 20, 30);
    textStyle(NORMAL);
  }
}

function mouseMoved() {
  hoveredElement = null;

  // Check summing junction
  if (dist(mouseX, mouseY, summingJunction.x, summingJunction.y) < summingJunction.radius + 5) {
    hoveredElement = summingJunction.name;
    cursor(HAND);
    return;
  }

  // Check blocks
  for (let block of blocks) {
    if (mouseX > block.x - 5 && mouseX < block.x + block.w + 5 &&
        mouseY > block.y - 5 && mouseY < block.y + block.h + 5) {
      hoveredElement = block.name;
      cursor(HAND);
      return;
    }
  }

  // Check signals (with tolerance for line proximity)
  for (let sig of signals) {
    if (isNearLine(mouseX, mouseY, sig.x1, sig.y1, sig.x2, sig.y2, 10)) {
      hoveredElement = sig.name;
      cursor(HAND);
      return;
    }
  }

  cursor(ARROW);
}

function mousePressed() {
  // Toggle selection on click
  if (hoveredElement) {
    if (selectedElement === hoveredElement) {
      selectedElement = null;
    } else {
      selectedElement = hoveredElement;
    }
  } else {
    selectedElement = null;
  }
}

function isNearLine(px, py, x1, y1, x2, y2, tolerance) {
  // Check if point is near a line segment
  let lineLen = dist(x1, y1, x2, y2);
  if (lineLen === 0) return dist(px, py, x1, y1) < tolerance;

  let t = max(0, min(1, ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / (lineLen * lineLen)));
  let nearestX = x1 + t * (x2 - x1);
  let nearestY = y1 + t * (y2 - y1);

  return dist(px, py, nearestX, nearestY) < tolerance;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  initializeComponents();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
