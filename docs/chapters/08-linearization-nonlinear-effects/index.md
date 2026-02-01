---
title: Linearization and Nonlinear Effects
description: Techniques for linearizing nonlinear systems and understanding common nonlinear phenomena in control applications
generated_by: claude skill chapter-content-generator
date: 2026-01-31
version: 0.03
---

# Linearization and Nonlinear Effects

## Summary

This chapter addresses the challenge of analyzing systems that are inherently nonlinear. Students will learn to identify operating points and equilibrium conditions, apply Taylor series expansion to linearize nonlinear system equations, and perform small-signal analysis around operating points. The chapter also introduces common nonlinear phenomena encountered in real systems including saturation, dead zones, backlash, and hysteresis. Understanding these effects helps engineers anticipate when linear analysis may be insufficient.

## Concepts Covered

This chapter covers the following 10 concepts from the learning graph:

1. Linearization
2. Operating Point
3. Equilibrium Point
4. Small Signal Analysis
5. Taylor Series Expansion
6. Nonlinear System
7. Saturation
8. Dead Zone
9. Backlash
10. Hysteresis

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Dynamic System Properties](../02-dynamic-system-properties/index.md)
- [Chapter 7: Physical System Modeling](../07-physical-system-modeling/index.md)

---

## The Uncomfortable Truth About Real Systems

In Chapter 2, we celebrated the Linear Time-Invariant (LTI) system as the foundation of classical control theory. In Chapter 7, we derived transfer functions for electrical, mechanical, and electromechanical systems—treating them as nice, well-behaved linear creatures. But here's the awkward confession: **almost every real physical system is nonlinear**.

Springs stiffen at large deflections. Amplifiers saturate. Gears have backlash. Valves stick. Motors have friction that isn't purely viscous. Even the simple pendulum—that textbook favorite—follows a $\sin\theta$ relationship that defies linearity.

So why didn't we mention this earlier? Because there's a powerful saving grace: **many nonlinear systems behave approximately linear over a limited operating range**. The art of linearization is extracting a useful linear model from a fundamentally nonlinear reality, valid near a specific operating point. This isn't mathematical wishful thinking—it's a principled approximation that works remarkably well in practice.

This chapter develops the tools to:

- Identify where a system "wants to be" (equilibrium points)
- Approximate nonlinear behavior with linear models (Taylor series linearization)
- Analyze small deviations from the operating point (small-signal analysis)
- Recognize common nonlinear effects that can't be linearized away

!!! quote "Gyra Moment"
    "Here's my confession: I'm deeply, fundamentally nonlinear. My motors saturate when I'm falling fast. Gravity acts through $\sin\theta$, not $\theta$. There's friction that sticks before it slips. But here's the beautiful thing—when I'm nearly upright and things are calm, I behave *almost* linearly. That's when your LTI tools work on me. My engineers call it my 'sweet spot,' and their job is to keep me there."

## Nonlinear Systems: A Closer Look

A **nonlinear system** is any system that doesn't satisfy the superposition principle. Recall from Chapter 2 that linear systems obey two rules: homogeneity (scale the input, scale the output proportionally) and additivity (add inputs, add outputs). Nonlinear systems violate one or both of these properties.

Nonlinearity manifests in differential equations through:

| Nonlinear Feature | Example | Physical Interpretation |
|-------------------|---------|------------------------|
| Products of variables | $y \cdot \frac{dy}{dt}$ | Velocity-dependent friction |
| Powers other than 1 | $y^2$, $\sqrt{y}$ | Aerodynamic drag, flow through orifice |
| Transcendental functions | $\sin y$, $e^y$ | Pendulum angle, thermal radiation |
| Variable coefficients | $(1+y)k$ | Hardening spring |
| Discontinuities | $\text{sign}(v)$ | Coulomb friction |

Consider the simple pendulum from Chapter 7. The true equation of motion is:

#### True Pendulum Equation

$mL^2\frac{d^2\theta}{dt^2} + B\frac{d\theta}{dt} + mgL\sin\theta = \tau$

where:

- $m$ is the pendulum mass
- $L$ is the pendulum length
- $B$ is the damping coefficient
- $g$ is gravitational acceleration
- $\theta$ is the angle from vertical
- $\tau$ is the applied torque

The $\sin\theta$ term makes this nonlinear. Doubling the initial angle does *not* double the response. Adding two angle solutions does *not* give the solution for the sum of initial angles. Superposition fails.

The same pendulum equation we linearized in Chapter 7 using $\sin\theta \approx \theta$ is our prototype example for this chapter. That approximation isn't magic—it's a Taylor series truncation, and understanding when and why it works is essential for applying linearization to any nonlinear system.

#### Diagram: Linear vs Nonlinear Response Comparison

<iframe src="../../sims/linear-vs-nonlinear/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Linear vs Nonlinear Response Comparison</summary>
Type: microsim

Bloom Taxonomy: Analyze (L4)
Bloom Verb: compare, contrast

Learning Objective: Students will analyze how linear and nonlinear systems respond differently to scaled and combined inputs, demonstrating that superposition fails for nonlinear systems.

Canvas layout:
- Top (50%): Two response plots side by side
  - Left: Linear system responses
  - Right: Nonlinear (pendulum) system responses
- Bottom (50%): Controls and superposition test display

Visual elements:
Linear System Panel:
- Response to input u₁(t)
- Response to input 2·u₁(t)
- Shows that 2·y₁(t) overlays exactly with response to 2·u₁(t)

Nonlinear System Panel:
- Response to input θ₁(0) initial angle
- Response to input 2·θ₁(0) initial angle
- Shows that 2·y₁(t) does NOT match response to 2·θ₁(0)
- Difference highlighted in red

Superposition Test:
- Numerical comparison: "Expected (if linear): X, Actual: Y, Error: Z%"

Interactive controls:
- Slider: Initial angle θ₁(0) for pendulum (5° to 45°)
- Slider: Damping ratio (0.1 to 1.0)
- Radio buttons: Test type (Homogeneity test, Additivity test)
- Button: Run comparison
- Button: Reset

Data Visibility Requirements:
- Display both linear prediction and actual nonlinear response
- Show percentage deviation from linear behavior
- For homogeneity: compare 2·y(θ₀) with y(2θ₀)
- For additivity: compare y(θ₁+θ₂) with y(θ₁)+y(θ₂)

Behavior:
- For small angles, curves nearly overlap (linear approximation valid)
- For large angles, significant deviation appears
- Error percentage increases with angle magnitude
- Visual emphasis on where linearity breaks down

Instructional Rationale: Direct visual comparison between linear and nonlinear responses makes abstract superposition failure concrete. Students see that the discrepancy grows with signal amplitude.

Implementation: p5.js with differential equation solver (Runge-Kutta) for pendulum dynamics
</details>

## Equilibrium Points: Where Systems Want to Rest

Before linearizing a nonlinear system, we must first ask: linearize around *what*? The answer is the **equilibrium point** (also called a fixed point or steady-state)—a condition where the system remains at rest if undisturbed.

An **equilibrium point** is a state where all derivatives are zero when the input is constant. For a system described by:

$\frac{dx}{dt} = f(x, u)$

the equilibrium point $(x_e, u_e)$ satisfies:

#### Equilibrium Condition

$f(x_e, u_e) = 0$

where:

- $x_e$ is the equilibrium state
- $u_e$ is the constant input at equilibrium
- $f$ is the system dynamics function

For the pendulum with constant torque input $\tau_e$:

$0 = -\frac{B}{mL^2}\dot{\theta} - \frac{g}{L}\sin\theta_e + \frac{\tau_e}{mL^2}$

With $\dot{\theta} = 0$ at equilibrium:

$\sin\theta_e = \frac{\tau_e}{mgL}$

If $\tau_e = 0$ (no applied torque), then $\theta_e = 0$ (hanging down) or $\theta_e = \pi$ (balanced up) are equilibrium points. Only $\theta_e = 0$ is stable—small disturbances die out. At $\theta_e = \pi$, the pendulum is balanced but any tiny nudge sends it falling.

!!! tip "Equilibrium vs Operating Point"
    The terms "equilibrium point" and "operating point" are related but not identical. An equilibrium point is a special state where derivatives vanish—the system is truly at rest. An **operating point** is more general: it's any steady-state condition around which we choose to linearize, which might involve constant motion (like a motor spinning at constant speed) rather than absolute stillness.

### Finding Equilibrium Points

For systems with multiple variables, finding equilibrium points requires solving simultaneous algebraic equations. Consider a system with two state variables:

$\frac{dx_1}{dt} = f_1(x_1, x_2, u)$

$\frac{dx_2}{dt} = f_2(x_1, x_2, u)$

Setting both derivatives to zero gives:

$f_1(x_{1e}, x_{2e}, u_e) = 0$

$f_2(x_{1e}, x_{2e}, u_e) = 0$

This system of equations may have zero, one, or multiple solutions—corresponding to no equilibrium, a unique equilibrium, or multiple equilibria (like the pendulum's up and down positions).

| System | Equilibrium Condition | Example Equilibria |
|--------|----------------------|-------------------|
| Pendulum | $\sin\theta_e = \tau_e/(mgL)$ | $\theta = 0$ (stable), $\theta = \pi$ (unstable) |
| Tank level | $q_{in} = q_{out}(h_e)$ | Level where inflow equals outflow |
| DC motor | $K_t i_a = B\omega_e + \tau_L$ | Speed where motor torque equals load |
| Thermostat | $q_{heating} = q_{loss}(T_e)$ | Temperature where heat in equals heat out |

!!! quote "Helping Gyra"
    "I have exactly one equilibrium point I care about: perfectly vertical at $\theta = 0$. That's where I want to be. There's technically another equilibrium at $\theta = \pi$—upside down—but let's not talk about that. It's unstable anyway. My control system's entire job is to keep me near my preferred equilibrium. When I drift away, the controller applies torque to bring me back. It's a constant negotiation with gravity."

## Operating Points: The Foundation of Linearization

An **operating point** is the steady-state condition around which we linearize a nonlinear system. For equilibrium points, this means zero derivatives. For systems in steady motion (like a motor at constant speed), the operating point includes constant rates of change.

Consider a DC motor driving a load at constant speed $\omega_0$ with armature voltage $V_0$. The operating point satisfies:

#### Motor Operating Point

$V_0 = R_a I_0 + K_e \omega_0$

$K_t I_0 = B\omega_0 + \tau_L$

where:

- $V_0$ is the steady-state armature voltage
- $I_0$ is the steady-state armature current
- $\omega_0$ is the steady-state angular velocity
- $\tau_L$ is the constant load torque

At the operating point, electrical power in equals mechanical power out plus losses. The motor is in equilibrium with its load.

To linearize, we analyze small deviations from this operating point:

$v_a(t) = V_0 + \Delta v_a(t)$

$\omega(t) = \omega_0 + \Delta \omega(t)$

$i_a(t) = I_0 + \Delta i_a(t)$

The deviations $\Delta v_a$, $\Delta \omega$, $\Delta i_a$ are the "small signals" we analyze. The operating point values $V_0$, $\omega_0$, $I_0$ are the "DC bias" or "quiescent point."

This separation is powerful because the small-signal dynamics are often linear even when the full system is not. We sacrifice information about the absolute values to gain the ability to use transfer functions, frequency response, and all our LTI tools.

#### Diagram: Operating Point Concept Visualizer

<iframe src="../../sims/operating-point-viz/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Operating Point Concept Visualizer</summary>
Type: microsim

Bloom Taxonomy: Understand (L2)
Bloom Verb: explain, interpret

Learning Objective: Students will interpret the relationship between operating point, small-signal deviations, and the total system response by visualizing how signals decompose into DC and AC components.

Canvas layout:
- Left (60%): Time-domain plot showing signal decomposition
- Right (40%): Operating point diagram and explanation

Visual elements:
Time Plot:
- Total signal (black solid line): $x(t) = X_0 + \Delta x(t)$
- Operating point level (blue dashed horizontal line): $X_0$
- Small signal deviation (green): $\Delta x(t)$
- Shaded region between operating point and total signal

Operating Point Diagram:
- Vertical axis representing the signal variable
- Marked operating point with label
- Arrows showing deviation range
- "Linear region" bracket showing valid range for linearization

Interactive controls:
- Slider: Operating point value $X_0$ (adjustable range)
- Slider: Small signal amplitude (0 to 20% of operating point)
- Slider: Small signal frequency
- Toggle: Show/hide components individually
- Button: Reset to defaults

Data Visibility Requirements:
- Display numerical value of operating point
- Display peak deviation magnitude
- Show ratio: deviation/operating_point (should be small for valid linearization)
- Warning indicator when deviation exceeds "small signal" validity

Behavior:
- Total signal moves up/down as operating point changes
- Small signal oscillates around operating point
- Color coding shows valid vs questionable linearization region
- Visual warning when deviation amplitude is too large

Instructional Rationale: Visualizing the decomposition of a signal into DC (operating point) and AC (small signal) components builds intuition for what linearization actually means physically. The warning for large deviations reinforces validity limits.

Implementation: p5.js with real-time signal generation and annotation
</details>

## Taylor Series Expansion: The Mathematical Engine

**Taylor series expansion** is the mathematical tool that powers linearization. It allows us to approximate any smooth function as a polynomial, with accuracy improving as we include more terms.

For a function $f(x)$ expanded around point $x_0$:

#### Taylor Series Formula

$f(x) = f(x_0) + \frac{df}{dx}\bigg|_{x_0}(x - x_0) + \frac{1}{2!}\frac{d^2f}{dx^2}\bigg|_{x_0}(x - x_0)^2 + \cdots$

where:

- $f(x_0)$ is the function value at the expansion point
- $\frac{df}{dx}\big|_{x_0}$ is the first derivative evaluated at $x_0$
- $(x - x_0)$ is the deviation from the expansion point
- Higher-order terms contain higher powers of $(x - x_0)$

For linearization, we truncate after the first-order term:

#### Linear Approximation

$f(x) \approx f(x_0) + \frac{df}{dx}\bigg|_{x_0}(x - x_0)$

This approximation is valid when $(x - x_0)$ is "small" so that the quadratic and higher terms are negligible.

### Example: Linearizing sin(θ)

The pendulum's $\sin\theta$ term linearizes around $\theta_0 = 0$:

$\sin\theta \approx \sin(0) + \cos(0) \cdot (\theta - 0) = 0 + 1 \cdot \theta = \theta$

The famous small-angle approximation! But where did it come from? The Taylor series:

- $f(\theta) = \sin\theta$
- $f(0) = \sin(0) = 0$
- $f'(0) = \cos(0) = 1$
- Linear approximation: $\sin\theta \approx \theta$

For expansion around $\theta_0 \neq 0$:

$\sin\theta \approx \sin\theta_0 + \cos\theta_0 \cdot (\theta - \theta_0)$

The slope of the approximation depends on where you expand. At $\theta_0 = 0$, the slope is $\cos(0) = 1$. At $\theta_0 = \pi/2$, the slope is $\cos(\pi/2) = 0$—the function is locally flat at its peak.

| Function | Expansion Point | Linear Approximation |
|----------|----------------|---------------------|
| $\sin\theta$ | $\theta_0 = 0$ | $\theta$ |
| $\cos\theta$ | $\theta_0 = 0$ | $1$ (constant) |
| $e^x$ | $x_0 = 0$ | $1 + x$ |
| $\ln(1+x)$ | $x_0 = 0$ | $x$ |
| $\sqrt{1+x}$ | $x_0 = 0$ | $1 + \frac{x}{2}$ |
| $(1+x)^n$ | $x_0 = 0$ | $1 + nx$ |

#### Diagram: Taylor Series Approximation Explorer

<iframe src="../../sims/taylor-series-explorer/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Taylor Series Approximation Explorer</summary>
Type: microsim

Bloom Taxonomy: Apply (L3)
Bloom Verb: demonstrate, calculate

Learning Objective: Students will apply Taylor series expansion to approximate nonlinear functions, observing how the approximation accuracy depends on the expansion point and the number of terms included.

Canvas layout:
- Main area (70%): Function plot with Taylor approximations
- Side panel (30%): Controls and error display

Visual elements:
Function Plot:
- Original nonlinear function (black solid curve): sin(θ), cos(θ), e^x, etc.
- Linear approximation (blue dashed line)
- Quadratic approximation (green dotted line, optional)
- Expansion point marker (red dot)
- Vertical lines showing valid region where error < threshold

Error Display:
- Numerical error at current cursor position
- Shaded region showing approximation validity

Interactive controls:
- Dropdown: Function to approximate (sin, cos, exp, sqrt, ln)
- Slider: Expansion point x₀ (-π to π for trig, -2 to 2 for others)
- Slider: View range
- Radio buttons: Approximation order (1st order, 2nd order, 3rd order)
- Toggle: Show error shading
- Mouse: Hover to see error at specific x values

Data Visibility Requirements:
- Display Taylor series formula with numerical coefficients
- Show function value f(x₀) and slope f'(x₀) at expansion point
- Display error magnitude at cursor position
- Show "valid range" where error < 5%

Behavior:
- Tangent line updates as expansion point moves
- Higher-order approximations show better fit over wider range
- Error shading shows where approximation breaks down
- Cursor displays exact values and errors

Instructional Rationale: Interactive manipulation of the expansion point and order builds geometric intuition for Taylor series. Seeing the tangent line as the linear approximation connects calculus concepts to linearization practice.

Implementation: p5.js with real-time function plotting and derivative calculation
</details>

### Multivariable Taylor Expansion

For systems with multiple variables, we need the multivariable Taylor expansion. For a function $f(x_1, x_2)$ around operating point $(x_{10}, x_{20})$:

#### Multivariable Linear Approximation

$f(x_1, x_2) \approx f(x_{10}, x_{20}) + \frac{\partial f}{\partial x_1}\bigg|_0 (x_1 - x_{10}) + \frac{\partial f}{\partial x_2}\bigg|_0 (x_2 - x_{20})$

where:

- $\frac{\partial f}{\partial x_1}\big|_0$ is the partial derivative with respect to $x_1$ at the operating point
- $\frac{\partial f}{\partial x_2}\big|_0$ is the partial derivative with respect to $x_2$ at the operating point

The partial derivatives evaluated at the operating point become the coefficients of the linearized model. This is how nonlinear coupling between variables gets "frozen" into constant coefficients for small-signal analysis.

## Linearization Procedure: A Systematic Approach

Linearizing a nonlinear system follows a systematic procedure. Here's the step-by-step approach:

**Step 1: Write the Nonlinear System Equations**

Express the system as first-order differential equations:

$\frac{dx}{dt} = f(x, u)$

$y = g(x, u)$

where $x$ is the state, $u$ is the input, and $y$ is the output.

**Step 2: Find the Operating Point**

Solve for the equilibrium or steady-state condition:

$f(x_0, u_0) = 0$

$y_0 = g(x_0, u_0)$

**Step 3: Define Deviation Variables**

Introduce small deviations from the operating point:

$\Delta x = x - x_0$

$\Delta u = u - u_0$

$\Delta y = y - y_0$

**Step 4: Apply Taylor Series**

Expand the nonlinear functions and keep only first-order terms:

$f(x, u) \approx f(x_0, u_0) + \frac{\partial f}{\partial x}\bigg|_0 \Delta x + \frac{\partial f}{\partial u}\bigg|_0 \Delta u$

Since $f(x_0, u_0) = 0$ at equilibrium:

$\frac{d(\Delta x)}{dt} = \frac{\partial f}{\partial x}\bigg|_0 \Delta x + \frac{\partial f}{\partial u}\bigg|_0 \Delta u$

**Step 5: Write the Linearized Model**

Define the linearized coefficients:

$A = \frac{\partial f}{\partial x}\bigg|_0, \quad B = \frac{\partial f}{\partial u}\bigg|_0$

The linearized system is:

$\frac{d(\Delta x)}{dt} = A \cdot \Delta x + B \cdot \Delta u$

**Step 6: Derive the Transfer Function**

Take the Laplace transform and solve for the transfer function:

$s\Delta X(s) = A \cdot \Delta X(s) + B \cdot \Delta U(s)$

$(s - A)\Delta X(s) = B \cdot \Delta U(s)$

$G(s) = \frac{\Delta X(s)}{\Delta U(s)} = \frac{B}{s - A}$

### Example: Linearizing a Tank Level System

Consider a tank with cross-sectional area $A$, inlet flow rate $q_{in}$, and outlet flow through an orifice where flow depends nonlinearly on height:

$q_{out} = k\sqrt{h}$

The governing equation is:

$A\frac{dh}{dt} = q_{in} - k\sqrt{h}$

This is nonlinear due to the $\sqrt{h}$ term.

**Step 1: Nonlinear equation**

$\frac{dh}{dt} = \frac{1}{A}(q_{in} - k\sqrt{h})$

**Step 2: Operating point**

At steady state with $q_{in} = Q_0$:

$0 = Q_0 - k\sqrt{h_0}$

$h_0 = (Q_0/k)^2$

**Step 3: Deviation variables**

$\Delta h = h - h_0$, $\Delta q = q_{in} - Q_0$

**Step 4: Taylor series**

$\sqrt{h} \approx \sqrt{h_0} + \frac{1}{2\sqrt{h_0}}(h - h_0) = \sqrt{h_0} + \frac{1}{2\sqrt{h_0}}\Delta h$

Substituting:

$\frac{d(\Delta h)}{dt} = \frac{1}{A}\left(\Delta q - \frac{k}{2\sqrt{h_0}}\Delta h\right)$

**Step 5: Linearized model**

Define: $R = \frac{2\sqrt{h_0}}{k} = \frac{2h_0}{Q_0}$ (effective resistance)

$\frac{d(\Delta h)}{dt} = -\frac{1}{AR}\Delta h + \frac{1}{A}\Delta q$

**Step 6: Transfer function**

$G(s) = \frac{\Delta H(s)}{\Delta Q(s)} = \frac{R}{ARs + 1} = \frac{R}{\tau s + 1}$

The linearized system is first-order with time constant $\tau = AR$ and DC gain $R$. But notice: $R$ depends on the operating point $h_0$. At higher tank levels, the effective resistance is larger, meaning the system responds more slowly. The "same" physical system has different linearized dynamics at different operating points!

## Small Signal Analysis: Working with Deviations

**Small signal analysis** is the practice of analyzing system behavior in terms of deviations from an operating point. It's the practical application of linearization—separating the steady-state (DC) response from the dynamic (AC) response.

The key insight is that the small-signal transfer function relates *deviations* in output to *deviations* in input:

$G(s) = \frac{\Delta Y(s)}{\Delta U(s)}$

This transfer function is computed at a specific operating point and is only valid for small excursions around that point. Large deviations invalidate the linearization.

### Validity of Small Signal Analysis

How "small" is small enough? There's no universal answer—it depends on:

1. **How nonlinear the system is**: Systems with sharp nonlinearities (saturation edges, dead zone boundaries) require smaller signals than gently curved nonlinearities.

2. **Acceptable error**: For rough analysis, 10-20% error might be acceptable. For precision control, less than 1% might be required.

3. **Safety margins**: In safety-critical systems, you might require the linearization to be valid over the entire expected operating range plus margins.

A practical approach is to:

- Linearize the system
- Simulate the full nonlinear system
- Compare the responses
- Determine the amplitude where they diverge unacceptably

!!! warning "Operating Point Dependence"
    The linearized model depends on the operating point! A motor linearized at 1000 RPM has different transfer function coefficients than the same motor linearized at 5000 RPM. If your system operates over a wide range, you may need multiple linearized models or gain scheduling to account for this variation.

#### Diagram: Small Signal Validity Checker

<iframe src="../../sims/small-signal-validity/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Small Signal Validity Checker</summary>
Type: microsim

Bloom Taxonomy: Evaluate (L5)
Bloom Verb: assess, validate

Learning Objective: Students will evaluate the validity of small-signal linearization by comparing linear model predictions to actual nonlinear system responses, determining the amplitude threshold where linearization breaks down.

Canvas layout:
- Top (60%): Dual response plot (nonlinear vs linearized)
- Bottom (40%): Error analysis and validity indicator

Visual elements:
Response Plot:
- Nonlinear system response (solid black)
- Linearized model prediction (dashed blue)
- Difference/error (red, optional overlay)
- Operating point reference line

Error Analysis Panel:
- Error magnitude vs time or vs signal amplitude
- Threshold line for "acceptable" error
- Validity indicator: green (valid), yellow (marginal), red (invalid)
- Maximum error percentage display

Interactive controls:
- Dropdown: System type (pendulum, tank, saturating amplifier)
- Slider: Operating point
- Slider: Input amplitude (small to large)
- Slider: Error threshold (1% to 20%)
- Button: Step input test
- Button: Sinusoidal input test
- Toggle: Show error overlay

Data Visibility Requirements:
- Display RMS error between nonlinear and linear responses
- Show peak instantaneous error
- Display "valid up to X% of operating point" recommendation
- Track error vs amplitude relationship

Behavior:
- For small inputs, responses overlay closely
- As input amplitude increases, discrepancy grows
- Error indicator changes color at threshold
- System clearly shows when linearization fails

Instructional Rationale: Quantitative comparison between nonlinear reality and linear approximation develops judgment about when linearization is trustworthy. The error threshold visualization makes the abstract "small signal" concept concrete.

Implementation: p5.js with dual differential equation solvers and error computation
</details>

### Example: Small Signal Analysis of a Pendulum

For a pendulum linearized around $\theta_0 = 0$:

Nonlinear: $\ddot{\theta} + \frac{B}{J}\dot{\theta} + \frac{g}{L}\sin\theta = \frac{\tau}{J}$

Linearized: $\ddot{\theta} + \frac{B}{J}\dot{\theta} + \frac{g}{L}\theta = \frac{\tau}{J}$

The small-signal transfer function from torque to angle is:

$G(s) = \frac{\Theta(s)}{T(s)} = \frac{1/J}{s^2 + \frac{B}{J}s + \frac{g}{L}}$

This is a standard second-order system with:

- Natural frequency: $\omega_n = \sqrt{g/L}$
- Damping ratio: $\zeta = \frac{B}{2J\omega_n}$

But this is only valid for small angles! At $\theta = 30°$ (0.52 rad), the error in the $\sin\theta \approx \theta$ approximation is:

$\text{Error} = \frac{|\sin(0.52) - 0.52|}{|\sin(0.52)|} = \frac{|0.497 - 0.52|}{0.497} \approx 4.6\%$

At $\theta = 60°$ (1.05 rad), the error jumps to about 17%. For many engineering applications, 5% error is the threshold where the linear model becomes questionable.

## Common Nonlinear Effects in Real Systems

While linearization handles smooth nonlinearities well, certain nonlinear effects have sharp features that resist linearization. These are important to recognize because they can cause unexpected behavior in systems that otherwise appear linear.

### Saturation

**Saturation** occurs when a system's output reaches a physical limit and can no longer increase regardless of input. It's the most common nonlinearity in control systems.

#### Saturation Characteristic

$y = \begin{cases} u_{max} & \text{if } u > u_{max} \\ u & \text{if } -u_{max} \leq u \leq u_{max} \\ -u_{max} & \text{if } u < -u_{max} \end{cases}$

where:

- $y$ is the saturated output
- $u$ is the input
- $u_{max}$ is the saturation limit

Examples of saturation:

- Amplifier output voltage hitting the power supply rails
- Motor torque limited by maximum current
- Valve fully open or fully closed
- Control surface deflection limits on aircraft
- Actuator position limits

Saturation affects closed-loop systems in insidious ways. When a controller's output saturates, the system can't respond as aggressively as the controller commands. This mismatch between commanded and actual control effort causes:

- **Delayed response**: The system takes longer to reach setpoint
- **Integrator windup**: An integral controller keeps accumulating error during saturation, causing overshoot when saturation ends
- **Loss of stability margins**: The effective loop gain drops during saturation

!!! quote "Gyra Moment"
    "Saturation is my nemesis. When I'm falling fast and my controller screams for maximum torque, my motors give everything they've got—but 'everything' has limits. The current saturates. The torque saturates. No matter how loud the controller shouts, I can only push back so hard. This is why my engineers tune for modest gains: if I rarely hit saturation, I stay in my nice linear world. But push me too far, too fast, and I'm in trouble."

### Dead Zone

A **dead zone** (or dead band) is a region of input values where the output is zero. It's the opposite of saturation—instead of limiting the output, the system ignores small inputs entirely.

#### Dead Zone Characteristic

$y = \begin{cases} m(u - d) & \text{if } u > d \\ 0 & \text{if } -d \leq u \leq d \\ m(u + d) & \text{if } u < -d \end{cases}$

where:

- $y$ is the output
- $u$ is the input
- $d$ is the dead zone half-width
- $m$ is the slope outside the dead zone

Examples of dead zones:

- Spool valve requiring minimum pressure to move
- Gear engagement requiring minimum torque
- Stiction (static friction) overcoming threshold
- Relay switching thresholds
- Sensor noise floors

Dead zones cause particular problems for precision positioning:

- **Limit cycles**: Oscillation around the setpoint as the controller alternates between overshooting and undershooting the dead zone
- **Steady-state error**: The system settles within the dead zone rather than at the exact setpoint
- **Loss of resolution**: Fine control is impossible within the dead zone

### Backlash

**Backlash** is the play or lost motion between mating components, most commonly in gear trains. When the direction of motion reverses, the driving gear must travel through the backlash gap before engaging the driven gear.

#### Backlash Characteristic

The backlash relationship is history-dependent (hysteretic). If the input is increasing:

$y = u - b$ (after engaging)

If the input is decreasing:

$y = u + b$ (after engaging)

where:

- $b$ is the backlash half-width
- The output "lags" behind the input by $2b$ when direction reverses

Examples of backlash:

- Gear trains (intentional clearance to prevent binding)
- Leadscrew and nut assemblies
- Linkage mechanisms with pivot clearance
- Steering systems (steering wheel "play")
- Valve actuators with mechanical coupling

Backlash causes:

- **Position uncertainty**: The output position is uncertain within the backlash band
- **Limit cycles**: Similar to dead zones, oscillation can occur as the system "bounces" through the backlash
- **Phase lag at reversal**: Effective delay when direction changes
- **Poor low-amplitude tracking**: Small signals may not propagate through the backlash

!!! tip "Mitigating Backlash"
    Mechanical solutions include preloaded gears (anti-backlash gears), harmonic drives, or direct-drive motors that eliminate gearing entirely. Control solutions include backlash compensation algorithms that add extra motion during reversals, or dither signals that keep the mechanism "engaged" in one direction.

### Hysteresis

**Hysteresis** is a memory effect where the output depends not only on the current input but also on the history of past inputs. The output follows different paths for increasing versus decreasing input, forming a characteristic loop.

#### Hysteresis Loop

Unlike backlash (which is purely kinematic), hysteresis involves energy storage or material properties. The output-input relationship forms a closed loop when the input cycles.

Examples of hysteresis:

- Magnetic materials (B-H curve in transformers and motors)
- Mechanical systems with friction (different static vs. kinetic friction)
- Thermal systems with phase changes
- Pneumatic systems with pressure hysteresis in seals
- On/off controllers (thermostat with different on and off thresholds)

Hysteresis effects include:

- **Path dependence**: The output depends on where you came from, not just where you are
- **Energy dissipation**: The area inside the hysteresis loop represents energy lost per cycle
- **Limit cycles**: Systems can oscillate around the hysteresis loop
- **Difficulty in precision control**: History-dependent behavior complicates feedback control

The key distinction between backlash and hysteresis: backlash has a definite "contact" point where the system becomes rigid, while hysteresis has a continuous (though path-dependent) input-output relationship.

#### Diagram: Nonlinear Effects Gallery

<iframe src="../../sims/nonlinear-effects-gallery/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Nonlinear Effects Gallery</summary>
Type: microsim

Bloom Taxonomy: Understand (L2)
Bloom Verb: describe, classify

Learning Objective: Students will describe and classify common nonlinear effects (saturation, dead zone, backlash, hysteresis) by observing their characteristic input-output relationships and how each distorts sinusoidal signals.

Canvas layout:
- Left (50%): Input-output characteristic curve
- Right (50%): Time-domain effect on sinusoidal input

Visual elements:
Characteristic Curve (left):
- X-axis: Input
- Y-axis: Output
- Ideal linear relationship (dashed gray)
- Actual nonlinear relationship (solid black)
- Shaded regions showing nonlinear zones
- Arrows showing traversal direction (for hysteresis/backlash)

Time Domain (right):
- Input sinusoid (blue)
- Output through nonlinearity (red/orange)
- Difference/distortion (green)
- Annotations showing effect features

Nonlinearity Selector:
- Tabs or radio buttons: Saturation, Dead Zone, Backlash, Hysteresis

Interactive controls:
- Tab/Radio: Select nonlinearity type
- Slider: Nonlinearity parameter (saturation level, dead zone width, backlash width, hysteresis loop width)
- Slider: Input amplitude
- Slider: Input frequency
- Button: Animate input-output trace on characteristic
- Toggle: Show harmonic distortion spectrum

Data Visibility Requirements:
- Display nonlinearity parameter values
- Show input amplitude vs output amplitude ratio
- For Saturation: show clipping percentage
- For Dead Zone: show "dead time" percentage of cycle
- For Backlash: show phase lag at reversals
- For Hysteresis: show loop area (energy loss)

Behavior:
- Characteristic curve animates as input sinusoid sweeps
- Moving dot traces the input-output relationship
- For backlash/hysteresis: trace forms loop instead of line
- Distortion becomes more severe with larger amplitudes or narrower linear regions

Instructional Rationale: Side-by-side view of characteristic curve and time-domain effect connects the abstract input-output plot to practical signal distortion. Interactive adjustment builds intuition for how each nonlinearity affects system behavior.

Implementation: p5.js with animated characteristic tracing and synchronized time-domain plotting
</details>

## Impact of Nonlinearities on Control System Performance

Nonlinear effects don't just complicate analysis—they directly degrade control system performance. Understanding these impacts helps engineers anticipate problems and design mitigations.

### Effects on Stability

Linear stability analysis (Routh-Hurwitz, root locus, Bode) assumes a linear system. Nonlinearities can:

- **Create limit cycles**: Oscillations that neither grow nor decay, stabilized by the nonlinearity
- **Cause conditional stability**: Stable for small disturbances but unstable for large ones (or vice versa)
- **Introduce multiple equilibria**: Some stable, some unstable—initial conditions determine which the system approaches

### Effects on Performance

| Nonlinearity | Tracking Error | Overshoot | Settling Time | Special Issues |
|--------------|---------------|-----------|---------------|----------------|
| Saturation | Increases (delayed response) | Can increase (integrator windup) | Increases | Loss of controllability |
| Dead Zone | Steady-state error | May increase | Increases | Limit cycles, resolution loss |
| Backlash | Position uncertainty | May oscillate | Increases | Limit cycles at reversal |
| Hysteresis | Path-dependent | May oscillate | Increases | Energy loss, limit cycles |

### Dealing with Nonlinearities

Engineers have several strategies:

1. **Stay in the linear region**: Design the operating point and input magnitudes to avoid nonlinear effects. This is the most common approach—keep saturation margin, stay above dead zone, minimize direction reversals.

2. **Linearization with multiple operating points**: Develop different linear models for different operating regimes and switch between them (gain scheduling).

3. **Nonlinear compensation**: Add inverse nonlinearities to cancel the original. For example, apply extra input to overcome dead zone, or use anti-windup logic for saturation.

4. **Describing function analysis**: An approximate method for analyzing limit cycles in systems with nonlinearities (beyond this course but worth knowing exists).

5. **Robust design**: Accept that nonlinearities exist and design controllers with sufficient margins to maintain stability despite them.

!!! quote "Helping Gyra"
    "My engineers don't pretend I'm perfectly linear. They know about my motor saturation, the dead zone in my low-torque region, and the backlash in my gear train (yes, I have a tiny one). Their strategy? Keep me well away from these trouble zones during normal operation. They use moderate gains that don't demand saturation, feedback signals large enough to be above the dead zone, and smooth motion that doesn't require sudden reversals. It's not about eliminating nonlinearity—it's about coexisting with it peacefully."

## Linearization in Practice: A Complete Example

Let's work through a complete linearization example for a system that combines multiple concepts: a water tank with nonlinear outflow and a pump with saturation.

### System Description

A cylindrical tank of cross-sectional area $A$ receives water from a pump. The pump flow rate is proportional to input voltage but saturates at $q_{max}$:

$q_{pump} = \begin{cases} k_p v & \text{if } 0 \leq k_p v \leq q_{max} \\ q_{max} & \text{if } k_p v > q_{max} \end{cases}$

The outlet flow depends nonlinearly on height (turbulent flow):

$q_{out} = k_v \sqrt{h}$

The complete system equation is:

$A\frac{dh}{dt} = q_{pump} - k_v\sqrt{h}$

### Step 1: Find Operating Point

For nominal input voltage $V_0$ (assuming no saturation), steady-state gives:

$0 = k_p V_0 - k_v\sqrt{h_0}$

$h_0 = \left(\frac{k_p V_0}{k_v}\right)^2$

The operating point exists if $k_p V_0 \leq q_{max}$ (no pump saturation at steady state).

### Step 2: Linearize Around Operating Point

Define deviations: $\Delta h = h - h_0$, $\Delta v = v - V_0$

Linearizing $\sqrt{h}$ around $h_0$:

$\sqrt{h} \approx \sqrt{h_0} + \frac{1}{2\sqrt{h_0}}\Delta h$

The linearized system equation becomes:

$A\frac{d(\Delta h)}{dt} = k_p \Delta v - \frac{k_v}{2\sqrt{h_0}}\Delta h$

Rearranging:

$\frac{d(\Delta h)}{dt} = -\frac{k_v}{2A\sqrt{h_0}}\Delta h + \frac{k_p}{A}\Delta v$

### Step 3: Transfer Function

Define parameters:

$\tau = \frac{2A\sqrt{h_0}}{k_v} = \frac{2Ah_0}{k_p V_0}$ (time constant, operating-point dependent)

$K = \frac{2k_p\sqrt{h_0}}{k_v} = \frac{2h_0}{V_0}$ (DC gain, operating-point dependent)

The small-signal transfer function is:

$G(s) = \frac{\Delta H(s)}{\Delta V(s)} = \frac{K}{\tau s + 1}$

### Step 4: Interpret Results

Key observations:

- The linearized system is first-order (one energy storage element: the tank)
- Both $\tau$ and $K$ depend on $h_0$, which depends on $V_0$—the dynamics change with operating point
- At higher operating levels ($h_0$ large), both time constant and gain increase
- The linearization is valid only for small $\Delta v$ and $\Delta h$
- Pump saturation is ignored in the linearized model—valid only when operating well below $q_{max}$

### Step 5: Check Validity

For the linearization to be valid:

1. $\Delta h \ll h_0$ (square-root approximation)
2. $k_p(V_0 + \Delta v) < q_{max}$ (no saturation)
3. $h > 0$ (tank not empty)

If these conditions are violated, the linearized model gives incorrect predictions.

## Key Takeaways

This chapter addressed the fundamental tension in control engineering: real systems are nonlinear, but our most powerful analysis tools assume linearity. The resolution is **linearization**—approximating nonlinear behavior with linear models valid near an operating point.

**Nonlinear Systems:**

- Violate the superposition principle (scaling and/or additivity fail)
- Arise from products, powers, transcendental functions, or discontinuities in the governing equations
- Include almost every real physical system to some degree

**Equilibrium and Operating Points:**

- An equilibrium point is where all derivatives vanish under constant input
- An operating point is the steady-state condition around which we linearize
- The operating point determines the coefficients of the linearized model

**Taylor Series Linearization:**

- The linear term of the Taylor series provides the local linear approximation
- Partial derivatives evaluated at the operating point become system coefficients
- Valid only for "small" deviations—the neglected higher-order terms must be negligible

**Small Signal Analysis:**

- Analyzes deviations from operating point using linear transfer functions
- The linearized transfer function relates deviation inputs to deviation outputs
- Validity depends on how far the system operates from the linearization point

**Common Nonlinear Effects:**

- **Saturation**: Output limited to maximum value (amplifiers, motors, actuators)
- **Dead Zone**: Zero output for small inputs (valves, friction, threshold effects)
- **Backlash**: Play between mating components (gears, linkages)
- **Hysteresis**: Path-dependent, history-dependent behavior (magnetic materials, friction)

These nonlinear effects resist linearization and cause limit cycles, steady-state errors, and degraded performance. Engineers must recognize them and design systems that either avoid triggering them or include compensation strategies.

The linearization skills developed here connect physical system modeling (Chapter 7) to the stability analysis and controller design techniques that follow. A good linearized model, with awareness of its validity limits, is the foundation for effective control system design.

??? question "Self-Check: Test Your Understanding"
    Before moving on, verify you can answer these:

    1. A system is described by $\frac{dy}{dt} = ay + bu + cy^2$. Is this system linear? Why or why not?

    2. For the equation $\frac{dx}{dt} = x^2 - 4$, find all equilibrium points. Which are stable?

    3. Linearize $f(x) = x^3$ around $x_0 = 2$. What is the linearized function?

    4. A pump has flow rate $q = k\sqrt{\Delta P}$ where $\Delta P$ is pressure difference. Linearize this around operating point $\Delta P_0 = 4$ bar.

    5. Explain why saturation in a control system's actuator can lead to integrator windup.

    6. A position control system has backlash of ±0.5 mm in its gear train. How does this affect steady-state positioning accuracy?
