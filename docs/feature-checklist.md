# Intelligent Textbook Feature Checklist

This checklist helps Book Feature Product Managers understand what features are available in the MkDocs Material intelligent textbook ecosystem, their implementation status in this book, and the relative effort required to add each feature.

**Legend:**

- :white_check_mark: Feature is implemented and working
- :x: Feature is not yet implemented
- :construction: Feature is partially implemented

## Effort Levels

| Level | Description | Typical Time |
|-------|-------------|--------------|
| **Trivial** | Config change or copy template | Minutes |
| **Low** | Single file creation with standard content | Hours |
| **Medium** | Multiple files, some customization needed | Day |
| **High** | Significant content generation or custom code | Days |
| **Very High** | Complex integration, AI generation, or external tools | Week+ |

---

## Basic Features

These features come by default with MkDocs Material or require minimal configuration.

| Feature | Status | Effort | Notes |
|---------|--------|--------|-------|
| Navigation sidebar | :white_check_mark: | Trivial | Default in Material theme |
| Search functionality | :white_check_mark: | Trivial | Built-in plugin |
| Table of contents (per page) | :white_check_mark: | Trivial | `toc.follow` enabled |
| Site title and description | :white_check_mark: | Trivial | In `mkdocs.yml` |
| Site author metadata | :white_check_mark: | Trivial | In `mkdocs.yml` |
| GitHub repository link | :white_check_mark: | Trivial | `repo_url` configured |
| Custom logo | :white_check_mark: | Trivial | Gyra robot logo |
| Custom favicon | :white_check_mark: | Trivial | Custom icon |
| Color theme (primary/accent) | :white_check_mark: | Trivial | Maroon/gold |
| Footer navigation (prev/next) | :white_check_mark: | Trivial | `navigation.footer` enabled |
| Navigation expand on hover | :white_check_mark: | Trivial | `navigation.expand` enabled |
| Back to top button | :white_check_mark: | Trivial | `navigation.top` enabled |
| Navigation path breadcrumbs | :white_check_mark: | Trivial | `navigation.path` enabled |
| Section index pages | :white_check_mark: | Trivial | `navigation.indexes` enabled |
| License page | :x: | Low | Standard CC license template |
| Contact page | :x: | Low | Contact form or info |
| About page (detailed) | :construction: | Low | Exists but minimal content |
| How We Built This Site | :x: | Medium | Describe tools and process |
| Copyright footer | :white_check_mark: | Trivial | CC BY-NC-SA 4.0 |

---

## Intermediate Features

These features require plugins, extensions, or moderate configuration.

### Content Enhancement

| Feature | Status | Effort | Notes |
|---------|--------|--------|-------|
| GLightBox (image zoom) | :white_check_mark: | Low | Plugin configured |
| KaTeX equation rendering | :white_check_mark: | Low | `arithmatex` extension |
| Admonitions (callout boxes) | :white_check_mark: | Trivial | Standard extension |
| Code blocks with copy button | :white_check_mark: | Trivial | `content.code.copy` |
| Syntax highlighting with line numbers | :white_check_mark: | Trivial | `pymdownx.highlight` |
| Tabbed content blocks | :white_check_mark: | Trivial | `pymdownx.tabbed` |
| Task list checkboxes | :white_check_mark: | Trivial | `pymdownx.tasklist` |
| Mark/highlight text | :white_check_mark: | Trivial | `pymdownx.mark` |
| Strikethrough text | :white_check_mark: | Trivial | `pymdownx.tilde` |
| Magic links (auto-linking) | :white_check_mark: | Trivial | `pymdownx.magiclink` |
| Snippets (file includes) | :white_check_mark: | Trivial | `pymdownx.snippets` |
| Emoji support | :white_check_mark: | Trivial | `pymdownx.emoji` |
| Collapsible details blocks | :white_check_mark: | Trivial | `pymdownx.details` |

### Site-Wide Resources

| Feature | Status | Effort | Notes |
|---------|--------|--------|-------|
| Glossary | :x: | Medium | ~300 terms, ISO 11179 format |
| FAQ page | :x: | Medium | ~50-100 questions |
| References page | :x: | Medium | Per-chapter or site-wide |
| Custom CSS styling | :white_check_mark: | Low | `extra.css` exists |
| Custom JavaScript | :white_check_mark: | Low | `extra.js` exists |
| Google Analytics | :white_check_mark: | Trivial | Property configured |

### Publishing Features

| Feature | Status | Effort | Notes |
|---------|--------|--------|-------|
| Social media preview cards | :x: | Medium | Requires `social` plugin + Pillow |
| Edit page button | :x: | Trivial | Add `content.action.edit` |
| Social override plugin | :x: | Medium | Custom social images per page |
| Exclude template files | :x: | Low | Add `exclude` plugin |

---

## Advanced Features

These features require significant effort, custom code, or AI assistance.

### Interactive Learning

| Feature | Status | Effort | Notes |
|---------|--------|--------|-------|
| MicroSims (interactive simulations) | :white_check_mark: | High | 6 MicroSims created |
| MicroSim index catalog | :white_check_mark: | Medium | Card grid gallery |
| Per-chapter quizzes | :x: | High | Multiple choice, concept-aligned |
| Interactive diagrams | :construction: | High | Some in MicroSims |

### Learning Graph System

| Feature | Status | Effort | Notes |
|---------|--------|--------|-------|
| Course description | :white_check_mark: | Medium | Bloom's taxonomy outcomes |
| Course description assessment | :white_check_mark: | Low | Quality analysis |
| Concept list (~200-300 concepts) | :white_check_mark: | High | AI-assisted extraction |
| Learning graph CSV | :white_check_mark: | High | Dependencies defined |
| Learning graph JSON | :white_check_mark: | Low | Generated from CSV |
| Learning graph viewer (vis-network) | :white_check_mark: | Medium | Interactive visualization |
| Concept taxonomy classification | :white_check_mark: | Medium | 8 taxonomy categories |
| Taxonomy distribution analysis | :white_check_mark: | Low | Charts and statistics |
| Quality metrics report | :white_check_mark: | Low | Graph analysis |
| Book metrics | :x: | Medium | Word counts, chapter stats |
| Chapter metrics | :x: | Medium | Per-chapter breakdowns |
| Diagram table report | :x: | Medium | All diagrams listed |
| Diagram details report | :x: | Medium | Detailed diagram info |
| Glossary quality report | :x: | Low | Requires glossary first |
| FAQ quality report | :x: | Low | Requires FAQ first |
| FAQ coverage gaps | :x: | Low | Concept coverage analysis |

### Content Generation

| Feature | Status | Effort | Notes |
|---------|--------|--------|-------|
| Chapter content (16 chapters) | :white_check_mark: | Very High | AI-assisted generation |
| Per-chapter references | :x: | Medium | 10 refs per chapter |
| Stories/graphic novels | :construction: | Very High | Historical narratives |
| Instructor's guide | :x: | High | Teaching resources |
| AI-generated infographics | :x: | Very High | **Requires separate license** (OpenAI DALL-E or Google ImageFX) |
| Complex image generation | :x: | Very High | **$20+/month license cost** |
| Sample prompts collection | :white_check_mark: | Medium | Reproducibility |

### Course Mascot (Gyra)

| Feature | Status | Effort | Notes |
|---------|--------|--------|-------|
| Mascot specification | :white_check_mark: | Medium | Character guide in appendix |
| Mascot logo/images | :white_check_mark: | Medium | Custom artwork |
| Gyra Moments (narrative asides) | :construction: | Low | Admonition styling exists |
| Gyra custom admonition CSS | :white_check_mark: | Low | Pink accent, icon |

---

## Feature Dependencies

Some features require others to be implemented first:

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

| Feature Category | License Cost | Notes |
|------------------|--------------|-------|
| MkDocs Material | Free (MIT) | Core framework |
| Python dependencies | Free | Pillow, CairoSVG for social cards |
| vis-network.js | Free (MIT) | Learning graph viewer |
| p5.js | Free (LGPL) | MicroSim framework |
| KaTeX | Free (MIT) | Equation rendering |
| AI image generation | **$20+/month** | OpenAI DALL-E or Google Nano/ImageFX |
| Claude/ChatGPT for content | Varies | Content generation assistance |

---

## Quick Start: Adding Missing Features

### Highest Impact, Lowest Effort

1. **License page** - Copy standard CC template
2. **Contact page** - Simple contact info
3. **Edit page button** - Add one line to `mkdocs.yml`
4. **Social media cards** - Enable `social` plugin

### Medium Effort, High Value

1. **Glossary** - Use glossary-generator skill (~300 terms)
2. **FAQ** - Use faq-generator skill (~50-100 questions)
3. **Book metrics** - Use book-metrics-generator skill
4. **Per-chapter quizzes** - Use quiz-generator skill

### High Effort, Transformative

1. **Additional MicroSims** - 10-20 more simulations
2. **AI-generated infographics** - Requires external license
3. **Stories/graphic novels** - Historical scientist narratives
4. **Instructor's guide** - Complete teaching resource

---

## Comparison with Other Books

Based on analysis of other intelligent textbooks in the workspace:

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
