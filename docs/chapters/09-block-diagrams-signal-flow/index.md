---
title: Block Diagrams and Signal Flow
description: Graphical methods for representing and analyzing complex interconnected control systems using block diagrams and signal flow graphs
generated_by: claude skill chapter-content-generator
date: 2026-01-31 14:35:00
version: 0.03
---

# Block Diagrams and Signal Flow

## Summary

This chapter develops graphical methods for representing and analyzing complex interconnected systems. Students will learn to construct block diagrams using summing junctions, pickoff points, and various connection types (cascade, parallel, feedback). Block diagram reduction techniques enable finding overall transfer functions from complex arrangements. The chapter also introduces signal flow graphs and Mason's gain formula as alternative methods for analyzing systems with multiple loops and forward paths. These tools are essential for modeling real control systems with nested feedback loops.

## Concepts Covered

This chapter covers the following 28 concepts from the learning graph:

1. Block Diagram
2. Summing Junction
3. Pickoff Point
4. Cascade Connection
5. Parallel Connection
6. Feedback Connection
7. Block Diagram Reduction
8. Block Diagram Algebra
9. Forward Path
10. Feedback Path
11. Loop
12. Inner Loop
13. Outer Loop
14. Loop Gain
15. Closed-Loop Transfer
16. Open-Loop Transfer
17. Unity Feedback
18. Non-Unity Feedback
19. Signal Flow Graph
20. Node
21. Branch
22. Branch Gain
23. Mason's Gain Formula
24. Forward Path Gain
25. Loop Gain Calculation
26. Non-Touching Loops
27. Graph Determinant
28. Cofactor

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Introduction to Control Systems](../01-intro-to-control-systems/index.md)
- [Chapter 5: Laplace Transform Methods](../05-laplace-transform-methods/index.md)

---

## The Art of Visual System Representation

Control systems rarely exist in isolation. A real-world system like Gyra involves multiple interconnected subsystems—sensors measuring tilt, controllers computing corrections, amplifiers boosting signals, motors generating torque, and the mechanical structure responding to forces. Understanding how these subsystems combine requires more than differential equations; it requires a visual language that captures both the structure and the signal flow of complex systems.

**Block diagrams** provide exactly this visual language. They allow you to represent systems as interconnected blocks, each representing a transfer function, with signals flowing along connecting paths. Think of a block diagram as an engineering schematic that tells you not just *what* components exist, but *how* signals propagate and transform as they travel through the system.

This chapter equips you with two powerful graphical tools: block diagrams and signal flow graphs. Both serve the same ultimate purpose—finding the overall transfer function from input to output—but they approach the problem differently. Block diagrams are intuitive and widely used for design; signal flow graphs are compact and powerful for analysis. Together, they form the visual foundation of classical control theory.

!!! quote "Gyra Moment"
    "My designers don't just write equations—they draw pictures of me! Each block represents something: my IMU, my controller, my motors, even my wobbling body. When they connect these blocks together, they can literally see how a command to 'stand still' transforms into the motor currents that keep me upright."

## Block Diagrams: Building Blocks of Control

A **block diagram** is a graphical representation of a system using blocks, arrows, and special connection symbols. Each block represents a transfer function—a mathematical relationship between its input and output signals. Arrows indicate the direction of signal flow, and special symbols handle signal combination and distribution.

The beauty of block diagrams lies in their modularity. You can analyze complex systems by first understanding simple building blocks, then combining them according to well-defined rules. This "divide and conquer" approach makes even intimidating systems manageable.

### The Three Essential Elements

Every block diagram is constructed from three fundamental elements:

| Element | Symbol | Function |
|---------|--------|----------|
| Block | Rectangle | Multiplies input signal by transfer function |
| Summing Junction | Circle with +/− signs | Adds or subtracts multiple signals |
| Pickoff Point | Dot or branch point | Distributes one signal to multiple destinations |

Let's examine each element in detail.

### Blocks and Transfer Functions

The rectangular **block** is the workhorse of block diagrams. Each block contains a transfer function—typically written as $G(s)$, $H(s)$, or with subscripts like $G_1(s)$—that describes how the input signal is transformed to produce the output.

#### Transfer Function Block Relationship

$Y(s) = G(s) \cdot X(s)$

where:

- $Y(s)$ is the output signal in the s-domain
- $X(s)$ is the input signal in the s-domain
- $G(s)$ is the transfer function of the block

The transfer function encapsulates all the dynamics of that subsystem—poles, zeros, gain, and frequency response. When you look at a block labeled $G(s)$, you're seeing a complete dynamic system condensed into a single symbol.

### The Summing Junction

The **summing junction** combines multiple signals through addition or subtraction. It's drawn as a circle with signs (+ or −) next to each input arrow indicating whether that signal is added or subtracted.

The summing junction is where error signals are born. When a reference input $R(s)$ enters with a positive sign and measured output $Y(s)$ enters with a negative sign, the result is the error:

#### Error Signal Computation

$E(s) = R(s) - Y(s)$

where:

- $E(s)$ is the error signal
- $R(s)$ is the reference (desired) input
- $Y(s)$ is the measured output (fed back through the sensor)

Summing junctions can have more than two inputs—disturbances, multiple feedback signals, and feedforward paths might all meet at a single junction. The key rule: signals are simply added algebraically according to their signs.

### The Pickoff Point

A **pickoff point** (also called a branch point or takeoff point) allows a single signal to be sent to multiple destinations without being altered. It's drawn as a small dot or simply as a branching of the signal line.

Pickoff points don't modify the signal—they just copy it. This is essential for feedback systems where the output must simultaneously go to the "outside world" and back to the summing junction for comparison with the reference.

!!! tip "Signal Conservation at Pickoff Points"
    When a signal branches at a pickoff point, each branch carries the same signal. There's no "splitting" of signal magnitude—it's like making copies of a digital file. Every copy is identical to the original.

#### Diagram: Block Diagram Elements

<iframe src="../../sims/block-diagram-elements/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Block Diagram Elements Interactive</summary>
Type: microsim

Bloom Taxonomy: Remember (L1)
Bloom Verb: identify, recognize

Learning Objective: Students will identify and recognize the three fundamental block diagram elements (blocks, summing junctions, pickoff points) and understand how each transforms or routes signals.

Canvas layout:
- Top section (60%): Interactive block diagram building area
- Bottom section (40%): Element palette and signal value display

Visual elements:
- Palette of draggable elements: transfer function block, summing junction (with configurable +/- signs), pickoff point
- Work area with grid background
- Connecting lines that can be drawn between elements
- Signal value annotations that update in real-time

Interactive controls:
- Click on palette elements to add them to the work area
- Drag elements to position them
- Connect elements by clicking and dragging from output to input
- Input field to set the input signal value (numeric)
- Input field to enter transfer function gain for blocks
- Display panel showing output values at each node

Default example:
- Pre-built simple feedback loop with R(s)=1, G(s)=10, H(s)=1
- Shows computed values: E(s), Y(s) at each signal point

Behavior:
- When connections are complete, calculate and display all signal values
- Highlight signal path when hovering over any signal line
- Show popup with element description when hovering over element

Instructional Rationale: Drag-and-drop construction with real-time signal value computation helps students internalize how signals flow through each element type before analyzing more complex systems.

Implementation: p5.js with canvas-based controls
Canvas size: Responsive, minimum 800x500px
</details>

## Connection Types: How Blocks Combine

When multiple blocks appear in a system, they're connected in specific patterns. Three fundamental connection types cover nearly every configuration you'll encounter: cascade (series), parallel, and feedback.

### Cascade Connection

A **cascade connection** (or series connection) occurs when the output of one block feeds directly into the input of another. The blocks are "in line," like train cars coupled together.

For two blocks $G_1(s)$ and $G_2(s)$ in cascade:

#### Cascade Transfer Function

$G_{cascade}(s) = G_1(s) \cdot G_2(s)$

where:

- $G_{cascade}(s)$ is the equivalent transfer function of the cascade
- $G_1(s)$ is the first block in the chain
- $G_2(s)$ is the second block in the chain

The rule extends to any number of blocks: multiply all the transfer functions together. This makes intuitive sense—each block multiplies the signal by its transfer function, so chaining $n$ blocks multiplies by all $n$ transfer functions.

Order matters for physical interpretation (signals flow through $G_1$ before $G_2$), but mathematically, multiplication is commutative: $G_1(s) \cdot G_2(s) = G_2(s) \cdot G_1(s)$.

### Parallel Connection

A **parallel connection** occurs when a signal splits into multiple paths, each path passes through a different block, and the results combine at a summing junction.

For two blocks $G_1(s)$ and $G_2(s)$ in parallel (both added):

#### Parallel Transfer Function

$G_{parallel}(s) = G_1(s) + G_2(s)$

where:

- $G_{parallel}(s)$ is the equivalent transfer function of the parallel combination
- $G_1(s)$ is the upper parallel path
- $G_2(s)$ is the lower parallel path

If one path has a negative sign at the summing junction, you subtract instead of add. Parallel connections are common when multiple effects contribute to a single output—perhaps a feedforward path alongside the main control path, or multiple disturbances entering the plant.

### Feedback Connection

The **feedback connection** is the heart of closed-loop control. The output of a forward path block $G(s)$ is fed back through a feedback block $H(s)$ and subtracted (for negative feedback) from the input.

For negative feedback:

#### Closed-Loop Transfer Function

$T(s) = \frac{G(s)}{1 + G(s)H(s)}$

where:

- $T(s)$ is the closed-loop transfer function
- $G(s)$ is the forward path transfer function
- $H(s)$ is the feedback path transfer function
- $G(s)H(s)$ is the loop transfer function (open-loop transfer function)

This formula is so fundamental that you should commit it to memory. It appears constantly in control systems analysis and design.

For positive feedback (when the fed-back signal is added rather than subtracted):

#### Positive Feedback Transfer Function

$T(s) = \frac{G(s)}{1 - G(s)H(s)}$

where:

- The denominator has a minus sign instead of plus
- Positive feedback is rarely used intentionally (it tends toward instability)

!!! warning "The Sign Matters!"
    The difference between $1 + G(s)H(s)$ (negative feedback) and $1 - G(s)H(s)$ (positive feedback) is critical. Most control systems use negative feedback because it's inherently stabilizing. The denominator $1 + G(s)H(s)$ is called the **characteristic polynomial**—its roots determine system stability.

| Connection Type | Configuration | Equivalent Transfer Function |
|----------------|---------------|------------------------------|
| Cascade | Blocks in series | $G_1 \cdot G_2$ |
| Parallel | Blocks in parallel, summed | $G_1 + G_2$ |
| Negative Feedback | Forward and feedback paths | $\frac{G}{1 + GH}$ |
| Positive Feedback | Forward path, added feedback | $\frac{G}{1 - GH}$ |

#### Diagram: Connection Type Comparison

<iframe src="../../sims/connection-types/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Connection Type Comparison MicroSim</summary>
Type: microsim

Bloom Taxonomy: Understand (L2)
Bloom Verb: compare, contrast

Learning Objective: Students will compare cascade, parallel, and feedback connection types, observing how different configurations produce different overall transfer functions from identical component blocks.

Canvas layout:
- Left panel (30%): Connection type selector and transfer function display
- Right panel (70%): Visual block diagram that updates based on selection

Visual elements:
- Three connection configurations shown graphically
- Block $G_1(s)$ and $G_2(s)$ with adjustable gains
- Input arrow $R(s)$ and output arrow $Y(s)$
- Formula display showing equivalent transfer function
- Pole-zero plot or Bode magnitude sketch for each configuration

Interactive controls:
- Radio buttons: Select "Cascade", "Parallel", or "Feedback"
- Slider: $G_1$ gain (0.1 to 10, default 2)
- Slider: $G_2$ gain (0.1 to 10, default 3)
- Checkbox: Show equivalent single-block representation
- Button: Reset to defaults

Default parameters:
- Connection type: Cascade
- $G_1 = 2$, $G_2 = 3$
- Transfer functions shown as simple gains for clarity

Behavior:
- When connection type changes, diagram reconfigures smoothly
- Equivalent transfer function updates in real-time as gains change
- For feedback, show the classic loop with summing junction
- Display numerical value of equivalent transfer function

Data Visibility Requirements:
- Stage 1: Show selected connection type diagram
- Stage 2: Show individual transfer function values
- Stage 3: Show formula for combination
- Stage 4: Show computed equivalent transfer function

Instructional Rationale: Side-by-side comparison with identical blocks allows students to directly observe how connection topology (not just component values) determines overall system behavior.

Implementation: p5.js with canvas-based controls
Canvas size: Responsive, 800x550px minimum
</details>

## Understanding Forward and Feedback Paths

Before we can reduce complex block diagrams, we need precise vocabulary for describing the routes signals take through a system.

### Forward Path

A **forward path** is any path from the input $R(s)$ to the output $Y(s)$ that traverses signals only in the forward direction (following the arrows) and doesn't pass through any node more than once.

In a simple feedback system, there's typically one forward path: from $R(s)$ through the controller, through the plant, to $Y(s)$. Complex systems may have multiple forward paths—perhaps a direct feedforward path alongside the main control path.

### Feedback Path

The **feedback path** is the route from the output back to the summing junction at the input. This path typically includes the sensor and any signal conditioning. The feedback path contains the block $H(s)$ in our standard notation.

The feedback path is what makes closed-loop control possible. Without it, the system has no way to compare actual output to desired output.

### The Loop

A **loop** is a closed path starting and ending at the same point, following signal directions around the circuit. The most important loop in control systems is the main feedback loop—from the summing junction, through $G(s)$, out to the output, back through $H(s)$, and returning to the summing junction.

The product of all transfer functions around a loop is called the **loop gain** or **loop transfer function**:

#### Loop Transfer Function

$L(s) = G(s)H(s)$

where:

- $L(s)$ is the loop transfer function
- $G(s)$ is the forward path transfer function
- $H(s)$ is the feedback path transfer function

Loop gain is central to stability analysis. The roots of $1 + L(s) = 0$ determine whether the closed-loop system is stable.

!!! quote "Gyra Moment"
    "My main feedback loop goes like this: My tilt angle gets measured by my IMU, compared to 'zero' (the reference), the error goes to my controller, the controller drives my motors, the motors push me, and that changes my tilt angle—which gets measured again. Around and around, dozens of times per second. That loop is my heartbeat."

### Inner and Outer Loops

Complex systems often have **nested feedback loops**—a feedback loop inside another feedback loop. The innermost feedback structure is called the **inner loop**, while the loop encompassing it is the **outer loop**.

Inner loops typically handle fast dynamics (like motor current control), while outer loops handle slower dynamics (like position or velocity control). This hierarchical structure is called **cascade control** (not to be confused with cascade connections of blocks).

To analyze nested loops, you typically:

1. Reduce the inner loop first, treating it as a single equivalent block
2. Then analyze the outer loop with the simplified inner loop

This inside-out approach simplifies complex structures step by step.

#### Diagram: Nested Feedback Loop Structure

<iframe src="../../sims/nested-loops/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Nested Feedback Loop Structure</summary>
Type: diagram

Bloom Taxonomy: Analyze (L4)
Bloom Verb: differentiate, organize

Learning Objective: Students will differentiate between inner and outer loops in a nested feedback structure and trace the signal flow through each loop independently.

Purpose: Visualize the hierarchical structure of nested feedback loops commonly found in cascade control systems

Components to show:
- Outer loop reference input $R(s)$
- Outer loop summing junction
- Outer loop controller $G_{c1}(s)$
- Inner loop reference (output of outer controller)
- Inner loop summing junction
- Inner loop controller $G_{c2}(s)$
- Plant $G_p(s)$
- Inner loop sensor $H_2(s)$
- Outer loop sensor $H_1(s)$
- Output $Y(s)$

Visual layout:
- Inner loop highlighted with light blue background
- Outer loop highlighted with light green background
- Clear labels for "Inner Loop" and "Outer Loop"
- Signal labels at all key points

Interactive features:
- Hover over inner loop region: highlights all inner loop components
- Hover over outer loop region: highlights all outer loop components
- Click "Show Inner Loop Equivalent": collapses inner loop to single block
- Animation showing signal flow around each loop

Color scheme:
- Inner loop components: blue
- Outer loop components: green
- Plant: gray
- Signals: black arrows

Implementation: vis-network or custom SVG with JavaScript
Canvas size: 900x500px, responsive
</details>

## Open-Loop and Closed-Loop Transfer Functions

Two transfer functions are fundamental to control system analysis: the **open-loop transfer function** and the **closed-loop transfer function**. Understanding the relationship between them is crucial.

### Open-Loop Transfer Function

The **open-loop transfer function** $G_{OL}(s)$ describes the system behavior when the feedback loop is "broken"—when the measured output is not connected back to the summing junction. It's the product of all transfer functions around the loop:

#### Open-Loop Transfer Function Definition

$G_{OL}(s) = G(s)H(s)$

where:

- $G_{OL}(s)$ is the open-loop transfer function
- $G(s)$ is the forward path transfer function
- $H(s)$ is the feedback path transfer function

The open-loop transfer function is what you measure if you open the loop (break the feedback connection) and inject a signal at one point while measuring at another. It's essential for stability analysis using Bode plots and Nyquist diagrams.

### Closed-Loop Transfer Function

The **closed-loop transfer function** $T(s)$ describes the overall input-output relationship when the feedback loop is closed:

#### Closed-Loop Transfer Function Definition

$T(s) = \frac{Y(s)}{R(s)} = \frac{G(s)}{1 + G(s)H(s)}$

where:

- $T(s)$ is the closed-loop transfer function
- $Y(s)$ is the output
- $R(s)$ is the reference input
- The denominator $1 + G(s)H(s)$ is called the characteristic polynomial

The poles of $T(s)$—the roots of $1 + G(s)H(s) = 0$—determine closed-loop stability and transient response.

### Unity Feedback Systems

A **unity feedback** system is the special case where $H(s) = 1$. The sensor is "ideal"—it perfectly measures the output without any dynamics or gain. This simplifies the closed-loop transfer function:

#### Unity Feedback Transfer Function

$T(s) = \frac{G(s)}{1 + G(s)}$

where:

- $H(s) = 1$ (unity feedback)
- The open-loop transfer function equals the forward path: $G_{OL}(s) = G(s)$

Unity feedback is a common assumption in textbook problems and serves as a useful starting point for design. Real sensors have dynamics, but at frequencies of interest, $H(s) \approx 1$ is often a reasonable approximation.

### Non-Unity Feedback Systems

When $H(s) \neq 1$, the system has **non-unity feedback**. The sensor might have:

- Gain different from 1 (e.g., a tachometer outputting volts per rad/s)
- Dynamics (e.g., sensor bandwidth limitations)
- Filtering (e.g., to remove noise)

For non-unity feedback, you must include $H(s)$ explicitly in all calculations. A common transformation is to convert a non-unity feedback system to an equivalent unity feedback form for analysis, but this requires care with the transfer function definitions.

| System Type | Feedback Transfer Function | Closed-Loop Transfer | Open-Loop Transfer |
|-------------|---------------------------|---------------------|-------------------|
| Unity Feedback | $H(s) = 1$ | $\frac{G}{1+G}$ | $G(s)$ |
| Non-Unity Feedback | $H(s) \neq 1$ | $\frac{G}{1+GH}$ | $G(s)H(s)$ |

!!! tip "Deriving the Closed-Loop Transfer Function"
    You can derive $T(s) = \frac{G}{1+GH}$ from first principles:

    1. Write $E = R - HY$ (error = reference minus fed-back output)
    2. Write $Y = GE$ (output = forward path times error)
    3. Substitute: $Y = G(R - HY) = GR - GHY$
    4. Rearrange: $Y + GHY = GR$, so $Y(1 + GH) = GR$
    5. Solve: $T = \frac{Y}{R} = \frac{G}{1+GH}$

## Block Diagram Reduction

Real control systems have block diagrams far more complex than a single feedback loop. **Block diagram reduction** is the systematic process of simplifying these complex diagrams to find the overall transfer function.

The goal is straightforward: start with a complicated diagram and end with a single block showing the transfer function from input to output. The process uses equivalence rules that preserve the input-output relationship while simplifying the structure.

### Block Diagram Algebra Rules

**Block diagram algebra** consists of rules for manipulating block diagrams while preserving their input-output behavior. These rules let you move blocks and pickoff points, combine blocks, and ultimately reduce the diagram.

The fundamental rules are:

1. **Cascade blocks combine by multiplication**
2. **Parallel blocks combine by addition**
3. **Feedback loops combine using the feedback formula**
4. **Moving a pickoff point past a block requires compensation**
5. **Moving a summing junction past a block requires compensation**

Let's examine the compensation rules in detail.

### Moving a Pickoff Point Past a Block

If you need to move a pickoff point from the output of block $G(s)$ to its input, you must add a compensating block $G(s)$ in the path that was picked off:

**Moving pickoff point backward (toward input):** Insert $G(s)$ in the picked-off path

**Moving pickoff point forward (toward output):** Insert $\frac{1}{G(s)}$ in the picked-off path

This compensation ensures that the signal in the picked-off path has the same value as before the move.

### Moving a Summing Junction Past a Block

Similarly, moving a summing junction past a block requires compensation:

**Moving summing junction backward:** Insert $\frac{1}{G(s)}$ in paths entering the junction

**Moving summing junction forward:** Insert $G(s)$ in paths entering the junction

These rules are the "legal moves" in the game of block diagram reduction. Master them, and you can systematically simplify any block diagram.

| Operation | Compensation Required |
|-----------|----------------------|
| Move pickoff point backward past $G(s)$ | Add $G(s)$ in picked-off path |
| Move pickoff point forward past $G(s)$ | Add $\frac{1}{G(s)}$ in picked-off path |
| Move summing junction backward past $G(s)$ | Add $\frac{1}{G(s)}$ in entering paths |
| Move summing junction forward past $G(s)$ | Add $G(s)$ in entering paths |

#### Diagram: Block Diagram Reduction Steps

<iframe src="../../sims/block-reduction-steps/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Block Diagram Reduction Steps MicroSim</summary>
Type: microsim

Bloom Taxonomy: Apply (L3)
Bloom Verb: execute, apply

Learning Objective: Students will apply block diagram algebra rules to systematically reduce a multi-loop block diagram to a single transfer function, seeing each step animated.

Canvas layout:
- Main area (75%): Block diagram that transforms step by step
- Side panel (25%): Reduction steps list and current formula

Visual elements:
- Multi-loop block diagram with 4-5 blocks
- Animated transitions showing each reduction step
- Highlighted regions showing which elements are being combined
- Running calculation of equivalent transfer function

Interactive controls:
- Button: "Next Step" - advances reduction by one step
- Button: "Previous Step" - goes back one step
- Button: "Auto-Run" - animates through all steps
- Slider: Animation speed (0.5 to 2 seconds per step)
- Button: "Reset" - returns to original diagram
- Dropdown: Select example problem (3 different diagrams of varying complexity)

Default example:
- System with inner and outer loops
- Forward path: $G_1(s)G_2(s)G_3(s)$
- Inner feedback: $H_1(s)$ around $G_2(s)G_3(s)$
- Outer feedback: $H_2(s)$ around entire system

Reduction sequence:
Step 1: Identify inner loop
Step 2: Apply feedback formula to inner loop, replace with equivalent block
Step 3: Combine cascade blocks in forward path
Step 4: Apply feedback formula to outer loop
Step 5: Simplify to final transfer function

Data Visibility Requirements:
- Each step shows: diagram state, rule being applied, formula evolution
- Final step shows complete transfer function with all terms

Instructional Rationale: Step-by-step animation with pause and rewind allows students to trace each algebraic manipulation, building procedural fluency before tackling problems independently.

Implementation: p5.js with canvas-based controls and smooth transitions
Canvas size: 900x600px, responsive
</details>

### Reduction Strategy

When facing a complex block diagram, follow this systematic approach:

1. **Identify all loops** - Find inner loops, outer loops, and any parallel paths
2. **Reduce inner loops first** - Apply the feedback formula to innermost structures
3. **Combine cascade elements** - Multiply series transfer functions
4. **Combine parallel elements** - Add parallel transfer functions
5. **Repeat** until only one block remains

If you get stuck, look for opportunities to move pickoff points or summing junctions using the compensation rules. Sometimes rearranging the diagram makes the reduction path clearer.

!!! quote "Gyra Moment"
    "My designers once drew my complete control system—it looked like spaghetti! There was an inner loop for motor current control, a middle loop for velocity, and an outer loop for position. But step by step, they collapsed each loop using the feedback formula until the whole thing became one transfer function. That's when they could finally tune me properly."

## Signal Flow Graphs

While block diagrams are intuitive, they can become unwieldy for systems with many loops and forward paths. **Signal flow graphs** offer a more compact alternative that's particularly well-suited for applying Mason's gain formula—a powerful technique for finding transfer functions without step-by-step reduction.

A signal flow graph represents the same information as a block diagram but in a different form: signals become **nodes** (points), and transfer functions become **branches** (directed lines connecting nodes).

### Nodes and Branches

A **node** represents a signal variable. Unlike block diagram signals (which are just labels on arrows), nodes are explicit points in the graph. Each node has a value equal to the sum of all signals entering it.

A **branch** connects two nodes and has an associated gain—the transfer function by which the source node's value is multiplied to contribute to the destination node's value. Branches have direction, shown by arrows.

The key relationship: the value at any node equals the sum of all incoming branch gains times their source node values:

#### Node Value Equation

$X_j = \sum_i T_{ij} X_i$

where:

- $X_j$ is the value at node $j$
- $X_i$ is the value at source node $i$
- $T_{ij}$ is the branch gain from node $i$ to node $j$
- The sum is over all branches entering node $j$

### Branch Gain

The **branch gain** is simply the transfer function written along the branch arrow. For a branch from node $X_i$ to node $X_j$ with gain $G(s)$, the contribution to $X_j$ is $G(s) \cdot X_i$.

Signal flow graphs are drawn with input nodes on the left (sources, with only outgoing branches), output nodes on the right (sinks, with only incoming branches), and intermediate nodes in between.

### Converting Block Diagrams to Signal Flow Graphs

The conversion is straightforward:

1. Each signal in the block diagram becomes a node
2. Each block becomes a branch with gain equal to the block's transfer function
3. Summing junctions become nodes (the sum happens implicitly)
4. Pickoff points are simply nodes with multiple outgoing branches

Signal flow graphs are more compact because they don't need separate symbols for summing—it's built into the node definition.

#### Diagram: Block Diagram to Signal Flow Graph Conversion

<iframe src="../../sims/block-to-sfg/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Block Diagram to Signal Flow Graph Conversion</summary>
Type: diagram

Bloom Taxonomy: Understand (L2)
Bloom Verb: interpret, convert

Learning Objective: Students will interpret the correspondence between block diagram elements and signal flow graph elements, converting between the two representations.

Purpose: Show side-by-side comparison of block diagram and equivalent signal flow graph

Layout:
- Top half: Block diagram of a feedback system
- Bottom half: Equivalent signal flow graph
- Dashed lines connecting corresponding elements

Block diagram elements (top):
- Reference input R(s)
- Summing junction
- Error E(s)
- Forward block G(s)
- Output Y(s)
- Feedback block H(s)
- Feedback signal

Signal flow graph elements (bottom):
- Node R (input node, leftmost)
- Node E (after summing)
- Branch with gain G from E to Y
- Node Y (output node, rightmost)
- Branch with gain -H from Y to E (negative for feedback)

Interactive features:
- Hover over block diagram element: highlights corresponding SFG element
- Hover over SFG element: highlights corresponding block diagram element
- Animation showing signal values propagating through both representations
- Toggle: "Show signal values" displays numerical values at each node

Visual style:
- Block diagram: standard rectangular blocks and circles
- SFG: dots for nodes, arrows with gain labels for branches
- Matching colors between corresponding elements

Implementation: vis-network or custom SVG
Canvas size: 800x500px, responsive
</details>

## Mason's Gain Formula

**Mason's gain formula** is a powerful technique for finding the transfer function of a signal flow graph without performing step-by-step reduction. It's particularly valuable for complex systems with multiple loops and forward paths where block diagram reduction would be tedious.

The formula may look intimidating at first, but it's based on a systematic accounting of all paths and loops in the graph.

### Forward Path Gain

A **forward path** in a signal flow graph is any path from the input node to the output node that doesn't pass through any node more than once. Each forward path has an associated **forward path gain**—the product of all branch gains along that path.

#### Forward Path Gain Definition

$P_k = \prod_{\text{branches in path } k} T_i$

where:

- $P_k$ is the gain of the $k$th forward path
- $T_i$ are the individual branch gains along the path

Many systems have only one forward path, but complex systems with feedforward or multiple routes from input to output may have several.

### Loop Gain Calculation

A **loop** in a signal flow graph is a closed path that starts and ends at the same node, traversing each intermediate node only once. Each loop has a **loop gain**—the product of all branch gains around the loop.

#### Loop Gain Definition

$L_i = \prod_{\text{branches in loop } i} T_j$

where:

- $L_i$ is the gain of the $i$th loop
- $T_j$ are the branch gains around the loop

### Non-Touching Loops

Two loops are **non-touching** if they share no common nodes. Non-touching loops don't interact directly—a signal can't travel through both loops in a single trip around the graph.

Mason's formula requires identifying:

- All individual loop gains
- All products of two non-touching loop gains
- All products of three non-touching loop gains
- And so on...

### The Graph Determinant

The **graph determinant** $\Delta$ (also called the system determinant) summarizes all the loop structure:

#### Graph Determinant Formula

$\Delta = 1 - \sum L_i + \sum L_i L_j - \sum L_i L_j L_k + \cdots$

where:

- $\sum L_i$ is the sum of all individual loop gains
- $\sum L_i L_j$ is the sum of products of all pairs of non-touching loops
- $\sum L_i L_j L_k$ is the sum of products of all triplets of non-touching loops
- The pattern continues with alternating signs

For many practical systems, especially those with touching loops, only the first few terms are non-zero.

### Cofactors

The **cofactor** $\Delta_k$ for the $k$th forward path is the graph determinant evaluated with all loops that touch that forward path removed:

#### Cofactor Definition

$\Delta_k = 1 - \sum L_i^{(k)} + \sum L_i^{(k)} L_j^{(k)} - \cdots$

where:

- The superscript $(k)$ indicates only loops that don't touch forward path $k$
- If all loops touch forward path $k$, then $\Delta_k = 1$

### The Complete Formula

Mason's gain formula gives the transfer function as:

#### Mason's Gain Formula

$T(s) = \frac{Y(s)}{R(s)} = \frac{\sum_k P_k \Delta_k}{\Delta}$

where:

- $P_k$ is the gain of the $k$th forward path
- $\Delta_k$ is the cofactor for the $k$th forward path
- $\Delta$ is the graph determinant
- The sum is over all forward paths

This formula directly gives the closed-loop transfer function without any intermediate reduction steps.

| Term | Symbol | Description |
|------|--------|-------------|
| Forward path gain | $P_k$ | Product of branch gains along forward path $k$ |
| Loop gain | $L_i$ | Product of branch gains around loop $i$ |
| Graph determinant | $\Delta$ | $1 - \sum L_i + \sum L_iL_j - \cdots$ |
| Cofactor | $\Delta_k$ | Graph determinant with path-$k$-touching loops removed |

#### Diagram: Mason's Gain Formula Step-by-Step

<iframe src="../../sims/masons-formula/main.html" width="100%" height="650px" scrolling="no"></iframe>

<details markdown="1">
<summary>Mason's Gain Formula Step-by-Step MicroSim</summary>
Type: microsim

Bloom Taxonomy: Apply (L3)
Bloom Verb: calculate, apply

Learning Objective: Students will apply Mason's gain formula by identifying forward paths, loops, non-touching loop pairs, and computing the transfer function step by step.

Canvas layout:
- Left panel (50%): Signal flow graph with interactive highlighting
- Right panel (50%): Step-by-step calculation display

Visual elements:
- Signal flow graph with 4-5 nodes and multiple loops
- Forward paths highlighted in green when selected
- Loops highlighted in orange when selected
- Non-touching loop pairs shown with matching colors
- Formula building progressively as terms are identified

Interactive controls:
- Step 1 button: "Find Forward Paths" - highlights each forward path in sequence
- Step 2 button: "Find Loops" - highlights each loop in sequence
- Step 3 button: "Find Non-Touching Pairs" - shows which loops don't touch
- Step 4 button: "Calculate Δ" - builds determinant formula
- Step 5 button: "Calculate Cofactors" - shows Δ_k for each path
- Step 6 button: "Apply Formula" - combines everything into final T(s)
- Dropdown: Select example (3 different signal flow graphs)
- Button: Reset

Default example:
- System with two forward paths
- Three loops, one pair of non-touching loops
- Simple gains (integers) for easy hand calculation

Data Visibility Requirements:
- Stage 1: Highlight forward path, display P_k value
- Stage 2: Highlight each loop, display L_i value
- Stage 3: Show which loops touch which paths
- Stage 4: Show Δ formula with numerical values
- Stage 5: Show Δ_k for each forward path
- Stage 6: Show final T(s) with all substitutions

Instructional Rationale: Breaking Mason's formula into discrete steps with visual feedback demystifies what can seem like a cryptic procedure, building student confidence for independent application.

Implementation: p5.js with canvas-based controls
Canvas size: 900x650px, responsive
</details>

### Worked Example: Applying Mason's Formula

Consider a signal flow graph with:

- Input node $R$, intermediate nodes $X_1$, $X_2$, and output node $Y$
- Forward path: $R \to X_1 \to X_2 \to Y$ with gains $G_1$, $G_2$, $G_3$
- Loop 1: $X_1 \to X_2 \to X_1$ with gain $-G_2 H_1$ (self-loop through feedback)
- Loop 2: $X_2 \to Y \to X_2$ with gain $-G_3 H_2$

**Step 1: Identify forward paths**

There's one forward path with gain $P_1 = G_1 G_2 G_3$

**Step 2: Identify loops and their gains**

- $L_1 = -G_2 H_1$
- $L_2 = -G_3 H_2$

**Step 3: Identify non-touching loops**

Do loops 1 and 2 share any nodes? Loop 1 involves $X_1, X_2$. Loop 2 involves $X_2, Y$. They share $X_2$, so they're *touching*. No non-touching pairs exist.

**Step 4: Calculate the graph determinant**

$\Delta = 1 - (L_1 + L_2) + 0 = 1 + G_2 H_1 + G_3 H_2$

**Step 5: Calculate cofactors**

Does the forward path touch all loops? Path goes through $X_1, X_2, Y$. Both loops touch this path (they share nodes with it). So $\Delta_1 = 1$.

**Step 6: Apply Mason's formula**

$T(s) = \frac{P_1 \Delta_1}{\Delta} = \frac{G_1 G_2 G_3}{1 + G_2 H_1 + G_3 H_2}$

!!! tip "When to Use Mason's Formula"
    Mason's gain formula shines when:

    - The system has multiple forward paths
    - There are many loops, some non-touching
    - Block diagram reduction would require many steps

    For simple single-loop systems, direct application of $T = \frac{G}{1+GH}$ is usually faster.

## Practical Examples: Gyra's Control Loops

Let's apply these techniques to a realistic scenario: Gyra's cascade position control system. This example illustrates nested loops, multiple transfer functions, and the power of systematic reduction.

### Gyra's Cascade Control Structure

Gyra uses three nested control loops:

1. **Inner loop (fastest)**: Motor current control - ensures motors deliver commanded torque
2. **Middle loop**: Velocity control - regulates how fast Gyra tilts
3. **Outer loop (slowest)**: Position control - keeps Gyra at the desired tilt angle (zero for upright)

Each loop operates at a different speed, with inner loops responding much faster than outer loops. This hierarchical structure improves performance and makes tuning easier.

The transfer functions are:

- $G_c(s)$ - Position controller (outer)
- $G_v(s)$ - Velocity controller (middle)
- $G_i(s)$ - Current controller (inner)
- $G_m(s)$ - Motor dynamics
- $G_p(s)$ - Gyra's mechanical dynamics
- $H_i(s)$ - Current sensor
- $H_v(s)$ - Velocity sensor (derived from gyroscope)
- $H_p(s)$ - Position sensor (from accelerometer)

#### Diagram: Gyra's Cascade Control Block Diagram

<iframe src="../../sims/gyra-cascade-control/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Gyra's Cascade Control Block Diagram</summary>
Type: diagram

Bloom Taxonomy: Analyze (L4)
Bloom Verb: organize, deconstruct

Learning Objective: Students will deconstruct Gyra's cascade control system into nested loop structures, identifying which loops must be reduced first.

Purpose: Show realistic cascade control structure with physical interpretation for each block

Components to show:
- Reference input: Desired tilt angle θ_ref (typically 0° for upright)
- Outer loop controller G_c(s): Position controller (PD or PID)
- Velocity reference: Output of position controller
- Middle loop controller G_v(s): Velocity controller
- Current reference: Output of velocity controller
- Inner loop controller G_i(s): Current controller
- Motor G_m(s): Motor electrical and mechanical dynamics
- Plant G_p(s): Gyra's inverted pendulum dynamics
- Output θ: Actual tilt angle
- Current sensor H_i(s): Measures motor current
- Velocity sensor H_v(s): From gyroscope
- Position sensor H_p(s): From accelerometer/IMU fusion

Visual layout:
- Nested rectangular regions showing each loop
- Inner loop in innermost region (light blue)
- Middle loop in middle region (light green)
- Outer loop in outermost region (light yellow)
- Clear signal flow arrows

Interactive features:
- Click on any loop region to highlight that loop's components
- Hover over any block to see physical description and typical transfer function form
- Button: "Show reduction order" - animates the inside-out reduction sequence
- Button: "Show equivalent blocks" - shows result of reducing each loop

Color scheme:
- Position loop: yellow/gold
- Velocity loop: green
- Current loop: blue
- Physical plant: gray
- Sensors: purple

Implementation: vis-network or custom interactive SVG
Canvas size: 900x550px, responsive
</details>

### Reducing Gyra's Control Structure

To find the overall transfer function from desired angle to actual angle, we reduce inside-out:

**Step 1: Reduce the inner (current) loop**

$T_i(s) = \frac{G_i(s) G_m(s)}{1 + G_i(s) G_m(s) H_i(s)}$

This represents the "controlled motor" that delivers current proportional to command.

**Step 2: Reduce the middle (velocity) loop**

The forward path is now $G_v(s) T_i(s) G_p(s)$. With velocity feedback:

$T_v(s) = \frac{G_v(s) T_i(s) G_p(s)}{1 + G_v(s) T_i(s) G_p(s) H_v(s)}$

**Step 3: Reduce the outer (position) loop**

Finally, with position feedback:

$T(s) = \frac{G_c(s) T_v(s)}{1 + G_c(s) T_v(s) H_p(s)}$

Substituting backwards gives the complete transfer function—which would be extremely messy if written out fully, but the structured approach keeps it manageable.

!!! quote "Gyra Moment"
    "My inner current loop responds in milliseconds—it's like a reflex, too fast for me to even notice. My velocity loop is a bit slower, smoothing out the jerkiness. And my position loop? That's the one that really keeps me upright, comparing where I am to where I should be, over and over."

## Loop Gain and Stability Preview

While detailed stability analysis comes in later chapters, block diagrams provide immediate insight into a crucial stability quantity: the **loop gain**.

The loop gain $L(s) = G(s)H(s)$ determines system stability. Specifically, the closed-loop system is stable if and only if all roots of the characteristic equation:

#### Characteristic Equation

$1 + L(s) = 0$

have negative real parts (lie in the left half of the s-plane).

Block diagrams make the loop gain visually apparent—just multiply the transfer functions around any feedback loop. This connection between graphical representation and stability is one of the great insights of classical control theory.

## Summary

This chapter developed two complementary graphical methods for analyzing control systems:

**Block Diagrams:**

- Built from blocks, summing junctions, and pickoff points
- Cascade connections multiply transfer functions
- Parallel connections add transfer functions
- Feedback connections use $T = \frac{G}{1+GH}$
- Reduction follows inside-out strategy for nested loops
- Block diagram algebra enables systematic simplification

**Signal Flow Graphs:**

- Nodes represent signals; branches represent transfer functions
- More compact than block diagrams for complex systems
- Mason's gain formula finds transfer functions directly

**Key Formulas:**

| Concept | Formula |
|---------|---------|
| Closed-loop transfer (negative feedback) | $T = \frac{G}{1+GH}$ |
| Closed-loop transfer (positive feedback) | $T = \frac{G}{1-GH}$ |
| Open-loop transfer function | $L = GH$ |
| Characteristic equation | $1 + GH = 0$ |
| Mason's gain formula | $T = \frac{\sum P_k \Delta_k}{\Delta}$ |

These graphical tools transform abstract mathematical relationships into visible structures that reveal system architecture, signal flow, and the critical feedback loops that determine behavior. Whether you're designing a new controller for Gyra or analyzing an industrial process control system, block diagrams and signal flow graphs are indispensable companions.

??? question "Check Your Understanding: What happens to the closed-loop transfer function if feedback is removed (H = 0)?"
    When $H(s) = 0$ (no feedback), the closed-loop formula $T = \frac{G}{1+GH}$ becomes $T = \frac{G}{1+0} = G$. The system becomes open-loop—output equals input times forward gain, with no error correction. This is exactly what we'd expect: removing feedback converts a closed-loop system into an open-loop system.

??? question "Check Your Understanding: In Mason's formula, what is the cofactor for a forward path that touches all loops?"
    If a forward path touches all loops in the graph, then when we remove those loops to calculate the cofactor, no loops remain. The cofactor formula $\Delta_k = 1 - \sum L_i^{(k)} + \cdots$ has all terms zero except the 1, so $\Delta_k = 1$. This is the most common case in simple systems.
