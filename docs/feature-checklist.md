# Intelligent Textbook Feature Checklist

This checklist helps authors and product managers understand what features are available in the MkDocs Material intelligent textbook ecosystem. Our focus is building the best
possible level 2+ textbook with many interactive features that could be used to gather student activity events.  For each feature, you'll see whether it's implemented in this book and how much effort it takes to add.

!!! note
    A level 2+ textbook is one that has rich interactivity but does not store any
    personal student data.  A level 2+ textbook can be converted to a level 3
    textbook by sending event data to a learning record store (LRS) to create
    a hyper-personalized learning experience for each student.  The five levels
    of intelligent textbooks are describe in the [Intelligent Textbooks](https://dmccreary.github.io/intelligent-textbooks/) course.


An full **intelligent textbook** goes beyond static text to include interactive simulations, personalized learning paths, auto-graded quizzes, and AI-generated content. This checklist tracks which of these capabilities are present in the Control Systems course for a level 2+ textbook.

**Legend:**

- :white_check_mark: Feature is implemented and working
- :x: Feature is not yet implemented
- :construction: Feature is partially implemented

## Effort Levels

| Level | Description | Human Time | With GenAI | With GenAI Skills |
|-------|-------------|--------------|------------|-------------------|
| **Trivial** | Config change or copy template | Minutes | Seconds | Seconds |
| **Low** | Single file creation with standard content | Hours | Minutes | Seconds |
| **Medium** | Multiple files, some customization needed | Day | Hours | Minutes |
| **High** | Significant content generation or custom code | Days | Hours | Minutes |
| **Very High** | Complex integration, AI generation, or external tools | Week+ | Day | Hours |

---

## Basic Features

These features come by default with MkDocs Material or require minimal configuration. MkDocs is a static site generator that turns Markdown files into a polished website, and Material is a popular theme that provides modern styling and many built-in features.

| Feature | Status | Effort | Notes |
|---------|--------|--------|-------|
| Navigation sidebar | :white_check_mark: | Trivial | Left-side menu showing all chapters and sections |
| Search functionality | :white_check_mark: | Trivial | Instant search across all pages as you type |
| Table of contents (per page) | :white_check_mark: | Trivial | Right-side outline of headings on current page |
| Site title and description | :white_check_mark: | Trivial | In `mkdocs.yml` |
| Site author metadata | :white_check_mark: | Trivial | In `mkdocs.yml` |
| GitHub repository link | :white_check_mark: | Trivial | `repo_url` configured |
| Custom logo | :white_check_mark: | Trivial | Gyra robot logo |
| Custom favicon | :white_check_mark: | Trivial | Custom icon |
| Color theme (primary/accent) | :white_check_mark: | Trivial | Maroon/gold |
| Footer navigation (prev/next) | :white_check_mark: | Trivial | Previous/Next chapter links at bottom of each page |
| Navigation expand on hover | :white_check_mark: | Trivial | Sidebar sections expand when you hover over them |
| Back to top button | :white_check_mark: | Trivial | Floating button to scroll back to page top |
| Navigation path breadcrumbs | :white_check_mark: | Trivial | Shows path like "Home > Chapter 3 > Feedback" |
| Section index pages | :white_check_mark: | Trivial | Each folder can have its own landing page |
| License page | :white_check_mark: | Low | Standard CC license template |
| Contact page | :white_check_mark: | Low | Contact form or info |
| About page (detailed) | :white_check_mark: | Low | Exists but minimal content |
| How We Built This Site | :white_check_mark: | Medium | Describe tools and process |
| Copyright on every footer | :white_check_mark: | Trivial | CC BY-NC-SA 4.0 |

---

## Intermediate Features

These features require plugins, extensions, or moderate configuration. Plugins are add-ons that extend MkDocs functionality, while extensions enhance Markdown with special syntax for things like math equations and callout boxes.

### Content Enhancement

These features make your content more engaging and easier to read.

| Feature | Status | Effort | Notes |
|---------|--------|--------|-------|
| GLightBox (image zoom) | :white_check_mark: | Low | Click any image for lightbox popup; requires `mkdocs-glightbox` Python library and 11 lines in mkdocs.yml |
| KaTeX equation rendering | :white_check_mark: | Low | Display beautiful math equations like $e^{i\pi} + 1 = 0$ |
| Admonitions (callout boxes) | :white_check_mark: | Trivial | Colored boxes for notes, warnings, tips, and examples |
| Code blocks with copy button | :white_check_mark: | Trivial | One-click copy for all code examples |
| Syntax highlighting with line numbers | :white_check_mark: | Trivial | Code colored by language (Python, JavaScript, etc.) |
| Tabbed content blocks | :white_check_mark: | Trivial | Switch between versions (e.g., Python vs. pseudocode) |
| Task list checkboxes | :white_check_mark: | Trivial | Interactive checklists like [ ] and [x] |
| Mark/highlight text | :white_check_mark: | Trivial | Use `==text==` syntax to highlight important phrases in yellow |
| Strikethrough text | :white_check_mark: | Trivial | Use `~~text~~` syntax to cross out deprecated or incorrect info |
| Magic links (auto-linking) | :white_check_mark: | Trivial | URLs and emails automatically become clickable |
| Snippets (file includes) | :white_check_mark: | Trivial | Use `--8<-- "file.md"` syntax to include content from other files |
| Emoji support | :white_check_mark: | Trivial | Use :emoji_name: shortcodes like :rocket: |
| Collapsible details blocks | :white_check_mark: | Trivial | Hide/show content with expandable sections |

### Site-Wide Resources

These are pages and files that support the entire textbook rather than individual chapters.

| Feature | Status | Effort | Notes |
|---------|--------|--------|-------|
| Glossary | :x: | Medium | Searchable definitions (~300 terms) following ISO 11179 metadata standards for precise, non-circular definitions |
| FAQ page | :x: | Medium | Answers to common student questions (~50-100 Q&As) |
| References page | :x: | Medium | Curated bibliography with links per chapter or site-wide |
| Custom CSS styling | :white_check_mark: | Low | Override theme colors, fonts, and layouts |
| Custom JavaScript | :white_check_mark: | Low | Add interactivity beyond built-in features |
| Google Analytics | :white_check_mark: | Trivial | Track page views and user behavior |

### Publishing Features

These features help your textbook look professional when shared on social media or contributed to by others.

| Feature | Status | Effort | Notes |
|---------|--------|--------|-------|
| Social media preview cards | :x: | Medium | Auto-generated images shown when sharing links on Twitter/LinkedIn/Facebook |
| Edit page button | :x: | Trivial | "Edit this page" link to GitHub for community contributions |
| Social override plugin | :x: | Medium | Custom preview images for specific pages instead of auto-generated |
| Exclude template files | :x: | Low | Prevent draft or template files from appearing in published site |

---

## Advanced Features

These features require significant effort, custom code, or AI assistance. They're what transform a static textbook into an interactive learning experience.

### Interactive Learning

MicroSims are small, browser-based simulations that let students experiment with concepts by adjusting parameters and seeing results in real-time—no software installation required.

| Feature | Status | Effort | Notes |
|---------|--------|--------|-------|
| MicroSims (interactive simulations) | :white_check_mark: | High | Browser-based apps for hands-on learning (6 created) |
| MicroSim index catalog | :white_check_mark: | Medium | Visual gallery with cards showing all available simulations |
| Per-chapter quizzes | :white_check_mark: | High | 10 questions per chapter aligned to learning objectives |
| Interactive diagrams | :construction: | High | Clickable/draggable visuals (some embedded in MicroSims) |

### Learning Graph System

A learning graph maps every concept in the course and shows which concepts depend on others. This helps students understand prerequisites and helps authors ensure topics are taught in the right order. Bloom's Taxonomy classifies learning objectives from basic recall to creative application.

| Feature | Status | Effort | Notes |
|---------|--------|--------|-------|
| Course description | :white_check_mark: | Medium | Goals and outcomes using Bloom's Taxonomy levels |
| Course description assessment | :white_check_mark: | Low | Automated quality check of course description completeness |
| Concept list (~200-300 concepts) | :white_check_mark: | High | Every topic students need to learn, extracted with AI help |
| Learning graph CSV | :white_check_mark: | High | Spreadsheet defining which concepts depend on others |
| Learning graph JSON | :white_check_mark: | Low | Machine-readable format for the graph viewer |
| Learning graph viewer (vis-network) | :white_check_mark: | Medium | Interactive diagram where you can click and explore concepts |
| Concept taxonomy classification | :white_check_mark: | Medium | Grouping concepts into 8 categories (Foundations, Math, etc.) |
| Taxonomy distribution analysis | :white_check_mark: | Low | Charts showing balance across concept categories |
| Quality metrics report | :white_check_mark: | Low | Statistics about graph completeness and structure |
| Book metrics | :x: | Medium | Word counts, reading time, and chapter statistics |
| Chapter metrics | :x: | Medium | Detailed stats for each chapter individually |
| Diagram table report | :x: | Medium | Inventory of all figures and diagrams in the book |
| Diagram details report | :x: | Medium | Metadata for each diagram (Bloom level, complexity) |
| Glossary quality report | :x: | Low | Check definitions follow standards (requires glossary) |
| FAQ quality report | :x: | Low | Check FAQ completeness (requires FAQ) |
| FAQ coverage gaps | :x: | Low | Find concepts not addressed in FAQ |

### Content Generation

These features involve creating the actual educational content, often with AI assistance to speed up the process while maintaining quality.

| Feature | Status | Effort | Notes |
|---------|--------|--------|-------|
| Chapter content (16 chapters) | :white_check_mark: | Very High | Full chapter text, examples, and exercises |
| Per-chapter references | :x: | Medium | 10 curated links to Wikipedia, textbooks, and papers per chapter |
| Stories/graphic novels | :construction: | Very High | Illustrated narratives about scientists and discoveries |
| Instructor's guide | :x: | High | Lesson plans, discussion questions, and teaching tips |
| AI-generated infographics | :x: | Very High | Visual diagrams created by DALL-E or ImageFX (**requires paid license**) |
| Complex image generation | :x: | Very High | Detailed technical illustrations (**$20+/month license**) |
| Sample prompts collection | :white_check_mark: | Medium | Saved AI prompts so content can be regenerated consistently |

### Course Mascot (Gyra)

A course mascot gives students a relatable character to follow throughout the book. Gyra is a self-balancing robot who demonstrates control concepts through her own struggles with stability.

| Feature | Status | Effort | Notes |
|---------|--------|--------|-------|
| Mascot specification | :white_check_mark: | Medium | Detailed personality and appearance guide |
| Mascot logo/images | :white_check_mark: | Medium | Custom robot artwork used in header and callouts |
| Gyra Moments (narrative asides) | :construction: | Low | Short quotes where Gyra explains concepts from her perspective |
| Gyra custom admonition CSS | :white_check_mark: | Low | Special pink callout boxes with Gyra icon |

---

## Feature Dependencies

Some features require others to be implemented first. This diagram shows the order—you can't create quizzes until you have chapter content, and you can't have chapter content until you've defined the concepts in the learning graph.

```
Course Description
    └── Concept List
        └── Learning Graph (CSV)
            ├── Learning Graph (JSON)
            │   └── Graph Viewer
            ├── Glossary
            │   └── Glossary Quality Report
            ├── FAQ
            │   ├── FAQ Quality Report
            │   └── FAQ Coverage Gaps
            └── Chapter Content
                ├── Per-Chapter Quizzes
                ├── Per-Chapter References
                ├── Diagram Reports
                └── Book/Chapter Metrics
```

---

## Cost Considerations

Most intelligent textbook features use free, open-source software. The main costs are AI services for generating content and images.

| Feature Category | License Cost | Notes |
|------------------|--------------|-------|
| MkDocs Material | Free (MIT) | Static site generator and theme |
| Python dependencies | Free | Pillow and CairoSVG for auto-generating social preview images |
| vis-network.js | Free (MIT) | JavaScript library for interactive graph diagrams |
| p5.js | Free (LGPL) | JavaScript library for creative coding and simulations |
| KaTeX | Free (MIT) | Fast math equation rendering in the browser |
| AI image generation | **$20+/month** | Required for creating infographics with DALL-E or ImageFX |
| Claude/ChatGPT for content | Varies | Used to draft chapters, quizzes, and glossary entries |

---

## Quick Start: Adding Missing Features

If you're new to this project, start with the easiest wins and work your way up. The features below are prioritized by effort-to-impact ratio.

### Highest Impact, Lowest Effort

These can be done in under an hour:

1. **License page** - Copy the standard Creative Commons template so readers know how they can reuse content
2. **Contact page** - Add author email or feedback form for questions
3. **Edit page button** - One line in `mkdocs.yml` enables "Suggest an edit" links to GitHub
4. **Social media cards** - Auto-generate preview images when your book is shared on social media

### Medium Effort, High Value

These use Claude Code skills to generate content in a few hours:

1. **Glossary** - Use the glossary-generator skill to create ~300 searchable definitions
2. **FAQ** - Use the faq-generator skill to answer ~50-100 common student questions
3. **Book metrics** - Use the book-metrics-generator skill to track word counts and completeness
4. **Per-chapter quizzes** - Use the quiz-generator skill for auto-graded practice questions

### High Effort, Transformative

These take days but significantly enhance the learning experience:

1. **Additional MicroSims** - Each simulation takes 2-4 hours; aim for 10-20 total
2. **AI-generated infographics** - Requires paid DALL-E or ImageFX subscription
3. **Stories/graphic novels** - Illustrated narratives about scientists bring history alive
4. **Instructor's guide** - Helps teachers adopt your textbook with ready-made lesson plans

---

## Comparison with Other Books

See how this textbook's features compare to other intelligent textbooks. This helps identify gaps and opportunities—for example, the Geometry course has over 100 MicroSims while this course has only 6.

| Feature | Control Systems | Geometry | Signal Processing | Systems Thinking |
|---------|-----------------|----------|-------------------|------------------|
| Chapters | 16 | 12 | 15 | 14 |
| MicroSims | 6 | 100+ | 30+ | 15+ |
| Glossary | :x: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| FAQ | :x: | :white_check_mark: | :white_check_mark: | :x: |
| Quizzes | :x: | :x: | :white_check_mark: | :x: |
| Social cards | :x: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Stories | :construction: | :x: | :white_check_mark: | :white_check_mark: |
| Learning graph | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: |
| KaTeX/MathJax | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: |
| GLightBox | :white_check_mark: | :x: | :x: | :x: |

---

*Last updated: February 2026*
