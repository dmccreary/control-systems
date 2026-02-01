# Quiz: Dynamic System Properties

Test your understanding of linearity, time-invariance, superposition, and the LTI framework that underlies classical control theory.

---

#### 1. What distinguishes a dynamic system from a static system?

<div class="upper-alpha" markdown>
1. Dynamic systems are always more complex
2. Dynamic systems have memory—their output depends on input history
3. Dynamic systems can only be described by transfer functions
4. Dynamic systems always oscillate
</div>

??? question "Show Answer"
    The correct answer is **B**. A dynamic system's output depends not only on the current input but also on past inputs and internal state—the system has memory. A resistor is static (current depends only on voltage now), while a capacitor is dynamic (voltage depends on accumulated charge). Options A, C, and D describe properties that may or may not apply to specific dynamic systems.

    **Concept Tested:** Dynamic System

---

#### 2. A system is linear if it satisfies which two properties?

<div class="upper-alpha" markdown>
1. Stability and causality
2. Homogeneity and additivity
3. Time-invariance and boundedness
4. Continuity and differentiability
</div>

??? question "Show Answer"
    The correct answer is **B**. A linear system must satisfy homogeneity (scaling the input scales the output by the same factor) and additivity (the response to a sum of inputs equals the sum of individual responses). Together, these enable the superposition principle. Options A, C, and D describe other system properties that are independent of linearity.

    **Concept Tested:** Linear System, Homogeneity, Superposition Principle

---

#### 3. For a time-invariant system, if input $u(t)$ produces output $y(t)$, what does input $u(t-T)$ produce?

<div class="upper-alpha" markdown>
1. $y(t) - T$
2. $y(t-T)$
3. $T \cdot y(t)$
4. $y(t)/T$
</div>

??? question "Show Answer"
    The correct answer is **B**. Time-invariance means the system behaves the same regardless of when the input is applied. If you delay the input by $T$ seconds, the output is simply delayed by the same $T$ seconds. The system doesn't "know" what time it is—it responds identically to the same input pattern whenever it occurs.

    **Concept Tested:** Time-Invariant System

---

#### 4. Why is the superposition principle so valuable in control systems analysis?

<div class="upper-alpha" markdown>
1. It guarantees system stability
2. It allows complex inputs to be analyzed by decomposing them into simpler parts
3. It eliminates the need for differential equations
4. It ensures zero steady-state error
</div>

??? question "Show Answer"
    The correct answer is **B**. Superposition allows engineers to analyze a system's response to simple canonical inputs (steps, impulses, sinusoids) and then build up the response to any complex input by combining these simple responses. This "divide and conquer" approach makes analysis tractable. Options A, C, and D describe benefits that superposition does not provide.

    **Concept Tested:** Superposition Principle

---

#### 5. An LTI system is one that is:

<div class="upper-alpha" markdown>
1. Linear and time-invariant
2. Laplace-transformable and integrable
3. Logarithmic and transfer-based
4. Low-pass and tunable
</div>

??? question "Show Answer"
    The correct answer is **A**. LTI stands for Linear Time-Invariant—a system that satisfies both linearity (superposition applies) and time-invariance (behavior doesn't change over time). LTI systems are the foundation of classical control theory because they permit the use of transfer functions, Bode plots, and root locus methods.

    **Concept Tested:** LTI System

---

#### 6. A causal system is one whose output at time $t$ depends only on:

<div class="upper-alpha" markdown>
1. Future inputs
2. Current and past inputs
3. The input at exactly time $t$
4. Inputs over all time (past, present, and future)
</div>

??? question "Show Answer"
    The correct answer is **B**. Causality means the system cannot respond to inputs that haven't happened yet—no peeking into the future. The output $y(t)$ can depend on $u(\tau)$ only for $\tau \leq t$. This is a physical constraint: all realizable systems must be causal. Option A describes an impossible system, C describes a static system, and D describes a non-causal system.

    **Concept Tested:** Causality

---

#### 7. Which of the following indicates a nonlinear system?

<div class="upper-alpha" markdown>
1. The system is described by a first-order differential equation
2. The output contains a term like $y^2$ or $\sin(y)$
3. The system has a single time constant
4. The system's transfer function has poles in the left half-plane
</div>

??? question "Show Answer"
    The correct answer is **B**. Nonlinearity arises when the differential equation contains products of variables, powers other than one ($y^2$, $\sqrt{y}$), or transcendental functions of the output ($\sin(y)$, $e^y$). These violate homogeneity because scaling the input doesn't simply scale the output. Options A, C, and D are all consistent with linear systems.

    **Concept Tested:** Linear System

---

#### 8. The order of a differential equation describing a dynamic system corresponds to:

<div class="upper-alpha" markdown>
1. The number of inputs to the system
2. The number of independent energy storage elements
3. The gain of the system
4. The number of feedback loops
</div>

??? question "Show Answer"
    The correct answer is **B**. The order of a system equals the number of independent energy storage elements (capacitors, inductors, springs, masses, etc.), which also equals the highest derivative in the governing differential equation and the number of initial conditions needed. Options A, C, and D describe other system characteristics unrelated to order.

    **Concept Tested:** Differential Equation, Dynamic System

---

#### 9. A rocket whose mass decreases as fuel burns is an example of what type of system?

<div class="upper-alpha" markdown>
1. Nonlinear time-invariant
2. Linear time-varying
3. Static causal
4. LTI
</div>

??? question "Show Answer"
    The correct answer is **B**. As the rocket burns fuel, its mass (a system parameter) changes with time, making it time-varying. If we linearize the dynamics around operating points, the equations may be linear, but the coefficients change over time. This is not LTI because time-invariance is violated. Option A would require the dynamics to also be nonlinear, and option C describes a system without memory.

    **Concept Tested:** Time-Invariant System

---

#### 10. If you double the input to a linear system, what happens to the output?

<div class="upper-alpha" markdown>
1. The output remains unchanged
2. The output is doubled
3. The output is squared
4. The output is halved
</div>

??? question "Show Answer"
    The correct answer is **B**. This is the homogeneity property of linear systems: scaling the input by a constant scales the output by the same constant. If $u(t) \rightarrow y(t)$, then $2u(t) \rightarrow 2y(t)$. Option C ($y^2$) would indicate a nonlinear relationship. Options A and D contradict the homogeneity property.

    **Concept Tested:** Homogeneity, Linear System

---
