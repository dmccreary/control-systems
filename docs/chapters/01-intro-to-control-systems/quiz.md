# Quiz: Introduction to Control Systems

Test your understanding of control system fundamentals with these questions covering feedback, open-loop and closed-loop control, and key system components.

---

#### 1. What is the primary advantage of closed-loop control over open-loop control?

<div class="upper-alpha" markdown>
1. Closed-loop systems are always faster than open-loop systems
2. Closed-loop systems can automatically compensate for disturbances
3. Closed-loop systems require fewer components
4. Closed-loop systems consume less power
</div>

??? question "Show Answer"
    The correct answer is **B**. Closed-loop (feedback) control systems measure the actual output and compare it to the reference input, allowing them to detect and compensate for disturbances automatically. Open-loop systems cannot respond to disturbances because they have no feedback path. Options A, C, and D are incorrect—closed-loop systems may be slower, require more components, and use more power due to the additional sensor and feedback mechanisms.

    **Concept Tested:** Closed-Loop Control, Disturbance

---

#### 2. In a feedback control system, what does the error signal represent?

<div class="upper-alpha" markdown>
1. The output of the controller
2. The difference between the reference input and the measured output
3. The disturbance acting on the plant
4. The gain of the feedback path
</div>

??? question "Show Answer"
    The correct answer is **B**. The error signal $e(t) = r(t) - y_m(t)$ is computed at the summing junction as the difference between the reference input (what we want) and the measured output (what we have). The controller uses this error signal to determine the appropriate control action. Option A describes the controller output, not its input. Options C and D describe other system quantities.

    **Concept Tested:** Error Signal

---

#### 3. Which component in a control system converts the controller's command signal into physical action on the plant?

<div class="upper-alpha" markdown>
1. Sensor
2. Reference input
3. Actuator
4. Summing junction
</div>

??? question "Show Answer"
    The correct answer is **C**. The actuator bridges the gap between the electrical signals from the controller and the physical quantities being controlled. Examples include motors, hydraulic servos, and heating elements. The sensor (A) measures the output, the reference input (B) is the desired setpoint, and the summing junction (D) computes the error signal.

    **Concept Tested:** Actuator

---

#### 4. A toaster that runs for a fixed time regardless of how toasted the bread becomes is an example of what type of control?

<div class="upper-alpha" markdown>
1. Closed-loop control
2. Feedback control
3. Adaptive control
4. Open-loop control
</div>

??? question "Show Answer"
    The correct answer is **D**. A timer-based toaster is an open-loop control system because it has no sensor to measure the actual toast color (output) and cannot adjust its operation based on the result. It simply runs for a predetermined time regardless of whether the bread is properly toasted. Options A and B both refer to systems with feedback, and option C refers to systems that modify their parameters over time.

    **Concept Tested:** Open-Loop Control

---

#### 5. What is the role of the sensor in a closed-loop control system?

<div class="upper-alpha" markdown>
1. To generate the reference input signal
2. To amplify the error signal
3. To measure the plant output and close the feedback loop
4. To reject disturbances before they affect the plant
</div>

??? question "Show Answer"
    The correct answer is **C**. The sensor measures the actual plant output and provides this measurement to the summing junction, where it is compared with the reference input. This measurement closes the feedback loop, enabling the control system to detect errors and respond accordingly. Option A describes the reference source, option B describes a controller function, and option D describes a benefit of feedback control rather than the sensor's direct role.

    **Concept Tested:** Sensor

---

#### 6. In the standard feedback control loop, what is the plant?

<div class="upper-alpha" markdown>
1. The algorithm that determines the control strategy
2. The physical system or process being controlled
3. The device that generates the setpoint
4. The component that measures system output
</div>

??? question "Show Answer"
    The correct answer is **B**. The plant is the physical system or process that we want to control—such as a motor, heating system, aircraft, or chemical reactor. Everything else in the control loop (controller, actuator, sensor) exists to make the plant behave as desired. Option A describes the controller, option C describes the reference input source, and option D describes the sensor.

    **Concept Tested:** Plant

---

#### 7. A cruise control system in a car uses a speed sensor to maintain the set speed. When driving uphill, the system automatically increases throttle to compensate. This demonstrates which key advantage of feedback control?

<div class="upper-alpha" markdown>
1. Reduced system complexity
2. Lower manufacturing cost
3. Disturbance rejection
4. Faster initial response
</div>

??? question "Show Answer"
    The correct answer is **C**. The hill represents a disturbance that would cause the car to slow down. The feedback control system detects the speed reduction through the sensor and automatically commands more throttle to maintain the setpoint. This automatic compensation for disturbances is a hallmark of closed-loop control. Options A and B are actually disadvantages of feedback systems (they are more complex and costly), and option D is not necessarily true.

    **Concept Tested:** Disturbance, Feedback

---

#### 8. The reference input in a control system is also known as the:

<div class="upper-alpha" markdown>
1. Error signal
2. Setpoint or command
3. Disturbance input
4. Feedback signal
</div>

??? question "Show Answer"
    The correct answer is **B**. The reference input, setpoint, and command are all terms for the desired output value that the control system attempts to achieve. For example, setting a thermostat to 72°F establishes a reference input of 72°F. Option A is the difference between reference and measured output, option C is an unwanted input, and option D is the measurement returned from the sensor.

    **Concept Tested:** Reference Input

---

#### 9. Which of the following is NOT a characteristic of open-loop control systems?

<div class="upper-alpha" markdown>
1. Simpler and less expensive than closed-loop systems
2. Vulnerable to disturbances and model inaccuracies
3. Uses feedback to adjust control action
4. Appropriate when precision requirements are modest
</div>

??? question "Show Answer"
    The correct answer is **C**. Open-loop control systems do NOT use feedback—that is their defining characteristic. They operate based solely on the input and a predetermined model. Options A, B, and D are all true characteristics of open-loop systems: they are simpler and cheaper, they cannot compensate for disturbances or model errors, and they work well when high precision is not required.

    **Concept Tested:** Open-Loop Control

---

#### 10. The controller in a feedback control system processes which signal to generate the control action?

<div class="upper-alpha" markdown>
1. The reference input directly
2. The plant output directly
3. The error signal from the summing junction
4. The disturbance signal
</div>

??? question "Show Answer"
    The correct answer is **C**. The controller receives the error signal (the difference between reference input and measured output) from the summing junction and uses this information to generate an appropriate control command. The controller's goal is to drive the error toward zero. It does not process the reference input directly (A), the raw output (B), or the disturbance (D)—though the effects of disturbances are reflected in the error signal.

    **Concept Tested:** Controller, Error Signal

---
