# Quiz: Time-Domain Response Fundamentals

Test your understanding of natural and forced responses, transient and steady-state behavior, and first-order and second-order system characteristics.

---

#### 1. What determines the order of a dynamic system?

<div class="upper-alpha" markdown>
1. The magnitude of the input signal
2. The number of independent energy storage elements
3. The steady-state output value
4. The number of feedback loops in the system
</div>

??? question "Show Answer"
    The correct answer is **B**. System order equals the number of independent energy storage elements, which corresponds to the highest derivative in the differential equation and the number of initial conditions needed. A capacitor adds one to the order; an inductor adds one; a mass-spring-damper with mass and spring has order two.

    **Concept Tested:** Order of a System

---

#### 2. The natural response of a system arises from:

<div class="upper-alpha" markdown>
1. External inputs applied to the system
2. Initial conditions (stored energy) with no external input
3. The reference setpoint
4. Sensor noise in the feedback path
</div>

??? question "Show Answer"
    The correct answer is **B**. The natural response (also called zero-input response) is how the system behaves due solely to its initial conditions—energy already stored in capacitors, springs, or moving masses—with no external input applied. It represents the release of stored energy. Option A describes the forced response.

    **Concept Tested:** Natural Response, Initial Conditions

---

#### 3. For a first-order system with time constant $\tau$, approximately what percentage of the final value is reached at time $t = \tau$?

<div class="upper-alpha" markdown>
1. 50%
2. 63.2%
3. 86.5%
4. 95%
</div>

??? question "Show Answer"
    The correct answer is **B**. At $t = \tau$, the first-order step response reaches $1 - e^{-1} \approx 0.632$ or 63.2% of the final value. This is a fundamental property of exponential responses. At $2\tau$ the system reaches 86.5%, at $3\tau$ it reaches 95%, and at $5\tau$ it's within 1% of the final value.

    **Concept Tested:** Time Constant, First-Order System

---

#### 4. What is the "5τ rule" for first-order systems?

<div class="upper-alpha" markdown>
1. The rise time equals 5 time constants
2. The system is considered at steady state after 5 time constants
3. The overshoot is always 5% of the final value
4. Five time constants determine the system bandwidth
</div>

??? question "Show Answer"
    The correct answer is **B**. After 5 time constants ($5\tau$), a first-order system has reached 99.3% of its final value and is considered to be at steady state for practical purposes. This rule is widely used in engineering to determine when transients have effectively died out.

    **Concept Tested:** Time Constant, Steady-State Response

---

#### 5. A second-order system with damping ratio $\zeta = 0.5$ is classified as:

<div class="upper-alpha" markdown>
1. Overdamped
2. Critically damped
3. Underdamped
4. Undamped
</div>

??? question "Show Answer"
    The correct answer is **C**. When $0 < \zeta < 1$, the system is underdamped and exhibits oscillatory behavior with decaying amplitude. At $\zeta = 0$ the system is undamped (perpetual oscillation), at $\zeta = 1$ it's critically damped, and at $\zeta > 1$ it's overdamped.

    **Concept Tested:** Damping Ratio, Underdamped System

---

#### 6. The damped frequency $\omega_d$ of an underdamped second-order system is:

<div class="upper-alpha" markdown>
1. Always greater than the natural frequency $\omega_n$
2. Equal to the natural frequency $\omega_n$
3. Always less than the natural frequency $\omega_n$
4. Independent of the damping ratio
</div>

??? question "Show Answer"
    The correct answer is **C**. The damped frequency is $\omega_d = \omega_n\sqrt{1-\zeta^2}$. Since $\sqrt{1-\zeta^2} < 1$ for any $\zeta > 0$, the damped frequency is always less than the natural frequency. Damping slows down the oscillation. Only for the theoretical undamped case ($\zeta = 0$) does $\omega_d = \omega_n$.

    **Concept Tested:** Damped Frequency, Natural Frequency

---

#### 7. A critically damped system ($\zeta = 1$) is characterized by:

<div class="upper-alpha" markdown>
1. Perpetual oscillation at the natural frequency
2. The fastest response that does not overshoot
3. Two distinct real poles far apart in the s-plane
4. Significant overshoot followed by slow settling
</div>

??? question "Show Answer"
    The correct answer is **B**. Critical damping represents the boundary between oscillatory and non-oscillatory behavior—it's the fastest response possible without any overshoot. Any less damping would cause oscillation; any more would slow the response. The system has repeated real poles at $s = -\omega_n$.

    **Concept Tested:** Critically Damped System

---

#### 8. The transient response of a stable system is characterized by:

<div class="upper-alpha" markdown>
1. A constant value that persists indefinitely
2. Components that eventually die out as time approaches infinity
3. Oscillations that grow without bound
4. A response that depends only on the input, not initial conditions
</div>

??? question "Show Answer"
    The correct answer is **B**. The transient response is the portion of the output that decays to zero as $t \rightarrow \infty$ for stable systems. It represents the system "settling down" from initial disturbances or adjusting to new inputs. The steady-state response (A) is what remains after transients decay. Option C describes an unstable system.

    **Concept Tested:** Transient Response

---

#### 9. For a higher-order system, which poles have the greatest influence on the transient response?

<div class="upper-alpha" markdown>
1. Poles farthest to the left in the s-plane
2. Poles closest to the imaginary axis (dominant poles)
3. All poles contribute equally
4. Only the poles at the origin
</div>

??? question "Show Answer"
    The correct answer is **B**. Dominant poles are those closest to the imaginary axis; they correspond to the slowest-decaying exponentials and therefore dominate the long-term transient behavior. Poles far to the left decay quickly and can often be neglected. This is why higher-order systems can often be approximated by lower-order models.

    **Concept Tested:** Higher-Order System

---

#### 10. What physical parameter does the time constant represent in an RC circuit?

<div class="upper-alpha" markdown>
1. The ratio of voltage to current
2. The product of resistance and capacitance ($\tau = RC$)
3. The inverse of the capacitance
4. The square root of the inductance
</div>

??? question "Show Answer"
    The correct answer is **B**. For an RC circuit, the time constant is $\tau = RC$, the product of resistance (ohms) and capacitance (farads), which has units of seconds. This determines how quickly the capacitor charges or discharges through the resistor—larger R or C means slower response.

    **Concept Tested:** Time Constant

---
