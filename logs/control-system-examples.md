# Control System Examples MicroSim - Development Log

**Date:** 2026-02-01
**Session:** MicroSim creation for Chapter 1: Introduction to Control Systems
**Model:** Claude Opus 4.5

---

## 1. Initial Request

User requested extraction of diagrams from Chapter 1 (`docs/chapters/01-intro-to-control-systems/index.md`).

### Diagrams Identified in Chapter 1:

1. **Control System Examples in Daily Life** (line 73) - Interactive infographic
2. **Standard Feedback Control Loop Block Diagram** (line 152) - Signal flow diagram
3. **Interactive Feedback Loop Simulator** (line 291) - p5.js parameter exploration
4. **Open-Loop vs Closed-Loop Comparison** (line 393) - Side-by-side simulator

User then requested creation of diagram #1 using the `/microsim-generator` skill.

---

## 2. Specification from Chapter

From the chapter's `<details>` block:

```
Type: infographic
Bloom Taxonomy: Understand (L2)
Bloom Verb: identify, exemplify

Learning Objective: Students will identify control systems in everyday
contexts and classify them as open-loop or closed-loop, building intuition
before formal definitions.

Layout: Interactive grid of 6-8 clickable icons representing common systems

Examples to include:
1. Toaster (open-loop) - timer-based, no measurement of bread color
2. Thermostat/HVAC (closed-loop) - temperature sensor provides feedback
3. Washing machine timer (open-loop) - fixed cycle regardless of cleanliness
4. Cruise control (closed-loop) - speedometer provides feedback to throttle
5. Traffic light with fixed timing (open-loop) - no traffic measurement
6. Traffic light with sensors (closed-loop) - detects vehicles waiting

Interactive elements:
- Click on each icon to reveal: system name, input, output, whether feedback is present
- Hover shows brief description
- Color coding: blue border for closed-loop, orange border for open-loop

Visual style: Clean icons with modern flat design, arranged in 2 rows of 3-4
```

---

## 3. Instructional Design Checkpoint

### Analysis:

| Field | Value |
|-------|-------|
| Bloom Level | Understand (L2) |
| Bloom Verb | identify, classify |
| Recommended Pattern | Clickable reveal with concrete data visibility |
| Specification Alignment | Aligned |

### Rationale:

For "identify and classify" objectives at the Understand level, learners need to see examples and their categorization clearly. An interactive grid with click-to-reveal supports recognition and classification without requiring complex animation. This is appropriate for L2 - no continuous animation needed.

---

## 4. Technical Decisions

### Library Selection

**Chosen:** p5.js (via `references/p5-guide.md`)

**Reasoning:** Custom interactive grid with clickable icons and hover effects requires canvas-based drawing. p5.js provides the flexibility needed for custom icon drawing and interaction handling.

### Layout Calculations

| Parameter | Value | Notes |
|-----------|-------|-------|
| drawHeight | 400px | Main visualization area |
| controlHeight | 50px | Legend area only (no sliders) |
| canvasHeight | 450px | Total canvas |
| iframeHeight | 452px | Canvas + 2px border |
| Grid | 3 columns x 2 rows | 6 examples total |
| Icon scale | 2x (after revision) | User requested larger icons |

### Color Scheme

| System Type | Border Color | Background | Hover | Selected |
|-------------|--------------|------------|-------|----------|
| Open-loop | #FF8C00 (orange) | #FFF3E6 | #FFD699 | #FFB347 |
| Closed-loop | #1E90FF (blue) | #E6F3FF | #B8E0F0 | #87CEEB |

---

## 5. Files Created

### Directory: `docs/sims/control-system-examples/`

| File | Purpose | Size |
|------|---------|------|
| `control-system-examples.js` | p5.js interactive infographic | ~450 lines |
| `main.html` | HTML wrapper with p5.js CDN | Standard template |
| `index.md` | Documentation with lesson plan | Full lesson plan included |
| `metadata.json` | Dublin Core metadata | Educational metadata |
| `control-system-examples.png` | Screenshot for social preview | 60KB |

### Navigation Update

Added to `mkdocs.yml`:
```yaml
- Sims:
  - List of Sims: sims/index.md
  - Control System Examples: sims/control-system-examples/index.md  # NEW
  - Graph Viewer: sims/graph-viewer/index.md
```

---

## 6. Implementation Details

### Data Structure

```javascript
const examples = [
  {
    name: "Toaster",
    type: "open-loop",
    icon: "toaster",
    input: "Timer setting",
    output: "Toast darkness",
    feedback: "None - runs for set time regardless of bread color",
    description: "Timer-based operation with no measurement of actual toast color"
  },
  // ... 5 more examples
];
```

### Icon Drawing

Custom icons drawn using p5.js primitives:
- Toaster: Rectangle with slots and lever
- Thermostat: Circle with temperature marks and pointer
- Washing Machine: Rectangle with circular drum window
- Car: Custom shape with wheels and speedometer arc
- Traffic Light (fixed): Rectangle with three colored circles
- Traffic Light (smart): Same as fixed + sensor wave arcs

### Interaction Model

1. **Hover**: Card background lightens, stored in `hoverExample` variable
2. **Click**: Opens modal info panel with full details
3. **Close**: Click X button or click outside panel

---

## 7. Revision: Icon Size Increase

### User Request
"make the images in the center of each panel 2x larger"

### Changes Made

1. Added `scale(2)` in `drawIcon()` function after `translate(x, y)`
2. Adjusted icon Y position from `-15` to `-25` to prevent label overlap
3. Halved all `strokeWeight` values to maintain visual line thickness:
   - `strokeWeight(2)` → `strokeWeight(1)`
   - `strokeWeight(3)` → `strokeWeight(1.5)`
   - `strokeWeight(1)` → `strokeWeight(0.5)`
4. Halved text size in thermostat icon: `textSize(10)` → `textSize(5)`

---

## 8. Screenshot Capture

### Initial Attempts (Failed)

1. Direct Chrome headless with `file://` URL - screenshot not saved to expected location
2. Chrome headless with localhost server started manually - permission issues

### Successful Method

User provided custom script location:
```bash
~/.local/bin/bk-capture-screenshot /Users/dan/Documents/ws/control-systems/docs/sims/control-system-examples
```

**Output:**
- File: `control-system-examples.png`
- Size: 60KB (61,569 bytes)
- Dimensions: 1200x800 (viewport size)

---

## 9. Skill Documentation Updates

### Files Modified in `claude-skills` Repository

#### `/Users/dan/Documents/ws/claude-skills/skills/microsim-utils/SKILL.md`

- Updated screen-capture section to reference `~/.local/bin/bk-capture-screenshot`
- Added script path to Example 2
- Updated "After Creating New MicroSim" workflow

#### `/Users/dan/Documents/ws/claude-skills/skills/microsim-utils/references/screen-capture.md`

- Updated Step 2 command syntax
- Updated troubleshooting sections for new script behavior
- Updated Advanced Usage section (script handles localhost automatically)
- Updated Resources section with new script location

#### `/Users/dan/Documents/ws/claude-skills/CLAUDE.md`

Added new section "MicroSim Screenshot Capture" with:
- Trigger phrases: "capture screenshot", "capture screen image", "capture microsim screen image"
- Command syntax and example
- Script behavior description
- Proactive behavior rule: Ask user about screenshot capture when they indicate satisfaction with MicroSim layout

---

## 10. Testing URLs

- **Local development:** `http://127.0.0.1:8000/control-systems/sims/control-system-examples/main.html`
- **Production (after deploy):** `https://dmccreary.github.io/control-systems/sims/control-system-examples/main.html`

---

## 11. Lessons Learned

1. **Chrome headless `file://` URLs are unreliable** - The `bk-capture-screenshot` script's approach of using a localhost server is more robust for capturing JavaScript-heavy MicroSims.

2. **Icon scaling requires stroke adjustment** - When using `scale()` in p5.js, stroke weights are also scaled, requiring manual adjustment to maintain visual consistency.

3. **Proactive screenshot prompts improve workflow** - Adding the proactive behavior to ask about screenshots when users are satisfied with layouts ensures MicroSims get proper preview images.

---

## 12. Future Work

Remaining diagrams to create for Chapter 1:

- [ ] Standard Feedback Control Loop Block Diagram (line 152)
- [ ] Interactive Feedback Loop Simulator (line 291)
- [ ] Open-Loop vs Closed-Loop Comparison (line 393)

---

## 13. Session Statistics

| Metric | Value |
|--------|-------|
| Files created | 5 |
| Files modified | 4 |
| Total lines of JavaScript | ~450 |
| Screenshot size | 60KB |
| Skill docs updated | 3 files |
