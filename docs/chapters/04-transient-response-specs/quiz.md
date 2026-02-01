# Quiz: Transient Response Specifications

Test your understanding of overshoot, settling time, rise time, and standard test inputs used throughout control systems analysis.

---

#### 1. Which transient specification is determined solely by the damping ratio $\zeta$, independent of the natural frequency $\omega_n$?

<div class="upper-alpha" markdown>
1. Settling time
2. Rise time
3. Percent overshoot
4. Peak time
</div>

??? question "Show Answer"
    The correct answer is **C**. Percent overshoot for a second-order system is given by $\%OS = e^{-\pi\zeta/\sqrt{1-\zeta^2}} \times 100\%$, which depends only on $\zeta$. Settling time depends on $\zeta\omega_n$, rise time primarily on $\omega_n$, and peak time on both $\omega_n$ and $\zeta$.

    **Concept Tested:** Percent Overshoot, Damping Ratio

---

#### 2. The 2% settling time for a second-order underdamped system is approximately:

<div class="upper-alpha" markdown>
1. $t_s \approx \frac{2}{\zeta\omega_n}$
2. $t_s \approx \frac{4}{\zeta\omega_n}$
3. $t_s \approx \frac{4}{\omega_n}$
4. $t_s \approx \frac{\pi}{\omega_d}$
</div>

??? question "Show Answer"
    The correct answer is **B**. The 2% settling time is approximately $t_s \approx 4/(\zeta\omega_n)$, derived from the time for the exponential envelope to decay to 2% of its initial value (about 4 time constants). Option D is the formula for peak time, not settling time.

    **Concept Tested:** Settling Time

---

#### 3. What does the step input reveal about a control system that makes it the most commonly used test signal?

<div class="upper-alpha" markdown>
1. It only tests steady-state behavior
2. It tests both transient and steady-state behavior
3. It can only be applied to first-order systems
4. It requires complex mathematical analysis
</div>

??? question "Show Answer"
    The correct answer is **B**. The step input is the workhorse of control testing because it exercises both transient behavior (overshoot, settling) and steady-state behavior (final value, steady-state error). It's also easy to apply experimentally and directly reveals key performance metrics.

    **Concept Tested:** Step Input, Unit Step Response

---

#### 4. Peak time $t_p$ for an underdamped second-order system is:

<div class="upper-alpha" markdown>
1. $t_p = \frac{\pi}{\omega_n\sqrt{1-\zeta^2}}$
2. $t_p = \frac{4}{\zeta\omega_n}$
3. $t_p = \frac{1.8}{\omega_n}$
4. $t_p = \frac{1}{\omega_n}$
</div>

??? question "Show Answer"
    The correct answer is **A**. Peak time is $t_p = \pi/\omega_d = \pi/(\omega_n\sqrt{1-\zeta^2})$, which is one half-period of the damped oscillation. The response starts at zero, rises through the final value, and reaches its peak at this time. Option B is settling time, and option C approximates rise time.

    **Concept Tested:** Peak Time

---

#### 5. A system with 10% overshoot has an approximate damping ratio of:

<div class="upper-alpha" markdown>
1. $\zeta \approx 0.30$
2. $\zeta \approx 0.59$
3. $\zeta \approx 0.71$
4. $\zeta \approx 0.90$
</div>

??? question "Show Answer"
    The correct answer is **B**. Using the inverse formula $\zeta = -\ln(\%OS/100)/\sqrt{\pi^2 + \ln^2(\%OS/100)}$ with 10% overshoot gives $\zeta \approx 0.59$. This is a commonly used value in control design that balances responsiveness with acceptable overshoot.

    **Concept Tested:** Percent Overshoot, Damping Ratio

---

#### 6. The impulse response of an LTI system $h(t)$ is related to the transfer function $G(s)$ by:

<div class="upper-alpha" markdown>
1. $h(t) = G(s) \cdot s$
2. $h(t) = \mathcal{L}^{-1}\{G(s)\}$
3. $h(t) = \frac{dG(s)}{ds}$
4. $h(t) = G(s)/s$
</div>

??? question "Show Answer"
    The correct answer is **B**. The impulse response is the inverse Laplace transform of the transfer function. Since the Laplace transform of the impulse $\delta(t)$ is 1, the output when the input is an impulse is simply $H(s) = G(s) \cdot 1 = G(s)$, and taking the inverse transform gives $h(t)$.

    **Concept Tested:** Impulse Response, Impulse Input

---

#### 7. The rise time (10% to 90%) for a second-order underdamped system is approximately:

<div class="upper-alpha" markdown>
1. $t_r \approx \frac{1.8}{\omega_n}$
2. $t_r \approx \frac{4}{\omega_n}$
3. $t_r \approx \frac{\pi}{\omega_n}$
4. $t_r \approx \frac{0.5}{\omega_n}$
</div>

??? question "Show Answer"
    The correct answer is **A**. The approximation $t_r \approx 1.8/\omega_n$ works well for damping ratios in the typical design range ($0.3 < \zeta < 0.8$). Rise time is primarily determined by the natural frequency—higher $\omega_n$ means faster rise.

    **Concept Tested:** Rise Time

---

#### 8. Why is settling time particularly important in practical control applications?

<div class="upper-alpha" markdown>
1. It determines the system's maximum output amplitude
2. It tells you when the transient is effectively over and the system has reached steady state
3. It is always equal to the rise time
4. It measures how much the output exceeds the final value
</div>

??? question "Show Answer"
    The correct answer is **B**. Settling time tells you when you can consider the response "done"—when the output has settled within a tolerance band (typically ±2% or ±5%) and stays there. This is crucial for determining how long to wait before taking the next action or declaring the system ready.

    **Concept Tested:** Settling Time

---

#### 9. The ramp input is used to test a system's:

<div class="upper-alpha" markdown>
1. Ability to handle sudden changes
2. Velocity tracking capability
3. Impulse rejection
4. High-frequency response
</div>

??? question "Show Answer"
    The correct answer is **B**. A ramp input represents a constantly changing reference (constant velocity), and the ramp response reveals how well a system can track a moving target. The steady-state error to a ramp input is called the velocity error, which characterizes velocity tracking performance.

    **Concept Tested:** Ramp Input, Ramp Response

---

#### 10. The "magical" damping ratio $\zeta \approx 0.707$ is often recommended because:

<div class="upper-alpha" markdown>
1. It produces zero overshoot
2. It provides a good balance with about 4-5% overshoot and fast settling
3. It maximizes the system bandwidth
4. It eliminates all transient behavior
</div>

??? question "Show Answer"
    The correct answer is **B**. The damping ratio $\zeta = 1/\sqrt{2} \approx 0.707$ (Butterworth or optimal damping) produces approximately 4.3% overshoot with relatively fast settling—a good compromise between speed and smoothness. It's widely used as a starting point for control design.

    **Concept Tested:** Damping Ratio

---
