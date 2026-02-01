---
title: Poles, Zeros, and System Analysis
description: Understanding how pole and zero locations in the s-plane determine system stability, response characteristics, and dynamic behavior
generated_by: claude skill chapter-content-generator
date: 2026-01-31
version: 0.03
---

# Poles, Zeros, and System Analysis

## Summary

This chapter explores the critical relationship between a system's poles and zeros and its dynamic behavior. Students will learn to construct and interpret pole-zero plots, understand different pole types (real, complex conjugate, repeated, simple), and recognize how pole locations in the s-plane determine stability and response characteristics. The concept of dominant poles is introduced as a practical tool for approximating higher-order system behavior. System order and proper transfer function properties complete the analysis framework.

## Concepts Covered

This chapter covers the following 18 concepts from the learning graph:

1. Poles
2. Zeros
3. Pole-Zero Plot
4. Pole-Zero Cancellation
5. Dominant Poles
6. Pole Locations
7. Complex Conjugate Poles
8. Real Poles
9. Repeated Poles
10. Simple Poles
11. Pole at Origin
12. Poles in Left Half Plane
13. Poles in Right Half Plane
14. Poles on Imaginary Axis
15. System Order
16. Proper Transfer Function
17. Strictly Proper Function
18. DC Gain

## Prerequisites

This chapter builds on concepts from:

- [Chapter 3: Time-Domain Response Fundamentals](../03-time-domain-response/index.md)
- [Chapter 5: Laplace Transform Methods](../05-laplace-transform-methods/index.md)

---

## The S-Plane: A Map of System Behavior

Imagine having a map that tells you everything about how a system will behave—whether it will oscillate, how fast it will respond, whether it will explode or settle down peacefully. That map exists, and it's called the **s-plane**. The locations of a system's poles and zeros on this complex plane encode the complete story of its dynamic behavior. Learn to read this map, and you'll have x-ray vision into any linear system.

Here's the remarkable insight: two systems with completely different physical implementations—an electrical circuit and a mechanical suspension, say—will behave identically if they share the same pole and zero locations. The s-plane is the universal language of linear dynamics, transcending the specifics of springs, capacitors, or hydraulic cylinders. Master this language, and you can analyze anything.

In this chapter, we'll develop the vocabulary and visual intuition to read pole-zero maps fluently. By the end, you'll be able to glance at a pole-zero plot and immediately know whether the system will be stable, how fast it will respond, whether it will oscillate, and what kind of controller might improve it. That's a genuine engineering superpower.

## Poles: Where the Action Happens

The **poles** of a transfer function are the values of $s$ that make the denominator equal to zero—they're the roots of the characteristic equation. If you have a transfer function:

#### Transfer Function Form

$G(s) = \frac{N(s)}{D(s)}$

where:

- $N(s)$ is the numerator polynomial
- $D(s)$ is the denominator polynomial

Then the poles are the solutions to $D(s) = 0$.

Why do we call them "poles"? If you imagine the transfer function magnitude as a surface over the s-plane, poles are points where this surface shoots up to infinity—like tent poles holding up a canvas. The mathematical term comes from complex analysis, but the visual metaphor is apt: poles are where the action is.

Consider this transfer function:

#### Example Transfer Function

$G(s) = \frac{5}{(s+2)(s+5)}$

The poles are at $s = -2$ and $s = -5$. At these values, the denominator becomes zero, and the transfer function theoretically "blows up." But here's the crucial point: while we never actually operate the system at its pole frequencies, the pole locations completely determine how the system responds to *any* input.

Each pole contributes a component to the natural response. For real poles:

- A pole at $s = -a$ contributes a term $e^{-at}$ to the time response
- More negative poles decay faster
- Poles closer to the imaginary axis dominate the response

| Pole Location | Time Response Component | Behavior |
|---------------|------------------------|----------|
| $s = -2$ | $e^{-2t}$ | Decays with time constant 0.5s |
| $s = -5$ | $e^{-5t}$ | Decays with time constant 0.2s |
| $s = -0.1$ | $e^{-0.1t}$ | Slowly decaying (dominates!) |

!!! quote "Gyra Moment"
    "Every pole in my transfer function is a voice in my response. The poles closest to the imaginary axis are the loudest—they're the last ones to quiet down after a disturbance. When my engineers want to speed me up, they push my poles further left. When they want me calmer, they add damping to spread the poles apart. My behavior is literally mapped on the s-plane."

## Zeros: Shaping the Response

While poles determine *what* response modes exist, **zeros** shape *how much* of each mode appears in the output. Zeros are the values of $s$ that make the numerator equal to zero—the roots of $N(s) = 0$.

For the transfer function:

#### Transfer Function with Zero

$G(s) = \frac{s+3}{(s+2)(s+5)}$

The zero is at $s = -3$. Zeros have a remarkable property: they can suppress or enhance certain response characteristics.

Here's the intuition: if you place a zero near a pole, the zero partially "cancels" that pole's contribution to the response. If you place a zero far from any poles, it has less effect on the dominant dynamics. This gives designers a tool—add zeros through controllers to reshape the response without changing the fundamental pole locations.

Key effects of zeros:

- **Zeros in the left half-plane**: Can cause overshoot in the step response, even for heavily damped systems
- **Zeros near poles**: Reduce the contribution of that pole to the response
- **Right half-plane zeros**: Create "non-minimum phase" behavior—the response initially goes the "wrong way"

| Zero Location | Effect on Response |
|---------------|-------------------|
| LHP, far from poles | Mild increase in overshoot |
| LHP, near a pole | Reduces that pole's influence |
| RHP (positive real part) | Initial undershoot, then recovery |

!!! warning "Right Half-Plane Zeros"
    RHP zeros are trouble. They cause the step response to initially move in the opposite direction from its final value—like a car that backs up before going forward. Systems with RHP zeros are harder to control and have fundamental limitations on achievable bandwidth. If you encounter one, proceed with caution.

## The Pole-Zero Plot

A **pole-zero plot** is a graphical representation of all poles and zeros of a transfer function on the complex s-plane. By convention:

- **Poles** are marked with ✕ symbols
- **Zeros** are marked with ○ symbols
- The horizontal axis is the real part of $s$ (σ)
- The vertical axis is the imaginary part of $s$ (jω)

This simple diagram packs enormous information. At a glance, you can determine:

- **Stability**: Are all poles in the left half-plane?
- **Speed of response**: How far left are the dominant poles?
- **Oscillation**: Are there complex conjugate poles?
- **Damping**: What angle do complex poles make with the negative real axis?
- **DC gain**: Where are the zeros relative to poles?

#### Diagram: Interactive Pole-Zero Plot

<iframe src="../../sims/pole-zero-plot/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive Pole-Zero Plot</summary>
Type: microsim

Bloom Taxonomy: Understand (L2)
Bloom Verb: interpret, explain

Learning Objective: Students will interpret pole-zero plots by identifying pole and zero locations and understanding their implications for system behavior.

Canvas layout:
- Left side (55%): S-plane with poles and zeros
- Right side (45%): Time response plot and transfer function display

Visual elements:
S-Plane:
- Complex plane with real (σ) and imaginary (jω) axes
- Grid lines at integer values
- Left half-plane shaded light green (stable region)
- Right half-plane shaded light red (unstable region)
- Imaginary axis highlighted
- Poles marked with blue ✕ symbols
- Zeros marked with red ○ symbols
- Draggable poles and zeros

Time Response Plot:
- Step response curve
- Time axis (0 to 10 seconds)
- Amplitude axis (0 to 2)
- Steady-state reference line

Interactive controls:
- Drag poles and zeros on s-plane
- Button: Add Pole (click to place)
- Button: Add Zero (click to place)
- Button: Delete Selected
- Button: Reset to Example
- Dropdown: Preset examples (First-order, Underdamped second-order, System with zero)

Data Visibility Requirements:
- Display transfer function G(s) in symbolic form
- Show pole values: p₁ = [value], p₂ = [value], etc.
- Show zero values: z₁ = [value], etc.
- Display DC gain
- For complex poles: show ζ and ωn

Behavior:
- Step response updates in real-time as poles/zeros are dragged
- System becomes unstable (response grows) if any pole enters RHP
- Complex conjugate poles must move as pairs
- Transfer function display updates with each change
- Warning message if system is unstable

Instructional Rationale: Direct manipulation of poles and zeros with immediate visual feedback builds deep intuition for the connection between s-plane locations and time response. Students discover relationships through exploration rather than memorization.

Implementation: p5.js with draggable elements and real-time response calculation
</details>

## Real Poles

**Real poles** lie on the real axis of the s-plane—they have no imaginary component. A real pole at $s = -a$ (where $a > 0$) contributes an exponentially decaying term $Ae^{-at}$ to the time response.

The location determines everything:

- **Magnitude $|a|$**: Determines decay rate (larger = faster)
- **Sign**: Negative (left of origin) = stable, Positive (right) = unstable
- **Distance from origin**: Time constant $\tau = 1/|a|$

Real poles produce smooth, monotonic response components—no oscillation. A first-order system has exactly one real pole. Second-order overdamped systems have two distinct real poles.

#### Real Pole Step Response

For a system with a single real pole at $s = -a$:

$G(s) = \frac{K \cdot a}{s + a}$

The step response is:

$y(t) = K(1 - e^{-at})$

where:

- $K$ is the DC gain
- $a$ is the pole magnitude (determines speed)
- $\tau = 1/a$ is the time constant

| Pole at | Time Constant | 63.2% Time | Settling Time (5τ) |
|---------|---------------|------------|-------------------|
| $s = -1$ | 1 second | 1 s | 5 s |
| $s = -5$ | 0.2 seconds | 0.2 s | 1 s |
| $s = -0.5$ | 2 seconds | 2 s | 10 s |

## Complex Conjugate Poles

**Complex conjugate poles** always come in pairs (for systems with real coefficients) and create oscillatory behavior. A pair at $s = -\sigma \pm j\omega_d$ produces a damped sinusoidal response:

#### Damped Sinusoidal Response

$y(t) = Ae^{-\sigma t}\sin(\omega_d t + \phi)$

where:

- $\sigma = \zeta\omega_n$ is the decay rate (real part magnitude)
- $\omega_d = \omega_n\sqrt{1-\zeta^2}$ is the damped frequency
- $\zeta$ is the damping ratio
- $\omega_n$ is the natural frequency

The geometry of complex pole locations directly encodes the dynamic parameters:

- **Distance from origin**: $\omega_n = \sqrt{\sigma^2 + \omega_d^2}$ (natural frequency)
- **Angle from negative real axis**: $\theta = \cos^{-1}(\zeta)$ (damping ratio)
- **Real part magnitude**: $\sigma = \zeta\omega_n$ (decay rate)

!!! tip "Reading ζ from the S-Plane"
    Draw a line from the origin to a complex pole. The angle θ this line makes with the negative real axis relates to damping: $\zeta = \cos(\theta)$. Poles at 45° have ζ = 0.707 (often considered optimal). Poles near the imaginary axis (large θ) are lightly damped. Poles near the real axis (small θ) are heavily damped.

#### Diagram: Complex Pole Geometry

<iframe src="../../sims/complex-pole-geometry/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Complex Pole Geometry</summary>
Type: microsim

Bloom Taxonomy: Apply (L3)
Bloom Verb: calculate, demonstrate

Learning Objective: Students will calculate damping ratio and natural frequency from complex pole locations by measuring angles and distances on the s-plane.

Canvas layout:
- Left side (60%): S-plane with geometric construction
- Right side (40%): Parameter display and response preview

Visual elements:
S-Plane:
- Complex plane with axes labeled σ and jω
- Complex conjugate pole pair (draggable)
- Line from origin to upper pole
- Arc showing angle θ
- Horizontal line to real axis intersection
- Vertical line showing imaginary part
- Constant ζ lines (radial lines from origin)
- Constant ωn circles (arcs centered at origin)

Parameter Display:
- Real part: σ = [value]
- Imaginary part: ωd = [value]
- Natural frequency: ωn = [value]
- Damping ratio: ζ = [value]
- Angle: θ = [value]°

Response Preview:
- Small step response plot showing damped oscillation
- Envelope curves visible

Interactive controls:
- Drag pole to reposition (conjugate moves automatically)
- Toggle: Show/hide constant ζ lines
- Toggle: Show/hide constant ωn circles
- Slider: Set ζ directly (poles move to match)
- Slider: Set ωn directly (poles move to match)

Data Visibility Requirements:
- Display all geometric relationships as pole moves
- Show calculation: ωn = √(σ² + ωd²)
- Show calculation: ζ = σ/ωn = cos(θ)
- Update response preview in real-time

Behavior:
- As pole is dragged, all parameters update continuously
- Constant ζ lines are radial (same angle = same damping)
- Constant ωn circles show poles with same natural frequency
- Cannot drag poles to RHP in this demonstration
- Response preview shows corresponding time behavior

Instructional Rationale: Geometric construction with live parameter calculation helps students internalize the relationships between pole locations and dynamic parameters. The dual representation (slider vs. drag) reinforces bidirectional understanding.

Implementation: p5.js with geometric drawing and canvas-based controls
</details>

!!! quote "Helping Gyra"
    "My complex conjugate poles determine my wobble characteristics. When they're close to the imaginary axis, I oscillate many times before settling—it's exhausting! When they're far to the left, I barely wobble at all, but I'm also sluggish. My engineers found a sweet spot around ζ = 0.7, where I'm responsive but not too bouncy. On the s-plane, that's when my poles sit at about 45° from the real axis."

## Simple Poles vs. Repeated Poles

A **simple pole** is a pole of multiplicity one—it appears exactly once as a root of the characteristic equation. Most poles you'll encounter are simple poles, and they contribute straightforward exponential or oscillatory components to the response.

**Repeated poles** (also called multiple poles) occur when a root appears more than once. A pole of multiplicity $m$ at $s = -a$ appears as a factor $(s+a)^m$ in the denominator.

The key difference is in the time response:

#### Simple vs Repeated Pole Response

For a simple pole at $s = -a$:

$\mathcal{L}^{-1}\left\{\frac{1}{s+a}\right\} = e^{-at}$

For a repeated pole of order 2 at $s = -a$:

$\mathcal{L}^{-1}\left\{\frac{1}{(s+a)^2}\right\} = te^{-at}$

For a repeated pole of order 3:

$\mathcal{L}^{-1}\left\{\frac{1}{(s+a)^3}\right\} = \frac{t^2}{2}e^{-at}$

The pattern continues: multiplicity $m$ contributes terms up to $t^{m-1}e^{-at}$.

| Pole Type | Transfer Function Factor | Time Response |
|-----------|-------------------------|---------------|
| Simple at $-a$ | $\frac{1}{s+a}$ | $e^{-at}$ |
| Double at $-a$ | $\frac{1}{(s+a)^2}$ | $te^{-at}$ |
| Triple at $-a$ | $\frac{1}{(s+a)^3}$ | $\frac{t^2}{2}e^{-at}$ |

The polynomial factor ($t$, $t^2$, etc.) causes the response to initially grow before the exponential decay dominates. Critically damped second-order systems have a repeated pole—that's why their response has the form $(1 + \omega_n t)e^{-\omega_n t}$.

!!! note "Repeated Poles in Practice"
    Repeated poles are mathematically interesting but somewhat rare in physical systems. They represent a knife-edge condition—a tiny change in parameters would split the repeated pole into two nearby simple poles. In design, we often aim for repeated poles when we want critical damping.

## Pole at Origin

A **pole at the origin** ($s = 0$) has special significance. It corresponds to an integrator in the system—a component that accumulates its input over time. In the time domain, a pole at $s = 0$ contributes a constant or a ramp, depending on the input.

#### Integrator Transfer Function

$G(s) = \frac{1}{s}$

This is a pure integrator. Its step response is a ramp:

$y(t) = t$

The output grows without bound—there's no decay because the pole's real part is zero.

Poles at the origin are neither stable nor unstable—they're **marginally stable**. The system doesn't blow up, but it doesn't settle down either. This is characteristic of systems with no restoring force or inherent feedback, such as:

- Position control systems (integrating velocity gives position)
- Tank level with continuous flow (integrating flow rate gives volume)
- A frictionless mass (integrating force gives velocity)

| Pole Location | Classification | Step Response |
|---------------|---------------|---------------|
| Left of origin | Stable | Bounded, settles |
| At origin | Marginally stable | Ramp (unbounded) |
| Right of origin | Unstable | Exponential growth |

!!! quote "Gyra Moment"
    "I have something like a pole at the origin—or very close to it. When I lean forward slightly, I don't spring back automatically. Without my controller constantly applying corrective torque, I'd just keep falling. That's what an integrator does: any small disturbance accumulates into a big problem. My controller has to actively fight this tendency every millisecond. If the controller sleeps, I fall."

## Poles in the Left Half Plane

**Poles in the left half plane (LHP)** are the hallmark of stable systems. Any pole with a negative real part ($\text{Re}(s) < 0$) contributes a decaying component to the time response—whether exponential decay for real poles or damped oscillation for complex poles.

For stability, *all* poles must be in the LHP. This is the fundamental stability criterion:

!!! success "Stability Criterion"
    A linear time-invariant system is **stable** if and only if all poles of its transfer function lie in the open left half-plane (excluding the imaginary axis).

The farther a pole is to the left, the faster its contribution decays. This gives us a design principle: if we want a faster system, push the poles leftward. But there are limits—real actuators can't respond infinitely fast, and pushing poles too far left requires high gains that amplify noise.

Consider a system with poles at $s = -1$ and $s = -10$:

- The pole at $s = -1$ has time constant $\tau = 1$ s
- The pole at $s = -10$ has time constant $\tau = 0.1$ s

After about 0.5 seconds, the contribution from the $s = -10$ pole has decayed to essentially nothing, while the $s = -1$ pole is just getting started. The leftmost pole is "fast" and becomes negligible quickly; the rightmost pole (still in LHP) "dominates" the long-term response.

#### Diagram: LHP Pole Effects

<iframe src="../../sims/lhp-pole-effects/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>LHP Pole Effects</summary>
Type: microsim

Bloom Taxonomy: Analyze (L4)
Bloom Verb: differentiate, compare

Learning Objective: Students will analyze how pole distance from the imaginary axis affects response speed and settling time.

Canvas layout:
- Top (50%): S-plane showing pole locations
- Bottom (50%): Time response showing individual pole contributions and total

Visual elements:
S-Plane:
- LHP shaded green with "Stable Region" label
- Imaginary axis highlighted
- Multiple poles (2-3) at different horizontal positions
- Draggable poles (horizontal movement only for this demo)

Time Response:
- Individual contributions from each pole (thin colored lines)
- Total response (thick black line)
- Time axis 0-10 seconds
- Amplitude axis
- Settling time markers

Interactive controls:
- Drag poles horizontally to change real part
- Toggle: Show/hide individual contributions
- Button: Reset
- Dropdown: 2 poles, 3 poles, or 4 poles

Data Visibility Requirements:
- Display each pole location and its time constant
- Show settling time for each component (5τ)
- Identify which pole is "dominant" (rightmost)
- Show total system settling time

Behavior:
- As poles move left, their contributions decay faster
- Dominant pole always labeled (rightmost LHP pole)
- Response updates in real-time
- Cannot drag poles across imaginary axis in this demo

Instructional Rationale: By separating individual pole contributions, students see clearly why the rightmost pole dominates. Horizontal-only movement focuses attention on the key parameter affecting response speed.

Implementation: p5.js with constrained dragging and multi-curve plotting
</details>

## Poles in the Right Half Plane

**Poles in the right half plane (RHP)** spell disaster. A pole with a positive real part ($\text{Re}(s) > 0$) contributes an exponentially *growing* component to the response. The system is **unstable**—any disturbance, no matter how small, will eventually cause the output to blow up.

For a pole at $s = +a$ (where $a > 0$):

$y(t) \propto e^{+at}$

This grows without bound. In practice, physical systems don't actually reach infinity—they hit actuator limits, break, catch fire, or otherwise demonstrate that mathematical models have their limits. But the point stands: RHP poles must be eliminated through feedback or the system is unusable.

!!! danger "Unstable Systems"
    An unstable system is not merely "sluggish" or "oscillatory"—it's fundamentally broken for control purposes. Even with zero input, noise or numerical error will trigger exponential growth. RHP poles are red flags that demand immediate attention. Never deploy a system with RHP poles without closed-loop stabilization.

How do RHP poles arise? Many interesting physical systems are inherently unstable:

- Inverted pendulums (Gyra!)
- Rocket or missile guidance (aerodynamic instability)
- Some chemical reactors (thermal runaway)
- Aircraft at certain flight conditions

The good news: feedback control can move poles. A major goal of controller design is to take an unstable open-loop system and create a stable closed-loop system by moving RHP poles into the LHP.

## Poles on the Imaginary Axis

**Poles on the imaginary axis** represent the boundary between stability and instability. They produce sustained oscillations that neither grow nor decay—**marginal stability**.

A pair of complex conjugate poles at $s = \pm j\omega$ contributes:

$y(t) = A\cos(\omega t + \phi)$

This oscillation continues forever at constant amplitude. There's no damping (the real part is zero), so energy is neither added nor removed.

Examples of systems with imaginary-axis poles:

- Ideal LC oscillators (no resistance)
- Undamped spring-mass systems (no friction)
- Systems at the edge of instability

| Pole Location | Real Part | Response Behavior |
|---------------|-----------|-------------------|
| LHP | Negative | Decaying (stable) |
| Imaginary axis | Zero | Sustained oscillation (marginal) |
| RHP | Positive | Growing (unstable) |

Imaginary-axis poles are tricky to work with. They're neither clearly stable nor unstable—any small perturbation might push them into either half-plane. In practice, truly marginally stable systems are rare because real systems always have some damping. But understanding this boundary case is essential for stability analysis.

!!! quote "Helping Gyra"
    "If my poles sat exactly on the imaginary axis, I would oscillate forever at constant amplitude—swinging back and forth without ever settling or falling. But that would require perfect symmetry and zero friction, which don't exist. In reality, my poles are either slightly in the LHP (I eventually settle) or slightly in the RHP (I eventually fall). My controller's job is to make sure they stay firmly in the LHP."

## System Order

The **system order** is the degree of the denominator polynomial of the transfer function—equivalently, the number of poles (counting multiplicity). System order determines the maximum complexity of the response and corresponds to the number of independent energy storage elements.

For a transfer function:

#### General Transfer Function

$G(s) = \frac{b_m s^m + b_{m-1}s^{m-1} + \cdots + b_0}{a_n s^n + a_{n-1}s^{n-1} + \cdots + a_0}$

The system order is $n$ (the degree of the denominator).

| Order | Poles | Energy Storage | Example |
|-------|-------|----------------|---------|
| 1 | 1 | 1 element | RC circuit |
| 2 | 2 | 2 elements | RLC circuit, mass-spring-damper |
| 3 | 3 | 3 elements | Cascaded tanks |
| n | n | n elements | Complex systems |

Higher-order systems can exhibit more complex behavior—multiple oscillation modes, multiple time scales, more complex transient shapes. However, higher-order systems can often be approximated by lower-order models using dominant pole analysis, which we'll explore shortly.

The order also tells us how many initial conditions are needed to specify the system state completely and how many roots we need to find when analyzing the characteristic equation.

## Proper and Strictly Proper Transfer Functions

A transfer function's "properness" relates the degrees of its numerator and denominator. This classification has important implications for physical realizability and high-frequency behavior.

A **proper transfer function** has:

$\deg(N(s)) \leq \deg(D(s))$

In other words, the numerator degree is less than or equal to the denominator degree. All physically realizable systems are proper.

A **strictly proper transfer function** has:

$\deg(N(s)) < \deg(D(s))$

The numerator degree is strictly less than the denominator degree.

An **improper transfer function** has:

$\deg(N(s)) > \deg(D(s))$

Improper transfer functions are not physically realizable—they would require predicting the future or infinite bandwidth.

| Transfer Function | Numerator Degree | Denominator Degree | Classification |
|-------------------|------------------|-------------------|----------------|
| $\frac{5}{s+2}$ | 0 | 1 | Strictly proper |
| $\frac{s+1}{s+2}$ | 1 | 1 | Proper |
| $\frac{s+1}{(s+2)(s+3)}$ | 1 | 2 | Strictly proper |
| $\frac{s^2+1}{s+2}$ | 2 | 1 | Improper |

!!! tip "Why This Matters"
    Strictly proper systems have gain that drops to zero at high frequencies—they act as low-pass filters. Proper (but not strictly proper) systems approach a constant gain at high frequencies. These characteristics affect noise sensitivity, controller design, and simulation accuracy.

For control design, we typically work with strictly proper plants (most physical systems) and may add proper controllers. Improper controllers can sometimes arise in theory but require approximation for implementation.

## DC Gain

The **DC gain** is the system's steady-state output-to-input ratio for a constant input—what happens when all the transients have died out and the system has fully settled. It's found by evaluating the transfer function at $s = 0$:

#### DC Gain Formula

$K_{DC} = G(0) = \lim_{s \to 0} G(s)$

For a transfer function:

$G(s) = \frac{5(s+3)}{(s+1)(s+2)}$

The DC gain is:

$K_{DC} = G(0) = \frac{5(0+3)}{(0+1)(0+2)} = \frac{15}{2} = 7.5$

This means a unit step input produces a steady-state output of 7.5.

DC gain tells you the "amplification" of the system for slowly-varying signals. It's crucial for:

- Predicting steady-state response to step inputs
- Calculating steady-state error in feedback systems
- Scaling controller gains

| Transfer Function | DC Gain | Steady-State Step Response |
|-------------------|---------|---------------------------|
| $\frac{3}{s+2}$ | $3/2 = 1.5$ | 1.5 |
| $\frac{10}{(s+1)(s+5)}$ | $10/5 = 2$ | 2 |
| $\frac{s+2}{s+5}$ | $2/5 = 0.4$ | 0.4 |

!!! warning "Poles at Origin"
    If the system has a pole at the origin (an integrator), the DC gain is infinite—$G(0)$ blows up. This makes physical sense: an integrator's response to a constant input is a ramp that grows forever. For such systems, we talk about "velocity constants" or "position constants" instead.

## Dominant Poles

In higher-order systems, not all poles contribute equally to the response. **Dominant poles** are the poles closest to the imaginary axis—they decay slowest and therefore dominate the long-term transient behavior.

Consider a third-order system with poles at $s = -1$, $s = -2$, and $s = -10$:

- Pole at $s = -1$: time constant $\tau = 1$ s, contributes $e^{-t}$
- Pole at $s = -2$: time constant $\tau = 0.5$ s, contributes $e^{-2t}$
- Pole at $s = -10$: time constant $\tau = 0.1$ s, contributes $e^{-10t}$

After $t = 0.5$ seconds:
- $e^{-10(0.5)} = e^{-5} \approx 0.007$ (essentially zero)
- $e^{-2(0.5)} = e^{-1} \approx 0.37$ (significant)
- $e^{-1(0.5)} = e^{-0.5} \approx 0.61$ (dominant)

The pole at $s = -10$ is effectively "invisible" after the first half-second. The pole at $s = -1$ dominates the settling behavior.

!!! tip "The Factor of 5 Rule"
    A common approximation: if a pole is more than 5 times farther from the imaginary axis than the dominant pole(s), its contribution can often be neglected for design purposes. The system can then be approximated by a lower-order model containing only the dominant poles.

This simplification is enormously practical. A tenth-order system might be well-approximated by a second-order model if only two poles are close to the imaginary axis and the rest are far to the left. Simplified models are easier to analyze, design for, and explain to management.

#### Diagram: Dominant Pole Approximation

<iframe src="../../sims/dominant-pole-approximation/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Dominant Pole Approximation</summary>
Type: microsim

Bloom Taxonomy: Evaluate (L5)
Bloom Verb: assess, justify

Learning Objective: Students will assess when a lower-order approximation is valid by comparing full and reduced-order model responses.

Canvas layout:
- Left (50%): S-plane showing all poles with dominance zones
- Right (50%): Time response comparing full model vs. approximation

Visual elements:
S-Plane:
- All poles of full system (3-4 poles)
- Vertical "dominance boundary" line (adjustable)
- Poles left of boundary shaded/dimmed (to be neglected)
- Poles right of boundary highlighted (dominant)

Time Response:
- Full-order response (solid blue line)
- Reduced-order approximation (dashed red line)
- Error band showing difference
- Settling time markers for both

Interactive controls:
- Slider: Position of "neglect boundary"
- Drag poles to different locations
- Dropdown: Preset systems (3rd, 4th, 5th order examples)
- Toggle: Show/hide error
- Display: Order of approximation

Data Visibility Requirements:
- List all poles with their distances from imaginary axis
- Show ratio: "Fastest neglected pole / Slowest kept pole"
- Display RMS error between full and approximate responses
- Show percentage fit quality

Behavior:
- As boundary moves, some poles are "kept" and others "neglected"
- Approximate response uses only kept poles (with DC gain correction)
- Error generally decreases as more poles are kept
- Good approximation when ratio > 5

Instructional Rationale: Students develop judgment about when approximations are valid by directly seeing the trade-off between model complexity and accuracy. The adjustable boundary lets them discover the "factor of 5" guideline empirically.

Implementation: p5.js with adjustable boundary and error calculation
</details>

## Pole-Zero Cancellation

**Pole-zero cancellation** occurs when a zero is located at or very near the same location as a pole. In the transfer function:

#### Cancellation Example

$G(s) = \frac{s+2}{(s+2)(s+5)} = \frac{1}{s+5}$

The zero at $s = -2$ "cancels" the pole at $s = -2$, leaving a first-order system.

But wait—is this really that simple? Mathematically, yes. Practically, it's more nuanced.

**Perfect cancellation** (exact match) eliminates the pole's contribution entirely. The mode associated with that pole simply doesn't appear in the transfer function output.

**Imperfect cancellation** (pole and zero close but not identical) is more realistic. Manufacturing tolerances and parameter variations mean exact cancellation is nearly impossible. A small mismatch leaves a lightly-weighted pole that may still affect transient behavior.

!!! warning "Hidden Modes"
    Cancellation can hide dynamics but doesn't eliminate them. If a pole at $s = -2$ is cancelled but initial conditions excite that mode, the response will still contain $e^{-2t}$ components. Cancellation affects the forced response but not the natural response. This distinction matters for stability analysis and internal stability.

| Cancellation Scenario | Practical Concern |
|----------------------|-------------------|
| LHP pole cancelled by LHP zero | Generally acceptable, may hide slow mode |
| RHP pole cancelled by RHP zero | Dangerous! Internal instability remains |
| Pole near zero (imperfect) | Lightly-damped hidden mode, sensitive to parameters |

The most dangerous case is attempting to cancel an unstable (RHP) pole with a RHP zero. The transfer function looks stable, but the internal dynamics remain unstable. Any noise or disturbance will excite the hidden unstable mode, causing internal state variables to blow up even while the output appears well-behaved—until it doesn't.

## Putting It All Together: Reading a Pole-Zero Plot

Now that we've explored each element, let's develop a systematic approach to reading pole-zero plots. When presented with a pole-zero plot, follow this analysis checklist:

**Step 1: Check Stability**
Are all poles in the left half-plane? If any pole is on or right of the imaginary axis, the system is marginally stable or unstable.

**Step 2: Identify Dominant Poles**
Which poles are closest to the imaginary axis? These dominate the response.

**Step 3: Classify Response Type**

- All real poles → No oscillation
- Complex conjugate poles → Oscillatory component
- Read damping from pole angle: $\zeta = \cos(\theta)$

**Step 4: Estimate Speed**
Distance from imaginary axis determines speed. Dominant pole location gives approximate time constant.

**Step 5: Note Zeros**

- LHP zeros affect overshoot
- RHP zeros cause initial undershoot
- Zeros near poles may indicate cancellation

**Step 6: Calculate DC Gain**
Evaluate $G(0)$ for steady-state behavior.

#### Diagram: Pole-Zero Analysis Workflow

<iframe src="../../sims/pole-zero-workflow/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>Pole-Zero Analysis Workflow</summary>
Type: workflow

Bloom Taxonomy: Apply (L3)
Bloom Verb: execute, implement

Learning Objective: Students will apply a systematic workflow to analyze any pole-zero plot and predict system behavior.

Purpose: Show the step-by-step process for analyzing a pole-zero plot

Visual style: Flowchart with decision diamonds and process rectangles

Steps:
1. Start: "Given: Pole-Zero Plot"
   Hover text: "Start with locations of all poles and zeros"

2. Decision: "All poles in LHP?"
   Hover text: "Check if all poles have negative real parts"

3a. Process: "System is STABLE" (if yes)
    Hover text: "Proceed with response analysis"

3b. Process: "System is UNSTABLE" (if no)
    Hover text: "Stop! System requires stabilization first"

4. Process: "Identify Dominant Poles"
   Hover text: "Find pole(s) closest to imaginary axis"

5. Decision: "Complex or Real Poles?"
   Hover text: "Check if dominant poles have imaginary parts"

6a. Process: "Calculate ζ, ωn from geometry" (if complex)
    Hover text: "Use ζ=cos(θ), ωn=distance from origin"

6b. Process: "Calculate time constant τ=1/|p|" (if real)
    Hover text: "Response is purely exponential"

7. Process: "Analyze Zeros"
   Hover text: "Check for LHP zeros (overshoot), RHP zeros (undershoot), or cancellations"

8. Process: "Calculate DC Gain"
   Hover text: "Evaluate G(0) for steady-state value"

9. End: "Complete System Characterization"
   Hover text: "Can now predict step response, stability margins, etc."

Color coding:
- Blue: Data/query steps
- Green: Stable path
- Red: Unstable warning
- Yellow: Decision points
- Purple: Calculation steps

Interactive elements:
- Hover over each box for detailed explanation
- Click to see example at each stage

Implementation: HTML/CSS/JavaScript with SVG flowchart
</details>

## Key Takeaways

This chapter has equipped you with the vocabulary and visual intuition to analyze systems through their pole-zero structure. Here's what you can now do:

- **Poles** are the roots of the denominator—they determine the natural modes of the system. Every pole contributes a component to the time response.

- **Zeros** are the roots of the numerator—they shape how strongly each mode appears. Zeros near poles can suppress those modes.

- The **pole-zero plot** is a complete graphical summary of a system's dynamics. Learn to read it like a map.

- **Stability** requires all poles to be in the left half-plane. RHP poles mean exponential growth—unstable. Imaginary-axis poles mean sustained oscillation—marginal stability.

- **Real poles** produce exponential decays or growths. **Complex conjugate poles** produce oscillations. The damping ratio $\zeta = \cos(\theta)$ can be read directly from the pole angle.

- **Repeated poles** produce polynomial-times-exponential responses. Critical damping is a special case with repeated poles.

- **Dominant poles** are closest to the imaginary axis and determine long-term behavior. Higher-order systems can often be approximated by keeping only dominant poles.

- **DC gain** $G(0)$ gives the steady-state response to a step input.

- **Pole-zero cancellation** can simplify transfer functions but can hide internal dynamics—especially dangerous if cancelling RHP poles.

- **Proper** transfer functions have numerator degree ≤ denominator degree. All physical systems are proper; strictly proper systems are most common.

The s-plane is your diagnostic tool for understanding and designing control systems. When you see a transfer function, immediately sketch the pole-zero plot—it will tell you everything you need to know about stability, speed, and oscillation characteristics.

??? question "Self-Check: Test Your Understanding"
    Before moving on, see if you can answer these without peeking:

    1. A system has poles at $s = -2 \pm j3$. What is the natural frequency $\omega_n$ and damping ratio $\zeta$?
    2. A transfer function has poles at $s = -1$, $s = -10$, and $s = -50$. Which pole dominates the response, and what is the approximate settling time?
    3. True or false: If you cancel an unstable pole with a zero at the same location, the system becomes stable.
    4. A system has DC gain of 5. What is the steady-state output for a unit step input?
    5. Looking at a pole at 45° from the negative real axis, what is the damping ratio?

    If you got all five, you're ready for the next chapter on block diagrams and feedback structures!
