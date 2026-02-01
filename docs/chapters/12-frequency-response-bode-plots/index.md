---
title: Frequency Response and Bode Plots
description: Understanding system behavior through sinusoidal steady-state analysis and graphical frequency-domain visualization
generated_by: claude skill chapter-content-generator
date: 2026-01-31
version: 0.03
---

# Frequency Response and Bode Plots

## Summary

This chapter introduces frequency-domain analysis as a powerful complement to time-domain methods. Students will learn to characterize system behavior using sinusoidal steady-state response, magnitude and phase relationships, and the substitution s=jω. Bode plots are developed as graphical tools showing magnitude (in decibels) and phase versus frequency on logarithmic scales. Systematic construction techniques for first-order, second-order, integrator, and differentiator terms are presented. The chapter also covers bandwidth, cutoff frequency, resonance phenomena, and filter characteristics (low-pass, high-pass, bandpass, notch).

## Concepts Covered

This chapter covers the following 35 concepts from the learning graph:

1. Frequency Response
2. Sinusoidal Steady State
3. Magnitude Response
4. Phase Response
5. Frequency Transfer Func
6. Substitution s=jw
7. Bode Plot
8. Bode Magnitude Plot
9. Bode Phase Plot
10. Decibel
11. Logarithmic Scale
12. Decade
13. Octave
14. Corner Frequency
15. Break Frequency
16. Asymptotic Approximation
17. Bode Plot Construction
18. First-Order Factor
19. Second-Order Factor
20. First-Order Bode Plot
21. Second-Order Bode Plot
22. Integrator Bode Plot
23. Differentiator Bode Plot
24. Constant Gain Term
25. Time Delay in Bode
26. Resonant Peak
27. Resonant Frequency
28. Quality Factor
29. Bandwidth
30. Cutoff Frequency
31. Half-Power Point
32. Low-Pass System
33. High-Pass System
34. Bandpass System
35. Notch Filter

## Prerequisites

This chapter builds on concepts from:

- [Chapter 3: Time-Domain Response Fundamentals](../03-time-domain-response/index.md)
- [Chapter 4: Transient Response Specifications](../04-transient-response-specs/index.md)
- [Chapter 5: Laplace Transform Methods](../05-laplace-transform-methods/index.md)
- [Chapter 6: Poles, Zeros, and System Analysis](../06-poles-zeros-system-analysis/index.md)

---

## A Different Lens on the Same System

In Chapters 10 and 11, you learned to analyze control systems by examining pole locations and tracking how they move as parameters change. The s-plane tells a complete story about stability and dynamics—but it requires knowing the transfer function and finding roots. What if you could characterize a system's behavior just by measuring its response to sine waves at different frequencies?

This is exactly what **frequency response analysis** provides. Instead of looking at where poles are in the complex plane, you ask a simpler experimental question: "If I feed a sinusoid into this system, what sinusoid comes out?" The answer—how the amplitude changes and how much the phase shifts—turns out to contain all the information you need for stability analysis and controller design.

The genius of Bode plots is that they encode this frequency response information in a graphical form that reveals system structure at a glance. By the end of this chapter, you'll be able to:

- Calculate how an LTI system responds to sinusoidal inputs
- Construct Bode plots from transfer functions using simple rules
- Read gain margin, phase margin, and bandwidth directly from plots
- Classify systems as low-pass, high-pass, bandpass, or notch filters
- Understand resonance and its relationship to damping

Frequency-domain analysis isn't replacing what you learned in the s-domain—it's providing a complementary perspective that's often more practical for real-world design.

!!! quote "Gyra Moment"
    "My engineers don't just step me to see how I respond—they also sing to me at different frequencies. When they sweep through low frequencies, I follow along perfectly. But as they push higher, I start lagging behind, and eventually I can barely respond at all. My Bode plot is a portrait of how I hear the world—what frequencies I'm sensitive to, and where I go deaf."

## What Is Frequency Response?

The **frequency response** of a linear time-invariant (LTI) system describes how the system responds to sinusoidal inputs at various frequencies. For any stable LTI system, a sinusoidal input produces a sinusoidal output at the same frequency, but with possibly different amplitude and phase.

Consider a system with transfer function $G(s)$. If we apply a sinusoidal input:

#### Sinusoidal Input

$u(t) = A \sin(\omega t)$

where:

- $A$ is the input amplitude
- $\omega$ is the angular frequency (rad/s)

The steady-state output (after transients decay) is:

#### Sinusoidal Steady-State Output

$y_{ss}(t) = A |G(j\omega)| \sin(\omega t + \angle G(j\omega))$

where:

- $|G(j\omega)|$ is the magnitude of the transfer function at frequency $\omega$
- $\angle G(j\omega)$ is the phase of the transfer function at frequency $\omega$

This is a remarkable result. The output is:

- At the **same frequency** as the input
- **Scaled** by the magnitude $|G(j\omega)|$
- **Shifted in time** by the phase $\angle G(j\omega)$

No new frequencies are created—this is a fundamental property of linear systems. Nonlinear systems would distort the sine wave, creating harmonics, but LTI systems preserve the sinusoidal shape.

| Input Property | Output Property |
|----------------|-----------------|
| Frequency $\omega$ | Same frequency $\omega$ |
| Amplitude $A$ | Amplitude $A \cdot |G(j\omega)|$ |
| Phase $0$ | Phase $\angle G(j\omega)$ |

## Sinusoidal Steady State

The term **sinusoidal steady state** refers to the system's behavior after initial transients have died out. When you first apply a sinusoidal input, the output contains two components:

1. **Transient response**: Determined by the system's poles, decays over time
2. **Steady-state response**: The persistent sinusoidal oscillation

For a stable system (all poles in LHP), the transient eventually vanishes, leaving only the steady-state sinusoid. The frequency response characterizes this steady-state behavior.

Consider a first-order system:

#### First-Order Example

$G(s) = \frac{1}{s + 1}$

Input: $u(t) = \sin(2t)$ (amplitude 1, frequency 2 rad/s)

At $\omega = 2$ rad/s:

$G(j2) = \frac{1}{j2 + 1} = \frac{1}{1 + j2}$

Magnitude: $|G(j2)| = \frac{1}{\sqrt{1^2 + 2^2}} = \frac{1}{\sqrt{5}} \approx 0.447$

Phase: $\angle G(j2) = -\arctan\left(\frac{2}{1}\right) = -63.4°$

Steady-state output: $y_{ss}(t) = 0.447 \sin(2t - 63.4°)$

The output has less than half the amplitude of the input and lags by about 63 degrees. This single-frequency measurement tells us something about the system—and repeating it across many frequencies builds a complete picture.

#### Diagram: Sinusoidal Steady-State Visualizer

<iframe src="../../sims/sinusoidal-steady-state/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Sinusoidal Steady-State Visualizer</summary>
Type: microsim

Bloom Taxonomy: Understand (L2)
Bloom Verb: explain, interpret

Learning Objective: Students will explain how sinusoidal inputs are transformed by LTI systems, observing magnitude scaling and phase shift in steady state.

Canvas layout:
- Top (40%): Time-domain plot showing input and output sinusoids
- Middle (30%): Phasor diagram showing amplitude and phase relationship
- Bottom (30%): Control panel and numeric display

Visual elements:
Time Domain:
- Input sinusoid in blue
- Output sinusoid in red (after transient)
- Transient portion shown faded initially, then fading out
- Time axis with markers for period
- Amplitude markers for both signals
- Phase shift indicated with vertical dashed lines

Phasor Diagram:
- Input phasor (blue arrow)
- Output phasor (red arrow)
- Angle between them labeled
- Magnitude ratio shown
- Rotating animation option

Numeric Display:
- Input frequency ω = [value] rad/s
- Input amplitude = [value]
- Output amplitude = [value]
- Magnitude ratio = [value]
- Phase shift = [value]°

Interactive controls:
- Slider: Input frequency (0.1 to 10 rad/s, logarithmic)
- Dropdown: System presets (first-order, second-order underdamped, second-order overdamped)
- Toggle: Show/hide transient
- Toggle: Animate phasors
- Slider: Time constant or damping ratio (system-dependent)

Data Visibility Requirements:
- Stage 1: Show input sinusoid only
- Stage 2: Add system transfer function
- Stage 3: Calculate |G(jω)| and ∠G(jω) with formula
- Stage 4: Display output sinusoid with scaling and shift
- Stage 5: Show phasor representation

Behavior:
- As frequency slider moves, output amplitude and phase change
- Transient fades over first few time constants
- Phasors rotate at selected frequency if animated
- For underdamped systems, amplitude can exceed 1 at resonance
- Phase ranges from 0° (low freq) to -180° (high freq) for typical systems

Instructional Rationale: Direct visualization of how sinusoidal signals transform through a system builds intuition for frequency response. The phasor representation connects to electrical engineering backgrounds while time-domain plots remain accessible to all.

Implementation: p5.js with dual time-domain and phasor displays
</details>

## The Frequency Transfer Function: Substitution s = jω

The key to frequency response analysis is the substitution $s = j\omega$. The transfer function $G(s)$ becomes a function of frequency alone: $G(j\omega)$.

#### The Fundamental Substitution

$G(j\omega) = G(s)\big|_{s=j\omega}$

where:

- $s$ is the complex Laplace variable
- $j = \sqrt{-1}$ is the imaginary unit
- $\omega$ is the angular frequency in rad/s

This substitution has a beautiful interpretation. In the s-plane, the imaginary axis is where $s = j\omega$. Evaluating the transfer function along the imaginary axis traces out the frequency response. Every point on the imaginary axis corresponds to a different frequency:

| s-plane location | Frequency |
|------------------|-----------|
| $s = 0$ | DC (ω = 0) |
| $s = j1$ | 1 rad/s |
| $s = j10$ | 10 rad/s |
| $s = j100$ | 100 rad/s |

The resulting complex number $G(j\omega)$ has magnitude and phase:

#### Magnitude Response

$|G(j\omega)| = \sqrt{[\text{Re}(G(j\omega))]^2 + [\text{Im}(G(j\omega))]^2}$

where:

- $\text{Re}(G(j\omega))$ is the real part
- $\text{Im}(G(j\omega))$ is the imaginary part

#### Phase Response

$\angle G(j\omega) = \arctan\left(\frac{\text{Im}(G(j\omega))}{\text{Re}(G(j\omega))}\right)$

where:

- The result is in degrees or radians
- Care must be taken with the quadrant (use atan2 in computations)

Together, $|G(j\omega)|$ and $\angle G(j\omega)$ completely describe the frequency response. The **magnitude response** tells us how much the system amplifies or attenuates each frequency. The **phase response** tells us how much time delay (in terms of phase angle) the system introduces at each frequency.

## Poles, Zeros, and Frequency Response

There's a direct geometric connection between pole-zero locations and frequency response. At any frequency $\omega$, the magnitude and phase can be computed from the distances and angles to poles and zeros.

For a transfer function in factored form:

#### Transfer Function in Factored Form

$G(s) = K \frac{\prod_{i=1}^{m}(s - z_i)}{\prod_{j=1}^{n}(s - p_j)}$

where:

- $K$ is the gain constant
- $z_i$ are the zeros
- $p_j$ are the poles

The magnitude at frequency $\omega$ is:

#### Magnitude from Poles and Zeros

$|G(j\omega)| = |K| \frac{\prod_{i=1}^{m}|j\omega - z_i|}{\prod_{j=1}^{n}|j\omega - p_j|}$

And the phase is:

#### Phase from Poles and Zeros

$\angle G(j\omega) = \angle K + \sum_{i=1}^{m}\angle(j\omega - z_i) - \sum_{j=1}^{n}\angle(j\omega - p_j)$

Geometrically:

- $|j\omega - z_i|$ is the distance from the test point $j\omega$ on the imaginary axis to zero $z_i$
- $\angle(j\omega - z_i)$ is the angle of the vector from $z_i$ to $j\omega$

!!! tip "Geometric Intuition"
    When $\omega$ is close to a pole, the denominator term becomes small, making the magnitude large. This is **resonance**. When $\omega$ is close to a zero, the numerator term becomes small, making the magnitude small—a **notch**. Poles boost the frequency response; zeros cut it.

## Logarithmic Scales and the Decibel

Before constructing Bode plots, we need to understand the scales used. Bode plots use logarithmic scales for both frequency and magnitude, which converts multiplication into addition and reveals patterns across many decades of frequency.

The **decibel** (dB) is a logarithmic unit for expressing ratios:

#### Decibel Definition

$|G|_{dB} = 20 \log_{10}|G|$

where:

- $|G|$ is the magnitude (dimensionless ratio)
- $|G|_{dB}$ is the magnitude in decibels

| Linear Magnitude | Decibels |
|------------------|----------|
| 1 | 0 dB |
| 2 | 6 dB |
| 10 | 20 dB |
| 100 | 40 dB |
| 0.1 | -20 dB |
| 0.01 | -40 dB |
| 0.707 ≈ 1/√2 | -3 dB |

The -3 dB point (magnitude of 0.707) is particularly important—it represents the **half-power point**, where power (proportional to magnitude squared) drops to half its maximum value.

Using decibels transforms multiplication into addition:

$|G_1 G_2|_{dB} = |G_1|_{dB} + |G_2|_{dB}$

This is crucial for Bode plots, where we'll add the contributions of individual factors to get the total response.

The **logarithmic frequency scale** uses decades and octaves:

#### Decade

$\text{One decade} = \text{factor of 10 in frequency}$

Examples: 1 to 10 rad/s, 10 to 100 rad/s, 100 to 1000 rad/s

#### Octave

$\text{One octave} = \text{factor of 2 in frequency}$

Examples: 1 to 2 rad/s, 2 to 4 rad/s, 4 to 8 rad/s

There are approximately 3.32 octaves per decade (since $\log_2(10) \approx 3.32$). Control engineers typically work in decades; audio engineers prefer octaves.

## What Is a Bode Plot?

A **Bode plot** consists of two graphs that together display the complete frequency response:

1. **Bode Magnitude Plot**: $|G(j\omega)|_{dB}$ versus $\omega$ on a log scale
2. **Bode Phase Plot**: $\angle G(j\omega)$ (in degrees) versus $\omega$ on a log scale

Named after Hendrik Wade Bode (rhymes with "body"), who developed these techniques at Bell Labs in the 1930s, Bode plots remain the standard tool for frequency-domain analysis because:

- They span many decades of frequency on a compact graph
- Individual transfer function factors contribute additively
- Straight-line asymptotic approximations are remarkably accurate
- Stability margins are visible at a glance

The key insight is **factorization**: any transfer function can be written as a product of simple factors, and the Bode plot of the product equals the sum of the Bode plots of the factors.

#### Diagram: Bode Plot Overview

<iframe src="../../sims/bode-overview/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Bode Plot Overview</summary>
Type: microsim

Bloom Taxonomy: Remember (L1)
Bloom Verb: identify, recognize

Learning Objective: Students will identify the components of a Bode plot and recognize how magnitude (in dB) and phase (in degrees) vary with frequency.

Canvas layout:
- Top (45%): Magnitude plot with labeled axes
- Bottom (45%): Phase plot with labeled axes
- Right margin (10%): Legend and annotations

Visual elements:
Magnitude Plot:
- Horizontal axis: ω (rad/s), logarithmic scale from 0.1 to 1000
- Vertical axis: Magnitude (dB), linear scale from -60 to 40
- Grid lines at decades (0.1, 1, 10, 100, 1000)
- Grid lines at -40, -20, 0, 20, 40 dB
- Example transfer function curve
- 0 dB line emphasized

Phase Plot:
- Horizontal axis: ω (rad/s), logarithmic scale (same as magnitude)
- Vertical axis: Phase (degrees), linear scale from -180 to 0
- Grid lines at decades
- Grid lines at -180, -135, -90, -45, 0 degrees
- Phase curve corresponding to magnitude above
- -90° and -180° lines emphasized

Annotations:
- Label: "Low frequency region" (left)
- Label: "High frequency region" (right)
- Arrow pointing to corner frequency
- Label: "-3 dB point" where applicable

Interactive controls:
- Dropdown: Example system (first-order, second-order, integrator, lead-lag)
- Toggle: Show asymptotes
- Toggle: Show exact curve
- Button: Reset to default view
- Zoom in/out on frequency axis

Data Visibility Requirements:
- Show transfer function formula
- Display magnitude and phase at cursor position
- Highlight key points: DC gain, corner frequencies, high-frequency slope

Behavior:
- As user hovers, crosshairs show exact values
- Asymptotes appear as dashed lines when enabled
- Smooth curve overlays asymptotes
- Different example systems show different characteristics

Instructional Rationale: A clear, labeled example establishes the visual vocabulary of Bode plots before students learn construction techniques. Seeing exact curves alongside asymptotes prepares them for the approximation approach.

Implementation: p5.js with logarithmic axis handling and interactive cursor
</details>

## Bode Plot of Constant Gain

The simplest transfer function is a pure gain:

#### Constant Gain Term

$G(s) = K$

where:

- $K$ is a real constant (positive or negative)

For frequency response:

$G(j\omega) = K$

Magnitude: $|K|_{dB} = 20 \log_{10}|K|$ (constant for all frequencies)

Phase: $\angle K = 0°$ if $K > 0$, or $-180°$ (equivalently $+180°$) if $K < 0$

The Bode plot of a constant gain is simply:

- **Magnitude**: Horizontal line at $20 \log_{10}|K|$ dB
- **Phase**: Horizontal line at 0° (if $K > 0$) or ±180° (if $K < 0$)

| Gain $K$ | Magnitude | Phase |
|----------|-----------|-------|
| $K = 1$ | 0 dB | 0° |
| $K = 10$ | 20 dB | 0° |
| $K = 100$ | 40 dB | 0° |
| $K = 0.1$ | -20 dB | 0° |
| $K = -1$ | 0 dB | ±180° |

A negative gain inverts the sign of the output, which corresponds to a 180° phase shift—flipping the sine wave upside down.

## First-Order Factors and Their Bode Plots

Most practical transfer functions can be decomposed into first-order and second-order factors. Let's start with first-order terms.

### First-Order Pole (Low-Pass Factor)

A first-order pole in the denominator:

#### First-Order Pole

$G(s) = \frac{1}{1 + s/\omega_c} = \frac{1}{1 + j\omega/\omega_c}$

where:

- $\omega_c$ is the corner frequency (also called break frequency or cutoff frequency)
- The time constant is $\tau = 1/\omega_c$

This is a low-pass filter that passes low frequencies and attenuates high frequencies.

**Magnitude**:

$|G(j\omega)| = \frac{1}{\sqrt{1 + (\omega/\omega_c)^2}}$

$|G|_{dB} = -20 \log_{10}\sqrt{1 + (\omega/\omega_c)^2} = -10 \log_{10}[1 + (\omega/\omega_c)^2]$

**Phase**:

$\angle G(j\omega) = -\arctan(\omega/\omega_c)$

#### First-Order Bode Plot Asymptotes

**Low-frequency asymptote** ($\omega \ll \omega_c$):

- Magnitude: 0 dB (horizontal line)
- Phase: 0°

**High-frequency asymptote** ($\omega \gg \omega_c$):

- Magnitude: $-20 \log_{10}(\omega/\omega_c)$ dB, which is a line with slope **-20 dB/decade**
- Phase: -90°

**At the corner frequency** ($\omega = \omega_c$):

- Magnitude: $-10 \log_{10}(2) = -3$ dB (3 dB below the low-frequency asymptote)
- Phase: $-\arctan(1) = -45°$ (halfway between 0° and -90°)

| Frequency | Magnitude | Phase |
|-----------|-----------|-------|
| $\omega \ll \omega_c$ | 0 dB | ≈ 0° |
| $\omega = 0.1\omega_c$ | -0.04 dB | -5.7° |
| $\omega = 0.5\omega_c$ | -1 dB | -26.6° |
| $\omega = \omega_c$ | -3 dB | -45° |
| $\omega = 2\omega_c$ | -7 dB | -63.4° |
| $\omega = 10\omega_c$ | -20 dB | -84.3° |
| $\omega \gg \omega_c$ | -20 dB/decade slope | ≈ -90° |

### First-Order Zero (High-Pass Factor)

A first-order zero in the numerator:

#### First-Order Zero

$G(s) = 1 + s/\omega_c = 1 + j\omega/\omega_c$

where:

- $\omega_c$ is the corner frequency

This factor has the opposite effect of a first-order pole:

**Magnitude asymptotes**:

- Low frequency: 0 dB (horizontal)
- High frequency: +20 dB/decade (rising slope)
- At corner: +3 dB

**Phase**:

- Low frequency: 0°
- At corner: +45°
- High frequency: +90°

The Bode plot of a first-order zero is the mirror image (about 0 dB and 0°) of a first-order pole at the same frequency.

!!! tip "Poles vs. Zeros"
    - **Poles** cause magnitude to decrease and phase to become more negative (lag)
    - **Zeros** cause magnitude to increase and phase to become more positive (lead)
    - Both change by 20 dB/decade in magnitude and 90° in phase

#### Diagram: First-Order Bode Plot Constructor

<iframe src="../../sims/first-order-bode/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>First-Order Bode Plot Constructor</summary>
Type: microsim

Bloom Taxonomy: Apply (L3)
Bloom Verb: calculate, execute

Learning Objective: Students will construct Bode plots for first-order poles and zeros, applying asymptotic approximation rules and verifying accuracy at key frequencies.

Canvas layout:
- Top left (35%): Magnitude plot
- Bottom left (35%): Phase plot
- Right (30%): Control panel and calculations

Visual elements:
Magnitude Plot:
- Exact curve (solid)
- Asymptotic approximation (dashed)
- Corner frequency marked with vertical line
- -3 dB point marked (for poles) or +3 dB (for zeros)
- Grid at decades and standard dB values

Phase Plot:
- Exact curve (solid)
- Asymptotic approximation (dashed, three-segment)
- -45° or +45° point at corner
- Phase values at 0.1ωc, ωc, 10ωc marked

Calculation Panel:
- Transfer function displayed
- Corner frequency ωc = [value] rad/s
- Time constant τ = [value] s
- Low-freq magnitude = [value] dB
- High-freq slope = [value] dB/decade
- At ωc: magnitude = [value] dB, phase = [value]°

Interactive controls:
- Slider: Corner frequency (0.1 to 100 rad/s, log scale)
- Radio: Pole or Zero
- Toggle: Show asymptotes
- Toggle: Show exact curve
- Slider: Gain multiplier (0.1 to 10)
- Button: Reset

Data Visibility Requirements:
- Show transfer function formula
- Display asymptote equations
- Show exact values at ωc, 0.1ωc, 10ωc
- Calculate error between asymptote and exact

Behavior:
- As corner frequency changes, curves shift horizontally
- Pole and zero selections flip the curves
- Error between asymptote and exact shown at corner (always 3 dB for first-order)
- Gain multiplier shifts magnitude plot vertically

Instructional Rationale: Hands-on construction with immediate feedback builds fluency with first-order factors. Seeing both exact and asymptotic curves develops judgment about approximation accuracy.

Implementation: p5.js with logarithmic plotting and parameter controls
</details>

## Integrator and Differentiator Bode Plots

Special first-order cases occur when the corner frequency is at zero (integrator) or infinity (conceptually, a pure differentiator).

### Integrator Bode Plot

The integrator (pole at the origin):

#### Integrator Transfer Function

$G(s) = \frac{1}{s} = \frac{1}{j\omega}$

**Magnitude**:

$|G(j\omega)| = \frac{1}{\omega}$

$|G|_{dB} = -20 \log_{10}(\omega)$

This is a straight line with slope **-20 dB/decade**, passing through 0 dB at $\omega = 1$ rad/s.

**Phase**:

$\angle G(j\omega) = -90°$ (constant at all frequencies)

The integrator has no corner frequency—the -20 dB/decade slope extends forever in both directions. Of course, at very low frequencies this implies infinite gain, which isn't physically realizable, but it's mathematically correct.

### Differentiator Bode Plot

The differentiator (zero at the origin):

#### Differentiator Transfer Function

$G(s) = s = j\omega$

**Magnitude**:

$|G(j\omega)| = \omega$

$|G|_{dB} = 20 \log_{10}(\omega)$

This is a straight line with slope **+20 dB/decade**, passing through 0 dB at $\omega = 1$ rad/s.

**Phase**:

$\angle G(j\omega) = +90°$ (constant at all frequencies)

| Factor | Magnitude Slope | Phase |
|--------|----------------|-------|
| $1/s$ (integrator) | -20 dB/decade | -90° |
| $s$ (differentiator) | +20 dB/decade | +90° |
| $1/s^2$ (double integrator) | -40 dB/decade | -180° |
| $s^2$ (double differentiator) | +40 dB/decade | +180° |

!!! quote "Helping Gyra"
    "My tilt angle sensor works like an integrator of angular velocity. In Bode terms, it has a -20 dB/decade slope and -90° phase at all frequencies. This means high-frequency noise gets attenuated (good!), but there's also inherent phase lag. That 90° delay is one reason my controller needs to be carefully tuned—my sensors don't give me instantaneous information; they give me information about the past."

## Second-Order Factors

Second-order factors are more interesting because they introduce **resonance**—the possibility of amplification near the natural frequency.

### Second-Order Pole (Standard Form)

#### Second-Order Denominator Factor

$G(s) = \frac{1}{1 + 2\zeta(s/\omega_n) + (s/\omega_n)^2}$

where:

- $\omega_n$ is the natural frequency
- $\zeta$ is the damping ratio

Substituting $s = j\omega$:

$G(j\omega) = \frac{1}{1 - (\omega/\omega_n)^2 + j2\zeta(\omega/\omega_n)}$

**Magnitude**:

$|G(j\omega)| = \frac{1}{\sqrt{[1-(\omega/\omega_n)^2]^2 + [2\zeta(\omega/\omega_n)]^2}}$

**Phase**:

$\angle G(j\omega) = -\arctan\left(\frac{2\zeta(\omega/\omega_n)}{1-(\omega/\omega_n)^2}\right)$

#### Second-Order Bode Plot Asymptotes

**Low-frequency asymptote** ($\omega \ll \omega_n$):

- Magnitude: 0 dB
- Phase: 0°

**High-frequency asymptote** ($\omega \gg \omega_n$):

- Magnitude: $-40 \log_{10}(\omega/\omega_n)$ dB, slope of **-40 dB/decade**
- Phase: -180°

**At the natural frequency** ($\omega = \omega_n$):

- Magnitude: $|G(j\omega_n)| = \frac{1}{2\zeta}$, so $|G|_{dB} = -20\log_{10}(2\zeta)$
- Phase: exactly -90°

The behavior at $\omega_n$ depends strongly on $\zeta$:

| $\zeta$ | $|G(j\omega_n)|$ | Magnitude at $\omega_n$ | Behavior |
|---------|------------------|------------------------|----------|
| 1.0 | 0.5 | -6 dB | Critically damped, no peak |
| 0.707 | 0.707 | -3 dB | Optimal damping, slight rise |
| 0.5 | 1.0 | 0 dB | Equal to low-freq value |
| 0.25 | 2.0 | +6 dB | Moderate resonance |
| 0.1 | 5.0 | +14 dB | Strong resonance |

For $\zeta < 0.707$, there's a **resonant peak** above 0 dB. The lower the damping, the higher and sharper the peak.

### Resonant Peak and Resonant Frequency

The **resonant peak** $M_r$ is the maximum value of the magnitude response. It doesn't occur exactly at $\omega_n$ unless $\zeta$ is very small.

#### Resonant Frequency

$\omega_r = \omega_n\sqrt{1 - 2\zeta^2}$

where:

- $\omega_r$ is the frequency at which the peak occurs
- This is only valid for $\zeta < 1/\sqrt{2} \approx 0.707$

For $\zeta \geq 0.707$, there's no resonant peak above the DC value.

#### Resonant Peak Magnitude

$M_r = \frac{1}{2\zeta\sqrt{1-\zeta^2}}$

In decibels: $M_r|_{dB} = 20\log_{10}(M_r)$

The relationship between damping and resonant peak is crucial for design:

| $\zeta$ | $\omega_r$ | $M_r$ | $M_r$ (dB) |
|---------|------------|-------|------------|
| 0.1 | $0.99\omega_n$ | 5.03 | 14.0 dB |
| 0.2 | $0.96\omega_n$ | 2.55 | 8.1 dB |
| 0.3 | $0.91\omega_n$ | 1.75 | 4.9 dB |
| 0.4 | $0.82\omega_n$ | 1.36 | 2.7 dB |
| 0.5 | $0.71\omega_n$ | 1.15 | 1.3 dB |
| 0.707 | 0 | 1.0 | 0 dB |

### Quality Factor

The **quality factor** $Q$ is an alternative way to characterize second-order systems:

#### Quality Factor Definition

$Q = \frac{1}{2\zeta}$

where:

- High $Q$ means low damping (sharp resonance)
- Low $Q$ means high damping (broad, gentle response)

The quality factor describes how "selective" a resonant system is—high-Q systems respond strongly only near the resonant frequency, while low-Q systems have broad frequency response.

| Damping | $\zeta$ | $Q$ | Character |
|---------|---------|-----|-----------|
| Heavy | 1.0 | 0.5 | No overshoot |
| Critical | 0.707 | 0.707 | Maximally flat |
| Light | 0.5 | 1.0 | Some oscillation |
| Very light | 0.1 | 5.0 | Strong resonance |

#### Diagram: Second-Order Bode Plot Explorer

<iframe src="../../sims/second-order-bode/main.html" width="100%" height="650px" scrolling="no"></iframe>

<details markdown="1">
<summary>Second-Order Bode Plot Explorer</summary>
Type: microsim

Bloom Taxonomy: Analyze (L4)
Bloom Verb: differentiate, compare

Learning Objective: Students will analyze how damping ratio affects second-order Bode plots, comparing resonant behavior across different ζ values.

Canvas layout:
- Top left (40%): Magnitude plot with multiple damping curves
- Bottom left (40%): Phase plot with multiple damping curves
- Right (20%): Controls and resonance data

Visual elements:
Magnitude Plot:
- Multiple curves for different ζ values (shown simultaneously or one at a time)
- Asymptotes: 0 dB low-freq, -40 dB/decade high-freq
- Resonant peak marked with dot and label
- Natural frequency marked on axis
- Grid at standard values

Phase Plot:
- Phase curves corresponding to magnitude
- -90° line emphasized (passes through ωn for all ζ)
- Phase transition region highlighted
- Grid at -180°, -135°, -90°, -45°, 0°

Resonance Data Panel:
- Current ζ = [value]
- Q = 1/(2ζ) = [value]
- Resonant frequency ωr = [value] rad/s
- Resonant peak Mr = [value] (or [value] dB)
- Bandwidth (if applicable)

Interactive controls:
- Slider: Damping ratio ζ (0.05 to 2.0)
- Slider: Natural frequency ωn (0.1 to 100 rad/s)
- Toggle: Show asymptotes
- Toggle: Show multiple ζ values simultaneously
- Checkbox: ζ = 0.1, 0.3, 0.5, 0.707, 1.0 presets
- Button: Animate ζ sweep

Data Visibility Requirements:
- Show formulas for Mr and ωr
- Display all key values numerically
- Highlight when ζ crosses 0.707 threshold
- Show pole locations on small s-plane inset

Behavior:
- As ζ decreases, resonant peak grows
- Below ζ = 0.707, peak appears above 0 dB line
- Phase transition becomes sharper as ζ decreases
- At ζ = 0.707, maximum flat magnitude without overshoot
- At ζ = 1, no peak, transition is gradual

Instructional Rationale: Comparing multiple damping values simultaneously reveals the qualitative effect of ζ on resonance. The connection between sharp magnitude peak and rapid phase transition builds intuition for stability margin analysis.

Implementation: p5.js with multi-curve plotting and parameter animation
</details>

## Asymptotic Approximation and Bode Plot Construction

The power of Bode plots comes from the **asymptotic approximation** technique. Instead of calculating exact values, we:

1. Factor the transfer function into simple terms
2. Draw straight-line asymptotes for each term
3. Add the asymptotes (since we're using dB and log frequency)

This approach, developed by Bode himself, is remarkably accurate and reveals system structure at a glance.

### Bode Plot Construction Procedure

Given a transfer function $G(s)$:

**Step 1: Put in standard form**

Rewrite each factor in time-constant form:

- First-order pole: $\frac{1}{1 + s/\omega_c}$
- First-order zero: $1 + s/\omega_c$
- Second-order: $\frac{1}{1 + 2\zeta(s/\omega_n) + (s/\omega_n)^2}$

Extract the DC gain $K$ as a separate constant.

**Step 2: Identify all corner frequencies**

List all corner frequencies $\omega_c$ and $\omega_n$ in ascending order. Each corner marks where asymptotes change slope.

**Step 3: Draw the low-frequency asymptote**

Start from the leftmost part of the plot:

- Magnitude: Determined by DC gain and any integrators/differentiators
- Phase: Sum of phases from constant, integrators, differentiators

**Step 4: At each corner frequency, change the slope**

- First-order pole: decrease slope by 20 dB/decade, decrease phase by 90°
- First-order zero: increase slope by 20 dB/decade, increase phase by 90°
- Second-order pole: decrease slope by 40 dB/decade, decrease phase by 180°
- Second-order zero: increase slope by 40 dB/decade, increase phase by 180°

**Step 5: Apply corrections at corners**

The asymptotes are exactly right at low and high frequencies but deviate near corners:

- First-order: 3 dB error at corner
- Second-order: error depends on ζ (can be 0 to +14 dB for resonant peak)

### Construction Example

Construct the Bode plot for:

#### Construction Example Transfer Function

$G(s) = \frac{100(s + 10)}{s(s + 100)}$

**Step 1: Standard form**

$G(s) = \frac{100 \cdot 10 \cdot (1 + s/10)}{s \cdot 100 \cdot (1 + s/100)} = \frac{10(1 + s/10)}{s(1 + s/100)}$

DC gain effect: With factor of 10 at numerator and integrator, need to evaluate at a reference frequency.

Actually, let's be more systematic. At $\omega = 1$:

$|G(j1)| = \frac{100|1 + j0.1|}{|j1||1 + j0.01|} = \frac{100 \cdot 1.005}{1 \cdot 1.00005} \approx 100.5$

That's about 40 dB.

**Step 2: Corner frequencies**

- Zero at $\omega = 10$ rad/s
- Pole at $\omega = 100$ rad/s
- Integrator (pole at origin)

**Step 3: Low-frequency asymptote**

Due to integrator: slope of -20 dB/decade at low frequencies

At $\omega = 1$: magnitude ≈ 40 dB (from above)

**Step 4: Asymptote changes**

- At $\omega = 10$ (zero): slope changes from -20 to 0 dB/decade (zero adds +20)
- At $\omega = 100$ (pole): slope changes from 0 to -20 dB/decade (pole adds -20)

**Step 5: Phase**

- Low freq: -90° (integrator alone)
- At $\omega = 10$: zero adds +90°, transitioning to 0° at high frequency relative to zero
- At $\omega = 100$: pole adds -90°, transitioning to -90° total at high frequency

Net phase:

- Very low: -90°
- Between 10 and 100: transitioning through 0°
- Very high: back to -90° (integrator -90° + zero +90° + pole -90° = -90°)

#### Diagram: Bode Plot Construction Tool

<iframe src="../../sims/bode-construction/main.html" width="100%" height="700px" scrolling="no"></iframe>

<details markdown="1">
<summary>Bode Plot Construction Tool</summary>
Type: microsim

Bloom Taxonomy: Apply (L3)
Bloom Verb: construct, execute

Learning Objective: Students will construct complete Bode plots by combining contributions from individual factors, applying asymptotic rules systematically.

Canvas layout:
- Left (65%): Stacked magnitude and phase plots
- Right (35%): Factor breakdown and construction steps

Visual elements:
Magnitude Plot:
- Final composite asymptote (bold black)
- Individual factor contributions (colored, thinner)
- Exact curve (dashed, when shown)
- Corner frequencies marked on axis
- Slope labels on each segment

Phase Plot:
- Final composite phase (bold black)
- Individual factor contributions (colored)
- Exact curve (dashed)
- Transition regions marked

Factor Panel:
- List of factors with transfer function
- Color coding matching plot lines
- Slope contribution of each factor
- Phase contribution of each factor
- Checkboxes to show/hide each factor

Construction Steps:
- Step-by-step instructions
- Current step highlighted
- "Next" button to proceed

Interactive controls:
- Dropdown: Preset transfer functions
- Input: Custom transfer function entry
- Toggle: Show exact curve
- Toggle: Show individual factors
- Button: Step through construction
- Button: Auto-build (animate construction)
- Slider: Adjust gain

Data Visibility Requirements:
- Show transfer function in factored form
- Display corner frequencies in ascending order
- Show slope at each frequency region
- Display DC gain and asymptote starting point
- Show phase at key frequencies

Behavior:
- Factors can be added/removed interactively
- As construction proceeds, each factor's contribution added
- Composite builds up step by step
- Error between asymptotes and exact shown
- Construction history visible

Instructional Rationale: Building the composite plot from individual factors reinforces the superposition principle in logarithmic domain. Step-by-step construction with visible contributions develops procedural fluency.

Implementation: p5.js with transfer function parser and layered plotting
</details>

## Time Delay in Bode Plots

Physical systems often include pure time delays—the output is a delayed copy of a processed input. Transport delays in pipelines, computation delays in digital controllers, and signal propagation delays all fall into this category.

#### Time Delay Transfer Function

$G_d(s) = e^{-sT_d}$

where:

- $T_d$ is the delay time in seconds

Substituting $s = j\omega$:

$G_d(j\omega) = e^{-j\omega T_d}$

**Magnitude**: $|e^{-j\omega T_d}| = 1$ (0 dB at all frequencies)

**Phase**: $\angle e^{-j\omega T_d} = -\omega T_d$ radians = $-\omega T_d \cdot \frac{180°}{\pi}$ degrees

The time delay has no effect on magnitude but adds ever-increasing phase lag as frequency increases. This phase lag is linear with frequency on a linear plot but appears as a curve on the logarithmic Bode phase plot.

| Frequency | Phase Lag (for $T_d = 0.1$ s) |
|-----------|------------------------------|
| 1 rad/s | -5.7° |
| 10 rad/s | -57.3° |
| 31.4 rad/s ($\pi \omega$) | -180° |
| 100 rad/s | -573° |

!!! warning "Time Delay Impact on Stability"
    Time delay is the enemy of feedback control. The phase lag it introduces reduces phase margin, potentially destabilizing the system. A system that's perfectly stable with ideal sensors and actuators may become unstable when realistic delays are included. The Nyquist criterion (Chapter 13) handles delays elegantly.

## Bandwidth and Cutoff Frequency

The **bandwidth** of a system is the range of frequencies over which it responds effectively. For many systems, bandwidth is defined by the **cutoff frequency**—the frequency at which the magnitude drops to a specified level below its maximum.

#### Cutoff Frequency Definition

$\omega_c \text{ is where } |G(j\omega_c)| = \frac{|G|_{max}}{\sqrt{2}}$

where:

- $|G|_{max}$ is the maximum magnitude (often the DC gain)
- $\frac{1}{\sqrt{2}} \approx 0.707$, corresponding to -3 dB

The **-3 dB point** is also called the **half-power point** because power is proportional to magnitude squared:

$P \propto |G|^2$

At -3 dB: $|G|^2 = \frac{1}{2}|G|_{max}^2$

For a first-order low-pass system $G(s) = \frac{1}{1 + s/\omega_c}$:

- Bandwidth = corner frequency = $\omega_c$
- At $\omega_c$: magnitude is -3 dB below DC

For second-order systems, the relationship between bandwidth and natural frequency depends on damping:

#### Second-Order Bandwidth

$\omega_{BW} \approx \omega_n\sqrt{1 - 2\zeta^2 + \sqrt{4\zeta^4 - 4\zeta^2 + 2}}$

This formula is complex, but approximately:

- For $\zeta = 0.707$: $\omega_{BW} \approx \omega_n$
- For $\zeta < 0.707$: $\omega_{BW} > \omega_n$ (resonance extends bandwidth)
- For $\zeta > 0.707$: $\omega_{BW} < \omega_n$

| System Property | Effect on Bandwidth |
|-----------------|---------------------|
| Faster response | Higher bandwidth |
| Lower damping | Higher bandwidth (with resonance) |
| More poles | Lower bandwidth |
| Right-half zeros | Lower bandwidth |

!!! tip "Bandwidth and Speed"
    Bandwidth and rise time are inversely related. A rule of thumb:

    $\omega_{BW} \cdot t_r \approx 2$

    Doubling bandwidth roughly halves rise time. This connects frequency-domain and time-domain specifications.

## Filter Types: Low-Pass, High-Pass, Bandpass, Notch

Transfer functions can be classified by which frequency ranges they pass or attenuate. These classifications are most apparent from Bode plot shapes.

### Low-Pass System

A **low-pass filter** passes low frequencies and attenuates high frequencies.

#### Low-Pass Characteristics

- DC gain: finite, nonzero
- High-frequency gain: approaches zero
- Magnitude slope at high frequency: negative (-20, -40, or more dB/decade)

Examples:

- First-order: $G(s) = \frac{K}{1 + s/\omega_c}$
- Second-order: $G(s) = \frac{K\omega_n^2}{s^2 + 2\zeta\omega_n s + \omega_n^2}$

Low-pass systems smooth out rapid changes, filter noise, and integrate signals. Most physical systems are inherently low-pass because high-frequency energy is dissipated.

### High-Pass System

A **high-pass filter** attenuates low frequencies and passes high frequencies.

#### High-Pass Characteristics

- DC gain: zero
- High-frequency gain: finite, nonzero
- Magnitude slope at low frequency: positive (+20, +40, or more dB/decade)

Examples:

- First-order: $G(s) = \frac{Ks/\omega_c}{1 + s/\omega_c}$
- Second-order: $G(s) = \frac{Ks^2}{s^2 + 2\zeta\omega_n s + \omega_n^2}$

High-pass systems reject DC offsets and slow drifts, emphasize rapid changes, and differentiate signals. Washout filters in power system stabilizers are high-pass.

### Bandpass System

A **bandpass filter** passes a range of frequencies and attenuates both below and above that range.

#### Bandpass Characteristics

- DC gain: zero
- High-frequency gain: zero
- Peak gain: at the center frequency
- Bandwidth: width of the passband (typically at -3 dB points)

Example:

$G(s) = \frac{Ks/\omega_0}{(s/\omega_0)^2 + (1/Q)(s/\omega_0) + 1}$

where $\omega_0$ is the center frequency and $Q$ determines selectivity.

Bandpass filters isolate signals at specific frequencies. They're used in communication systems, resonant circuits, and vibration analysis.

### Notch Filter

A **notch filter** (band-reject filter) attenuates a specific frequency range while passing frequencies above and below.

#### Notch Filter Characteristics

- DC gain: finite, nonzero
- High-frequency gain: finite, nonzero
- Deep attenuation at notch frequency
- Sharp dip in magnitude response

Example:

$G(s) = \frac{(s/\omega_0)^2 + 1}{(s/\omega_0)^2 + (1/Q)(s/\omega_0) + 1}$

The numerator zeros are on the imaginary axis at $\pm j\omega_0$, creating complete attenuation at exactly $\omega_0$.

Notch filters remove unwanted tones or oscillations. A common application is eliminating 60 Hz power line interference.

| Filter Type | DC | High Freq | Peak Location |
|-------------|----|-----------|--------------:|
| Low-Pass | Pass | Reject | DC |
| High-Pass | Reject | Pass | High freq |
| Bandpass | Reject | Reject | Center freq |
| Notch | Pass | Pass | — (dip at notch) |

#### Diagram: Filter Types Comparison

<iframe src="../../sims/filter-types/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Filter Types Comparison</summary>
Type: microsim

Bloom Taxonomy: Understand (L2)
Bloom Verb: classify, compare

Learning Objective: Students will classify transfer functions as low-pass, high-pass, bandpass, or notch filters by examining their Bode plot characteristics.

Canvas layout:
- Top (50%): Bode magnitude plot showing all four filter types
- Bottom left (25%): Selected filter's time response to chirp signal
- Bottom right (25%): Filter selection and parameters

Visual elements:
Magnitude Plot:
- Low-pass curve (blue)
- High-pass curve (green)
- Bandpass curve (orange)
- Notch filter curve (purple)
- All on same axes for comparison
- Passband and stopband regions shaded for selected filter

Time Response:
- Input: chirp signal (frequency sweep)
- Output: showing filtering effect
- Clear visualization of which frequencies are passed/rejected

Parameter Panel:
- Selected filter type (radio buttons)
- Cutoff/center frequency slider
- Damping/Q slider
- Gain slider
- Transfer function displayed

Interactive controls:
- Radio: Select filter type (Low, High, Band, Notch)
- Slider: Center/cutoff frequency
- Slider: Q factor or damping
- Toggle: Show all filters simultaneously
- Button: Play chirp input
- Button: Reset to defaults

Data Visibility Requirements:
- Show transfer function for each type
- Display -3 dB frequencies (cutoff/bandwidth)
- Show peak value for bandpass, notch depth for notch
- Compare asymptotic slopes

Behavior:
- Selecting a filter highlights its curve
- Parameter changes update curves in real-time
- Chirp response animates through frequency range
- Q/damping affects selectivity/sharpness

Instructional Rationale: Side-by-side comparison reveals the distinctive "signatures" of each filter type. The chirp signal response demonstrates filtering action in a intuitive way.

Implementation: p5.js with multi-curve plotting and audio-style visualization
</details>

## Connecting Bode Plots to Time-Domain Response

Frequency response and time response are two views of the same system. Understanding their relationship helps you predict one from the other.

### Bandwidth and Rise Time

Faster systems have higher bandwidth. The approximate relationship:

#### Bandwidth-Rise Time Relationship

$t_r \approx \frac{2.2}{\omega_{BW}}$ (for first-order)

$t_r \approx \frac{1.8}{\omega_n}$ (for second-order with $\zeta = 0.707$)

### Resonance and Overshoot

Systems with resonant peaks in the Bode magnitude plot exhibit overshoot in the step response:

| Resonant Peak $M_r$ | Approximate Overshoot |
|--------------------|----------------------|
| 0 dB | 0% |
| 1.3 dB | 5% |
| 2.3 dB | 10% |
| 4.3 dB | 20% |
| 8 dB | 40% |

The frequency at the resonant peak corresponds roughly to the oscillation frequency in the step response.

### Phase and Delay

Low-frequency phase slope indicates effective time delay:

#### Group Delay

$\tau_g = -\frac{d\phi}{d\omega}$

where:

- $\tau_g$ is the group delay
- $\phi$ is the phase in radians
- $\omega$ is the frequency in rad/s

Systems with linear phase (constant group delay) preserve signal shape. Systems with nonlinear phase distort the shape of signals.

!!! quote "Gyra Moment"
    "When my engineers look at my Bode plot, they're also seeing my step response in disguise. My resonant peak at 3 rad/s? That's why I ring at about 3 rad/s when disturbed. My -3 dB bandwidth? That tells them roughly how fast I can track commands. The frequency domain and time domain are just two languages describing me."

## Summary: The Frequency Response Toolkit

You now have a complete toolkit for frequency-domain analysis:

**Core Concepts**:

- **Frequency response**: How a system responds to sinusoids at each frequency
- **Magnitude response**: Amplitude scaling factor $|G(j\omega)|$
- **Phase response**: Phase shift $\angle G(j\omega)$

**The Bode Plot**:

- Magnitude in dB vs. log frequency
- Phase in degrees vs. log frequency
- Built from asymptotic approximations of individual factors

**Key Frequency Points**:

| Point | Definition | Significance |
|-------|------------|--------------|
| Corner frequency $\omega_c$ | Where asymptotes intersect | Transition between regions |
| Cutoff frequency | -3 dB point | Bandwidth boundary |
| Resonant frequency $\omega_r$ | Magnitude peak | Maximum amplification |
| Crossover frequency | 0 dB crossing | Key for stability |

**Building Blocks**:

| Factor | Magnitude Effect | Phase Effect |
|--------|-----------------|--------------|
| Constant $K$ | Vertical shift by $20\log K$ | 0° (or 180° if $K<0$) |
| Integrator $1/s$ | -20 dB/decade, through 0 dB at ω=1 | -90° |
| Differentiator $s$ | +20 dB/decade, through 0 dB at ω=1 | +90° |
| First-order pole | -20 dB/decade above corner | -90° phase transition |
| First-order zero | +20 dB/decade above corner | +90° phase transition |
| Second-order pole | -40 dB/decade above corner, possible peak | -180° phase transition |
| Second-order zero | +40 dB/decade above corner, possible dip | +180° phase transition |
| Time delay | 0 dB (no effect) | Linear phase decrease with ω |

**Filter Classifications**:

- **Low-pass**: Passes DC, attenuates high frequencies
- **High-pass**: Blocks DC, passes high frequencies
- **Bandpass**: Passes a frequency range, blocks outside
- **Notch**: Blocks a specific frequency, passes others

## Connecting to What's Next

You've learned to visualize a system's frequency response through Bode plots. But the real power of frequency-domain analysis for control design lies in using these plots to assess stability margins and design controllers. In Chapter 13, we'll introduce:

- **Gain margin**: How much can gain increase before instability?
- **Phase margin**: How much additional phase lag is tolerable?
- **Nyquist stability criterion**: A rigorous frequency-domain stability test

The Bode plot already contains this stability information—you just need to know where to look. The gain margin is visible where the phase crosses -180°. The phase margin is visible where the magnitude crosses 0 dB. These connections will transform the Bode plot from a characterization tool into a design tool.

!!! quote "Helping Gyra"
    "You've learned to read my frequency portrait. At low frequencies, I follow commands with full fidelity. At my resonant frequency, I'm dangerously responsive—small inputs cause big reactions. At high frequencies, I'm deaf and sluggish. But here's what matters most: somewhere in between, I cross from being helpful to being harmful. That crossover—where my phase margin lives—determines whether I stay upright or oscillate out of control. You'll learn to read that boundary in the next chapter."

## Key Takeaways

This chapter has equipped you to analyze systems in the frequency domain:

- The **frequency response** $G(j\omega)$ is obtained by substituting $s = j\omega$ into the transfer function, describing how sinusoids are transformed.

- **Magnitude response** $|G(j\omega)|$ tells you the amplitude ratio; **phase response** $\angle G(j\omega)$ tells you the time shift.

- **Bode plots** display magnitude in decibels and phase in degrees versus logarithmic frequency. The logarithmic scales convert multiplication to addition.

- A **decade** is a factor of 10 in frequency; an **octave** is a factor of 2. Decibels: $|G|_{dB} = 20\log_{10}|G|$.

- **Asymptotic approximation** constructs Bode plots using straight-line segments. First-order factors change slope by 20 dB/decade and phase by 90°. Second-order factors change by 40 dB/decade and 180°.

- **Corner frequencies** mark where asymptotes change slope. At a first-order corner, the actual curve is 3 dB from the asymptotes.

- **Second-order factors** can have resonant peaks when $\zeta < 0.707$. The **quality factor** $Q = 1/(2\zeta)$ measures selectivity.

- **Bandwidth** is the -3 dB frequency range. It's inversely related to rise time: faster systems have higher bandwidth.

- **Filter types** are classified by which frequencies they pass: low-pass (DC), high-pass (high ω), bandpass (narrow range), notch (blocks narrow range).

- **Time delay** contributes no magnitude change but adds phase lag proportional to frequency, which is destabilizing.

??? question "Self-Check: Test Your Understanding"
    Before moving on, try these without peeking:

    1. A system has $G(s) = \frac{10}{s+10}$. What is the magnitude in dB at DC? At ω = 10 rad/s? At ω = 100 rad/s?

    2. For a system with a pole at s = -5 and a zero at s = -50, what is the high-frequency asymptote slope? What is the low-frequency asymptote?

    3. A second-order system has ζ = 0.3 and ωn = 10 rad/s. Approximately what is the resonant peak magnitude?

    4. A first-order system has a bandwidth of 100 rad/s. Approximately what is its rise time?

    5. A system has magnitude 5 dB at low frequency and -15 dB at high frequency, with a sharp dip to -40 dB at ω = 60 rad/s. What type of filter is this?

    Answers: (1) DC: 0 dB (gain = 10/10 = 1); ω = 10: -3 dB; ω = 100: -20 dB approximately. (2) High-freq: 0 dB/decade (pole and zero cancel), low-freq: 0 dB. (3) Mr ≈ 1/(2×0.3×√(1-0.09)) ≈ 1.75, so about +5 dB. (4) tr ≈ 2.2/100 = 22 ms. (5) Notch filter—passes low and high, attenuates at specific frequency.
