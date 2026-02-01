---
title: Interactive Feedback Loop Simulator
description: Explore how controller gain K and plant time constant τ affect closed-loop step response, steady-state error, and settling time.
quality_score: 90
image: /sims/feedback-loop-simulator/feedback-loop-simulator.png
og:image: /sims/feedback-loop-simulator/feedback-loop-simulator.png
twitter:image: /sims/feedback-loop-simulator/feedback-loop-simulator.png
social:
   cards: false
---
# Interactive Feedback Loop Simulator

<iframe src="main.html" height="552px" width="100%" scrolling="no"></iframe>

[Run the Feedback Loop Simulator Fullscreen](./main.html){ .md-button .md-button--primary }

## Embedding

Place the following line in your website to include this MicroSim in your course:

```html
<iframe src="https://dmccreary.github.io/control-systems/sims/feedback-loop-simulator/main.html" height="552px" width="100%" scrolling="no"></iframe>
```

## Description

This interactive simulator demonstrates how proportional controller gain affects the step response of a first-order closed-loop system. Students can adjust parameters and observe real-time changes in system behavior.

### System Model

**Plant:** First-order system
$$G_p(s) = \frac{1}{\tau s + 1}$$

**Controller:** Proportional gain
$$G_c(s) = K$$

**Closed-Loop Transfer Function:**
$$G_{CL}(s) = \frac{K}{\tau s + 1 + K} = \frac{K/(1+K)}{(\tau/(1+K))s + 1}$$

### Key Relationships

| Parameter | Formula | Effect of Increasing K |
|-----------|---------|------------------------|
| Steady-State Output | $y_{ss} = \frac{K}{1+K}$ | Approaches 1 (reference) |
| Steady-State Error | $e_{ss} = \frac{1}{1+K}$ | Decreases toward 0 |
| Closed-Loop Time Constant | $\tau_{CL} = \frac{\tau}{1+K}$ | Faster response |
| Settling Time (2%) | $t_s \approx 4\tau_{CL}$ | Faster settling |

### Interactive Controls

- **Gain K slider** (0.5 to 10): Adjusts controller gain
- **Tau τ slider** (0.5 to 3): Adjusts plant time constant
- **Run/Pause button**: Animates the step response
- **Reset button**: Returns to default parameters
- **Show error region**: Highlights the area between reference and output

### What to Observe

1. **Effect of increasing K:**
   - Output gets closer to reference (less steady-state error)
   - Response becomes faster (smaller time constant)
   - But: Some error always remains with proportional control alone

2. **Effect of increasing τ:**
   - Response becomes slower
   - Same steady-state error (depends only on K)

## Learning Objectives

After using this MicroSim, students will be able to:

1. **Demonstrate** how changing K affects closed-loop response speed
2. **Calculate** steady-state error for a proportional control system
3. **Predict** settling time from system parameters
4. **Explain** why proportional control alone cannot eliminate steady-state error

## Lesson Plan

### Warm-Up Exploration (5 minutes)
1. Set K=1, τ=1. Click "Run" and observe the step response.
2. What is the final value of the output? Is it equal to the reference?

### Guided Investigation (15 minutes)

**Part 1: Effect of Controller Gain**
1. Keep τ=1 fixed
2. Try K = 0.5, 1, 2, 5, 10
3. For each K, record:
   - Steady-state output y_ss
   - Approximate settling time
4. Question: What happens to the error as K increases?

**Part 2: Effect of Plant Time Constant**
1. Keep K=2 fixed
2. Try τ = 0.5, 1, 2, 3
3. Observe how response speed changes
4. Question: Does τ affect the final steady-state error?

### Mathematical Verification (10 minutes)
1. For K=4, τ=1, predict:
   - y_ss = K/(1+K) = ?
   - e_ss = 1/(1+K) = ?
   - τ_CL = τ/(1+K) = ?
2. Run the simulation and verify your calculations

### Discussion Questions

1. Why can't proportional control eliminate all steady-state error?
2. What type of controller action might help reduce steady-state error to zero?
3. If you need faster response, would you increase K or decrease τ?

## Key Insight

!!! tip "The Proportional Control Limitation"
    With proportional control alone, the steady-state error $e_{ss} = \frac{1}{1+K}$ can never reach zero, no matter how large K becomes. This fundamental limitation motivates the introduction of **integral action** in PID controllers.

## References

- [Chapter 1: Introduction to Control Systems](../../chapters/01-intro-to-control-systems/index.md)
- [Feedback Loop Block Diagram](../feedback-loop-block-diagram/index.md)
- [Chapter 15: PID Control and Tuning](../../chapters/15-pid-control-tuning/index.md)
