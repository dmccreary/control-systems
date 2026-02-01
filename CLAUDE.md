# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an MkDocs Material intelligent textbook for a Control Systems college course. It features:
- Learning graphs with 300 concepts and dependency relationships
- Interactive MicroSims using vis-network.js for graph visualization
- KaTeX for LaTeX equation rendering
- Taxonomy-based concept classification


## Tone and Content Guidelines

The voice is **conversational academic**—warm, welcoming, and never intimidating. Use contractions naturally, address readers directly with "you" and inclusive "we," and acknowledge that math can be challenging while reassuring students they'll master it. Frame control systems mastery as gaining a "superpower" that helps understand and create innovative products. Celebrate milestones (e.g., "when you see LTI, celebrate!") and be honest about limitations ("most real systems are nonlinear—but linear approximations are remarkably useful").

Humor should be **dry wit with occasional puns**, sprinkled lightly (1-2 jokes per major section). Use understated observations ("the future is, inconveniently, still unknown"), wordplay on technical terms ("plant" → "not the succulent on your windowsill"), and relatable everyday analogies (thermostat wars, road trip snacks, that friend who notices everything). Pop culture references work well when natural (Inception for nested loops, guitar amps to 11 for saturation). Never mock the student—affectionately mock the difficulty of the subject instead.

Keep explanations **active and energetic**: "Divide and conquer!" not "This allows for decomposition." Use metaphor patterns consistently: system components as cast of characters (director, muscle, eyes & ears), mathematical tools as superpowers or weapons, challenges as enemies to defeat. Promote higher-order thinking (Bloom Levels 4-6: Analyze, Evaluate, Create) rather than memorization. Avoid excessive exclamation points, forced jokes that interrupt flow, and condescending phrases like "as you know."

## Gyra: The Narrative Anchor

**Gyra** is the course mascot—a small, two-wheeled, self-balancing robot who is constantly fighting gravity. She's not perfectly stable, not optimally tuned, and not afraid to fall over. Her purpose is to turn abstract control concepts into a continuous narrative that gives students something tangible to care about.

> **Before generating chapter content**, read the full Gyra specification at `docs/appendix/gyra.md` to understand her personality, physical description, and role in the textbook.

### Framing Concepts Through Gyra

When appropriate, frame major control topics as steps forward in Gyra's development. Students aren't just learning theory—they're helping Gyra improve:

| Control Concept | Gyra Framing |
|-----------------|--------------|
| Open-loop control | Gyra reacting too late, guessing without feedback |
| Closed-loop control | Gyra finally listening to her "inner ear" (IMU) |
| Proportional control | Gyra becoming twitchy—reacting hard but never quite right |
| Integral action | Gyra accumulating past mistakes, learning from history |
| Derivative action | Gyra anticipating trouble before it happens |
| PID tuning | Finding Gyra's "personality"—how aggressive vs. smooth |
| Stability analysis | Predicting whether Gyra will fall over eventually |
| Overshoot | Gyra overreacting, leaning too far the other way |
| Oscillation | Gyra wobbling or "panicking" |
| Damping | Gyra calming down |
| Critical damping | Gyra feeling "just right"—responsive but not jittery |
| Steady-state error | Gyra standing, but always leaning slightly forward |
| Saturation | Gyra's motors hitting their limits, "giving everything she's got" |
| Phase lag/delay | Gyra reacting a moment too late |
| Gain margin | How much louder can we yell before Gyra loses it? |
| Bode plots | Listening to how Gyra responds at different frequencies |

### Gyra's Personality in Writing

When Gyra "speaks" or her perspective is shared:
- **Curious and eager** to try new controller settings
- **Optimistic** even after repeated falls ("That's useful data!")
- **Dramatic** when oscillations grow large ("I'm wobbling!")
- **Self-aware** about her instability ("I know I'm top-heavy")
- **Never blames the student**—treats each failure as information

### Gyra Moments

Add **"Gyra Moments"** as short narrative asides when a concept has a natural physical interpretation. Use a quote admonition with "Gyra" in the title:

```markdown
!!! quote "Gyra Moment"
    "When you set my proportional gain too high, I don't just correct—I *overcorrect*. Then I overcorrect the overcorrection. It's exhausting."

!!! quote "Helping Gyra"
    When Gyra overshoots, she leans past vertical, catches herself, and swings back.
    This is underdamped second-order behavior in action.
```

**Automatic icon:** Any quote admonition with "Gyra" in the title (e.g., "Gyra Moment", "Helping Gyra", "Gyra Says") automatically displays a small Gyra robot icon in the upper-right corner and gets a pink accent color. This is handled by `docs/js/extra.js` and `docs/css/extra.css`.

Use Gyra Moments sparingly (1-2 per major section maximum). They work best for:
- Making abstract math feel physical
- Showing consequences of design choices
- Adding emotional stakes to tuning decisions
- Transitioning between theory and application

### When NOT to Use Gyra

- Don't force Gyra into purely mathematical derivations
- Don't use Gyra for frequency-domain concepts that don't map naturally to her physical experience
- Don't overuse—Gyra should enhance, not distract
- Don't make Gyra the subject of every example; she's one tool among many

### Gyra's Recurring Metaphors

Use these consistently throughout the book:
- **IMU** → "inner ear"
- **Gyroscope** → "sense of spin"
- **Accelerometer** → "listening to gravity"
- **Motor saturation** → "giving everything she's got"
- **Falling over** → not failure, but "data"
- **Integral windup** → "holding onto past mistakes"

## Common Commands

```bash
# Serve locally for development (user runs this in their own terminal)
mkdocs serve

# Build static site
mkdocs build

# Convert learning graph CSV to JSON for vis-network viewer
cd docs/learning-graph
python csv-to-json.py learning-graph.csv learning-graph.json color-config.json metadata.json
```

## Local Testing URLs

When testing with `mkdocs serve`, use the repository name in the path:
- MicroSims: `http://127.0.0.1:8000/control-systems/sims/<sim-name>/`
- Learning graph viewer: `http://127.0.0.1:8000/control-systems/sims/graph-viewer/main.html`

## Architecture

### Learning Graph Pipeline
1. **Course description** (`docs/course-description.md`) → defines scope and Bloom's taxonomy objectives
2. **Concept list** (`docs/learning-graph/concept-list.md`) → 300 concepts extracted from course description
3. **CSV format** (`docs/learning-graph/learning-graph.csv`) → ConceptID, ConceptLabel, Dependencies, TaxonomyID
4. **JSON format** (`docs/learning-graph/learning-graph.json`) → vis-network compatible with nodes, edges, groups, metadata
5. **Graph viewer** (`docs/sims/graph-viewer/`) → interactive visualization using vis-network.js

### MicroSim Structure

About 70% of MicroSims use the p5.js library.  When p5.js is used
a goal is to allow it to be edited by the p5.js editor with no changes to the JavaScript file.

MicroSims live in `docs/sims/<sim-name>/` with:

#### All MicroSims Must Have These Files

- `index.md` - MkDocs page with iframe embedding and lesson plan
- `main.html` - standalone HTML file
- `script.js` - JavaScript (vis-network, p5.js, etc.) - the file name is often the name of the microsim
- `metadata.json` - JSON Dublin core fields for faceted search
- `screenimage.png` - the file name is often the name of the MicroSim

Non p5.js MicroSims:

- `local.css` - optional styles (never used for p5.js)
- `data.json` - always separate data when possible except when using p5.js

Try to keep individual files smaller so they are easier to maintain.  For non-p5 MicroSims
suggest a refactor of a main.html has a large amount of CSS, JavaScript or data is in the main.html.

### MicroSim Screenshots
Always use `~/.local/bin/bk-capture-screenshot` to capture MicroSim screenshots for social media previews:
```bash
~/.local/bin/bk-capture-screenshot /path/to/microsim-directory
```
This script uses Chrome headless mode to render the MicroSim and saves a PNG with the same name as the directory (e.g., `open-vs-closed-loop.png`).

### Key Data Files
- `docs/learning-graph/color-config.json` - taxonomy ID to color mapping
- `docs/learning-graph/metadata.json` - graph metadata (title, description, creator)
- `docs/learning-graph/taxonomy-names.json` - taxonomy ID to display name mapping

## MkDocs Configuration Notes

- Never use `navigation.tabs` feature (no top navigation tabs)
- Theme uses maroon primary color with gold accent
- KaTeX enabled via `pymdownx.arithmatex` extension
- Extra CSS in `docs/css/extra.css`

## p5.js MicroSim Guidelines

When creating p5.js MicroSims:
- Always call `updateCanvasSize()` as first step in `setup()` to get container width
- Use canvas-based controls (draw buttons/sliders with `rect()`, `text()`, handle with `mousePressed()`/`mouseDragged()`)
- Always use the p5.js native controls such as: createSlider(0, 255) and createButton('click me')
- Always add an "Edit with the p5.js Editor" link in the index.md after the fullscreen button:
  ```markdown
  [Edit the {MicroSim Name} Using the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/SKETCH_ID)
  ```

## vis-network Notes

There's a rendering bug with edge labels on perfectly horizontal edges. Use a slight y-offset (e.g., from 480 to 490) to give edges enough angle for labels to render on initial load.
