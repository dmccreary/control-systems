---
title: Steady-State Error Analysis
description: Understanding how control systems track reference inputs after transients settle, including error constants, system type classification, and disturbance rejection
generated_by: claude skill chapter-content-generator
date: 2026-01-31
version: 0.03
---

# Steady-State Error Analysis

## Summary

This chapter focuses on the accuracy of control systems in tracking reference inputs after transients have settled. Students will learn to calculate steady-state errors for step, ramp, and parabolic inputs using error constants (position, velocity, and acceleration). The system type classification based on the number of integrators in the open-loop transfer function provides a systematic way to predict steady-state accuracy. The chapter also addresses how disturbances affect steady-state performance and how controller design can reduce or eliminate steady-state errors.

## Concepts Covered

This chapter covers the following 13 concepts from the learning graph:

1. Steady-State Error
2. Steady-State Accuracy
3. Error Constants
4. Position Error Constant
5. Velocity Error Constant
6. Acceleration Error Constant
7. System Type
8. Type 0 System
9. Type 1 System
10. Type 2 System
11. Type Number
12. Error Coefficients
13. Disturbance Error

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Introduction to Control Systems](../01-intro-to-control-systems/index.md)
- [Chapter 3: Time-Domain Response Fundamentals](../03-time-domain-response/index.md)
- [Chapter 6: Poles, Zeros, and System Analysis](../06-poles-zeros-system-analysis/index.md)
- [Chapter 9: Block Diagrams and Signal Flow](../09-block-diagrams-signal-flow/index.md)

---

## The Long-Term View: When the Dust Settles

We've spent considerable effort understanding transient behavior—the drama of overshoot, oscillation, and settling that occurs when a system responds to a change. But here's the thing: transients are temporary by definition. What really matters for many applications is what happens *after* all that excitement dies down. Does the output actually reach the desired value? Or does it stubbornly stop short?

This is the domain of **steady-state error analysis**—figuring out how accurately a control system tracks its reference input once all transient behavior has disappeared. It's the difference between a thermostat that eventually settles at 72°F (zero error) and one that insists on stopping at 71°F no matter what you do (persistent error). That one-degree gap might not sound like much, but in precision manufacturing, robotic surgery, or satellite pointing, even tiny steady-state errors can be catastrophic.

The good news? Steady-state error isn't mysterious or unpredictable. It depends on just a few structural properties of the system—properties we can identify by inspection and design around systematically. By the end of this chapter, you'll be able to look at a control system block diagram and predict its steady-state accuracy for different types of inputs. That's a powerful design tool.

## What Is Steady-State Error?

The **steady-state error** $e_{ss}$ is the difference between the reference input and the actual output as time approaches infinity, after all transient components have decayed:

$$e_{ss} = \lim_{t \to \infty} e(t) = \lim_{t \to \infty} [r(t) - y(t)]$$

For a stable system, this limit exists and is finite. If the system is unstable, talking about steady-state error is meaningless—the output is diverging, not settling.

Here's the conceptual picture: you command the system to do something (the reference input $r(t)$), and the system tries to follow. The error signal $e(t)$ is the instantaneous gap between what you wanted and what you got. During transients, this error bounces around as the system adjusts. Eventually, for stable systems, the error settles to some constant value—and that's the steady-state error.

| Scenario | Steady-State Error | Implication |
|----------|-------------------|-------------|
| $e_{ss} = 0$ | Perfect tracking | System reaches exact desired value |
| $e_{ss} > 0$ | Positive error | Output falls short of reference |
| $e_{ss} < 0$ | Negative error | Output overshoots reference |

!!! tip "Sign Convention"
    The definition $e(t) = r(t) - y(t)$ means positive error indicates the output is *below* the reference. Some textbooks define error as $y(t) - r(t)$, which flips the sign. Always check the convention being used, especially when reading data sheets or papers.

## Steady-State Accuracy

While steady-state error is the absolute difference, **steady-state accuracy** refers to how close the system gets to perfect tracking—it's the complement of error. A system with zero steady-state error has perfect steady-state accuracy. A system with 5% steady-state error has 95% steady-state accuracy.

Accuracy requirements vary dramatically by application:

- **Home HVAC**: ±2°F is typically acceptable
- **Industrial process control**: ±0.1% often required
- **Telescope tracking**: Sub-arcsecond accuracy needed
- **Inertial navigation**: Parts per million over extended time

The key insight is that steady-state accuracy is a design specification—you decide how accurate you need to be, then design a controller that achieves it. This chapter gives you the tools to do exactly that.

!!! quote "Gyra Moment"
    "When I'm standing still—or at least trying to—the steady-state error is whether I'm truly vertical or leaning slightly to one side. Even after all my oscillations die down, if I'm consistently tilted forward by 0.5 degrees, that's my steady-state error. My engineers might accept a tiny lean, or they might add more integral action to eliminate it completely. Either way, they need to *know* what the error will be before they deploy me."

## The Unity Feedback Configuration

To analyze steady-state error systematically, we need a standard framework. The most common configuration is the **unity feedback** system:

```
     r(t)      e(t)         y(t)
      ○────>───○────>[ G(s) ]────>───┬───>
              -↑                      │
               └──────────────────────┘
```

In this configuration:

- $r(t)$ is the reference input
- $e(t) = r(t) - y(t)$ is the error signal
- $G(s)$ is the open-loop transfer function (controller + plant combined)
- $y(t)$ is the output, which is fed back directly (hence "unity" feedback)

The closed-loop transfer function is:

$$T(s) = \frac{G(s)}{1 + G(s)}$$

And the error transfer function is:

$$\frac{E(s)}{R(s)} = \frac{1}{1 + G(s)}$$

This relationship is the key to our analysis. The steady-state error depends on both the input $R(s)$ and the open-loop transfer function $G(s)$.

#### Diagram: Unity Feedback System Structure

<iframe src="../../sims/unity-feedback-structure/main.html" width="100%" height="400px" scrolling="no"></iframe>

<details markdown="1">
<summary>Unity Feedback System Structure</summary>
Type: infographic

Bloom Taxonomy: Understand (L2)
Bloom Verb: explain, interpret

Learning Objective: Students will explain the relationship between reference, error, and output signals in a unity feedback configuration.

Layout: Animated block diagram showing signal flow

Visual elements:
- Reference input r(t) entering from left (green arrow/signal)
- Summing junction with + and - labels
- Error signal e(t) (red arrow) from summing junction to G(s) block
- G(s) block (blue rectangle) labeled "Open-Loop TF"
- Output y(t) (blue arrow) exiting right and feeding back
- Feedback path (dashed line) returning to summing junction
- Signal values displayed at each point

Interactive elements:
- Slider for reference input amplitude
- Display showing r(t), e(t), and y(t) values in real-time
- Hover over each element for description
- Toggle: Show transfer function equations

Data Visibility Requirements:
- Show numerical values of all signals
- Display $T(s) = G(s)/(1+G(s))$ formula
- Display $E(s)/R(s) = 1/(1+G(s))$ formula
- Animate signal flow with moving dots

Instructional Rationale: Visual representation of signal flow with real-time values helps students understand how error emerges from the feedback structure.

Implementation: p5.js with canvas-based controls and animation
</details>

## The Final Value Theorem Approach

The workhorse for steady-state error calculations is the **Final Value Theorem** from Laplace transform theory:

$$\lim_{t \to \infty} f(t) = \lim_{s \to 0} sF(s)$$

This theorem is valid only when $f(t)$ has a finite limit as $t \to \infty$—meaning the system must be stable and the input must allow a steady state to exist.

For our unity feedback system:

$$e_{ss} = \lim_{t \to \infty} e(t) = \lim_{s \to 0} sE(s) = \lim_{s \to 0} s \cdot \frac{R(s)}{1 + G(s)}$$

This elegant formula shows that steady-state error depends on two things:

1. **The input** $R(s)$—what are we asking the system to track?
2. **The open-loop transfer function** $G(s)$—what resources does the system have to track it?

The interplay between these factors determines whether the steady-state error is zero, finite, or infinite.

!!! warning "Validity Check"
    Before applying the Final Value Theorem, verify that all poles of $sE(s)$ are in the left half-plane (except possibly a simple pole at the origin). If the closed-loop system is unstable, the FVT gives meaningless results.

## Standard Test Inputs

We analyze steady-state error for three canonical input types, each representing a class of real-world tracking demands:

| Input Type | Time Domain | Laplace Transform | Physical Meaning |
|------------|-------------|-------------------|------------------|
| Step | $r(t) = R_0$ | $R(s) = R_0/s$ | Set-point change, position command |
| Ramp | $r(t) = R_0 t$ | $R(s) = R_0/s^2$ | Constant velocity, linear increase |
| Parabolic | $r(t) = R_0 t^2/2$ | $R(s) = R_0/s^3$ | Constant acceleration |

The step input asks: "Can you reach and hold a new position?" The ramp asks: "Can you track a moving target?" The parabolic asks: "Can you track an accelerating target?" Each successive input type is more demanding, requiring more from the control system.

!!! example "Real-World Examples"
    - **Step input**: Setting a thermostat to a new temperature, commanding a robotic arm to a position
    - **Ramp input**: A radar antenna tracking a satellite moving at constant angular velocity
    - **Parabolic input**: Tracking a rocket during powered ascent (constant acceleration)

## System Type: Counting Integrators

Here's where the magic happens. The **system type** is defined as the number of poles at the origin in the open-loop transfer function $G(s)$. This is equivalent to the number of integrators in the forward path.

A general open-loop transfer function can be written as:

$$G(s) = \frac{K(s + z_1)(s + z_2)\cdots(s + z_m)}{s^n(s + p_1)(s + p_2)\cdots(s + p_q)}$$

where:

- $K$ is the open-loop gain (also called the Bode gain)
- $n$ is the **system type** (number of integrators, or poles at origin)
- The $z_i$ are the finite zeros
- The $p_i$ are the finite poles

The system type $n$ has profound implications for steady-state accuracy:

| System Type | Poles at Origin | Physical Interpretation |
|-------------|-----------------|------------------------|
| Type 0 | None | No integrators in loop |
| Type 1 | One ($1/s$) | One integrator in loop |
| Type 2 | Two ($1/s^2$) | Two integrators in loop |
| Type N | $N$ ($1/s^n$) | $N$ integrators in loop |

Why does this matter? Integrators accumulate error over time. As long as any error exists, the integrator's output keeps growing, driving the system toward zero error. More integrators mean more "error-correcting muscle"—but also more phase lag and potential stability issues.

!!! quote "Helping Gyra"
    "Think about what an integrator does for me. If I'm leaning forward, a proportional controller just pushes back proportionally—but it needs some lean to know *how much* to push. An integrator, though, keeps track of *how long* I've been leaning. Even a tiny persistent tilt accumulates into a strong corrective action over time. One integrator can eliminate steady-state error to a step. Two integrators can track a ramp. But too many integrators, and I start feeling sluggish—the cure becomes worse than the disease."

#### Diagram: System Type Classification

<iframe src="../../sims/system-type-classification/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>System Type Classification</summary>
Type: infographic

Bloom Taxonomy: Understand (L2)
Bloom Verb: classify, identify

Learning Objective: Students will classify control systems by type based on the number of integrators in the open-loop transfer function.

Layout: Three columns showing Type 0, Type 1, and Type 2 systems

Column 1 - Type 0:
- Block diagram with no integrators
- Example: $G(s) = K/(s+a)$
- Pole-zero plot showing no poles at origin
- Label: "No integrators"

Column 2 - Type 1:
- Block diagram with one integrator block
- Example: $G(s) = K/[s(s+a)]$
- Pole-zero plot showing one pole at origin
- Label: "One integrator"

Column 3 - Type 2:
- Block diagram with two integrator blocks
- Example: $G(s) = K/[s^2(s+a)]$
- Pole-zero plot showing two poles at origin
- Label: "Two integrators"

Interactive elements:
- Hover over each column to see step response characteristics
- Click to reveal steady-state error predictions for step, ramp, parabolic inputs
- Toggle between block diagram and transfer function views

Visual style: Clean engineering diagrams, color-coded (orange for Type 0, blue for Type 1, green for Type 2)

Instructional Rationale: Visual classification with examples builds recognition skills for quickly identifying system type from transfer functions or block diagrams.

Implementation: HTML/CSS/JavaScript with interactive reveals
</details>

## Error Constants: The Tracking Currency

To quantify steady-state error, we define three **error constants** that characterize the system's tracking capability. These constants are determined solely by the open-loop transfer function $G(s)$.

### Position Error Constant $K_p$

The **position error constant** measures the system's ability to track a step input:

$$K_p = \lim_{s \to 0} G(s)$$

For a step input $R(s) = R_0/s$, the steady-state error is:

$$e_{ss} = \frac{R_0}{1 + K_p}$$

| System Type | $K_p$ Value | Steady-State Error to Step |
|-------------|-------------|---------------------------|
| Type 0 | Finite ($K_p$) | $R_0/(1 + K_p)$ — finite error |
| Type 1 | $\infty$ | $0$ — zero error |
| Type 2 | $\infty$ | $0$ — zero error |

A Type 0 system can *never* have zero steady-state error to a step—it will always stop short of the target by an amount that depends on the gain $K_p$. The only way to eliminate this error is to add an integrator to the loop.

### Velocity Error Constant $K_v$

The **velocity error constant** measures the system's ability to track a ramp input:

$$K_v = \lim_{s \to 0} sG(s)$$

For a ramp input $R(s) = R_0/s^2$, the steady-state error is:

$$e_{ss} = \frac{R_0}{K_v}$$

| System Type | $K_v$ Value | Steady-State Error to Ramp |
|-------------|-------------|---------------------------|
| Type 0 | $0$ | $\infty$ — cannot track |
| Type 1 | Finite ($K_v$) | $R_0/K_v$ — finite error |
| Type 2 | $\infty$ | $0$ — zero error |

The name "velocity" error constant makes sense: a ramp input represents constant velocity motion, and $K_v$ tells us how well the system can follow. A Type 0 system cannot track a ramp at all—the error grows without bound. A Type 1 system tracks with a finite lag. Only Type 2 or higher can track a ramp perfectly.

### Acceleration Error Constant $K_a$

The **acceleration error constant** measures the system's ability to track a parabolic input:

$$K_a = \lim_{s \to 0} s^2G(s)$$

For a parabolic input $R(s) = R_0/s^3$, the steady-state error is:

$$e_{ss} = \frac{R_0}{K_a}$$

| System Type | $K_a$ Value | Steady-State Error to Parabolic |
|-------------|-------------|--------------------------------|
| Type 0 | $0$ | $\infty$ — cannot track |
| Type 1 | $0$ | $\infty$ — cannot track |
| Type 2 | Finite ($K_a$) | $R_0/K_a$ — finite error |

Only Type 2 systems (or higher) can track parabolic inputs with finite error. Type 3 would be needed for zero error to a parabolic—but Type 3 systems are rare in practice due to stability challenges.

#### Diagram: Error Constants Calculator

<iframe src="../../sims/error-constants-calculator/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Error Constants Calculator</summary>
Type: microsim

Bloom Taxonomy: Apply (L3)
Bloom Verb: calculate, use

Learning Objective: Students will calculate error constants ($K_p$, $K_v$, $K_a$) from a given transfer function and determine steady-state errors for different input types.

Canvas layout:
- Top (30%): Transfer function input and display
- Middle (40%): Error constants calculation with step-by-step work
- Bottom (30%): Results table and input selector

Visual elements:
- Transfer function input field with numerator and denominator coefficient entry
- Parsed transfer function displayed in standard form
- Limit calculations shown step-by-step:
  - $K_p = \lim_{s \to 0} G(s) = ?$
  - $K_v = \lim_{s \to 0} sG(s) = ?$
  - $K_a = \lim_{s \to 0} s^2G(s) = ?$
- Results displayed in formatted table

Interactive controls:
- Text inputs for transfer function coefficients
- Dropdown: Select preset examples (Type 0, 1, 2 systems)
- Slider: Input amplitude $R_0$
- Dropdown: Input type (step, ramp, parabolic)
- Button: Calculate
- Button: Show work / Hide work toggle

Data Visibility Requirements:
- Display system type (detected from G(s))
- Show each limit calculation with substitution
- Display error constant values: $K_p$, $K_v$, $K_a$
- Show steady-state error formula and result
- Indicate whether error is zero, finite, or infinite

Behavior:
- Parse coefficients and construct G(s)
- Identify system type from poles at origin
- Compute limits symbolically where possible
- Display step-by-step calculation
- Update error prediction when input type changes

Instructional Rationale: Active calculation with visible work helps students understand the limit-taking process and builds procedural fluency for exam problems.

Implementation: p5.js with canvas-based text display and input parsing
</details>

## The Master Table: System Type vs. Input Type

This table is worth memorizing—it summarizes everything about steady-state error for unity feedback systems:

| System Type | Step ($1/s$) | Ramp ($1/s^2$) | Parabolic ($1/s^3$) |
|-------------|--------------|----------------|---------------------|
| **Type 0** | $\frac{R_0}{1+K_p}$ (finite) | $\infty$ | $\infty$ |
| **Type 1** | $0$ | $\frac{R_0}{K_v}$ (finite) | $\infty$ |
| **Type 2** | $0$ | $0$ | $\frac{R_0}{K_a}$ (finite) |

The pattern is elegant:

- A Type $n$ system has zero steady-state error to inputs up to order $n$
- It has finite error to inputs of order $n+1$
- It has infinite error (cannot track) for inputs of order $n+2$ and higher

!!! tip "Memory Device"
    Think of system type as "how many derivatives of the input the system can handle." A Type 1 system can track position (zero-th derivative) perfectly, but struggles with velocity (first derivative). A Type 2 system handles both position and velocity, but struggles with acceleration (second derivative).

## Error Coefficients

The term **error coefficients** is often used interchangeably with error constants, but sometimes refers more broadly to any parameter characterizing steady-state accuracy. In some texts, error coefficients include variations for non-unity feedback configurations or for disturbance rejection.

The key relationships remain:

$$K_p = \lim_{s \to 0} G(s)$$

$$K_v = \lim_{s \to 0} sG(s)$$

$$K_a = \lim_{s \to 0} s^2G(s)$$

These coefficients are the currency of steady-state accuracy: higher coefficients mean smaller errors. When you specify that a system must have $e_{ss} < 0.01$ for a unit ramp, you're implicitly requiring $K_v > 100$.

## Type 0 Systems: The Proportional Controller Case

A **Type 0 system** has no integrators in the open-loop transfer function. The simplest example is a proportional controller with a first-order plant:

$$G(s) = \frac{K}{s + a}$$

The position error constant is:

$$K_p = \lim_{s \to 0} \frac{K}{s + a} = \frac{K}{a}$$

For a unit step input, the steady-state error is:

$$e_{ss} = \frac{1}{1 + K/a}$$

This error can be made smaller by increasing the gain $K$—but it can never be made zero, no matter how large $K$ becomes. There's always a finite gap between where you want to be and where the system settles.

!!! example "The Cruise Control Analogy"
    Imagine a car with cruise control that uses only proportional feedback. If you set the target speed to 60 mph and encounter a hill, the controller needs some speed error to generate the extra throttle. On a steep uphill, you might only be able to maintain 57 mph—the 3 mph error is the proportional signal driving the extra power. This is steady-state error in action.

#### Diagram: Type 0 System Response

<iframe src="../../sims/type-zero-response/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Type 0 System Response</summary>
Type: microsim

Bloom Taxonomy: Apply (L3)
Bloom Verb: demonstrate, predict

Learning Objective: Students will predict and observe steady-state error for Type 0 systems with different gain values.

Canvas layout:
- Left (60%): Time response plot showing step input and system output
- Right (40%): Controls and calculations panel

Visual elements:
- Reference step input (dashed black line at height 1)
- System output response (blue curve)
- Steady-state error highlighted (red shaded gap)
- Annotation showing $e_{ss}$ value
- Asymptotic line at final value

Interactive controls:
- Slider: Open-loop gain K from 1 to 100 (default: 10)
- Slider: Plant pole location (parameter a) from 0.5 to 5 (default: 1)
- Toggle: Show/hide transient
- Button: Reset

Data Visibility Requirements:
- Display $G(s) = K/(s+a)$ with current values
- Show $K_p = K/a = [value]$
- Show $e_{ss} = 1/(1+K_p) = [value]$
- Display percentage error
- Show how $e_{ss}$ changes as K increases

Behavior:
- Response curve updates in real-time as sliders change
- Steady-state error gap shrinks as K increases but never reaches zero
- Display approaches $y_{ss} = K_p/(1+K_p)$ as t → ∞
- Color intensity of error region indicates error magnitude

Instructional Rationale: Interactive gain adjustment reveals that no finite gain eliminates steady-state error for Type 0 systems—students discover this limitation experientially.

Implementation: p5.js with canvas-based controls
</details>

## Type 1 Systems: Adding Integration

A **Type 1 system** has one integrator in the open-loop path. This could be a physical integrator (like the DC motor position from velocity) or a controller integrator (like the integral term in a PI controller).

A typical Type 1 system:

$$G(s) = \frac{K}{s(s + a)}$$

The error constants are:

$$K_p = \lim_{s \to 0} \frac{K}{s(s+a)} = \infty$$

$$K_v = \lim_{s \to 0} \frac{sK}{s(s+a)} = \lim_{s \to 0} \frac{K}{s+a} = \frac{K}{a}$$

$$K_a = \lim_{s \to 0} \frac{s^2 K}{s(s+a)} = 0$$

This gives us:

- **Zero** steady-state error to a step input
- **Finite** steady-state error to a ramp input: $e_{ss} = R_0 a/K$
- **Infinite** steady-state error to a parabolic input (cannot track)

The integrator "keeps score" of accumulated error. Even if the instantaneous error is tiny, the integrator output keeps growing until the error is exactly zero—at least for step inputs. For ramp inputs, the integrator can maintain pace but with a constant lag.

!!! quote "Helping Gyra"
    "Here's how integral action feels to me: if I lean forward even a little bit, my integrator starts accumulating that lean. The longer I lean, the stronger my correction becomes. Eventually, the correction is strong enough to stand me perfectly upright—not just 'mostly' upright, but *exactly* upright. That's zero steady-state error to a step. But if someone pushes me at a constant rate (a ramp disturbance), I can only keep up with a certain lag. I'm one integrator short of perfection."

## Type 2 Systems: Double Integration

A **Type 2 system** has two integrators in the open-loop path. This configuration is less common but appears in systems requiring high tracking accuracy for velocity inputs—like antenna pointing systems or precision machine tools.

A typical Type 2 system:

$$G(s) = \frac{K}{s^2(s + a)}$$

The error constants are:

$$K_p = \infty, \quad K_v = \infty, \quad K_a = \lim_{s \to 0} \frac{s^2 K}{s^2(s+a)} = \frac{K}{a}$$

This provides:

- **Zero** steady-state error to step inputs
- **Zero** steady-state error to ramp inputs
- **Finite** steady-state error to parabolic inputs: $e_{ss} = R_0 a/K$

The extra integrator eliminates ramp tracking error but introduces additional phase lag. Type 2 systems can be challenging to stabilize—the double integration contributes 180° of phase lag at all frequencies, eating into your phase margin before the controller even starts.

| System Type | Integration | Benefits | Challenges |
|-------------|-------------|----------|------------|
| Type 0 | None | Easy to stabilize | Finite step error |
| Type 1 | Single | Zero step error | Finite ramp error |
| Type 2 | Double | Zero ramp error | Harder to stabilize |

!!! warning "Stability Trade-off"
    Adding integrators improves steady-state accuracy but makes stability more challenging. Each integrator adds 90° of phase lag at high frequencies. Type 2 and higher systems require careful compensator design to maintain adequate stability margins. There's no free lunch in control design.

## Calculating Steady-State Error: Worked Examples

Let's work through several examples to build procedural fluency.

### Example 1: Type 1 System with Step Input

Given:
$$G(s) = \frac{10}{s(s+2)}$$

Find the steady-state error for a unit step input.

**Step 1:** Identify system type.
The denominator has $s^1$ in the factored form, so this is a **Type 1** system.

**Step 2:** For a step input, we need $K_p$.
$$K_p = \lim_{s \to 0} G(s) = \lim_{s \to 0} \frac{10}{s(s+2)} = \infty$$

**Step 3:** Calculate steady-state error.
$$e_{ss} = \frac{R_0}{1 + K_p} = \frac{1}{1 + \infty} = 0$$

The steady-state error is **zero**. Type 1 systems always have zero error to step inputs.

### Example 2: Type 1 System with Ramp Input

Same system:
$$G(s) = \frac{10}{s(s+2)}$$

Find the steady-state error for a unit ramp input ($R_0 = 1$).

**Step 1:** System is Type 1 (from above).

**Step 2:** For a ramp input, we need $K_v$.
$$K_v = \lim_{s \to 0} sG(s) = \lim_{s \to 0} \frac{10s}{s(s+2)} = \lim_{s \to 0} \frac{10}{s+2} = \frac{10}{2} = 5$$

**Step 3:** Calculate steady-state error.
$$e_{ss} = \frac{R_0}{K_v} = \frac{1}{5} = 0.2$$

The steady-state error is **0.2 units**. The output ramp lags the input ramp by 0.2 units at all times after transients settle.

### Example 3: Type 0 System

Given:
$$G(s) = \frac{20}{(s+1)(s+4)}$$

Find steady-state errors for step, ramp, and parabolic inputs ($R_0 = 1$).

**Step 1:** System type—no poles at origin, so **Type 0**.

**Step 2:** Calculate error constants.
$$K_p = \lim_{s \to 0} \frac{20}{(s+1)(s+4)} = \frac{20}{(1)(4)} = 5$$

$$K_v = \lim_{s \to 0} \frac{20s}{(s+1)(s+4)} = 0$$

$$K_a = \lim_{s \to 0} \frac{20s^2}{(s+1)(s+4)} = 0$$

**Step 3:** Steady-state errors.

- Step: $e_{ss} = \frac{1}{1+5} = \frac{1}{6} \approx 0.167$
- Ramp: $e_{ss} = \frac{1}{0} = \infty$
- Parabolic: $e_{ss} = \frac{1}{0} = \infty$

The Type 0 system has finite error to a step but cannot track ramps or parabolic inputs.

#### Diagram: Steady-State Error Comparison

<iframe src="../../sims/steady-state-error-comparison/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Steady-State Error Comparison</summary>
Type: microsim

Bloom Taxonomy: Analyze (L4)
Bloom Verb: compare, differentiate

Learning Objective: Students will compare steady-state error behavior of Type 0, Type 1, and Type 2 systems for step and ramp inputs.

Canvas layout:
- Top row: Three time-response plots (Type 0, Type 1, Type 2)
- Bottom row: Input selector and numerical results

Visual elements:
Each of three plots shows:
- Reference input (dashed line)
- System output (solid colored line)
- Error region (shaded)
- Steady-state error annotation
- Time and amplitude axes

Color coding:
- Type 0: Orange
- Type 1: Blue
- Type 2: Green

Interactive controls:
- Toggle: Step input / Ramp input
- Slider: Open-loop gain K (applies to all systems)
- Button: Reset to defaults

Data Visibility Requirements:
- Display transfer function for each system type
- Show $e_{ss}$ value for each system
- Indicate "Cannot track" where applicable
- Display error constants ($K_p$, $K_v$, $K_a$) for each

Behavior:
- All three responses animate simultaneously
- For step input: Type 0 shows finite error, Type 1 and 2 show zero
- For ramp input: Type 0 shows diverging error, Type 1 shows finite lag, Type 2 shows zero
- Error regions update in real-time with gain changes

Instructional Rationale: Side-by-side comparison makes the dramatic differences between system types visually obvious and reinforces the type-error relationship.

Implementation: p5.js with multi-plot canvas layout
</details>

## Disturbance Error

So far, we've focused on tracking error—the gap between reference and output. But control systems also face **disturbances**: unwanted inputs that push the system away from its desired operating point. The steady-state error due to disturbances is equally important in practice.

Consider a system with a disturbance $D(s)$ entering at the plant output:

```
     r(t)      e(t)                    d(t)
      ○────>───○────>[ G_c(s) ]──>[ G_p(s) ]──>─○──>─┬─> y(t)
              -↑                                ↑    │
               └────────────────────────────────┴────┘
```

The output is affected by both the reference and the disturbance:

$$Y(s) = \frac{G_c(s)G_p(s)}{1 + G_c(s)G_p(s)}R(s) + \frac{1}{1 + G_c(s)G_p(s)}D(s)$$

The steady-state error due to a step disturbance $D(s) = D_0/s$ is:

$$e_{ss,d} = \lim_{s \to 0} \frac{s \cdot D_0/s}{1 + G_c(s)G_p(s)} = \frac{D_0}{1 + \lim_{s \to 0}G_c(s)G_p(s)}$$

If the loop gain at DC is high (large $K_p$), the disturbance effect is attenuated. If the controller includes an integrator, the disturbance error goes to zero—the integrator "notices" the persistent error and keeps adjusting until it's eliminated.

!!! tip "Disturbance Rejection Design"
    To achieve good disturbance rejection:
    - Include at least one integrator in the loop (Type 1 or higher)
    - Make the controller gain high at the disturbance frequency
    - Place the disturbance entry point consideration in your design specs

!!! quote "Gyra Moment"
    "Disturbances are my nemesis—wind gusts, floor vibrations, someone bumping me. A step disturbance is like someone nudging me and holding the pressure. Without integral action, I'd lean slightly into the push, finding a new (wrong) equilibrium. But with integral control, my integrator says 'wait, this error isn't going away' and keeps adding correction until I'm back to vertical. The disturbance is still there, pushing me, but my controller pushes back with exactly the right amount."

#### Diagram: Disturbance Rejection Comparison

<iframe src="../../sims/disturbance-rejection/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Disturbance Rejection Comparison</summary>
Type: microsim

Bloom Taxonomy: Analyze (L4)
Bloom Verb: examine, compare

Learning Objective: Students will analyze how system type affects disturbance rejection by comparing Type 0 and Type 1 system responses to step disturbances.

Canvas layout:
- Left plot (50%): Type 0 system (proportional control)
- Right plot (50%): Type 1 system (PI control)
- Bottom: Controls and disturbance timing

Visual elements:
Each plot shows:
- System output y(t) vs time
- Reference level (dashed at y=1)
- Disturbance indication (shaded region or arrow when active)
- Steady-state error annotation after disturbance

Interactive controls:
- Button: Apply step disturbance at t=5s
- Slider: Disturbance magnitude (0.1 to 1.0)
- Slider: Controller gain K
- Button: Reset

Data Visibility Requirements:
- Display controller type for each plot ("P control" vs "PI control")
- Show $e_{ss}$ before and after disturbance
- Display the disturbance attenuation factor
- Annotate the steady-state error difference

Behavior:
- Initially, both systems track the step reference
- When disturbance button pressed, step disturbance applied
- Type 0: Output shifts to new steady-state with finite error
- Type 1: Output temporarily disturbed but returns to original setpoint
- Difference in steady-state error clearly visible

Instructional Rationale: Comparative demonstration shows the practical value of integral action for disturbance rejection, connecting theory to real-world controller selection.

Implementation: p5.js with event-driven disturbance injection
</details>

## Improving Steady-State Accuracy

Now that we understand what determines steady-state error, how do we reduce it? Here are the main strategies:

### Strategy 1: Increase Loop Gain

For a Type 0 system, increasing the gain $K$ reduces steady-state error:

$$e_{ss} = \frac{R_0}{1 + K_p}$$

Doubling $K_p$ roughly halves the error. But there's a limit—increasing gain typically reduces stability margins. You can't just crank the gain to infinity; the system will become oscillatory or unstable.

### Strategy 2: Add Integration

This is the most powerful approach. Adding an integrator to the controller:

- Converts a Type 0 system to Type 1
- Eliminates steady-state error to step inputs
- Converts finite ramp error to zero (if going from Type 1 to Type 2)

This is why PI and PID controllers are so common—the integral term is specifically there to eliminate steady-state error.

### Strategy 3: Feedforward Control

Instead of relying solely on feedback, add a feedforward path that anticipates the input:

$$U(s) = K_{ff}R(s) + C(s)E(s)$$

Properly designed feedforward can eliminate steady-state error without the stability penalty of high feedback gain. The feedforward gain is tuned to provide exactly the input needed for perfect tracking at DC.

| Strategy | Effect | Trade-off |
|----------|--------|-----------|
| Increase gain | Reduces error proportionally | May reduce stability margins |
| Add integrator | Eliminates error for lower-order inputs | Adds phase lag |
| Feedforward | Reduces tracking error | Requires good model knowledge |

!!! example "The Integral Fix in Practice"
    A proportional-only cruise control has finite speed error on hills. Adding an integral term (making it PI control) eliminates this error—the integrator accumulates the speed deficit until the throttle is strong enough to maintain exactly the set speed. This is why modern cruise control systems use at least PI control.

## Non-Unity Feedback Systems

The analysis we've developed assumes unity feedback (the feedback path is just a wire with gain 1). Real systems often have a sensor or feedback element with its own transfer function $H(s)$:

```
     r(t)      e(t)                          y(t)
      ○────>───○────>[ G(s) ]────>───────────>
              -↑                              │
               └────[ H(s) ]<─────────────────┘
```

For this configuration, the error is $e(t) = r(t) - H(s)y(t)$, and the analysis becomes more complex.

The closed-loop transfer function is:

$$T(s) = \frac{G(s)}{1 + G(s)H(s)}$$

And the steady-state error requires considering both $G(s)$ and $H(s)$ together. The system type is determined by poles at the origin in $G(s)H(s)$, not just $G(s)$.

!!! note "Practical Consideration"
    When $H(s) \neq 1$, we often define error with respect to the sensor output rather than the actual physical output. This is fine for most purposes, but be aware that the "error" you're minimizing is in sensor coordinates, not necessarily physical coordinates. If the sensor has bias or nonlinearity, that shows up in the actual performance.

## Connecting Error to Performance Specifications

In practice, steady-state error is one of several specifications that define acceptable system performance. The complete picture typically includes:

- **Steady-state error**: The persistent gap after settling (this chapter)
- **Settling time**: How long until transients decay (Chapter 4)
- **Overshoot**: How much the response exceeds the target (Chapter 4)
- **Stability margins**: How robust is stability to uncertainty (Chapter 13)

The challenge is that these specifications often conflict. Adding integral action to reduce steady-state error adds phase lag, which can increase overshoot or reduce stability margins. Increasing gain to reduce error can make the system faster but more oscillatory.

Good control design is about finding the sweet spot—achieving acceptable performance across all specifications simultaneously. This is where the art of control engineering meets the science.

#### Diagram: Design Trade-offs Visualization

<iframe src="../../sims/design-tradeoffs/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Design Trade-offs Visualization</summary>
Type: microsim

Bloom Taxonomy: Evaluate (L5)
Bloom Verb: assess, evaluate

Learning Objective: Students will evaluate design trade-offs between steady-state error, transient response, and stability margins.

Canvas layout:
- Left (40%): Time response plot
- Right top (30%): Specification gauges/indicators
- Right bottom (30%): Controller parameter sliders

Visual elements:
Time Response:
- Step response curve
- Reference line
- Overshoot annotation
- Settling time annotation
- Steady-state error shaded

Specification Gauges (circular or bar):
- Steady-state error (green if low, red if high)
- Overshoot (green if < 20%, yellow if 20-40%, red if > 40%)
- Settling time (visual indicator)
- Phase margin estimate (green if > 45°, yellow if 30-45°, red if < 30°)

Interactive controls:
- Slider: Proportional gain Kp
- Slider: Integral gain Ki (0 = no integral action)
- Dropdown: Plant type (first-order, second-order)
- Button: Reset to default

Data Visibility Requirements:
- Display all four specifications numerically
- Highlight which specs are in/out of tolerance
- Show controller transfer function
- Display system type

Behavior:
- As Ki increases from 0, system transitions from Type 0 to Type 1
- Steady-state error drops to zero (for step) when Ki > 0
- Overshoot and settling time may increase with Ki
- Stability gauge reflects reduced phase margin with more integration
- Red warning when system approaches instability

Instructional Rationale: Multi-objective visualization makes trade-offs concrete and experiential. Students discover that improving one specification often degrades another.

Implementation: p5.js with gauge graphics and real-time simulation
</details>

## Summary and Key Takeaways

Steady-state error analysis gives us the tools to predict and design for long-term tracking accuracy. Here's what you should take away:

- **Steady-state error** is the persistent gap between reference and output after transients settle—it represents the system's DC accuracy

- The **Final Value Theorem** lets us calculate $e_{ss}$ from the Laplace domain:
  $$e_{ss} = \lim_{s \to 0} s \cdot \frac{R(s)}{1 + G(s)}$$

- **System type** (number of integrators in the open-loop transfer function) determines which input types can be tracked with zero error:
  - Type 0: Finite error to step, infinite to ramp
  - Type 1: Zero error to step, finite to ramp
  - Type 2: Zero error to step and ramp, finite to parabolic

- **Error constants** ($K_p$, $K_v$, $K_a$) quantify tracking capability:
  $$K_p = \lim_{s \to 0} G(s), \quad K_v = \lim_{s \to 0} sG(s), \quad K_a = \lim_{s \to 0} s^2G(s)$$

- **Disturbance rejection** follows similar principles—integrators in the loop drive disturbance errors to zero

- To **reduce steady-state error**: increase gain (limited by stability), add integrators (adds phase lag), or use feedforward (requires model knowledge)

- There are always **trade-offs**—improving steady-state accuracy often comes at the cost of transient performance or stability margins

This framework gives you the vocabulary to specify accuracy requirements ("I need Type 1 performance with $K_v > 100$") and the tools to verify that a design meets them. When you encounter a control problem in practice, one of your first questions should be: "What system type do I need to achieve my accuracy requirements?"

??? question "Self-Check: Test Your Understanding"
    Before moving on, try these without looking back:

    1. A system has $G(s) = \frac{50}{s(s+5)(s+10)}$. What is the system type? What is the steady-state error for a unit ramp input?

    2. You need zero steady-state error for a constant-velocity tracking problem. What is the minimum system type required?

    3. For a Type 0 system with $K_p = 19$, what is the steady-state error for a unit step input? How could you eliminate this error?

    4. Why might a designer choose a Type 1 system over a Type 2 system, even though Type 2 has better tracking performance?

    If you got all four, you're ready for controller design. If not, revisit the examples and try the interactive simulations—the concepts become much clearer when you can manipulate them.
