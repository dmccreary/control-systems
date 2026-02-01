---
title: Transient Response Specifications
description: Quantitative metrics for specifying and evaluating transient response performance, including overshoot, settling time, rise time, and standard test inputs
generated_by: claude skill chapter-content-generator
date: 2026-01-31
version: 0.03
---

# Transient Response Specifications

## Summary

This chapter focuses on quantitative measures used to specify and evaluate transient response performance. Students will learn to calculate and interpret key metrics including overshoot, percent overshoot, settling time, rise time, peak time, and delay time. The chapter also introduces the standard test inputs (step, impulse, ramp, parabolic, and sinusoidal) used throughout control systems analysis. By the end of this chapter, students will be able to specify performance requirements and evaluate whether a system meets those requirements.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

1. Overshoot
2. Percent Overshoot
3. Settling Time
4. Rise Time
5. Peak Time
6. Delay Time
7. Step Input
8. Impulse Input
9. Ramp Input
10. Parabolic Input
11. Sinusoidal Input
12. Unit Step Response
13. Impulse Response
14. Ramp Response
15. Standard Test Inputs

## Prerequisites

This chapter builds on concepts from:

- [Chapter 3: Time-Domain Response Fundamentals](../03-time-domain-response/index.md)

---

## From Qualitative to Quantitative: Specifying Performance

In the previous chapter, we watched systems respond to inputs—some oscillated, some crept smoothly toward their targets, and some charged forward with varying degrees of enthusiasm. We learned to classify systems by their damping ratio and natural frequency. But here's the thing: "underdamped" and "oscillatory" are *descriptions*, not *specifications*. Your boss doesn't want to hear "it oscillates a bit and then settles down eventually." They want numbers.

Welcome to the world of transient response specifications—the engineering language for describing exactly how a system should behave. These metrics let us write precise requirements ("percent overshoot shall not exceed 10%") and verify that our designs meet them. They transform vague notions like "responsive but stable" into testable criteria that can be put into contracts, verified in testing, and argued about in meetings.

!!! quote "Gyra Moment"
    "When my engineers say 'settle down faster,' I have no idea what that means. But when they say 'settling time under 0.5 seconds with less than 5% overshoot'—*that* I can work with. Give me numbers, and I'll give you results."

The metrics we'll cover in this chapter are standard across industries—from aerospace to automotive to biomedical systems. Learn them once, and you'll speak the universal language of control system performance.

## Standard Test Inputs

Before we can measure system performance, we need to agree on *what* we're measuring the response to. This is where **standard test inputs** come in—a collection of mathematically simple signals that serve as benchmarks for system analysis. Using standardized inputs allows engineers worldwide to compare systems fairly: my step response and your step response should mean the same thing.

Why these particular inputs? Because they represent fundamental classes of real-world disturbances and commands, and because they have convenient mathematical properties (especially in the Laplace domain). Each reveals different aspects of system behavior.

| Test Input | Time Domain | Laplace Transform | What It Reveals |
|------------|-------------|-------------------|-----------------|
| Impulse | $\delta(t)$ | $1$ | Natural dynamics, stability |
| Step | $u(t)$ | $1/s$ | Tracking, steady-state error |
| Ramp | $t \cdot u(t)$ | $1/s^2$ | Velocity tracking error |
| Parabolic | $\frac{1}{2}t^2 \cdot u(t)$ | $1/s^3$ | Acceleration tracking error |
| Sinusoidal | $\sin(\omega t)$ | $\omega/(s^2 + \omega^2)$ | Frequency response |

#### Diagram: Standard Test Input Signals

<iframe src="../../sims/standard-test-inputs/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Standard Test Input Signals</summary>
Type: microsim

Bloom Taxonomy: Remember (L1)
Bloom Verb: identify, recognize

Learning Objective: Students will identify and distinguish between the five standard test inputs by their characteristic shapes and mathematical representations.

Canvas layout:
- Main area (70%): Plot area showing selected input signal
- Right panel (30%): Input selector and information display

Visual elements:
- Time-domain plot with clearly labeled axes
- Input signal displayed with thick colored line
- Mathematical expression shown above or beside plot
- Laplace transform shown in info panel
- Grid lines for reference

Interactive controls:
- Radio buttons or dropdown: Select input type (Impulse, Step, Ramp, Parabolic, Sinusoidal)
- Slider (for sinusoidal only): Frequency ω from 0.5 to 5 rad/s
- Button: "Compare All" - shows all inputs on same axes with different colors/scales

Data Visibility Requirements:
- Display time-domain expression: u(t), t·u(t), etc.
- Display Laplace transform: 1/s, 1/s², etc.
- For sinusoidal: show current frequency value
- Annotation: Key feature of each signal (e.g., "Instantaneous spike at t=0" for impulse)

Behavior:
- When input type changes, plot updates smoothly
- Impulse shown as tall narrow spike at t=0 (with note that it's theoretically infinite)
- Step shows clean transition from 0 to 1 at t=0
- Ramp shows linear increase starting at t=0
- Parabolic shows curved increase (t² shape)
- Sinusoidal oscillates with adjustable frequency
- Compare mode overlays scaled versions for shape comparison

Instructional Rationale: Visual identification builds pattern recognition for test inputs that students will encounter throughout the course. Direct comparison helps distinguish similar-looking signals.

Implementation: p5.js with canvas-based controls
</details>

## The Step Input and Unit Step Response

The **step input** is the workhorse of control systems testing—and for good reason. It represents an instantaneous change in setpoint or command, which is exactly what happens when you flip a switch, punch in a new temperature setting, or stomp on the gas pedal. It's mathematically simple (a jump from 0 to 1 at $t = 0$), yet it exercises the system's dynamics thoroughly.

#### The Unit Step Function

The unit step function $u(t)$ is defined as:

$u(t) = \begin{cases} 0, & t < 0 \\ 1, & t \geq 0 \end{cases}$

In the Laplace domain:

$\mathcal{L}\{u(t)\} = \frac{1}{s}$

The **unit step response** is the system's output when a unit step is applied as the input, typically assuming zero initial conditions. This single response curve contains a wealth of information about system dynamics—it's like a system's fingerprint.

Why is the step response so popular?

- It tests both transient and steady-state behavior
- It's easy to apply experimentally (flip a switch!)
- The response directly reveals key performance metrics
- Most transient specifications are defined in terms of step response

!!! tip "Practical Note"
    In the real world, a "perfect" step is impossible—every physical actuator has finite slew rate. But if the input transition is much faster than the system's response, it's effectively a step. And when testing real hardware, you'll often see engineers use a square wave and analyze the rising edges as repeated step inputs.

#### Diagram: Annotated Step Response with Specifications

<iframe src="../../sims/step-response-specs/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Annotated Step Response with Specifications</summary>
Type: microsim

Bloom Taxonomy: Understand (L2)
Bloom Verb: interpret, explain

Learning Objective: Students will explain how each transient specification (overshoot, settling time, rise time, peak time, delay time) is defined and measured from a step response curve.

Canvas layout:
- Left side (65%): Step response plot with annotations
- Right side (35%): Specification values and definitions

Visual elements:
- Step response curve for second-order underdamped system
- Horizontal dashed lines at: 0, 10%, 50%, 90%, 100% (final value), overshoot peak, ±2% settling bands
- Vertical dashed lines at: delay time, rise time, peak time, settling time
- Color-coded annotations linking lines to specification names
- Final value clearly marked as y_ss
- Input step shown as separate small plot or overlay

Interactive controls:
- Slider: Damping ratio ζ from 0.1 to 1.0 (default: 0.5)
- Slider: Natural frequency ωn from 1 to 5 rad/s (default: 2)
- Checkboxes: Show/hide each specification annotation
- Button: "Show All" / "Hide All" toggle

Data Visibility Requirements:
- Display numerical values for each specification:
  - Rise time: tr = [value] s
  - Peak time: tp = [value] s
  - Settling time (2%): ts = [value] s
  - Delay time: td = [value] s
  - Percent overshoot: %OS = [value]%
  - Peak value: Mp = [value]
- Show formulas relating specs to ζ and ωn

Behavior:
- Annotations update dynamically as ζ and ωn change
- Hovering over an annotation highlights its definition in the side panel
- Toggling checkboxes shows/hides individual annotations
- Color coding consistent throughout (e.g., red for overshoot, blue for rise time)

Instructional Rationale: Seeing all specifications on a single annotated plot clarifies what each metric measures. Interactive adjustment reveals how damping and frequency affect each specification differently.

Implementation: p5.js with canvas-based controls and annotation rendering
</details>

## Overshoot and Percent Overshoot

**Overshoot** is exactly what it sounds like: the system "overshoots" its target before settling down. For underdamped systems responding to a step input, the output exceeds the final steady-state value before oscillating back. It's like arriving at a stop sign and sliding a bit past it before backing up. (Please don't actually do this.)

The **percent overshoot** (%OS) quantifies this behavior as a percentage of the final value:

#### Percent Overshoot Formula

$\%OS = \frac{M_p - y_{ss}}{y_{ss}} \times 100\%$

where:

- $M_p$ is the peak value (maximum overshoot)
- $y_{ss}$ is the steady-state (final) value

For a standard second-order underdamped system, percent overshoot depends only on the damping ratio:

#### Percent Overshoot vs. Damping Ratio

$\%OS = e^{-\pi\zeta/\sqrt{1-\zeta^2}} \times 100\%$

where:

- $\zeta$ is the damping ratio (must be $0 < \zeta < 1$)

This elegant formula reveals a key insight: **percent overshoot is determined entirely by damping ratio**, independent of natural frequency. A system with $\zeta = 0.5$ will have the same percent overshoot whether $\omega_n$ is 1 rad/s or 100 rad/s—the oscillations will just happen faster in the latter case.

| Damping Ratio $\zeta$ | Percent Overshoot |
|----------------------|-------------------|
| 0.1 | 72.9% |
| 0.3 | 37.2% |
| 0.5 | 16.3% |
| 0.7 | 4.6% |
| 0.9 | 0.2% |
| 1.0 | 0% (critically damped) |

The inverse relationship is also useful—given a desired percent overshoot, you can calculate the required damping ratio:

#### Required Damping Ratio from Overshoot Spec

$\zeta = \frac{-\ln(\%OS/100)}{\sqrt{\pi^2 + \ln^2(\%OS/100)}}$

where:

- $\%OS$ is the desired percent overshoot (as a percentage, e.g., 10 for 10%)

!!! quote "Helping Gyra"
    Overshoot is Gyra's "overreaction coefficient." When she corrects a tilt, a high overshoot means she swings *past* vertical to the other side—sometimes dramatically. With 50% overshoot, if she was tilted 10° forward, she'd correct past vertical and end up 5° backward before swinging back. That's alarming! With 5% overshoot, that 10° forward tilt only produces a 0.5° backward swing. Much calmer. Setting Gyra's overshoot specification is about choosing how dramatic we'll allow her corrections to be.

#### Diagram: Percent Overshoot vs. Damping Ratio

<iframe src="../../sims/overshoot-damping/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Percent Overshoot vs. Damping Ratio</summary>
Type: microsim

Bloom Taxonomy: Apply (L3)
Bloom Verb: calculate, use

Learning Objective: Students will calculate damping ratio from a given percent overshoot specification and verify the relationship graphically.

Canvas layout:
- Left side (50%): Step response plot
- Right side (50%): %OS vs. ζ curve with current point highlighted

Visual elements:
Left plot:
- Step response curve with overshoot clearly marked
- Horizontal line at final value
- Vertical measurement showing overshoot amount
- Peak labeled with Mp value

Right plot:
- Exponential decay curve showing %OS vs. ζ (from ζ=0 to ζ=1)
- Current operating point marked with dot
- Crosshairs or guidelines to axes
- Axis labels: "Damping Ratio ζ" and "Percent Overshoot %"

Interactive controls:
- Slider: Damping ratio ζ from 0.05 to 0.99 (default: 0.5)
- Number input: Target %OS with "Calculate ζ" button
- Toggle: Show formula overlay

Data Visibility Requirements:
- Display current ζ value
- Display calculated %OS for current ζ
- When target %OS entered, display required ζ
- Show the formula: %OS = exp(-πζ/√(1-ζ²)) × 100%

Behavior:
- Moving ζ slider updates both plots simultaneously
- Point on %OS curve moves along the curve as ζ changes
- Entering target %OS and clicking calculate: highlights required ζ on curve and updates slider
- Real-time calculation as slider moves

Instructional Rationale: Dual visualization connects the abstract formula to concrete step response. Bidirectional calculation (ζ→%OS and %OS→ζ) reinforces practical design use.

Implementation: p5.js with canvas-based controls
</details>

## Peak Time

**Peak time** ($t_p$) is the time required for the response to reach its first (and largest) peak—the moment of maximum overshoot. For underdamped systems, this is when the response hits $M_p$ before beginning to oscillate back toward the final value.

#### Peak Time Formula

$t_p = \frac{\pi}{\omega_d} = \frac{\pi}{\omega_n\sqrt{1-\zeta^2}}$

where:

- $\omega_d$ is the damped frequency
- $\omega_n$ is the natural frequency
- $\zeta$ is the damping ratio

Notice that peak time is one half-period of the damped oscillation frequency—which makes physical sense. The response starts at zero, rises through the final value, and reaches its peak when it has completed half of its first oscillation cycle.

Key observations about peak time:

- Peak time decreases as $\omega_n$ increases (faster systems peak sooner)
- Peak time increases as $\zeta$ increases (more damping slows the approach)
- Peak time is inversely proportional to $\omega_d$

| Parameter Change | Effect on Peak Time |
|-----------------|---------------------|
| Increase $\omega_n$ | Decreases $t_p$ |
| Increase $\zeta$ | Increases $t_p$ |
| Increase both equally | Complex interaction |

!!! note "Critically and Overdamped Systems"
    Peak time is undefined for critically damped ($\zeta = 1$) and overdamped ($\zeta > 1$) systems because they don't overshoot—they approach the final value monotonically. No overshoot means no peak beyond the final value to time.

## Rise Time

**Rise time** ($t_r$) measures how quickly the response rises from a low value to a high value. There are two common definitions—make sure you know which one is being used in any given context:

- **10% to 90% definition** (most common): Time to go from 10% to 90% of the final value
- **0% to 100% definition**: Time to first reach 100% of the final value

The 10%-90% definition is preferred for practical measurements because it avoids sensitivity to initial transients (near 0%) and overshoot behavior (near 100%).

For a second-order underdamped system, an approximate formula using the 10%-90% definition is:

#### Rise Time Approximation (10%-90%)

$t_r \approx \frac{1.8}{\omega_n}$

This approximation works well for damping ratios in the range $0.3 < \zeta < 0.8$, which covers most practical designs.

A more accurate (but more complex) formula that accounts for damping ratio:

#### Rise Time Formula (0%-100%)

$t_r = \frac{1}{\omega_d}\left(\pi - \tan^{-1}\frac{\omega_d}{\zeta\omega_n}\right)$

where:

- $\omega_d = \omega_n\sqrt{1-\zeta^2}$ is the damped frequency
- The inverse tangent is in radians

Rise time is particularly important for systems where rapid response to setpoint changes is critical—think flight control systems, anti-lock brakes, or any application where "getting there quickly" matters.

## Delay Time

**Delay time** ($t_d$) is the time required for the response to reach 50% of its final value. It provides a measure of how long the system "hesitates" before substantially responding to the input.

For a second-order underdamped system, delay time can be approximated as:

#### Delay Time Approximation

$t_d \approx \frac{1 + 0.7\zeta}{\omega_n}$

where:

- $\omega_n$ is the natural frequency
- $\zeta$ is the damping ratio

Delay time is less commonly specified than rise time or settling time, but it's useful for characterizing the initial phase of system response. In some applications—like human-machine interfaces—perceived "lag" correlates strongly with delay time.

The relationship between delay time and rise time is worth noting: for a typical underdamped system, $t_d$ is roughly half of $t_r$ (though the exact ratio depends on $\zeta$).

## Settling Time

**Settling time** ($t_s$) is the time required for the response to settle within a specified tolerance band around the final value and *stay there*. It's perhaps the most practically important specification because it tells you when the transient is "done" and the system has effectively reached steady state.

Common tolerance bands are:

- **2% settling time**: Response stays within $\pm 2\%$ of final value
- **5% settling time**: Response stays within $\pm 5\%$ of final value

#### Settling Time Formulas

For 2% settling time:

$t_s \approx \frac{4}{\zeta\omega_n}$

For 5% settling time:

$t_s \approx \frac{3}{\zeta\omega_n}$

where:

- $\zeta$ is the damping ratio
- $\omega_n$ is the natural frequency

These formulas arise from the exponential envelope $e^{-\zeta\omega_n t}$ that bounds the oscillations. When this envelope decays to 2% (about 4 time constants) or 5% (about 3 time constants), the oscillations are within the tolerance band.

Key insights about settling time:

- Settling time depends on the product $\zeta\omega_n$ (the real part of the poles)
- Increasing $\zeta$ *decreases* settling time (more damping = faster decay)
- Increasing $\omega_n$ *decreases* settling time (faster overall dynamics)
- There's a trade-off with rise time: faster rise often means longer settling

| Specification | 2% Criterion | 5% Criterion |
|--------------|--------------|--------------|
| Number of time constants | ~4 | ~3 |
| Settling time formula | $4/(\zeta\omega_n)$ | $3/(\zeta\omega_n)$ |
| Residual error | ≤2% | ≤5% |

!!! warning "The Settling Time Trap"
    Be careful with lightly damped systems! If $\zeta$ is very small, the oscillations decay slowly even as the system initially responds quickly. You might have fast rise time but terrible settling time. This is why control design often involves trade-offs—you can't optimize everything at once.

!!! quote "Gyra Moment"
    "Settling time is my patience test. Sure, I might correct quickly when pushed—but how long do I keep wobbling before I'm *actually* stable? A long settling time means I'm standing there oscillating like I can't make up my mind. Embarrassing. My engineers aim for settling time under a second—because nobody wants to watch a robot wobble for five seconds wondering if it's going to fall over."

#### Diagram: Settling Time and Tolerance Bands

<iframe src="../../sims/settling-time-bands/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Settling Time and Tolerance Bands</summary>
Type: microsim

Bloom Taxonomy: Apply (L3)
Bloom Verb: demonstrate, calculate

Learning Objective: Students will determine settling time by identifying when the step response enters and remains within specified tolerance bands.

Canvas layout:
- Main area (70%): Step response with tolerance bands
- Right panel (30%): Controls and settling time display

Visual elements:
- Step response curve
- Shaded tolerance band around final value (2% or 5%)
- Vertical line marking settling time
- Exponential envelope curves (dashed) showing decay bound
- Time axis with settling time marked
- Horizontal line at final value

Interactive controls:
- Slider: Damping ratio ζ from 0.2 to 1.0 (default: 0.5)
- Slider: Natural frequency ωn from 1 to 5 rad/s (default: 2)
- Radio buttons: 2% or 5% tolerance band
- Toggle: Show/hide exponential envelope

Data Visibility Requirements:
- Display settling time: ts = [value] s
- Display formula used: ts = 4/(ζωn) or ts = 3/(ζωn)
- Show tolerance band limits: ±[2 or 5]% of final value
- Display real part of poles: σ = ζωn = [value]

Behavior:
- Tolerance band visually updates when switching between 2% and 5%
- Settling time marker moves as ζ or ωn change
- Envelope curves show why the formulas work (decay to tolerance level)
- Highlight moment when response enters and stays in band

Instructional Rationale: Visualizing tolerance bands demystifies the settling time definition. Connecting to the exponential envelope builds intuition for the formula derivation.

Implementation: p5.js with canvas-based controls
</details>

## The Impulse Input and Impulse Response

The **impulse input** $\delta(t)$ is theoretically a signal of infinite amplitude and zero duration, with unit area—a mathematical idealization that represents an instantaneous "kick" to the system. In the Laplace domain, it's beautifully simple:

$\mathcal{L}\{\delta(t)\} = 1$

This simplicity is precisely why the impulse is so important: the **impulse response** $h(t)$ is the system output when the input is an impulse, and it equals the *inverse Laplace transform of the transfer function itself*:

#### Impulse Response Relationship

$h(t) = \mathcal{L}^{-1}\{G(s)\}$

where:

- $h(t)$ is the impulse response
- $G(s)$ is the transfer function

The impulse response reveals the system's natural dynamics directly—it's the system's "signature" when excited and left alone. Every pole and zero of the transfer function manifests in the shape of $h(t)$.

For a first-order system with transfer function $G(s) = K/(τs + 1)$:

$h(t) = \frac{K}{\tau}e^{-t/\tau}$

For a second-order underdamped system:

$h(t) = \frac{\omega_n}{\sqrt{1-\zeta^2}}e^{-\zeta\omega_n t}\sin(\omega_d t)$

!!! info "Practical Impulses"
    A true impulse is impossible to generate physically, but we can approximate it with a short, sharp pulse. If the pulse duration is much shorter than the system's time constant, the response will closely match the theoretical impulse response. Striking a tuning fork, firing a spark plug, or tapping a microphone are all practical impulse-like excitations.

The impulse response and step response are intimately related:

#### Step-Impulse Relationship

$y_{step}(t) = \int_0^t h(\tau) d\tau$

and conversely:

$h(t) = \frac{d}{dt}y_{step}(t)$

This relationship is crucial: if you can measure one, you can compute the other.

## The Ramp Input and Ramp Response

A **ramp input** increases linearly with time, representing a commanded velocity or a steadily changing setpoint:

$r(t) = t \cdot u(t)$

In the Laplace domain:

$\mathcal{L}\{t \cdot u(t)\} = \frac{1}{s^2}$

The **ramp response** reveals how well a system can track a constantly changing reference. This is critical for servo systems, motor drives, and any application where the system must follow a moving target.

For a first-order system with DC gain $K$ and time constant $\tau$:

#### First-Order Ramp Response

$y(t) = K\left(t - \tau + \tau e^{-t/\tau}\right)$

As $t \to \infty$, the response approaches:

$y(t) \approx K(t - \tau)$

This reveals a **steady-state velocity error**: the output tracks the ramp but lags behind by $K\tau$ seconds. The system is always "behind" the reference by a fixed amount. This lag is the **velocity error** that we'll explore more in the chapter on steady-state error.

For second-order systems, the ramp response is more complex, but the key insight remains: systems with limited bandwidth cannot perfectly track a changing reference—there will always be some lag.

## The Parabolic Input

A **parabolic input** represents constant acceleration:

$r(t) = \frac{1}{2}t^2 \cdot u(t)$

In the Laplace domain:

$\mathcal{L}\left\{\frac{1}{2}t^2 \cdot u(t)\right\} = \frac{1}{s^3}$

Parabolic inputs test a system's ability to track accelerating references—think of a missile interceptor tracking a maneuvering target, or a telescope tracking a celestial object with varying angular rate.

The parabolic response reveals the **acceleration error coefficient** and becomes important when analyzing higher-order system types. Most basic control systems cannot track a parabolic input without growing error; this limitation motivates the design of higher-type controllers.

## The Sinusoidal Input

The **sinusoidal input** is fundamentally different from the others—it's a *steady-state* test signal rather than a transient one:

$r(t) = A\sin(\omega t)$

In the Laplace domain:

$\mathcal{L}\{A\sin(\omega t)\} = \frac{A\omega}{s^2 + \omega^2}$

When a sinusoidal input is applied to a stable linear system, the output eventually settles into a sinusoid at the *same frequency* but potentially with different amplitude and phase. This behavior is the foundation of **frequency response analysis**, which we'll explore in later chapters.

Key properties of sinusoidal steady-state response:

- Output frequency equals input frequency (no frequency change for LTI systems)
- Amplitude ratio depends on $|G(j\omega)|$
- Phase shift depends on $\angle G(j\omega)$
- Transients die out; sinusoidal pattern persists

#### Diagram: Test Input Response Comparison

<iframe src="../../sims/input-response-comparison/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Test Input Response Comparison</summary>
Type: microsim

Bloom Taxonomy: Analyze (L4)
Bloom Verb: compare, differentiate

Learning Objective: Students will compare how a given system responds differently to step, impulse, ramp, and sinusoidal inputs, identifying the distinct information revealed by each.

Canvas layout:
- Top row: Two plots side by side (input and output)
- Bottom section: Controls and system parameters

Visual elements:
- Left plot: Selected input signal
- Right plot: System response to that input
- Clear axis labels with units
- Legend identifying signal type

Interactive controls:
- Radio buttons: Select input type (Step, Impulse, Ramp, Sinusoidal)
- Slider (for sinusoidal): Input frequency from 0.5 to 5 rad/s
- Slider: System damping ratio ζ from 0.3 to 0.9
- Slider: System natural frequency ωn from 1 to 5 rad/s
- Button: "Animate" - shows response evolving over time

Data Visibility Requirements:
- Display input type and parameters
- Display system parameters (ζ, ωn)
- For step: show overshoot and settling time
- For impulse: show peak value and decay
- For ramp: show steady-state error
- For sinusoidal: show amplitude ratio and phase shift

Behavior:
- Switching input type updates both plots
- System parameters affect response shape but not input
- Animation mode shows response building up over time
- For sinusoidal, steady-state is reached after transients decay

Instructional Rationale: Direct comparison of responses to different inputs reveals what each test signal uniquely probes. Students see that the same system behaves very differently depending on what you ask it to do.

Implementation: p5.js with canvas-based controls
</details>

## The Complete Picture: Relating Specifications to Design

Now that we've defined all the key specifications, let's see how they connect to form a coherent design framework. The beauty of second-order system analysis is that *just two parameters*—$\zeta$ and $\omega_n$—determine all transient specifications.

| Specification | Formula | Depends On |
|--------------|---------|------------|
| Percent Overshoot | $e^{-\pi\zeta/\sqrt{1-\zeta^2}} \times 100\%$ | $\zeta$ only |
| Peak Time | $\pi/(\omega_n\sqrt{1-\zeta^2})$ | $\omega_n$ and $\zeta$ |
| Rise Time (approx) | $1.8/\omega_n$ | Primarily $\omega_n$ |
| Settling Time (2%) | $4/(\zeta\omega_n)$ | $\zeta\omega_n$ product |
| Delay Time (approx) | $(1 + 0.7\zeta)/\omega_n$ | $\omega_n$ and $\zeta$ |

This table reveals important trade-offs:

- **Overshoot vs. Settling Time**: Lower $\zeta$ means more overshoot but can mean faster settling (if $\omega_n$ is high enough). It's complicated.
- **Rise Time vs. Overshoot**: Faster rise (higher $\omega_n$) doesn't directly affect overshoot, but systems designed for very fast rise often end up underdamped.
- **Speed vs. Stability**: Aggressive designs (low $\zeta$, high $\omega_n$) are fast but oscillatory; conservative designs are slow but smooth.

!!! tip "The Magical Number 0.707"
    The damping ratio $\zeta = 1/\sqrt{2} \approx 0.707$ is special. At this value, the second-order system achieves a good balance: about 4.3% overshoot with relatively fast settling. This is often called **optimal damping** or **Butterworth damping** and appears frequently in filter design and control specifications. When in doubt, 0.7 is a reasonable starting point.

#### Diagram: Specification Trade-off Explorer

<iframe src="../../sims/spec-tradeoff-explorer/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Specification Trade-off Explorer</summary>
Type: microsim

Bloom Taxonomy: Evaluate (L5)
Bloom Verb: assess, judge

Learning Objective: Students will assess the trade-offs between different transient specifications by observing how changing one specification affects others.

Canvas layout:
- Left (55%): Step response plot with all specifications annotated
- Right (45%): Radar/spider chart showing normalized specifications plus controls

Visual elements:
Step response plot:
- Response curve with overshoot, settling time, rise time marked
- Tolerance bands
- Peak time marker
- All annotations color-coded

Radar chart:
- Five axes: Rise Time, Peak Time, Settling Time, %OS, Delay Time
- Normalized values (smaller = better for time specs; smaller = better for overshoot)
- Filled area showing current "performance profile"
- Reference circle for comparison

Interactive controls:
- Slider: Damping ratio ζ from 0.2 to 1.0 (default: 0.5)
- Slider: Natural frequency ωn from 1 to 5 rad/s (default: 2)
- Preset buttons: "Fast Response", "Low Overshoot", "Balanced (ζ=0.707)"
- Toggle: Lock overshoot at [value]% while adjusting ωn

Data Visibility Requirements:
- Display all five specification values numerically
- Show current ζ and ωn
- Highlight which specs improve/worsen as parameters change
- Display trade-off hints (e.g., "Lower ζ: faster rise but more overshoot")

Behavior:
- Moving sliders updates both plots in real-time
- Radar chart shape changes to show trade-off profile
- Preset buttons jump to specific parameter combinations
- Lock mode demonstrates how specs can be adjusted independently (partially)

Instructional Rationale: The radar chart visualization makes multi-objective trade-offs tangible. Students can "see" the shape of a design choice and understand why no single design optimizes everything.

Implementation: p5.js with canvas-based radar chart and response plot
</details>

## Design Specifications to System Parameters

In practice, design often works backward: you're given specifications and must determine the system parameters that achieve them. Here's the systematic approach:

**Given**: Desired %OS and settling time $t_s$

**Find**: Required $\zeta$ and $\omega_n$

**Step 1**: From %OS, calculate required $\zeta$:

$\zeta = \frac{-\ln(\%OS/100)}{\sqrt{\pi^2 + \ln^2(\%OS/100)}}$

**Step 2**: From settling time and $\zeta$, calculate required $\omega_n$:

$\omega_n = \frac{4}{\zeta \cdot t_s}$ (for 2% criterion)

**Step 3**: Verify other specifications are acceptable:

- Calculate $t_r$, $t_p$, $t_d$ using formulas above
- Check that all specs meet requirements

!!! example "Design Example"
    **Requirement**: %OS ≤ 10%, settling time (2%) ≤ 1 second

    **Step 1**: From 10% overshoot:
    $\zeta = \frac{-\ln(0.10)}{\sqrt{\pi^2 + \ln^2(0.10)}} = \frac{2.303}{\sqrt{9.87 + 5.30}} = 0.591$

    **Step 2**: From $t_s = 1$ second:
    $\omega_n = \frac{4}{0.591 \times 1} = 6.77$ rad/s

    **Step 3**: Verify rise time:
    $t_r \approx \frac{1.8}{6.77} = 0.27$ seconds (acceptable)

This design methodology is the bread and butter of control engineering. Given performance requirements, you can immediately determine what pole locations are needed—which then informs your controller design.

## Practical Measurement Considerations

In the laboratory or in the field, measuring transient specifications from real data requires some care. Here are practical considerations:

**Noise and Ripple**: Real signals are noisy. Settling time measurements are particularly sensitive—a noisy signal may repeatedly exit and re-enter the tolerance band. Filtering or averaging may be needed.

**Initial Conditions**: For valid step response measurements, ensure the system starts at true steady state. Any residual dynamics from previous tests will contaminate results.

**Input Fidelity**: Real step inputs have finite rise time. If the input transition time is comparable to the system's rise time, your measurements will be affected. Use the fastest actuator available.

**Sampling Rate**: For accurate peak time and overshoot measurements, sample fast enough to capture the peak. A rule of thumb: sample at least 10× the expected oscillation frequency.

**Steady-State Identification**: Settling time requires knowing the final value. In practice, wait several settling times and average the output, or use the DC gain if known.

| Challenge | Mitigation Strategy |
|-----------|---------------------|
| Noise obscuring peaks | Low-pass filter before analysis |
| Slow input rise | Use faster actuator or deconvolve |
| Non-zero initial conditions | Wait for true steady state before test |
| Unknown final value | Estimate from long-time average |

## Summary and Key Takeaways

You've now mastered the vocabulary and mathematics of transient response specifications—the quantitative tools that turn qualitative observations into engineering requirements.

**Standard Test Inputs** provide benchmarks for system evaluation:

- Step input: workhorse of transient testing, reveals tracking and overshoot
- Impulse input: reveals natural dynamics directly
- Ramp input: tests velocity tracking capability
- Parabolic input: tests acceleration tracking
- Sinusoidal input: foundation of frequency response analysis

**Transient Specifications** quantify step response behavior:

- **Percent Overshoot**: How far past the target? Determined by $\zeta$ alone.
- **Peak Time**: When does max overshoot occur? Depends on $\omega_d$.
- **Rise Time**: How fast to get there? Roughly $1.8/\omega_n$.
- **Settling Time**: When is the drama over? Approximately $4/(\zeta\omega_n)$ for 2%.
- **Delay Time**: Initial responsiveness. About $(1+0.7\zeta)/\omega_n$.

**Key Relationships**:

- Only two parameters ($\zeta$, $\omega_n$) determine all second-order specs
- Trade-offs are unavoidable: you can't optimize everything simultaneously
- $\zeta \approx 0.7$ often provides a good balance
- Design works backward: specs → $\zeta$ and $\omega_n$ → pole placement

!!! quote "Gyra's Design Summary"
    "My engineers don't say 'make me stable.' They say: 'percent overshoot under 5%, settling time under 0.8 seconds, rise time under 0.3 seconds.' Now *those* are specs I can work with. And when I meet them? That's when I know I'm properly tuned."

In the next chapter, we'll explore what happens when the transient is over—steady-state behavior and the errors that persist even after all the oscillations have died away. Because getting *close* to your target isn't the same as getting *exactly* there.

??? question "Self-Check: Test Your Understanding"
    Before moving on, see if you can answer these:

    1. A system has 20% overshoot. What is its approximate damping ratio?
    2. If you double $\omega_n$ while keeping $\zeta$ constant, what happens to: (a) percent overshoot, (b) settling time, (c) rise time?
    3. Two systems have the same settling time but different overshoot. Which has higher $\omega_n$—the one with more overshoot or less? (Think carefully!)
    4. You measure a step response and see that the output first reaches the final value at $t = 0.5$ seconds, then overshoots to 110% of final at $t = 0.8$ seconds. Estimate the damping ratio and natural frequency.

    Work through these before checking your answers with the MicroSims!
