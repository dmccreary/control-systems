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
MicroSims live in `docs/sims/<sim-name>/` with:
- `index.md` - MkDocs page with iframe embedding
- `main.html` - standalone HTML file
- `script.js` - JavaScript (vis-network, p5.js, etc.)
- `local.css` - optional styles

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
- Do NOT use p5.js DOM functions (`createButton()`, `createSlider()`, etc.) - they have iframe positioning issues

## vis-network Notes

There's a rendering bug with edge labels on perfectly horizontal edges. Use a slight y-offset (e.g., from 480 to 490) to give edges enough angle for labels to render on initial load.
