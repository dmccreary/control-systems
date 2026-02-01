# Quiz: Root Locus Analysis and Design

Test your understanding of root locus methods for analyzing closed-loop pole movement and controller design.

---

#### 1. The root locus shows how closed-loop poles move as:

<div class="upper-alpha" markdown>
1. Time increases
2. A system parameter (typically gain $K$) varies from zero to infinity
3. The input frequency changes
4. The system order increases
</div>

??? question "Show Answer"
    The correct answer is **B**. The root locus is a plot of all possible closed-loop pole locations as a parameter (usually gain $K$) varies from 0 to ∞. It shows the complete trajectory of poles, revealing how system dynamics change with gain.

    **Concept Tested:** Root Locus

---

#### 2. The root locus begins at the open-loop poles and ends at:

<div class="upper-alpha" markdown>
1. The origin
2. The open-loop zeros (including zeros at infinity)
3. The imaginary axis
4. The closed-loop poles
</div>

??? question "Show Answer"
    The correct answer is **B**. Root locus branches start at open-loop poles (when $K=0$) and end at open-loop zeros (as $K→∞$). If there are more poles than zeros, extra branches end at "zeros at infinity" along asymptotes.

    **Concept Tested:** Starting Points, Ending Points

---

#### 3. The number of separate branches in a root locus equals:

<div class="upper-alpha" markdown>
1. The number of open-loop zeros
2. The difference between poles and zeros
3. The number of open-loop poles (order of the system)
4. The gain $K$
</div>

??? question "Show Answer"
    The correct answer is **C**. The number of root locus branches equals the number of open-loop poles, which is the order of the characteristic polynomial. Each pole traces a continuous path as $K$ varies.

    **Concept Tested:** Number of Branches

---

#### 4. A point is on the root locus if the angle condition is satisfied, which requires:

<div class="upper-alpha" markdown>
1. The sum of angles from zeros minus angles from poles equals $\pm 180°(2k+1)$
2. The product of all pole distances equals the product of all zero distances
3. The point is equidistant from all poles
4. The phase shift is exactly $0°$
</div>

??? question "Show Answer"
    The correct answer is **A**. The angle condition requires: $\sum\angle(s-z_i) - \sum\angle(s-p_j) = \pm 180°(2k+1)$ for $k = 0, 1, 2, ...$. This is an odd multiple of 180°, ensuring the loop gain $GH = -1$ for negative feedback.

    **Concept Tested:** Angle Condition

---

#### 5. The root locus exists on the real axis at points where:

<div class="upper-alpha" markdown>
1. There are poles nearby
2. The total number of real poles and zeros to the right is odd
3. The total number of real poles and zeros to the right is even
4. No poles or zeros exist
</div>

??? question "Show Answer"
    The correct answer is **B**. The root locus exists on segments of the real axis where the total count of real poles and real zeros to the right of the point is odd. This ensures the angle condition (odd multiple of 180°) is satisfied.

    **Concept Tested:** Real Axis Segments

---

#### 6. The centroid of the asymptotes is calculated as:

<div class="upper-alpha" markdown>
1. The product of poles divided by the product of zeros
2. (Sum of poles − Sum of zeros) / (Number of poles − Number of zeros)
3. The average of pole magnitudes
4. The gain at which the system becomes unstable
</div>

??? question "Show Answer"
    The correct answer is **B**. The centroid (center point from which asymptotes radiate) is: $\sigma_c = \frac{\sum p_i - \sum z_j}{n - m}$, where $n$ is the number of poles and $m$ is the number of zeros. Asymptotes meet at this real-axis point.

    **Concept Tested:** Centroid, Asymptotes

---

#### 7. A breakaway point is where:

<div class="upper-alpha" markdown>
1. The root locus crosses the imaginary axis
2. Root locus branches leave the real axis and become complex
3. The system gain equals unity
4. Poles and zeros cancel
</div>

??? question "Show Answer"
    The correct answer is **B**. A breakaway point is where two or more root locus branches on the real axis depart to become complex conjugate pairs. At breakaway points, $dK/ds = 0$. Break-in points are where complex branches return to the real axis.

    **Concept Tested:** Breakaway Point

---

#### 8. The imaginary axis crossing of the root locus indicates:

<div class="upper-alpha" markdown>
1. Maximum system bandwidth
2. The critical gain where the system becomes marginally stable
3. Zero steady-state error
4. Maximum damping ratio
</div>

??? question "Show Answer"
    The correct answer is **B**. When the root locus crosses the imaginary axis, poles move from the stable LHP to the unstable RHP. The gain at this crossing is the critical gain (maximum stable gain), and the crossing frequency is the oscillation frequency at marginal stability.

    **Concept Tested:** Imaginary Axis Crossing

---

#### 9. Dominant pole design focuses on:

<div class="upper-alpha" markdown>
1. Placing all poles at the origin
2. Positioning the poles closest to the imaginary axis to achieve desired specs
3. Maximizing the number of poles
4. Eliminating all zeros
</div>

??? question "Show Answer"
    The correct answer is **B**. Dominant pole design places the closed-loop poles nearest the imaginary axis (which dominate the transient response) at locations corresponding to desired damping ratio and natural frequency. Other poles are designed to be far enough left to be negligible.

    **Concept Tested:** Dominant Pole Design

---

#### 10. The magnitude condition is used to:

<div class="upper-alpha" markdown>
1. Determine if a point is on the root locus
2. Find the gain $K$ required to place poles at a specific root locus location
3. Calculate the system's DC gain
4. Measure the phase margin
</div>

??? question "Show Answer"
    The correct answer is **B**. Once the angle condition confirms a point is on the root locus, the magnitude condition finds the corresponding gain: $K = \frac{\prod|s-p_j|}{\prod|s-z_i|}$. This enables precise pole placement by calculating the required gain.

    **Concept Tested:** Magnitude Condition, Gain Adjustment

---
