# Quiz: Steady-State Error Analysis

Test your understanding of steady-state error, error constants, and system type classification.

---

#### 1. Steady-state error is defined as:

<div class="upper-alpha" markdown>
1. The maximum overshoot during transient response
2. The difference between reference input and output as time approaches infinity
3. The initial error at $t = 0$
4. The error at the peak time
</div>

??? question "Show Answer"
    The correct answer is **B**. Steady-state error is $e_{ss} = \lim_{t \to \infty}[r(t) - y(t)]$, the difference between the desired reference and actual output after all transients have decayed. It measures how accurately the system tracks inputs in the long term.

    **Concept Tested:** Steady-State Error

---

#### 2. The position error constant $K_p$ is used to calculate steady-state error for:

<div class="upper-alpha" markdown>
1. Ramp inputs
2. Step inputs
3. Parabolic inputs
4. Impulse inputs
</div>

??? question "Show Answer"
    The correct answer is **B**. The position error constant $K_p = \lim_{s \to 0} G(s)H(s)$ determines steady-state error to a step input: $e_{ss} = 1/(1 + K_p)$. For ramp inputs use $K_v$, for parabolic use $K_a$.

    **Concept Tested:** Position Error Constant, Error Constants

---

#### 3. A Type 1 system has:

<div class="upper-alpha" markdown>
1. No integrators in the open-loop transfer function
2. Exactly one integrator (pole at origin) in the open-loop transfer function
3. Two or more integrators in the open-loop transfer function
4. Only proportional control
</div>

??? question "Show Answer"
    The correct answer is **B**. System type equals the number of pure integrators (poles at $s = 0$) in the open-loop transfer function. Type 1 has exactly one integrator: $GH = K/[s(s+a)...]$. Type 0 has none; Type 2 has two.

    **Concept Tested:** Type 1 System, System Type

---

#### 4. For a Type 0 system responding to a unit step input, the steady-state error is:

<div class="upper-alpha" markdown>
1. Zero
2. $1/(1 + K_p)$ where $K_p$ is finite
3. Infinite
4. Equal to the DC gain
</div>

??? question "Show Answer"
    The correct answer is **B**. Type 0 systems have finite $K_p$, so steady-state error to a step is $e_{ss} = 1/(1 + K_p)$. Increasing gain reduces but never eliminates this error. Only Type 1 or higher systems can track steps with zero steady-state error.

    **Concept Tested:** Type 0 System, Position Error Constant

---

#### 5. The velocity error constant $K_v$ is calculated as:

<div class="upper-alpha" markdown>
1. $\lim_{s \to 0} G(s)H(s)$
2. $\lim_{s \to 0} sG(s)H(s)$
3. $\lim_{s \to 0} s^2G(s)H(s)$
4. $\lim_{s \to \infty} G(s)H(s)$
</div>

??? question "Show Answer"
    The correct answer is **B**. The velocity error constant is $K_v = \lim_{s \to 0} sG(s)H(s)$. For a ramp input, steady-state error is $e_{ss} = 1/K_v$. Type 0 systems have $K_v = 0$ (infinite error to ramp); Type 1+ systems have finite positive $K_v$.

    **Concept Tested:** Velocity Error Constant

---

#### 6. A Type 2 system responding to a ramp input has steady-state error of:

<div class="upper-alpha" markdown>
1. Infinite
2. $1/K_v$
3. Zero
4. Equal to the ramp slope
</div>

??? question "Show Answer"
    The correct answer is **C**. Type 2 systems have two integrators, so $K_v = \infty$, making $e_{ss} = 1/K_v = 0$ for ramp inputs. Type 2 systems can track both steps and ramps with zero steady-state error, but have finite error to parabolic inputs.

    **Concept Tested:** Type 2 System, Steady-State Error

---

#### 7. Adding an integrator to a control system:

<div class="upper-alpha" markdown>
1. Always improves stability margins
2. Increases the system type by one and reduces steady-state error
3. Decreases the system order
4. Has no effect on steady-state performance
</div>

??? question "Show Answer"
    The correct answer is **B**. Adding an integrator ($1/s$) increases the system type by one, improving steady-state accuracy (e.g., converting a Type 0 with step error into a Type 1 with zero step error). However, it adds phase lag of -90°, which can reduce stability margins.

    **Concept Tested:** System Type, Steady-State Error

---

#### 8. The steady-state error to a unit ramp input for a Type 1 system is:

<div class="upper-alpha" markdown>
1. Zero
2. $1/K_v$
3. Infinite
4. $1/(1 + K_p)$
</div>

??? question "Show Answer"
    The correct answer is **B**. Type 1 systems have finite velocity error constant $K_v$, so steady-state error to a ramp is $e_{ss} = 1/K_v$. This error can be reduced by increasing gain but cannot be eliminated without adding another integrator (making it Type 2).

    **Concept Tested:** Type 1 System, Velocity Error Constant

---

#### 9. Disturbance errors can be reduced by:

<div class="upper-alpha" markdown>
1. Decreasing the loop gain
2. Increasing the loop gain at frequencies where disturbances occur
3. Removing all integrators
4. Reducing the system bandwidth
</div>

??? question "Show Answer"
    The correct answer is **B**. High loop gain suppresses disturbances. For a disturbance entering at the plant input, the transfer function from disturbance to output is approximately $1/L(s)$ where $L(s)$ is loop gain. Higher $|L(j\omega)|$ at the disturbance frequency reduces its effect.

    **Concept Tested:** Disturbance Error

---

#### 10. The acceleration error constant $K_a$ determines steady-state error for:

<div class="upper-alpha" markdown>
1. Step inputs
2. Ramp inputs
3. Parabolic inputs
4. Sinusoidal inputs
</div>

??? question "Show Answer"
    The correct answer is **C**. The acceleration error constant $K_a = \lim_{s \to 0} s^2G(s)H(s)$ determines steady-state error to a parabolic input (constant acceleration): $e_{ss} = 1/K_a$. Only Type 2 or higher systems have finite $K_a$.

    **Concept Tested:** Acceleration Error Constant

---
