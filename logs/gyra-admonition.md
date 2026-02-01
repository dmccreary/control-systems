# Session Log: Gyra Admonition Icon

**Date:** 2026-01-31
**Project:** Control Systems Intelligent Textbook
**Purpose:** Add custom Gyra robot icon to quote admonitions containing "Gyra" in the title

---

## User Prompt #1

> Add some custom JavaScript to @docs/js/extra.js that will place a small icon of our mascot "Gyra" in the upper right corner of admonitions with the line '!!! quote "Gyra Moment"' If you need special markup to do this efficiently such as a `<div class="gyra-moment">` that is fine.

### Action Taken

#### JavaScript Addition (`docs/js/extra.js`)

Added detection code that finds any quote admonition with "Gyra" in the title and adds a `gyra-moment` class:

```javascript
// Find all quote admonitions with "Gyra" in the title (Gyra Moment, Helping Gyra, etc.)
document.querySelectorAll(".admonition.quote").forEach((admonition) => {
    const title = admonition.querySelector(".admonition-title");
    if (title && title.textContent.toLowerCase().includes("gyra")) {
        admonition.classList.add("gyra-moment");
    }
});
```

#### CSS Addition (`docs/css/extra.css`)

Added styling for the `gyra-moment` class:

```css
/* Gyra Moment admonitions - robot mascot icon */
.admonition.gyra-moment {
  position: relative;
  border-left-color: #e91e63 !important; /* Pink accent for Gyra */
}

.admonition.gyra-moment > .admonition-title {
  background-color: rgba(233, 30, 99, 0.1) !important;
}

.admonition.gyra-moment::after {
  content: "";
  position: absolute;
  top: 3px;
  right: 12px;
  width: 32px;
  height: 32px;
  background-image: url("data:image/svg+xml,..."); /* Inline SVG of Gyra */
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0.85;
}

/* Adjust icon position for smaller screens */
@media (max-width: 600px) {
  .admonition.gyra-moment::after {
    width: 24px;
    height: 24px;
    top: 1px;
    right: 8px;
  }
}
```

#### SVG Icon Design

Created an inline SVG showing Gyra as a two-wheeled balancing robot:
- Two gray wheels with axle
- Pink body (#e91e63) tilted 3° to show instability
- White face plate with cyan eyes
- Antenna with cyan tip
- Matches Gyra's description in `docs/appendix/gyra.md`

#### CLAUDE.md Updated

Added documentation about the automatic icon feature:

```markdown
**Automatic icon:** Any quote admonition with "Gyra" in the title (e.g., "Gyra Moment",
"Helping Gyra", "Gyra Says") automatically displays a small Gyra robot icon in the
upper-right corner and gets a pink accent color. This is handled by `docs/js/extra.js`
and `docs/css/extra.css`.
```

---

## User Prompt #2

> very nice! just move the icon up 5px

### Action Taken

Updated CSS positioning:
- Desktop: `top: 8px` → `top: 3px`
- Mobile: `top: 6px` → `top: 1px`

---

## Files Modified

| File | Changes |
|------|---------|
| `docs/js/extra.js` | Added Gyra admonition detection (~8 lines) |
| `docs/css/extra.css` | Added Gyra styling with SVG icon (~35 lines) |
| `CLAUDE.md` | Documented automatic icon feature |

---

## How It Works

1. **Page loads** → JavaScript runs
2. **JavaScript scans** all `.admonition.quote` elements
3. **If title contains "gyra"** (case-insensitive) → adds `gyra-moment` class
4. **CSS displays** pink accent + robot icon via `::after` pseudo-element

## Supported Formats

All of these will get the Gyra icon automatically:

```markdown
!!! quote "Gyra Moment"
    Content here...

!!! quote "Helping Gyra"
    Content here...

!!! quote "Gyra Says"
    Content here...
```

---

## Design Decisions

1. **Detection method:** Check title text content rather than requiring special markup
2. **Icon placement:** Upper-right corner using `::after` pseudo-element
3. **Icon format:** Inline SVG in CSS (no external image file needed)
4. **Color scheme:** Pink (#e91e63) matches Gyra's body color from appendix
5. **Robot design:** Tilted 3° to convey Gyra's inherent instability
6. **Responsive:** Smaller icon on mobile screens

---

## Session Complete

Gyra icon now appears automatically on all quote admonitions with "Gyra" in the title throughout the textbook.
