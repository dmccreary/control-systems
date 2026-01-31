# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an MkDocs Material intelligent textbook for a Control Systems college course. It features:
- Learning graphs with 300 concepts and dependency relationships
- Interactive MicroSims using vis-network.js for graph visualization
- KaTeX for LaTeX equation rendering
- Taxonomy-based concept classification

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
