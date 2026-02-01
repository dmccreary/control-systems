# Quiz: Stability Analysis and the Routh-Hurwitz Criterion

Test your understanding of stability definitions and the Routh-Hurwitz criterion for determining system stability.

---

#### 1. A system is BIBO stable if:

<div class="upper-alpha" markdown>
1. All poles are on the imaginary axis
2. Every bounded input produces a bounded output
3. The output eventually becomes zero
4. The gain is less than unity
</div>

??? question "Show Answer"
    The correct answer is **B**. BIBO (Bounded-Input, Bounded-Output) stability means that if the input signal remains finite for all time, the output will also remain finite. For LTI systems, BIBO stability requires all poles to be in the left half-plane.

    **Concept Tested:** BIBO Stability

---

#### 2. For an LTI system to be asymptotically stable, its poles must be located:

<div class="upper-alpha" markdown>
1. On the imaginary axis
2. In the right half-plane
3. In the left half-plane (negative real parts)
4. At the origin
</div>

??? question "Show Answer"
    The correct answer is **C**. Asymptotic stability requires all poles to have strictly negative real parts—they must be in the open left half-plane. This ensures all natural response components decay to zero as time approaches infinity.

    **Concept Tested:** Asymptotic Stability, Poles in Left Half Plane

---

#### 3. The characteristic equation of a closed-loop system determines:

<div class="upper-alpha" markdown>
1. The DC gain of the system
2. The locations of the closed-loop poles
3. The number of zeros
4. The input signal type
</div>

??? question "Show Answer"
    The correct answer is **B**. The characteristic equation is formed by setting the denominator of the closed-loop transfer function to zero: $1 + GH = 0$. Its roots are the closed-loop poles, which determine stability and dynamic behavior.

    **Concept Tested:** Characteristic Equation, Characteristic Roots

---

#### 4. The Routh-Hurwitz criterion determines stability by:

<div class="upper-alpha" markdown>
1. Computing all pole locations numerically
2. Examining sign changes in the first column of the Routh array
3. Measuring the step response experimentally
4. Finding the frequency response at all frequencies
</div>

??? question "Show Answer"
    The correct answer is **B**. The Routh-Hurwitz criterion examines the first column of the Routh array. The number of sign changes equals the number of roots in the right half-plane. No sign changes means all poles are in the LHP (stable).

    **Concept Tested:** Routh-Hurwitz Criterion, Routh Array

---

#### 5. A marginal stability condition occurs when poles are located:

<div class="upper-alpha" markdown>
1. Far to the left in the s-plane
2. On the imaginary axis
3. In the right half-plane
4. At negative real values
</div>

??? question "Show Answer"
    The correct answer is **B**. Marginal stability occurs when poles lie exactly on the imaginary axis, resulting in sustained oscillations that neither grow nor decay. This is the boundary between stable and unstable behavior.

    **Concept Tested:** Marginal Stability, Poles on Imaginary Axis

---

#### 6. When constructing a Routh array, if a zero appears in the first column but the row is not entirely zero, you should:

<div class="upper-alpha" markdown>
1. Declare the system unstable immediately
2. Replace the zero with a small positive number ε and continue
3. Skip that row entirely
4. Start the array construction over
</div>

??? question "Show Answer"
    The correct answer is **B**. When a zero appears in the first column (but the row isn't all zeros), replace it with a small positive number ε. Complete the array, then examine sign changes as ε → 0. This reveals RHP poles that would otherwise cause division by zero.

    **Concept Tested:** Zero in First Column, Special Cases Routh

---

#### 7. A row of zeros in the Routh array indicates:

<div class="upper-alpha" markdown>
1. The system is definitely unstable
2. Symmetric pole pairs about the origin or imaginary axis
3. All poles are at the origin
4. The system has infinite gain
</div>

??? question "Show Answer"
    The correct answer is **B**. A row of zeros indicates symmetric pole pairs—either symmetric about the real axis (conjugate pairs on jω axis) or about the origin (e.g., ±σ). The auxiliary polynomial from the row above identifies these symmetric roots.

    **Concept Tested:** Row of Zeros, Auxiliary Polynomial

---

#### 8. Relative stability refers to:

<div class="upper-alpha" markdown>
1. Whether poles are in the left or right half-plane
2. How far poles are from the imaginary axis (degree of stability)
3. The ratio of zeros to poles
4. Whether feedback is positive or negative
</div>

??? question "Show Answer"
    The correct answer is **B**. Relative stability measures "how stable" a system is—how far poles are from the imaginary axis. Poles far to the left indicate strong stability (fast decay), while poles close to the axis indicate weak stability (slow decay, marginal).

    **Concept Tested:** Relative Stability

---

#### 9. An unstable system is characterized by:

<div class="upper-alpha" markdown>
1. All poles in the left half-plane
2. At least one pole in the right half-plane
3. Poles only on the imaginary axis
4. No poles at all
</div>

??? question "Show Answer"
    The correct answer is **B**. An unstable system has at least one pole with positive real part (in the right half-plane). Such poles contribute exponentially growing terms to the response, causing the output to grow without bound for bounded inputs.

    **Concept Tested:** Unstable System, Poles in Right Half Plane

---

#### 10. The characteristic polynomial for a closed-loop system with open-loop transfer function $GH = K/(s^2 + 3s + 2)$ is:

<div class="upper-alpha" markdown>
1. $s^2 + 3s + 2$
2. $s^2 + 3s + 2 + K$
3. $K$
4. $s^2 + 3s + (2 - K)$
</div>

??? question "Show Answer"
    The correct answer is **B**. The characteristic equation is $1 + GH = 0$, which gives $1 + K/(s^2 + 3s + 2) = 0$. Multiplying through: $s^2 + 3s + 2 + K = 0$. The characteristic polynomial is therefore $s^2 + 3s + (2 + K)$.

    **Concept Tested:** Characteristic Polynomial, Characteristic Equation

---
