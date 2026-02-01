# Quiz: Frequency Response and Bode Plots

Test your understanding of sinusoidal steady-state analysis and Bode plot construction.

---

#### 1. When a sinusoidal input is applied to a stable LTI system, the steady-state output is:

<div class="upper-alpha" markdown>
1. A constant DC value
2. A sinusoid at the same frequency with possibly different amplitude and phase
3. A sinusoid at double the input frequency
4. An exponentially decaying signal
</div>

??? question "Show Answer"
    The correct answer is **B**. For a stable LTI system, the steady-state response to a sinusoidal input is a sinusoid at the same frequency, but with amplitude scaled by $|G(j\omega)|$ and phase shifted by $\angle G(j\omega)$. This is the basis of frequency response analysis.

    **Concept Tested:** Sinusoidal Steady State, Frequency Response

---

#### 2. The frequency response $G(j\omega)$ is obtained from the transfer function by:

<div class="upper-alpha" markdown>
1. Setting $s = 0$
2. Setting $s = j\omega$
3. Taking the derivative with respect to $s$
4. Finding the poles and zeros
</div>

??? question "Show Answer"
    The correct answer is **B**. The frequency response is found by substituting $s = j\omega$ into the transfer function: $G(j\omega) = G(s)|_{s=j\omega}$. This gives a complex function of frequency whose magnitude and phase characterize the system's sinusoidal response.

    **Concept Tested:** Substitution s=jw, Frequency Transfer Func

---

#### 3. In a Bode magnitude plot, the vertical axis is typically scaled in:

<div class="upper-alpha" markdown>
1. Linear amplitude units
2. Radians
3. Decibels (dB)
4. Seconds
</div>

??? question "Show Answer"
    The correct answer is **C**. Bode magnitude plots use decibels: $|G|_{dB} = 20\log_{10}|G|$. This logarithmic scale converts multiplication into addition, making it easy to combine gains of cascaded systems and to show wide dynamic ranges.

    **Concept Tested:** Decibel, Bode Magnitude Plot

---

#### 4. The corner frequency (break frequency) of a first-order system $G(s) = 1/(\tau s + 1)$ is:

<div class="upper-alpha" markdown>
1. $\omega_c = \tau$
2. $\omega_c = 1/\tau$
3. $\omega_c = 2\pi\tau$
4. $\omega_c = \tau^2$
</div>

??? question "Show Answer"
    The correct answer is **B**. The corner frequency is $\omega_c = 1/\tau$ rad/s, where the magnitude is 3 dB below the low-frequency asymptote and the phase is -45°. This is where the asymptotic approximation transitions from flat (0 dB/decade slope) to -20 dB/decade.

    **Concept Tested:** Corner Frequency, First-Order Factor

---

#### 5. A decade represents a frequency ratio of:

<div class="upper-alpha" markdown>
1. 2:1
2. 10:1
3. 100:1
4. e:1 (approximately 2.718:1)
</div>

??? question "Show Answer"
    The correct answer is **B**. A decade is a 10:1 frequency ratio (e.g., 1 rad/s to 10 rad/s, or 100 Hz to 1000 Hz). On a logarithmic frequency axis, decades appear as equal intervals. An octave is a 2:1 ratio.

    **Concept Tested:** Decade

---

#### 6. The Bode magnitude plot of a pure integrator ($G(s) = 1/s$) has a slope of:

<div class="upper-alpha" markdown>
1. 0 dB/decade (flat)
2. -20 dB/decade
3. +20 dB/decade
4. -40 dB/decade
</div>

??? question "Show Answer"
    The correct answer is **B**. A pure integrator has magnitude $|1/j\omega| = 1/\omega$, which decreases by a factor of 10 (or -20 dB) for each decade increase in frequency. The phase is constant at -90°.

    **Concept Tested:** Integrator Bode Plot

---

#### 7. Bandwidth of a system is typically defined as the frequency where the magnitude drops to:

<div class="upper-alpha" markdown>
1. 0 dB
2. -3 dB (half-power point)
3. -20 dB
4. -90 dB
</div>

??? question "Show Answer"
    The correct answer is **B**. Bandwidth is the frequency range where the gain is within 3 dB of its maximum (low-frequency) value. At -3 dB, the power is half of maximum (hence "half-power point"), and the amplitude is $1/\sqrt{2} \approx 0.707$ of maximum.

    **Concept Tested:** Bandwidth, Half-Power Point, Cutoff Frequency

---

#### 8. The resonant peak in a second-order system's frequency response increases as:

<div class="upper-alpha" markdown>
1. Damping ratio increases toward 1
2. Damping ratio decreases toward 0
3. Natural frequency decreases
4. The DC gain decreases
</div>

??? question "Show Answer"
    The correct answer is **B**. The resonant peak magnitude $M_r = 1/(2\zeta\sqrt{1-\zeta^2})$ increases as damping ratio decreases. For $\zeta < 0.707$, there is a resonant peak above unity gain. At $\zeta = 0$, the peak would be infinite (undamped resonance).

    **Concept Tested:** Resonant Peak, Damping Ratio

---

#### 9. A low-pass filter allows:

<div class="upper-alpha" markdown>
1. Only high frequencies to pass
2. Frequencies below the cutoff to pass while attenuating higher frequencies
3. A narrow band of frequencies to pass
4. Only frequencies that match the resonant frequency
</div>

??? question "Show Answer"
    The correct answer is **B**. A low-pass filter passes low frequencies with little attenuation while progressively attenuating higher frequencies above the cutoff. A first-order RC circuit is a classic low-pass filter with -20 dB/decade rolloff.

    **Concept Tested:** Low-Pass System

---

#### 10. In constructing a Bode plot for a transfer function, the asymptotic magnitude contributions from individual factors:

<div class="upper-alpha" markdown>
1. Multiply together
2. Add together (in dB)
3. Average out
4. Cancel each other
</div>

??? question "Show Answer"
    The correct answer is **B**. In decibels, multiplication becomes addition: $|G_1 \cdot G_2|_{dB} = |G_1|_{dB} + |G_2|_{dB}$. This allows building complex Bode plots by graphically adding the contributions of individual first-order, second-order, integrator, and constant terms.

    **Concept Tested:** Bode Plot Construction, Asymptotic Approximation

---
