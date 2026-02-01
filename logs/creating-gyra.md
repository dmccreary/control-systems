# Session Log: Integrating Gyra as Narrative Anchor

**Date:** 2026-01-31
**Project:** Control Systems Intelligent Textbook
**Purpose:** Add Gyra (the balancing robot mascot) as a narrative anchor throughout the textbook

---

## Session Overview

This session added Gyra references to the CLAUDE.md guidelines and integrated "Helping Gyra" moments into Chapters 2 and 3. Gyra serves as a narrative anchor that transforms abstract control concepts into tangible experiences students can care about.

---

## User Prompt #1

> I have decided that we need to make this textbook more fun. We have introduced our "mascot" character named "Gyra". She is described here: @docs/appendix/gyra.md. Please add a new section in the CLAUDE.md file that helps us generate text that will serve as a "Narrative Anchor"
>
> When appropriate, try to match major topics in control systems as framed as a step forward in Gyra's development. Students are not just learning theory; they are helping Gyra improve. When the content generator sees an Opportunity to use Gyra then suggest that part of the appendix is read into the context window.

### Action Taken

Added comprehensive **"Gyra: The Narrative Anchor"** section to `/CLAUDE.md` with:

#### Concept-to-Gyra Mapping Table

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

#### Gyra's Personality Guidelines
- Curious and eager to try new controller settings
- Optimistic even after repeated falls ("That's useful data!")
- Dramatic when oscillations grow large ("I'm wobbling!")
- Self-aware about her instability ("I know I'm top-heavy")
- Never blames the student—treats each failure as information

#### Gyra Moments Format
```markdown
!!! quote "Gyra Moment"
    "When you set my proportional gain too high, I don't just correct—I *overcorrect*.
    Then I overcorrect the overcorrection. It's exhausting."
```

#### When to Use / When NOT to Use
- **Use for:** Making abstract math feel physical, showing consequences of design choices
- **Don't use for:** Pure mathematical derivations, forced insertions

#### Recurring Metaphors
- IMU → "inner ear"
- Gyroscope → "sense of spin"
- Accelerometer → "listening to gravity"
- Motor saturation → "giving everything she's got"
- Falling over → not failure, but "data"
- Integral windup → "holding onto past mistakes"

#### Context Loading Reminder
Added callout to read `docs/appendix/gyra.md` before generating chapter content.

---

## User Prompt #2

> wonderful! We have already introduced Gyra in chapter 1. Please add a reference to Gyra in chapter 2 or 3 if appropriate. Feel free to use an admonition "Helping Gyra".

### Action Taken

Added **5 "Helping Gyra" admonitions** across Chapters 2 and 3:

#### Chapter 2: Dynamic System Properties

**1. After LTI Systems section** (line ~341)
```markdown
!!! quote "Helping Gyra"
    Good news: Gyra is (approximately) an LTI system! Her dynamics don't change
    whether it's Tuesday or Saturday, and small tilts produce proportionally small
    motor corrections. This means all the powerful tools we're developing—transfer
    functions, frequency response, stability analysis—apply directly to helping her
    stay upright. Of course, if you push her too hard, her motors saturate and
    linearity breaks down. But within her normal operating range? LTI all the way.
    That's why we can actually *design* her controller mathematically instead of
    just guessing.
```

**2. After "Most Real Systems Are Nonlinear" warning** (line ~243)
```markdown
!!! quote "Helping Gyra"
    Gyra knows all about nonlinearity. When she's nearly upright, small corrections
    work beautifully—double the tilt error, double the motor response. But when
    she's falling over badly? Her motors hit their limits and *saturate*. She's
    giving everything she's got, but it's not twice as much as before—it's just...
    everything. This is why we try to keep Gyra in her "linear zone" where
    corrections are proportional. Once she leaves that zone, our nice LTI analysis
    goes out the window and things get unpredictable fast.
```

#### Chapter 3: Time-Domain Response Fundamentals

**3. After damping ratio classification table** (line ~387)
```markdown
!!! quote "Helping Gyra"
    Gyra lives and breathes damping ratio. When her controller is **underdamped**,
    she wobbles back and forth before settling—annoying but eventually stable. When
    she's **overdamped**, she corrects so sluggishly that a gust of wind might knock
    her over before she finishes responding. But when she's **critically damped**?
    That's the sweet spot. She returns to upright quickly without any wobble. Finding
    Gyra's "just right" damping is one of our main jobs as her control engineers. Too
    twitchy? Lower the gain. Too sluggish? Speed her up. Goldilocks would approve.
```

**4. After underdamped systems insight** (line ~498)
```markdown
!!! quote "Helping Gyra"
    When Gyra overshoots, she leans past vertical, catches herself, swings back,
    overshoots the other way, and gradually settles down. It looks like she's
    panicking, but she's actually following the math perfectly—this is underdamped
    second-order behavior in action. The overshoot percentage tells us how far past
    vertical she'll swing. The ringing frequency tells us how fast she'll wobble.
    Once you can predict these from ζ and ωn, you can tune her controller to minimize
    the drama while keeping her responsive. A little wobble is often acceptable;
    falling over is not.
```

**5. After "Rule of Five Tau" tip** (line ~279)
```markdown
!!! quote "Helping Gyra"
    Gyra's time constant determines how quickly she responds to disturbances. A small
    τ means she reacts fast—great for quick corrections, but potentially twitchy. A
    large τ means she responds slowly—smooth and graceful, but maybe too slow to catch
    herself when pushed. When we tune Gyra's controller, we're effectively choosing
    her time constant. The 5τ rule tells us how long to wait after a disturbance before
    we can say "okay, she's settled." If τ = 0.2 seconds, Gyra settles in about 1 second.
    If τ = 2 seconds, we're waiting 10 seconds. For a robot fighting gravity, that
    difference matters!
```

---

## Files Modified

| File | Changes |
|------|---------|
| `CLAUDE.md` | Added "Gyra: The Narrative Anchor" section (~80 lines) |
| `docs/chapters/02-dynamic-system-properties/index.md` | Added 2 "Helping Gyra" admonitions |
| `docs/chapters/03-time-domain-response/index.md` | Added 3 "Helping Gyra" admonitions |

---

## Gyra Reference Summary

### Source Document
`docs/appendix/gyra.md` - Full specification of Gyra including:
- Physical description (knee-high, top-heavy, two-wheeled)
- Sensors (IMU as "inner ear", gyroscope as "sense of spin")
- Personality (curious, optimistic, dramatic, self-aware)
- Educational role (narrative anchor, concrete system model, safe failure mechanism)

### Integration Pattern
Each "Helping Gyra" admonition:
1. Connects an abstract control concept to Gyra's physical experience
2. Uses Gyra's personality (she doesn't blame students, treats falls as data)
3. Reinforces that students are her "control engineers"
4. Makes consequences of design choices tangible

### Concepts Now Linked to Gyra

| Chapter | Concept | Gyra Connection |
|---------|---------|-----------------|
| Ch 2 | LTI Systems | Gyra is approximately LTI within operating range |
| Ch 2 | Nonlinearity/Saturation | Gyra's motors saturate when falling badly |
| Ch 3 | Damping Ratio | Underdamped = wobbling, critically damped = "just right" |
| Ch 3 | Underdamped Response | Overshoot = Gyra swinging past vertical |
| Ch 3 | Time Constant | τ determines how fast Gyra responds to disturbances |

---

## Design Decisions

1. **Admonition style:** Used `!!! quote "Helping Gyra"` for visual consistency
2. **Placement:** After key concept explanations, not before (so students have context)
3. **Length:** 4-8 sentences each—substantial but not overwhelming
4. **Tone:** Matches Gyra's personality (optimistic, self-aware, treats failures as data)
5. **Frequency:** 2-3 per chapter maximum to avoid overuse

---

## Future Opportunities

Gyra references could be added to upcoming chapters:

| Chapter Topic | Potential Gyra Connection |
|---------------|---------------------------|
| Stability Analysis | "Will Gyra fall over eventually?" |
| Root Locus | "Where should Gyra's poles be?" |
| PID Control | "Proportional makes her twitchy, integral accumulates mistakes, derivative anticipates" |
| Frequency Response | "How does Gyra respond to different wobble frequencies?" |
| Bode Plots | "Listening to Gyra at different frequencies" |
| Gain/Phase Margin | "How much can we push before Gyra loses it?" |

---

## Session Complete

Gyra is now integrated as a narrative anchor in the CLAUDE.md guidelines and has concrete presence in Chapters 2 and 3. Future chapter generation will reference these patterns.
