# Quiz: Poles, Zeros, and System Analysis

Test your understanding of how pole and zero locations determine system stability, response characteristics, and dynamic behavior.

---

#### 1. The poles of a transfer function are:

<div class="upper-alpha" markdown>
1. The values of $s$ that make the numerator equal to zero
2. The values of $s$ that make the denominator equal to zero
3. The DC gain of the system
4. The coefficients of the highest-order terms
</div>

??? question "Show Answer"
    The correct answer is **B**. Poles are the roots of the denominator polynomial—the values of $s$ where $D(s) = 0$ in the transfer function $G(s) = N(s)/D(s)$. At these values, the transfer function magnitude becomes infinite. Option A describes zeros instead.

    **Concept Tested:** Poles

---

#### 2. A real pole at $s = -3$ contributes which component to the time-domain response?

<div class="upper-alpha" markdown>
1. $e^{3t}$ (exponentially growing)
2. $e^{-3t}$ (exponentially decaying)
3. $\sin(3t)$ (oscillating)
4. $3t$ (linearly increasing)
</div>

??? question "Show Answer"
    The correct answer is **B**. A real pole at $s = -a$ contributes a term proportional to $e^{-at}$ to the time response. With $a = 3$, this gives $e^{-3t}$, an exponentially decaying term with time constant $\tau = 1/3$ seconds. The negative sign in the pole location ensures decay rather than growth.

    **Concept Tested:** Real Poles, Pole Locations

---

#### 3. For a stable system, where must all poles be located in the s-plane?

<div class="upper-alpha" markdown>
1. On the positive real axis
2. In the right half-plane
3. In the left half-plane
4. On the imaginary axis
</div>

??? question "Show Answer"
    The correct answer is **C**. Stability requires all poles to have negative real parts, placing them in the left half-plane (LHP). Poles in the right half-plane cause exponentially growing responses (unstable). Poles on the imaginary axis give sustained oscillations (marginally stable), not true stability.

    **Concept Tested:** Poles in Left Half Plane, Stability

---

#### 4. Complex conjugate poles indicate that the system response will:

<div class="upper-alpha" markdown>
1. Grow without bound
2. Remain constant forever
3. Include oscillatory behavior
4. Have zero steady-state error
</div>

??? question "Show Answer"
    The correct answer is **C**. Complex conjugate poles (e.g., $s = -\sigma \pm j\omega$) contribute oscillatory terms to the time response, specifically damped sinusoids of the form $e^{-\sigma t}\sin(\omega t + \phi)$. The imaginary part $\omega$ determines the oscillation frequency, while the real part $\sigma$ determines the decay rate.

    **Concept Tested:** Complex Conjugate Poles

---

#### 5. Dominant poles are defined as:

<div class="upper-alpha" markdown>
1. The poles with the largest imaginary parts
2. The poles closest to the imaginary axis
3. The poles at the origin
4. The poles with the largest real parts (most negative)
</div>

??? question "Show Answer"
    The correct answer is **B**. Dominant poles are those closest to the imaginary axis because they correspond to the slowest-decaying exponential terms. These poles have the greatest influence on the long-term transient behavior since faster poles decay quickly and become negligible.

    **Concept Tested:** Dominant Poles

---

#### 6. A pole at the origin ($s = 0$) contributes what to the step response?

<div class="upper-alpha" markdown>
1. An exponentially decaying term
2. A constant term that doesn't decay
3. A ramp (linearly increasing) term
4. An oscillatory term
</div>

??? question "Show Answer"
    The correct answer is **C**. A pole at $s = 0$ contributes a term proportional to $t$ (or a constant, depending on input). For the impulse response, it contributes a step; for the step response, it contributes a ramp. Systems with poles at the origin are called integrating systems or Type 1+ systems.

    **Concept Tested:** Pole at Origin

---

#### 7. A transfer function is called "strictly proper" if:

<div class="upper-alpha" markdown>
1. The degree of the numerator is less than the degree of the denominator
2. The degree of the numerator equals the degree of the denominator
3. All poles are in the left half-plane
4. The DC gain equals unity
</div>

??? question "Show Answer"
    The correct answer is **A**. A strictly proper transfer function has the numerator degree less than the denominator degree. This ensures the transfer function approaches zero as $s \to \infty$, which is required for physical realizability. A "proper" function has numerator degree ≤ denominator degree.

    **Concept Tested:** Strictly Proper Function

---

#### 8. The DC gain of a transfer function $G(s)$ is found by evaluating:

<div class="upper-alpha" markdown>
1. $G(s)$ at $s = \infty$
2. $G(s)$ at $s = 0$
3. $G(s)$ at $s = j\omega_n$
4. The sum of all pole magnitudes
</div>

??? question "Show Answer"
    The correct answer is **B**. DC gain is the steady-state gain when the input is a constant (zero frequency). In the Laplace domain, DC corresponds to $s = 0$, so DC gain = $G(0)$. This tells you what the final output will be for a unit step input (assuming the system is stable).

    **Concept Tested:** DC Gain

---

#### 9. Pole-zero cancellation occurs when:

<div class="upper-alpha" markdown>
1. A pole and zero have opposite signs
2. A pole and zero are located at the same point in the s-plane
3. All poles are real
4. The system has equal numbers of poles and zeros
</div>

??? question "Show Answer"
    The correct answer is **B**. Pole-zero cancellation occurs when a pole and zero are at exactly the same location, causing them to mathematically "cancel." While this simplifies the transfer function, the cancelled pole still affects internal system states, which can have stability implications in practice.

    **Concept Tested:** Pole-Zero Cancellation

---

#### 10. In a pole-zero plot, poles are conventionally marked with:

<div class="upper-alpha" markdown>
1. Open circles (○)
2. Filled circles (●)
3. X symbols (×)
4. Plus signs (+)
</div>

??? question "Show Answer"
    The correct answer is **C**. By convention, poles are marked with X symbols (×) and zeros are marked with open circles (○) in pole-zero plots. This notation is standard throughout control systems literature and software tools.

    **Concept Tested:** Pole-Zero Plot

---
