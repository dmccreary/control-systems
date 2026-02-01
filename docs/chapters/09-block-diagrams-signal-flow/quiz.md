# Quiz: Block Diagrams and Signal Flow

Test your understanding of graphical methods for representing and analyzing interconnected control systems.

---

#### 1. In a block diagram, a summing junction is used to:

<div class="upper-alpha" markdown>
1. Multiply two signals together
2. Add or subtract signals with appropriate signs
3. Split a signal into multiple paths
4. Represent the transfer function of a component
</div>

??? question "Show Answer"
    The correct answer is **B**. A summing junction (represented as a circle with + and - signs) combines signals algebraically—adding or subtracting them based on the indicated signs. The error signal in a feedback system is computed at a summing junction where the reference is added and the feedback signal is subtracted.

    **Concept Tested:** Summing Junction

---

#### 2. Three blocks with transfer functions $G_1$, $G_2$, and $G_3$ in cascade have an equivalent transfer function of:

<div class="upper-alpha" markdown>
1. $G_1 + G_2 + G_3$
2. $G_1 \cdot G_2 \cdot G_3$
3. $1/(G_1 \cdot G_2 \cdot G_3)$
4. $G_1 / (G_2 \cdot G_3)$
</div>

??? question "Show Answer"
    The correct answer is **B**. For blocks in cascade (series), the equivalent transfer function is the product of individual transfer functions: $G_{eq} = G_1 \cdot G_2 \cdot G_3$. The output of each block becomes the input to the next, and Laplace transforms of cascaded systems multiply.

    **Concept Tested:** Cascade Connection

---

#### 3. For a negative feedback system with forward path $G$ and feedback path $H$, the closed-loop transfer function is:

<div class="upper-alpha" markdown>
1. $G/(1 - GH)$
2. $G/(1 + GH)$
3. $GH/(1 + GH)$
4. $G + H$
</div>

??? question "Show Answer"
    The correct answer is **B**. The standard closed-loop transfer function with negative feedback is $T = G/(1 + GH)$. The "1 + GH" term in the denominator arises from the negative feedback sign at the summing junction. For positive feedback, it would be $G/(1 - GH)$.

    **Concept Tested:** Closed-Loop Transfer, Feedback Connection

---

#### 4. A pickoff point in a block diagram is used to:

<div class="upper-alpha" markdown>
1. Terminate a signal path
2. Provide the same signal to multiple paths without affecting it
3. Invert a signal
4. Amplify a signal
</div>

??? question "Show Answer"
    The correct answer is **B**. A pickoff point (or takeoff point) distributes a signal to multiple destinations without loading or changing the signal. It's represented as a dot where branches split off. The original signal continues unchanged while copies go to other paths.

    **Concept Tested:** Pickoff Point

---

#### 5. In a unity feedback system, the feedback transfer function $H(s)$ equals:

<div class="upper-alpha" markdown>
1. Zero
2. One (unity)
3. The same as $G(s)$
4. Infinity
</div>

??? question "Show Answer"
    The correct answer is **B**. Unity feedback means $H(s) = 1$—the output is fed back directly without modification. The closed-loop transfer function simplifies to $T = G/(1 + G)$. This is the most common configuration for basic control analysis.

    **Concept Tested:** Unity Feedback

---

#### 6. Mason's gain formula is used to:

<div class="upper-alpha" markdown>
1. Find pole locations only
2. Determine the overall transfer function from a signal flow graph
3. Calculate the DC gain of a system
4. Measure phase margin
</div>

??? question "Show Answer"
    The correct answer is **B**. Mason's gain formula provides a systematic way to find the overall transfer function from a signal flow graph: $T = \sum(P_k \Delta_k)/\Delta$, where $P_k$ are forward path gains, $\Delta$ is the graph determinant, and $\Delta_k$ are cofactors. It's powerful for complex systems with multiple loops.

    **Concept Tested:** Mason's Gain Formula

---

#### 7. The loop gain in a feedback system refers to:

<div class="upper-alpha" markdown>
1. The gain of the forward path only
2. The product of all gains around a closed loop ($GH$)
3. The reciprocal of the closed-loop gain
4. The DC gain at zero frequency
</div>

??? question "Show Answer"
    The correct answer is **B**. Loop gain is the product of all transfer functions encountered when traversing a closed loop once, typically $L = GH$ for a simple feedback system. The characteristic equation is $1 + L = 0$, and loop gain magnitude is critical for stability analysis.

    **Concept Tested:** Loop Gain

---

#### 8. Non-touching loops in signal flow graphs are loops that:

<div class="upper-alpha" markdown>
1. Have negative gain products
2. Share no common nodes
3. Touch the forward path
4. Have equal gains
</div>

??? question "Show Answer"
    The correct answer is **B**. Non-touching loops are loops that share no common nodes—they are completely separate in the signal flow graph. In Mason's gain formula, products of non-touching loop gains appear in the graph determinant with alternating signs.

    **Concept Tested:** Non-Touching Loops

---

#### 9. Block diagram reduction is the process of:

<div class="upper-alpha" markdown>
1. Adding more blocks to a system
2. Simplifying a complex block diagram to find the equivalent transfer function
3. Converting a block diagram to a differential equation
4. Finding the poles of each block
</div>

??? question "Show Answer"
    The correct answer is **B**. Block diagram reduction systematically simplifies complex interconnections of blocks into a single equivalent transfer function using algebraic rules for cascade, parallel, and feedback combinations. This enables finding the overall system transfer function.

    **Concept Tested:** Block Diagram Reduction

---

#### 10. The open-loop transfer function of a feedback system is:

<div class="upper-alpha" markdown>
1. The closed-loop transfer function minus one
2. The product of the forward and feedback path transfer functions ($GH$)
3. The sum of all individual block transfer functions
4. The inverse of the closed-loop transfer function
</div>

??? question "Show Answer"
    The correct answer is **B**. The open-loop transfer function is $L(s) = G(s)H(s)$, representing the complete path around the loop with the feedback connection broken. It's fundamental for stability analysis because the characteristic equation is $1 + L(s) = 0$.

    **Concept Tested:** Open-Loop Transfer

---
