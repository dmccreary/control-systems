---
title: Stability Analysis and the Routh-Hurwitz Criterion
description: Understanding stability definitions and using the Routh-Hurwitz criterion to determine system stability without computing poles
generated_by: claude skill chapter-content-generator
date: 2026-01-31
version: 0.03
---

# Stability Analysis and the Routh-Hurwitz Criterion

## Summary

This chapter introduces the critical concept of stability in feedback control systems. Students will learn multiple stability definitions including BIBO (bounded-input, bounded-output), asymptotic, and marginal stability, and understand how these relate to pole locations. The characteristic equation and polynomial are developed as tools for stability analysis. The Routh-Hurwitz criterion provides an algebraic method to determine stability without solving for poles directly. Special cases including zeros in the first column and rows of zeros are addressed. Relative stability concepts introduce the idea that some stable systems are more stable than others.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

1. Stability
2. BIBO Stability
3. Internal Stability
4. Asymptotic Stability
5. Marginal Stability
6. Unstable System
7. Bounded Input
8. Bounded Output
9. Characteristic Equation
10. Characteristic Polynomial
11. Characteristic Roots
12. Routh-Hurwitz Criterion
13. Routh Array
14. Routh Array Construction
15. Special Cases Routh
16. Zero in First Column
17. Row of Zeros
18. Auxiliary Polynomial
19. Stability Boundary
20. Relative Stability

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Introduction to Control Systems](../01-intro-to-control-systems/index.md)
- [Chapter 4: Transient Response Specifications](../04-transient-response-specs/index.md)
- [Chapter 6: Poles, Zeros, and System Analysis](../06-poles-zeros-system-analysis/index.md)
- [Chapter 9: Block Diagrams and Signal Flow](../09-block-diagrams-signal-flow/index.md)

---

## The Question Every Engineer Must Answer

Before you optimize a system's speed, before you minimize overshoot, before you worry about steady-state error—you must answer one fundamental question: **Will this system blow up?**

Stability isn't just one of many design requirements; it's the prerequisite for all other requirements to matter. An unstable control system is worse than useless—it's actively dangerous. Rockets explode, robots run away, chemical plants catch fire, power grids collapse. The mathematics of stability analysis isn't abstract theory; it's the engineer's first line of defense against catastrophe.

In Chapter 6, we learned that poles in the right half-plane (RHP) cause exponential growth—instability. That insight is powerful, but it comes with a practical problem: finding pole locations requires solving polynomial equations, and for polynomials of degree 5 or higher, there's no general closed-form solution. What do we do when we can't find the poles?

Enter the **Routh-Hurwitz criterion**—an elegant algebraic test that determines stability without ever finding the poles themselves. By the end of this chapter, you'll be able to check stability for systems of any order using only arithmetic, determine how many poles are in the RHP, find stability boundaries as functions of controller parameters, and handle the special cases that arise in practice.

This is one of the most useful tools in your control engineering toolkit.

## What Is Stability?

The word "stability" gets used loosely in everyday language—a "stable" relationship, a "stable" economy. In control systems, we need precise definitions. A system's stability tells us whether its response to disturbances will eventually die out or grow without bound.

Consider Gyra trying to balance. If she leans slightly forward and her controller brings her back to vertical, she's stable. If a small lean causes her to fall over completely, she's unstable. If she wobbles forever at constant amplitude, she's marginally stable. These everyday observations correspond to mathematical definitions we'll now make precise.

!!! quote "Gyra Moment"
    "Stability is my existential question. Every millisecond, my controller asks: 'Will this disturbance die out, or will it grow until I crash?' The math you're learning is the same math running inside me, deciding 50 times per second whether I'm about to fall."

## Bounded Input and Bounded Output

Before defining stability formally, we need to clarify what "bounded" means.

A **bounded input** is a signal that remains finite for all time. Mathematically:

#### Bounded Input Definition

$|u(t)| \leq M_u < \infty \text{ for all } t \geq 0$

where:

- $u(t)$ is the input signal
- $M_u$ is some finite constant

Common bounded inputs include:

- Step functions
- Sinusoids
- Any signal that doesn't grow to infinity

A **bounded output** follows the same pattern—a signal that remains finite:

#### Bounded Output Definition

$|y(t)| \leq M_y < \infty \text{ for all } t \geq 0$

where:

- $y(t)$ is the output signal
- $M_y$ is some finite constant

| Signal Type | Bounded? | Reason |
|-------------|----------|--------|
| Step: $u(t) = 1$ | Yes | Constant, finite |
| Sine: $u(t) = \sin(\omega t)$ | Yes | Always between -1 and 1 |
| Ramp: $u(t) = t$ | No | Grows without bound |
| Exponential: $u(t) = e^{t}$ | No | Grows without bound |
| Decaying: $u(t) = e^{-t}$ | Yes | Decays to zero |

Understanding boundedness is essential because stability definitions revolve around the relationship between bounded inputs and bounded outputs.

## BIBO Stability: The Input-Output View

**BIBO stability** (Bounded-Input, Bounded-Output stability) is the most intuitive stability definition. A system is BIBO stable if every bounded input produces a bounded output.

#### BIBO Stability Definition

A system is BIBO stable if and only if:

For every bounded input $u(t)$, the output $y(t)$ is also bounded.

This is an input-output view of stability—we only care about what goes in and what comes out. We don't look "inside" the system at internal state variables.

For linear time-invariant (LTI) systems described by transfer functions, BIBO stability has a clean characterization:

!!! success "BIBO Stability Criterion"
    A transfer function $G(s)$ is BIBO stable if and only if all its poles have negative real parts—that is, all poles lie in the open left half-plane (LHP).

This connects directly to what we learned in Chapter 6. Each pole contributes a mode to the response:

- LHP poles → decaying modes → bounded contributions
- RHP poles → growing modes → unbounded contributions
- Imaginary axis poles → sustained oscillations → potentially unbounded

The "potentially" for imaginary axis poles depends on the input. If the input contains the same frequency as an imaginary axis pole, resonance can cause unbounded growth. This is why we exclude the imaginary axis from the stable region.

| Pole Location | BIBO Stable? | Time Response |
|---------------|--------------|---------------|
| All in LHP | Yes | All modes decay |
| Any in RHP | No | At least one mode grows |
| Any on imaginary axis | No | Sustained or growing oscillation |

## Asymptotic Stability: Eventually Settling Down

**Asymptotic stability** looks at what happens to the system's response as time goes to infinity, specifically starting from any initial condition with zero input.

#### Asymptotic Stability Definition

A system is asymptotically stable if:

$\lim_{t \to \infty} y(t) = 0$

for any initial conditions and zero input.

In words: disturb the system from equilibrium and then leave it alone. If it returns to equilibrium, it's asymptotically stable.

For LTI systems, asymptotic stability and BIBO stability are essentially equivalent when the transfer function captures all system dynamics. A system is asymptotically stable if and only if all poles are in the open LHP.

The intuition: asymptotic stability means all natural modes decay. Since the natural modes correspond to poles, all poles must be in the LHP where exponential decay occurs.

## Marginal Stability: The Edge Case

**Marginal stability** (also called critical stability) describes systems that neither settle down nor blow up—they sit on the boundary between stability and instability.

#### Marginal Stability Definition

A system is marginally stable if:

- The output remains bounded for bounded inputs (no growth)
- The output does not decay to zero (no settling)

For LTI systems, marginal stability occurs when:

- All poles are in the LHP or on the imaginary axis
- Poles on the imaginary axis are simple (not repeated)

A pole at $s = j\omega$ produces a sustained sinusoid at frequency $\omega$. A pole at $s = 0$ produces a constant offset. These don't decay, but they don't grow either—as long as they're simple poles.

| Pole Configuration | Stability Type |
|-------------------|----------------|
| All poles strictly in LHP | Asymptotically stable |
| Simple poles on imaginary axis, none in RHP | Marginally stable |
| Repeated poles on imaginary axis | Unstable |
| Any pole in RHP | Unstable |

!!! warning "Marginal Stability Is Fragile"
    Marginally stable systems are theoretical idealizations. In practice, friction, resistance, or any tiny perturbation pushes the poles slightly left (stable) or right (unstable). A "marginally stable" design is living dangerously—the slightest model error can tip it either way.

## Internal Stability: Looking Inside

**Internal stability** goes beyond input-output behavior to examine what happens to all internal state variables. A system can be BIBO stable (bounded output for bounded input) while having internal variables that grow without bound—a dangerous hidden instability.

This can happen when unstable poles are cancelled by zeros in the transfer function. Consider:

#### Hidden Instability Example

$G(s) = \frac{s - 2}{(s + 1)(s - 2)} = \frac{1}{s + 1}$

The transfer function simplifies to a stable first-order system. But the pole at $s = +2$ still exists in the original system—it's just invisible in the input-output relationship. Any disturbance or initial condition can excite this hidden mode, causing an internal state to grow exponentially while the output appears well-behaved.

A system is **internally stable** if all modes decay, including those cancelled by zeros. For practical control design:

!!! danger "Never Cancel Unstable Poles"
    Attempting to stabilize a system by placing a controller zero on an unstable pole creates internal instability. The output may look fine, but internal state variables are growing exponentially. Eventually, something will saturate, the model will break down, and failure will occur suddenly and catastrophically.

## Unstable Systems: When Things Go Wrong

An **unstable system** is one that fails the stability test—its response grows without bound for some bounded input or some initial condition. For LTI systems, instability means at least one pole is in the right half-plane or a repeated pole is on the imaginary axis.

The consequences of instability depend on the application:

- **Mechanical systems**: Excessive vibration, structural failure
- **Electrical systems**: Component burnout, circuit destruction
- **Aerospace**: Loss of vehicle, crash
- **Chemical processes**: Runaway reactions, explosions
- **Thermal systems**: Overheating, fires

!!! quote "Helping Gyra"
    "When I'm unstable, it starts small—a tiny wobble I can't quite correct. But exponential growth is relentless. That wobble doubles, then doubles again. Within a fraction of a second, I'm past the point of no return, falling with increasing speed until I hit the floor. Stability margin isn't just a number; it's my margin for survival."

The study of stability isn't about avoiding minor inconveniences—it's about preventing catastrophic failure. This is why stability analysis comes before any other design consideration.

## The Characteristic Equation and Polynomial

The **characteristic polynomial** is the denominator of the closed-loop transfer function, and the **characteristic equation** is that polynomial set equal to zero.

For a transfer function:

#### Characteristic Polynomial

$G(s) = \frac{N(s)}{D(s)}$

The characteristic polynomial is $D(s)$, and the characteristic equation is:

$D(s) = 0$

For a standard negative feedback system with forward gain $G(s)$ and feedback $H(s)$:

#### Closed-Loop Characteristic Equation

$1 + G(s)H(s) = 0$

Rearranging: the characteristic polynomial is the numerator of $1 + G(s)H(s)$ after combining over a common denominator.

The **characteristic roots** are the solutions to the characteristic equation—these are the closed-loop poles. The stability of the system depends entirely on the locations of these roots.

Consider a closed-loop system with:

$G(s) = \frac{K}{s(s+2)(s+5)}$, $H(s) = 1$

The characteristic equation is:

$1 + G(s)H(s) = 1 + \frac{K}{s(s+2)(s+5)} = 0$

Multiplying through:

$s(s+2)(s+5) + K = 0$

$s^3 + 7s^2 + 10s + K = 0$

This is a cubic polynomial. For small $K$, the roots are near $s = 0, -2, -5$ (stable). As $K$ increases, the roots move. At some critical $K$, roots may cross into the RHP, causing instability. The Routh-Hurwitz criterion will tell us exactly when.

| Component | Definition |
|-----------|------------|
| Characteristic polynomial | Denominator $D(s)$ of closed-loop transfer function |
| Characteristic equation | $D(s) = 0$ |
| Characteristic roots | Solutions to characteristic equation (closed-loop poles) |

## Why We Need the Routh-Hurwitz Criterion

You might wonder: if stability depends on pole locations, why not just find the poles? Here's the problem: there's no general formula for finding roots of polynomials of degree 5 or higher. This is a fundamental mathematical limitation proved in the 19th century (the Abel-Ruffini theorem).

Even for polynomials where we can find roots:

- The algebra becomes tedious for degree 3 and 4
- Symbolic solutions become unwieldy
- We often care about stability boundaries in terms of parameters (like gain $K$), not specific pole values

The **Routh-Hurwitz criterion** provides an elegant solution: determine whether all roots of a polynomial are in the left half-plane using only the polynomial coefficients—no root finding required.

The criterion was developed independently by Edward Routh (1877) and Adolf Hurwitz (1895). Routh's approach uses a tabular method (the Routh array), while Hurwitz used determinants. The results are equivalent; we'll focus on the Routh array because it's more practical for hand calculation.

#### Diagram: Stability Analysis Timeline

<iframe src="../../sims/stability-timeline/main.html" width="100%" height="350px" scrolling="no"></iframe>

<details markdown="1">
<summary>Stability Analysis Timeline</summary>
Type: timeline

Bloom Taxonomy: Remember (L1)
Bloom Verb: recall, identify

Learning Objective: Students will recall the historical development of stability analysis methods.

Time period: 1850-1900

Orientation: Horizontal

Events:
- 1868: James Clerk Maxwell publishes "On Governors" analyzing steam engine regulation
- 1877: Edward Routh develops tabular stability criterion, wins Adams Prize
- 1890: A.M. Lyapunov develops general stability theory
- 1895: Adolf Hurwitz independently develops determinant-based criterion

Visual style: Horizontal timeline with portraits and key publications

Color coding:
- Blue: Routh's contribution
- Green: Hurwitz's contribution
- Gray: Related developments

Interactive features:
- Hover over events to see brief descriptions
- Click for expanded historical context

Implementation: HTML/CSS/JavaScript
</details>

## The Routh-Hurwitz Criterion

The **Routh-Hurwitz criterion** states conditions under which a polynomial has all roots in the left half-plane. Given a polynomial:

#### General Polynomial Form

$D(s) = a_n s^n + a_{n-1} s^{n-1} + \cdots + a_1 s + a_0$

where:

- $a_n > 0$ (leading coefficient positive)
- All $a_i$ are real

The criterion has two parts:

**Necessary Condition**: All coefficients $a_i$ must be positive (assuming $a_n > 0$). If any coefficient is zero, negative, or missing, the system is either unstable or marginally stable.

**Necessary and Sufficient Condition**: Construct the Routh array from the coefficients. All elements in the first column of the Routh array must be positive.

!!! tip "Necessary vs. Sufficient"
    The "all coefficients positive" test is necessary but not sufficient. A polynomial can have all positive coefficients but still be unstable. The full Routh array test is both necessary and sufficient—it gives a definitive answer.

For a second-order polynomial $as^2 + bs + c$, the necessary condition (all positive coefficients) is also sufficient. For third-order and higher, we need the Routh array.

## Routh Array Construction

The **Routh array** is a triangular table built from polynomial coefficients. The number of sign changes in the first column equals the number of roots in the right half-plane.

Given a polynomial of degree $n$:

$D(s) = a_n s^n + a_{n-1} s^{n-1} + \cdots + a_1 s + a_0$

The Routh array has $n+1$ rows, labeled from $s^n$ down to $s^0$.

#### Routh Array Structure

**First two rows** come directly from the polynomial coefficients:

- Row $s^n$: $a_n$, $a_{n-2}$, $a_{n-4}$, ... (even-indexed from the top)
- Row $s^{n-1}$: $a_{n-1}$, $a_{n-3}$, $a_{n-5}$, ... (odd-indexed from the top)

**Subsequent rows** are calculated using a determinant-like formula:

For row $s^{n-2}$ and beyond, each element is:

$\text{element} = -\frac{1}{\text{pivot}} \begin{vmatrix} \text{first column entry above} & \text{column entry above} \\ \text{first column entry two above} & \text{column entry two above} \end{vmatrix}$

Or more simply:

$b_1 = \frac{a_{n-1} a_{n-2} - a_n a_{n-3}}{a_{n-1}}$

Let's construct the array for a fourth-order polynomial:

$D(s) = a_4 s^4 + a_3 s^3 + a_2 s^2 + a_1 s + a_0$

| Row | Column 1 | Column 2 | Column 3 |
|-----|----------|----------|----------|
| $s^4$ | $a_4$ | $a_2$ | $a_0$ |
| $s^3$ | $a_3$ | $a_1$ | 0 |
| $s^2$ | $b_1 = \frac{a_3 a_2 - a_4 a_1}{a_3}$ | $b_2 = \frac{a_3 a_0 - a_4 \cdot 0}{a_3} = a_0$ | 0 |
| $s^1$ | $c_1 = \frac{b_1 a_1 - a_3 b_2}{b_1}$ | 0 | 0 |
| $s^0$ | $a_0$ | 0 | 0 |

The first column is what matters: $a_4, a_3, b_1, c_1, a_0$.

!!! success "Routh-Hurwitz Stability Test"
    **The number of sign changes in the first column of the Routh array equals the number of roots in the right half-plane.** For stability, all first-column elements must be positive (no sign changes).

#### Diagram: Routh Array Constructor

<iframe src="../../sims/routh-array-constructor/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Routh Array Constructor</summary>
Type: microsim

Bloom Taxonomy: Apply (L3)
Bloom Verb: execute, calculate

Learning Objective: Students will construct Routh arrays from polynomial coefficients and determine stability by counting sign changes.

Canvas layout:
- Top (40%): Coefficient input area and polynomial display
- Bottom (60%): Routh array with step-by-step construction

Visual elements:
Input Area:
- Polynomial degree selector (2-6)
- Coefficient input fields with labels (a_n, a_{n-1}, etc.)
- Displayed polynomial in standard form

Routh Array:
- Grid structure with row labels (s^n, s^{n-1}, etc.)
- Cells showing calculated values
- First column highlighted
- Sign changes marked with red indicators
- Calculation tooltips showing formulas used

Interactive controls:
- Input: Polynomial degree (dropdown 2-6)
- Input: Coefficient values (number fields)
- Button: Calculate Array
- Button: Step Through (builds array row by row)
- Button: Reset
- Toggle: Show calculation details

Data Visibility Requirements:
- Stage 1: Show input coefficients arranged in first two rows
- Stage 2: Show calculation for first element of row 3
- Stage 3: Complete row 3
- Continue for each row
- Final: Highlight first column, count and display sign changes

Behavior:
- Input validation: warns if leading coefficient is zero or negative
- Step-through mode shows one calculation at a time
- Current calculation highlighted and formula displayed
- Sign changes counted automatically
- Stability verdict displayed: "STABLE (0 RHP poles)" or "UNSTABLE (N RHP poles)"
- Warns about special cases (zero in first column, row of zeros)

Instructional Rationale: Step-through construction with visible formulas helps students internalize the mechanical process. Seeing calculations explicitly builds procedural fluency before applying to design problems.

Implementation: p5.js with canvas-based input fields and dynamic table rendering
</details>

## Example: Third-Order System Stability

Let's apply the Routh criterion to the characteristic polynomial from our earlier feedback system:

$D(s) = s^3 + 7s^2 + 10s + K$

where $K$ is the forward gain. We want to find the range of $K$ for stability.

**Step 1**: Check necessary condition. For all coefficients positive, we need $K > 0$.

**Step 2**: Construct the Routh array.

| Row | Column 1 | Column 2 |
|-----|----------|----------|
| $s^3$ | 1 | 10 |
| $s^2$ | 7 | K |
| $s^1$ | $\frac{7 \cdot 10 - 1 \cdot K}{7} = \frac{70 - K}{7}$ | 0 |
| $s^0$ | K | 0 |

**Step 3**: Apply stability criterion. All first-column elements must be positive:

- $1 > 0$ ✓ (always)
- $7 > 0$ ✓ (always)
- $\frac{70 - K}{7} > 0$ → $K < 70$
- $K > 0$

**Stability Range**: $0 < K < 70$

At $K = 70$, the $s^1$ row has a zero—this is the **stability boundary**. We'll handle this special case shortly.

## Example: Fourth-Order System

Consider:

$D(s) = s^4 + 2s^3 + 3s^2 + 4s + 5$

**Step 1**: All coefficients are positive ✓

**Step 2**: Construct the Routh array.

| Row | Column 1 | Column 2 | Column 3 |
|-----|----------|----------|----------|
| $s^4$ | 1 | 3 | 5 |
| $s^3$ | 2 | 4 | 0 |
| $s^2$ | $\frac{2 \cdot 3 - 1 \cdot 4}{2} = 1$ | $\frac{2 \cdot 5 - 1 \cdot 0}{2} = 5$ | 0 |
| $s^1$ | $\frac{1 \cdot 4 - 2 \cdot 5}{1} = -6$ | 0 | 0 |
| $s^0$ | 5 | 0 | 0 |

**Step 3**: Count sign changes in first column: $1, 2, 1, -6, 5$

Sign changes:
- $1 → 2$: no change (+→+)
- $2 → 1$: no change (+→+)
- $1 → -6$: **sign change** (+→−)
- $-6 → 5$: **sign change** (−→+)

**Result**: 2 sign changes → 2 poles in RHP → **System is unstable**

Even though all coefficients were positive, the system is unstable. This demonstrates why the necessary condition is not sufficient for higher-order polynomials.

## Special Case: Zero in First Column

Sometimes during Routh array construction, an element in the first column becomes zero while other elements in that row are nonzero. This creates a division-by-zero problem when computing the next row.

**Solution**: Replace the zero with a small positive number $\epsilon$ and continue the construction. After completing the array, let $\epsilon → 0^+$ to determine sign changes.

#### Zero in First Column Example

Consider:

$D(s) = s^5 + 2s^4 + 2s^3 + 4s^2 + 11s + 10$

| Row | Column 1 | Column 2 | Column 3 |
|-----|----------|----------|----------|
| $s^5$ | 1 | 2 | 11 |
| $s^4$ | 2 | 4 | 10 |
| $s^3$ | $\frac{2 \cdot 2 - 1 \cdot 4}{2} = 0$ → $\epsilon$ | $\frac{2 \cdot 11 - 1 \cdot 10}{2} = 6$ | 0 |
| $s^2$ | $\frac{\epsilon \cdot 4 - 2 \cdot 6}{\epsilon} = 4 - \frac{12}{\epsilon}$ | ... | |
| ... | | | |

As $\epsilon → 0^+$, $4 - \frac{12}{\epsilon} → -\infty$ (large negative).

The sign of the $s^2$ row first column is negative for small positive $\epsilon$. Continue the analysis to count total sign changes.

!!! tip "Epsilon Method"
    The $\epsilon$ method works but can be tedious. Some textbooks teach alternative approaches like multiplying the row by a positive constant or using L'Hôpital's rule. The key insight: a zero in the first column indicates either a pole at the origin or poles symmetric about the imaginary axis.

## Special Case: Row of Zeros

A more significant special case occurs when an entire row becomes zero. This indicates that the polynomial has:

- Pairs of roots symmetric about the origin (either on the imaginary axis or symmetric LHP/RHP pairs)
- The system is at best marginally stable

When a row of zeros occurs, we:

1. Form the **auxiliary polynomial** from the row above the zero row
2. Take the derivative of the auxiliary polynomial
3. Use the coefficients of the derivative to replace the zero row
4. Continue the Routh array construction

#### Auxiliary Polynomial

The auxiliary polynomial is formed from the row immediately above the zero row. Its degree equals the power of $s$ for that row.

For example, if row $s^4$ is: $2, 8, 6$, the auxiliary polynomial is:

$A(s) = 2s^4 + 8s^2 + 6$

(Only even or odd powers appear because of how the Routh array alternates.)

The derivative is:

$\frac{dA}{ds} = 8s^3 + 16s$

Coefficients: $8, 16$ replace the zero row.

#### Row of Zeros Example

$D(s) = s^5 + 2s^4 + 2s^3 + 4s^2 + s + 2$

| Row | Column 1 | Column 2 | Column 3 |
|-----|----------|----------|----------|
| $s^5$ | 1 | 2 | 1 |
| $s^4$ | 2 | 4 | 2 |
| $s^3$ | $\frac{2 \cdot 2 - 1 \cdot 4}{2} = 0$ | $\frac{2 \cdot 1 - 1 \cdot 2}{2} = 0$ | 0 |

Row $s^3$ is entirely zero!

**Auxiliary polynomial** from row $s^4$: $A(s) = 2s^4 + 4s^2 + 2$

**Derivative**: $\frac{dA}{ds} = 8s^3 + 8s$

Replace zero row with coefficients: $8, 8$

| Row | Column 1 | Column 2 | Column 3 |
|-----|----------|----------|----------|
| $s^5$ | 1 | 2 | 1 |
| $s^4$ | 2 | 4 | 2 |
| $s^3$ | 8 | 8 | 0 |
| $s^2$ | $\frac{8 \cdot 4 - 2 \cdot 8}{8} = 2$ | 2 | 0 |
| $s^1$ | $\frac{2 \cdot 8 - 8 \cdot 2}{2} = 0$ | 0 | 0 |

Another row of zeros at $s^1$. Auxiliary polynomial from $s^2$: $A(s) = 2s^2 + 2$

Derivative: $4s$, so row becomes: $4, 0$

| Row | Column 1 |
|-----|----------|
| $s^5$ | 1 |
| $s^4$ | 2 |
| $s^3$ | 8 |
| $s^2$ | 2 |
| $s^1$ | 4 |
| $s^0$ | 2 |

First column: all positive → **no sign changes → no RHP poles**.

But wait! The row of zeros indicates symmetric roots. The auxiliary polynomial $A(s) = 2s^4 + 4s^2 + 2 = 2(s^4 + 2s^2 + 1) = 2(s^2 + 1)^2$ has roots at $s = \pm j$ (repeated).

**Conclusion**: System has repeated poles on the imaginary axis → **unstable** (by our definition) or at best marginally stable.

#### Diagram: Row of Zeros Analysis

<iframe src="../../sims/row-of-zeros/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Row of Zeros Analysis</summary>
Type: microsim

Bloom Taxonomy: Analyze (L4)
Bloom Verb: differentiate, examine

Learning Objective: Students will analyze Routh array special cases by constructing auxiliary polynomials and interpreting symmetric root patterns.

Canvas layout:
- Left (50%): Routh array with step-by-step construction
- Right (50%): S-plane showing pole locations and symmetry

Visual elements:
Routh Array:
- Highlighted row when zero row detected
- Auxiliary polynomial displayed
- Derivative calculation shown
- Replacement row highlighted in different color

S-Plane:
- Poles plotted as array is constructed
- Symmetry lines visible when row of zeros occurs
- Imaginary axis highlighted
- LHP/RHP regions shaded

Interactive controls:
- Input: Polynomial coefficients
- Button: Step through construction
- Button: Show auxiliary polynomial roots
- Toggle: Animate pole movement as array builds

Data Visibility Requirements:
- Stage 1: Initial array with zero row detected
- Stage 2: Form auxiliary polynomial explicitly
- Stage 3: Show derivative calculation
- Stage 4: Replace row and continue
- Stage 5: Solve auxiliary polynomial to show symmetric roots
- Final: Display complete pole pattern on s-plane

Behavior:
- Zero row automatically detected and flagged
- Auxiliary polynomial formation shown step-by-step
- Roots of auxiliary polynomial displayed on s-plane
- Interpretation provided (imaginary axis poles, symmetric RHP/LHP pairs)

Instructional Rationale: Connecting the algebraic procedure to geometric pole locations builds conceptual understanding of why the row of zeros occurs and what it means for stability.

Implementation: p5.js with split canvas for array and s-plane
</details>

## The Stability Boundary

The **stability boundary** is the surface in parameter space where the system transitions from stable to unstable. At the stability boundary, poles lie exactly on the imaginary axis.

For a system with adjustable gain $K$, the stability boundary occurs when:

- A first-column element of the Routh array equals zero, or
- A row of zeros appears

From our third-order example:

$D(s) = s^3 + 7s^2 + 10s + K$

The first-column element in the $s^1$ row is $\frac{70 - K}{7}$.

**Stability boundary**: $\frac{70 - K}{7} = 0$ → $K = 70$

At $K = 70$, we form the auxiliary polynomial from the $s^2$ row: $A(s) = 7s^2 + 70 = 7(s^2 + 10)$

Roots: $s = \pm j\sqrt{10} \approx \pm j3.16$

At the stability boundary, the system has a pair of poles on the imaginary axis at $\pm j\sqrt{10}$ rad/s, producing sustained oscillation at this frequency. For $K < 70$, these poles are in the LHP (stable). For $K > 70$, they're in the RHP (unstable).

| Condition | Behavior |
|-----------|----------|
| $0 < K < 70$ | Stable (all poles in LHP) |
| $K = 70$ | Marginally stable (poles on imaginary axis) |
| $K > 70$ | Unstable (poles in RHP) |

!!! quote "Gyra Moment"
    "My engineers found my stability boundary the first week. When they turned my proportional gain up too high, I didn't just become sluggish or jerky—I started oscillating at a very specific frequency, about 3 rad/s. That was my imaginary-axis frequency, the signature of the stability boundary. They learned: cross that boundary, and I don't just degrade gracefully. I break."

#### Diagram: Stability Boundary Explorer

<iframe src="../../sims/stability-boundary/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Stability Boundary Explorer</summary>
Type: microsim

Bloom Taxonomy: Evaluate (L5)
Bloom Verb: assess, judge

Learning Objective: Students will evaluate system stability by adjusting gain and observing the transition across the stability boundary.

Canvas layout:
- Top left (40%): Routh array with key element highlighted
- Top right (40%): S-plane with root locus hint
- Bottom (20%): Gain slider and time response

Visual elements:
Routh Array:
- Complete array with current K value
- Critical element (determines stability) highlighted
- Color coding: green (positive), red (negative), yellow (zero)

S-Plane:
- Closed-loop poles plotted
- Poles move as K changes
- Imaginary axis emphasized
- Stable/unstable region shading

Time Response:
- Step response for current K
- Grows unbounded when unstable
- Sustained oscillation at boundary

Interactive controls:
- Slider: Gain K from 0 to 100
- Play/pause: Animate K sweep
- Button: Jump to stability boundary
- Toggle: Show root locus path

Data Visibility Requirements:
- Display current K value prominently
- Show critical Routh array element value
- Display pole locations numerically
- Show stability status: STABLE / BOUNDARY / UNSTABLE
- At boundary: show oscillation frequency from auxiliary polynomial

Behavior:
- As K increases, poles move on s-plane
- At K = K_critical, poles cross imaginary axis
- Response changes from settling to sustained oscillation to growing
- Routh array element changes sign as K crosses boundary

Instructional Rationale: Real-time connection between Routh array sign, pole location, and time response reinforces the practical meaning of stability analysis. Students see cause and effect immediately.

Implementation: p5.js with linked visualizations and slider control
</details>

## Relative Stability

So far, stability has been binary: a system is stable or it isn't. But in practice, some stable systems are *more* stable than others. **Relative stability** quantifies how far the poles are from the stability boundary.

Two measures of relative stability:

**Distance from Imaginary Axis**: Poles farther left in the s-plane have faster-decaying modes. The dominant pole (rightmost LHP pole) determines the "least stable" behavior.

**Gain Margin and Phase Margin**: How much can gain increase before instability? How much phase lag can be added? (We'll explore these in detail in the frequency response chapters.)

For the Routh-Hurwitz context, we can test relative stability by shifting the stability boundary. To determine if all poles are to the left of $s = -\sigma$ (where $\sigma > 0$), substitute $s = s_1 - \sigma$ into the characteristic polynomial and apply the Routh criterion to the new polynomial.

#### Relative Stability Test

To verify all poles have real part less than $-\sigma$:

1. Substitute $s = s_1 - \sigma$ into $D(s)$
2. Simplify to get polynomial in $s_1$
3. Apply Routh criterion to the new polynomial
4. If stable, all original poles are to the left of $s = -\sigma$

This is useful when specifications require all poles to be within a certain region—for example, "all time constants less than 2 seconds" requires all poles to the left of $s = -0.5$.

| Pole Constraint | Substitution | Meaning |
|-----------------|--------------|---------|
| All poles in LHP | None (standard Routh) | Basic stability |
| All poles left of $s = -1$ | $s = s_1 - 1$ | Fast decay (τ < 1s) |
| All poles left of $s = -0.5$ | $s = s_1 - 0.5$ | Time constants < 2s |

!!! tip "When to Use Relative Stability"
    Relative stability tests are valuable when you have settling time requirements. If the spec says "settle within 4 seconds," you need the dominant pole's real part more negative than about $-1$ (since settling takes roughly $4\tau = 4/|Re(p)|$). Use the shifted Routh test to verify this without finding the actual poles.

## Design Using Routh-Hurwitz

The Routh-Hurwitz criterion isn't just for analysis—it's a powerful design tool. Given a system with adjustable parameters, we can determine the range of parameters that maintain stability.

#### Design Example: Two-Parameter Stability Region

Consider a proportional-derivative (PD) controller applied to a plant:

$G(s) = \frac{K_p + K_d s}{s^3 + 4s^2 + 5s}$

Closed-loop characteristic equation:

$s^3 + 4s^2 + (5 + K_d)s + K_p = 0$

For stability:

1. All coefficients positive: $K_p > 0$ and $5 + K_d > 0$ → $K_d > -5$
2. Routh array first column all positive

Routh array:

| Row | Column 1 | Column 2 |
|-----|----------|----------|
| $s^3$ | 1 | $5 + K_d$ |
| $s^2$ | 4 | $K_p$ |
| $s^1$ | $\frac{4(5+K_d) - K_p}{4}$ | 0 |
| $s^0$ | $K_p$ | 0 |

Stability conditions:

- $K_p > 0$
- $K_d > -5$
- $\frac{4(5+K_d) - K_p}{4} > 0$ → $K_p < 4(5 + K_d) = 20 + 4K_d$

The stable region in the $(K_d, K_p)$ plane is bounded by:

- $K_p = 0$ (lower boundary)
- $K_d = -5$ (left boundary)
- $K_p = 20 + 4K_d$ (upper boundary)

#### Diagram: Two-Parameter Stability Region

<iframe src="../../sims/stability-region/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Two-Parameter Stability Region</summary>
Type: microsim

Bloom Taxonomy: Create (L6)
Bloom Verb: design, construct

Learning Objective: Students will design controller gains by identifying stable regions in multi-parameter space using Routh-Hurwitz analysis.

Canvas layout:
- Left (60%): Parameter space (K_d, K_p) with stability region shaded
- Right (40%): Routh array and time response for selected point

Visual elements:
Parameter Space:
- 2D plot with K_d on x-axis, K_p on y-axis
- Stable region shaded green
- Unstable region shaded red
- Stability boundary lines labeled
- Current operating point marked

Routh Array Panel:
- Shows array for current (K_d, K_p)
- Elements color-coded by sign
- Sign changes highlighted

Time Response:
- Step response for current parameters
- Changes as parameters move

Interactive controls:
- Click to place operating point in parameter space
- Drag operating point to explore
- Slider: animate along a line in parameter space
- Toggle: show/hide boundary equations
- Button: Reset to example

Data Visibility Requirements:
- Display current K_d, K_p values
- Show Routh array elements symbolically and numerically
- Display stability status
- On boundary: show imaginary axis poles

Behavior:
- Green region = all Routh elements positive
- Red region = at least one sign change
- Boundary lines where Routh elements = 0
- Crossing boundary changes response dramatically
- Sound/visual alert when entering unstable region

Instructional Rationale: Mapping algebraic conditions to visual regions in parameter space helps students understand how Routh-Hurwitz enables systematic design. Interactivity builds intuition for controller tuning.

Implementation: p5.js with 2D parameter space and linked displays
</details>

## Summary: Routh-Hurwitz at a Glance

The Routh-Hurwitz criterion is one of the most practical tools in control engineering. Here's a quick reference:

**Purpose**: Determine if a polynomial has all roots in the LHP (stable) without finding the roots.

**Necessary Condition**: All coefficients must be positive and present.

**Routh Array Construction**:

1. First two rows from coefficients (alternating)
2. Subsequent rows by cross-multiplication formula
3. Continue until $s^0$ row

**Stability Test**: Count sign changes in first column = number of RHP poles.

**Special Cases**:

| Case | Indication | Action |
|------|------------|--------|
| Zero in first column | Possible imaginary axis poles | Replace with ε, let ε → 0⁺ |
| Row of zeros | Symmetric pole pairs | Form auxiliary polynomial, differentiate, continue |

**Design Use**: Find stability boundaries by setting first-column elements to zero, solve for parameter values.

**Relative Stability**: Substitute $s = s_1 - \sigma$ to test if poles are left of $s = -\sigma$.

!!! success "Key Insight"
    The Routh-Hurwitz criterion transforms the question "Where are the poles?" into the question "What are the signs of these algebraic expressions?" The latter is much easier to answer, especially when parameters are unknown.

## Connecting to What's Next

You now have a complete algebraic toolkit for stability analysis. The Routh-Hurwitz criterion tells you *whether* a system is stable and *how many* poles are in the RHP, but it doesn't tell you *where* those poles are. For deeper insight into pole movement as parameters change, we'll develop the **root locus** technique in Chapter 11.

The root locus graphically shows how closed-loop poles move as gain varies—you'll see exactly how poles migrate from stable to unstable regions. The Routh criterion gives you the boundary; root locus gives you the whole picture.

Later, frequency-domain methods (Bode plots, Nyquist criterion) will provide yet another perspective on stability—one that connects directly to experimental measurements and robust design. The Routh-Hurwitz criterion remains the fastest pencil-and-paper check, while frequency methods offer design insight.

!!! quote "Helping Gyra"
    "You've learned to answer my most important question: 'Will I fall?' With the Routh-Hurwitz criterion, you can check my stability without solving any polynomial equations. That's elegant. But now I want to know more—not just whether I'm stable, but how stable, and how I could be more stable. The root locus will show you exactly where my poles are heading as you tune my gains. It's like getting a preview of my future."

## Key Takeaways

This chapter has equipped you to analyze stability systematically:

- **Stability** is the prerequisite for all other design requirements. An unstable system is worse than useless.

- **BIBO stability** requires all poles in the open LHP. **Asymptotic stability** means disturbances die out. **Marginal stability** means the system neither settles nor explodes.

- **Internal stability** requires attention to cancelled poles. Never cancel unstable poles with zeros.

- The **characteristic polynomial** is the closed-loop denominator; its roots are the closed-loop poles.

- The **Routh-Hurwitz criterion** determines stability from polynomial coefficients alone:
  - Build the Routh array from coefficients
  - Count sign changes in first column = RHP poles
  - All positive first column = stable

- **Special cases** (zero in first column, row of zeros) indicate symmetric pole configurations and require modified procedures.

- The **stability boundary** is where first-column elements equal zero—poles on the imaginary axis.

- **Relative stability** asks how far into the LHP the poles lie.

- Routh-Hurwitz enables **design** by finding stability boundaries in parameter space.

??? question "Self-Check: Test Your Understanding"
    Before moving on, try these without peeking:

    1. A polynomial has coefficients $[1, 2, 3, 4, -5]$. Without constructing the array, is the system definitely unstable? Why?

    2. For $D(s) = s^3 + 3s^2 + 2s + K$, find the range of $K$ for stability.

    3. What does a row of zeros in the Routh array indicate about the pole locations?

    4. True or false: If all coefficients of a polynomial are positive, the system must be stable.

    5. A system has characteristic equation $s^2 + 2s + K = 0$. For what values of $K$ is the system stable?

    Answers: (1) Yes—negative coefficient violates necessary condition. (2) $0 < K < 6$. (3) Poles symmetric about origin (imaginary axis or symmetric RHP/LHP pairs). (4) False—necessary but not sufficient for order ≥ 3. (5) $K > 0$.
