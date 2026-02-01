# Control Systems

[![MkDocs](https://img.shields.io/badge/Made%20with-MkDocs-526CFE?logo=materialformkdocs)](https://www.mkdocs.org/)
[![Material for MkDocs](https://img.shields.io/badge/Material%20for%20MkDocs-526CFE?logo=materialformkdocs)](https://squidfunk.github.io/mkdocs-material/)
[![GitHub Pages](https://img.shields.io/badge/View%20on-GitHub%20Pages-blue?logo=github)](https://dmccreary.github.io/control-systems)
[![GitHub](https://img.shields.io/badge/GitHub-dmccreary%2Fcontrol--systems-blue?logo=github)](https://github.com/dmccreary/control-systems)
[![Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code-DA7857?logo=anthropic)](https://claude.ai/code)
[![Claude Skills](https://img.shields.io/badge/Uses-Claude%20Skills-DA7857?logo=anthropic)](https://github.com/dmccreary/claude-skills)
[![p5.js](https://img.shields.io/badge/p5.js-ED225D?logo=p5.js&logoColor=white)](https://p5js.org/)
[![vis-timeline](https://img.shields.io/badge/vis--timeline-3E7FC1?logo=javascript&logoColor=white)](https://visjs.github.io/vis-timeline/)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

## View the Live Site

Visit the interactive textbook at: [https://dmccreary.github.io/control-systems](https://dmccreary.github.io/control-systems)

## Overview

This is an interactive, AI-generated intelligent textbook on **Control Systems** designed for upper-division undergraduate students in Electrical Engineering and related disciplines. Built using MkDocs with the Material theme, it incorporates learning graphs, concept dependencies, interactive MicroSims (p5.js and vis-timeline simulations), and AI-assisted content generation.

The textbook covers classical control theory using mathematically rigorous and conceptually stable techniques—from feedback fundamentals and Laplace transforms to Bode plots, root locus, Nyquist stability, and PID controller design. All content follows Bloom's Taxonomy (2001 revision) for learning outcomes and uses a 300-concept dependency graph to ensure proper prerequisite sequencing.

### Meet Gyra: Your (un)Balancing Robot Guide

![Gyra the balancing robot](docs/img/gyra.png)

Throughout this course, students take on the role of control engineers for **Gyra**—a small, two-wheeled, self-balancing robot who is constantly fighting gravity. She's not perfectly stable, not optimally tuned, and not afraid to fall over. Gyra transforms abstract control concepts into a continuous narrative, making math tangible and memorable. When you learn about proportional control, Gyra gets twitchy. When you add integral action, she finally eliminates that persistent lean. Gyra represents every real-world control system that needs the right controller to stay upright.

## Site Status and Metrics

| Metric | Count |
|--------|-------|
| Concepts in Learning Graph | 300 |
| Chapters | 16 |
| Markdown Files | 44 |
| Total Words | ~110,000 |
| Interactive MicroSims | 6 |
| Images | 20 |

**Completion Status:** Content generation phase (~75% complete)

### Interactive MicroSims

| MicroSim | Description |
|----------|-------------|
| Control System Examples | Open-loop vs closed-loop examples in everyday products |
| Feedback Loop Block Diagram | Interactive signal flow through a control system |
| Feedback Loop Simulator | Explore how gain K and time constant τ affect step response |
| Open-Loop vs Closed-Loop | Side-by-side disturbance rejection comparison |
| History of Control Systems | Timeline from ancient water clocks to AI-enhanced control |
| Learning Graph Viewer | Interactive 300-concept dependency visualization |

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/dmccreary/control-systems.git
cd control-systems
```

### Install Dependencies

This project uses MkDocs with the Material theme:

```bash
pip install mkdocs
pip install mkdocs-material
```

### Build and Serve Locally

Serve locally for development (with live reload):

```bash
mkdocs serve
```

Open your browser to `http://localhost:8000`

Build the static site:

```bash
mkdocs build
```

### Deploy to GitHub Pages

```bash
mkdocs gh-deploy
```

This will build the site and push it to the `gh-pages` branch.

## Repository Structure

```
control-systems/
├── docs/                          # MkDocs documentation source
│   ├── chapters/                  # 16 chapter directories
│   │   ├── 01-intro-to-control-systems/
│   │   │   └── index.md          # Chapter content with embedded MicroSims
│   │   └── ...
│   ├── sims/                      # Interactive MicroSims
│   │   ├── feedback-loop-simulator/
│   │   │   ├── main.html         # Standalone p5.js simulation
│   │   │   ├── *.js              # JavaScript code
│   │   │   └── index.md          # Documentation
│   │   ├── timeline/             # vis-timeline visualization
│   │   └── ...
│   ├── learning-graph/           # 300-concept dependency graph
│   │   ├── learning-graph.csv    # Concept dependencies
│   │   ├── learning-graph.json   # vis-network format
│   │   └── concept-list.md       # All concepts enumerated
│   ├── appendix/                 # Gyra specification, consumer products list
│   ├── img/                      # Images including Gyra mascot
│   └── css/, js/                 # Custom styles and KaTeX math rendering
├── mkdocs.yml                    # MkDocs configuration
├── CLAUDE.md                     # AI assistant instructions
└── README.md                     # This file
```

## Course Topics

1. **Introduction to Control Systems** - Feedback, open/closed-loop, system components
2. **Dynamic System Properties** - LTI systems, linearity, time-invariance
3. **Time-Domain Response** - Step response, impulse response, convolution
4. **Transient Response Specs** - Rise time, settling time, overshoot, damping
5. **Laplace Transform Methods** - Transfer functions, poles, zeros
6. **Poles, Zeros, and System Analysis** - Pole placement, system behavior
7. **Physical System Modeling** - Electrical, mechanical, electromechanical
8. **Linearization and Nonlinear Effects** - Operating point, saturation
9. **Block Diagrams and Signal Flow** - Reduction, Mason's gain formula
10. **Stability and Routh-Hurwitz** - BIBO stability, characteristic equation
11. **Root Locus Analysis** - Gain variation, controller design
12. **Frequency Response and Bode** - Magnitude, phase, bandwidth
13. **Nyquist and Stability Margins** - Gain margin, phase margin
14. **Steady-State Error Analysis** - System type, error constants
15. **PID Control and Tuning** - P, I, D action, Ziegler-Nichols
16. **Compensator Design** - Lead, lag, lead-lag compensation

## Reporting Issues

Found a bug, typo, or have a suggestion for improvement? Please report it:

[GitHub Issues](https://github.com/dmccreary/control-systems/issues)

When reporting issues, please include:

- Description of the problem or suggestion
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser/environment details (for MicroSims)

## License

This work is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

**You are free to:**

- **Share** — copy and redistribute the material
- **Adapt** — remix, transform, and build upon the material

**Under the following terms:**

- **Attribution** — Give appropriate credit with a link to the original
- **NonCommercial** — No commercial use without permission
- **ShareAlike** — Distribute contributions under the same license

See [LICENSE.md](docs/license.md) for full details.

## Acknowledgements

This project is built on the shoulders of giants in the open source community:

- **[MkDocs](https://www.mkdocs.org/)** - Static site generator optimized for project documentation
- **[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)** - Beautiful, responsive theme
- **[p5.js](https://p5js.org/)** - Creative coding library for interactive MicroSims
- **[vis-timeline](https://visjs.github.io/vis-timeline/)** - Interactive timeline visualizations
- **[vis-network](https://visjs.org/)** - Network visualization for learning graphs
- **[KaTeX](https://katex.org/)** - Fast math typesetting for LaTeX equations
- **[Claude AI](https://claude.ai)** by Anthropic - AI-assisted content generation
- **[GitHub Pages](https://pages.github.com/)** - Free hosting for open source projects

Special thanks to the control systems educators whose textbooks and courses have shaped this field, including Norman Nise, Gene Franklin, and Katsuhiko Ogata.

## Contact

**Dan McCreary**

- LinkedIn: [linkedin.com/in/danmccreary](https://www.linkedin.com/in/danmccreary/)
- GitHub: [@dmccreary](https://github.com/dmccreary)

Questions, suggestions, or collaboration opportunities? Feel free to connect on LinkedIn or open an issue on GitHub.
