---
title: Introduction to Control Systems
description: Fundamental vocabulary and building blocks of control systems including feedback, open-loop and closed-loop control, and key system components
generated_by: claude skill chapter-content-generator
date: 2026-01-31
version: 0.03
---

# Introduction to Control Systems

## Summary

This chapter introduces the fundamental vocabulary and building blocks of control systems. Students will learn the difference between open-loop and closed-loop (feedback) control, and understand the roles of key system components including the plant, controller, actuator, and sensor. By the end of this chapter, students will be able to identify and describe the basic elements of any control system and explain how feedback enables systems to regulate their behavior.

## Concepts Covered

This chapter covers the following 12 concepts from the learning graph:

1. Control System
2. Feedback
3. Open-Loop Control
4. Closed-Loop Control
5. Plant
6. Controller
7. Actuator
8. Sensor
9. Reference Input
10. Error Signal
11. Disturbance
12. System Response

## Prerequisites

This chapter assumes only the prerequisites listed in the [course description](../../course-description.md).

## Welcome!

![Consumer Products](./consumer-products.png)

Welcome to the wonderful world of control systems—where physics meets finesse, and math becomes magic! If you've ever wondered how a Segway stays upright, how a drone hovers in place, or how your car's cruise control keeps you at exactly 65 mph even going uphill, you're about to peek behind the curtain.

![MIP in Classroom](./mip-in-classroom.png)
<details>
<summary>Image generation prompt</summary>
Generate a wide landscape image of junior high school kids playing with the MIP two-wheel self-balancing robot. Make the image 1.91:1 w/h ratio and make it 1200 pixels wide. The kids are in a brightly lit school with fun robotics parts around the room. The kids are smiling and laughing and having a great time. The kids are from a diverse gender and race profile.
</details>

Consider the MIP robot—that delightful little self-balancing toy that zooms around on two wheels like a tiny, determined penguin. MIP (Mobile Inverted Pendulum) looks simple: just a round body perched on two wheels. But here's the thing—balancing on two wheels is *really hard*. Try standing a broomstick on your palm. Now imagine doing that while the broomstick is also trying to drive somewhere. That's MIP's life, every millisecond of every day.

Without control systems, MIP would face-plant immediately. But thanks to clever sensors measuring tilt angle, a microcontroller running control algorithms, and motors responding dozens of times per second, MIP doesn't just balance—it dances, spins, and even plays games. The "secret sauce" is a feedback control loop that constantly asks: "Am I falling? Which way? How fast?" and responds with precisely the right motor commands to stay upright. It's like having superhuman reflexes, except the superhuman is math.

Here's the exciting part: the same principles that make MIP balance also guide spacecraft to Mars, keep power grids stable, regulate your body temperature, and enable robots to perform surgery. Control systems are *everywhere*, hiding in plain sight, quietly making the modern world possible.

By the end of this course, you'll understand how these systems work—and more importantly, how to design them yourself. Think of it as becoming a Jedi Knight of engineering. The Force? That's feedback. Your lightsaber? Transfer functions and Bode plots. Your enemies? Instability and steady-state error. (Don't worry, we'll defeat them.)

Mastering control systems theory is like gaining a superpower. It doesn't just help you understand the world around you—from thermostats to Tesla autopilots—it empowers you to *create* innovative products that seemed impossible before. Ready to begin? Let's go!

## Meet Gyra

![](./meet-gyra-notext.png)

Gyra is a two-wheel, self-balancing robot who lives at the edge of stability. Left on her own, she wobbles, overcorrects, and eventually tips over—not because she is broken, but because physics is unforgiving. Gyra responds to the world through sensors, motors, and feedback, and every choice made in her controller shapes how she behaves. Throughout this course, you will take on the role of Gyra’s control engineer. Many concepts you learn will help her react faster, overshoot less, and recover more gracefully when disturbances occur. By the end of the book, Gyra may still lean and hum quietly as she balances, but she will do so with confidence—because you designed the system that keeps her upright.

## What Is a Control System?

A **control system** is an interconnection of components designed to achieve a desired behavior or output. Control systems are everywhere in engineering—from the thermostat in your home that maintains a comfortable temperature to the autopilot systems that guide aircraft through complex flight paths. The fundamental purpose of any control system is to make a physical process behave in a predictable, desired manner, even in the presence of external disturbances or internal uncertainties.

Control systems can be characterized by how they respond to commands and disturbances. At the most basic level, engineers distinguish between two fundamental architectures:

- **Open-loop control systems** that execute pre-planned actions without monitoring the result
- **Closed-loop control systems** (also called feedback control systems) that continuously measure the output and adjust their behavior accordingly

Understanding this distinction forms the foundation for everything that follows in control systems engineering.

#### Diagram: Control System Examples in Daily Life

<iframe src="../../sims/control-system-examples/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>Control System Examples in Daily Life</summary>
Type: infographic

Bloom Taxonomy: Understand (L2)
Bloom Verb: identify, exemplify

Learning Objective: Students will identify control systems in everyday contexts and classify them as open-loop or closed-loop, building intuition before formal definitions.

Layout: Interactive grid of 6-8 clickable icons representing common systems

Examples to include:

1. Toaster (open-loop) - timer-based, no measurement of bread color
2. Thermostat/HVAC (closed-loop) - temperature sensor provides feedback
3. Washing machine timer (open-loop) - fixed cycle regardless of cleanliness
4. Cruise control (closed-loop) - speedometer provides feedback to throttle
5. Traffic light with fixed timing (open-loop) - no traffic measurement
6. Traffic light with sensors (closed-loop) - detects vehicles waiting

Interactive elements:
- Click on each icon to reveal: system name, input, output, whether feedback is present
- Hover shows brief description
- Color coding: blue border for closed-loop, orange border for open-loop

Visual style: Clean icons with modern flat design, arranged in 2 rows of 3-4

Implementation: HTML/CSS/JavaScript with click handlers revealing info panels
</details>

For a longer list of consumer products that use control theory see
our Appendix: [Consumer Products that Use Control Theory](../../appendix/consumer-products-that-use-control-theory.md)

## Open-Loop Control

An **open-loop control system** operates without measuring or using information about its actual output. The controller generates a command signal based solely on the input and a predetermined relationship (often a model or calibration) between input and expected output. Because there is no feedback path from the output to the input, the system cannot automatically compensate for disturbances or modeling errors.

Consider a simple toaster as an example of open-loop control. You set a timer (the input), and the heating element runs for that duration regardless of whether the bread is actually toasted to your preference. If the bread is thicker than usual or the starting temperature is different, the output quality varies—but the toaster has no way to detect or correct for these conditions. This is why we've all experienced the tragedy of charcoal bread or the disappointment of warm, pale slices that still dream of becoming toast.

The block diagram for an open-loop system is straightforward:

| Component | Role |
|-----------|------|
| Reference Input | The desired setpoint or command |
| Controller | Converts the reference into an actuation signal |
| Plant | The physical system being controlled |
| Output | The actual system response |

Open-loop systems are simpler and less expensive than closed-loop alternatives. However, they are vulnerable to:

- Disturbances that push the output away from the desired value
- Model inaccuracies where the assumed input-output relationship is imperfect
- Parameter variations as system characteristics change over time

Open-loop control is appropriate when disturbances are small, the system model is accurate and stable, and precision requirements are modest.

## Closed-Loop Control and Feedback

The key innovation of **closed-loop control** is the addition of **feedback**—a measurement of the actual output that is compared to the desired reference input. This comparison produces an **error signal**, which the controller uses to adjust its output and drive the system toward the desired behavior.

Feedback is the defining characteristic of closed-loop control. By continuously measuring the output and comparing it to the reference, the system can:

- Reject disturbances by automatically compensating for their effects
- Reduce sensitivity to parameter variations and modeling errors
- Track changing reference inputs more accurately

The concept of feedback appears throughout nature and engineering. Biological systems use feedback extensively—your body regulates temperature, blood sugar, and countless other variables through feedback mechanisms. Engineers have formalized these principles to create robust control systems for industrial, aerospace, automotive, and consumer applications.

!!! tip "Why Feedback Matters"
    Feedback allows a control system to be "self-correcting." Even if the controller doesn't have a perfect model of the plant, or if unexpected disturbances occur, the feedback loop enables the system to detect and reduce errors automatically.

## The Standard Feedback Control Loop

The standard closed-loop feedback system consists of several interconnected components, each with a specific role. Understanding these components and how they interact is essential for analyzing and designing control systems.

#### Diagram: Standard Feedback Control Loop Block Diagram

<iframe src="../../sims/feedback-loop-block-diagram/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Standard Feedback Control Loop Block Diagram</summary>
Type: diagram

Bloom Taxonomy: Understand (L2)
Bloom Verb: explain, describe

Learning Objective: Students will trace signal flow through a complete feedback control system, identifying each component's role and how signals transform as they propagate through the loop.

Components to show (left to right):
1. Reference Input r(t) - arrow entering from left
2. Summing Junction (circle with +/- signs) - where error is computed
3. Error Signal e(t) = r(t) - y(t) - arrow from summing junction
4. Controller block - labeled "Controller G_c(s)"
5. Control signal u(t) - arrow from controller
6. Actuator block - labeled "Actuator"
7. Actuator output - arrow to plant
8. Plant block - labeled "Plant G_p(s)"
9. Output y(t) - arrow to right (system response)
10. Disturbance d(t) - arrow entering at plant (from above)
11. Sensor block - labeled "Sensor H(s)" - in feedback path
12. Measured output - arrow from sensor back to summing junction (negative input)

Signal labels at each connection point with clear notation.

Visual style: Clean block diagram with:
- Rectangular blocks for components
- Circular summing junction with + at reference input, - at feedback
- Arrows showing signal direction
- Labels for all signals: r(t), e(t), u(t), d(t), y(t)

Color scheme:
- Reference/command path: blue
- Feedback path: green
- Disturbance: red
- Plant/actuator: gray

Interactive features:
- Hover over any block to see detailed description
- Hover over any signal arrow to see what that signal represents
- Click on blocks to highlight the signal path through that component

Implementation: vis-network or custom SVG with JavaScript hover handlers
Canvas size: 800x400px, responsive width
</details>

### Reference Input

The **reference input** $r(t)$ represents the desired output or setpoint of the control system. In engineering notation, this signal specifies what we want the system output to be. For a temperature control system, the reference input would be the desired temperature setting. For a motor speed controller, it would be the commanded velocity.

The reference input may be:

- A constant value (regulation problem)
- A time-varying trajectory (tracking problem)
- A step change from one setpoint to another
- A complex profile such as a ramp or sinusoidal pattern

### The Summing Junction and Error Signal

The **summing junction** compares the reference input with the measured output to produce the **error signal** $e(t)$. Mathematically:

$$e(t) = r(t) - y_m(t)$$

where $y_m(t)$ is the measured output from the sensor. The error signal quantifies the difference between what we want (the reference) and what we have (the measured output). The controller's job is to drive this error toward zero.

The summing junction is represented in block diagrams as a circle with plus and minus signs indicating how the inputs combine. The reference input enters with a positive sign, while the feedback signal enters with a negative sign, hence the term "negative feedback." (Don't worry—unlike the kind you might get on a group project, this type of negative feedback is actually helpful!)

### Controller

The **controller** (sometimes called the compensator) processes the error signal and generates a command to the actuator. The controller embodies the control strategy—the algorithm or transfer function that determines how the system should respond to errors. If the plant is the star of the show, the controller is the director—making sure everything hits its mark and the performance goes smoothly.

Controllers range from simple proportional amplifiers to sophisticated algorithms that incorporate:

- Proportional action (responding to current error)
- Integral action (responding to accumulated error)
- Derivative action (responding to rate of change of error)
- More advanced structures covered in later chapters

The controller transfer function is often denoted $G_c(s)$ in the Laplace domain, where $s$ is the complex frequency variable.

### Actuator

The **actuator** converts the controller's command signal into physical action on the plant. Actuators bridge the gap between the electrical signals in the control system and the mechanical, thermal, or other physical quantities being controlled. They're the "muscle" of the operation—all the controller's brilliant ideas mean nothing if the actuator can't make them happen in the real world.

Common actuator examples include:

| Application | Actuator Type |
|-------------|---------------|
| Motor control | Power amplifier and electric motor |
| Valve control | Pneumatic or hydraulic servo |
| Thermal control | Heating element or cooling fan |
| Flight control | Hydraulic servo driving control surfaces |
| Robotic arm | Electric servomotor at each joint |

In many analyses, the actuator dynamics are combined with the plant dynamics, but for high-performance systems, actuator limitations (bandwidth, saturation, slew rate) must be modeled explicitly.

### Plant

The **plant** is the physical system or process being controlled. (And no, we're not talking about your succulent on the windowsill—though keeping *that* alive is its own control challenge!) The plant is what we ultimately want to regulate or manipulate. Everything else in the control loop—controller, actuator, sensor—exists to make the plant behave as desired.

The plant transfer function $G_p(s)$ characterizes how the plant output responds to its input. This mathematical model captures the plant's dynamics: how fast it responds, whether it oscillates, and how it settles to steady state.

Examples of plants include:

- A DC motor (input: voltage, output: angular position or velocity)
- A heating system (input: power, output: temperature)
- An aircraft (input: control surface deflection, output: pitch angle)
- A chemical reactor (input: reactant flow rate, output: product concentration)

### Sensor

The **sensor** measures the plant output and converts it to a form suitable for comparison with the reference input. Sensors close the feedback loop by providing information about the actual system state. Think of the sensor as the system's eyes and ears—constantly watching, always reporting. It's the control system equivalent of that friend who notices *everything*.

Real sensors introduce their own dynamics and imperfections:

- **Measurement noise**: Random fluctuations in the measured signal
- **Bias errors**: Systematic offsets between true and measured values
- **Dynamic response**: Finite bandwidth limiting how fast changes can be tracked
- **Quantization**: Discrete steps when using digital sensors

The sensor transfer function $H(s)$ captures these dynamics. In ideal analyses, $H(s) = 1$ (perfect measurement), but practical design must account for sensor limitations.

## System Response

The **system response** $y(t)$ is the actual output of the plant—the quantity we are trying to control. The goal of the feedback control system is to make this response track the reference input as closely as possible, despite disturbances and model uncertainties.

System response characteristics include:

- **Transient response**: How the output behaves as it moves from one state to another
- **Steady-state response**: The final value the output settles to
- **Tracking accuracy**: How well the output follows a changing reference
- **Disturbance rejection**: How effectively the system suppresses unwanted inputs

Later chapters will develop quantitative measures for these characteristics, but the fundamental goal remains the same: make $y(t)$ follow $r(t)$ as closely as possible.

#### Diagram: Interactive Feedback Loop Simulator

<iframe src="../../sims/feedback-loop-simulator/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive Feedback Loop Simulator</summary>
Type: microsim

Bloom Taxonomy: Apply (L3)
Bloom Verb: demonstrate, execute

Learning Objective: Students will observe how changing the controller gain affects closed-loop system response, developing intuition for the relationship between controller parameters and performance.

Instructional Rationale: This Apply-level objective benefits from parameter exploration where students actively adjust the controller gain and observe the resulting system response in real-time, building intuition about feedback control behavior.

Canvas layout:
- Left side (500px): Time-domain plot showing reference input and system output
- Right side (200px): Control panel with sliders and displays

Visual elements:
- Time-domain plot with:
  - X-axis: Time (0-10 seconds)
  - Y-axis: Amplitude (0-2)
  - Blue dashed line: Reference input r(t) (step from 0 to 1 at t=1)
  - Orange solid line: System output y(t)
  - Shaded error region between reference and output
- Block diagram schematic (small, at top) showing where gain K fits

Interactive controls:
- Slider: Controller gain K (range 0.5 to 10, default 2)
- Slider: Plant time constant τ (range 0.5 to 3, default 1)
- Button: "Run Simulation"
- Button: "Reset"
- Checkbox: "Show error signal"
- Display: Final steady-state error value
- Display: Approximate settling time

Plant model: First-order system $G_p(s) = \frac{1}{\tau s + 1}$
Controller: Proportional controller $G_c(s) = K$
Closed-loop transfer function: $\frac{K}{(\tau s + 1) + K} = \frac{K}{\tau s + (1 + K)}$

Default parameters:
- K = 2
- τ = 1 second
- Reference step magnitude = 1

Behavior:
- When "Run Simulation" clicked, animate the step response
- Show how increasing K reduces steady-state error but may increase overshoot (for this first-order system, no overshoot, but faster response)
- Display calculated steady-state error: $e_{ss} = \frac{1}{1+K}$
- Update settling time estimate as parameters change

Data visibility requirements:
- Show K value prominently
- Show calculated closed-loop time constant: $\tau_{CL} = \frac{\tau}{1+K}$
- Show steady-state value: $y_{ss} = \frac{K}{1+K}$

Implementation: p5.js with canvas-based controls
Canvas size: 700x400px, responsive width
</details>

## Disturbances

A **disturbance** $d(t)$ is any unwanted input that affects the system output without being commanded by the controller. In other words, disturbances are the universe's way of saying "not so fast!" to your carefully designed system. Disturbances represent the primary reason why feedback control is necessary—if there were no disturbances and our plant model were perfect, open-loop control would suffice. But this is reality, and reality loves to throw curveballs.

Disturbances can enter the system at various points:

- **Load disturbances**: External forces or demands acting on the plant
- **Process disturbances**: Internal variations in plant parameters
- **Measurement noise**: Corrupting the feedback signal
- **Command disturbances**: Errors in the reference input

For the temperature control example, disturbances include:

- Opening a window (heat loss)
- Adding occupants to a room (heat gain)
- Changes in outdoor temperature
- Solar radiation through windows

One of the key advantages of feedback control is **disturbance rejection**—the ability to maintain the desired output despite disturbances. The feedback loop detects the effect of disturbances on the output and automatically adjusts the control action to compensate.

## Comparing Open-Loop and Closed-Loop Systems

The table below summarizes the key differences between open-loop and closed-loop control architectures:

| Characteristic | Open-Loop Control | Closed-Loop Control |
|----------------|-------------------|---------------------|
| Feedback | None | Output is measured and compared to reference |
| Disturbance handling | Cannot compensate | Automatically rejects disturbances |
| Accuracy | Depends entirely on model accuracy | Less sensitive to model errors |
| Complexity | Simpler | More complex |
| Cost | Generally lower | Generally higher |
| Stability concerns | Inherently stable if plant is stable | Can become unstable if poorly designed |
| Example | Toaster, washing machine timer | Thermostat, cruise control |

The choice between open-loop and closed-loop control depends on the application requirements:

- **Choose open-loop** when the plant model is accurate, disturbances are minimal, precision requirements are modest, and cost is a primary constraint
- **Choose closed-loop** when high precision is required, significant disturbances are present, plant parameters vary, and the increased complexity is justified

Most industrial and high-performance systems use closed-loop control because the benefits of disturbance rejection and robustness outweigh the added complexity. In the eternal battle between simplicity and capability, feedback usually wins—it's worth the extra effort to have a system that actually knows what it's doing!

#### Diagram: Open-Loop vs Closed-Loop Comparison

<iframe src="../../sims/open-vs-closed-loop/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Open-Loop vs Closed-Loop Comparison Simulator</summary>
Type: microsim

Bloom Taxonomy: Analyze (L4)
Bloom Verb: compare, differentiate

Learning Objective: Students will compare the behavior of open-loop and closed-loop systems when subjected to the same disturbance, analyzing why feedback provides superior disturbance rejection.

Instructional Rationale: This Analyze-level objective requires students to observe both systems under identical conditions and identify the structural difference (feedback) that causes the performance difference. Side-by-side comparison enables direct differentiation.

Canvas layout:
- Top half: Two parallel system plots (Open-Loop left, Closed-Loop right)
- Bottom: Shared control panel

Visual elements for each system:
- Time-domain plot showing output y(t)
- Reference line at y = 1 (dashed blue)
- Output trajectory (solid orange for open-loop, solid green for closed-loop)
- Disturbance indicator showing when d(t) is applied

Interactive controls:
- Button: "Apply Step Disturbance" - adds disturbance at t = 3 seconds
- Slider: Disturbance magnitude (range -0.5 to +0.5, default 0.3)
- Button: "Reset Both Systems"
- Slider: Controller gain K for closed-loop system (range 1 to 10, default 5)

Plant model for both: $G_p(s) = \frac{1}{s + 1}$

Open-loop controller: Fixed gain $G_c = 1$ (calibrated for unity output with no disturbance)

Closed-loop controller: Proportional gain $G_c = K$

Behavior:
- Initially, both systems are at steady state with output ≈ 1
- When disturbance is applied, open-loop output shifts by the disturbance amount and stays there
- Closed-loop output is deflected but recovers toward the reference
- Show steady-state error for each system after disturbance

Data visibility:
- Steady-state error displayed numerically for each system
- Percent reduction in error for closed-loop vs open-loop

Implementation: p5.js with dual canvas regions
Canvas size: 750x450px, responsive width
</details>

## Real-World Control System Examples

Control systems appear in virtually every domain of engineering. Understanding these examples helps ground abstract concepts in practical applications.

### Automotive Cruise Control
![](./curse-control-infographic.png)

Cruise control maintains vehicle speed at a driver-selected setpoint. The components map directly to our control system framework:

- **Reference input**: Desired speed set by driver
- **Controller**: Electronic control unit (ECU) implementing the control law
- **Actuator**: Throttle servo adjusting engine power
- **Plant**: Vehicle dynamics (engine, transmission, vehicle mass)
- **Sensor**: Wheel speed sensor or GPS-based speedometer
- **Disturbances**: Hills, wind, road surface changes

When driving uphill, the vehicle tends to slow down. The feedback loop detects the speed reduction (error becomes positive) and commands more throttle to maintain the setpoint. It's like having a very attentive co-pilot who never gets tired, never gets distracted by good music, and definitely won't eat your road trip snacks.

### HVAC Temperature Control

Building climate control is a classic feedback control application:

- **Reference input**: Thermostat setpoint
- **Controller**: Thermostat logic (often with hysteresis or PID)
- **Actuator**: Furnace, air conditioner, or heat pump
- **Plant**: Building thermal dynamics
- **Sensor**: Temperature sensor
- **Disturbances**: Outdoor temperature, occupancy, solar gain, appliance heat

The large thermal mass of buildings makes temperature dynamics relatively slow, with time constants measured in minutes to hours depending on construction. This explains why cranking the thermostat to 85°F won't heat your house any faster—a fact that has sparked countless roommate arguments and family "thermostat wars" throughout history.

### Flight Control

Aircraft autopilot systems control attitude, altitude, heading, and speed:

- **Reference input**: Commanded pitch angle, roll angle, or altitude
- **Controller**: Flight control computer
- **Actuators**: Hydraulic servos driving control surfaces (elevator, ailerons, rudder)
- **Plant**: Aircraft dynamics
- **Sensors**: Gyroscopes, accelerometers, air data sensors, GPS
- **Disturbances**: Wind gusts, turbulence, changes in aircraft weight

Flight control systems often include multiple nested feedback loops—inner loops for attitude stabilization and outer loops for navigation. It's loops within loops, like engineering *Inception*. And just like that movie, the deeper you go, the more interesting it gets!

## Summary and Key Takeaways

This chapter introduced the fundamental concepts of control systems that will be developed throughout this textbook.

**Key concepts:**

- A **control system** is an interconnection of components designed to achieve a desired output behavior
- **Open-loop control** operates without feedback and cannot automatically compensate for disturbances
- **Closed-loop control** uses **feedback** to measure the output and adjust the control action accordingly
- The **error signal** is the difference between the reference input and the measured output
- Key components include the **controller**, **actuator**, **plant**, and **sensor**
- **Disturbances** are unwanted inputs that affect system output; feedback enables disturbance rejection
- The **system response** characterizes how the output behaves over time

!!! success "Looking Ahead"
    Subsequent chapters will develop mathematical tools for modeling and analyzing control systems, including transfer functions, block diagrams, time-domain specifications, stability analysis, and controller design methods.

## Concept Verification Checklist

All 12 concepts from this chapter have been covered:

- [x] Control System - Defined in opening section
- [x] Feedback - Explained as the defining characteristic of closed-loop systems
- [x] Open-Loop Control - Described with examples and limitations
- [x] Closed-Loop Control - Explained with block diagram and signal flow
- [x] Plant - Defined as the physical system being controlled
- [x] Controller - Described as the component implementing the control strategy
- [x] Actuator - Explained as the bridge between controller signals and physical action
- [x] Sensor - Defined as the measurement device closing the feedback loop
- [x] Reference Input - Described as the desired setpoint
- [x] Error Signal - Defined mathematically and conceptually
- [x] Disturbance - Explained with examples and relationship to feedback
- [x] System Response - Defined and characterized
