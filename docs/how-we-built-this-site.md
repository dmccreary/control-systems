# How We Built This Site

This intelligent textbook was created in approximately **two days** using Claude Code with custom [skills](https://dmccreary.github.io/claude-skills/) designed specifically for generating educational content. This page documents our process, tools, and lessons learned.

## Timeline

Based on our git commit history, here's how the project evolved:

### Day 1: January 31, 2026 — Foundation and Content

| Time Block | Activity |
|------------|----------|
| Morning | Created learning graph with 300 concepts and the vis-network viewer |
| Late Morning | Established chapter structure and added detailed tone guide to CLAUDE.md |
| Midday | Created Gyra, our self-balancing robot mascot, with personality specification |
| Afternoon | Generated chapters 1-9 content using the chapter-content-generator skill |
| Evening | Completed chapters 10-16, finishing all core educational content |

### Day 2: February 1, 2026 — Interactive Features and Polish

| Time Block | Activity |
|------------|----------|
| Morning | Created MicroSims including the "Control Systems in Daily Life" simulation |
| Midday | Built the MicroSim index catalog and added disturbance rejection simulations |
| Afternoon | Added GLightbox for image zoom, generated glossary and FAQ |
| Evening | Created feature checklist, updated README, final polish |

## Tools and Skills Used

### Claude Code Skills

We used several custom skills from the intelligent textbook ecosystem:

| Skill | Purpose | Time Saved |
|-------|---------|------------|
| **learning-graph-generator** | Created 300 concepts with dependencies | Hours → Minutes |
| **book-chapter-generator** | Designed optimal chapter structure | Hours → Minutes |
| **chapter-content-generator** | Generated 16 chapters of educational content | Weeks → Hours |
| **glossary-generator** | Created ~300 searchable definitions | Days → Minutes |
| **faq-generator** | Generated ~50-100 common student Q&As | Days → Minutes |
| **microsim-generator** | Created interactive browser-based simulations | Hours → Minutes each |
| **book-metrics-generator** | Tracked word counts and completeness | Hours → Seconds |

### Cover Image Generation

The skill for generating cover images and social media preview cards was particularly helpful. Having a consistent visual identity across the site—from the Gyra mascot to chapter headers—would have taken a designer days to produce manually.

### Supporting Scripts Library

To minimize token usage and maximize efficiency, we developed a library of shell scripts and Python programs that handle repetitive tasks outside of Claude:

```
~/.local/bin/
├── bk-capture-screenshot    # Capture MicroSim screenshots with headless Chrome
├── csv-to-json.py           # Convert learning graph CSV to vis-network JSON
└── ... (other utilities)
```

These scripts handle tasks like:

- **Screenshot capture**: Headless Chrome rendering of MicroSims for social cards
- **Format conversion**: CSV to JSON for the learning graph viewer
- **File organization**: Batch renaming and directory structure management
- **Validation**: Checking file formats and link integrity

By offloading these mechanical tasks to scripts, Claude can focus on creative work like writing explanations and designing interactions.

## Token Efficiency: A Design Goal

### The Cost Reality

We developed this textbook using Anthropic's **Max plan** (currently around $100/month), 
which provides generous token limits for intensive development work. 
However, a key design goal is making textbook creation accessible 
to educators on the **Pro plan** ($20/month).

### Strategies for Token Efficiency

1. **Reusable Skills**: Each skill encapsulates best practices, so Claude doesn't need to figure out formatting and structure from scratch each time.

2. **CLAUDE.md Context**: Project-specific instructions in CLAUDE.md mean Claude understands conventions without lengthy explanations in each prompt.

3. **External Scripts**: Python and shell scripts handle data transformation, so tokens aren't spent on routine file manipulation.

4. **Incremental Generation**: Generate one chapter at a time rather than attempting the whole book in one session.

5. **Template Reuse**: MicroSim templates mean each new simulation builds on proven patterns.

### Estimated Token Usage

| Task | Approximate Tokens |
|------|-------------------|
| Learning graph (300 concepts) | ~50K |
| Chapter structure design | ~20K |
| Each chapter (~3,000 words) | ~15K |
| Each MicroSim | ~10K |
| Glossary (~300 terms) | ~30K |
| FAQ (~100 questions) | ~25K |
| **Total for complete textbook** | **~400K-500K** |

With careful prompting and skill usage, a complete intelligent textbook can be generated within the Pro plan's monthly limits, though it may require spreading work across several weeks.

## Reproducibility

All prompts used to generate this content are saved in the `prompts/` directory. This means:

- Content can be regenerated if improvements are needed
- Other educators can adapt our prompts for their subjects
- The generation process is transparent and auditable

## Lessons Learned

### What Worked Well

- **Starting with the learning graph**: Defining all concepts and dependencies first created a solid foundation for everything else
- **Gyra as narrative anchor**: Having a mascot gave abstract concepts a relatable physical interpretation
- **MicroSims for intuition**: Interactive simulations convey understanding that static text cannot
- **Conversational tone**: Students engage more with friendly, accessible writing

### What We'd Do Differently

- **More MicroSims earlier**: We have 6 simulations but aim for 20+; starting MicroSim development on Day 1 would have been better
- **Per-chapter references from the start**: Adding curated references during chapter generation is more efficient than retrofitting
- **Quiz generation alongside content**: Writing quizzes while the chapter content is fresh reduces context-switching

## Try It Yourself

If you want to create your own intelligent textbook:

1. Start with a clear **course description** including learning objectives
2. Use the **learning-graph-generator** skill to map concepts
3. Use **book-chapter-generator** to design structure
4. Generate chapters with **chapter-content-generator**
5. Add interactivity with **microsim-generator**
6. Polish with glossary, FAQ, and quizzes

The entire process can be completed in a weekend for a motivated author with domain expertise.

!!! Note
    This page itself was generated using Claude Code on February 1, 2026 by scanning the
    [log files](https://github.com/dmccreary/control-systems/tree/main/logs) 
    in the GitHub repository.  Hooks have also been used to track both time and token usage.
