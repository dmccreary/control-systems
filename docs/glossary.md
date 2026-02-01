# Glossary of Control Systems Terms

This glossary provides definitions for the 300 concepts covered in this Control Systems course. Each definition follows ISO 11179 metadata registry standards: precise, concise, distinct, non-circular, and free of business rules.

#### Acceleration Error Constant

A parameter that quantifies a control system's ability to track parabolic (constant acceleration) inputs with zero steady-state error. Denoted $K_a$, it equals the limit of $s^2 G(s)H(s)$ as $s$ approaches zero.

**Example:** A Type 2 system with $K_a = 100$ has a steady-state error of 1% when tracking a unit parabolic input.

#### Actuator

A device that converts control signals into physical action on a plant. Actuators bridge the gap between the controller's commands and the physical system being controlled.

**Example:** In Gyra, the DC motors are actuators that convert voltage signals into torque to keep her balanced.

#### All-Pass System

A system that passes all frequencies with unity gain but introduces frequency-dependent phase shift. The magnitude response is constant across all frequencies.

**Example:** An all-pass filter with transfer function $(s-1)/(s+1)$ has unity gain at all frequencies but varies in phase from 0° to -180°.

#### Analogous Systems

Physical systems from different domains (electrical, mechanical, thermal, fluid) that share identical mathematical descriptions. The differential equations governing these systems have the same form despite different physical variables.

**Example:** A mass-spring-damper system and an RLC circuit are analogous because both are described by second-order differential equations with the same structure.

#### Angle Condition

A requirement in root locus construction stating that a point lies on the root locus if the sum of angles from zeros minus the sum of angles from open-loop poles equals an odd multiple of 180°.

**Example:** To verify that $s = -2 + j2$ lies on the root locus, calculate angles from all poles and zeros to this point and check if they sum to ±180°.

#### Anti-Windup

A control technique that prevents the integral term in a PID controller from accumulating excessively when the actuator reaches its physical limits. Without anti-windup, large integral buildup causes sluggish recovery when the system returns to normal operation.

**Example:** When Gyra's motors saturate at maximum torque, anti-windup freezes the integral term to prevent overshoot when she regains balance.

#### Armature-Controlled Motor

A DC motor configuration where speed is controlled by varying the voltage applied to the armature winding while keeping the field current constant. This is the most common DC motor control method.

**Example:** Most hobby servo motors and robotics actuators use armature control because it provides fast, linear speed response.

#### Arrival Angle

The angle at which root locus branches approach a complex zero as gain increases toward infinity. Calculated using the angle condition with all other poles and zeros.

**Example:** For a zero at $s = -1 + j$, the arrival angle determines the direction from which root locus branches approach this zero.

#### Asymptotes

Straight lines that root locus branches approach as they extend toward infinity. The number of asymptotes equals the number of poles minus the number of zeros in the open-loop transfer function.

**Example:** A system with 4 poles and 1 zero has 3 asymptotes, which the root locus branches follow as gain approaches infinity.

#### Asymptote Angles

The angles at which root locus asymptotes radiate from the centroid. Calculated as $(2k+1) \times 180°/(n-m)$ where $n$ is the number of poles and $m$ is the number of zeros.

**Example:** For a system with 3 poles and no zeros, asymptote angles are 60°, 180°, and 300°.

#### Asymptotic Approximation

A simplified representation of Bode plot curves using straight-line segments that approach the actual response at extreme frequencies. These approximations enable rapid hand-sketching of frequency response.

**Example:** A first-order low-pass filter's magnitude plot is approximated by a flat line below the corner frequency and a -20 dB/decade slope above it.

#### Auxiliary Polynomial

A polynomial derived from a row of zeros in the Routh array, used to find factors of the characteristic polynomial that lie symmetrically about the origin. Differentiating this polynomial provides the missing row entries.

**Example:** When the third row of a Routh array becomes all zeros, form the auxiliary polynomial from the row above to continue the analysis.

#### Backlash

A nonlinear effect occurring in mechanical systems where a small dead band exists due to clearance between mating parts. The output does not respond until the input exceeds this dead band.

**Example:** In a gear train, backlash occurs when changing direction because the gear teeth must traverse the gap before engaging.

#### Bandpass System

A system that passes frequencies within a specific range while attenuating frequencies above and below this band. Characterized by lower and upper cutoff frequencies.

**Example:** A radio tuner is a bandpass system that selects one station's frequency while rejecting others.

#### Bandwidth

The range of frequencies over which a system responds effectively, typically defined as the frequency range where gain remains above -3 dB (or 70.7%) of the maximum value.

**Example:** An audio amplifier with 20 kHz bandwidth can faithfully reproduce sounds up to the upper limit of human hearing.

#### BIBO Stability

Bounded-Input Bounded-Output stability, where every bounded input produces a bounded output. A system is BIBO stable if and only if all poles of its transfer function have negative real parts.

**Example:** A system with poles at $s = -2 \pm j3$ is BIBO stable because both poles have negative real parts (-2).

#### Block Diagram

A graphical representation of a control system showing the functional relationships between components using blocks, arrows, summing junctions, and pickoff points.

**Example:** A thermostat system's block diagram shows the desired temperature, error signal, heater, room, and temperature sensor as interconnected blocks.

#### Block Diagram Algebra

Mathematical rules for manipulating block diagram elements, including moving blocks across summing junctions and pickoff points, combining series and parallel blocks, and reducing feedback loops.

**Example:** Two blocks in series with gains $G_1$ and $G_2$ can be combined into a single block with gain $G_1 G_2$.

#### Block Diagram Reduction

The process of simplifying a complex block diagram into a single equivalent transfer function using block diagram algebra rules systematically.

**Example:** A multi-loop feedback system can be reduced step by step, starting with the innermost loop, until only one block relating input to output remains.

#### Bode Design Method

A controller design approach that uses Bode plots to adjust gain and add compensators (lead, lag) to achieve desired phase margin, gain margin, and bandwidth specifications.

**Example:** To increase phase margin from 30° to 50°, design a lead compensator that adds 20° of phase lead at the gain crossover frequency.

#### Bode Magnitude Plot

A graph showing the logarithm of a system's magnitude response (in decibels) versus the logarithm of frequency. The logarithmic scales allow magnitude plots of cascaded systems to be added graphically.

**Example:** A system with DC gain of 100 has a Bode magnitude plot starting at 40 dB (since $20 \log_{10}(100) = 40$).

#### Bode Phase Plot

A graph showing a system's phase response in degrees versus the logarithm of frequency. Combined with the magnitude plot, it completely characterizes the system's frequency response.

**Example:** A first-order lag contributes 0° phase at low frequencies, -45° at the corner frequency, and approaches -90° at high frequencies.

#### Bode Plot

A pair of graphs showing a system's frequency response: magnitude (in decibels) and phase (in degrees), both plotted against logarithmic frequency. Named after Hendrik Bode.

**Example:** Bode plots reveal that a system with gain crossover at 10 rad/s and phase margin of 45° will be stable with moderate overshoot.

#### Bode Plot Construction

The systematic process of sketching Bode plots by decomposing a transfer function into basic factors (constant, integrator, first-order, second-order) and adding their individual contributions.

**Example:** To construct the Bode plot for $G(s) = 10/(s+1)(s+10)$, add the individual contributions from the gain, and two first-order factors.

#### Bounded Input

An input signal whose magnitude remains within finite limits for all time. Mathematically, $|u(t)| \leq M$ for some finite constant $M$ and all $t \geq 0$.

**Example:** A step input of magnitude 5 is bounded because it never exceeds 5, while $e^t$ is unbounded.

#### Bounded Output

An output signal whose magnitude remains within finite limits for all time in response to a bounded input. This is the defining characteristic of BIBO stability.

**Example:** A stable system's step response settles to a finite steady-state value, demonstrating bounded output.

#### Branch

A directed line segment in a signal flow graph representing the transmission of a signal from one node to another, labeled with the corresponding transfer function or gain.

**Example:** In a signal flow graph, a branch from node $X_1$ to $X_2$ with gain $G$ means $X_2$ receives a contribution of $G \cdot X_1$.

#### Branch Gain

The transfer function or multiplicative factor associated with a branch in a signal flow graph. It represents how a signal is modified as it travels along that branch.

**Example:** A branch with gain $1/(s+2)$ multiplies its input signal by this transfer function.

#### Breakaway Point

A point on the real axis of the s-plane where root locus branches leave the real axis and become complex conjugates as gain increases. Occurs between adjacent poles on segments of the root locus.

**Example:** For a system with poles at $s = -1$ and $s = -3$, the breakaway point occurs at $s = -2$ on the real axis.

#### Break Frequency

See Corner Frequency.

#### Break-In Point

A point on the real axis of the s-plane where complex conjugate root locus branches return to the real axis as gain increases. Occurs between adjacent zeros on segments of the root locus.

**Example:** Complex root locus branches may break into the real axis between zeros at $s = -4$ and $s = -6$.

#### Cascade Connection

An arrangement where the output of one system connects directly to the input of the next, with the overall transfer function being the product of the individual transfer functions.

**Example:** Two amplifiers in cascade with gains of 10 and 5 produce an overall gain of 50.

#### Causality

A property of physical systems where the output depends only on present and past inputs, not future inputs. All real physical systems are causal.

**Example:** A causal system's impulse response is zero for negative time: $h(t) = 0$ for $t < 0$.

#### Centroid

The point on the real axis from which root locus asymptotes radiate. Calculated as the sum of pole locations minus the sum of zero locations, divided by the number of poles minus the number of zeros.

**Example:** For poles at -1, -2, -3 and a zero at -4, the centroid is $[(-1-2-3) - (-4)]/(3-1) = -1$.

#### Characteristic Equation

An algebraic equation whose roots determine a system's stability and dynamic behavior. Formed by setting the denominator of the closed-loop transfer function equal to zero.

**Example:** For a closed-loop system with $G(s) = K/(s^2 + 3s + 2)$ and unity feedback, the characteristic equation is $s^2 + 3s + 2 + K = 0$.

#### Characteristic Polynomial

The polynomial in the denominator of a transfer function after clearing fractions, whose roots are the system poles. Equivalently, the numerator of the characteristic equation.

**Example:** For a transfer function with denominator $s^3 + 6s^2 + 11s + 6$, this is the characteristic polynomial.

#### Characteristic Roots

The roots of the characteristic equation, which are the closed-loop poles of the system. Their locations in the s-plane determine stability and transient response characteristics.

**Example:** Characteristic roots at $s = -1 \pm j2$ indicate stable oscillatory behavior with frequency 2 rad/s.

#### Clockwise Encirclement

A path in the Nyquist plot that circles a point in the clockwise direction as frequency increases. The net number of clockwise encirclements of -1 relates to the number of unstable closed-loop poles.

**Example:** If the Nyquist plot makes two clockwise encirclements of -1 and the open-loop system has no RHP poles, there are two unstable closed-loop poles.

#### Closed-Loop Control

A control strategy where the controller uses measurement of the actual output to compute the control action. The output is "fed back" and compared with the desired reference.

**Example:** A thermostat measures room temperature (output) and compares it to the setpoint to decide whether to turn heating on or off.

#### Closed-Loop Transfer

The transfer function relating the output to the reference input in a feedback control system. For unity feedback, it equals $G(s)/(1 + G(s)H(s))$.

**Example:** A unity feedback system with forward gain $G(s) = 10/(s+1)$ has closed-loop transfer function $10/(s+11)$.

#### Cofactor

In Mason's gain formula, the value of the graph determinant with all loops touching a particular forward path removed. Used to weight each forward path's contribution to the overall transfer function.

**Example:** If a forward path touches all loops in a signal flow graph, its cofactor is 1.

#### Compensator Design

The process of designing additional dynamic elements (lead, lag, or lead-lag compensators) to modify a system's frequency response or root locus to meet performance specifications.

**Example:** Adding a lead compensator increases phase margin, enabling higher gain for faster response while maintaining stability.

#### Compensation Pole

A pole introduced by a compensator, placed to shape the system's frequency response or root locus. Lead compensator poles are placed at higher frequencies than their zeros.

**Example:** A lead compensator with zero at $s = -2$ might have its pole at $s = -20$ for a phase lead of about 55°.

#### Compensation Zero

A zero introduced by a compensator, placed to cancel undesirable poles or add phase lead. Lead compensator zeros are placed at lower frequencies than their poles.

**Example:** A lag compensator zero at $s = -0.1$ with pole at $s = -0.01$ increases low-frequency gain without significantly affecting phase margin.

#### Complementary Sensitivity

The closed-loop transfer function from reference input to output, denoted $T(s) = GC/(1+GC)$. Together with sensitivity $S(s)$, they satisfy $S + T = 1$.

**Example:** High complementary sensitivity at low frequencies means the system tracks references well; low values at high frequencies indicate noise rejection.

#### Complex Conjugate Poles

A pair of poles with equal real parts and imaginary parts of opposite sign, appearing as $s = \sigma \pm j\omega$. They produce oscillatory components in the time response.

**Example:** Poles at $s = -3 \pm j4$ produce an oscillating response at 4 rad/s that decays with time constant 1/3 second.

#### Conditionally Stable

A system that is stable only for a limited range of gain values, with instability occurring for both very low and very high gains. Identified by multiple crossings of the negative real axis in the Nyquist plot.

**Example:** A conditionally stable system might be stable for $2 < K < 10$ but unstable outside this range.

#### Constant Gain Term

A frequency-independent multiplicative constant in a transfer function that shifts the Bode magnitude plot vertically without affecting the phase plot.

**Example:** A gain of $K = 100$ adds 40 dB to the magnitude plot at all frequencies.

#### Control System

An interconnection of components designed to command, direct, or regulate the behavior of a dynamic system to achieve a desired objective.

**Example:** A cruise control system maintains vehicle speed by automatically adjusting throttle based on speed measurements.

#### Controller

The component that processes the error signal and generates the control action sent to the actuator. Controllers implement the control algorithm (P, PI, PID, lead, lag).

**Example:** Gyra's microcontroller runs a PID algorithm that calculates motor commands based on her tilt angle error.

#### Controller Tuning

The process of adjusting controller parameters (gains, time constants) to achieve desired closed-loop performance such as specified overshoot, settling time, or stability margins.

**Example:** Tuning Gyra's PID controller involves adjusting $K_p$, $K_i$, and $K_d$ until she balances smoothly without excessive wobble.

#### Convolution in S-Domain

The property that convolution in the time domain corresponds to multiplication in the s-domain. If $y(t) = h(t) * u(t)$, then $Y(s) = H(s)U(s)$.

**Example:** The output of a system with transfer function $H(s)$ and input $U(s)$ is simply $Y(s) = H(s)U(s)$.

#### Convolution Integral

A mathematical operation that computes a system's output by integrating the product of the input and a time-reversed, shifted impulse response: $y(t) = \int_0^t h(\tau)u(t-\tau)d\tau$.

**Example:** To find the step response of a system with impulse response $h(t) = e^{-t}$, evaluate the convolution of $h(t)$ with the unit step.

#### Corner Frequency

The frequency at which the asymptotic approximation of a Bode plot changes slope, typically where the actual magnitude is 3 dB below the asymptote for a first-order factor. Also called break frequency.

**Example:** A first-order system $G(s) = 1/(s+10)$ has corner frequency at $\omega = 10$ rad/s.

#### Cover-Up Method

A technique for finding residues in partial fraction expansion by "covering up" the factor being solved for, then evaluating the remaining expression at the corresponding pole location.

**Example:** To find the residue for the $(s+1)$ factor in $\frac{5}{(s+1)(s+2)}$, cover up $(s+1)$ and evaluate $\frac{5}{s+2}$ at $s = -1$ to get $5/1 = 5$.

#### Critically Damped System

A second-order system with damping ratio $\zeta = 1$, representing the boundary between oscillatory and non-oscillatory behavior. It returns to equilibrium in minimum time without overshoot.

**Example:** A door closer mechanism is designed to be critically damped so the door closes quickly without bouncing.

#### Crossover Frequency

The frequency at which a system's open-loop magnitude crosses 0 dB (unity gain). Phase margin is measured at the gain crossover frequency.

**Example:** If the open-loop magnitude crosses 0 dB at 15 rad/s, this is the gain crossover frequency where phase margin is evaluated.

#### Cutoff Frequency

The frequency at which a filter's output power drops to half its maximum value (-3 dB point). Also called the half-power frequency or bandwidth limit.

**Example:** A low-pass filter with cutoff frequency of 1 kHz passes signals below 1 kHz and attenuates those above.

#### Damped Frequency

The actual frequency of oscillation in an underdamped second-order system, given by $\omega_d = \omega_n\sqrt{1-\zeta^2}$. Always less than the natural frequency.

**Example:** A system with $\omega_n = 10$ rad/s and $\zeta = 0.6$ has damped frequency $\omega_d = 8$ rad/s.

#### Damping Ratio

A dimensionless parameter, denoted $\zeta$, that characterizes how oscillations decay in a second-order system. Values less than 1 produce oscillations; $\zeta = 1$ is critically damped; $\zeta > 1$ is overdamped.

**Example:** Gyra's control system might be tuned for $\zeta = 0.7$ to provide fast response with acceptable overshoot (about 5%).

#### DC Gain

The ratio of output to input magnitude when the input is a constant (zero frequency). Calculated by evaluating the transfer function at $s = 0$.

**Example:** A transfer function $G(s) = 10/(s+2)$ has DC gain of $G(0) = 10/2 = 5$.

#### DC Motor

An electric motor that converts direct current electrical energy into rotational mechanical energy. Characterized by torque proportional to armature current and back-EMF proportional to speed.

**Example:** Many hobby robots, including Gyra, use small DC motors as actuators for wheel propulsion.

#### Dead Zone

A nonlinear effect where the output remains zero until the input exceeds a threshold value. Common in mechanical systems with friction or electronic systems with finite resolution.

**Example:** A motor with dead zone requires the input voltage to exceed 0.5V before any rotation begins.

#### Decade

A factor of 10 change in frequency. Bode plot slopes are often expressed in dB/decade.

**Example:** From 1 rad/s to 10 rad/s is one decade; a -20 dB/decade slope means a tenfold frequency increase reduces gain by a factor of 10.

#### Decibel

A logarithmic unit for expressing magnitude ratios, defined as $20 \log_{10}(|G|)$ for voltage or amplitude ratios. Named after Alexander Graham Bell.

**Example:** A gain of 100 equals 40 dB; a gain of 0.1 equals -20 dB.

#### Delay Time

The time required for the step response to reach 50% of its final value. One of several measures of system speed.

**Example:** A system with delay time of 0.2 seconds reaches half its final value 0.2 seconds after the step input is applied.

#### Departure Angle

The angle at which root locus branches leave a complex pole as gain increases from zero. Calculated using the angle condition with all other poles and zeros.

**Example:** For a complex pole at $s = -1 + j$, the departure angle determines which direction the root locus initially heads.

#### Derivative Control

A control action proportional to the rate of change of the error signal. Derivative action anticipates future error and provides damping to reduce overshoot and oscillation.

**Example:** In Gyra's controller, derivative action detects rapid tilting and applies corrective torque before the lean becomes large.

#### Derivative Gain

The multiplicative constant $K_d$ in a PID controller that determines how strongly the controller responds to the rate of change of error.

**Example:** Increasing $K_d$ makes Gyra respond more aggressively to rapid changes in tilt angle, reducing overshoot.

#### Derivative Kick

A sudden spike in controller output that occurs when a setpoint change creates an instantaneous jump in the error signal. Derivative action amplifies this discontinuity.

**Example:** Changing the temperature setpoint from 70°F to 72°F can cause derivative kick if the controller differentiates the error rather than just the measurement.

#### Derivative Time

An alternative parameterization of derivative action in PID controllers, defined as $T_d = K_d/K_p$. Represents the time by which derivative action advances the controller's response.

**Example:** A derivative time of 0.1 seconds means the derivative action predicts what the proportional action would do 0.1 seconds in the future.

#### Design Tradeoffs

The inherent compromises that must be made in controller design, where improving one performance aspect often degrades another. Common tradeoffs include speed versus overshoot and tracking versus noise rejection.

**Example:** Increasing gain for faster response also increases overshoot and sensitivity to noise—a fundamental design tradeoff.

#### Differential Equation

A mathematical equation relating a function to its derivatives, used to describe the dynamic behavior of physical systems in terms of rates of change.

**Example:** The differential equation $m\ddot{x} + b\dot{x} + kx = F$ describes a mass-spring-damper system.

#### Differentiator Bode Plot

The Bode plot of a pure differentiator $s$, showing magnitude that increases at +20 dB/decade and constant phase of +90°.

**Example:** A differentiator's magnitude is 0 dB at $\omega = 1$ rad/s, 20 dB at 10 rad/s, and 40 dB at 100 rad/s.

#### Disturbance

An unwanted input that affects the system output but is not the commanded reference. Disturbances can be external (wind, load changes) or internal (parameter variations).

**Example:** A gust of wind pushing Gyra sideways is a disturbance that her controller must reject to maintain balance.

#### Disturbance Error

The steady-state error caused by disturbance inputs rather than reference input tracking. Good feedback control minimizes the effect of disturbances on the output.

**Example:** If an external load causes 2% error in a position control system, this is disturbance error.

#### Disturbance Rejection

A control system's ability to maintain desired output despite unwanted disturbance inputs. High loop gain at low frequencies improves disturbance rejection.

**Example:** Gyra's controller rejects disturbances (like being poked) by quickly adjusting motor torque to restore balance.

#### Dominant Poles

The closed-loop poles that have the greatest influence on system response, typically those closest to the imaginary axis (with smallest magnitude real parts).

**Example:** A system with poles at $s = -1 \pm j$ and $s = -20$ has dominant poles at $-1 \pm j$; the pole at -20 contributes a fast-decaying component that quickly becomes negligible.

#### Dominant Pole Design

A design approach that places closed-loop poles so that one complex conjugate pair dominates the response, allowing the system to be approximated as second-order.

**Example:** Designing for dominant poles at $s = -2 \pm j2$ with other poles far to the left yields approximately 50% overshoot.

#### Dynamic System

A system whose current output depends not only on current input but also on past inputs or states. Dynamic systems are described by differential equations and have memory.

**Example:** A water tank's level (output) depends on past inflow and outflow rates, making it a dynamic system.

#### Electrical Systems

Dynamic systems where the variables are electrical quantities (voltage, current, charge) related by resistors, capacitors, inductors, and sources.

**Example:** An RC circuit is an electrical system where voltage across the capacitor evolves according to a first-order differential equation.

#### Electromechanical Systems

Systems that couple electrical and mechanical domains, such as motors and generators. Energy conversion occurs between electrical and mechanical forms.

**Example:** A DC motor is an electromechanical system that converts electrical power (voltage × current) to mechanical power (torque × angular velocity).

#### Encirclement

A path in the complex plane that surrounds a point by forming a complete closed loop around it. The number and direction of encirclements is central to the Nyquist criterion.

**Example:** If the Nyquist plot loops around the point -1 twice in the clockwise direction, there are two clockwise encirclements.

#### Equilibrium Point

A system state where all derivatives are zero and the system remains stationary in the absence of external inputs. Linearization is performed about equilibrium points.

**Example:** A pendulum hanging straight down is at an equilibrium point; it stays there unless disturbed.

#### Error Coefficients

See Error Constants.

#### Error Constants

Parameters ($K_p$, $K_v$, $K_a$) that characterize a system's steady-state tracking accuracy for step, ramp, and parabolic inputs respectively.

**Example:** A system with position error constant $K_p = 100$ has steady-state error of approximately 1% for a unit step input.

#### Error Signal

The difference between the reference input (desired output) and the actual measured output. The controller acts on this signal to reduce the error.

**Example:** If the desired temperature is 72°F and the measured temperature is 68°F, the error signal is 4°F.

#### Feedback

The process of measuring a system's output and using that measurement to influence subsequent control actions. Feedback enables systems to correct errors and reject disturbances.

**Example:** Gyra uses feedback from her tilt sensor to continuously adjust motor torque, keeping her balanced.

#### Feedback Connection

A system configuration where part of the output signal is returned and combined with the input, creating a loop that modifies system behavior.

**Example:** In a thermostat system, temperature measurement (output) is fed back to compare with the setpoint (input).

#### Feedback Path

The portion of a control loop that transmits the output signal (possibly modified by a sensor transfer function) back to the summing junction for comparison with the reference.

**Example:** In a unity feedback system, the feedback path simply passes the output directly back with no modification.

#### Field-Controlled Motor

A DC motor configuration where speed is controlled by varying the field winding current while keeping armature voltage constant. Less common than armature control due to slower response.

**Example:** Large industrial DC motors sometimes use field control because the field winding carries less current than the armature.

#### Final Value Theorem

A Laplace transform theorem stating that the steady-state value of a time function can be found from $\lim_{t \to \infty} f(t) = \lim_{s \to 0} sF(s)$, provided the limit exists and the function is stable.

**Example:** For $Y(s) = 5/(s(s+2))$, the final value is $\lim_{s \to 0} s \cdot 5/(s(s+2)) = 5/2 = 2.5$.

#### First-Order Bode Plot

The Bode plot of a first-order factor $(1 + s/\omega_c)^{\pm 1}$, showing a corner at $\omega_c$ with asymptotes of 0 and ±20 dB/decade, and phase varying from 0° to ±90°.

**Example:** A first-order lag $1/(1 + s/10)$ has magnitude dropping at -20 dB/decade above 10 rad/s.

#### First-Order Factor

A factor in a transfer function of the form $(s + a)$ or $(1 + s/a)$ that contributes one pole or zero at $s = -a$.

**Example:** The transfer function $G(s) = 10/(s+2)(s+5)$ contains two first-order factors in the denominator.

#### First-Order System

A dynamic system described by a first-order differential equation, characterized by a single time constant. The step response is a simple exponential approach to steady state.

**Example:** An RC circuit is a first-order system with time constant $\tau = RC$.

#### Fluid Systems

Dynamic systems where the variables are fluid quantities (pressure, flow rate, volume) related by fluid resistances, capacitances, and sources.

**Example:** A water tank with inlet and outlet valves is a fluid system where level depends on the flow rates.

#### Force-Current Analogy

A system of correspondences between mechanical and electrical systems where force maps to current and velocity maps to voltage. Also called the mobility analogy.

**Example:** In the force-current analogy, a spring corresponds to an inductor, and a damper corresponds to a resistor.

#### Force-Voltage Analogy

A system of correspondences between mechanical and electrical systems where force maps to voltage and velocity maps to current. Also called the impedance analogy.

**Example:** In the force-voltage analogy, a spring corresponds to a capacitor, and a damper corresponds to a resistor.

#### Forced Response

The portion of a system's total response that is directly caused by the input signal. It has the same form as the input in steady state.

**Example:** For a sinusoidal input to a stable linear system, the forced response is a sinusoid at the same frequency.

#### Forward Path

A path in a block diagram or signal flow graph that traverses from input to output, passing through each node only once and following the direction of signal flow.

**Example:** In a simple feedback loop, the forward path goes from input through the controller and plant to the output.

#### Forward Path Gain

The product of all transfer functions along a forward path from input to output in a signal flow graph.

**Example:** If a forward path passes through blocks with gains 2, $1/(s+1)$, and 5, the forward path gain is $10/(s+1)$.

#### Frequency Domain

A representation of signals and systems in terms of frequency rather than time. Transfer functions and Bode plots are frequency-domain tools.

**Example:** In the frequency domain, a signal is characterized by its amplitude and phase at each frequency rather than its time waveform.

#### Frequency Response

A system's steady-state response to sinusoidal inputs as a function of frequency, characterized by magnitude and phase at each frequency.

**Example:** A low-pass filter's frequency response shows near-unity gain at low frequencies and decreasing gain at high frequencies.

#### Frequency Transfer Func

See Frequency Response.

#### Gain Adjustment

The process of selecting controller gain to achieve desired performance, often as part of root locus or Bode plot design procedures.

**Example:** After constructing the root locus, gain adjustment involves selecting the gain value that places dominant poles at desired locations.

#### Gain Crossover

The frequency at which the open-loop magnitude equals unity (0 dB). Phase margin is measured at this frequency.

**Example:** If the open-loop Bode magnitude plot crosses 0 dB at 20 rad/s, the gain crossover frequency is 20 rad/s.

#### Gain Margin

The factor by which the open-loop gain can be increased before the system becomes unstable. Expressed in dB, it equals the negative of the magnitude at the phase crossover frequency.

**Example:** A gain margin of 10 dB means the gain can be increased by a factor of about 3.16 before instability occurs.

#### Gain Margin from Nyquist

The gain margin determined from the Nyquist plot as the reciprocal of the distance from the origin to the point where the Nyquist curve crosses the negative real axis.

**Example:** If the Nyquist plot crosses the negative real axis at -0.25, the gain margin is $1/0.25 = 4$ or about 12 dB.

#### Gear Train

A mechanical system using interconnected gears to transmit motion and modify torque and speed. Gears introduce transformation ratios between connected shafts.

**Example:** A 10:1 gear reduction increases torque by a factor of 10 while reducing speed by the same factor.

#### Graph Determinant

A polynomial used in Mason's gain formula, calculated from the loop gains of all loops, pairs of non-touching loops, triplets of non-touching loops, and so on.

**Example:** For a graph with two loops of gains $L_1$ and $L_2$ that touch, the determinant is $1 - L_1 - L_2$.

#### Half-Power Point

The frequency at which a system's output power is half its maximum value, corresponding to -3 dB in amplitude. Defines the bandwidth of many systems.

**Example:** A filter's half-power points are the lower and upper cutoff frequencies that define its bandwidth.

#### Higher-Order System

A system described by a differential equation of order three or higher. The response is a combination of multiple exponential and/or oscillatory modes.

**Example:** A system with three poles exhibits three exponential modes, potentially including oscillatory components.

#### High-Pass System

A system that passes high-frequency signals while attenuating low-frequency signals. The magnitude response increases with frequency up to a corner frequency.

**Example:** A high-pass filter removes the DC component of a signal while passing rapid variations.

#### Homogeneity

A property of linear systems where scaling the input by a constant scales the output by the same constant. If input $u$ produces output $y$, then input $au$ produces output $ay$.

**Example:** If a system produces 10V output for 2V input, homogeneity means it produces 20V output for 4V input.

#### Hysteresis

A nonlinear phenomenon where the output depends not only on the current input but also on the history of past inputs. The input-output relationship differs for increasing versus decreasing inputs.

**Example:** A relay with hysteresis turns on at 25°C but doesn't turn off until temperature drops to 23°C.

#### Imaginary Axis Crossing

Points where root locus branches cross the imaginary axis of the s-plane. At these points, the system is marginally stable with sustained oscillations.

**Example:** The root locus for a system with three poles might cross the imaginary axis at $s = \pm j4$, indicating oscillation at 4 rad/s for a specific gain.

#### Impedance Analogy

A method of establishing correspondence between electrical and mechanical systems based on impedance similarity. Force corresponds to voltage; velocity corresponds to current.

**Example:** Using impedance analogy, a mechanical spring (stiffness $k$) corresponds to an electrical capacitor (capacitance $C = 1/k$).

#### Impulse Input

A test signal that is zero everywhere except at $t = 0$, where it is infinitely large with unit area. Mathematically represented by the Dirac delta function $\delta(t)$.

**Example:** Striking a tuning fork briefly applies approximately an impulse input; the resulting vibration is the impulse response.

#### Impulse Response

The output of a system when the input is an impulse function. For LTI systems, the impulse response completely characterizes system behavior and is the inverse Laplace transform of the transfer function.

**Example:** The impulse response of a first-order system $1/(s+2)$ is $h(t) = e^{-2t}$ for $t \geq 0$.

#### Initial Conditions

The values of system variables and their derivatives at the starting time (usually $t = 0$). Initial conditions determine the natural response component.

**Example:** A spring-mass system starting with 5 cm displacement and zero velocity has initial conditions $x(0) = 5$ cm, $\dot{x}(0) = 0$.

#### Initial Value Theorem

A Laplace transform theorem stating that the initial value of a time function can be found from $\lim_{t \to 0^+} f(t) = \lim_{s \to \infty} sF(s)$.

**Example:** For $Y(s) = (s+3)/(s^2+5s+6)$, the initial value is $\lim_{s \to \infty} s(s+3)/(s^2+5s+6) = 1$.

#### Inner Loop

A feedback loop that is nested inside a larger (outer) loop. In block diagram reduction, inner loops are typically reduced first.

**Example:** In a cascade control system, the fast inner loop might control motor current while the outer loop controls position.

#### Integral Control

A control action proportional to the integral of the error signal over time. Integral action eliminates steady-state error but can cause overshoot and slow response.

**Example:** Gyra's integral action accumulates small persistent tilts over time, eventually generating enough torque to eliminate any steady-state lean.

#### Integral Gain

The multiplicative constant $K_i$ in a PID controller that determines how strongly the controller responds to accumulated error over time.

**Example:** Higher $K_i$ eliminates steady-state error faster but increases risk of overshoot and oscillation.

#### Integral Time

An alternative parameterization of integral action in PID controllers, defined as $T_i = K_p/K_i$. Represents the time for integral action to repeat the proportional action.

**Example:** An integral time of 2 seconds means the integral contribution matches the proportional contribution after 2 seconds of constant error.

#### Integrator Bode Plot

The Bode plot of a pure integrator $1/s$, showing magnitude that decreases at -20 dB/decade through 0 dB at $\omega = 1$ rad/s, and constant phase of -90°.

**Example:** An integrator's magnitude is 20 dB at 0.1 rad/s, 0 dB at 1 rad/s, and -20 dB at 10 rad/s.

#### Internal Stability

A more stringent form of stability requiring all signals within a control system to remain bounded, not just the input-output relationship.

**Example:** A system might have BIBO stability but lack internal stability if hidden modes grow without bound.

#### Inverse Laplace Transform

The mathematical operation that recovers a time-domain function from its Laplace transform, typically computed using partial fraction expansion and transform tables.

**Example:** The inverse Laplace transform of $1/(s+2)$ is $e^{-2t}$ for $t \geq 0$.

#### Lag Compensator

A controller that adds a pole-zero pair with the zero at higher frequency than the pole, providing increased low-frequency gain without significantly affecting phase margin.

**Example:** A lag compensator with zero at $s = -1$ and pole at $s = -0.1$ increases low-frequency gain by a factor of 10.

#### Laplace Transform

An integral transform that converts a time-domain function into a complex frequency-domain function, defined as $\mathcal{L}\{f(t)\} = \int_0^\infty f(t)e^{-st}dt$.

**Example:** The Laplace transform of $e^{-2t}$ is $1/(s+2)$.

#### Lead Compensator

A controller that adds a pole-zero pair with the zero at lower frequency than the pole, providing phase lead near the crossover frequency to improve stability margins.

**Example:** A lead compensator with zero at $s = -2$ and pole at $s = -20$ provides up to 55° of phase lead.

#### Lead-Lag Compensator

A controller combining both lead and lag sections, providing both phase margin improvement and steady-state accuracy enhancement.

**Example:** A lead-lag compensator might use lead action to add 40° phase margin and lag action to reduce steady-state error by a factor of 10.

#### Lever System

A mechanical system using rigid bars pivoting about fulcrums to transmit and transform force and displacement.

**Example:** A lever with 3:1 length ratio transforms 10N input force to 30N output force while reducing displacement by the same ratio.

#### Linear System

A system that satisfies both superposition (additivity) and homogeneity (scaling). The response to a sum of inputs equals the sum of individual responses.

**Example:** If input $u_1$ produces output $y_1$ and input $u_2$ produces output $y_2$, then input $u_1 + u_2$ produces output $y_1 + y_2$.

#### Linearization

The process of approximating a nonlinear system by a linear one, valid for small deviations from an equilibrium point. Uses Taylor series expansion truncated after the first-order terms.

**Example:** A pendulum is nonlinear, but for small angles ($\sin\theta \approx \theta$), it behaves as a linear second-order system.

#### Logarithmic Scale

A scale where equal distances represent equal ratios rather than equal differences. Used in Bode plots for both frequency and magnitude axes.

**Example:** On a logarithmic frequency scale, 1 to 10 rad/s covers the same distance as 10 to 100 rad/s.

#### Loop

A closed path in a block diagram or signal flow graph that returns to its starting point, following the direction of signal flow.

**Example:** A feedback loop starts at the summing junction, passes through the controller and plant, and returns via the feedback path.

#### Loop Gain

The product of all transfer functions around a loop, including the negative sign at feedback summing junctions. For a simple loop, it equals $G(s)H(s)$.

**Example:** In a unity feedback system with forward path $G(s) = 10/(s+1)$, the loop gain is $10/(s+1)$.

#### Loop Gain Calculation

The process of determining the loop gain in a signal flow graph by tracing around a closed loop and multiplying all branch gains.

**Example:** A loop passing through branches with gains $K$, $1/s$, and $-1$ has loop gain $-K/s$.

#### Low-Pass System

A system that passes low-frequency signals while attenuating high-frequency signals. The magnitude response decreases with frequency above the corner frequency.

**Example:** An RC circuit acts as a low-pass filter, smoothing rapid fluctuations while passing slow changes.

#### LTI System

A Linear Time-Invariant system, satisfying both linearity (superposition) and time-invariance (same response regardless of when input is applied). LTI systems are fully characterized by their transfer function.

**Example:** An ideal amplifier with fixed gain is an LTI system because its behavior doesn't change with time and scales linearly with input.

#### Magnitude Condition

A requirement in root locus analysis that the loop gain magnitude equals 1 at any point on the root locus. Used to find the gain corresponding to specific pole locations.

**Example:** Once a point on the root locus is identified using the angle condition, the magnitude condition determines what gain places poles at that location.

#### Magnitude Response

The magnitude of a system's transfer function as a function of frequency, showing how the system amplifies or attenuates signals at each frequency.

**Example:** A low-pass filter has magnitude response near 1 at low frequencies, dropping toward 0 at high frequencies.

#### Marginal Stability

A stability condition where the system is on the boundary between stable and unstable, with poles on the imaginary axis. The response neither decays nor grows but sustains oscillation.

**Example:** An undamped oscillator ($\zeta = 0$) with poles at $\pm j\omega_n$ is marginally stable, oscillating forever.

#### Mason's Gain Formula

A formula for computing the transfer function of a signal flow graph: $T = \sum_k P_k \Delta_k / \Delta$, where $P_k$ are forward path gains, $\Delta$ is the graph determinant, and $\Delta_k$ are cofactors.

**Example:** For a single forward path with gain $P_1$ and no loops, Mason's formula gives $T = P_1/1 = P_1$.

#### Mass-Spring-Damper

A fundamental mechanical system consisting of a mass connected to a fixed point by a spring and damper in parallel. It serves as the prototype for second-order systems.

**Example:** A car's suspension is modeled as a mass-spring-damper where the spring supports weight and the damper absorbs road bumps.

#### Maximum Phase Lead

The maximum phase contribution that a lead compensator can provide, determined by the ratio of pole to zero frequencies. Larger ratios give more phase lead but also more gain increase.

**Example:** A lead compensator with pole 10 times higher than the zero provides maximum phase lead of about 55°.

#### Mechanical Systems

Dynamic systems where the variables are mechanical quantities (position, velocity, force, torque) related by mass, spring, and damping elements.

**Example:** A vibrating beam is a mechanical system whose motion is governed by mass, stiffness, and damping properties.

#### Minimum Phase System

A system with all poles and zeros in the left half of the s-plane. Minimum phase systems have the least phase lag for a given magnitude response.

**Example:** A system with transfer function $(s+1)/(s+2)$ is minimum phase because both the zero at -1 and pole at -2 are in the LHP.

#### Mobility Analogy

See Force-Current Analogy.

#### Motor Model

A mathematical representation of motor dynamics, typically as a transfer function relating input voltage to output speed or position.

**Example:** A DC motor's transfer function from armature voltage to angular velocity is typically first or second order.

#### Motor Transfer Function

The transfer function of a motor, relating electrical input to mechanical output. For a DC motor, it captures electrical and mechanical dynamics.

**Example:** A simplified DC motor transfer function is $\Omega(s)/V(s) = K/(s(Js + B))$, relating voltage to angular velocity.

#### Natural Frequency

The frequency at which an undamped second-order system would oscillate, denoted $\omega_n$. For damped systems, the actual oscillation occurs at the damped frequency $\omega_d < \omega_n$.

**Example:** A second-order system with $\omega_n = 10$ rad/s oscillates at 10 rad/s if undamped, or slower if damped.

#### Natural Response

The portion of a system's total response due to initial conditions, independent of the input. It decays to zero for stable systems.

**Example:** A spring-mass system released from a displaced position exhibits natural response—oscillation that gradually dies out.

#### Node

A point in a signal flow graph representing a variable or signal. Nodes receive signals from incoming branches and transmit signals to outgoing branches.

**Example:** In a signal flow graph of a control loop, nodes might represent the reference input, error, controller output, and plant output.

#### Noise Attenuation

A control system's ability to reduce the effect of measurement noise on the output. Low complementary sensitivity at high frequencies improves noise attenuation.

**Example:** A control system with bandwidth of 10 rad/s attenuates sensor noise above this frequency.

#### Non-Minimum Phase

A system with one or more zeros in the right half of the s-plane. Non-minimum phase systems exhibit initial response in the opposite direction of the final response.

**Example:** A system with zero at $s = +1$ is non-minimum phase; its step response initially moves opposite to the final direction.

#### Nonlinear System

A system that does not satisfy the superposition principle. The response to a sum of inputs is not equal to the sum of individual responses.

**Example:** A saturating amplifier is nonlinear because doubling the input does not double the output when the amplifier is saturated.

#### Non-Touching Loops

Loops in a signal flow graph that share no common nodes. Products of non-touching loop gains appear in the graph determinant calculation.

**Example:** Two separate feedback loops with no shared signals are non-touching loops.

#### Non-Unity Feedback

A feedback configuration where the feedback path includes a transfer function $H(s) \neq 1$, typically representing sensor dynamics.

**Example:** If a position sensor has dynamics $H(s) = 1/(s+10)$, this creates a non-unity feedback system.

#### Notch Filter

A filter that attenuates a narrow band of frequencies while passing all other frequencies. Used to remove specific interference signals.

**Example:** A 60 Hz notch filter removes power line interference from sensitive measurements.

#### Number of Branches

In root locus analysis, the number of branches equals the number of poles in the open-loop transfer function. Each branch shows how one pole moves as gain changes.

**Example:** A system with 4 open-loop poles has a root locus with 4 branches.

#### Nyquist Contour

A closed path in the s-plane used in the Nyquist stability criterion, encircling the entire right half-plane. The open-loop transfer function is evaluated along this contour.

**Example:** The Nyquist contour follows the imaginary axis from $-j\infty$ to $+j\infty$, closing through the right half-plane at infinite radius.

#### Nyquist Criterion

A graphical stability test based on the principle of the argument: the number of unstable closed-loop poles equals the number of RHP open-loop poles plus the net clockwise encirclements of -1 by the Nyquist plot.

**Example:** If the open-loop system is stable (no RHP poles) and the Nyquist plot does not encircle -1, the closed-loop system is stable.

#### Nyquist Diagram

See Nyquist Plot.

#### Nyquist Plot

A plot of the open-loop frequency response $G(j\omega)H(j\omega)$ in the complex plane as frequency varies from zero to infinity. Used for Nyquist stability analysis.

**Example:** The Nyquist plot starts at the DC gain on the positive real axis and traces a curve as frequency increases.

#### Octave

A factor of 2 change in frequency. An alternative to decades for expressing Bode plot slopes: -6 dB/octave equals -20 dB/decade.

**Example:** From 4 rad/s to 8 rad/s is one octave; a first-order rolloff of -20 dB/decade equals about -6 dB/octave.

#### Op-Amp Circuits

Electronic circuits using operational amplifiers to implement various signal processing functions including amplification, integration, differentiation, and summation.

**Example:** An op-amp integrator circuit implements the transfer function $-1/(RCs)$, useful for analog PID controllers.

#### Open-Loop Control

A control strategy where the control action is determined only by the reference input, without measurement or feedback of the actual output.

**Example:** A toaster uses open-loop control—it runs for a set time regardless of how brown the toast actually becomes.

#### Open-Loop Transfer

The transfer function of the forward path and feedback path product $G(s)H(s)$, measured when the feedback loop is opened.

**Example:** The open-loop transfer function determines both the root locus shape and the Nyquist plot.

#### Operating Point

The steady-state condition about which a system operates and linearization is performed. Variables are expressed as deviations from this point.

**Example:** Gyra's operating point is vertical with zero angular velocity; the controller handles small deviations from upright.

#### Order of a System

The order of the highest derivative in the system's differential equation, or equivalently, the degree of the denominator polynomial in the transfer function.

**Example:** A system with transfer function $1/(s^3 + 2s^2 + s + 1)$ is third order.

#### Outer Loop

A feedback loop that encloses one or more inner loops. Outer loops typically have longer time constants and broader objectives.

**Example:** In cascade control, the outer loop might control position while the inner loop controls velocity.

#### Overdamped System

A second-order system with damping ratio $\zeta > 1$, producing a response that returns to equilibrium without oscillation but more slowly than critical damping.

**Example:** A heavily damped door closer is overdamped—it closes very slowly without bouncing.

#### Overshoot

The amount by which a system's step response exceeds its final steady-state value, typically expressed as a percentage of that value.

**Example:** Gyra with $\zeta = 0.5$ overshoots her vertical equilibrium by about 16% before settling.

#### P Controller

A controller that uses only proportional action, producing output proportional to the error: $u = K_p e$. The simplest feedback controller.

**Example:** A basic position servo using only proportional control will have steady-state error unless the gain is very high.

#### Parabolic Input

A test input that increases as the square of time: $r(t) = t^2/2$ for $t \geq 0$. Tests a system's ability to track accelerating references.

**Example:** A radar tracking an accelerating aircraft faces a parabolic-like input; Type 2 systems are needed for zero error.

#### Parallel Connection

An arrangement where the same input is applied to multiple systems and their outputs are summed. The overall transfer function is the sum of individual transfer functions.

**Example:** Two feedback paths in parallel with gains $H_1$ and $H_2$ have equivalent feedback gain $H_1 + H_2$.

#### Partial Fraction Expansion

A technique for expressing a rational function as a sum of simpler terms, each associated with a single pole. Used to invert Laplace transforms.

**Example:** $\frac{5}{(s+1)(s+2)} = \frac{5}{s+1} - \frac{5}{s+2}$ expresses the function as a sum of first-order terms.

#### PD Controller

A controller combining proportional and derivative actions: $u = K_p e + K_d \dot{e}$. Provides faster response than P alone but cannot eliminate steady-state error.

**Example:** PD control makes Gyra respond more quickly to disturbances by anticipating changes in tilt angle.

#### Peak Time

The time required for the step response to reach its maximum (peak) value. Related to damped frequency: $t_p = \pi/\omega_d$.

**Example:** A system with damped frequency of 5 rad/s has peak time of $\pi/5 \approx 0.63$ seconds.

#### Pendulum System

A mechanical system consisting of a mass suspended from a pivot point, exhibiting oscillatory motion under gravity. A nonlinear system often linearized for small angles.

**Example:** Gyra is essentially an inverted pendulum—she must actively control her motors to avoid falling.

#### Percent Overshoot

The maximum overshoot expressed as a percentage of the final steady-state value. For second-order systems, it depends only on damping ratio: $\%OS = 100 e^{-\pi\zeta/\sqrt{1-\zeta^2}}$.

**Example:** A damping ratio of $\zeta = 0.7$ gives percent overshoot of about 5%.

#### Performance Specs

Quantitative requirements that a control system must satisfy, including rise time, settling time, overshoot, steady-state error, and stability margins.

**Example:** Typical specs might require 2% settling time < 1 second, overshoot < 10%, and phase margin > 45°.

#### Phase Crossover

The frequency at which the open-loop phase equals -180°. Gain margin is measured at this frequency.

**Example:** If the phase Bode plot crosses -180° at 50 rad/s, the phase crossover frequency is 50 rad/s.

#### Phase Lag

A negative phase shift introduced by a system, meaning the output sinusoid is delayed relative to the input sinusoid.

**Example:** A first-order lag introduces up to 90° of phase lag at high frequencies.

#### Phase Lead

A positive phase shift introduced by a compensator or system, meaning the output sinusoid advances relative to the input sinusoid.

**Example:** A lead compensator adds phase lead near the crossover frequency to improve phase margin.

#### Phase Margin

The amount of additional phase lag (in degrees) that would bring the system to the verge of instability. Measured as 180° plus the phase at gain crossover frequency.

**Example:** A system with phase margin of 50° has the open-loop phase at -130° when the magnitude is 0 dB.

#### Phase Margin from Nyquist

The phase margin determined from the Nyquist plot as the angle between the negative real axis and the line from the origin to where the Nyquist curve crosses the unit circle.

**Example:** If the Nyquist plot crosses the unit circle at an angle of -120° from the positive real axis, the phase margin is 60°.

#### Phase Response

The phase of a system's transfer function as a function of frequency, showing the time shift between input and output sinusoids at each frequency.

**Example:** A first-order lag has phase response that varies from 0° at low frequencies to -90° at high frequencies.

#### PI Controller

A controller combining proportional and integral actions: $u = K_p e + K_i \int e \, dt$. Eliminates steady-state error but may increase overshoot.

**Example:** PI control eliminates Gyra's steady-state lean but requires careful tuning to avoid oscillation.

#### Pickoff Point

A location in a block diagram where a signal is tapped for use elsewhere without affecting the signal itself. Drawn as a small dot on a signal line.

**Example:** The output signal is typically picked off before the feedback block to provide both system output and feedback input.

#### PID Controller

A controller combining proportional, integral, and derivative actions: $u = K_p e + K_i \int e \, dt + K_d \dot{e}$. The most widely used controller structure in industry.

**Example:** Gyra uses PID control—proportional for basic correction, integral to eliminate lean, and derivative to prevent overshoot.

#### Plant

The physical system or process being controlled. The plant is typically the component that cannot be easily modified and whose behavior must be regulated.

**Example:** In Gyra's control system, the plant is her mechanical structure—wheels, motors, and body—that must be kept balanced.

#### Pole at Origin

A transfer function pole located at $s = 0$, corresponding to pure integration in the time domain. Each pole at the origin increases the system type by one.

**Example:** A motor position control system has a pole at the origin because position is the integral of velocity.

#### Pole Locations

The positions of transfer function poles in the complex s-plane. Pole locations determine system stability, oscillation frequency, and decay rate.

**Example:** Poles in the left half-plane indicate stability; poles closer to the imaginary axis produce slower responses.

#### Pole Placement

A design technique where controller parameters are chosen to place closed-loop poles at specified locations in the s-plane.

**Example:** To achieve $\zeta = 0.7$ and $\omega_n = 10$ rad/s, use pole placement to put closed-loop poles at $s = -7 \pm j7.14$.

#### Pole-Zero Cancellation

A mathematical simplification that occurs when a pole and zero are located at the same position in the s-plane, effectively eliminating both from the transfer function.

**Example:** In $G(s) = (s+2)/[(s+1)(s+2)]$, the zero at -2 cancels the pole at -2, leaving $G(s) = 1/(s+1)$.

#### Pole-Zero Plot

A graphical representation showing the locations of all poles (marked ×) and zeros (marked ○) of a transfer function in the complex s-plane.

**Example:** A pole-zero plot instantly reveals system stability (all poles in LHP?) and dominant dynamics (poles nearest imaginary axis).

#### Poles

Values of $s$ that make a transfer function infinite (roots of the denominator polynomial). Poles determine the natural modes of system response.

**Example:** The transfer function $1/(s^2 + 3s + 2)$ has poles at $s = -1$ and $s = -2$.

#### Poles in Left Half Plane

Poles with negative real parts, located in the left half of the s-plane. All poles must be in the LHP for BIBO stability.

**Example:** A stable system with poles at $s = -1 \pm j2$ and $s = -5$ has all poles in the left half-plane.

#### Poles in Right Half Plane

Poles with positive real parts, located in the right half of the s-plane. Any RHP pole makes the system unstable.

**Example:** A system with a pole at $s = +2$ is unstable because this RHP pole causes exponentially growing response.

#### Poles on Imaginary Axis

Poles with zero real part, located on the boundary between stable and unstable regions. They produce sustained oscillations without growth or decay.

**Example:** Poles at $s = \pm j5$ produce sustained oscillation at 5 rad/s—marginally stable behavior.

#### Position Error Constant

A parameter that quantifies a control system's ability to track step inputs, equal to the DC loop gain $K_p = \lim_{s \to 0} G(s)H(s)$. Steady-state error to unit step is $1/(1+K_p)$.

**Example:** A system with position error constant $K_p = 99$ has 1% steady-state error for a unit step input.

#### Proper Transfer Function

A transfer function where the degree of the numerator is less than or equal to the degree of the denominator. All physical systems have proper transfer functions.

**Example:** $G(s) = (s+1)/(s^2 + 3s + 2)$ is proper because the numerator degree (1) is less than denominator degree (2).

#### Proportional Control

A control action where the controller output is directly proportional to the error signal. The fundamental building block of feedback control.

**Example:** In proportional control, a large error produces a large corrective action; a small error produces a small action.

#### Proportional Gain

The multiplicative constant $K_p$ in a controller that determines how strongly the controller responds to the current error.

**Example:** Doubling the proportional gain doubles the control effort for any given error, generally making response faster but potentially less stable.

#### Quality Factor

A dimensionless parameter characterizing the sharpness of a resonance peak, related to damping ratio by $Q = 1/(2\zeta)$. Higher Q means sharper resonance.

**Example:** A mechanical resonator with $Q = 100$ has a very sharp resonance peak and rings for a long time after excitation.

#### Ramp Input

A test input that increases linearly with time: $r(t) = t$ for $t \geq 0$. Tests a system's ability to track constant-velocity references.

**Example:** A telescope tracking a star as it moves across the sky faces a ramp-like input in angular position.

#### Ramp Response

A system's output when subjected to a ramp input. Reveals how well the system can track linearly increasing references.

**Example:** A Type 1 system follows a ramp input with constant steady-state error equal to 1/Kv.

#### RC Circuit

An electrical circuit containing a resistor and capacitor, exhibiting first-order dynamic behavior with time constant $\tau = RC$.

**Example:** An RC low-pass filter with R = 10 kΩ and C = 10 μF has time constant 0.1 seconds and corner frequency 10 rad/s.

#### Reaction Curve Method

A PID tuning technique where the system's open-loop step response is analyzed to determine time delay and time constant, which are then used in Ziegler-Nichols tuning rules.

**Example:** From a step response showing time delay $L$ and time constant $T$, the Ziegler-Nichols rules suggest $K_p = 1.2T/L$ for PID control.

#### Real Poles

Transfer function poles with zero imaginary part, located on the real axis of the s-plane. They produce purely exponential (non-oscillatory) response modes.

**Example:** A pole at $s = -3$ produces a response component $e^{-3t}$ that decays exponentially.

#### Reference Input

The desired value of the controlled variable, also called setpoint or command. The control system attempts to make the actual output equal the reference.

**Example:** Setting a thermostat to 72°F establishes the reference input for the temperature control system.

#### Relative Stability

A measure of how stable a system is, rather than just whether it is stable. Quantified by gain margin, phase margin, or distance of poles from the imaginary axis.

**Example:** Two stable systems may have very different relative stability—one might oscillate heavily while the other responds smoothly.

#### Repeated Poles

Multiple poles at the same location in the s-plane. They produce response terms involving time multiplied by exponentials.

**Example:** A repeated pole at $s = -2$ with multiplicity 2 produces response terms $e^{-2t}$ and $te^{-2t}$.

#### Residue Calculation

The process of finding the coefficients in a partial fraction expansion, either by the cover-up method or by algebraic manipulation.

**Example:** For $3/[(s+1)(s+2)]$, the residue at $s = -1$ is $3/(−1+2) = 3$; at $s = -2$ it is $3/(−2+1) = -3$.

#### Resonant Frequency

The frequency at which a system's magnitude response reaches its maximum value. For second-order systems, $\omega_r = \omega_n\sqrt{1-2\zeta^2}$ when $\zeta < 0.707$.

**Example:** An underdamped mechanical system resonates when driven at its resonant frequency, producing large oscillations.

#### Resonant Peak

The maximum value of a system's magnitude response, occurring at the resonant frequency. Larger peaks indicate less damping.

**Example:** A system with $\zeta = 0.2$ has a resonant peak about 2.5 times larger than its DC gain.

#### Right-Half Plane Poles

Poles located in the right half of the s-plane (positive real parts), causing exponentially growing response modes. Any RHP pole makes the system unstable.

**Example:** A pole at $s = 0.5$ produces a response component $e^{0.5t}$ that grows without bound.

#### Right-Half Plane Zeros

Zeros located in the right half of the s-plane. They cause non-minimum phase behavior including initial inverse response.

**Example:** A system with a RHP zero at $s = +1$ initially moves opposite to its final direction when given a step input.

#### Rise Time

The time required for the step response to go from 10% to 90% of its final value. A measure of system speed.

**Example:** A second-order system with rise time of 0.2 seconds transitions from 10% to 90% of its final value in 0.2 seconds.

#### RL Circuit

An electrical circuit containing a resistor and inductor, exhibiting first-order dynamic behavior with time constant $\tau = L/R$.

**Example:** An RL circuit with R = 100 Ω and L = 1 H has time constant 0.01 seconds.

#### RLC Circuit

An electrical circuit containing a resistor, inductor, and capacitor, exhibiting second-order dynamic behavior. The prototype for electrical resonant systems.

**Example:** An RLC circuit with R = 20 Ω, L = 1 H, and C = 0.01 F has natural frequency 10 rad/s and damping ratio 1.

#### Robustness

A control system's ability to maintain satisfactory performance despite uncertainties in the plant model or operating conditions.

**Example:** A robust controller maintains stability even if the actual plant gain differs by ±20% from the nominal value.

#### Root Locus

A graphical representation showing how the closed-loop poles of a system move in the s-plane as a gain parameter varies from zero to infinity.

**Example:** As proportional gain increases, the root locus shows closed-loop poles moving from open-loop pole locations toward zeros or infinity.

#### Root Locus Compensation

The design of compensators (lead, lag, lead-lag) based on root locus analysis, placing poles and zeros to reshape the locus and achieve desired closed-loop pole locations.

**Example:** Adding a lead compensator zero attracts the root locus, potentially improving damping and stability.

#### Root Locus Design

A controller design methodology that uses the root locus to select gain and compensator parameters to achieve desired closed-loop pole locations.

**Example:** Root locus design might specify dominant poles at $s = -5 \pm j5$ for a 45° damping line with $\omega_n = 7.07$ rad/s.

#### Root Locus Gain

The value of the gain parameter $K$ corresponding to a particular point on the root locus. Found using the magnitude condition.

**Example:** The gain that places closed-loop poles at $s = -3 \pm j4$ can be calculated from the root locus magnitude condition.

#### Root Locus Rules

A set of guidelines for sketching root loci by hand, including rules for starting/ending points, real axis segments, asymptotes, breakaway points, and imaginary axis crossings.

**Example:** The rule that real axis segments of the root locus exist only where the total number of real poles and zeros to the right is odd.

#### Rotational Systems

Mechanical systems involving rotational motion, characterized by torque, angular position, angular velocity, and rotational inertia.

**Example:** A motor driving a load through a gearbox is a rotational system with inertia, damping, and gear ratio.

#### Routh Array

A triangular array of numbers constructed from the coefficients of a characteristic polynomial, used to determine stability without finding the roots explicitly.

**Example:** For $s^3 + 6s^2 + 11s + 6 = 0$, the Routh array tests whether all roots have negative real parts.

#### Routh Array Construction

The process of building a Routh array by placing polynomial coefficients in the first two rows and computing subsequent rows using a specific formula.

**Example:** Each element in a new row is computed as a 2×2 determinant divided by the first element of the row above.

#### Routh-Hurwitz Criterion

A stability test stating that a polynomial has all roots in the left half-plane if and only if all elements in the first column of the Routh array are positive.

**Example:** If the first column of the Routh array is [1, 6, 10, 6], the system is stable; if any element is negative or zero, it may be unstable.

#### Row of Zeros

A special case in Routh array construction where an entire row becomes zero, indicating factors of the characteristic polynomial on the imaginary axis.

**Example:** A row of zeros at the $s^2$ level indicates two roots symmetrically placed about the origin.

#### S-Domain

The complex frequency domain where Laplace transforms are defined. Transfer functions are expressed as functions of the complex variable $s = \sigma + j\omega$.

**Example:** The s-domain transfer function $H(s) = 1/(s+2)$ represents a first-order low-pass filter.

#### Saturation

A nonlinear effect where the output cannot exceed a maximum value regardless of input. Common in actuators that have physical limits.

**Example:** Gyra's motors saturate when she leans too far—they can only produce maximum torque, even if the controller demands more.

#### Second-Order Bode Plot

The Bode plot of a second-order factor showing a resonant peak (for underdamped systems) and phase variation from 0° to -180° centered at the natural frequency.

**Example:** An underdamped second-order system with $\zeta = 0.3$ shows a pronounced resonant peak at the natural frequency.

#### Second-Order Factor

A factor in a transfer function of the form $s^2 + 2\zeta\omega_n s + \omega_n^2$ that contributes a complex conjugate pair of poles or zeros.

**Example:** The denominator $s^2 + 6s + 25 = (s+3)^2 + 16$ represents a second-order factor with $\omega_n = 5$ and $\zeta = 0.6$.

#### Second-Order System

A dynamic system described by a second-order differential equation, characterized by natural frequency and damping ratio. The fundamental prototype for oscillatory systems.

**Example:** Gyra is essentially a second-order system—her dynamics are characterized by natural frequency (how fast she oscillates) and damping (how quickly oscillations decay).

#### Sensitivity

The ratio of relative change in a system characteristic to relative change in a parameter. Low sensitivity indicates robustness to parameter variations.

**Example:** If a 10% change in plant gain causes only 2% change in closed-loop bandwidth, the system has low sensitivity to gain variations.

#### Sensitivity Function

The transfer function from reference input to error signal, denoted $S(s) = 1/(1+GC)$. It characterizes how well the system rejects disturbances and tracks references.

**Example:** Low sensitivity function magnitude at low frequencies indicates good tracking and disturbance rejection.

#### Sensor

A device that measures the system output and converts it to a signal that can be compared with the reference. Sensors close the feedback loop.

**Example:** Gyra's inertial measurement unit (IMU) is a sensor that measures her tilt angle and angular velocity.

#### Settling Time

The time required for the step response to settle within a specified percentage (typically 2% or 5%) of its final value and remain there.

**Example:** A system with 2% settling time of 0.5 seconds stays within ±2% of its final value after 0.5 seconds.

#### Signal Flow Graph

A graphical representation of a system using nodes (representing signals) and branches (representing transfer functions) that shows signal flow through the system.

**Example:** Signal flow graphs provide an alternative to block diagrams, particularly useful with Mason's gain formula.

#### Simple Poles

Poles that are not repeated (have multiplicity one). They produce simple exponential or sinusoidal response terms.

**Example:** The poles at $s = -1$ and $s = -3$ are simple poles, each contributing one exponential term to the response.

#### Sinusoidal Input

A test input of the form $r(t) = A\sin(\omega t)$ used to determine a system's frequency response at frequency $\omega$.

**Example:** Applying a 5 Hz sinusoidal input and measuring the output magnitude and phase reveals the frequency response at 5 Hz.

#### Sinusoidal Steady State

The condition where a stable linear system's response to a sinusoidal input has itself become purely sinusoidal (after transients have died out).

**Example:** In sinusoidal steady state, a system with input $\sin(10t)$ produces output $A\sin(10t + \phi)$ where $A$ and $\phi$ come from the transfer function.

#### Small Signal Analysis

Analysis technique that examines system behavior for small perturbations about an operating point, where nonlinear systems can be approximated as linear.

**Example:** Small signal analysis of Gyra considers only small deviations from vertical, where $\sin\theta \approx \theta$.

#### Special Cases Routh

Situations in Routh array construction requiring special handling: zero in the first column (replaced by small $\epsilon$) or row of zeros (use auxiliary polynomial).

**Example:** When a zero appears in the first column, replace it with a small positive number $\epsilon$ and continue, then take the limit as $\epsilon \to 0$.

#### Speed vs Stability

A fundamental design tradeoff where increasing system speed (through higher gain or bandwidth) typically reduces stability margins.

**Example:** Increasing Gyra's gains makes her respond faster but also increases risk of oscillation—the classic speed vs. stability tradeoff.

#### Stability

The property of a system where bounded inputs produce bounded outputs (BIBO stability) or where the system returns to equilibrium after perturbation.

**Example:** A stable control system brings the output to its desired value and keeps it there; an unstable system oscillates or diverges.

#### Stability Boundary

The set of parameter values that separate stable from unstable behavior. On the boundary, the system is marginally stable.

**Example:** The root locus shows that the stability boundary occurs at the gain where branches cross the imaginary axis.

#### Stability Margins

Quantitative measures of relative stability, including gain margin (how much gain increase before instability) and phase margin (how much phase lag before instability).

**Example:** A system with gain margin of 12 dB and phase margin of 55° has healthy stability margins.

#### Standard Test Inputs

A set of canonical inputs (step, ramp, parabolic, impulse, sinusoid) used to characterize and compare system behavior.

**Example:** Standard test inputs provide a consistent basis for comparing different control system designs.

#### Starting Points

In root locus construction, the locations where root locus branches begin (at $K = 0$), which are the open-loop poles.

**Example:** For a system with open-loop poles at $s = -1$ and $s = -2$, the root locus branches start at these two points.

#### Steady-State Accuracy

The closeness of the output to the reference after all transients have died out. Quantified by steady-state error.

**Example:** A system that settles to within 0.1% of the setpoint has 99.9% steady-state accuracy.

#### Steady-State Error

The difference between the reference input and actual output after all transients have decayed to zero.

**Example:** If the setpoint is 100°C and the actual temperature settles to 98°C, the steady-state error is 2°C.

#### Steady-State Response

The portion of a system's output that persists after transients have died out. For stable systems, this is the final behavior.

**Example:** The steady-state response to a step input is a constant value equal to the DC gain times the step magnitude.

#### Step Input

A test input that instantly changes from zero to a constant value at time $t = 0$, remaining at that value thereafter. The most common test signal.

**Example:** Turning on a heater applies a step input to a thermal system; the room temperature's subsequent rise is the step response.

#### Strictly Proper Function

A transfer function where the degree of the numerator is strictly less than the degree of the denominator. Most physical systems are strictly proper.

**Example:** $G(s) = 5/(s^2 + 3s + 2)$ is strictly proper because numerator degree (0) is less than denominator degree (2).

#### Substitution s=jw

The technique of evaluating a transfer function $G(s)$ at $s = j\omega$ to obtain the frequency response $G(j\omega)$, yielding magnitude and phase at frequency $\omega$.

**Example:** For $G(s) = 1/(s+2)$, substituting $s = j10$ gives $G(j10) = 1/(j10+2)$, yielding magnitude and phase at 10 rad/s.

#### Summing Junction

A block diagram element that algebraically adds or subtracts multiple signals, typically represented by a circle with ± signs indicating each signal's contribution.

**Example:** At the error summing junction, the feedback signal is subtracted from the reference to produce the error.

#### Superposition Principle

A property of linear systems stating that the response to a sum of inputs equals the sum of the responses to each input applied separately.

**Example:** If a system's response to $u_1$ is $y_1$ and to $u_2$ is $y_2$, then its response to $u_1 + u_2$ is $y_1 + y_2$.

#### Symmetry Property

The property of root locus that it is symmetric about the real axis because complex roots of polynomials with real coefficients always occur in conjugate pairs.

**Example:** If the root locus passes through $s = -2 + j3$, it must also pass through $s = -2 - j3$.

#### System Order

The number of independent energy storage elements in a system, equal to the degree of the characteristic polynomial. Determines the number of poles.

**Example:** A system with two capacitors and one inductor is typically third order (three energy storage elements).

#### System Response

The output of a system as a function of time, resulting from the combination of input signals and initial conditions.

**Example:** Gyra's system response shows how her tilt angle evolves over time after being pushed.

#### System Type

A classification of control systems based on the number of integrators in the open-loop transfer function. Type number determines steady-state error characteristics.

**Example:** A Type 1 system has one integrator in the loop and achieves zero steady-state error for step inputs.

#### Taylor Series Expansion

A mathematical technique that approximates a function as an infinite sum of terms based on derivatives at a point. Used for linearization of nonlinear systems.

**Example:** The Taylor series of $\sin\theta$ about $\theta = 0$ starts with $\theta - \theta^3/6 + ...$; for small angles, $\sin\theta \approx \theta$.

#### Thermal Systems

Dynamic systems where the variables are thermal quantities (temperature, heat flow) related by thermal resistances and capacitances.

**Example:** A room's temperature dynamics form a thermal system with heat input from a heater and heat loss through walls.

#### Time Constant

A parameter characterizing the speed of a first-order system, defined as the time to reach 63.2% of the final value in a step response. Equal to the reciprocal of the pole magnitude.

**Example:** An RC circuit with $\tau = 0.1$ s reaches 63.2% of its final voltage 0.1 seconds after a step input.

#### Time Delay in Bode

The effect of pure time delay on the Bode plot: no change in magnitude but phase that decreases linearly with frequency as $-\omega T_d$ (in radians).

**Example:** A 0.1 second time delay adds -57.3° phase at 10 rad/s and -573° at 100 rad/s.

#### Time Domain

A representation of signals and systems as functions of time. Differential equations and time responses are time-domain descriptions.

**Example:** The step response showing output versus time is a time-domain characterization of system behavior.

#### Time-Invariant System

A system whose behavior does not change with time. Applying the same input at different times produces the same output, shifted in time accordingly.

**Example:** An ideal amplifier is time-invariant because its gain is constant; an amplifier whose gain drifts with temperature is not.

#### Total Response

The complete output of a system, consisting of the natural response (from initial conditions) plus the forced response (from the input).

**Example:** A spring-mass system's total response combines the decaying oscillation from initial displacement with the forced motion from applied force.

#### Transfer Function

A mathematical relationship between the Laplace transforms of output and input for a linear time-invariant system, assuming zero initial conditions.

**Example:** The transfer function $H(s) = 10/(s+5)$ describes a first-order system with DC gain 2 and time constant 0.2 seconds.

#### Transient Response

The portion of a system's output that exists during the transition from initial conditions to steady state. Transient response decays to zero for stable systems.

**Example:** The oscillations that occur when Gyra is disturbed and returns to vertical are part of her transient response.

#### Translational Systems

Mechanical systems involving linear (non-rotational) motion, characterized by force, position, velocity, and mass.

**Example:** A car's suspension is a translational system relating road input to chassis motion.

#### Trial and Error Tuning

A controller tuning method involving iterative adjustment of parameters while observing system response, relying on experience and intuition.

**Example:** Trial and error tuning starts with low gains, gradually increasing until acceptable performance is achieved.

#### Type 0 System

A control system with no integrators in the open-loop transfer function. Has non-zero steady-state error for step inputs.

**Example:** A Type 0 system with DC loop gain of 9 has 10% steady-state error for a unit step input.

#### Type 1 System

A control system with one integrator in the open-loop transfer function. Has zero steady-state error for step inputs but non-zero error for ramp inputs.

**Example:** Position control of a motor typically uses Type 1 configuration because velocity integrates to position.

#### Type 2 System

A control system with two integrators in the open-loop transfer function. Has zero steady-state error for both step and ramp inputs.

**Example:** Spacecraft antenna pointing may require Type 2 systems to track moving targets without error.

#### Type Number

The number of poles at the origin ($s = 0$) in the open-loop transfer function, determining the system's ability to track polynomial inputs without error.

**Example:** A system with loop transfer function $K(s+2)/[s^2(s+5)]$ has type number 2.

#### Ultimate Gain

The gain value at which a control system first becomes marginally stable, oscillating with constant amplitude. Used in the ultimate gain tuning method.

**Example:** If a proportional-only controller causes sustained oscillation at gain $K = 50$, the ultimate gain is $K_u = 50$.

#### Ultimate Gain Method

A Ziegler-Nichols tuning method where the system is driven to marginal stability using proportional-only control, then PID parameters are calculated from the ultimate gain and period.

**Example:** With ultimate gain $K_u = 50$ and ultimate period $P_u = 2$ s, Ziegler-Nichols suggests $K_p = 30$, $K_i = 30$, $K_d = 7.5$.

#### Ultimate Period

The period of sustained oscillation when a system is at marginal stability under proportional-only control. Used with ultimate gain for PID tuning.

**Example:** If a system oscillates at 0.5 Hz when marginally stable, the ultimate period is $P_u = 2$ seconds.

#### Undamped System

A second-order system with damping ratio $\zeta = 0$, exhibiting sustained oscillation at the natural frequency without decay.

**Example:** An ideal LC circuit with no resistance is undamped, oscillating forever once excited.

#### Underdamped System

A second-order system with damping ratio $0 < \zeta < 1$, producing oscillatory response that gradually decays to steady state.

**Example:** Gyra is typically designed to be slightly underdamped ($\zeta \approx 0.7$) for fast response with minimal overshoot.

#### Unit Step Response

The output of a system when the input is a unit step function. The most common characterization of system dynamics.

**Example:** A stable first-order system's unit step response is $y(t) = K(1 - e^{-t/\tau})$, approaching final value $K$.

#### Unity Feedback

A feedback configuration where the signal fed back equals the output exactly (feedback transfer function $H(s) = 1$).

**Example:** In unity feedback, the measured output is compared directly with the reference without any sensor dynamics.

#### Unstable System

A system that produces unbounded output for bounded input, due to poles in the right half of the s-plane or on the imaginary axis with multiplicity greater than one.

**Example:** Without active control, Gyra is unstable—she would fall over because her inverted pendulum dynamics have a pole in the RHP.

#### Velocity Error Constant

A parameter quantifying a control system's ability to track ramp inputs, equal to $K_v = \lim_{s \to 0} sG(s)H(s)$. Steady-state error to unit ramp is $1/K_v$.

**Example:** A Type 1 system with velocity error constant $K_v = 20$ has steady-state error of 5% when tracking a unit ramp.

#### Zero in First Column

A special case in Routh array construction where the first element of a row is zero but other elements are nonzero. Handled by replacing zero with small positive $\epsilon$.

**Example:** If the first column has values [1, 2, 0, 3], replace the zero with $\epsilon$ and continue the construction.

#### Zero-Input Response

The system response when the input is zero but initial conditions are nonzero. Equals the natural response for LTI systems.

**Example:** A charged capacitor discharging through a resistor with no applied voltage exhibits zero-input response.

#### Zero-State Response

The system response when initial conditions are zero, produced entirely by the input. Equals the forced response for LTI systems.

**Example:** The step response starting from rest (zero initial conditions) is a zero-state response.

#### Zeros

Values of $s$ that make a transfer function equal to zero (roots of the numerator polynomial). Zeros affect the shape and speed of the transient response.

**Example:** The transfer function $(s+3)/(s^2+5s+6)$ has a zero at $s = -3$.

#### Ziegler-Nichols Method

A set of empirical tuning rules for PID controllers, providing initial parameter values based on either the reaction curve method or the ultimate gain method.

**Example:** Ziegler-Nichols tuning rules give starting values for $K_p$, $K_i$, and $K_d$ that typically require further fine-tuning.
