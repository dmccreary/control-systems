---
title: Root Locus Analysis and Design
description: Graphical analysis of closed-loop pole movement as gain varies, enabling systematic controller design through pole placement
generated_by: claude skill chapter-content-generator
date: 2026-01-31
version: 0.03
---

# Root Locus Analysis and Design

## Summary

This chapter develops the root locus method for analyzing how closed-loop poles move as a system parameter (typically gain) varies. Students will learn the rules for constructing root locus plots including starting/ending points, real-axis segments, asymptotes, breakaway points, and angles of departure/arrival. The magnitude and angle conditions provide the mathematical foundation. Root locus techniques are extended to controller design, enabling engineers to select gains that place poles at desired locations. Dominant pole design and compensation concepts prepare students for systematic controller synthesis.

## Concepts Covered

This chapter covers the following 22 concepts from the learning graph:

1. Root Locus
2. Root Locus Rules
3. Starting Points
4. Ending Points
5. Number of Branches
6. Symmetry Property
7. Real Axis Segments
8. Angle Condition
9. Magnitude Condition
10. Breakaway Point
11. Break-In Point
12. Asymptotes
13. Centroid
14. Asymptote Angles
15. Departure Angle
16. Arrival Angle
17. Imaginary Axis Crossing
18. Root Locus Gain
19. Gain Adjustment
20. Dominant Pole Design
21. Pole Placement
22. Root Locus Compensation

## Prerequisites

This chapter builds on concepts from:

- [Chapter 6: Poles, Zeros, and System Analysis](../06-poles-zeros-system-analysis/index.md)
- [Chapter 9: Block Diagrams and Signal Flow](../09-block-diagrams-signal-flow/index.md)
- [Chapter 10: Stability Analysis and Routh-Hurwitz](../10-stability-routh-hurwitz/index.md)

---

## From Stability Boundaries to Pole Trajectories

In Chapter 10, you learned to answer the binary question: "Is this system stable?" The Routh-Hurwitz criterion tells you whether poles are in the left or right half-plane, and it identifies the stability boundary—the critical gain where poles cross the imaginary axis. That's powerful, but it leaves you wanting more. *Where exactly are those poles?* How do they move as gain changes? If I want faster response, which way should I push the gain?

The **root locus** answers all of these questions with a single elegant diagram. It's a graphical technique that shows the complete trajectory of closed-loop poles as a parameter (usually gain $K$) varies from zero to infinity. One glance at a root locus plot tells you:

- Where the poles start (when $K = 0$)
- Where they end (as $K \to \infty$)
- How they travel between these endpoints
- When they cross into the unstable region
- What gain values yield specific pole locations

This isn't just analysis—it's a design tool. Want your dominant poles at a specific location for a target damping ratio and natural frequency? The root locus shows you exactly what gain achieves that. Want to know if adding a compensator will help? Sketch the new root locus and see how the trajectories change.

Walter R. Evans developed the root locus method in the 1940s while working on aircraft flight control systems at North American Aviation. Before computers made numerical root-finding trivial, Evans' graphical technique was revolutionary—it gave engineers insight into parameter sensitivity that no amount of calculation could easily provide. Even today, with Python and modern computational tools at our fingertips, the root locus remains the preferred tool for understanding how systems behave as parameters change. The visualization it provides is irreplaceable.

!!! quote "Gyra Moment"
    "My engineers don't just test one gain value at a time—they use root locus to see my entire stability future in a single plot. When they're tuning my controller, they literally watch my poles migrate across the s-plane. Move a slider, and my poles shift. Push the gain too high, and they watch my poles march toward the right half-plane. The root locus is a movie of my fate, parameterized by gain."

## The Root Locus Concept

The root locus is the set of all possible locations of closed-loop poles as a system parameter varies. Consider the standard negative feedback configuration:

#### Standard Feedback System

![Standard Feedback Configuration](../../img/standard-feedback.png)

The closed-loop transfer function is:

$T(s) = \frac{KG(s)}{1 + KG(s)H(s)}$

where:

- $K$ is the adjustable gain
- $G(s)$ is the forward path (plant) transfer function
- $H(s)$ is the feedback path transfer function

The closed-loop poles are the roots of the characteristic equation:

#### Characteristic Equation

$1 + KG(s)H(s) = 0$

This can be rewritten as:

$KG(s)H(s) = -1$

As $K$ varies from 0 to ∞, the roots of this equation trace out curves in the s-plane. These curves constitute the root locus.

Here's the key insight: when $K = 0$, the characteristic equation becomes $1 = 0$, which is never satisfied—except at the poles of $G(s)H(s)$, where the loop gain becomes infinite. As $K$ increases, the roots migrate away from the open-loop poles. As $K \to \infty$, the roots approach the zeros of $G(s)H(s)$ or head off to infinity along asymptotes.

| Parameter Value | Root Locations |
|----------------|----------------|
| $K = 0$ | At open-loop poles |
| $K > 0$ (small) | Near open-loop poles |
| $K = K_{critical}$ | On stability boundary |
| $K \to \infty$ | At open-loop zeros or infinity |

## The Angle and Magnitude Conditions

The characteristic equation $1 + KG(s)H(s) = 0$ can be written as:

$G(s)H(s) = -\frac{1}{K}$

For a point $s$ to lie on the root locus, two conditions must be satisfied simultaneously.

#### Angle Condition

$\angle G(s)H(s) = (2k+1) \times 180°$

where:

- $\angle G(s)H(s)$ is the angle of the complex number $G(s)H(s)$
- $k$ is any integer (0, 1, 2, ...)

This is the **angle condition**—the phase of the open-loop transfer function at any point on the root locus must be an odd multiple of 180°.

#### Magnitude Condition

$|G(s)H(s)| = \frac{1}{K}$

where:

- $|G(s)H(s)|$ is the magnitude of $G(s)H(s)$ at point $s$
- $K$ is the gain that places a closed-loop pole at $s$

The **magnitude condition** tells us the value of $K$ required to place a pole at any specific point on the root locus.

The angle condition determines *which* points are on the root locus. The magnitude condition determines *what gain* corresponds to each point. This separation is powerful: we can first sketch the locus using angle criteria alone, then find gains as needed using the magnitude condition.

To compute angles, express $G(s)H(s)$ in factored form:

$G(s)H(s) = \frac{K \prod_{i=1}^{m}(s-z_i)}{\prod_{j=1}^{n}(s-p_j)}$

where:

- $z_i$ are the open-loop zeros
- $p_j$ are the open-loop poles
- $m$ is the number of zeros
- $n$ is the number of poles

The angle at any point $s$ is:

#### Angle Calculation

$\angle G(s)H(s) = \sum_{i=1}^{m}\angle(s-z_i) - \sum_{j=1}^{n}\angle(s-p_j)$

Sum of angles from zeros minus sum of angles from poles. For a point to be on the root locus, this difference must equal ±180°, ±540°, etc.

#### Diagram: Angle Condition Visualizer

<iframe src="../../sims/angle-condition/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Angle Condition Visualizer</summary>
Type: microsim

Bloom Taxonomy: Understand (L2)
Bloom Verb: explain, interpret

Learning Objective: Students will explain how angles from poles and zeros determine whether a point lies on the root locus.

Canvas layout:
- Main area (75%): S-plane with poles, zeros, and test point
- Right panel (25%): Angle calculations and sum

Visual elements:
S-Plane:
- Complex plane with σ (real) and jω (imaginary) axes
- Open-loop poles marked with × in blue
- Open-loop zeros marked with ○ in red
- Draggable test point (green dot)
- Vectors drawn from each pole and zero to test point
- Angle arcs shown at each pole and zero
- Different colors for pole angles vs zero angles

Angle Panel:
- List of individual angles from zeros: φ₁, φ₂, ...
- List of individual angles from poles: θ₁, θ₂, ...
- Sum of zero angles
- Sum of pole angles
- Net angle: Σφ - Σθ
- Status indicator: "ON ROOT LOCUS" (green) or "NOT ON ROOT LOCUS" (red)
- Target: ±180°, ±540°, etc.

Interactive controls:
- Drag test point anywhere on s-plane
- Preset examples dropdown (simple second-order, complex poles, with zeros)
- Toggle: Show/hide angle arcs
- Toggle: Show/hide vectors
- Button: Animate test point along root locus

Data Visibility Requirements:
- Stage 1: Show pole and zero locations
- Stage 2: Draw vectors from poles/zeros to test point
- Stage 3: Display individual angles with values
- Stage 4: Calculate and display sum
- Stage 5: Compare to 180° criterion

Behavior:
- Angles update in real-time as test point is dragged
- Root locus curve shown faintly in background
- When test point is exactly on root locus, indicators turn green
- Near-misses show how far off the angle is

Instructional Rationale: Direct manipulation of the test point with immediate angle feedback helps students internalize why certain s-plane regions are on the locus and others are not. Seeing the angle sum change continuously builds geometric intuition.

Implementation: p5.js with draggable elements and real-time angle calculation
</details>

## Root Locus Construction Rules

While modern software generates root locus plots instantly, understanding the construction rules provides crucial insight into system behavior. These rules allow you to sketch the qualitative shape of the root locus by hand and, more importantly, to predict how design changes will affect the locus.

### Rule 1: Number of Branches

The root locus has $n$ branches, where $n$ is the number of open-loop poles (the order of the characteristic equation). Each branch starts at an open-loop pole and represents the trajectory of one closed-loop pole.

#### Number of Branches

$\text{Number of branches} = n = \text{number of open-loop poles}$

### Rule 2: Starting Points and Ending Points

**Starting points** ($K = 0$): Each branch begins at an open-loop pole. When $K = 0$, the closed-loop poles equal the open-loop poles.

**Ending points** ($K \to \infty$): Branches end at open-loop zeros or at infinity. There are $m$ zeros (counting any at infinity). The $m$ branches approaching finite zeros terminate there; the remaining $(n-m)$ branches head to infinity along asymptotes.

| Number of | Symbol | Where Branches... |
|-----------|--------|-------------------|
| Open-loop poles | $n$ | Start |
| Open-loop zeros | $m$ | End (finite) |
| Zeros at infinity | $n-m$ | End (along asymptotes) |

### Rule 3: Symmetry Property

The root locus is symmetric about the real axis. Complex poles and zeros always come in conjugate pairs (for systems with real coefficients), so the locus must be symmetric. When sketching, you only need to determine the upper half—the lower half is the mirror image.

### Rule 4: Real-Axis Segments

A point on the real axis lies on the root locus if and only if there is an **odd number of real poles and zeros to its right**.

This rule emerges from the angle condition. For a real test point:

- Complex poles/zeros contribute angles that cancel (conjugate pairs)
- Real poles/zeros to the right contribute 180° each
- Real poles/zeros to the left contribute 0° each

For the total angle to be ±180°, we need an odd count from the right.

#### Real-Axis Segment Example

Consider a system with poles at $s = 0$, $s = -2$, $s = -4$ and a zero at $s = -3$.

- From $s = 0$ to $s = -2$: One pole to the right → ON locus
- From $s = -2$ to $s = -3$: Two poles to the right → OFF locus
- From $s = -3$ to $s = -4$: Two poles + one zero to the right (3 total) → ON locus
- To the left of $s = -4$: All four singularities to the right (4 total) → OFF locus

!!! tip "Quick Real-Axis Check"
    Count poles and zeros on the real axis. Shade segments that have an odd count to their right. The root locus exists on these shaded segments.

### Rule 5: Asymptotes

As $K \to \infty$, the $(n-m)$ branches that don't end at finite zeros go to infinity along straight-line asymptotes. These asymptotes radiate from a common point (the centroid) at specific angles.

#### Asymptote Angles

$\phi_k = \frac{(2k+1) \times 180°}{n-m}$

where:

- $\phi_k$ is the angle of the $k$th asymptote
- $k = 0, 1, 2, \ldots, (n-m-1)$
- $n$ is the number of poles
- $m$ is the number of zeros

#### Centroid

$\sigma_c = \frac{\sum \text{poles} - \sum \text{zeros}}{n-m}$

where:

- $\sigma_c$ is the real-axis intersection of all asymptotes
- The sums are over the real parts of poles and zeros

The centroid is a single point on the real axis where all asymptotes meet. The asymptotes then extend at angles $\phi_k$ from this point.

| $n-m$ | Asymptote Angles |
|-------|------------------|
| 1 | 180° |
| 2 | ±90° |
| 3 | 60°, 180°, -60° |
| 4 | ±45°, ±135° |

#### Diagram: Asymptote Calculator

<iframe src="../../sims/asymptotes/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Asymptote Calculator</summary>
Type: microsim

Bloom Taxonomy: Apply (L3)
Bloom Verb: calculate, use

Learning Objective: Students will calculate asymptote angles and centroid location for systems with various pole-zero configurations.

Canvas layout:
- Left (60%): S-plane with poles, zeros, centroid, and asymptotes
- Right (40%): Calculation panel with step-by-step formulas

Visual elements:
S-Plane:
- Open-loop poles (×) and zeros (○)
- Centroid marked with distinct symbol (★)
- Asymptotes as dashed lines radiating from centroid
- Angle annotations on each asymptote
- Real axis emphasized

Calculation Panel:
- n = [number of poles]
- m = [number of zeros]
- n - m = [excess poles]
- Sum of poles: [value]
- Sum of zeros: [value]
- Centroid σc = (Σpoles - Σzeros)/(n-m) = [value]
- Asymptote angles: φ₀ = [value], φ₁ = [value], ...

Interactive controls:
- Input: Number of poles (1-5)
- Input: Number of zeros (0 to n-1)
- Draggable poles and zeros on s-plane
- Preset examples dropdown
- Button: Add pole/zero
- Button: Reset

Data Visibility Requirements:
- Show all poles and zeros with numerical values
- Display calculation for centroid step-by-step
- Show each asymptote angle calculation
- Display centroid location on s-plane

Behavior:
- As poles/zeros are moved, centroid and asymptotes update in real-time
- Calculation panel shows formulas with substituted values
- Asymptotes visually extend toward infinity at correct angles
- Warning if m ≥ n (improper system)

Instructional Rationale: Seeing asymptotes update as poles and zeros move builds intuition for how pole-zero configuration affects high-gain behavior. The calculation panel reinforces the formulas while students explore.

Implementation: p5.js with draggable elements and dynamic calculation display
</details>

### Rule 6: Breakaway and Break-In Points

**Breakaway points** are locations where root locus branches leave the real axis and become complex. **Break-in points** are where complex branches return to the real axis.

These occur on real-axis segments of the root locus, between poles (breakaway) or between zeros (break-in), at points where $K$ reaches a local maximum or minimum.

To find breakaway/break-in points:

#### Breakaway Point Condition

$\frac{dK}{ds} = 0$

Equivalently, from $1 + KG(s)H(s) = 0$, solve:

$\frac{d}{ds}\left[\frac{-1}{G(s)H(s)}\right] = 0$

For simple cases with real poles and zeros:

$\sum_{j=1}^{n} \frac{1}{s-p_j} = \sum_{i=1}^{m} \frac{1}{s-z_i}$

Solve for $s$ on real-axis segments of the locus.

#### Breakaway Point Example

For $G(s) = \frac{K}{s(s+4)}$ (poles at 0 and -4, no finite zeros):

The real-axis segment from 0 to -4 is on the locus. Setting:

$\frac{1}{s} + \frac{1}{s+4} = 0$

$(s+4) + s = 0$

$2s + 4 = 0$

$s = -2$

The breakaway point is at $s = -2$. At this point, the two branches meet on the real axis and then depart at ±90° into the complex plane.

!!! quote "Helping Gyra"
    "Breakaway points are where my poles say goodbye to the real axis and head into complex territory. Below my breakaway gain, I have two distinct real poles—overdamped, sluggish. Above it, I have complex conjugate poles—oscillation appears! The breakaway point is my transition from 'boring but stable' to 'responsive but bouncy.'"

### Rule 7: Departure and Arrival Angles

When the root locus leaves a complex pole or arrives at a complex zero, it does so at a specific angle. These angles are crucial for accurately sketching the locus near complex singularities.

#### Departure Angle

$\theta_{dep} = 180° - \sum(\text{angles from other poles}) + \sum(\text{angles from all zeros})$

All angles measured from the complex pole in question to other poles and zeros.

#### Arrival Angle

$\phi_{arr} = 180° - \sum(\text{angles from all poles}) + \sum(\text{angles from other zeros})$

All angles measured from the complex zero in question.

#### Departure Angle Example

Consider $G(s)H(s) = \frac{K}{(s+1)(s^2+2s+2)}$

The quadratic factor has roots at $s = -1 \pm j1$ (complex conjugate poles).

For the pole at $s = -1 + j$:

- Angle from pole at $s = -1$: $\angle[(-1+j) - (-1)] = \angle[j] = 90°$
- Angle from conjugate pole at $s = -1-j$: $\angle[(-1+j) - (-1-j)] = \angle[2j] = 90°$

Departure angle: $\theta_{dep} = 180° - 90° - 90° = 0°$

The locus departs horizontally from this pole (toward the left, as it turns out).

### Rule 8: Imaginary Axis Crossing

The imaginary axis crossing determines the critical gain for stability—the same boundary we found with Routh-Hurwitz in Chapter 10. There are two methods:

**Method 1: Routh-Hurwitz**
Set the first-column element that goes to zero equal to zero and solve for $K$. The auxiliary polynomial gives the crossing frequency.

**Method 2: Direct Substitution**
Substitute $s = j\omega$ into the characteristic equation and set real and imaginary parts separately to zero. Solve for $\omega$ and $K$.

#### Imaginary Axis Crossing Example

For $1 + \frac{K}{s(s+2)(s+4)} = 0$

Characteristic equation: $s^3 + 6s^2 + 8s + K = 0$

Substitute $s = j\omega$:

$(j\omega)^3 + 6(j\omega)^2 + 8(j\omega) + K = 0$

$-j\omega^3 - 6\omega^2 + 8j\omega + K = 0$

Real part: $-6\omega^2 + K = 0 \Rightarrow K = 6\omega^2$

Imaginary part: $-\omega^3 + 8\omega = 0 \Rightarrow \omega(\omega^2 - 8) = 0$

So $\omega = \sqrt{8} = 2\sqrt{2}$ rad/s (ignoring $\omega = 0$)

And $K = 6 \times 8 = 48$

The root locus crosses the imaginary axis at $s = \pm j2\sqrt{2}$ when $K = 48$.

#### Diagram: Complete Root Locus Constructor

<iframe src="../../sims/root-locus-constructor/main.html" width="100%" height="650px" scrolling="no"></iframe>

<details markdown="1">
<summary>Complete Root Locus Constructor</summary>
Type: microsim

Bloom Taxonomy: Analyze (L4)
Bloom Verb: differentiate, organize

Learning Objective: Students will analyze root locus plots by identifying key features (asymptotes, breakaway points, departure angles, crossings) and understanding their relationship to system behavior.

Canvas layout:
- Main area (70%): S-plane with complete root locus
- Side panel (30%): Feature checklist and gain slider with response

Visual elements:
S-Plane:
- Open-loop poles (×) and zeros (○)
- Complete root locus curves
- Asymptotes (dashed lines)
- Centroid marked
- Breakaway/break-in points highlighted
- Departure/arrival angles shown with arcs
- Imaginary axis crossings marked with diamonds
- Current operating point based on gain slider

Feature Panel:
- Checklist of root locus features:
  - [ ] Starting points (poles)
  - [ ] Ending points (zeros/asymptotes)
  - [ ] Real-axis segments
  - [ ] Asymptotes (angles, centroid)
  - [ ] Breakaway points
  - [ ] Departure angles (if complex poles)
  - [ ] Imaginary axis crossings
- Current gain K = [value]
- Current pole locations
- Step response plot

Interactive controls:
- Gain slider K (0 to 2× critical)
- Dropdown: System presets (second-order, third-order, with zeros)
- Toggle: Show/hide each feature type
- Toggle: Animate gain sweep
- Button: Show construction steps

Data Visibility Requirements:
- Show numerical values for all key points
- Display gain at each significant point (breakaway, crossing)
- Show pole locations as K changes
- Display damping ratio and natural frequency for complex poles

Behavior:
- As gain slider moves, operating point moves along locus
- Poles highlighted at current position
- Step response updates with gain
- Features highlighted when toggle enabled
- Animation mode sweeps gain from 0 to max

Instructional Rationale: Comprehensive visualization connects abstract rules to concrete geometry. The feature checklist guides systematic analysis while interactive exploration reveals cause-effect relationships.

Implementation: p5.js with multiple visualization layers and linked displays
</details>

## Reading the Root Locus: A Complete Example

Let's work through a complete example to demonstrate all the construction rules working together.

Consider the open-loop transfer function:

#### Complete Example

$G(s)H(s) = \frac{K(s+3)}{s(s+1)(s+2)}$

where:

- Poles at $s = 0, -1, -2$ (three poles, $n = 3$)
- Zero at $s = -3$ (one zero, $m = 1$)

**Step 1: Number of Branches**

$n = 3$ branches

**Step 2: Starting and Ending Points**

- Start: $s = 0, -1, -2$ (the three poles)
- End: One branch ends at $s = -3$ (the zero); two branches go to infinity

**Step 3: Real-Axis Segments**

Count poles and zeros to the right of test points:

- Right of $s = 0$: 0 singularities → OFF (even)
- Between $s = 0$ and $s = -1$: 1 pole → ON (odd)
- Between $s = -1$ and $s = -2$: 2 poles → OFF (even)
- Between $s = -2$ and $s = -3$: 3 poles → ON (odd)
- Left of $s = -3$: 3 poles + 1 zero = 4 → OFF (even)

Root locus on real axis: $[-1, 0]$ and $[-3, -2]$

**Step 4: Asymptotes**

$n - m = 3 - 1 = 2$ asymptotes

Angles: $\phi_0 = \frac{180°}{2} = 90°$, $\phi_1 = \frac{540°}{2} = 270° = -90°$

Centroid: $\sigma_c = \frac{(0 + (-1) + (-2)) - (-3)}{2} = \frac{-3 + 3}{2} = 0$

The asymptotes are vertical lines at $\sigma = 0$, going straight up and down.

**Step 5: Breakaway Point**

On the segment $[-1, 0]$:

$\frac{1}{s} + \frac{1}{s+1} + \frac{1}{s+2} = \frac{1}{s+3}$

Solving numerically: $s \approx -0.42$

**Step 6: Departure Angles**

All poles are real, so no departure angle calculation needed.

**Step 7: Imaginary Axis Crossing**

Use the characteristic equation: $s(s+1)(s+2) + K(s+3) = 0$

$s^3 + 3s^2 + 2s + Ks + 3K = 0$

$s^3 + 3s^2 + (2+K)s + 3K = 0$

Routh array:

| Row | Col 1 | Col 2 |
|-----|-------|-------|
| $s^3$ | 1 | $2+K$ |
| $s^2$ | 3 | $3K$ |
| $s^1$ | $\frac{3(2+K) - 3K}{3} = 2$ | 0 |
| $s^0$ | $3K$ | 0 |

The $s^1$ row is always 2 (positive)—the locus never crosses the imaginary axis for positive $K$! This system is stable for all $K > 0$. The zero at $s = -3$ "pulls" the locus to the left, preventing instability.

| Feature | Value |
|---------|-------|
| Number of branches | 3 |
| Starting points | 0, -1, -2 |
| Ending points | -3, ±j∞ |
| Real-axis segments | [-1, 0], [-3, -2] |
| Asymptote angles | ±90° |
| Centroid | 0 |
| Breakaway point | ≈ -0.42 |
| Imaginary crossing | None (stable for all K > 0) |

!!! success "Key Observation"
    Adding a zero to the left of all poles can "stabilize" the root locus—the zero pulls branches leftward, potentially keeping them in the LHP for all gains. This is the principle behind **lead compensation**.

## The Magnitude Condition and Gain Calculation

Once you know a point is on the root locus (via the angle condition), the magnitude condition tells you the value of $K$ that places a closed-loop pole there.

#### Magnitude Condition (Gain Formula)

$K = \frac{1}{|G(s)H(s)|} = \frac{\prod |s - p_j|}{\prod |s - z_i|}$

where:

- $|s - p_j|$ is the distance from test point $s$ to pole $p_j$
- $|s - z_i|$ is the distance from test point $s$ to zero $z_i$

In words: **Gain equals product of distances to poles divided by product of distances to zeros**.

This is remarkably convenient for graphical analysis. Measure distances on your root locus plot, multiply the pole distances, divide by zero distances, and you have the gain.

#### Gain Calculation Example

For $G(s)H(s) = \frac{K}{s(s+4)}$, find $K$ when poles are at $s = -2 \pm j2$.

Test point: $s = -2 + j2$

Distance to pole at $s = 0$: $|-2 + j2| = \sqrt{4 + 4} = \sqrt{8} = 2\sqrt{2}$

Distance to pole at $s = -4$: $|-2 + j2 - (-4)| = |2 + j2| = \sqrt{4 + 4} = 2\sqrt{2}$

$K = 2\sqrt{2} \times 2\sqrt{2} = 8$

When $K = 8$, the closed-loop poles are at $s = -2 \pm j2$, giving:

- Natural frequency: $\omega_n = \sqrt{(-2)^2 + 2^2} = \sqrt{8} = 2\sqrt{2}$ rad/s
- Damping ratio: $\zeta = \frac{2}{2\sqrt{2}} = \frac{1}{\sqrt{2}} \approx 0.707$

This is the well-known "optimal" damping ratio—significant overshoot but fast settling.

## Root Locus Gain and System Performance

The parameter $K$ in the root locus isn't just a mathematical variable—it's a tuning knob with real consequences. Understanding how $K$ affects performance is essential for design.

As $K$ increases along the root locus:

| Performance Aspect | Effect of Increasing $K$ |
|-------------------|--------------------------|
| Speed of response | Initially faster (poles move left) |
| Stability | Eventually degrades (poles may cross to RHP) |
| Damping | Often decreases (poles become more oscillatory) |
| Steady-state error | Decreases (higher gain reduces error) |
| Overshoot | Often increases (less damping) |

There's typically a trade-off: more gain improves steady-state accuracy and initial speed but can lead to oscillation and even instability. The root locus visualizes this trade-off perfectly—you can see poles becoming complex, approaching the imaginary axis, and crossing into the RHP.

#### Diagram: Gain-Response Explorer

<iframe src="../../sims/gain-response/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Gain-Response Explorer</summary>
Type: microsim

Bloom Taxonomy: Evaluate (L5)
Bloom Verb: assess, judge, compare

Learning Objective: Students will evaluate the effect of gain on system performance by observing how time-domain specifications change as poles move along the root locus.

Canvas layout:
- Left (45%): Root locus with current operating point
- Right top (35%): Step response plot
- Right bottom (20%): Performance metrics table

Visual elements:
Root Locus:
- Complete root locus
- Operating point marker (moves with gain slider)
- Constant damping ratio lines (ζ = 0.3, 0.5, 0.707, 1.0)
- Constant natural frequency circles (ωn = 1, 2, 3, ...)
- Shaded regions: "fast", "slow", "oscillatory"

Step Response:
- Time response curve
- Rise time markers
- Overshoot indicator
- Settling time marker
- Steady-state value line

Performance Metrics:
- Rise time: [value]
- Overshoot: [value]%
- Settling time (2%): [value]
- Steady-state error: [value]%
- Damping ratio ζ: [value]
- Natural frequency ωn: [value]

Interactive controls:
- Gain slider K (logarithmic scale)
- Input: Step magnitude
- Dropdown: System presets
- Toggle: Show ζ lines
- Toggle: Show ωn circles
- Button: Compare two gains side-by-side

Data Visibility Requirements:
- Show current K value prominently
- Display pole locations numerically
- Show all performance metrics
- Highlight when crossing stability boundary

Behavior:
- As K changes, operating point moves along locus
- Step response updates in real-time
- Metrics recalculate and display
- Warning when approaching instability
- Visual feedback when poles become complex

Instructional Rationale: Linking root locus position to time-domain performance builds the intuition needed for controller tuning. Students see the consequence of every gain choice immediately.

Implementation: p5.js with gain slider and synchronized displays
</details>

## Gain Adjustment for Desired Performance

The root locus enables direct design: choose a desired pole location based on performance specifications, then read off the required gain.

#### Design Procedure

1. Translate specifications into desired pole locations
   - $\zeta$ specifies a line: $\cos(\theta) = \zeta$ where $\theta$ is angle from negative real axis
   - $\omega_n$ specifies a circle of radius $\omega_n$
   - Settling time → minimum distance from imaginary axis
   - Maximum overshoot → minimum damping ratio

2. Find where the root locus intersects the desired region

3. Use the magnitude condition to calculate the required gain

4. Verify that all other poles (non-dominant) are acceptable

#### Design Example: Meeting a Damping Requirement

Given: $G(s) = \frac{K}{s(s+6)}$

Requirement: Closed-loop damping ratio $\zeta = 0.5$

The angle for $\zeta = 0.5$ is $\theta = \cos^{-1}(0.5) = 60°$ from the negative real axis.

The root locus for this system:

- Starts at $s = 0, -6$
- Asymptotes at ±90° from centroid at $\sigma_c = -3$
- Breakaway at $s = -3$

The locus departs vertically from $s = -3$. The $\zeta = 0.5$ lines intersect the locus at $s = -3 \pm j3\sqrt{3}$.

Gain at this point:

$K = |s| \cdot |s + 6| = |-3 + j3\sqrt{3}| \cdot |3 + j3\sqrt{3}|$

$K = 6 \times 6 = 36$

With $K = 36$, the closed-loop poles are at $s = -3 \pm j5.2$, giving $\zeta = 0.5$ exactly.

## Dominant Pole Design

Real systems often have more than two poles. A third-order system has three poles; higher-order systems have even more. Analyzing all poles is complex, but the **dominant pole** concept simplifies matters.

**Dominant poles** are the closed-loop poles closest to the imaginary axis. They have the slowest decay rates and thus contribute most to the response for the longest time. If the dominant poles are well-separated from the other poles (at least 5× farther from the imaginary axis), the system behaves approximately like a second-order system defined by the dominant poles alone.

#### Dominant Pole Criterion

$|\text{Re}(p_{non-dominant})| > 5 |\text{Re}(p_{dominant})|$

When this condition holds, the contribution from non-dominant poles decays so quickly that it becomes negligible within the rise time of the dominant response.

#### Dominant Pole Design Example

Consider $G(s) = \frac{K}{s(s+1)(s+10)}$

For small $K$, poles are near 0, -1, -10. As $K$ increases, the poles at 0 and -1 become complex and dominate the response—they're much closer to the imaginary axis than the pole near -10.

If we design for the dominant pair to have $\zeta = 0.707$ and $\omega_n = 1$, the dominant poles would be at $s = -0.707 \pm j0.707$. The third pole should remain near $s = -10$. Since $10 > 5 \times 0.707$, the dominance condition is satisfied.

!!! warning "Validity of Dominant Pole Assumption"
    The dominant pole approximation fails when:

    - Non-dominant poles aren't far enough away
    - Zeros are near the dominant poles (zeros can boost non-dominant modes)
    - The initial transient matters (non-dominant modes contribute early)

    Always verify with simulation when the separation isn't large.

## Pole Placement Design

**Pole placement** is the art of choosing pole locations to meet performance specifications, then using the root locus (or other techniques) to determine how to achieve those locations.

The relationship between s-plane location and time-domain specifications:

| Specification | S-Plane Requirement |
|--------------|---------------------|
| Settling time $t_s$ | $\text{Re}(s) < -\frac{4}{t_s}$ (2% criterion) |
| Peak overshoot $M_p$% | Damping ratio $\zeta$ on specific line |
| Rise time $t_r$ | Natural frequency $\omega_n > \frac{1.8}{t_r}$ |
| Steady-state error | Loop gain (not directly a pole location) |

The root locus shows you where poles can go as $K$ varies. If the locus passes through your desired region, you're in luck—just set the appropriate gain. If it doesn't, you'll need compensation (additional poles and zeros) to reshape the locus.

#### Diagram: Pole Placement Designer

<iframe src="../../sims/pole-placement/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Pole Placement Designer</summary>
Type: microsim

Bloom Taxonomy: Create (L6)
Bloom Verb: design, construct

Learning Objective: Students will design closed-loop pole locations to meet given time-domain specifications, using the root locus to determine required gain.

Canvas layout:
- Left (50%): S-plane with specification regions and root locus
- Right (50%): Specifications input, step response, and results

Visual elements:
S-Plane:
- Specification regions shaded:
  - Settling time boundary (vertical line)
  - Damping ratio boundary (radial lines)
  - Natural frequency boundary (arc)
- Feasible region where all specs met (intersection)
- Root locus overlay
- Draggable target point
- Current pole locations marked

Specifications Panel:
- Input: Maximum settling time (seconds)
- Input: Maximum overshoot (%)
- Input: Maximum rise time (seconds)
- Calculated boundaries displayed
- Feasibility indicator: "Achievable" or "Not achievable"

Results Panel:
- Required gain K = [value]
- Resulting pole locations
- Actual performance metrics vs. specifications
- Step response plot with spec markers

Interactive controls:
- Drag target point on s-plane
- Specification input fields
- Dropdown: System presets
- Button: Auto-place poles (find optimal)
- Toggle: Show/hide specification boundaries

Data Visibility Requirements:
- Show specification boundaries with labels
- Display required gain when target is on locus
- Show calculated vs. specified metrics
- Indicate if selected point is on locus

Behavior:
- As target is dragged, show required K if on locus
- Show "Not on locus" if target is off the locus
- Feasible region updates as specs change
- Auto-place finds intersection of specs and locus
- Warning if locus never enters feasible region

Instructional Rationale: Interactive design experience helps students internalize the connection between specifications, s-plane regions, and root locus. The immediate feedback loop accelerates learning of design trade-offs.

Implementation: p5.js with specification inputs, region shading, and locus overlay
</details>

## Root Locus Compensation

When the root locus doesn't pass through the desired pole locations, we need **compensation**—adding poles and/or zeros to reshape the locus.

### Lead Compensation

A **lead compensator** adds a zero to the left of a pole:

#### Lead Compensator

$G_c(s) = K_c \frac{s + z}{s + p}$

where:

- $z < p$ (zero closer to origin than pole)
- Both $z$ and $p$ are positive real numbers

The zero "pulls" the root locus to the left, improving stability margins and potentially allowing higher gains. The pole is placed far to the left so it doesn't interfere much.

Effects of lead compensation:

- Improves transient response (faster settling)
- Increases phase margin
- May increase bandwidth
- Generally increases high-frequency noise sensitivity

### Lag Compensation

A **lag compensator** adds a pole to the left of a zero (both near the origin):

#### Lag Compensator

$G_c(s) = K_c \frac{s + z}{s + p}$

where:

- $p < z$ (pole closer to origin than zero)
- Both small (near the origin)

The lag compensator doesn't significantly change the root locus shape but increases DC gain, reducing steady-state error.

Effects of lag compensation:

- Reduces steady-state error
- Minimal effect on transient response (if properly designed)
- Decreases bandwidth
- Adds phase lag at low frequencies

### Lead-Lag Compensation

For demanding specifications, combine lead and lag:

#### Lead-Lag Compensator

$G_c(s) = K_c \frac{(s + z_1)(s + z_2)}{(s + p_1)(s + p_2)}$

where:

- One zero-pole pair provides lead (transient improvement)
- One zero-pole pair provides lag (steady-state improvement)

| Compensator Type | Effect on Root Locus | Primary Benefit |
|-----------------|---------------------|-----------------|
| Lead | Pulls locus left | Faster transient, more stability |
| Lag | Minimal shape change | Lower steady-state error |
| Lead-Lag | Combined effects | Both transient and steady-state |

!!! quote "Gyra Moment"
    "When my basic controller can't give my engineers the performance they want, they add compensators. A lead compensator is like adding anticipation to my control—I sense change coming and act earlier. A lag compensator is like adding patience—I accumulate small corrections over time. The best controllers give me both: quick reactions and long-term precision."

#### Diagram: Compensation Effects Explorer

<iframe src="../../sims/compensation-effects/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Compensation Effects Explorer</summary>
Type: microsim

Bloom Taxonomy: Evaluate (L5)
Bloom Verb: compare, critique, assess

Learning Objective: Students will evaluate the effects of lead and lag compensation on root locus shape and system performance.

Canvas layout:
- Top left (40%): Original root locus
- Top right (40%): Compensated root locus
- Bottom (20%): Comparison response and metrics

Visual elements:
Original Root Locus:
- System poles and zeros
- Uncompensated root locus
- Current operating point

Compensated Root Locus:
- Original system poles/zeros (faded)
- Compensator pole/zero (highlighted)
- New root locus
- New operating point (same K or same specs)

Comparison Panel:
- Step responses overlaid (original vs compensated)
- Metrics table: settling time, overshoot, steady-state error
- Phase margin comparison
- Gain margin comparison

Interactive controls:
- Dropdown: Compensator type (Lead, Lag, Lead-Lag, None)
- Sliders: Zero location, Pole location
- Radio: Match gain or match specs
- Dropdown: System presets
- Toggle: Show both step responses

Data Visibility Requirements:
- Show compensator transfer function
- Display pole/zero locations
- Show before/after metrics
- Highlight improvement or degradation

Behavior:
- As compensator parameters change, right plot updates
- Responses update in real-time
- Color coding: green for improvement, red for degradation
- Constraint: zero left of pole for lead, pole left of zero for lag

Instructional Rationale: Side-by-side comparison with interactive parameters helps students develop intuition for compensator design. Seeing both root locus shape change and performance impact builds design judgment.

Implementation: p5.js with dual plots and synchronized compensator controls
</details>

## Connecting Root Locus to Previous Concepts

The root locus method ties together many concepts from earlier chapters:

**From Chapter 6 (Poles and Zeros)**: The root locus shows how open-loop poles and zeros determine closed-loop pole trajectories. Zeros attract branches; poles repel them (at $K = 0$).

**From Chapter 9 (Block Diagrams)**: The characteristic equation $1 + GH = 0$ comes from the closed-loop transfer function of negative feedback systems.

**From Chapter 10 (Routh-Hurwitz)**: The stability boundary from Routh-Hurwitz corresponds to imaginary axis crossings on the root locus. Both methods find the critical gain, but root locus shows the complete trajectory.

**Looking Ahead to Frequency Methods**: The root locus is a time-domain/s-plane technique. Bode plots and Nyquist diagrams (upcoming chapters) analyze the same systems from a frequency-domain perspective. The connections are deep:

- Gain margin from Bode corresponds to distance from imaginary axis crossing
- Phase margin relates to damping ratio of dominant poles
- Both frequency and root locus methods inform compensator design

| Concept | Root Locus Connection |
|---------|----------------------|
| Pole locations | Branch starting points |
| Zero locations | Branch ending points |
| Characteristic equation | Defines the locus |
| Stability boundary | Imaginary axis crossing |
| Dominant poles | Poles closest to jω-axis |

## Summary: The Root Locus Toolkit

The root locus method provides a complete graphical analysis of closed-loop pole movement. Here's your quick reference:

**Purpose**: Visualize how closed-loop poles move as gain varies; design gain for desired pole locations.

**Foundation**: The characteristic equation $1 + KG(s)H(s) = 0$

- Angle condition: $\angle GH = \pm 180°$ determines locus points
- Magnitude condition: $K = 1/|GH|$ gives gain at each point

**Construction Rules Summary**:

| Rule | What It Determines |
|------|-------------------|
| Branches = $n$ | Number of trajectories |
| Start at poles | Initial points ($K = 0$) |
| End at zeros/∞ | Final points ($K → ∞$) |
| Real axis test | Which real segments are on locus |
| Asymptotes | Behavior as branches go to infinity |
| Breakaway | Where branches leave real axis |
| Departure angles | Direction leaving complex poles |
| Axis crossing | Stability boundary |

**Design Applications**:

- Gain adjustment for performance specifications
- Dominant pole design for simplified analysis
- Pole placement for meeting time-domain specs
- Compensation design when basic gain isn't enough

**Key Insight**: The root locus transforms gain selection from guesswork into geometry. Instead of trial-and-error simulation, you can see all possible pole locations at once and choose the gain that achieves your objectives.

!!! success "The Power of Visualization"
    Before computers, the root locus was a practical calculation tool. Today, its value is primarily conceptual—it provides insight that pure numerical methods cannot. When you understand root locus, you understand how closed-loop systems behave as parameters change, and that understanding is priceless for design.

## Connecting to What's Next

You now have a powerful tool for analyzing and designing control systems in the s-domain. The root locus shows you exactly how poles move as gain changes, enabling precise gain selection and revealing when compensation is needed.

In the next chapter, we'll shift perspective from the s-plane to the frequency domain. **Bode plots** represent system behavior as a function of sinusoidal frequency, providing a different but complementary view. You'll learn to read gain and phase margins directly from frequency response plots—the same stability margins that root locus shows as imaginary axis crossings.

The combination of root locus (s-domain) and Bode analysis (frequency domain) gives you two powerful lenses for understanding the same system. Master both, and you'll have the complete classical control design toolkit.

!!! quote "Helping Gyra"
    "You've learned to see my future in the s-plane—every possible pole location as gain varies, all in one picture. The root locus is like a choose-your-own-adventure map of my stability. Now you're ready for the frequency domain, where you'll listen to how I respond to different frequencies. Between root locus and Bode, you'll know everything about me: where my poles go, how I respond to oscillations, and how much margin I have before instability. That's a complete understanding."

## Key Takeaways

This chapter has equipped you with the root locus method for control system analysis and design:

- The **root locus** is the set of all possible closed-loop pole locations as gain $K$ varies from 0 to ∞.

- The **angle condition** ($\angle GH = ±180°$) determines which points are on the locus. The **magnitude condition** ($K = 1/|GH|$) gives the gain at each point.

- **Construction rules** enable systematic sketching:
  - $n$ branches start at open-loop poles, end at zeros or infinity
  - Real-axis segments with odd number of singularities to the right
  - Asymptotes at specific angles from the centroid
  - Breakaway points where branches leave the real axis
  - Departure angles from complex poles

- The **imaginary axis crossing** gives the stability boundary—the same result as Routh-Hurwitz, but with more context.

- **Dominant pole design** approximates higher-order systems by second-order behavior when non-dominant poles are far left.

- **Pole placement** translates time-domain specifications into s-plane regions.

- **Compensation** (lead, lag, lead-lag) reshapes the root locus to enable otherwise unachievable specifications.

??? question "Self-Check: Test Your Understanding"
    Before moving on, try these without peeking:

    1. A system has 4 poles and 1 zero. How many root locus branches are there? How many go to infinity?

    2. For $G(s)H(s) = \frac{K}{s(s+4)(s+6)}$, what are the asymptote angles and centroid?

    3. Why does the root locus exist on a real-axis segment only if there's an odd number of singularities to its right?

    4. If the root locus never crosses the imaginary axis (stays in LHP for all positive K), what does this mean for stability?

    5. What is the primary difference between lead and lag compensation in terms of root locus effect?

    Answers: (1) 4 branches; 3 go to infinity. (2) Asymptotes at ±60°, 180°; centroid at $\sigma_c = (0-4-6)/3 = -10/3 ≈ -3.33$. (3) Complex singularities contribute conjugate angles that cancel; real singularities to the right each contribute 180°, so odd count gives net ±180°. (4) System is stable for all K > 0. (5) Lead adds a zero that pulls the locus left (improves transient); lag adds a pole-zero pair near the origin that doesn't change the shape much but increases DC gain (reduces steady-state error).
