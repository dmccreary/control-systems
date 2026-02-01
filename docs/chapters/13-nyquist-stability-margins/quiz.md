# Quiz: Nyquist Analysis and Stability Margins

Test your understanding of Nyquist stability criterion, gain margin, phase margin, and robustness analysis.

---

#### 1. Gain margin measures:

<div class="upper-alpha" markdown>
1. The amount by which the closed-loop gain exceeds unity
2. How much the loop gain can increase before the system becomes unstable
3. The difference between open-loop and closed-loop gain
4. The DC gain of the system
</div>

??? question "Show Answer"
    The correct answer is **B**. Gain margin is the factor by which the loop gain $K$ can be multiplied before the system reaches the stability boundary. It's measured at the phase crossover frequency where the phase equals -180°. Larger gain margin indicates more robust stability.

    **Concept Tested:** Gain Margin

---

#### 2. Phase margin is the amount of additional phase lag that would:

<div class="upper-alpha" markdown>
1. Double the system bandwidth
2. Cause the system to become unstable
3. Eliminate all overshoot
4. Zero the steady-state error
</div>

??? question "Show Answer"
    The correct answer is **B**. Phase margin is measured at the gain crossover frequency (where $|GH| = 1$) as $PM = 180° + \angle GH(j\omega_{gc})$. It represents how much additional phase lag would bring the total phase to -180°, causing instability.

    **Concept Tested:** Phase Margin

---

#### 3. The gain crossover frequency is where:

<div class="upper-alpha" markdown>
1. The phase equals -180°
2. The magnitude equals 0 dB (unity)
3. The magnitude is maximum
4. The gain margin is measured
</div>

??? question "Show Answer"
    The correct answer is **B**. The gain crossover frequency $\omega_{gc}$ is where the loop gain magnitude equals unity (0 dB): $|GH(j\omega_{gc})| = 1$. Phase margin is measured at this frequency. Option A describes the phase crossover frequency.

    **Concept Tested:** Gain Crossover, Crossover Frequency

---

#### 4. The Nyquist stability criterion relates closed-loop stability to:

<div class="upper-alpha" markdown>
1. The DC gain of the open-loop system
2. Encirclements of the critical point $(-1, 0)$ by the Nyquist plot
3. The number of poles at the origin
4. The maximum magnitude of the frequency response
</div>

??? question "Show Answer"
    The correct answer is **B**. The Nyquist criterion states that the number of unstable closed-loop poles equals $Z = N + P$, where $N$ is the number of clockwise encirclements of -1 by the Nyquist plot and $P$ is the number of unstable open-loop poles. For stability, $Z = 0$.

    **Concept Tested:** Nyquist Criterion, Encirclement

---

#### 5. A minimum-phase system is one that has:

<div class="upper-alpha" markdown>
1. The smallest possible phase shift
2. No poles or zeros in the right half-plane
3. Zero steady-state error
4. Unity gain at all frequencies
</div>

??? question "Show Answer"
    The correct answer is **B**. A minimum-phase system has all poles and zeros in the left half-plane (or at the origin). For a given magnitude response, minimum-phase systems have the smallest phase lag—hence the name. RHP zeros create non-minimum-phase behavior.

    **Concept Tested:** Minimum Phase System

---

#### 6. Right half-plane zeros in a transfer function cause:

<div class="upper-alpha" markdown>
1. Improved stability margins
2. An initial response in the wrong direction (inverse response)
3. Faster settling time
4. Zero steady-state error
</div>

??? question "Show Answer"
    The correct answer is **B**. RHP zeros cause the system to initially move in the opposite direction before eventually following the input (inverse response). They also limit achievable bandwidth and make feedback design more challenging—the system is non-minimum-phase.

    **Concept Tested:** Right-Half Plane Zeros, Non-Minimum Phase

---

#### 7. A conditionally stable system is one that:

<div class="upper-alpha" markdown>
1. Is stable for all values of gain
2. Is stable only for a certain range of gain values
3. Is always marginally stable
4. Has no poles or zeros
</div>

??? question "Show Answer"
    The correct answer is **B**. A conditionally stable system is stable for some range of gain but unstable for both very low and very high gains (or other specific ranges). The Nyquist plot encircles -1 for certain gain values but not others.

    **Concept Tested:** Conditionally Stable

---

#### 8. The phase crossover frequency is where:

<div class="upper-alpha" markdown>
1. The magnitude equals unity (0 dB)
2. The phase equals -180°
3. The phase margin is measured
4. Maximum resonance occurs
</div>

??? question "Show Answer"
    The correct answer is **B**. The phase crossover frequency $\omega_{pc}$ is where the loop phase equals -180°: $\angle GH(j\omega_{pc}) = -180°$. Gain margin is measured at this frequency as $GM = 1/|GH(j\omega_{pc})|$.

    **Concept Tested:** Phase Crossover

---

#### 9. On a Nyquist plot, clockwise encirclements of the point $(-1, 0)$ indicate:

<div class="upper-alpha" markdown>
1. Stable closed-loop poles
2. Increased gain margin
3. Potential closed-loop instability (RHP closed-loop poles)
4. Zero phase margin
</div>

??? question "Show Answer"
    The correct answer is **C**. Each clockwise encirclement of -1 indicates an unstable closed-loop pole (or accounts for an open-loop RHP pole). For a stable open-loop system, any clockwise encirclement means closed-loop instability. Counter-clockwise encirclements can stabilize open-loop unstable systems.

    **Concept Tested:** Clockwise Encirclement, Nyquist Criterion

---

#### 10. Typical design guidelines recommend phase margins of approximately:

<div class="upper-alpha" markdown>
1. 0° to 10°
2. 30° to 60°
3. 90° to 120°
4. 180° or greater
</div>

??? question "Show Answer"
    The correct answer is **B**. Phase margins of 30° to 60° (often targeting 45°-60°) provide good robustness without excessive conservatism. Less than 30° is considered marginal; more than 60° may sacrifice performance. Similar guidelines suggest gain margins of 6-20 dB.

    **Concept Tested:** Stability Margins

---
