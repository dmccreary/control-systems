---
title: Open-Loop vs Closed-Loop Comparison
description: Interactive side-by-side comparison demonstrating how feedback control enables superior disturbance rejection compared to open-loop systems.
image: /sims/open-vs-closed-loop/open-vs-closed-loop.png
og:image: /sims/open-vs-closed-loop/open-vs-closed-loop.png
twitter:image: /sims/open-vs-closed-loop/open-vs-closed-loop.png
quality_score: 85
social:
   cards: false
---

# Open-Loop vs Closed-Loop Comparison

<iframe src="main.html" height="502px" width="100%" scrolling="no"></iframe>

[Run the Open-Loop vs Closed-Loop Comparison Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This interactive simulation provides a side-by-side comparison of open-loop and closed-loop control systems, demonstrating the fundamental difference in how each architecture handles disturbances.

### What You'll Learn

- **Open-loop systems** cannot automatically compensate for disturbances - when a disturbance occurs, the output shifts and stays at the wrong value
- **Closed-loop systems** use feedback to detect and reject disturbances - the output recovers toward the reference
- Higher controller gain (K) provides better disturbance rejection but cannot eliminate all error with proportional control alone

### How to Use

1. **Start State**: Both systems begin at steady state, trying to maintain output y = 1
2. **Apply Disturbance**: Click "Apply Disturbance" to introduce a step disturbance at t = 3 seconds
3. **Compare**: Observe how the open-loop output shifts permanently while the closed-loop output recovers
4. **Experiment**: Adjust the disturbance magnitude and controller gain K to see their effects

### Key Observations

| System | After Disturbance |
|--------|-------------------|
| Open-Loop | Output shifts by full disturbance amount and stays there |
| Closed-Loop | Output is deflected but recovers; error reduced by factor of (1+K) |

## Iframe Embed Code

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/control-systems/sims/open-vs-closed-loop/main.html"
        height="502px"
        width="100%"
        scrolling="no">
</iframe>
```

## Lesson Plan

### Learning Objectives

After completing this activity, students will be able to:

1. **Differentiate** between open-loop and closed-loop control architectures based on their response to disturbances
2. **Analyze** why feedback enables automatic disturbance rejection
3. **Predict** how increasing controller gain affects disturbance rejection capability

### Pre-Activity Questions

Before using the simulation, have students predict:

1. What will happen to each system's output when a disturbance is applied?
2. Which system do you expect to handle disturbances better? Why?
3. How might increasing the controller gain change the closed-loop response?

### Guided Exploration

1. **Baseline Comparison**: Apply the default disturbance (d = 0.3) and note:
   - The steady-state error for each system
   - The percentage error reduction achieved by the closed-loop

2. **Gain Investigation**: Reset and try different values of K:
   - K = 1 (low gain)
   - K = 5 (medium gain)
   - K = 10 (high gain)

   Record the steady-state error for each. What pattern do you observe?

3. **Disturbance Direction**: Try both positive and negative disturbances. Does the direction affect the comparison?

### Discussion Questions

1. Why can't the open-loop system compensate for the disturbance?
2. What information does the closed-loop system have that the open-loop lacks?
3. Can proportional control alone eliminate all steady-state error? Why or why not?
4. What real-world systems might you choose to be open-loop vs closed-loop?

### Assessment

Have students write a brief explanation (3-4 sentences) of:
- Why feedback is essential for disturbance rejection
- The role of controller gain in determining rejection capability
- A real-world example where feedback control is necessary

## Technical Details

### Plant Model

Both systems use a first-order plant:

$$G_p(s) = \frac{1}{\tau s + 1}$$

where τ = 1 second (plant time constant).

### Open-Loop Configuration

- Fixed controller gain: Gc = 1 (calibrated for unity output with no disturbance)
- No feedback path
- Disturbance directly affects output

### Closed-Loop Configuration

- Proportional controller: Gc = K (adjustable from 1 to 10)
- Negative feedback with unity sensor gain
- Closed-loop transfer function: $\frac{K}{\tau s + (1 + K)}$
- Disturbance rejection: errors attenuated by factor $\frac{1}{1+K}$

### Steady-State Analysis

For a unit step reference with disturbance d:

| Metric | Open-Loop | Closed-Loop |
|--------|-----------|-------------|
| Steady-state output | 1 + d | K/(1+K) + d/(1+K) |
| Error due to disturbance | d | d/(1+K) |
| Error reduction | — | (1 - 1/(1+K)) × 100% |

## References

1. Nise, N. S. (2019). *Control Systems Engineering* (8th ed.). Wiley.
2. Franklin, G. F., Powell, J. D., & Emami-Naeini, A. (2019). *Feedback Control of Dynamic Systems* (8th ed.). Pearson.
3. Dorf, R. C., & Bishop, R. H. (2017). *Modern Control Systems* (13th ed.). Pearson.
