---
title: Standard Feedback Control Loop Block Diagram
description: Interactive block diagram showing signal flow through a closed-loop control system with hover descriptions for each component.
quality_score: 90
image: /sims/feedback-loop-block-diagram/feedback-loop-block-diagram.png
og:image: /sims/feedback-loop-block-diagram/feedback-loop-block-diagram.png
twitter:image: /sims/feedback-loop-block-diagram/feedback-loop-block-diagram.png
social:
   cards: false
---
# Standard Feedback Control Loop Block Diagram

<iframe src="main.html" height="452px" width="100%" scrolling="no"></iframe>

[Run the Feedback Loop Block Diagram Fullscreen](./main.html){ .md-button .md-button--primary }

## Embedding

Place the following line in your website to include this MicroSim in your course:

```html
<iframe src="https://dmccreary.github.io/control-systems/sims/feedback-loop-block-diagram/main.html" height="452px" width="100%" scrolling="no"></iframe>
```

## Description

This interactive block diagram illustrates the standard closed-loop feedback control system architecture. The diagram shows signal flow from the reference input through the forward path (controller, actuator, plant) and back through the feedback path (sensor).

### Components Shown

**Forward Path (Blue):**

- **Reference Input r(t)** - The desired setpoint or command
- **Summing Junction** - Computes error: e(t) = r(t) - y_m(t)
- **Error Signal e(t)** - Difference between reference and measured output
- **Controller G_c(s)** - Implements the control law (e.g., PID)
- **Control Signal u(t)** - Command to the actuator
- **Actuator** - Converts electrical signals to physical action
- **Plant G_p(s)** - The physical system being controlled
- **Output y(t)** - The actual system response

**Feedback Path (Green):**

- **Sensor H(s)** - Measures the plant output
- **Measured Output y_m(t)** - Feedback signal to summing junction

**Disturbance (Red):**

- **Disturbance d(t)** - Unwanted inputs affecting the system

### Interactive Features

- **Hover** over any component to see a detailed description and real-world example
- **Click** on components to highlight them
- **Color-coded paths** help distinguish forward path, feedback path, and disturbances

## Learning Objectives

After using this MicroSim, students will be able to:

1. **Trace** signal flow through a complete feedback control system
2. **Identify** the role of each component in the loop
3. **Explain** how signals transform as they propagate (reference → error → control → output)
4. **Describe** why feedback enables disturbance rejection

## Lesson Plan

### Introduction (5 minutes)
- Display the diagram and ask: "What makes this a 'closed loop'?"
- Trace the signal path from reference input back to the summing junction

### Guided Exploration (10 minutes)
1. Have students hover over each component in order (left to right)
2. For each component, discuss:
   - What goes in? What comes out?
   - How does it transform the signal?
   - What real-world device might serve this role?

### Key Concept: The Error Signal (5 minutes)
- Focus on the summing junction
- Ask: "What happens to the error when the system reaches its setpoint?"
- Discuss: "What happens to the error when a disturbance pushes the output away?"

### Signal Tracing Activity (10 minutes)
Have students trace signals through the following scenarios:

1. **Startup**: System starts at y=0, reference is r=10
   - What is the initial error?
   - Which way does the controller act?

2. **Disturbance**: System at steady state, disturbance pushes output up
   - How does the error change?
   - How does feedback correct for this?

### Discussion Questions

1. What would happen if we removed the feedback path (opened the loop)?
2. Why is the feedback signal subtracted rather than added?
3. How does the sensor quality affect overall system performance?

## References

- [Chapter 1: Introduction to Control Systems](../../chapters/01-intro-to-control-systems/index.md)
- [Control System Examples in Daily Life](../control-system-examples/index.md)
