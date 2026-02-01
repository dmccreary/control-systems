# Quiz: PID Control and Controller Tuning

Test your understanding of PID control actions and systematic tuning methods.

---

#### 1. In proportional control, the control effort is:

<div class="upper-alpha" markdown>
1. Proportional to the accumulated error over time
2. Proportional to the rate of change of error
3. Directly proportional to the current error
4. Independent of the error signal
</div>

??? question "Show Answer"
    The correct answer is **C**. Proportional control produces output $u = K_p \cdot e(t)$, directly proportional to the current error. Large error produces large correction; small error produces small correction. This is the most intuitive control action.

    **Concept Tested:** Proportional Control, Proportional Gain

---

#### 2. The primary purpose of integral control action is to:

<div class="upper-alpha" markdown>
1. Speed up the transient response
2. Eliminate steady-state error
3. Reduce overshoot
4. Improve stability margins
</div>

??? question "Show Answer"
    The correct answer is **B**. Integral action accumulates error over time: $u_I = K_i \int e(t)dt$. Even a small persistent error will cause the integral to grow, eventually driving the output to eliminate steady-state error. This is why PI and PID controllers can achieve zero steady-state error to step inputs.

    **Concept Tested:** Integral Control

---

#### 3. Derivative control action responds to:

<div class="upper-alpha" markdown>
1. The current error magnitude
2. The accumulated error history
3. The rate of change of error (anticipates future error)
4. The steady-state output value
</div>

??? question "Show Answer"
    The correct answer is **C**. Derivative action produces output proportional to $de/dt$: $u_D = K_d \cdot (de/dt)$. It "anticipates" where the error is heading and provides braking action when error is decreasing rapidly, reducing overshoot.

    **Concept Tested:** Derivative Control, Derivative Gain

---

#### 4. The Ziegler-Nichols ultimate gain method requires finding:

<div class="upper-alpha" markdown>
1. The DC gain of the open-loop system
2. The gain at which the closed-loop system just begins sustained oscillation
3. The maximum gain before saturation
4. The gain that minimizes steady-state error
</div>

??? question "Show Answer"
    The correct answer is **B**. The ultimate gain method increases proportional gain until the closed-loop system exhibits sustained oscillations at the stability boundary. This critical gain $K_u$ and the oscillation period $T_u$ are then used in Ziegler-Nichols formulas to calculate PID gains.

    **Concept Tested:** Ultimate Gain Method, Ultimate Gain

---

#### 5. Integral windup is a problem that occurs when:

<div class="upper-alpha" markdown>
1. The derivative gain is too high
2. The integrator accumulates error while the actuator is saturated
3. The proportional gain is unstable
4. The system has no steady-state error
</div>

??? question "Show Answer"
    The correct answer is **B**. Integral windup occurs when the actuator saturates (reaches its limit) but the integrator continues accumulating error. This causes excessive overshoot when saturation ends because the integrator has "wound up" to an excessively large value.

    **Concept Tested:** Anti-Windup

---

#### 6. A PI controller combines:

<div class="upper-alpha" markdown>
1. Proportional and derivative actions
2. Proportional and integral actions
3. Integral and derivative actions
4. All three PID actions
</div>

??? question "Show Answer"
    The correct answer is **B**. A PI controller uses proportional and integral actions: $u = K_p e + K_i \int e \, dt$. It provides zero steady-state error (from integral) with reasonable transient performance (from proportional). PI is very common in industrial practice.

    **Concept Tested:** PI Controller

---

#### 7. Derivative kick is caused by:

<div class="upper-alpha" markdown>
1. Noise in the measurement signal
2. Sudden changes in the setpoint producing a large derivative of error
3. Integral windup
4. Low proportional gain
</div>

??? question "Show Answer"
    The correct answer is **B**. When the setpoint changes abruptly (step change), the derivative of error is theoretically infinite, causing a large spike in the derivative control output—the "derivative kick." This is often mitigated by differentiating only the measurement (not the error).

    **Concept Tested:** Derivative Kick

---

#### 8. The reaction curve method of Ziegler-Nichols uses:

<div class="upper-alpha" markdown>
1. The closed-loop step response
2. The open-loop step response of the plant
3. The frequency response at high frequencies
4. The root locus diagram
</div>

??? question "Show Answer"
    The correct answer is **B**. The reaction curve method applies an open-loop step input to the plant and measures the response characteristics (delay time, time constant, and gain). These parameters are then used in Ziegler-Nichols formulas to calculate initial PID settings.

    **Concept Tested:** Reaction Curve Method

---

#### 9. Compared to a P controller, adding derivative action (making a PD controller) typically:

<div class="upper-alpha" markdown>
1. Eliminates steady-state error
2. Reduces overshoot and improves damping
3. Increases the system type
4. Slows down the transient response
</div>

??? question "Show Answer"
    The correct answer is **B**. Derivative action provides damping by opposing rapid changes in error. It reduces overshoot, decreases settling time, and improves stability margins. However, PD controllers still have the same steady-state error as P controllers (only integral action fixes that).

    **Concept Tested:** PD Controller, Derivative Control

---

#### 10. The integral time $T_i$ in a PID controller is related to the integral gain by:

<div class="upper-alpha" markdown>
1. $T_i = K_i$
2. $T_i = 1/K_i$ (or $K_i = K_p/T_i$ in standard form)
3. $T_i = K_i^2$
4. $T_i = K_p \cdot K_i$
</div>

??? question "Show Answer"
    The correct answer is **B**. In the standard PID form $K_p(1 + 1/(T_i s) + T_d s)$, integral time $T_i$ is the reciprocal of the "integral rate." Larger $T_i$ means weaker integral action; smaller $T_i$ means stronger integral action. The relationship is $K_i = K_p/T_i$.

    **Concept Tested:** Integral Time, Integral Gain

---
