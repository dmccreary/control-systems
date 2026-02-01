# Quiz: Compensator Design and Performance Tradeoffs

Test your understanding of lead and lag compensator design and fundamental control system tradeoffs.

---

#### 1. A lead compensator is primarily used to:

<div class="upper-alpha" markdown>
1. Increase the system type and reduce steady-state error
2. Add phase lead to improve stability margins and transient response
3. Attenuate high-frequency noise
4. Reduce the system bandwidth
</div>

??? question "Show Answer"
    The correct answer is **B**. Lead compensators add positive phase in a frequency range, improving phase margin and allowing higher crossover frequencies. This improves transient response (faster settling, less overshoot) while maintaining or improving stability.

    **Concept Tested:** Lead Compensator, Phase Lead

---

#### 2. A lag compensator improves steady-state accuracy by:

<div class="upper-alpha" markdown>
1. Increasing gain at high frequencies
2. Increasing gain at low frequencies while minimally affecting the crossover region
3. Adding an integrator to the system
4. Removing zeros from the transfer function
</div>

??? question "Show Answer"
    The correct answer is **B**. Lag compensators boost low-frequency gain (improving steady-state accuracy and error constants) while their phase lag occurs well below the crossover frequency, minimally affecting stability margins. They don't add a pure integrator but achieve similar low-frequency benefits.

    **Concept Tested:** Lag Compensator, Phase Lag

---

#### 3. The maximum phase lead provided by a lead compensator with ratio $\alpha > 1$ is:

<div class="upper-alpha" markdown>
1. $90°$
2. $\sin^{-1}[(\alpha-1)/(\alpha+1)]$
3. $45° \cdot \alpha$
4. $180°/\alpha$
</div>

??? question "Show Answer"
    The correct answer is **B**. For a lead compensator with transfer function $(s + z)/(s + p)$ where $p = \alpha z$ and $\alpha > 1$, maximum phase lead is $\phi_{max} = \sin^{-1}[(\alpha-1)/(\alpha+1)]$. For $\alpha = 10$, this gives about 55° maximum phase lead.

    **Concept Tested:** Maximum Phase Lead

---

#### 4. The sensitivity function $S(s)$ in feedback control represents:

<div class="upper-alpha" markdown>
1. How sensitive the output is to sensor noise
2. How well the closed-loop system rejects disturbances and follows the reference
3. The ratio of closed-loop to open-loop gains
4. The system's sensitivity to parameter variations, equal to $1/(1+L)$
</div>

??? question "Show Answer"
    The correct answer is **D**. The sensitivity function $S = 1/(1 + L)$ measures how sensitive the closed-loop transfer function is to changes in the loop transfer function. It also appears in the transfer function from disturbance to output. Low $|S|$ means good disturbance rejection.

    **Concept Tested:** Sensitivity, Sensitivity Function

---

#### 5. A fundamental tradeoff in control design is that:

<div class="upper-alpha" markdown>
1. Faster response always improves stability
2. You cannot have good disturbance rejection at both low and high frequencies
3. Increasing speed (bandwidth) tends to reduce stability margins
4. Steady-state error and transient response are completely independent
</div>

??? question "Show Answer"
    The correct answer is **C**. Higher bandwidth means faster response but typically requires higher loop gain at higher frequencies, which can erode stability margins. This speed-vs-stability tradeoff is fundamental—aggressive designs are fast but less robust.

    **Concept Tested:** Design Tradeoffs, Speed vs Stability

---

#### 6. The complementary sensitivity function $T(s)$ equals:

<div class="upper-alpha" markdown>
1. $1 - S(s)$, the closed-loop transfer function from reference to output
2. $1 + S(s)$
3. $S(s)^2$
4. The open-loop transfer function
</div>

??? question "Show Answer"
    The correct answer is **A**. The complementary sensitivity $T = L/(1+L) = 1 - S$, representing the closed-loop transfer function. Together, $S + T = 1$, creating a fundamental constraint: you cannot make both small simultaneously at the same frequency.

    **Concept Tested:** Complementary Sensitivity

---

#### 7. In Bode design, a lead compensator is placed so that its maximum phase contribution occurs:

<div class="upper-alpha" markdown>
1. Well below the desired crossover frequency
2. At or near the desired crossover frequency
3. Well above the desired crossover frequency
4. At DC (zero frequency)
</div>

??? question "Show Answer"
    The correct answer is **B**. The lead compensator is designed so its maximum phase lead occurs at the new crossover frequency, adding exactly the phase margin improvement needed. The center frequency $\omega_m = \sqrt{zp}$ is placed at or near the desired $\omega_{gc}$.

    **Concept Tested:** Bode Design Method, Lead Compensator

---

#### 8. Robustness in control systems refers to:

<div class="upper-alpha" markdown>
1. The ability to withstand physical damage
2. The ability to maintain stability and performance despite uncertainties and variations
3. The maximum gain the system can tolerate
4. The speed of the transient response
</div>

??? question "Show Answer"
    The correct answer is **B**. Robustness is the ability of a control system to maintain acceptable performance despite modeling errors, parameter variations, unmodeled dynamics, and disturbances. Gain margin and phase margin are practical measures of robustness.

    **Concept Tested:** Robustness

---

#### 9. Noise attenuation in a feedback system is improved by:

<div class="upper-alpha" markdown>
1. Increasing gain at all frequencies
2. Using high loop gain at low frequencies and low loop gain at high frequencies
3. Eliminating all feedback
4. Maximizing the complementary sensitivity $T$ at high frequencies
</div>

??? question "Show Answer"
    The correct answer is **B**. Sensor noise typically enters at high frequencies. Since noise is passed through $T = L/(1+L)$, reducing $|L|$ at high frequencies (where noise dominates) attenuates noise in the output. Good designs have high gain at low frequencies (for tracking) and low gain at high frequencies (for noise rejection).

    **Concept Tested:** Noise Attenuation

---

#### 10. A lead-lag compensator combines:

<div class="upper-alpha" markdown>
1. Two lead sections in series
2. Two lag sections in series
3. A lead section for transient improvement and a lag section for steady-state improvement
4. Proportional and derivative control only
</div>

??? question "Show Answer"
    The correct answer is **C**. Lead-lag compensation combines the benefits of both: the lead section adds phase margin and improves transient response, while the lag section increases low-frequency gain for better steady-state accuracy. This provides comprehensive performance improvement.

    **Concept Tested:** Lead-Lag Compensator

---
