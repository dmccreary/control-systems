---
title: Nyquist Analysis and Stability Margins
description: Using frequency-domain plots to determine closed-loop stability and quantify robustness through gain and phase margins
generated_by: claude skill chapter-content-generator
date: 2026-01-31
version: 0.03
---

# Nyquist Analysis and Stability Margins

## Summary

This chapter extends frequency-domain analysis to stability determination. Students will learn to construct Nyquist diagrams (polar plots of loop transfer functions) and apply the Nyquist stability criterion based on encirclements of the critical point. Gain margin and phase margin are developed as quantitative measures of how far a system is from instability, providing crucial robustness information. The chapter also covers minimum-phase and non-minimum-phase systems, right-half-plane poles and zeros, and conditionally stable systems. These concepts connect frequency response directly to closed-loop stability.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

1. Gain Margin
2. Phase Margin
3. Stability Margins
4. Crossover Frequency
5. Gain Crossover
6. Phase Crossover
7. Minimum Phase System
8. Non-Minimum Phase
9. All-Pass System
10. Nyquist Plot
11. Nyquist Diagram
12. Nyquist Criterion
13. Nyquist Contour
14. Encirclement
15. Clockwise Encirclement
16. Right-Half Plane Poles
17. Right-Half Plane Zeros
18. Conditionally Stable
19. Gain Margin from Nyquist
20. Phase Margin from Nyquist

## Prerequisites

This chapter builds on concepts from:

- [Chapter 6: Poles, Zeros, and System Analysis](../06-poles-zeros-system-analysis/index.md)
- [Chapter 10: Stability Analysis and Routh-Hurwitz](../10-stability-routh-hurwitz/index.md)
- [Chapter 11: Root Locus Analysis and Design](../11-root-locus-analysis-design/index.md)
- [Chapter 12: Frequency Response and Bode Plots](../12-frequency-response-bode-plots/index.md)

---

## From Bode to Stability: The Missing Link

In Chapter 12, you learned to construct Bode plots—magnitude and phase versus frequency on logarithmic scales. These plots beautifully characterize how a system responds to sinusoidal inputs. But here's what Bode plots don't directly tell you: **Is the closed-loop system stable?**

The Routh-Hurwitz criterion (Chapter 10) answers stability questions algebraically. The root locus (Chapter 11) answers them graphically by tracking pole movement. Now we'll develop a third approach: determining stability directly from the frequency response. This isn't just an alternative method—it's often the most practical one, because frequency response can be **measured experimentally** without knowing the transfer function.

The key insight comes from Harry Nyquist, who in 1932 published a remarkable theorem connecting the frequency response of an open-loop system to the stability of the closed-loop system. His criterion uses complex analysis—specifically, the principle of argument from complex variable theory—to count poles in the right half-plane by examining how a contour maps through the transfer function.

Along the way, we'll develop **gain margin** and **phase margin**—the workhorses of practical control design. These stability margins tell you not just whether a system is stable, but how robust that stability is. A system with large margins can tolerate modeling errors, parameter variations, and disturbances. A system with small margins is fragile, hovering near the edge of instability.

!!! quote "Gyra Moment"
    "My engineers measure my phase margin every time they tune my controller. It's not enough that I stay upright—they want to know how close I am to wobbling out of control. A 45° phase margin means I have headroom. A 10° phase margin means I'm one disturbance away from oscillating. The Nyquist plot shows them exactly where that danger lies."

## Stability Margins: How Close to the Edge?

Before diving into Nyquist theory, let's understand what we're trying to quantify. Consider a feedback system that's currently stable. How would it become unstable?

Two ways:

1. **Increase the gain** until oscillations grow unbounded
2. **Add phase lag** until the feedback becomes positive at a critical frequency

The **gain margin** measures how much gain increase the system can tolerate. The **phase margin** measures how much additional phase lag is acceptable. Together, these **stability margins** quantify robustness.

### The Critical Point

For a standard negative feedback system with loop transfer function $L(s) = G(s)H(s)$, the closed-loop characteristic equation is:

#### Characteristic Equation

$1 + L(s) = 0$

or equivalently:

$L(s) = -1$

The point $-1 + j0$ in the complex plane is called the **critical point**. If the loop transfer function ever equals $-1$ at some real frequency, the closed-loop system is on the verge of instability—it will oscillate at that frequency with constant amplitude.

Why $-1$? Consider what happens at a frequency $\omega$ where $|L(j\omega)| = 1$ and $\angle L(j\omega) = -180°$:

- The magnitude is unity, so signals neither grow nor decay
- The phase is -180°, so the negative feedback becomes positive feedback
- The result: sustained oscillation

This is the **Barkhausen criterion** for oscillation, familiar from electronics. Our goal is to ensure the system stays away from this critical point.

| Condition | What It Means |
|-----------|---------------|
| $L(j\omega) = -1$ | On the edge of instability |
| $\|L(j\omega)\| < 1$ when $\angle L = -180°$ | Gain margin exists |
| $\angle L(j\omega) > -180°$ when $\|L\| = 1$ | Phase margin exists |

## Gain Margin

The **gain margin** (GM) is the factor by which the loop gain can be increased before the system becomes unstable. It's measured at the **phase crossover frequency**—the frequency where the phase equals -180°.

#### Gain Margin Definition

$GM = \frac{1}{|L(j\omega_{pc})|}$

where:

- $\omega_{pc}$ is the phase crossover frequency
- $|L(j\omega_{pc})|$ is the magnitude at that frequency

In decibels:

$GM_{dB} = -20\log_{10}|L(j\omega_{pc})| = -|L(j\omega_{pc})|_{dB}$

If the magnitude at phase crossover is -12 dB, the gain margin is +12 dB—you can increase the gain by a factor of 4 before instability.

### Phase Crossover Frequency

The **phase crossover frequency** $\omega_{pc}$ is where the loop transfer function has a phase of exactly -180°:

#### Phase Crossover

$\angle L(j\omega_{pc}) = -180°$

At this frequency, the feedback signal is exactly inverted—negative feedback has become positive feedback. If the gain is less than unity here, the system is stable because signals still decay around the loop.

On a Bode plot, find where the phase curve crosses -180°. Read the magnitude at that frequency. The gain margin is the distance (in dB) from that magnitude to 0 dB.

| Magnitude at $\omega_{pc}$ | Gain Margin | Stability |
|---------------------------|-------------|-----------|
| -20 dB | +20 dB | Stable with good margin |
| -6 dB | +6 dB | Stable with moderate margin |
| 0 dB | 0 dB | Marginally stable |
| +6 dB | -6 dB | Unstable |

A negative gain margin means the system is already unstable—you'd need to reduce gain to stabilize it.

## Phase Margin

The **phase margin** (PM) is the additional phase lag that would bring the system to instability. It's measured at the **gain crossover frequency**—the frequency where the magnitude equals unity (0 dB).

#### Phase Margin Definition

$PM = 180° + \angle L(j\omega_{gc})$

where:

- $\omega_{gc}$ is the gain crossover frequency
- $\angle L(j\omega_{gc})$ is the phase at that frequency

If the phase at gain crossover is -135°, the phase margin is $180° - 135° = 45°$. The system could tolerate an additional 45° of phase lag before becoming unstable.

### Gain Crossover Frequency

The **gain crossover frequency** $\omega_{gc}$ is where the loop transfer function has unity magnitude:

#### Gain Crossover

$|L(j\omega_{gc})| = 1$ (or 0 dB)

This is the most important frequency for closed-loop behavior. At frequencies well below $\omega_{gc}$, the loop gain is high and the closed-loop system tracks commands well. At frequencies well above $\omega_{gc}$, the loop gain is low and the system attenuates disturbances. Near $\omega_{gc}$, the transition occurs—and if there's not enough phase margin, oscillations result.

On a Bode plot, find where the magnitude curve crosses 0 dB. Read the phase at that frequency. The phase margin is how far that phase is above -180°.

| Phase at $\omega_{gc}$ | Phase Margin | Character |
|-----------------------|--------------|-----------|
| -90° | 90° | Very stable, possibly slow |
| -135° | 45° | Good balance of speed and stability |
| -150° | 30° | Marginally acceptable |
| -180° | 0° | Marginally stable (oscillatory) |
| -200° | -20° | Unstable |

A negative phase margin means the system is already unstable.

#### Diagram: Gain and Phase Margin on Bode Plots

<iframe src="../../sims/stability-margins-bode/main.html" width="100%" height="650px" scrolling="no"></iframe>

<details markdown="1">
<summary>Gain and Phase Margin on Bode Plots</summary>
Type: microsim

Bloom Taxonomy: Understand (L2)
Bloom Verb: interpret, explain

Learning Objective: Students will interpret Bode plots to identify gain crossover frequency, phase crossover frequency, gain margin, and phase margin.

Canvas layout:
- Top (45%): Bode magnitude plot
- Middle (45%): Bode phase plot
- Bottom (10%): Margin display and controls

Visual elements:
Magnitude Plot:
- Loop transfer function magnitude curve
- 0 dB line emphasized
- Gain crossover point marked with vertical line
- Gain margin shown as vertical arrow from magnitude curve to 0 dB at ωpc
- Frequency axis logarithmic

Phase Plot:
- Loop transfer function phase curve
- -180° line emphasized
- Phase crossover point marked with vertical line
- Phase margin shown as vertical arrow from -180° to phase curve at ωgc
- Shaded region between phase curve and -180° (phase margin region)

Margin Display:
- Gain crossover frequency ωgc = [value] rad/s
- Phase crossover frequency ωpc = [value] rad/s
- Gain margin = [value] dB
- Phase margin = [value]°
- Stability indicator: STABLE / UNSTABLE

Interactive controls:
- Slider: Overall gain K (affects vertical position of magnitude)
- Slider: Dominant time constant (shifts curves horizontally)
- Dropdown: System presets (type 0, type 1, type 2, lead-lag)
- Toggle: Show margin annotations
- Toggle: Show crossover lines

Data Visibility Requirements:
- Stage 1: Show Bode plots
- Stage 2: Mark gain crossover (0 dB crossing)
- Stage 3: Mark phase crossover (-180° crossing)
- Stage 4: Display gain margin as distance
- Stage 5: Display phase margin as distance

Behavior:
- As gain K increases, magnitude shifts up, reducing margins
- When margins go negative, indicator turns red
- Margin arrows update in real-time
- Preset systems show different stability characteristics
- Changing time constant shifts curves and changes crossover frequencies

Instructional Rationale: Visualizing margins as physical distances on familiar Bode plots makes the concepts tangible. Interactive gain adjustment shows how margins change and connects to design decisions.

Implementation: p5.js with dual Bode plots and interactive annotations
</details>

## Design Guidelines for Stability Margins

How much margin is enough? The answer depends on how uncertain your model is and how much variation you expect in operation. General guidelines:

| Application | Gain Margin | Phase Margin |
|-------------|-------------|--------------|
| Minimum acceptable | 6 dB | 30° |
| Typical design target | 10-12 dB | 45-60° |
| Conservative/robust | >12 dB | >60° |
| Very high precision | May accept less if model is accurate | 30-45° |

There's a rough relationship between phase margin and closed-loop damping ratio:

#### Phase Margin to Damping Ratio

$\zeta \approx \frac{PM}{100}$ (for PM in degrees, 30° < PM < 70°)

A 45° phase margin corresponds to roughly $\zeta \approx 0.45$, which gives about 20% overshoot. A 60° phase margin gives $\zeta \approx 0.6$ and about 10% overshoot.

!!! tip "The 45° Rule of Thumb"
    For most control systems, aim for 45° phase margin as a starting point. This provides good balance between response speed and stability robustness. Increase margin if the plant model is uncertain; you may accept less margin if the model is very accurate and speed is critical.

## The Crossover Frequency and Bandwidth

The **crossover frequency** $\omega_{gc}$ (gain crossover) is closely related to the closed-loop bandwidth. For many systems:

#### Crossover and Bandwidth Relationship

$\omega_{BW} \approx \omega_{gc}$ (within a factor of 2)

This makes the gain crossover frequency a key design parameter. Want faster response? Push $\omega_{gc}$ higher. But as you increase crossover frequency:

- Phase margin typically decreases (more phase lag accumulates)
- Noise sensitivity increases (high-frequency gain is higher)
- Plant dynamics become more limiting

The crossover frequency represents the frequency range where your controller is actively regulating the system. Below $\omega_{gc}$, you have good command following and disturbance rejection. Above $\omega_{gc}$, the loop gain drops and control authority diminishes.

## Introduction to Nyquist Plots

The **Nyquist plot** (also called **Nyquist diagram**) is a polar plot of the loop transfer function $L(j\omega)$ as frequency varies from $-\infty$ to $+\infty$. Unlike Bode plots, which show magnitude and phase separately on logarithmic frequency scales, the Nyquist plot displays the complex value of $L(j\omega)$ directly in the complex plane.

#### Nyquist Plot Construction

$L(j\omega) = |L(j\omega)| e^{j\angle L(j\omega)}$

where:

- The magnitude $|L(j\omega)|$ determines the distance from the origin
- The phase $\angle L(j\omega)$ determines the angle from the positive real axis

For each frequency $\omega$, plot the point $(Re[L(j\omega)], Im[L(j\omega)])$. As $\omega$ increases from 0 to $\infty$, these points trace out a curve. The complete Nyquist plot includes both positive and negative frequencies, with the negative frequency portion being the mirror image (complex conjugate) of the positive portion.

Key features of Nyquist plots:

- **DC point** ($\omega = 0$): Often on the positive real axis (for type 0 systems) or at infinity (for systems with integrators)
- **High-frequency asymptote** ($\omega \to \infty$): Approaches the origin for proper transfer functions
- **Critical point**: The point $-1 + j0$ is where stability is determined
- **Symmetry**: The curve for negative frequencies is the reflection about the real axis

| Frequency | Typical Location |
|-----------|------------------|
| $\omega = 0$ | Right side of plot (positive real, often) |
| Low $\omega$ | Large magnitude, small negative phase |
| $\omega = \omega_{gc}$ | On unit circle |
| High $\omega$ | Near origin |
| $\omega \to \infty$ | At origin |

#### Diagram: Nyquist Plot Introduction

<iframe src="../../sims/nyquist-intro/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Nyquist Plot Introduction</summary>
Type: microsim

Bloom Taxonomy: Understand (L2)
Bloom Verb: explain, interpret

Learning Objective: Students will explain how Nyquist plots represent the loop transfer function in the complex plane and identify key features including the critical point.

Canvas layout:
- Left (60%): Nyquist plot (complex plane)
- Right (40%): Bode-style magnitude/phase for comparison

Visual elements:
Nyquist Plot:
- Complex plane with real and imaginary axes
- Unit circle (dashed)
- Critical point (-1, 0) marked prominently
- Nyquist curve for positive frequencies
- Nyquist curve for negative frequencies (dashed or lighter)
- Direction arrows showing increasing frequency
- Current frequency point highlighted
- Frequency labels at key points

Bode Comparison:
- Small magnitude and phase plots
- Current frequency marked on both
- Correspondence between Bode values and Nyquist point

Interactive controls:
- Slider: Frequency ω (logarithmic, 0.01 to 100 rad/s)
- Dropdown: System presets (simple lag, lead-lag, with integrator)
- Toggle: Show negative frequency portion
- Toggle: Show unit circle
- Toggle: Show frequency labels
- Button: Animate frequency sweep

Data Visibility Requirements:
- Show current frequency ω
- Display magnitude |L(jω)| and phase ∠L(jω)
- Display real and imaginary parts
- Show distance to critical point
- Indicate if inside/outside unit circle

Behavior:
- As frequency slider moves, point traces along curve
- Arrow indicates direction of increasing frequency
- Bode plots highlight corresponding frequency
- Animation sweeps through full frequency range
- Different presets show different curve shapes

Instructional Rationale: Side-by-side comparison with Bode plots builds connection between familiar representation and new Nyquist format. Interactive frequency slider reveals how each frequency maps to a point on the curve.

Implementation: p5.js with complex plane plotting and linked Bode display
</details>

## Reading Margins from the Nyquist Plot

The Nyquist plot provides an elegant geometric view of stability margins:

### Gain Margin from Nyquist

The **gain margin from Nyquist** is the reciprocal of the distance from the origin to where the Nyquist curve crosses the negative real axis.

When the Nyquist curve crosses the negative real axis, the phase is exactly -180° (or -540°, etc.). At that crossing, if the curve is inside the unit circle (distance from origin < 1), the system is stable. The gain margin is:

#### Gain Margin from Nyquist Plot

$GM = \frac{1}{|L(j\omega_{pc})|}$

where:

- $\omega_{pc}$ is the frequency where the curve crosses the negative real axis
- $|L(j\omega_{pc})|$ is the distance from origin to that crossing point

If the crossing is at distance 0.25 from the origin, $GM = 4$ (or 12 dB). The gain could be quadrupled before the crossing reaches the critical point.

### Phase Margin from Nyquist

The **phase margin from Nyquist** is the angle between the negative real axis and the point where the Nyquist curve crosses the unit circle.

When the Nyquist curve crosses the unit circle, the magnitude is exactly 1 (0 dB). At that crossing:

#### Phase Margin from Nyquist Plot

$PM = 180° + \angle L(j\omega_{gc})$

Geometrically, this is the angle from the negative real axis to the crossing point, measured from the origin.

| Nyquist Feature | What It Tells You |
|-----------------|-------------------|
| Crossing of negative real axis | Phase crossover (phase = -180°) |
| Distance of that crossing from origin | Gain margin |
| Crossing of unit circle | Gain crossover (magnitude = 1) |
| Angle of that crossing from -180° | Phase margin |
| Encirclement of -1 point | Stability (Nyquist criterion) |

!!! quote "Helping Gyra"
    "On my Nyquist plot, the critical point at -1 is my danger zone. As long as my frequency response curve stays away from that point, I'm stable. The farther my curve passes from -1, the more disturbance I can handle without oscillating. My gain margin is how much my curve can stretch toward -1 before reaching it. My phase margin is how much my curve can rotate toward -1 before encircling it."

## The Nyquist Contour

To understand the Nyquist stability criterion, we need to consider what contour in the s-plane we're mapping through the transfer function.

The **Nyquist contour** (also called the Nyquist path) is a closed contour in the s-plane that encircles the entire right half-plane. It consists of:

1. The imaginary axis from $-j\infty$ to $+j\infty$
2. A semicircular arc of infinite radius in the right half-plane

This contour captures all possible RHP poles. When we evaluate $L(s)$ around this contour, we get the Nyquist plot.

#### The Standard Nyquist Contour

The contour is parameterized as:

- Imaginary axis: $s = j\omega$, $\omega$ from $-\infty$ to $+\infty$
- Infinite semicircle: $s = Re^{j\theta}$, $R \to \infty$, $\theta$ from $+90°$ to $-90°$

For proper transfer functions (more poles than zeros), the infinite semicircle maps to a single point at the origin—because $L(s) \to 0$ as $|s| \to \infty$. So the Nyquist plot is effectively just the mapping of the imaginary axis.

### Handling Poles on the Imaginary Axis

If $L(s)$ has poles on the imaginary axis (like integrators at $s = 0$), the standard contour must be modified. We indent around these poles with small semicircles into the right half-plane, ensuring the contour remains closed and excludes the imaginary axis poles.

For a system with one integrator (pole at $s = 0$):

- The small indentation around $s = 0$ maps to a large semicircular arc at infinity in the Nyquist plot
- This arc sweeps from one end of the imaginary axis mapping to the other
- The direction depends on whether we indent into the RHP (counterclockwise) or LHP

#### Diagram: Nyquist Contour and Mapping

<iframe src="../../sims/nyquist-contour/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Nyquist Contour and Mapping</summary>
Type: microsim

Bloom Taxonomy: Analyze (L4)
Bloom Verb: differentiate, examine

Learning Objective: Students will analyze how the Nyquist contour in the s-plane maps through the loop transfer function to produce the Nyquist plot.

Canvas layout:
- Left (45%): S-plane showing Nyquist contour
- Right (45%): L(s)-plane showing Nyquist plot
- Bottom (10%): Controls and annotations

Visual elements:
S-Plane:
- Complex s-plane with σ and jω axes
- Nyquist contour highlighted:
  - Imaginary axis portion (solid)
  - Infinite semicircle (dashed, conceptual)
  - Small indentations around jω-axis poles (if present)
- Poles and zeros of L(s) marked
- Current point on contour highlighted
- Direction arrows

L(s)-Plane (Nyquist Plot):
- Complex plane for L(s) values
- Nyquist curve traced out
- Critical point at -1 marked
- Unit circle shown
- Mapping of current s-plane point shown
- Direction arrows matching s-plane

Interactive controls:
- Slider: Trace along Nyquist contour
- Dropdown: System type (no integrators, 1 integrator, 2 integrators)
- Toggle: Show infinite semicircle mapping
- Toggle: Show indentation detail
- Button: Animate full contour trace

Data Visibility Requirements:
- Show current s value on contour
- Show corresponding L(s) value
- Display transfer function
- Show pole/zero locations
- Indicate which portion of contour is being mapped

Behavior:
- As slider moves, point traces s-plane contour
- Corresponding point traces Nyquist curve
- For systems with integrators, indentation creates large arc in Nyquist plot
- Infinite semicircle maps to origin for proper systems
- Animation completes full contour traversal

Instructional Rationale: Seeing the contour-to-curve mapping directly connects the abstract Nyquist contour concept to the resulting plot. The side-by-side view makes the mapping relationship concrete.

Implementation: p5.js with dual complex planes and synchronized tracing
</details>

## The Nyquist Stability Criterion

The **Nyquist criterion** is a powerful theorem connecting the Nyquist plot geometry to closed-loop stability. It's based on the principle of argument from complex analysis.

### The Principle Behind Nyquist

Consider the characteristic equation $1 + L(s) = 0$. The closed-loop poles are the values of $s$ that satisfy this equation—equivalently, the zeros of $1 + L(s)$.

Now, $1 + L(s)$ has:

- Zeros: the closed-loop poles (what we care about)
- Poles: the same as the poles of $L(s)$ (the open-loop poles)

The principle of argument states that as we traverse a closed contour in the s-plane, the net change in angle of $1 + L(s)$ equals $2\pi(Z - P)$, where $Z$ is the number of zeros and $P$ is the number of poles inside the contour.

Since our Nyquist contour encircles the entire RHP:

- $Z$ = number of closed-loop poles in RHP (zeros of $1 + L(s)$ in RHP)
- $P$ = number of open-loop poles in RHP (poles of $L(s)$ in RHP)

The number of **encirclements** of the origin by $1 + L(s)$ equals $Z - P$. But mapping $1 + L(s)$ is the same as mapping $L(s)$ and then shifting by 1. So encirclements of the origin by $1 + L(s)$ equal encirclements of $-1$ by $L(s)$.

### The Nyquist Criterion Statement

#### Nyquist Stability Criterion

$Z = N + P$

where:

- $Z$ = number of closed-loop poles in the RHP
- $N$ = number of clockwise encirclements of $-1$ by the Nyquist plot
- $P$ = number of open-loop poles in the RHP

For the closed-loop system to be stable, we need $Z = 0$ (no closed-loop poles in RHP).

**For stable open-loop systems** ($P = 0$): The closed-loop is stable if and only if the Nyquist plot does not encircle the point $-1$.

**For unstable open-loop systems** ($P > 0$): The closed-loop is stable if and only if the Nyquist plot encircles $-1$ exactly $P$ times in the **counterclockwise** direction (i.e., $N = -P$).

### Counting Encirclements

An **encirclement** of the critical point $-1$ means the Nyquist curve goes completely around that point. A **clockwise encirclement** is counted as $+1$. A **counterclockwise encirclement** is counted as $-1$.

To count encirclements:

1. Draw a line from $-1$ to infinity (typically along the negative real axis going left)
2. Count how many times the Nyquist curve crosses this line
3. Crossings where the curve goes from below to above (counterclockwise) count as $-1$
4. Crossings where the curve goes from above to below (clockwise) count as $+1$
5. Sum the crossings to get $N$

| Encirclement Count $N$ | Open-Loop Poles in RHP ($P$) | Closed-Loop Poles in RHP ($Z$) | Stability |
|------------------------|------------------------------|-------------------------------|-----------|
| 0 | 0 | 0 | Stable |
| 0 | 2 | 2 | Unstable |
| -2 (2 CCW) | 2 | 0 | Stable |
| +1 (1 CW) | 0 | 1 | Unstable |

!!! warning "Getting the Direction Right"
    The convention for "clockwise" uses the standard mathematical orientation: clockwise when viewed from above the complex plane (i.e., from positive imaginary). The complete Nyquist plot traverses in the direction of increasing frequency (positive $\omega$) for the upper half, then the reflection for negative $\omega$.

#### Diagram: Nyquist Encirclement Counter

<iframe src="../../sims/nyquist-encirclement/main.html" width="100%" height="650px" scrolling="no"></iframe>

<details markdown="1">
<summary>Nyquist Encirclement Counter</summary>
Type: microsim

Bloom Taxonomy: Apply (L3)
Bloom Verb: execute, use

Learning Objective: Students will apply the Nyquist criterion by counting encirclements of the critical point and determining closed-loop stability.

Canvas layout:
- Left (60%): Nyquist plot with encirclement visualization
- Right (40%): Criterion calculation panel

Visual elements:
Nyquist Plot:
- Complete Nyquist curve (positive and negative frequencies)
- Critical point at -1 prominently marked
- Counting ray from -1 extending left
- Crossing points marked with up/down arrows
- Shaded region if -1 is encircled
- Direction arrows on curve

Criterion Panel:
- Transfer function displayed
- Number of open-loop RHP poles: P = [value]
- Number of encirclements: N = [value]
- Calculation: Z = N + P = [value]
- Verdict: "STABLE" (green) or "UNSTABLE" (red)
- Explanation of criterion application

Crossing Counter:
- Table of crossings with directions
- Running total
- Final N value

Interactive controls:
- Dropdown: System presets (stable, unstable open-loop, conditionally stable)
- Slider: Gain K
- Toggle: Show counting ray
- Toggle: Show crossing markers
- Button: Animate criterion check
- Button: Step through crossings

Data Visibility Requirements:
- Show P (given from system)
- Count and display N
- Calculate Z = N + P
- Highlight crossings as they're counted
- Show final stability verdict

Behavior:
- As gain changes, Nyquist curve scales
- Encirclement count updates
- Stability verdict changes when N changes
- Animation traces curve and counts crossings
- Step mode explains each crossing

Instructional Rationale: Systematic counting with visual feedback ensures students correctly apply the encirclement criterion. The step-by-step mode prevents sign errors and direction confusion.

Implementation: p5.js with curve tracing and crossing detection
</details>

## Right-Half-Plane Poles and Zeros

The location of poles and zeros relative to the imaginary axis profoundly affects system behavior and the interpretation of frequency response.

### Right-Half-Plane Poles

**Right-half-plane (RHP) poles** in the open-loop transfer function indicate an unstable open-loop system. Examples include:

- Inverted pendulum plants
- Unstable aircraft
- Some chemical reactors

When $P > 0$, the Nyquist criterion requires encirclements of $-1$ to achieve closed-loop stability. This creates a **non-minimum phase** characteristic in the loop transfer function.

An RHP pole at $s = p$ (where $p > 0$) contributes phase that starts at some value and increases toward +90° as frequency increases—opposite to the phase decrease from LHP poles. This creates challenges for control design.

### Right-Half-Plane Zeros

**Right-half-plane zeros** are even more troublesome than RHP poles. An RHP zero at $s = z$ (where $z > 0$) causes:

1. **Initial inverse response**: The step response starts in the wrong direction
2. **Phase lag**: At high frequencies, RHP zeros contribute negative phase (unlike LHP zeros which contribute positive phase)
3. **Bandwidth limitation**: Crossover frequency must stay below the RHP zero frequency for adequate phase margin

#### RHP Zero Phase Contribution

$\angle(j\omega - z) = -\arctan(\omega/z)$ for RHP zero at $s = z > 0$

At low frequency, this approaches 0°. At high frequency, it approaches -90°. Compare to an LHP zero at $s = -z$, which contributes +90° at high frequency.

The phase lag from RHP zeros directly reduces phase margin. A common rule:

!!! warning "RHP Zero Bandwidth Limitation"
    For acceptable stability margins, the crossover frequency should be less than about half the RHP zero frequency:

    $\omega_{gc} < z_{RHP}/2$

    This severely limits achievable bandwidth when RHP zeros are present.

| Singularity Location | Effect on Phase | Implication |
|---------------------|-----------------|-------------|
| LHP pole | Phase decreases | Normal lag, acceptable |
| LHP zero | Phase increases | Lead compensation effect |
| RHP pole | Phase increases (in $L(s)$) | Unstable open-loop |
| RHP zero | Phase decreases | Limits bandwidth, non-minimum phase |

## Minimum Phase and Non-Minimum Phase Systems

The terms **minimum phase** and **non-minimum phase** classify systems by their pole-zero locations.

### Minimum Phase System

A **minimum phase system** has all poles and zeros in the left half-plane. For such systems:

- Phase is uniquely determined by magnitude (Bode's gain-phase relationship)
- Phase lag is the minimum possible for the given magnitude characteristic
- No inverse response to step inputs
- Relatively easy to control

The name comes from the fact that among all systems with the same magnitude response, the minimum phase system has the least phase lag.

### Non-Minimum Phase System

A **non-minimum phase system** has one or more zeros in the right half-plane. Characteristics:

- Extra phase lag beyond what magnitude alone would suggest
- Initial wrong-way response to step inputs (inverse response)
- Bandwidth limitations for stability
- More difficult to control

Common causes of non-minimum phase behavior:

- Time delays (infinite RHP zeros when approximated)
- Certain physical configurations (steam drum level, flexible spacecraft)
- Parallel paths with different dynamics

### All-Pass System

An **all-pass system** has magnitude of exactly 1 at all frequencies but has phase that varies with frequency. An all-pass transfer function has RHP zeros that mirror its LHP poles:

#### All-Pass Transfer Function

$G_{ap}(s) = \frac{s - a}{s + a}$ (first-order all-pass)

where:

- $a > 0$
- Zero at $s = +a$, pole at $s = -a$

Magnitude: $|G_{ap}(j\omega)| = 1$ for all $\omega$

Phase: $\angle G_{ap}(j\omega) = -2\arctan(\omega/a)$

All-pass elements contribute phase lag without changing magnitude. They arise naturally in some physical systems and can be used to model pure time delays approximately.

#### Diagram: Minimum vs Non-Minimum Phase Comparison

<iframe src="../../sims/phase-comparison/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Minimum vs Non-Minimum Phase Comparison</summary>
Type: microsim

Bloom Taxonomy: Analyze (L4)
Bloom Verb: compare, contrast

Learning Objective: Students will compare minimum phase and non-minimum phase systems, analyzing how RHP zeros affect phase response and step response.

Canvas layout:
- Top left (30%): Bode magnitude (both systems)
- Top right (30%): Bode phase (both systems)
- Bottom left (30%): Step response (both systems)
- Bottom right (10%): Controls and legend

Visual elements:
Bode Magnitude:
- Minimum phase system curve (blue)
- Non-minimum phase system curve (red)
- Same magnitude (curves overlap)

Bode Phase:
- Minimum phase curve (blue)
- Non-minimum phase curve (red)
- Clear separation showing extra lag
- -180° line marked

Step Response:
- Minimum phase response (blue)
- Non-minimum phase response (red)
- Inverse response visible in non-minimum phase
- Steady state value marked

Legend:
- Blue: Minimum phase (LHP zero)
- Red: Non-minimum phase (RHP zero)
- Zero location display

Interactive controls:
- Slider: Zero location (moves from LHP to RHP)
- Slider: DC gain
- Slider: Pole location
- Toggle: Show both systems
- Button: Reset to defaults

Data Visibility Requirements:
- Show transfer functions for both
- Display zero locations
- Show phase margin for each
- Highlight inverse response in step plot

Behavior:
- As zero moves from LHP to RHP, phase changes
- Magnitude remains identical
- Step response develops inverse response for RHP zero
- Phase margin decreases as zero moves to RHP

Instructional Rationale: Direct comparison with matched magnitude reveals how RHP zeros add phase lag. The step response connection shows practical consequences of non-minimum phase behavior.

Implementation: p5.js with synchronized multi-plot display
</details>

## Conditionally Stable Systems

A **conditionally stable** system is one that becomes unstable if the gain is either too high OR too low. This unusual behavior occurs when the Nyquist plot encircles the critical point $-1$ for some gain ranges but not others.

### How Conditional Stability Occurs

Consider a system where the Nyquist plot crosses the negative real axis multiple times. As gain increases:

1. At low gain, the curve is entirely to the right of $-1$: stable
2. At moderate gain, the curve encircles $-1$: unstable
3. At higher gain, the curve might encircle $-1$ twice, but in opposite directions, netting zero: stable
4. At very high gain, the encirclements may change again

This creates "stability windows" separated by unstable regions.

### Recognizing Conditional Stability

From a Bode plot perspective, conditional stability occurs when:

- There are multiple phase crossings of -180°
- Gain margin is positive at one crossing but negative at another
- The system is stable only for gains within a specific range

From the Nyquist plot:

- The curve makes multiple passes near the critical point
- The encirclement count changes as gain varies
- No single gain provides stability for all operating conditions

!!! danger "Conditionally Stable Systems Are Hazardous"
    Conditionally stable systems can fail unexpectedly. A gain reduction (perhaps from component aging or saturation effects) can push the system from stable to unstable. Never design a conditionally stable system unless absolutely necessary, and if you must, ensure robust gain limiting.

| System Type | Gain Too Low | Gain Just Right | Gain Too High |
|-------------|--------------|-----------------|---------------|
| Normal | Stable (overdamped) | Stable (well-damped) | Unstable |
| Conditionally Stable | Unstable | Stable | Unstable (or stable then unstable again) |

#### Diagram: Conditionally Stable System Explorer

<iframe src="../../sims/conditional-stability/main.html" width="100%" height="650px" scrolling="no"></iframe>

<details markdown="1">
<summary>Conditionally Stable System Explorer</summary>
Type: microsim

Bloom Taxonomy: Evaluate (L5)
Bloom Verb: judge, assess

Learning Objective: Students will evaluate system stability across a range of gains, identifying stability windows and understanding the hazards of conditionally stable systems.

Canvas layout:
- Left (50%): Nyquist plot with gain-dependent curve
- Right top (25%): Gain vs. stability diagram
- Right bottom (25%): Controls and warnings

Visual elements:
Nyquist Plot:
- Nyquist curve for current gain
- Critical point at -1
- Trace of how curve changes with gain (faded curves for other gains)
- Encirclement region highlighted

Stability Diagram:
- Horizontal axis: Gain K
- Regions colored: Green (stable), Red (unstable)
- Current gain marked with vertical line
- Stability boundaries labeled

Warning Panel:
- Current gain = [value]
- Encirclements N = [value]
- Open-loop RHP poles P = [value]
- Stability status
- Warning if conditionally stable

Interactive controls:
- Slider: Gain K (wide range, logarithmic)
- Toggle: Show gain sweep animation
- Toggle: Show stability boundaries
- Button: Find stability margins
- Button: Reset

Data Visibility Requirements:
- Show how encirclement count changes with gain
- Display stability boundaries numerically
- Show gain margin at each -180° crossing
- Warn when operating near instability boundary

Behavior:
- As gain increases, Nyquist curve scales
- Stability status changes at boundaries
- Multiple stability windows visible
- Animation sweeps through gain showing stability changes
- Warnings flash when approaching unstable region

Instructional Rationale: Seeing stability windows and understanding how they arise prevents dangerous designs. The gain sweep animation reveals the non-intuitive behavior clearly.

Implementation: p5.js with gain-dependent curve scaling and stability region shading
</details>

## Connecting Nyquist to Bode and Root Locus

The three major graphical analysis techniques—Bode plots, Nyquist plots, and root locus—all examine the same underlying system from different perspectives.

### Nyquist and Bode

Nyquist and Bode plots contain the same information, just displayed differently:

| Feature | Bode Plot | Nyquist Plot |
|---------|-----------|--------------|
| Magnitude | Vertical axis (dB) | Distance from origin |
| Phase | Vertical axis (degrees) | Angle from positive real |
| Gain margin | Distance from 0 dB at ω_pc | 1/(distance to -1 at crossing) |
| Phase margin | Distance from -180° at ω_gc | Angle from -180° at unit circle |
| Stability | Margins both positive | No encirclement of -1 |

Bode plots are easier for construction and design intuition. Nyquist plots are better for applying the Nyquist criterion, especially for unstable open-loop systems.

### Nyquist and Root Locus

Both methods analyze how poles move as gain changes:

- **Root locus** directly shows pole locations versus gain
- **Nyquist** shows whether those poles are in the RHP (via encirclements)

For stable open-loop systems ($P = 0$), the root locus shows poles migrating from open-loop poles toward zeros or infinity. The system becomes unstable when poles cross the imaginary axis—exactly when the Nyquist plot starts encircling $-1$.

The imaginary axis crossing on the root locus corresponds to the Nyquist plot passing through $-1$. The gain at that crossing equals the reciprocal of the magnitude at the -180° phase crossing.

## Practical Nyquist Analysis

Here's a systematic approach to using the Nyquist criterion:

### Step-by-Step Procedure

1. **Identify open-loop poles**: Count $P$, the number in the RHP

2. **Sketch or plot the Nyquist diagram**:
   - Evaluate $L(j\omega)$ for $\omega$ from 0 to $\infty$
   - Reflect about the real axis for negative frequencies
   - Handle imaginary axis poles with indentation arcs

3. **Count encirclements of -1**:
   - Draw a ray from $-1$ to infinity
   - Count signed crossings to get $N$

4. **Apply the criterion**: $Z = N + P$
   - If $Z = 0$: stable
   - If $Z > 0$: unstable with $Z$ RHP poles

5. **Measure stability margins**:
   - Gain margin from negative real axis crossing
   - Phase margin from unit circle crossing

### Example: Second-Order System with Integrator

Consider:

$L(s) = \frac{K}{s(s+1)(s+2)}$

**Step 1**: Open-loop poles at $s = 0, -1, -2$. All in LHP or on imaginary axis, so $P = 0$.

**Step 2**: Evaluate at key frequencies:

| $\omega$ | $L(j\omega)$ | Magnitude | Phase |
|----------|--------------|-----------|-------|
| 0 | $\to \infty$ | $\infty$ | -90° |
| 0.5 | $\frac{K}{j0.5(1.12\angle 26.6°)(2.06\angle 14°)}$ | Large | ≈ -130° |
| 1 | $\frac{K}{j(1.41\angle 45°)(2.24\angle 26.6°)}$ | $\frac{K}{3.16}$ | -162° |
| $\sqrt{2}$ | | | -180° |
| 10 | $\frac{K}{j10 \cdot 10.05 \cdot 10.2}$ | $\frac{K}{1025}$ | -262° |

The curve starts at $-90°$ (pointing down from infinity along negative imaginary axis), spirals toward the origin, crossing the negative real axis somewhere.

**Step 3**: For $K$ small, no encirclement. As $K$ increases, the curve expands, eventually encircling $-1$.

**Step 4**: For stability: $N = 0$ required (since $P = 0$).

**Step 5**: The phase crosses -180° at $\omega = \sqrt{2}$ rad/s. At that frequency:

$|L(j\sqrt{2})| = \frac{K}{\sqrt{2} \cdot \sqrt{3} \cdot \sqrt{6}} = \frac{K}{6}$

For $|L| < 1$ at -180° phase (stable), need $K < 6$.

Gain margin at $K = 1$: $GM = 1/(1/6) = 6$ or about 15.6 dB.

## Summary: The Nyquist Toolkit

You now have a complete set of tools for frequency-domain stability analysis:

**Stability Margins**:

- **Gain margin**: How much gain increase before instability (measured at phase crossover)
- **Phase margin**: How much phase lag before instability (measured at gain crossover)
- Target: GM > 6 dB, PM > 30° minimum; GM > 10 dB, PM > 45° preferred

**Nyquist Plot**:

- Polar plot of $L(j\omega)$ in the complex plane
- Critical point at $-1 + j0$
- Shows how far from instability the system operates

**Nyquist Criterion**:

- $Z = N + P$ where $Z$ = closed-loop RHP poles, $N$ = clockwise encirclements, $P$ = open-loop RHP poles
- For stability: $Z = 0$
- For stable open-loop ($P = 0$): need $N = 0$ (no encirclement)
- For unstable open-loop ($P > 0$): need $N = -P$ (counterclockwise encirclements)

**System Classifications**:

| Type | Characteristics | Control Challenge |
|------|-----------------|-------------------|
| Minimum phase | All poles/zeros in LHP | Standard techniques work |
| Non-minimum phase | RHP zeros | Bandwidth limited, inverse response |
| Unstable open-loop | RHP poles | Must stabilize first |
| Conditionally stable | Multiple stability regions | Avoid if possible |

## Connecting to What's Next

With the Nyquist criterion and stability margins, you can now assess robustness of any control design. In Chapter 14, we'll examine steady-state error—how accurately the system tracks commands and rejects disturbances in the long run. You'll learn about system type, position/velocity/acceleration error constants, and how these connect to the low-frequency behavior visible in Bode plots.

The frequency-domain tools you've developed—Bode plots, Nyquist plots, and stability margins—form the foundation for controller design in Chapters 15 and 16, where you'll synthesize compensators to achieve desired performance.

!!! quote "Helping Gyra"
    "You've learned to measure how close I am to losing control. My phase margin tells you how much wobble I can tolerate before it grows unbounded. My gain margin tells you how much my sensors could drift before I oscillate. The Nyquist plot is like a map of my stability—the critical point at -1 is the cliff edge, and as long as my curve doesn't wrap around it, I stay upright. Now you can not only keep me balanced but also guarantee I'll stay that way even when things don't go perfectly."

## Key Takeaways

This chapter has equipped you to assess stability and robustness using frequency-domain methods:

- **Stability margins** (gain margin and phase margin) quantify how far a system is from instability. Larger margins mean more robustness.

- **Gain margin** is measured at the phase crossover frequency where phase = -180°. It's the factor by which gain can increase before instability.

- **Phase margin** is measured at the gain crossover frequency where magnitude = 0 dB. It's the additional phase lag that would cause instability.

- The **crossover frequency** ($\omega_{gc}$) approximately equals the closed-loop bandwidth and represents the control system's speed of response.

- The **Nyquist plot** displays $L(j\omega)$ in the complex plane. The **critical point** $-1 + j0$ is key to stability determination.

- The **Nyquist criterion** states $Z = N + P$: closed-loop RHP poles = encirclements + open-loop RHP poles.

- **Minimum phase systems** have all poles and zeros in the LHP. **Non-minimum phase systems** have RHP zeros, which add phase lag and limit bandwidth.

- **Conditionally stable systems** are stable only for gains within specific ranges—a hazardous condition to avoid.

- Stability margins are visible on both Bode plots (as distances to 0 dB and -180°) and Nyquist plots (as distances and angles to the critical point).

??? question "Self-Check: Test Your Understanding"
    Before moving on, try these without peeking:

    1. A Bode plot shows magnitude of -8 dB where the phase crosses -180°. What is the gain margin?

    2. If the phase is -150° where the magnitude crosses 0 dB, what is the phase margin?

    3. A system has 2 open-loop poles in the RHP and the Nyquist plot makes 2 counterclockwise encirclements of -1. Is the closed-loop stable?

    4. Why does an RHP zero limit the achievable bandwidth?

    5. A system has gain margin at two different frequencies: +6 dB at one and -4 dB at another. What does this indicate?

    Answers: (1) GM = 8 dB (positive, stable with margin). (2) PM = 180° - 150° = 30°. (3) Yes: $N = -2$, $P = 2$, so $Z = -2 + 2 = 0$ closed-loop RHP poles. (4) RHP zeros contribute phase lag at high frequencies, reducing phase margin if crossover is pushed too high. (5) Conditionally stable system—stable only for a limited gain range.
