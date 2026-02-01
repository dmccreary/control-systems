# Feedback Loop Block Diagram MicroSim - Development Log

**Date:** 2026-02-01
**Session:** MicroSim creation for Chapter 1: Introduction to Control Systems
**Model:** Claude Opus 4.5

---

## 1. Initial Request

User requested creation of diagram #2 from Chapter 1: "Standard Feedback Control Loop Block Diagram" (line 152) using the `/microsim-generator` skill.

---

## 2. Specification from Chapter

From the chapter's `<details>` block (lines 156-200):

```
Type: diagram
Bloom Taxonomy: Understand (L2)
Bloom Verb: explain, describe

Learning Objective: Students will trace signal flow through a complete
feedback control system, identifying each component's role and how signals
transform as they propagate through the loop.

Components to show (left to right):
1. Reference Input r(t) - arrow entering from left
2. Summing Junction (circle with +/- signs) - where error is computed
3. Error Signal e(t) = r(t) - y(t) - arrow from summing junction
4. Controller block - labeled "Controller G_c(s)"
5. Control signal u(t) - arrow from controller
6. Actuator block - labeled "Actuator"
7. Actuator output - arrow to plant
8. Plant block - labeled "Plant G_p(s)"
9. Output y(t) - arrow to right (system response)
10. Disturbance d(t) - arrow entering at plant (from above)
11. Sensor block - labeled "Sensor H(s)" - in feedback path
12. Measured output - arrow from sensor back to summing junction (negative input)

Color scheme:
- Reference/command path: blue
- Feedback path: green
- Disturbance: red
- Plant/actuator: gray

Interactive features:
- Hover over any block to see detailed description
- Hover over any signal arrow to see what that signal represents
- Click on blocks to highlight the signal path through that component
```

---

## 3. Instructional Design Checkpoint

### Analysis:

| Field | Value |
|-------|-------|
| Bloom Level | Understand (L2) |
| Bloom Verb | explain, describe |
| Recommended Pattern | Interactive hover/click with concrete data visibility |
| Specification Alignment | Aligned |

### Rationale:

For "explain/describe" at Understand level, learners need to see component roles and signal flow clearly. Interactive hover/click reveals support exploration without overwhelming with animation. No continuous animation needed for this objective.

---

## 4. Technical Decisions

### Library Selection

**Chosen:** p5.js

**Reasoning:** Custom block diagram with precise positioning of blocks, arrows, and interactive hover/click detection. p5.js provides flexibility for custom drawing and hit detection on arbitrary shapes.

### Layout Calculations

| Parameter | Value | Notes |
|-----------|-------|-------|
| drawHeight | 400px | Main visualization area |
| controlHeight | 50px | Legend area |
| canvasHeight | 450px | Total canvas |
| iframeHeight | 452px | Canvas + 2px border |
| centerY | drawHeight/2 + 50 | Shifted down to avoid info panel overlap |
| blockWidth | 90px | Standard block width |
| blockHeight | 45px | Standard block height |

### Color Scheme

| Element | Color | Hex Code |
|---------|-------|----------|
| Forward Path (Reference) | Blue | #1E90FF |
| Feedback Path | Green | #228B22 |
| Disturbance | Red | #DC143C |
| Plant/Actuator | Gray | #696969 |
| Controller | Royal Blue | #4169E1 |
| Sensor | Green | #228B22 |
| Highlight | Gold | #FFD700 |
| Background | Alice Blue | #F0F8FF |

---

## 5. Files Created

### Directory: `docs/sims/feedback-loop-block-diagram/`

| File | Purpose | Size |
|------|---------|------|
| `feedback-loop-block-diagram.js` | p5.js interactive block diagram | ~550 lines |
| `main.html` | HTML wrapper with p5.js CDN | Standard template |
| `index.md` | Documentation with lesson plan | Full lesson plan |
| `metadata.json` | Dublin Core metadata | Educational metadata |
| `feedback-loop-block-diagram.png` | Screenshot for social preview | 37KB |

### Navigation Update

Added to `mkdocs.yml`:
```yaml
- Sims:
  - List of Sims: sims/index.md
  - Control System Examples: sims/control-system-examples/index.md
  - Feedback Loop Block Diagram: sims/feedback-loop-block-diagram/index.md  # NEW
  - Graph Viewer: sims/graph-viewer/index.md
```

---

## 6. Implementation Details

### Component Data Structure

Each block stores:
```javascript
{
  x, y, w, h,      // Position and dimensions
  name,            // Identifier for hover/click
  label,           // Display text
  sublabel,        // Transfer function notation (e.g., "Gc(s)")
  color,           // Border color
  type: 'block'    // Element type
}
```

Each signal (arrow) stores:
```javascript
{
  x1, y1, x2, y2,  // Start and end points
  name,            // Identifier
  label,           // Signal notation (e.g., "e(t)")
  color,           // Line color
  labelPos,        // 'above', 'below', 'left', 'right'
  isFeedback,      // Boolean for path type
  noArrow          // Skip arrowhead (for corner segments)
}
```

### Descriptions Object

Each component has a description object with:
- `symbol` - Mathematical notation
- `description` - What the component does
- `example` - Real-world cruise control example

### Interactive Features

1. **Hover Detection:**
   - Blocks: Rectangle bounds check with 5px tolerance
   - Summing Junction: Distance from center < radius + 5
   - Signals: Point-to-line-segment distance < 10px tolerance

2. **Info Panel:**
   - Appears in top-right when hovering
   - Shows component name, symbol, description, and example
   - Semi-transparent white background with rounded corners

3. **Click Selection:**
   - Toggle selection on click
   - Selected elements highlighted in gold
   - Selection shown in legend

---

## 7. Revisions Made

### Revision 1: Legend Position
**Request:** "move the blue, green and red lines in the control region down 5"

**Change:** `legendY = drawHeight + 25` → `legendY = drawHeight + 30`

### Revision 2: Legend Text Position
**Request:** "move them back up 5" (text labels moved with lines)

**Change:** Text calls changed from `legendY` to `legendY - 5`

### Revision 3: Drawing Position
**Request:** "move the entire drawing down 50 so it does not overlap the infobox above it"

**Change:** `centerY = drawHeight / 2` → `centerY = drawHeight / 2 + 50`

This shifts all blocks, signals, and the summing junction down 50 pixels, clearing the info panel that appears at y=55 with height=100.

---

## 8. Screenshot Capture

**Method:** `~/.local/bin/bk-capture-screenshot`

**Command:**
```bash
~/.local/bin/bk-capture-screenshot /Users/dan/Documents/ws/control-systems/docs/sims/feedback-loop-block-diagram
```

**Output:**
- File: `feedback-loop-block-diagram.png`
- Size: 37KB (37,590 bytes)
- Dimensions: 1200x800 (viewport size)

**Screenshot shows:**
- Title and subtitle at top
- Complete block diagram with all 11 components
- Forward path in blue (r(t) → e(t) → Controller → Actuator → Plant → y(t))
- Feedback path in green (y(t) → Sensor → ym(t) → Summing Junction)
- Disturbance d(t) in red entering from above
- Legend at bottom with color coding

---

## 9. Testing URLs

- **Local development:** `http://127.0.0.1:8000/control-systems/sims/feedback-loop-block-diagram/main.html`
- **Production (after deploy):** `https://dmccreary.github.io/control-systems/sims/feedback-loop-block-diagram/main.html`

---

## 10. Lessons Learned

1. **Info panel positioning matters** - Initial drawing was too high and overlapped with the hover info panel. Adding a vertical offset to centerY solved this.

2. **Legend adjustments need careful coordination** - Moving colored lines without moving text labels requires separate Y values for rect() and text() calls.

3. **Hit detection for lines requires tolerance** - Using point-to-line-segment distance calculation with 10px tolerance provides good UX for hovering over thin arrows.

4. **Real-world examples aid comprehension** - Including cruise control examples for each component helps students connect abstract block diagram elements to familiar systems.

---

## 11. Future Enhancements

Possible improvements for this MicroSim:

- [ ] Animate signal flow (pulse traveling through the loop)
- [ ] Add numeric simulation (show actual values propagating)
- [ ] Allow users to "break" the loop and see open-loop behavior
- [ ] Add transfer function math preview on hover

---

## 12. Related MicroSims

| MicroSim | Status | Chapter |
|----------|--------|---------|
| Control System Examples | Complete | Chapter 1 |
| Feedback Loop Block Diagram | Complete | Chapter 1 |
| Interactive Feedback Loop Simulator | Pending | Chapter 1 |
| Open-Loop vs Closed-Loop Comparison | Pending | Chapter 1 |

---

## 13. Session Statistics

| Metric | Value |
|--------|-------|
| Files created | 5 |
| Files modified | 1 (mkdocs.yml) |
| Total lines of JavaScript | ~550 |
| Screenshot size | 37KB |
| Revisions | 3 |
| Components in diagram | 11 |
