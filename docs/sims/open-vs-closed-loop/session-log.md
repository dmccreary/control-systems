# Session Log: Open-Loop vs Closed-Loop Comparison MicroSim

**Date:** 2026-02-01
**Created by:** Claude Opus 4.5 via microsim-generator skill

## Summary

Created an interactive p5.js MicroSim that provides a side-by-side comparison of open-loop and closed-loop control systems, demonstrating disturbance rejection capabilities.

## Files Created

| File | Size | Description |
|------|------|-------------|
| `open-vs-closed-loop.js` | 13.5 KB | p5.js simulation code |
| `main.html` | 537 B | HTML wrapper with p5.js CDN v1.11.10 |
| `index.md` | 5.2 KB | Documentation with lesson plan |
| `metadata.json` | 2.7 KB | Dublin Core metadata |
| `open-vs-closed-loop.png` | 40 KB | Screenshot for social media |

## Specification Source

- **Chapter:** 01-intro-to-control-systems/index.md (lines 393-442)
- **Bloom Level:** Analyze (L4)
- **Bloom Verbs:** compare, differentiate

## Learning Objective

Students will compare the behavior of open-loop and closed-loop systems when subjected to the same disturbance, analyzing why feedback provides superior disturbance rejection.

## Key Features Implemented

1. **Dual Plot Layout** - Side-by-side comparison with open-loop (orange) on left, closed-loop (green) on right
2. **Interactive Disturbance** - Red "Apply Disturbance" button adds step disturbance at t=3s
3. **Adjustable Parameters:**
   - Disturbance magnitude slider: -0.5 to +0.5 (default 0.3)
   - Controller gain K slider: 1 to 10 (default 5)
4. **Real-time Metrics** - Steady-state error displayed for each system
5. **Comparison Statistics** - Shows percentage error reduction when disturbance is applied

## Plant Model

- First-order system: G_p(s) = 1/(τs + 1), τ = 1 second
- Open-loop: Fixed gain G_c = 1 (pre-calibrated)
- Closed-loop: Proportional controller G_c = K

## Post-Creation Modifications

1. **Button styling fix** - Made "Apply Disturbance" and "Reset Both" buttons consistent height with matching border-radius and cursor styles
2. **Button positioning** - Moved "Reset Both" button 20 pixels to the right (x=145 → x=165)

## Navigation Update

Added to `mkdocs.yml` under Sims section:
```yaml
- Open-Loop vs Closed-Loop: sims/open-vs-closed-loop/index.md
```

## Test URL

```
http://127.0.0.1:8000/control-systems/sims/open-vs-closed-loop/main.html
```

## Quality Checklist

- [x] Canvas height matches iframe (500px draw + 100px control = 600px, iframe = 502px)
- [x] updateCanvasSize() called first in setup()
- [x] windowResized() handles responsive layout
- [x] describe() accessibility function included
- [x] Controls positioned below drawHeight
- [x] Sliders resize on window resize
- [x] Screenshot captured for social media
