---
title: PID Control and Controller Tuning
description: Understanding proportional, integral, and derivative control actions, their combinations, and systematic tuning methods for industrial applications
generated_by: claude skill chapter-content-generator
date: 2026-01-31
version: 0.03
---

# PID Control and Controller Tuning

## Summary

This chapter introduces the most widely used controller structure in industrial applications: the PID controller. Students will learn how proportional, integral, and derivative control actions individually affect system behavior, and how they combine in P, PI, PD, and PID controllers. Controller gains and their equivalent time-domain parameters (integral time, derivative time) are explained. Systematic tuning methods including Ziegler-Nichols (reaction curve and ultimate gain methods) provide starting points for controller design. Practical considerations including anti-windup and derivative kick are addressed.

## Concepts Covered

This chapter covers the following 21 concepts from the learning graph:

1. Proportional Control
2. Integral Control
3. Derivative Control
4. P Controller
5. PI Controller
6. PD Controller
7. PID Controller
8. Proportional Gain
9. Integral Gain
10. Derivative Gain
11. Integral Time
12. Derivative Time
13. Controller Tuning
14. Ziegler-Nichols Method
15. Reaction Curve Method
16. Ultimate Gain Method
17. Ultimate Gain
18. Ultimate Period
19. Trial and Error Tuning
20. Anti-Windup
21. Derivative Kick

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Introduction to Control Systems](../01-intro-to-control-systems/index.md)
- [Chapter 3: Time-Domain Response Fundamentals](../03-time-domain-response/index.md)
- [Chapter 8: Linearization and Nonlinear Effects](../08-linearization-nonlinear-effects/index.md)
- [Chapter 10: Stability Analysis and Routh-Hurwitz](../10-stability-routh-hurwitz/index.md)

---

## The Workhorse of Industrial Control

Walk into any chemical plant, power station, manufacturing facility, or refinery in the world, and you'll find thousands of control loops quietly doing their jobs. Temperature regulators, flow controllers, pressure stabilizers, level maintainers—the invisible workforce that keeps industrial civilization running. And the vast majority of them use the same basic algorithm: **PID control**.

The Proportional-Integral-Derivative controller isn't new—its origins trace back to the early 20th century. It isn't mathematically sophisticated compared to modern optimal control or robust control methods. And yet, more than 90% of industrial control loops use PID controllers or their simpler variants (P, PI, PD). Why? Because PID control works remarkably well across an enormous range of applications, requires no detailed mathematical model of the plant, can be tuned using straightforward procedures, and is intuitive enough that operators can adjust it in the field.

In this chapter, we'll dissect the PID controller to understand what each component does, why they're combined the way they are, and how to tune them systematically. By the end, you'll understand why this century-old algorithm remains the dominant force in industrial control—and you'll have the tools to make it work for you.

!!! quote "Gyra Moment"
    "My controller is a PID. Every millisecond, it looks at how far I'm leaning (proportional), how long I've been leaning (integral), and how fast I'm starting to tip (derivative). Together, these three pieces of information tell my motors exactly how hard to push. Simple? Yes. Effective? I'm still standing, aren't I?"

## The Three Control Actions

Before we combine them, let's understand each control action in isolation. Each one addresses a specific aspect of the control problem, and each has distinct strengths and limitations.

### Proportional Control: React to the Present

**Proportional control** is the most intuitive control action: the controller output is directly proportional to the error signal. If you're far from your target, push hard. If you're close, push gently.

#### Proportional Control Law

$u(t) = K_p \cdot e(t)$

where:

- $u(t)$ is the controller output (control effort)
- $K_p$ is the **proportional gain**
- $e(t) = r(t) - y(t)$ is the error (setpoint minus measured output)

The proportional gain $K_p$ determines how aggressively the controller responds to error. A higher $K_p$ means stronger reactions, which generally means faster response—but also potential for overshoot and oscillation.

Think of it like steering a car. If you're drifting to the right, you turn the wheel left. The farther right you've drifted, the more you turn. That's proportional control. Simple, reactive, immediate.

| Proportional Gain | Response Characteristic |
|-------------------|------------------------|
| Low $K_p$ | Sluggish response, large steady-state error |
| Medium $K_p$ | Reasonable speed, moderate steady-state error |
| High $K_p$ | Fast response, small steady-state error, may oscillate |
| Very high $K_p$ | Aggressive oscillation, potential instability |

The catch? Proportional control alone cannot eliminate **steady-state error** for step inputs in most systems. If the error goes to zero, so does the control effort—but then nothing is fighting the disturbance. A constant error is often required to generate the control effort needed to maintain the output at the setpoint. This persistent offset is the Achilles' heel of pure P control.

!!! quote "Gyra Moment"
    "With proportional-only control, I get the basic idea: lean right, push left. But here's my problem—I end up standing with a permanent forward lean. To generate any motor torque, I need some error. So I'm never quite vertical. It's frustrating, like always being *almost* where I want to be."

### Integral Control: Remember the Past

**Integral control** addresses the steady-state error problem by accumulating error over time. Even tiny persistent errors eventually add up to significant control action.

#### Integral Control Law

$u(t) = K_i \int_0^t e(\tau) \, d\tau$

where:

- $K_i$ is the **integral gain**
- The integral accumulates all past error

The integral term is like having a long memory. If you've been slightly off target for a while, the integral builds up and eventually forces the output to the setpoint—even if the instantaneous error is small. Given enough time, the integral of any non-zero error grows without bound, which forces the controller to eliminate the error entirely.

This is the cure for proportional control's steady-state error problem. If any error persists, the integral term keeps growing until it's eliminated. The steady-state error for a step input becomes exactly zero.

But integral action comes with its own costs:

- It responds slowly (needs time to accumulate)
- It can cause overshoot (the accumulated error doesn't instantly disappear when you cross the setpoint)
- It can "wind up" during saturation (a problem we'll address later)

| Integral Gain | Response Characteristic |
|---------------|------------------------|
| Low $K_i$ | Slow error elimination, minimal overshoot impact |
| Medium $K_i$ | Reasonable error elimination speed, some overshoot |
| High $K_i$ | Fast error elimination, significant overshoot |
| Very high $K_i$ | Aggressive oscillation, long settling time |

### Derivative Control: Anticipate the Future

**Derivative control** responds to the rate of change of error. If the error is decreasing rapidly, the derivative term reduces control effort—anticipating that you're about to reach the target. If error is increasing, it adds to the control effort, trying to arrest the trend before it gets worse.

#### Derivative Control Law

$u(t) = K_d \frac{de(t)}{dt}$

where:

- $K_d$ is the **derivative gain**
- The derivative measures how fast the error is changing

The derivative term provides anticipation—a predictive element that looks at where the system is *heading*, not just where it is. When Gyra starts to tip, the derivative of her angle is already non-zero before she's leaned very far. Derivative control can start correcting the fall before it becomes serious.

This predictive capability is the derivative term's superpower. It provides damping, reduces overshoot, and allows faster response without excessive oscillation. It's like a skilled driver who sees a curve approaching and starts turning before reaching it, rather than waiting until they're already veering off the road.

The downside? Derivative control is sensitive to noise. High-frequency noise gets amplified by differentiation, which can cause rapid, jerky control action. Pure derivative control is never used alone—it would go haywire at the slightest sensor noise. In practice, derivative action is almost always filtered or limited.

| Derivative Gain | Response Characteristic |
|-----------------|------------------------|
| Zero $K_d$ | No anticipation, may overshoot |
| Low $K_d$ | Mild damping, some overshoot reduction |
| Medium $K_d$ | Good damping, significant overshoot reduction |
| High $K_d$ | Aggressive damping, may slow response, noise sensitive |
| Very high $K_d$ | Noise amplification, jerky control action |

!!! quote "Gyra Moment"
    "Derivative control is my early warning system. When I *start* to tip—even before I've leaned very far—my gyroscope tells me I'm rotating. That rate of rotation is the derivative of my angle. By responding to how fast I'm tilting, I can catch myself before things get out of hand. It's like having reflexes that work *before* I'm in trouble."

#### Diagram: Three Control Actions Compared

<iframe src="../../sims/three-control-actions/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Three Control Actions Compared</summary>
Type: microsim

Bloom Taxonomy: Understand (L2)
Bloom Verb: compare, explain

Learning Objective: Students will compare how proportional, integral, and derivative control actions respond differently to the same error signal, understanding each action's unique contribution.

Canvas layout:
- Top section (70%): Four stacked plots showing error signal and three control actions
- Bottom section (30%): Controls and explanatory text

Visual elements:
- Plot 1: Error signal e(t) - step input transitioning to ramp, then sinusoid (black line)
- Plot 2: Proportional output u_p(t) = K_p * e(t) (blue line)
- Plot 3: Integral output u_i(t) = K_i * integral(e) (green line with area fill showing accumulation)
- Plot 4: Derivative output u_d(t) = K_d * de/dt (red line)
- Common time axis with synchronized vertical cursors
- Annotations explaining behavior at key points

Interactive controls:
- Slider: K_p from 0.1 to 5 (default: 1)
- Slider: K_i from 0.1 to 2 (default: 0.5)
- Slider: K_d from 0.1 to 2 (default: 0.3)
- Dropdown: Error signal type (Step, Ramp, Sinusoid, Custom sequence)
- Button: Reset to defaults

Data Visibility Requirements:
- Show numerical values of each gain next to sliders
- Display instantaneous values of e(t), u_p, u_i, u_d at cursor position
- Show accumulated integral value
- Annotate key behaviors: "P follows error shape", "I accumulates area", "D responds to slope"

Behavior:
- All four plots share synchronized time axis
- When gains change, control outputs update immediately
- Integral output shows shaded area under error curve
- Derivative output spikes at discontinuities (with note about practical filtering)
- Cursor synchronized across all plots shows instantaneous values

Instructional Rationale: Side-by-side comparison of the three control actions on identical error signals builds intuition for what each action "does." Students can adjust gains and see how each action scales independently.

Implementation: p5.js with canvas-based sliders and synchronized plotting
</details>

## Combining the Actions: P, PI, PD, and PID Controllers

In practice, we rarely use individual control actions in isolation. The magic happens when we combine them, leveraging each action's strengths while compensating for its weaknesses.

### The P Controller

The simplest feedback controller uses proportional action alone.

#### P Controller Transfer Function

$G_c(s) = K_p$

The P controller is just a gain—the simplest possible controller. It's fast, doesn't add phase lag, and never causes instability on its own (though it can destabilize the closed-loop system if $K_p$ is too high).

**When to use P control:**
- When steady-state error is acceptable
- When the plant has inherent integration (e.g., level control in a tank with integrating dynamics)
- When simplicity is paramount
- As a starting point before adding I and D

### The PI Controller

Adding integral action to proportional control creates the workhorse of industrial control: the PI controller.

#### PI Controller Transfer Function

$G_c(s) = K_p + \frac{K_i}{s} = K_p \left(1 + \frac{1}{T_i s}\right)$

where:

- $K_p$ is the proportional gain
- $K_i$ is the integral gain
- $T_i = K_p / K_i$ is the **integral time** (also called reset time)

The integral time $T_i$ is the time it would take for the integral action alone to produce the same output as the proportional action, given a constant error. It's a more intuitive parameter than $K_i$ for many practitioners.

**What PI control gives you:**
- Zero steady-state error for step inputs
- Reasonable disturbance rejection
- Only two parameters to tune

**The tradeoff:**
- The integral term adds phase lag, which can reduce stability margins
- Slower response than pure P control with the same proportional gain
- Potential for integral windup (addressed later)

PI control is the most common controller in industry because steady-state error elimination is usually required, while derivative action is often omitted to avoid noise sensitivity.

### The PD Controller

Combining proportional and derivative action creates a controller that reacts to both the present error and its rate of change.

#### PD Controller Transfer Function

$G_c(s) = K_p + K_d s = K_p (1 + T_d s)$

where:

- $K_p$ is the proportional gain
- $K_d$ is the derivative gain
- $T_d = K_d / K_p$ is the **derivative time**

The derivative time $T_d$ represents how far into the future the controller "looks" based on the current rate of change.

**What PD control gives you:**
- Anticipatory action reduces overshoot
- Improved damping and transient response
- Can stabilize some marginally stable or unstable plants
- Phase lead that can improve stability margins

**The tradeoffs:**
- No steady-state error elimination (inherits P controller's limitation)
- Noise sensitivity from the derivative term
- Requires filtering in practice

PD control is less common in pure form, but the derivative action concept is essential for understanding full PID control.

### The PID Controller

The full PID controller combines all three actions.

#### PID Controller Transfer Function (Parallel Form)

$G_c(s) = K_p + \frac{K_i}{s} + K_d s$

This is often written in the alternative "ideal" or "series" form:

#### PID Controller Transfer Function (Ideal Form)

$G_c(s) = K_p \left(1 + \frac{1}{T_i s} + T_d s\right)$

where:

- $K_p$ is the proportional gain
- $T_i$ is the integral time
- $T_d$ is the derivative time

| Parameter | Also Called | Effect of Increasing |
|-----------|-------------|---------------------|
| $K_p$ | Gain, Proportional Band | Faster response, more overshoot, smaller steady-state error |
| $T_i$ | Integral Time, Reset Time | Slower integral action, less overshoot, slower error elimination |
| $T_d$ | Derivative Time, Rate Time | More anticipation, better damping, more noise sensitivity |

The PID controller gives us the best of all worlds: proportional action for immediate response, integral action for zero steady-state error, and derivative action for predictive damping.

!!! tip "Parameter Relationships"
    The parallel form parameters ($K_p$, $K_i$, $K_d$) and the ideal form parameters ($K_p$, $T_i$, $T_d$) are related by:

    - $K_i = K_p / T_i$
    - $K_d = K_p \cdot T_d$

    Be careful when reading datasheets or tuning guides—know which form they're using!

#### Diagram: PID Controller Block Diagram

<iframe src="../../sims/pid-block-diagram/main.html" width="100%" height="400px" scrolling="no"></iframe>

<details markdown="1">
<summary>PID Controller Block Diagram</summary>
Type: diagram

Bloom Taxonomy: Understand (L2)
Bloom Verb: identify, explain

Learning Objective: Students will identify the parallel structure of a PID controller and explain how signals flow from error input to controller output.

Components to show:
- Summing junction for error: e(t) = r(t) - y(t)
- Three parallel branches from error signal:
  - P branch: gain block labeled K_p
  - I branch: integrator block labeled with integral symbol, gain K_i
  - D branch: differentiator block labeled d/dt, gain K_d
- Summing junction combining three branches
- Output u(t) to plant
- Labels showing signal names at each point

Connections:
- Error feeds all three branches simultaneously
- Three branch outputs sum to produce controller output
- Clean parallel structure emphasized

Style: Control systems block diagram style with standard symbols

Labels:
- Input signals: r(t) "Reference", y(t) "Measured Output"
- Error: e(t) with formula shown
- Branch labels: "Proportional", "Integral", "Derivative"
- Output: u(t) "Control Effort"

Color scheme:
- Proportional path: blue
- Integral path: green
- Derivative path: red
- Summing junctions: black circles

Interactive features:
- Hover over each path to see time-domain equation for that action
- Hover over summing junction to see combined equation

Implementation: SVG with JavaScript interactivity
</details>

## Effects of Controller Gains on Closed-Loop Response

Understanding how each gain affects closed-loop behavior is essential for tuning. While the exact effects depend on the plant dynamics, some general patterns emerge.

### Effect of Proportional Gain $K_p$

Increasing proportional gain typically:

- Decreases rise time (faster initial response)
- Decreases steady-state error (but doesn't eliminate it without I action)
- Increases overshoot
- May decrease or increase settling time (depends on the system)
- Can eventually destabilize the system

There's an inherent tradeoff: higher $K_p$ gives faster, more accurate response—up to a point. Beyond that point, oscillations grow and the system becomes underdamped or unstable.

### Effect of Integral Gain $K_i$ (or Integral Time $T_i$)

Increasing integral gain (or decreasing integral time) typically:

- Eliminates steady-state error (this is guaranteed for step inputs)
- Increases overshoot
- Increases settling time (more oscillation)
- Adds phase lag, reducing stability margins

The integral term is slow-acting by nature. Aggressive integral action (high $K_i$, low $T_i$) tries to eliminate error too quickly, causing overshoot and oscillation.

### Effect of Derivative Gain $K_d$ (or Derivative Time $T_d$)

Increasing derivative gain typically:

- Decreases overshoot (better damping)
- Decreases settling time (for moderately underdamped systems)
- Has little effect on rise time
- Has no effect on steady-state error
- Increases noise sensitivity

Derivative action is the "brake pedal" of PID control—it slows down rapid changes, preventing overshoot and oscillation.

| Parameter Increase | Rise Time | Overshoot | Settling Time | Steady-State Error |
|-------------------|-----------|-----------|---------------|-------------------|
| $K_p$ ↑ | Decrease | Increase | Small change | Decrease |
| $K_i$ ↑ | Decrease | Increase | Increase | Eliminate |
| $K_d$ ↑ | Minor change | Decrease | Decrease | No effect |

!!! warning "These Are Guidelines, Not Laws"
    The effects in this table are typical but not universal. The actual behavior depends on the plant dynamics, and there are always exceptions. Use these guidelines as a starting point, then verify with simulation or experiment.

#### Diagram: Gain Effects on Step Response

<iframe src="../../sims/pid-gain-effects/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Gain Effects on Step Response</summary>
Type: microsim

Bloom Taxonomy: Apply (L3)
Bloom Verb: demonstrate, experiment

Learning Objective: Students will experiment with PID gains to observe how each parameter affects closed-loop step response characteristics.

Canvas layout:
- Left side (65%): Step response plot with multiple metrics displayed
- Right side (35%): Control panel with sliders and metrics

Visual elements:
- Step response curve with reference step shown as dashed line
- Annotations for: rise time, overshoot %, settling time, steady-state error
- Multiple traces option to compare before/after
- Grid for reading values
- Color-coded response based on damping (underdamped=blue, overdamped=orange, unstable=red)

Interactive controls:
- Slider: K_p from 0.1 to 20 (default: 2)
- Slider: T_i from 0.1 to 10 seconds (default: 2)
- Slider: T_d from 0 to 2 seconds (default: 0.3)
- Dropdown: Plant type (First-order with delay, Second-order underdamped)
- Button: "Add trace" to overlay comparison
- Button: "Clear traces"
- Button: "Reset to defaults"

Data Visibility Requirements:
- Real-time calculation and display of:
  - Rise time (10-90%)
  - Percent overshoot
  - Settling time (2% criterion)
  - Steady-state error
- Show whether system is stable/unstable
- Display current gain values numerically

Behavior:
- Response updates in real-time as sliders move
- When system becomes unstable, plot shows diverging response with warning
- Metrics update dynamically
- Comparison traces persist until cleared
- Plant selection changes underlying dynamics

Instructional Rationale: Direct parameter manipulation with immediate visual feedback builds intuition faster than analytical study alone. The ability to compare traces reinforces understanding of how each gain change affects the response.

Implementation: p5.js with canvas-based sliders, real-time ODE integration for response simulation
</details>

## Controller Tuning: Finding the Right Gains

Knowing what PID control *is* doesn't tell you what values to use. **Controller tuning** is the art and science of selecting gains that achieve your performance objectives. And it is both art and science—decades of research have produced systematic methods, but experienced practitioners still apply judgment and iteration.

### The Tuning Problem

The challenge: find $K_p$, $K_i$ (or $T_i$), and $K_d$ (or $T_d$) such that the closed-loop system:

- Is stable (absolutely required)
- Has acceptable speed (rise time, settling time)
- Has acceptable accuracy (steady-state error)
- Has acceptable smoothness (overshoot, oscillation)
- Is robust to model uncertainty and disturbances

These goals often conflict. Faster response typically means more overshoot. Better disturbance rejection may reduce stability margins. Tuning is about finding the best compromise for your application.

### Trial and Error Tuning

The most basic tuning method—and often underrated—is **trial and error** (also called manual tuning or experimental tuning). Despite its informal name, skilled practitioners can tune controllers quickly and effectively using this approach.

**Basic procedure:**

1. Start with $K_i = 0$ and $K_d = 0$ (P control only)
2. Increase $K_p$ until the response is reasonably fast with acceptable overshoot, or until the system oscillates, then back off slightly
3. If steady-state error is unacceptable, add integral action: increase $K_i$ slowly until error is eliminated
4. If overshoot is excessive, add derivative action: increase $K_d$ to provide damping
5. Fine-tune all three gains to balance speed, accuracy, and smoothness

| Step | Adjust | Looking For |
|------|--------|-------------|
| 1 | $K_p$ ↑ | Faster response without excessive overshoot |
| 2 | $K_i$ ↑ | Steady-state error elimination |
| 3 | $K_d$ ↑ | Overshoot reduction, smoother response |
| 4 | All | Final balancing of all objectives |

Trial and error works well when:
- You have access to the real system
- You can safely experiment
- Performance requirements aren't extremely tight
- You need a quick solution

The downsides: it requires hands-on access, results depend on the practitioner's skill, and there's no guarantee of optimality.

!!! quote "Gyra Moment"
    "My engineers tuned me this way the first time. Start with just proportional—I'd react but never quite stand vertical. Add some integral—now I can stand straight, but I overshoot when disturbed. Add derivative—much smoother! The process took about an hour of falling over, but eventually we found gains that work. Not perfect, but good enough to not embarrass myself at demos."

## Ziegler-Nichols Tuning Methods

In the 1940s, John Ziegler and Nathaniel Nichols developed two systematic tuning methods that remain widely used today. These methods provide starting point values based on simple experiments—no detailed model required.

### The Ziegler-Nichols Approach

Both Ziegler-Nichols methods aim for a specific response characteristic: approximately 25% overshoot with a decay ratio of about 1/4 (each successive overshoot is one-quarter the previous one). This is more aggressive than some modern preferences, so the results are often used as starting points for further adjustment.

The genius of Ziegler-Nichols is that you don't need a transfer function—just the ability to run simple experiments on the real system.

### The Reaction Curve Method (Open-Loop)

The **reaction curve method** (also called the process reaction curve method or step response method) is based on the open-loop step response of the plant.

**Procedure:**

1. Put the controller in manual mode (open loop)
2. Apply a step change to the plant input
3. Record the output response—the "reaction curve"
4. Identify two parameters from the curve: **delay time** $L$ and **time constant** $T$
5. Calculate controller parameters using the Ziegler-Nichols formulas

The method assumes the open-loop response looks like a first-order system with delay—an S-shaped curve that's common in many industrial processes.

#### Reaction Curve Parameters

The key parameters are found by drawing a tangent line at the point of maximum slope (the inflection point):

- $L$ (delay time or lag): time from step input to where the tangent line intersects the initial value
- $T$ (time constant): time from where tangent intersects initial value to where it intersects final value

#### Diagram: Reaction Curve Analysis

<iframe src="../../sims/reaction-curve-method/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Reaction Curve Analysis</summary>
Type: microsim

Bloom Taxonomy: Apply (L3)
Bloom Verb: calculate, apply

Learning Objective: Students will apply the reaction curve method by identifying L and T parameters from a step response and calculating recommended PID gains.

Canvas layout:
- Top section (60%): Step response plot with interactive tangent line
- Bottom section (40%): Parameter extraction and calculated gains

Visual elements:
- Open-loop step response curve (S-shaped)
- Draggable tangent line at inflection point
- Markers showing L and T on the time axis
- Step input shown as dashed line
- Reference lines at initial and final values
- Annotations for the tangent line construction

Interactive controls:
- Slider: Plant delay from 0.1 to 3 seconds (affects curve shape)
- Slider: Plant time constant from 1 to 10 seconds (affects curve shape)
- Slider: Step magnitude (default: 1)
- Draggable point: Position for tangent line (snaps to curve)
- Button: "Auto-detect parameters"
- Button: "Show Ziegler-Nichols calculations"

Data Visibility Requirements:
- Display extracted L value with units
- Display extracted T value with units
- Show ratio L/T (useful for checking applicability)
- Calculate and display recommended gains:
  - For P: K_p = T/(L)
  - For PI: K_p = 0.9T/(L), T_i = 3.3L
  - For PID: K_p = 1.2T/(L), T_i = 2L, T_d = 0.5L

Behavior:
- When plant parameters change, response curve updates
- Dragging tangent point updates L, T, and calculated gains
- Auto-detect finds optimal tangent position automatically
- Calculated gains update in real-time
- Hover over formulas to see explanation

Instructional Rationale: Hands-on parameter extraction builds understanding of the method's geometric basis. Seeing calculated gains update as parameters change reinforces the relationship between plant characteristics and controller tuning.

Implementation: p5.js with interactive curve and tangent line manipulation
</details>

#### Ziegler-Nichols Reaction Curve Formulas

| Controller | $K_p$ | $T_i$ | $T_d$ |
|------------|-------|-------|-------|
| P | $\frac{T}{L}$ | — | — |
| PI | $0.9 \frac{T}{L}$ | $3.3 L$ | — |
| PID | $1.2 \frac{T}{L}$ | $2 L$ | $0.5 L$ |

where:

- $T$ is the time constant from the reaction curve
- $L$ is the delay time from the reaction curve

!!! tip "When to Use the Reaction Curve Method"
    This method works best when:

    - The plant is open-loop stable
    - The step response is S-shaped (first-order-like with delay)
    - You can run the plant in open loop safely
    - The ratio $L/T$ is between roughly 0.1 and 1

### The Ultimate Gain Method (Closed-Loop)

The **ultimate gain method** (also called the continuous cycling method or closed-loop method) is based on finding the point of marginal stability.

**Procedure:**

1. Set $K_i = 0$ and $K_d = 0$ (proportional-only control)
2. Starting with a low $K_p$, gradually increase the gain
3. At each gain value, apply a small disturbance or setpoint change and observe the response
4. Continue increasing $K_p$ until the system exhibits sustained oscillation—neither growing nor decaying
5. Record this gain as the **ultimate gain** $K_u$
6. Measure the **ultimate period** $T_u$ of the sustained oscillation
7. Calculate controller parameters using the Ziegler-Nichols formulas

#### Ultimate Gain Definition

$K_u$ is the proportional gain at which the closed-loop system is marginally stable—poles exactly on the imaginary axis, producing sustained oscillation without decay or growth.

#### Ultimate Period Definition

$T_u$ is the period of the sustained oscillation at the ultimate gain:

$T_u = \frac{2\pi}{\omega_u}$

where $\omega_u$ is the frequency of oscillation at marginal stability.

#### Diagram: Ultimate Gain Method Visualization

<iframe src="../../sims/ultimate-gain-method/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Ultimate Gain Method Visualization</summary>
Type: microsim

Bloom Taxonomy: Apply (L3)
Bloom Verb: execute, implement

Learning Objective: Students will execute the ultimate gain method by adjusting proportional gain until sustained oscillation occurs, then extract K_u and T_u to calculate PID gains.

Canvas layout:
- Top section (55%): Real-time output response plot
- Middle section (25%): Gain adjustment and measurements
- Bottom section (20%): Calculated PID parameters

Visual elements:
- Output response plot showing system behavior over time
- Reference setpoint line
- Color coding: decaying (green), sustained (yellow), growing (red)
- Period measurement markers when in sustained oscillation
- Gain slider with visual indicator of current region (stable/marginal/unstable)

Interactive controls:
- Large slider: K_p from 0.1 to 50 (logarithmic scale, default: 1)
- Button: "Apply disturbance" (step change to setpoint)
- Button: "Auto-find K_u" (binary search for ultimate gain)
- Checkbox: "Show envelope" (shows amplitude trend)
- Button: "Calculate PID parameters"
- Button: "Reset"

Data Visibility Requirements:
- Current K_p value displayed prominently
- Oscillation status: "Decaying", "Sustained", or "Growing"
- When sustained: show measured T_u
- When K_u found: show both K_u and T_u
- Calculated PID gains:
  - P: K_p = 0.5 K_u
  - PI: K_p = 0.45 K_u, T_i = T_u/1.2
  - PID: K_p = 0.6 K_u, T_i = T_u/2, T_d = T_u/8

Behavior:
- Response updates in real-time as gain changes
- At low K_p: response decays (green)
- At K_u: sustained constant-amplitude oscillation (yellow)
- Above K_u: amplitude grows (red), response clips/saturates
- Period measurement appears during sustained oscillation
- Auto-find uses binary search to locate K_u within tolerance

Instructional Rationale: Interactive search for the ultimate gain mirrors the real experimental procedure. Students develop intuition for how gain affects closed-loop behavior by observing the transition from stable through marginal to unstable.

Implementation: p5.js with real-time simulation and automatic period detection
</details>

#### Ziegler-Nichols Ultimate Gain Formulas

| Controller | $K_p$ | $T_i$ | $T_d$ |
|------------|-------|-------|-------|
| P | $0.5 K_u$ | — | — |
| PI | $0.45 K_u$ | $\frac{T_u}{1.2}$ | — |
| PID | $0.6 K_u$ | $\frac{T_u}{2}$ | $\frac{T_u}{8}$ |

where:

- $K_u$ is the ultimate gain
- $T_u$ is the ultimate period

!!! warning "Safety Considerations"
    The ultimate gain method requires driving the system to the edge of instability. This is dangerous for some systems (a marginally stable nuclear reactor is a bad idea). Use this method only when:

    - The system can safely oscillate
    - Amplitude-limited oscillation won't cause damage
    - You can quickly reduce the gain if things go wrong

### Comparing the Two Methods

| Aspect | Reaction Curve | Ultimate Gain |
|--------|---------------|---------------|
| Loop status | Open | Closed |
| Model required | No | No |
| Safety | Lower risk (open loop) | Higher risk (marginal stability) |
| Applicability | Open-loop stable plants | Any stable plant |
| Accuracy | Sensitive to curve interpretation | More precise (directly measures closed-loop behavior) |
| Ease | Requires clean step response | Requires careful gain adjustment |

Both methods produce starting points, not final tuning. The Ziegler-Nichols formulas are designed for a specific response characteristic (1/4 decay ratio, ~25% overshoot). Modern practice often prefers less aggressive tuning with lower overshoot.

## Practical Issues in PID Control

The ideal PID controller we've discussed so far exists only in textbooks. Real implementations face several challenges that require practical modifications.

### Anti-Windup: Taming the Integral

**Integral windup** occurs when the actuator saturates—that is, when the controller output exceeds what the actuator can deliver. During saturation, the integral term keeps accumulating error, but the actual control effort isn't increasing (the actuator is maxed out). When the error finally changes sign, that accumulated integral must "unwind" before the control effort changes direction, causing significant overshoot and delayed response.

Consider Gyra trying to recover from a large disturbance. Her motors have maximum torque limits. If she's leaning far and her controller's integral term keeps growing, but the motors are already at maximum, the integral is accumulating "debt" that will cause her to overcorrect massively once she crosses vertical.

#### Anti-Windup Strategies

**Integrator clamping:** Stop integrating when the output is saturated.

$\text{if } |u| \geq u_{max}: \quad \text{freeze integral}$

**Back-calculation:** When saturated, feed back the saturation error to reduce the integral.

$\frac{d}{dt}\left(\int e \, dt\right) = e(t) + \frac{1}{T_t}(u_{actual} - u_{calculated})$

where $T_t$ is a tracking time constant.

**Conditional integration:** Only integrate when the error is small or the output is moving in the right direction.

| Method | Complexity | Effectiveness | Tuning Effort |
|--------|-----------|---------------|---------------|
| Integrator clamping | Low | Moderate | None |
| Back-calculation | Medium | High | One parameter ($T_t$) |
| Conditional integration | Medium | High | Some logic design |

!!! quote "Gyra Moment"
    "Before my engineers added anti-windup, recovering from big disturbances was ugly. I'd lean way over, my motors would hit their limits, my integral would build and build... then when I crossed vertical, I'd fly past and tip the other direction. Now, when my motors saturate, my integral stops growing. Much more dignified recovery."

### Derivative Kick: Smoothing Setpoint Changes

**Derivative kick** is a sudden spike in the control output that occurs when the setpoint changes abruptly. The derivative term responds to the rate of change of error, and if the setpoint jumps (a step change), the derivative of error is theoretically infinite at that instant.

In practice, this causes a brief but potentially violent control action right when you change the setpoint—not what you want in a well-behaved system.

#### Solutions to Derivative Kick

**Derivative on measurement (not error):** Instead of differentiating the error $e = r - y$, differentiate only the measurement $y$. Setpoint changes don't affect the derivative term.

$u_d(t) = -K_d \frac{dy(t)}{dt}$

The minus sign accounts for the fact that we're differentiating $y$ rather than $e = r - y$.

**Setpoint filtering:** Pass the setpoint through a low-pass filter before computing the error, smoothing sudden changes.

**Derivative filtering:** Apply a low-pass filter to the derivative term itself.

#### Modified PID with Derivative on Measurement

$u(t) = K_p \cdot e(t) + K_i \int e(\tau) d\tau - K_d \frac{dy(t)}{dt}$

This formulation eliminates derivative kick while maintaining the derivative's beneficial effect on output disturbances.

| Issue | Cause | Solution |
|-------|-------|----------|
| Derivative kick | Differentiating step change in setpoint | Derivative on measurement |
| Noise amplification | Differentiating noisy sensor signal | Low-pass filter on derivative |
| Integrator windup | Actuator saturation | Anti-windup techniques |

#### Diagram: Anti-Windup and Derivative Kick Effects

<iframe src="../../sims/pid-practical-issues/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Anti-Windup and Derivative Kick Effects</summary>
Type: microsim

Bloom Taxonomy: Analyze (L4)
Bloom Verb: compare, differentiate

Learning Objective: Students will analyze the effects of integral windup and derivative kick by comparing system responses with and without mitigation strategies.

Canvas layout:
- Top half (50%): Two side-by-side response plots (with/without fix)
- Bottom half (50%): Controls, actuator visualization, and integral state display

Visual elements:
- Response plots showing setpoint, output, and control signal
- Actuator status bar showing saturation limits
- Integral accumulator visualization (bar graph growing/shrinking)
- Color coding for normal operation (green) vs. saturated (red)
- Spike indicator for derivative kick

Interactive controls:
- Radio buttons: Issue to demonstrate (Integral Windup, Derivative Kick)
- Toggle: "Apply fix" (anti-windup or derivative on measurement)
- Slider: Setpoint step magnitude (for derivative kick demo)
- Slider: Disturbance magnitude (for windup demo)
- Slider: Saturation limit (for windup demo)
- Button: "Apply disturbance/setpoint change"
- Button: "Reset"

Data Visibility Requirements:
- Real-time integral value display
- Actuator output vs. calculated output (showing saturation)
- Peak overshoot comparison (with fix vs. without)
- Settling time comparison
- For derivative kick: show instantaneous derivative value

Behavior:
- Windup demo: Large disturbance pushes output far from setpoint, integral accumulates during saturation, compare recovery with/without anti-windup
- Derivative kick demo: Step setpoint change, compare control signal spike with/without derivative-on-measurement
- Split-screen shows both cases simultaneously for direct comparison

Instructional Rationale: Side-by-side comparison makes the problem and solution immediately apparent. Students see the internal states (integral accumulator, derivative signal) that cause the issues.

Implementation: p5.js with dual simulation running in parallel, real-time state visualization
</details>

## Selecting a Controller Type

When should you use P, PI, PD, or full PID? The choice depends on your performance requirements and the characteristics of your plant.

### Decision Guidelines

**Use P control when:**
- Some steady-state error is acceptable
- The plant has natural integration (the system inherently integrates, so P control gives zero steady-state error)
- Maximum simplicity is required
- You're experimenting before adding more complexity

**Use PI control when:**
- Zero steady-state error is required (most industrial applications)
- Derivative action isn't needed or is problematic (noisy sensors)
- Overshoot tolerance is moderate
- This is your default choice for most loops

**Use PD control when:**
- The plant is difficult to control without anticipation (marginally stable, high-order)
- Steady-state error can be tolerated
- Noise is manageable
- Speed of response is more important than zero error

**Use full PID when:**
- Zero steady-state error is required
- Overshoot must be minimized
- The plant benefits from derivative action
- Noise can be filtered or is inherently low

| Controller | Steady-State Error | Overshoot | Complexity | Noise Sensitivity |
|------------|-------------------|-----------|------------|-------------------|
| P | Non-zero | Moderate | Lowest | None |
| PI | Zero | Higher | Low | None |
| PD | Non-zero | Lower | Low | Higher |
| PID | Zero | Lowest | Moderate | Higher |

!!! tip "Start Simple"
    Many engineers advocate starting with the simplest controller that might work, then adding complexity only as needed. Try P first. If steady-state error is unacceptable, add I. If overshoot or oscillation is unacceptable, add D. This incremental approach often reaches a good solution faster than immediately jumping to full PID.

## A Systematic Tuning Workflow

Here's a practical workflow for tuning a PID controller, combining multiple methods:

1. **Understand the plant:** Is it stable? Fast or slow? Noisy? Are there actuator limits?

2. **Choose controller type:** Based on requirements (steady-state error, overshoot tolerance)

3. **Get initial values:**
   - If you can run open-loop tests: use reaction curve method
   - If you can safely oscillate: use ultimate gain method
   - If neither: start with trial and error or use model-based methods

4. **Apply initial tuning:** Implement the calculated values

5. **Evaluate performance:** Run step responses, measure rise time, overshoot, settling time, steady-state error

6. **Refine tuning:**
   - Too slow? Increase $K_p$
   - Too much overshoot? Decrease $K_p$, increase $K_d$, or increase $T_i$
   - Steady-state error? Decrease $T_i$ (or add/increase $K_i$)
   - Oscillation? Decrease all gains, especially $K_p$

7. **Implement practical fixes:** Add anti-windup, derivative filtering, derivative on measurement as needed

8. **Validate robustness:** Test with different operating conditions, disturbances, setpoint changes

#### Diagram: Tuning Decision Flowchart

<iframe src="../../sims/tuning-flowchart/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Tuning Decision Flowchart</summary>
Type: workflow

Bloom Taxonomy: Evaluate (L5)
Bloom Verb: assess, recommend

Learning Objective: Students will assess system requirements and select appropriate tuning methods and controller configurations by following a systematic decision process.

Purpose: Guide the tuning method selection and controller type choice based on system characteristics and requirements

Visual style: Flowchart with decision diamonds and process rectangles

Steps:
1. Start: "Begin Tuning Process"
   Hover text: "Gather requirements: accuracy, speed, overshoot limits"

2. Decision: "Open-loop test possible?"
   Hover text: "Can you safely run the plant with no feedback?"

3a. Process: "Run Reaction Curve Method" (if yes)
   Hover text: "Step input, measure L and T from response"

3b. Decision: "Safe to oscillate?" (if no)
   Hover text: "Can the plant safely sustain oscillation at marginal stability?"

4a. Process: "Run Ultimate Gain Method" (if yes)
   Hover text: "Increase K_p until sustained oscillation, measure K_u and T_u"

4b. Process: "Use Trial and Error or Model-Based" (if no)
   Hover text: "Manual tuning starting with P-only, or use analytical methods if model available"

5. Decision: "Steady-state error acceptable?"
   Hover text: "Can you tolerate persistent offset from setpoint?"

6a. Process: "Use P or PD Controller" (if yes)
6b. Process: "Use PI or PID Controller" (if no)

7. Decision: "Overshoot acceptable?"
   Hover text: "Is the calculated overshoot within limits?"

8a. Process: "Add/increase D action" (if no)
8b. Decision: "Performance adequate?" (if yes)

9a. End: "Tuning Complete" (if yes)
9b. Process: "Refine gains iteratively" (if no, loop back)

Color coding:
- Decision diamonds: yellow
- Process boxes: blue
- Methods: green borders
- Endpoints: rounded rectangles

Swimlanes:
- Method selection
- Controller selection
- Refinement

Interactive features:
- Click each step for detailed guidance
- Hover shows context-specific tips

Implementation: SVG flowchart with JavaScript interactivity
</details>

## Summary and Key Takeaways

PID control combines three complementary actions to achieve robust, accurate control across a vast range of applications:

- **Proportional (P):** Responds to present error—fast reaction, but can't eliminate steady-state error alone
- **Integral (I):** Responds to accumulated past error—eliminates steady-state error, but adds phase lag and can wind up
- **Derivative (D):** Responds to rate of change—provides anticipation and damping, but amplifies noise

The controller transfer function in parallel form is:

#### PID Transfer Function (Parallel Form)

$G_c(s) = K_p + \frac{K_i}{s} + K_d s$

Or in ideal form with integral and derivative time constants:

#### PID Transfer Function (Ideal Form)

$G_c(s) = K_p \left(1 + \frac{1}{T_i s} + T_d s\right)$

**Tuning methods:**

- **Trial and error:** Practical, hands-on, depends on skill
- **Ziegler-Nichols reaction curve:** Open-loop step test, extract L and T
- **Ziegler-Nichols ultimate gain:** Closed-loop oscillation test, find $K_u$ and $T_u$

**Practical issues:**

- **Integral windup:** Accumulation during saturation; fix with anti-windup
- **Derivative kick:** Spike from setpoint changes; fix with derivative on measurement
- **Noise sensitivity:** Derivative amplifies high frequencies; fix with filtering

The PID controller isn't optimal, isn't sophisticated, and isn't new. But it's robust, intuitive, and effective. More than 90% of industrial control loops trust their operation to this century-old algorithm—and now you understand why.

!!! quote "Gyra Moment"
    "My PID controller isn't perfect. Sometimes I oscillate a bit. Sometimes I lean slightly before correcting. But every millisecond, it's doing the same three things: looking at where I am (P), remembering where I've been (I), and guessing where I'm going (D). Three simple ideas, combined right, keeping me upright. That's the power of PID."

??? note "Check Your Understanding"
    1. Why can't a P-only controller eliminate steady-state error for a step input in most systems?
    2. What is the relationship between integral gain $K_i$ and integral time $T_i$?
    3. In the Ziegler-Nichols ultimate gain method, what happens when $K_p$ exceeds $K_u$?
    4. Why is derivative action typically applied to the measurement rather than the error?
    5. What causes integral windup, and how does anti-windup prevent it?

