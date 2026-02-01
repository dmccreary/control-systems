# Interactive Feedback Loop Simulator MicroSim - Development Log

**Date:** 2026-02-01
**Session:** MicroSim creation for Chapter 1: Introduction to Control Systems
**Model:** Claude Opus 4.5

---

## 1. Initial Request

User requested creation of diagram #3 from Chapter 1: "Interactive Feedback Loop Simulator" (line 291) using the `/microsim-generator` skill.

---

## 2. Specification from Chapter

From the chapter's `<details>` block (lines 295-350):

```
Type: microsim
Bloom Taxonomy: Apply (L3)
Bloom Verb: demonstrate, execute

Learning Objective: Students will observe how changing the controller gain
affects closed-loop system response, developing intuition for the relationship
between controller parameters and performance.

Plant model: First-order system G_p(s) = 1/(τs + 1)
Controller: Proportional controller G_c(s) = K
Closed-loop transfer function: K/(τs + 1 + K) = K/(τs + (1 + K))

Interactive controls:
- Slider: Controller gain K (range 0.5 to 10, default 2)
- Slider: Plant time constant τ (range 0.5 to 3, default 1)
- Button: "Run Simulation"
- Button: "Reset"
- Checkbox: "Show error signal"
- Display: Final steady-state error value
- Display: Approximate settling time

Data visibility requirements:
- Show K value prominently
- Show calculated closed-loop time constant: τ_CL = τ/(1+K)
- Show steady-state value: y_ss = K/(1+K)
```

---

## 3. Instructional Design Checkpoint

### Analysis:

| Field | Value |
|-------|-------|
| Bloom Level | Apply (L3) |
| Bloom Verb | demonstrate, execute |
| Recommended Pattern | Parameter sliders with real-time feedback |
| Specification Alignment | Aligned |

### Rationale:

For Apply-level objectives, students need to actively manipulate parameters and observe consequences. Real-time animation of step response as parameters change supports building intuition about feedback control behavior. This is appropriate for L3 - active parameter exploration.

---

## 4. Technical Decisions

### Library Selection

**Chosen:** p5.js

**Reasoning:** Time-domain plotting with animation, sliders for parameter control, and real-time calculated value display. p5.js provides excellent animation control and canvas-based UI elements.

### Layout Calculations

| Parameter | Value | Notes |
|-----------|-------|-------|
| drawHeight | 450px | Main visualization area |
| controlHeight | 80px | Sliders, buttons, checkbox (user adjusted from 100) |
| canvasHeight | 530px | Total canvas |
| iframeHeight | 552px | Canvas + 2px border |
| plotLeft | 70px | Left margin for y-axis labels |
| plotRight | canvasWidth - 220px | Room for info panel |

### Mathematical Model

**Plant Transfer Function:**
$$G_p(s) = \frac{1}{\tau s + 1}$$

**Controller:**
$$G_c(s) = K$$

**Closed-Loop Transfer Function:**
$$G_{CL}(s) = \frac{K}{\tau s + 1 + K}$$

**Key Derived Equations:**

| Parameter | Formula | Description |
|-----------|---------|-------------|
| Steady-State Output | $y_{ss} = \frac{K}{1+K}$ | Final output value |
| Steady-State Error | $e_{ss} = \frac{1}{1+K}$ | Error that remains |
| Closed-Loop Time Constant | $\tau_{CL} = \frac{\tau}{1+K}$ | Speed of response |
| Settling Time (2%) | $t_s \approx 4\tau_{CL}$ | Time to reach steady state |

**Step Response:**
$$y(t) = y_{ss} \cdot (1 - e^{-t/\tau_{CL}})$$

---

## 5. Files Created

### Directory: `docs/sims/feedback-loop-simulator/`

| File | Purpose | Size |
|------|---------|------|
| `feedback-loop-simulator.js` | p5.js interactive simulator | ~500 lines |
| `main.html` | HTML wrapper with p5.js CDN | Standard template |
| `index.md` | Documentation with lesson plan and LaTeX equations | Full lesson plan |
| `metadata.json` | Dublin Core metadata with model equations | Educational metadata |
| `feedback-loop-simulator.png` | Screenshot for social preview | 51KB |

### Navigation Update

Added to `mkdocs.yml`:
```yaml
- Sims:
  - List of Sims: sims/index.md
  - Control System Examples: sims/control-system-examples/index.md
  - Feedback Loop Block Diagram: sims/feedback-loop-block-diagram/index.md
  - Feedback Loop Simulator: sims/feedback-loop-simulator/index.md  # NEW
  - Graph Viewer: sims/graph-viewer/index.md
```

---

## 6. Implementation Details

### Visual Elements

1. **Time-Domain Plot:**
   - X-axis: Time (0-10 seconds)
   - Y-axis: Amplitude (0-1.5)
   - Blue dashed line: Reference input r(t) - step from 0 to 1 at t=1s
   - Orange solid line: System output y(t)
   - Optional shaded error region between reference and output

2. **Mini Block Diagram:**
   - Top-right corner showing K → G_p feedback structure
   - Visual reminder of system architecture

3. **Info Panel:**
   - Controller Gain K (bold, blue)
   - Plant Time Constant τ
   - Calculated values: τ_CL, y_ss, e_ss, t_s
   - Insight box explaining K effects

### Animation System

- `currentTime` tracks animation progress
- `animationSpeed = 0.05` seconds per frame
- Animation stops when `currentTime >= tMax`
- Button changes to "Run Again" on completion

### Controls

| Control | Type | Range | Default |
|---------|------|-------|---------|
| Gain K | Slider | 0.5 - 10 | 2 |
| Tau τ | Slider | 0.5 - 3 | 1 |
| Run/Pause/Run Again | Button | - | - |
| Reset | Button | - | - |
| Show error region | Checkbox | - | false |

---

## 7. Revisions Made

### Revision 1: Button Label on Completion
**Request:** "As soon as the time hits the right edge of the plot, stop the simulation and change the 'Run' button label to be 'Run Again'"

**Change:** Modified the animation completion handler:
```javascript
if (currentTime >= tMax) {
  currentTime = tMax;
  isRunning = false;
  runButton.html('Run Again');  // Changed from 'Run'
}
```

### Revision 2: Reset Button Position
**Request:** "move the 'Reset' button to the right so it does not overlap the 'Run Again' button which should now be wider"

**Change:** `resetButton.position(350, controlY)` → `resetButton.position(385, controlY)`

### Revision 3: Control Height (User Edit)
**Change:** User reduced `controlHeight` from 100 to 80 pixels for tighter layout.

---

## 8. Screenshot Capture

**Method:** `~/.local/bin/bk-capture-screenshot`

**Command:**
```bash
~/.local/bin/bk-capture-screenshot /Users/dan/Documents/ws/control-systems/docs/sims/feedback-loop-simulator
```

**Output:**
- File: `feedback-loop-simulator.png`
- Size: 51KB (52,653 bytes)
- Dimensions: 1200x800 (viewport size)

**Screenshot shows:**
- Complete step response with default parameters (K=2, τ=1)
- Reference step at t=1s (blue dashed) reaching amplitude 1.0
- Output response (orange) reaching y_ss = 0.667
- Info panel displaying all calculated values
- Insight box with key takeaways
- All controls visible in control region

---

## 9. Testing URLs

- **Local development:** `http://127.0.0.1:8000/control-systems/sims/feedback-loop-simulator/main.html`
- **Production (after deploy):** `https://dmccreary.github.io/control-systems/sims/feedback-loop-simulator/main.html`

---

## 10. Key Educational Insights

### The Proportional Control Limitation

This simulator visually demonstrates a fundamental concept: **proportional control alone cannot eliminate steady-state error**.

With $e_{ss} = \frac{1}{1+K}$:
- K = 1 → e_ss = 0.500 (50% error)
- K = 2 → e_ss = 0.333 (33% error)
- K = 10 → e_ss = 0.091 (9% error)
- K = 100 → e_ss = 0.010 (1% error)
- K → ∞ → e_ss → 0

The error approaches but never reaches zero. This motivates the introduction of **integral action** in Chapter 15 (PID Control).

---

## 11. Lessons Learned

1. **Button width considerations** - When button labels change dynamically ("Run" → "Run Again"), space must be allocated for the longest label.

2. **Real-time parameter updates** - Recalculating the full response curve when sliders change (not just during animation) provides immediate visual feedback.

3. **Insight boxes add value** - A small box summarizing key takeaways helps students focus on the important relationships.

4. **First-order systems are good starting points** - No overshoot or oscillation simplifies the initial learning experience before introducing second-order systems.

---

## 12. Related MicroSims

| MicroSim | Status | Chapter |
|----------|--------|---------|
| Control System Examples | Complete | Chapter 1 |
| Feedback Loop Block Diagram | Complete | Chapter 1 |
| Feedback Loop Simulator | Complete | Chapter 1 |
| Open-Loop vs Closed-Loop Comparison | Pending | Chapter 1 |

---

## 13. Session Statistics

| Metric | Value |
|--------|-------|
| Files created | 5 |
| Files modified | 1 (mkdocs.yml) |
| Total lines of JavaScript | ~500 |
| Screenshot size | 51KB |
| Revisions | 3 |
| Mathematical equations | 6 |
| Interactive controls | 5 |
