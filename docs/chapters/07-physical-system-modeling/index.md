---
title: Physical System Modeling
description: Deriving mathematical models for electrical, mechanical, and electromechanical systems
generated_by: claude skill chapter-content-generator
date: 2026-01-31
version: 0.03
---

# Physical System Modeling

## Summary

This chapter develops the skills to create mathematical models of real physical systems. Students will learn to derive differential equations and transfer functions for electrical circuits (RC, RL, RLC, op-amp), mechanical systems (translational and rotational including mass-spring-dampers, pendulums, and gear trains), and electromechanical systems (DC motors). The chapter also introduces analogous system concepts that reveal deep connections between electrical and mechanical domains, enabling engineers to apply insights across disciplines.

## Concepts Covered

This chapter covers the following 25 concepts from the learning graph:

1. Electrical Systems
2. Mechanical Systems
3. Translational Systems
4. Rotational Systems
5. Electromechanical Systems
6. Motor Model
7. DC Motor
8. Armature-Controlled Motor
9. Field-Controlled Motor
10. Motor Transfer Function
11. RLC Circuit
12. RC Circuit
13. RL Circuit
14. Op-Amp Circuits
15. Mass-Spring-Damper
16. Pendulum System
17. Gear Train
18. Lever System
19. Fluid Systems
20. Thermal Systems
21. Analogous Systems
22. Impedance Analogy
23. Mobility Analogy
24. Force-Voltage Analogy
25. Force-Current Analogy

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Dynamic System Properties](../02-dynamic-system-properties/index.md)
- [Chapter 3: Time-Domain Response Fundamentals](../03-time-domain-response/index.md)
- [Chapter 5: Laplace Transform Methods](../05-laplace-transform-methods/index.md)

---

## From Abstract to Concrete

Up to this point, we've worked with transfer functions that appeared almost magically—given to us as ratios of polynomials in $s$. But where do these transfer functions come from? How do you look at a real physical system—a circuit, a motor, a suspension system—and write down the mathematics that describes its behavior?

This is the art and science of **physical system modeling**. It's where control engineering connects to the real world. The transfer function isn't just a mathematical abstraction; it emerges from the actual physics of the system you're trying to control.

In this chapter, we'll develop systematic techniques for deriving models of three major categories of physical systems:

- **Electrical systems**: circuits with resistors, capacitors, inductors, and operational amplifiers
- **Mechanical systems**: both translational (straight-line motion) and rotational (spinning)
- **Electromechanical systems**: devices like DC motors that convert between electrical and mechanical energy

Along the way, we'll discover something remarkable: the equations governing these seemingly different systems are often identical in structure. A mass-spring-damper behaves mathematically just like an RLC circuit. This insight, captured in the concept of **analogous systems**, means that intuition developed in one domain transfers directly to others.

!!! quote "Gyra Moment"
    "My body is where all these domains meet. I have motors (electromechanical), which drive wheels against the ground (mechanical), controlled by circuits on my board (electrical). When my engineers model me correctly, they can predict exactly how I'll respond. When they get the model wrong, well... let's just say I spend a lot of time on the floor."

## Electrical Systems

**Electrical systems** are natural starting points for control engineers because they're relatively easy to analyze mathematically and build physically. The fundamental components—resistors, capacitors, and inductors—each have simple, well-understood relationships between voltage and current.

The building blocks:

| Component | Symbol | Voltage-Current Relation | Impedance $Z(s)$ |
|-----------|--------|-------------------------|------------------|
| Resistor | $R$ | $v = iR$ | $R$ |
| Capacitor | $C$ | $v = \frac{1}{C}\int i \, dt$ | $\frac{1}{sC}$ |
| Inductor | $L$ | $v = L\frac{di}{dt}$ | $sL$ |

These relationships, combined with Kirchhoff's laws, allow us to write the governing equations for any circuit. Taking the Laplace transform gives us the s-domain representation, and from there, the transfer function.

The **impedance** concept is particularly powerful: in the s-domain, all three components obey a generalized Ohm's law $V(s) = Z(s)I(s)$, where $Z(s)$ is the component's impedance. This means we can analyze complex circuits using the same techniques as simple resistive circuits—just with complex, frequency-dependent impedances.

### RC Circuit

The **RC circuit** is the simplest dynamic electrical circuit, consisting of a resistor and capacitor in series. It's a first-order system with a single time constant.

#### RC Circuit Schematic

Consider a series RC circuit with input voltage $v_{in}(t)$ and output taken across the capacitor as $v_{out}(t)$.

Applying Kirchhoff's voltage law:

$v_{in}(t) = v_R(t) + v_{out}(t) = Ri(t) + v_{out}(t)$

The current through the capacitor is:

$i(t) = C\frac{dv_{out}}{dt}$

Substituting:

$v_{in}(t) = RC\frac{dv_{out}}{dt} + v_{out}(t)$

This is a first-order linear differential equation. Taking the Laplace transform (with zero initial conditions):

$V_{in}(s) = RCs \cdot V_{out}(s) + V_{out}(s) = (RCs + 1)V_{out}(s)$

#### RC Circuit Transfer Function

$G(s) = \frac{V_{out}(s)}{V_{in}(s)} = \frac{1}{RCs + 1} = \frac{1}{\tau s + 1}$

where:

- $\tau = RC$ is the time constant
- The pole is at $s = -1/\tau = -1/RC$

The RC circuit acts as a **low-pass filter**: it passes low-frequency signals while attenuating high frequencies. The cutoff frequency is $\omega_c = 1/RC$ rad/s. At DC (s = 0), the gain is 1; at high frequencies, the gain approaches zero.

Physical interpretation: the capacitor voltage can't change instantaneously. When the input steps up, the capacitor gradually charges through the resistor, with the charging current decreasing exponentially as the capacitor voltage approaches the input.

### RL Circuit

The **RL circuit** pairs a resistor with an inductor, creating another first-order system but with different characteristics than the RC circuit.

For a series RL circuit with output taken across the resistor:

$v_{in}(t) = L\frac{di}{dt} + Ri(t)$

The output voltage across the resistor is $v_{out}(t) = Ri(t)$, so $i(t) = v_{out}(t)/R$.

Taking the Laplace transform:

$V_{in}(s) = \frac{Ls}{R}V_{out}(s) + V_{out}(s) = \left(\frac{L}{R}s + 1\right)V_{out}(s)$

#### RL Circuit Transfer Function

$G(s) = \frac{V_{out}(s)}{V_{in}(s)} = \frac{1}{\frac{L}{R}s + 1} = \frac{1}{\tau s + 1}$

where:

- $\tau = L/R$ is the time constant
- The pole is at $s = -R/L$

Wait—this looks identical to the RC circuit transfer function! Both are first-order systems with the form $1/(\tau s + 1)$. The only difference is how $\tau$ is computed: $RC$ for the RC circuit, $L/R$ for the RL circuit.

This is our first hint of the deep connections between different physical systems that we'll explore in the analogous systems section.

### RLC Circuit

The **RLC circuit** combines all three passive components, creating a second-order system with much richer behavior than the first-order RC or RL circuits.

Consider a series RLC circuit with input voltage $v_{in}(t)$ and output taken across the capacitor:

#### RLC Circuit Differential Equation

$L\frac{d^2v_{out}}{dt^2} + R\frac{dv_{out}}{dt} + \frac{1}{C}v_{out} = \frac{1}{C}v_{in}$

Taking the Laplace transform:

$Ls^2V_{out}(s) + RsV_{out}(s) + \frac{1}{C}V_{out}(s) = \frac{1}{C}V_{in}(s)$

#### RLC Circuit Transfer Function

$G(s) = \frac{V_{out}(s)}{V_{in}(s)} = \frac{1/LC}{s^2 + \frac{R}{L}s + \frac{1}{LC}}$

Comparing with the standard second-order form $\frac{\omega_n^2}{s^2 + 2\zeta\omega_n s + \omega_n^2}$:

- Natural frequency: $\omega_n = \frac{1}{\sqrt{LC}}$
- Damping ratio: $\zeta = \frac{R}{2}\sqrt{\frac{C}{L}}$

The RLC circuit can exhibit all the second-order behaviors we studied earlier: overdamped, critically damped, underdamped, or undamped oscillation—depending on the relative values of R, L, and C.

| Damping Condition | Damping Ratio | Circuit Behavior |
|-------------------|---------------|------------------|
| $R > 2\sqrt{L/C}$ | $\zeta > 1$ | Overdamped (sluggish) |
| $R = 2\sqrt{L/C}$ | $\zeta = 1$ | Critically damped (fastest non-oscillatory) |
| $R < 2\sqrt{L/C}$ | $\zeta < 1$ | Underdamped (oscillatory) |
| $R = 0$ | $\zeta = 0$ | Undamped (sustained oscillation) |

#### Diagram: RLC Circuit Response Explorer

<iframe src="../../sims/rlc-circuit-explorer/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>RLC Circuit Response Explorer</summary>
Type: microsim

Bloom Taxonomy: Apply (L3)
Bloom Verb: demonstrate, solve

Learning Objective: Students will apply their understanding of second-order system parameters to predict RLC circuit behavior and observe how R, L, and C values affect the response.

Canvas layout:
- Left (55%): Time response plot
- Right (45%): Circuit diagram and parameter panel

Visual elements:
Circuit Diagram:
- Series RLC schematic with labeled components
- Component values displayed
- Input and output voltage indicators

Time Response Plot:
- Step response of capacitor voltage
- Time axis (0 to 10τ)
- Amplitude axis with unity step input reference
- Overshoot and settling time indicators for underdamped cases

Parameter Panel:
- Current R, L, C values
- Calculated ω_n and ζ
- Damping classification (overdamped/critically/underdamped)
- Pole locations

Interactive controls:
- Slider: Resistance R (1 to 1000 Ω)
- Slider: Inductance L (0.001 to 1 H)
- Slider: Capacitance C (0.1 to 100 μF)
- Button: Reset to defaults
- Toggle: Show pole locations on s-plane inset

Data Visibility Requirements:
- Display calculated ω_n = 1/√(LC)
- Display calculated ζ = (R/2)√(C/L)
- Show damping classification
- Display pole locations: s = -ζω_n ± jω_n√(1-ζ²)

Behavior:
- Response plot updates in real-time as sliders move
- Color coding: overdamped (blue), critical (green), underdamped (orange)
- Pole locations update on s-plane inset
- Numerical displays update with slider changes

Instructional Rationale: Direct manipulation of circuit parameters with immediate visual feedback builds intuition for how component values map to system dynamics. The connection between physical parameters and abstract quantities (ω_n, ζ) becomes tangible.

Implementation: p5.js with canvas-based sliders and dual plotting areas
</details>

### Op-Amp Circuits

**Operational amplifiers** (op-amps) are active electronic devices that dramatically expand what we can achieve with circuits. While passive RC and RL circuits can only attenuate signals, op-amp circuits can provide gain, inversion, integration, differentiation, and much more.

For control systems, the ideal op-amp model suffices:

- Infinite input impedance (no current into input terminals)
- Zero output impedance
- Infinite open-loop gain (forces the difference between inputs to zero when feedback is present)

These idealized properties, combined with negative feedback, give us the "golden rules" for op-amp analysis:

1. No current flows into the + or − input terminals
2. When negative feedback is present, the voltage difference between inputs is zero

#### Common Op-Amp Circuits for Control

**Inverting Amplifier:**

$G(s) = -\frac{Z_f(s)}{Z_{in}(s)}$

where $Z_f$ is the feedback impedance and $Z_{in}$ is the input impedance.

**Integrator (Inverting):**

With resistor input and capacitor feedback:

$G(s) = -\frac{1}{RCs}$

This produces output proportional to the integral of the input—essential for PI and PID controllers.

**Differentiator:**

With capacitor input and resistor feedback:

$G(s) = -RCs$

This produces output proportional to the derivative—useful for PD control, though rarely used pure due to noise amplification.

**Active Low-Pass Filter:**

Combining an inverting amplifier with RC filtering:

$G(s) = -\frac{R_f}{R_{in}} \cdot \frac{1}{\tau s + 1}$

This provides both filtering and gain, making it useful in many control applications.

!!! tip "Op-Amps in Control Systems"
    Op-amp circuits are the building blocks of analog controllers. A PID controller can be constructed entirely from op-amp stages: an inverting integrator for the I term, a differentiator (with filtering) for the D term, and amplifiers for gain adjustment. Understanding these circuits helps bridge the gap between control theory and hardware implementation.

## Mechanical Systems

**Mechanical systems** translate the physical world of forces, masses, and motion into mathematical models. We divide mechanical systems into two categories based on the type of motion: translational (straight-line) and rotational (spinning).

The fundamental mechanical elements parallel the electrical ones in satisfying ways that we'll explore in the analogous systems section.

### Translational Systems

**Translational systems** involve straight-line motion. The fundamental elements are mass, spring (stiffness), and damper (friction), with the relevant variables being force, velocity, and displacement.

| Element | Symbol | Force Relationship | Impedance $Z(s)$ |
|---------|--------|-------------------|------------------|
| Mass | $m$ | $F = m\frac{d^2x}{dt^2}$ | $ms^2$ |
| Damper | $b$ | $F = b\frac{dx}{dt}$ | $bs$ |
| Spring | $k$ | $F = kx$ | $k$ |

The key governing principle is Newton's second law: $\sum F = ma$. For each mass in the system, we write a force balance equation, then combine these with the constitutive relations for springs and dampers.

### Mass-Spring-Damper System

The **mass-spring-damper** system is the canonical second-order mechanical system, analogous to the RLC circuit in the electrical domain. It appears everywhere: vehicle suspensions, vibration isolation platforms, seismic sensors, and of course, simplified models of robots like Gyra.

Consider a mass $m$ attached to a fixed wall via a spring $k$ and damper $b$, with an applied force $F(t)$ and displacement $x(t)$ measured from equilibrium.

Applying Newton's second law:

$F(t) = m\frac{d^2x}{dt^2} + b\frac{dx}{dt} + kx$

#### Mass-Spring-Damper Transfer Function

$G(s) = \frac{X(s)}{F(s)} = \frac{1}{ms^2 + bs + k}$

This can be written in standard form:

$G(s) = \frac{1/k}{(m/k)s^2 + (b/k)s + 1} = \frac{1/k}{\frac{s^2}{\omega_n^2} + \frac{2\zeta}{\omega_n}s + 1}$

where:

- Natural frequency: $\omega_n = \sqrt{k/m}$
- Damping ratio: $\zeta = \frac{b}{2\sqrt{km}}$
- DC gain: $1/k$ (static displacement per unit force)

The physical interpretation is intuitive:

- A stiffer spring (larger $k$) means faster oscillation (higher $\omega_n$) and smaller static displacement (lower DC gain)
- A heavier mass (larger $m$) means slower oscillation
- More damping (larger $b$) reduces oscillation and overshoot

!!! quote "Gyra Moment"
    "I'm basically a mass-spring-damper—except my 'spring' is gravity trying to tip me over, and my 'damper' is my control system fighting back. When my engineers tune my PD gains, they're essentially setting my effective spring constant and damping ratio. Too little damping and I wobble endlessly. Too much and I react like I'm stuck in honey."

#### Diagram: Mass-Spring-Damper Simulator

<iframe src="../../sims/mass-spring-damper-sim/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Mass-Spring-Damper Simulator</summary>
Type: microsim

Bloom Taxonomy: Apply (L3)
Bloom Verb: demonstrate, calculate

Learning Objective: Students will apply Newton's second law to predict mass-spring-damper behavior and observe the relationship between physical parameters (m, b, k) and system response characteristics (ω_n, ζ).

Canvas layout:
- Left (50%): Physical animation of mass-spring-damper
- Right (50%): Response plots and parameters

Visual elements:
Physical Animation:
- Fixed wall on left
- Spring (zigzag line) connecting wall to mass
- Damper (piston symbol) in parallel with spring
- Rectangular mass block
- Ground with friction indicators
- Position reference line
- Applied force arrow

Response Plots:
- Position vs time plot
- Velocity vs time plot (smaller, below)

Parameter Panel:
- Current m, b, k values
- Calculated ω_n and ζ
- Damping classification

Interactive controls:
- Slider: Mass m (0.5 to 10 kg)
- Slider: Damping b (0 to 20 N·s/m)
- Slider: Stiffness k (10 to 200 N/m)
- Button: Apply step force
- Button: Apply impulse
- Button: Reset position

Data Visibility Requirements:
- Display calculated ω_n = √(k/m)
- Display calculated ζ = b/(2√(km))
- Show damping classification
- Display period T = 2π/ω_d for underdamped cases

Behavior:
- Animation shows mass moving with spring stretching/compressing
- Response plots show position and velocity over time
- Different damping regimes show visually distinct behaviors
- Spring visualization stretches proportionally to displacement
- Damper shows velocity-proportional resistance

Instructional Rationale: Physical animation combined with response plots connects the abstract transfer function to tangible mechanical behavior. Students see how changing mass affects both animation speed and the response curves.

Implementation: p5.js with physics simulation and synchronized plotting
</details>

### Rotational Systems

**Rotational systems** involve spinning motion around an axis. The variables and elements are analogous to translational systems but for rotation:

| Translational | Rotational | Relationship |
|--------------|------------|--------------|
| Force $F$ | Torque $\tau$ | $\tau = Fr$ (moment arm) |
| Mass $m$ | Moment of inertia $J$ | $J = mr^2$ (for point mass) |
| Damping $b$ | Rotational damping $B$ | Same units concept |
| Stiffness $k$ | Torsional stiffness $K$ | Same units concept |
| Displacement $x$ | Angle $\theta$ | |
| Velocity $v$ | Angular velocity $\omega$ | |

Newton's second law becomes:

$\sum \tau = J\frac{d^2\theta}{dt^2} = J\dot{\omega}$

For a rotational mass-spring-damper (e.g., a torsional pendulum):

#### Rotational Second-Order System

$G(s) = \frac{\Theta(s)}{T(s)} = \frac{1}{Js^2 + Bs + K}$

where:

- $J$ is the moment of inertia
- $B$ is the rotational damping coefficient
- $K$ is the torsional spring constant
- $\Theta(s)$ is the angular displacement
- $T(s)$ is the applied torque

The form is identical to the translational case—only the variables and units differ.

### Pendulum System

The **pendulum** is a classical rotational system that introduces an important modeling concept: **linearization**. A simple pendulum's true dynamics are nonlinear, but for small angles, we can approximate the behavior with a linear model.

For a simple pendulum of length $L$ and mass $m$, with angle $\theta$ from vertical:

The exact equation of motion is:

$mL^2\frac{d^2\theta}{dt^2} + mgL\sin\theta = \tau_{applied}$

This is nonlinear because of the $\sin\theta$ term. However, for small angles (typically $\theta < 15°$), we can use the approximation $\sin\theta \approx \theta$:

#### Linearized Pendulum Equation

$mL^2\frac{d^2\theta}{dt^2} + mgL\theta = \tau_{applied}$

Adding damping $B$ at the pivot:

$mL^2\frac{d^2\theta}{dt^2} + B\frac{d\theta}{dt} + mgL\theta = \tau_{applied}$

#### Pendulum Transfer Function

$G(s) = \frac{\Theta(s)}{T(s)} = \frac{1}{mL^2s^2 + Bs + mgL}$

This is again a second-order system with:

- Natural frequency: $\omega_n = \sqrt{g/L}$ (the classic pendulum frequency)
- Damping ratio: $\zeta = \frac{B}{2mL^2\omega_n} = \frac{B}{2L\sqrt{mgL}}$

!!! warning "Linearization Limitations"
    The linearized pendulum model only works for small angles. If the pendulum swings widely, the actual behavior diverges from the linear prediction. This is a recurring theme in control: linear models are powerful but have validity limits. Good engineers know where those limits lie.

### Gear Train

**Gear trains** are mechanical power transmission systems that transform speed and torque. They're essential components in motors, robotics, and machinery. From a modeling perspective, they act as transformers—similar to electrical transformers but for mechanical quantities.

For an ideal gear pair with gear ratio $N = N_2/N_1$ (driven gear teeth / driving gear teeth):

| Quantity | Relationship |
|----------|--------------|
| Angular velocity | $\omega_2 = \omega_1/N$ |
| Torque | $\tau_2 = N\tau_1$ |
| Power | $P_2 = P_1$ (conserved) |

Gears trade speed for torque: a gear ratio $N > 1$ reduces output speed but multiplies torque.

When reflecting inertia and damping through a gear train to a single reference shaft:

#### Reflected Inertia Formula

$J_{reflected} = J_{load}/N^2$

where:

- $J_{load}$ is the load inertia on the output shaft
- $N$ is the gear ratio
- $J_{reflected}$ is the equivalent inertia seen at the motor shaft

This $N^2$ relationship is crucial for motor sizing: a gear reduction makes the load appear lighter to the motor.

!!! tip "Gear Ratio Selection"
    Gear ratios involve tradeoffs. Higher ratios reduce the effective load inertia and increase torque but also reduce output speed and can introduce backlash and compliance. In robotics, matching the gear ratio to optimize for acceleration capability or force sensitivity is an important design decision.

### Lever System

**Lever systems** are rotational mechanical advantage devices, fundamental to tools and machines. Like gears, they transform force and displacement.

For a lever with fulcrum position creating arms of length $a$ (input side) and $b$ (output side):

#### Lever Mechanical Advantage

$MA = \frac{F_{out}}{F_{in}} = \frac{a}{b}$

And displacement relationship:

$\frac{x_{out}}{x_{in}} = \frac{b}{a}$

The product of force and displacement is conserved (work in = work out for ideal levers):

$F_{in} \cdot x_{in} = F_{out} \cdot x_{out}$

Levers are first-class (fulcrum between effort and load), second-class (load between fulcrum and effort), or third-class (effort between fulcrum and load), each suited to different applications.

## Electromechanical Systems

**Electromechanical systems** bridge the electrical and mechanical domains. They convert electrical energy to mechanical energy (motors) or mechanical energy to electrical energy (generators). For control systems, the **DC motor** is the most important electromechanical device to model.

### DC Motor

The **DC motor** converts electrical current into rotational mechanical power through electromagnetic interaction. It's the actuator of choice in countless control applications: robotics, disk drives, automotive systems, and—you guessed it—Gyra's wheels.

A DC motor has two main circuits:

- **Armature circuit**: the rotating winding that carries current and produces torque
- **Field circuit**: provides the magnetic field (can be permanent magnets or electromagnets)

The key relationships governing DC motor behavior:

#### Motor Torque Equation

$\tau = K_t i_a$

where:

- $\tau$ is the motor torque
- $K_t$ is the torque constant (N·m/A)
- $i_a$ is the armature current

#### Back-EMF Equation

$e_b = K_e \omega$

where:

- $e_b$ is the back-EMF (electromotive force)
- $K_e$ is the back-EMF constant (V·s/rad)
- $\omega$ is the angular velocity

For an ideal motor, $K_t = K_e$ when expressed in consistent units.

The back-EMF is a crucial feedback mechanism: as the motor spins faster, it generates a voltage that opposes the applied voltage, naturally limiting speed.

### Armature-Controlled DC Motor

The **armature-controlled DC motor** is the most common configuration. The field is held constant (often using permanent magnets), and speed/torque are controlled by varying the armature voltage.

The armature circuit equation:

$v_a = L_a\frac{di_a}{dt} + R_ai_a + e_b = L_a\frac{di_a}{dt} + R_ai_a + K_e\omega$

The mechanical equation:

$J\frac{d\omega}{dt} + B\omega = \tau - \tau_L = K_ti_a - \tau_L$

where:

- $v_a$ is the armature voltage (input)
- $L_a$ and $R_a$ are armature inductance and resistance
- $J$ is the total inertia (motor + load)
- $B$ is the viscous friction coefficient
- $\tau_L$ is the load torque

Taking Laplace transforms and eliminating $I_a(s)$:

#### Armature-Controlled DC Motor Transfer Function

$G(s) = \frac{\Omega(s)}{V_a(s)} = \frac{K_t}{(L_as + R_a)(Js + B) + K_tK_e}$

For most DC motors, the electrical time constant ($L_a/R_a$) is much smaller than the mechanical time constant ($J/B$), so we often neglect armature inductance:

#### Simplified Motor Transfer Function

$G(s) = \frac{K_t/R_a}{Js + B + K_tK_e/R_a} = \frac{K_m}{\tau_m s + 1}$

where:

- $K_m = \frac{K_t}{R_aB + K_tK_e}$ is the motor gain constant
- $\tau_m = \frac{JR_a}{R_aB + K_tK_e}$ is the motor time constant

This simplified model is a first-order system—voltage in, speed out—which is remarkably tractable for control design.

### Field-Controlled DC Motor

The **field-controlled DC motor** varies the field current while keeping armature current constant. This configuration is less common but appears in some applications.

With constant armature current $i_a$ and variable field current $i_f$:

$\tau = K'_t i_f i_a = K_f i_f$ (where $K_f = K'_t i_a$)

The field circuit equation:

$v_f = L_f\frac{di_f}{dt} + R_fi_f$

The mechanical equation:

$J\frac{d\omega}{dt} + B\omega = K_f i_f$

#### Field-Controlled Motor Transfer Function

$G(s) = \frac{\Omega(s)}{V_f(s)} = \frac{K_f}{(L_fs + R_f)(Js + B)}$

This is a second-order system—the field and mechanical dynamics each contribute a pole. The response is generally slower than armature control because of the field circuit's larger inductance.

### Motor Transfer Function Summary

Both motor types can be expressed as transfer functions relating input voltage to output speed or position:

| Motor Type | Speed Transfer Function | Order |
|------------|------------------------|-------|
| Armature-controlled (full) | $\frac{K_t}{(L_as + R_a)(Js + B) + K_tK_e}$ | Second |
| Armature-controlled (simplified) | $\frac{K_m}{\tau_m s + 1}$ | First |
| Field-controlled | $\frac{K_f}{(L_fs + R_f)(Js + B)}$ | Second |

For position control, integrate the speed transfer function (multiply by $1/s$):

$G_\theta(s) = \frac{\Theta(s)}{V(s)} = \frac{G_\omega(s)}{s}$

#### Diagram: DC Motor Model Visualization

<iframe src="../../sims/dc-motor-model/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>DC Motor Model Visualization</summary>
Type: microsim

Bloom Taxonomy: Analyze (L4)
Bloom Verb: differentiate, examine

Learning Objective: Students will analyze the interaction between electrical and mechanical dynamics in a DC motor, observing how changes in motor parameters affect both circuits and the resulting motion.

Canvas layout:
- Top left (40%): Electrical circuit schematic with live values
- Top right (40%): Mechanical diagram with rotating load
- Bottom (full width): Time response plots

Visual elements:
Electrical Schematic:
- Armature circuit with R_a, L_a, voltage source
- Back-EMF source (proportional to speed)
- Current flow indicators
- Live voltage and current displays

Mechanical Diagram:
- Motor rotor symbol
- Rotating shaft with angle indicator
- Connected inertia (disk)
- Damper symbol
- Angular velocity display

Response Plots:
- Armature current i_a(t)
- Angular velocity ω(t)
- Applied voltage v_a(t)
- Torque τ(t)

Interactive controls:
- Slider: Armature voltage V_a (0 to 24 V)
- Slider: Load inertia J (0.001 to 0.1 kg·m²)
- Slider: Armature resistance R_a (0.5 to 5 Ω)
- Slider: Torque constant K_t (0.01 to 0.1 N·m/A)
- Toggle: Include/neglect inductance L_a
- Button: Apply step voltage
- Button: Apply load torque step

Data Visibility Requirements:
- Display all electrical quantities: v_a, i_a, e_b
- Display all mechanical quantities: τ, ω, θ
- Show power flow: P_elec = v_a·i_a, P_mech = τ·ω
- Display calculated time constants

Behavior:
- When voltage step applied, show current surge then decay
- Show speed building up with electrical and mechanical dynamics
- Back-EMF grows as speed increases, limiting current
- Steady-state reached when torque equals friction load
- Rotor animation synchronized with calculated velocity

Instructional Rationale: Parallel visualization of electrical and mechanical domains shows the bidirectional coupling through K_t (current→torque) and K_e (speed→back-EMF). Students see that the motor is not just an electrical or mechanical system—it's fundamentally both.

Implementation: p5.js with coupled differential equation solver and synchronized animations
</details>

!!! quote "Gyra Moment"
    "My motors are armature-controlled DC motors. When my controller commands a voltage, current surges through the armature, creating torque. As I start spinning, back-EMF builds up and opposes the current—nature's built-in speed limiter. My engineers modeled this carefully: the torque constant tells them how much push I get per amp, and the back-EMF constant tells them how fast I resist acceleration. These two numbers, along with my inertia and friction, define who I am as a dynamic system."

## Fluid and Thermal Systems

While electrical, mechanical, and electromechanical systems are the primary focus of this course, two other domains appear frequently in industrial control: **fluid systems** and **thermal systems**. Understanding their models reinforces the analogous systems concept.

### Fluid Systems

**Fluid systems** involve the flow of liquids or gases through pipes, tanks, and valves. The relevant variables are pressure (analogous to voltage), flow rate (analogous to current), and fluid volume or mass.

For an incompressible liquid tank with cross-sectional area $A$ and outlet resistance $R$:

#### Tank Level Dynamics

$A\frac{dh}{dt} = q_{in} - q_{out} = q_{in} - \frac{h}{R}$

where:

- $h$ is the liquid height
- $q_{in}$ is the inlet flow rate
- $q_{out} = h/R$ assumes laminar flow through the outlet
- $R$ is the fluid resistance

This gives a first-order transfer function relating inlet flow to level:

$G(s) = \frac{H(s)}{Q_{in}(s)} = \frac{R}{ARs + 1} = \frac{R}{\tau s + 1}$

where $\tau = AR$ is the tank time constant.

Key fluid system elements:

| Element | Analogous To | Relationship |
|---------|-------------|--------------|
| Fluid resistance | Electrical resistance | $\Delta P = Rq$ (pressure drop) |
| Tank capacitance | Electrical capacitance | $C = A$ (storage capacity) |
| Fluid inertance | Electrical inductance | $\Delta P = I(dq/dt)$ (momentum) |

### Thermal Systems

**Thermal systems** involve heat flow and temperature. The relevant variables are temperature (analogous to voltage), heat flow rate (analogous to current), and thermal energy stored.

For a body with thermal capacitance $C_{th}$ and thermal resistance $R_{th}$ to the environment at temperature $T_{amb}$:

#### Thermal Dynamics

$C_{th}\frac{dT}{dt} = q_{in} - \frac{T - T_{amb}}{R_{th}}$

where:

- $T$ is the body temperature
- $q_{in}$ is the heat input rate
- $R_{th}$ is the thermal resistance to ambient
- $C_{th}$ is the thermal capacitance (mass × specific heat)

The transfer function from heat input to temperature rise above ambient:

$G(s) = \frac{T(s) - T_{amb}}{Q_{in}(s)} = \frac{R_{th}}{R_{th}C_{th}s + 1} = \frac{R_{th}}{\tau_{th}s + 1}$

Thermal systems are typically first-order with large time constants (minutes to hours for building heating, seconds for electronics cooling).

| Thermal Element | Analogous To | Relationship |
|-----------------|-------------|--------------|
| Thermal resistance | Electrical resistance | $\Delta T = R_{th}q$ |
| Thermal capacitance | Electrical capacitance | $C_{th} = mc_p$ |
| Temperature | Voltage | Driving potential |
| Heat flow | Current | Flow quantity |

## Analogous Systems

One of the most powerful insights in engineering is that seemingly different physical systems often obey the same mathematical equations. A circuit, a mechanical system, a fluid tank, and a heating system can all be described by the same transfer function. This concept of **analogous systems** allows engineers to transfer intuition and analysis techniques across domains.

The analogies arise because all linear physical systems are governed by conservation laws (energy, momentum, mass) and constitutive relations (component behaviors). The mathematics doesn't care whether the energy is stored in a capacitor or a spring, or whether the "flow" is electrical current or fluid volume rate.

There are two main analogy conventions for relating electrical and mechanical systems:

### Force-Voltage Analogy (Impedance Analogy)

The **force-voltage analogy** (also called the **impedance analogy**) maps:

| Mechanical | Electrical |
|------------|------------|
| Force $F$ | Voltage $v$ |
| Velocity $v$ | Current $i$ |
| Displacement $x$ | Charge $q$ |
| Mass $m$ | Inductance $L$ |
| Damping $b$ | Resistance $R$ |
| Stiffness $k$ | 1/Capacitance $1/C$ |

The name "impedance analogy" comes from the fact that mechanical impedance $Z_m = F/v$ maps to electrical impedance $Z_e = V/I$.

Under this analogy:

- A **mass** (stores kinetic energy, $E = \frac{1}{2}mv^2$) is analogous to an **inductor** (stores magnetic energy, $E = \frac{1}{2}Li^2$)
- A **spring** (stores potential energy, $E = \frac{1}{2}kx^2$) is analogous to a **capacitor** (stores electric energy, $E = \frac{1}{2}Cv^2$)
- A **damper** (dissipates energy, $P = bv^2$) is analogous to a **resistor** (dissipates energy, $P = Ri^2$)

!!! note "Why Force Maps to Voltage"
    In this analogy, elements in series in the mechanical domain (experiencing the same force) correspond to elements in series in the electrical domain (experiencing the same voltage). This makes circuit topology match mechanical topology.

### Force-Current Analogy (Mobility Analogy)

The **force-current analogy** (also called the **mobility analogy**) provides an alternative mapping:

| Mechanical | Electrical |
|------------|------------|
| Force $F$ | Current $i$ |
| Velocity $v$ | Voltage $v$ |
| Displacement $x$ | Flux linkage $\lambda$ |
| Mass $m$ | Capacitance $C$ |
| Damping $b$ | 1/Resistance $1/R$ |
| Stiffness $k$ | 1/Inductance $1/L$ |

Under this analogy:

- A **mass** is analogous to a **capacitor** (both store energy proportional to the square of the "across" variable: velocity or voltage)
- A **spring** is analogous to an **inductor** (both store energy proportional to the square of the "through" variable: force or current)
- A **damper** is analogous to a **conductance** (reciprocal of resistance)

!!! tip "Which Analogy to Use?"
    Both analogies are valid and lead to correct transfer functions. The force-voltage analogy is more common in textbooks because it preserves series/parallel relationships. The force-current analogy is sometimes preferred in computer simulation because node voltages correspond to velocities, which are the natural state variables.

#### Diagram: Analogous Systems Comparison

<iframe src="../../sims/analogous-systems-compare/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Analogous Systems Comparison</summary>
Type: microsim

Bloom Taxonomy: Analyze (L4)
Bloom Verb: compare, contrast

Learning Objective: Students will compare the behavior of mechanical and electrical systems, observing that analogous systems with matched parameters produce identical transfer functions and responses.

Canvas layout:
- Top left: Mechanical system (mass-spring-damper) animation and schematic
- Top right: Electrical system (RLC circuit) animation and schematic
- Bottom: Shared response plot with both outputs overlaid

Visual elements:
Mechanical System:
- Mass-spring-damper schematic
- Animation of mass position
- Parameter values: m, b, k
- Applied force input indicator

Electrical System:
- RLC circuit schematic
- Animation showing capacitor voltage as moving bar
- Parameter values: L, R, C
- Applied voltage input indicator

Shared Response Plot:
- Time axis
- Mechanical response (displacement x or velocity v)
- Electrical response (voltage or current)
- Both curves overlaid showing identical dynamics
- Legend distinguishing curves

Parameter Mapping Panel:
- Shows which analogy is active
- Displays the mapping: m↔L, b↔R, k↔1/C (force-voltage)
- Calculated ω_n and ζ for both systems

Interactive controls:
- Radio buttons: Select analogy (Force-Voltage or Force-Current)
- Slider: Natural frequency ω_n (shared for both systems)
- Slider: Damping ratio ζ (shared for both systems)
- Button: Apply step input to both
- Button: Apply impulse to both
- Toggle: Show/hide individual responses

Data Visibility Requirements:
- Display transfer functions for both systems
- Show that they are identical in form
- Display calculated component values based on ω_n and ζ
- Show analogy mapping table

Behavior:
- Both systems animate simultaneously with step/impulse input
- Response curves overlay exactly when analogy is correct
- Changing ω_n or ζ updates both systems proportionally
- Switching analogy changes the mapping but maintains identical response

Instructional Rationale: Side-by-side visualization with overlaid responses proves that different physical systems can be mathematically identical. The shared sliders for ω_n and ζ emphasize that these are the fundamental parameters—not the specific physical values.

Implementation: p5.js with dual physics simulations and synchronized response plotting
</details>

### Practical Value of Analogies

The analogous systems concept isn't just academic elegance—it has real practical value:

1. **Transfer of intuition**: If you understand how an RLC circuit behaves, you understand mass-spring-dampers, tank level systems, and thermal dynamics.

2. **Cross-domain modeling**: Complex systems often span multiple domains. A motor-driven mechanical system involves electrical dynamics (armature circuit) coupled to mechanical dynamics (rotor and load). Analogies help create unified models.

3. **Simulation**: Electrical circuit simulators (like SPICE) can model mechanical, thermal, and fluid systems by creating analogous electrical circuits. This was common before multi-domain simulators became widely available.

4. **Physical insight**: Sometimes a behavior is more intuitive in one domain. The "resonance" of an RLC circuit might be easier to visualize than the corresponding mechanical oscillation, or vice versa.

| System Type | Energy Storage 1 | Energy Storage 2 | Energy Dissipation |
|-------------|-----------------|------------------|-------------------|
| Electrical | Inductor ($L$) | Capacitor ($C$) | Resistor ($R$) |
| Mech. Trans. | Mass ($m$) | Spring ($1/k$) | Damper ($b$) |
| Mech. Rot. | Inertia ($J$) | Torsion spring ($1/K$) | Rot. damper ($B$) |
| Fluid | Inertance | Tank ($A$) | Resistance ($R_f$) |
| Thermal | — | Capacitance ($C_{th}$) | Resistance ($R_{th}$) |

## Systematic Modeling Procedure

Whether modeling electrical, mechanical, or electromechanical systems, a systematic approach prevents errors and builds understanding. Here's a recommended procedure:

**Step 1: Identify the System Boundary**
Determine what's inside your model (the "plant") and what's outside (inputs, disturbances, loads).

**Step 2: Choose Variables**
Select the minimum set of independent variables needed to describe the system state. These are typically "across" variables (voltage, velocity, temperature) at nodes and "through" variables (current, force, heat flow) in branches.

**Step 3: Apply Conservation Laws**
- Electrical: Kirchhoff's voltage law (KVL) and current law (KCL)
- Mechanical: Newton's laws (force/torque balance)
- Thermal/Fluid: Energy/mass conservation

**Step 4: Apply Constitutive Relations**
Relate the through and across variables for each component (Ohm's law, spring law, etc.).

**Step 5: Combine and Simplify**
Eliminate intermediate variables to get equations in terms of input(s) and output(s) only.

**Step 6: Take Laplace Transform**
Convert differential equations to algebraic equations in $s$.

**Step 7: Solve for Transfer Function**
Express $G(s) = Output(s)/Input(s)$.

**Step 8: Verify**
Check units, limiting cases (DC, high frequency), and physical reasonableness. Does the model behave as expected?

!!! example "Example: Modeling a Motor-Driven Mass"
    Consider a DC motor (armature-controlled) connected through gears to a translational mass. The input is armature voltage $v_a$; the output is mass position $x$.

    **Components:**
    - Motor: $R_a$, $L_a$, $K_t$, $K_e$, rotor inertia $J_m$, rotor damping $B_m$
    - Gears: ratio $N$ (motor turns per output revolution)
    - Mass: $m$, damping $b$, plus rack-and-pinion with radius $r$

    **Analysis approach:**
    1. Model motor electrically and mechanically
    2. Reflect load to motor shaft through gears
    3. Convert rotational motion to translation via rack-and-pinion
    4. Combine into single transfer function $X(s)/V_a(s)$

    The result is a third-order system (electrical + two mechanical integrations), though often simplified by neglecting armature inductance.

## Key Takeaways

This chapter developed the essential skill of physical system modeling—translating real-world systems into mathematical descriptions suitable for control analysis and design.

**Electrical Systems:**
- RC, RL circuits are first-order systems with time constants $\tau = RC$ or $\tau = L/R$
- RLC circuits are second-order with natural frequency $\omega_n = 1/\sqrt{LC}$ and damping ratio $\zeta = (R/2)\sqrt{C/L}$
- Op-amp circuits enable active operations: gain, integration, differentiation

**Mechanical Systems:**
- Translational and rotational systems share parallel structures
- Mass-spring-damper is the canonical second-order mechanical system
- Gear trains transform speed and torque with ratio $N$; inertia reflects by $N^2$
- Nonlinear systems (like pendulums) can be linearized for small deviations

**Electromechanical Systems:**
- DC motors couple electrical and mechanical dynamics
- Armature-controlled motors relate voltage to speed via coupled first/second-order dynamics
- Torque constant $K_t$ and back-EMF constant $K_e$ characterize the coupling

**Analogous Systems:**
- Different physical domains obey similar mathematical structures
- Force-voltage and force-current analogies relate mechanical to electrical systems
- Analogies enable transfer of insight across disciplines

The transfer functions derived in this chapter are the starting point for the stability analysis, frequency response methods, and controller design techniques covered in subsequent chapters. A good model is the foundation of good control.

??? question "Self-Check: Test Your Understanding"
    Before moving on, verify you can answer these:

    1. An RC circuit has R = 10 kΩ and C = 0.1 μF. What is the time constant? What is the pole location?

    2. A mass-spring-damper has m = 2 kg, k = 50 N/m, b = 4 N·s/m. Calculate ω_n and ζ. Is it underdamped, critically damped, or overdamped?

    3. A motor has K_t = 0.05 N·m/A and K_e = 0.05 V·s/rad. If the motor runs at 100 rad/s, what back-EMF is generated?

    4. In the force-voltage analogy, what electrical component is analogous to a mechanical spring?

    5. Why do we often neglect armature inductance when modeling DC motors?

    If you can answer all five, you're ready to analyze stability and design controllers in the chapters ahead!
