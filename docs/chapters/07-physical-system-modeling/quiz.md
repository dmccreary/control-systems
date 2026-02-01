# Quiz: Physical System Modeling

Test your understanding of deriving mathematical models for electrical, mechanical, and electromechanical systems.

---

#### 1. In an RC circuit with input voltage across both components and output taken across the capacitor, the transfer function is:

<div class="upper-alpha" markdown>
1. $G(s) = \frac{RCs}{RCs + 1}$
2. $G(s) = \frac{1}{RCs + 1}$
3. $G(s) = \frac{RCs + 1}{1}$
4. $G(s) = \frac{s}{RCs + 1}$
</div>

??? question "Show Answer"
    The correct answer is **B**. The RC low-pass filter has transfer function $G(s) = 1/(RCs + 1) = 1/(\tau s + 1)$ where $\tau = RC$ is the time constant. This is a first-order system with DC gain of 1 and a single pole at $s = -1/RC$.

    **Concept Tested:** RC Circuit

---

#### 2. In the impedance analogy for analogous systems, force in a mechanical system corresponds to what quantity in an electrical system?

<div class="upper-alpha" markdown>
1. Current
2. Voltage
3. Resistance
4. Capacitance
</div>

??? question "Show Answer"
    The correct answer is **B**. In the force-voltage (impedance) analogy, mechanical force corresponds to electrical voltage, velocity to current, and mass to inductance. This analogy allows engineers to apply electrical circuit analysis techniques to mechanical systems.

    **Concept Tested:** Force-Voltage Analogy, Impedance Analogy

---

#### 3. The transfer function of an armature-controlled DC motor (voltage input to angular velocity output) is typically:

<div class="upper-alpha" markdown>
1. A pure integrator ($1/s$)
2. A first-order system
3. A second-order system
4. A constant gain
</div>

??? question "Show Answer"
    The correct answer is **C**. An armature-controlled DC motor with significant inductance has a second-order transfer function from voltage to velocity, with poles determined by electrical (armature) and mechanical (rotor inertia) time constants. If inductance is negligible, it simplifies to first-order.

    **Concept Tested:** DC Motor, Motor Transfer Function

---

#### 4. In a mass-spring-damper system, which component stores potential energy?

<div class="upper-alpha" markdown>
1. The mass
2. The spring
3. The damper
4. All three equally
</div>

??? question "Show Answer"
    The correct answer is **B**. The spring stores potential energy ($E = \frac{1}{2}kx^2$). The mass stores kinetic energy ($E = \frac{1}{2}mv^2$). The damper dissipates energy (converts it to heat) but doesn't store it. Together, mass and spring give the system second-order dynamics.

    **Concept Tested:** Mass-Spring-Damper

---

#### 5. A gear train with gear ratio $N = N_2/N_1$ (output teeth / input teeth) transforms torques according to:

<div class="upper-alpha" markdown>
1. $T_{out} = N \cdot T_{in}$
2. $T_{out} = T_{in} / N$
3. $T_{out} = T_{in}$
4. $T_{out} = N^2 \cdot T_{in}$
</div>

??? question "Show Answer"
    The correct answer is **A**. An ideal gear train multiplies torque by the gear ratio: $T_{out} = N \cdot T_{in}$. Conversely, angular velocity is divided by the gear ratio: $\omega_{out} = \omega_{in}/N$. Power (the product) is conserved in an ideal gear train.

    **Concept Tested:** Gear Train

---

#### 6. An RLC series circuit is analogous to which mechanical system?

<div class="upper-alpha" markdown>
1. A pendulum
2. A mass-spring-damper
3. A lever system
4. A fluid tank
</div>

??? question "Show Answer"
    The correct answer is **B**. An RLC circuit and a mass-spring-damper share the same second-order differential equation structure. Using the force-voltage analogy: inductance L ↔ mass m, resistance R ↔ damping b, and 1/C ↔ spring constant k.

    **Concept Tested:** RLC Circuit, Analogous Systems

---

#### 7. In an op-amp inverting amplifier configuration, the output voltage is:

<div class="upper-alpha" markdown>
1. Equal to the input voltage
2. Proportional to the input with opposite sign
3. The integral of the input
4. The derivative of the input
</div>

??? question "Show Answer"
    The correct answer is **B**. An inverting op-amp amplifier produces $V_{out} = -(R_f/R_{in}) \cdot V_{in}$, where $R_f$ is the feedback resistor and $R_{in}$ is the input resistor. The output is an inverted (negative) and scaled version of the input.

    **Concept Tested:** Op-Amp Circuits

---

#### 8. Thermal systems are typically modeled as:

<div class="upper-alpha" markdown>
1. First-order systems with temperature as the state
2. Second-order oscillatory systems
3. Systems with complex conjugate poles
4. Pure gain systems with no dynamics
</div>

??? question "Show Answer"
    The correct answer is **A**. Thermal systems (like heating a room or a component) are typically first-order, with thermal resistance and capacitance creating a time constant $\tau = R_{th}C_{th}$. Temperature changes exponentially toward the new equilibrium, similar to an RC circuit.

    **Concept Tested:** Thermal Systems

---

#### 9. The mobility analogy differs from the impedance analogy in that:

<div class="upper-alpha" markdown>
1. Force corresponds to current rather than voltage
2. Only applies to rotational systems
3. Ignores damping elements
4. Cannot model capacitors
</div>

??? question "Show Answer"
    The correct answer is **A**. In the mobility (force-current) analogy, force corresponds to current and velocity to voltage—the opposite of the impedance analogy. This alternative mapping can sometimes make circuit diagrams more intuitive for certain mechanical configurations.

    **Concept Tested:** Mobility Analogy, Force-Current Analogy

---

#### 10. A simple pendulum's equation of motion includes $\sin\theta$, which makes it:

<div class="upper-alpha" markdown>
1. A linear system
2. A first-order system
3. A nonlinear system
4. An unstable system
</div>

??? question "Show Answer"
    The correct answer is **C**. The $\sin\theta$ term makes the pendulum equation nonlinear because $\sin\theta$ doesn't scale linearly with $\theta$. For small angles, we approximate $\sin\theta \approx \theta$ to obtain a linear model, but the true system is fundamentally nonlinear.

    **Concept Tested:** Pendulum System

---
