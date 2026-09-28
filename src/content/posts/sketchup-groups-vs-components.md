---
title: "Groups vs Components in SketchUp: When to Use Each"
description: "Groups and components both keep SketchUp geometry from sticking together, but they behave very differently. Here's when to use each and the mistakes to avoid."
pubDate: 2026-09-28
category: tutorials
tags: [groups, components, beginners, modeling]
aiAssisted: true
topicId: sketchup-groups-vs-components
sources:
  - title: "SketchUp Help Center"
    url: "https://help.sketchup.com/en"
  - title: "SketchUp Community Forums"
    url: "https://forums.sketchup.com/"
---

If you've ever pulled a wall in SketchUp and watched the floor come with it, you've met "sticky geometry." Groups and components are the two tools that stop it. Both wrap edges and faces into a protected container — the difference is that **every copy of a component is linked**, while every group is on its own.

That one difference decides which you should use, and getting it right early makes models smaller, faster and much easier to edit.

## Why raw geometry is a problem

SketchUp is built on edges and faces that merge whenever they touch. That's great while you sketch a single shape, but in a real model it means:

- Moving one object drags connected faces along with it.
- Deleting an edge can erase faces on two objects at once.
- Selecting "just the table" becomes a click-by-click chore.

The fix is simple: as soon as a piece of geometry represents a real-world object — a wall, a board, a chair — wrap it in a group or a component.

## What a group is

A group is a one-off container. Select the geometry, right-click, choose **Make Group**, and it becomes a single object you can move, rotate and hide as one.

Use a group when:

- The object appears **only once** in the model (a site slab, a unique staircase, a custom reception desk).
- You're temporarily isolating geometry so you can edit it without touching its neighbors.
- You want to collect several components into one movable assembly, such as a "kitchen island" that contains cabinet components.

If you copy a group, you get an independent duplicate. Edit one, and the other stays the same.

## What a component is

A component is a reusable definition. Select geometry, press <kbd>G</kbd> (or right-click and choose **Make Component**), give it a name, and SketchUp stores one definition that every copy points to.

Edit any instance and **every instance updates**. Put twenty identical chairs in a restaurant layout, change the leg shape once, and all twenty change.

Components also give you extras groups don't:

- **A name that appears in the Components panel**, so you can find, count and swap them.
- **Glue and cut-opening behavior** — windows and doors can stick to a wall face and cut a hole automatically.
- **Always face camera**, useful for 2D people and trees.
- **Smaller files.** SketchUp stores the geometry once, no matter how many instances exist.
- **Reuse across projects.** Save a component to a local collection or share it on 3D Warehouse.

## Side-by-side comparison

| | Group | Component |
|---|---|---|
| Copies linked? | No — each copy is independent | Yes — edit one, all update |
| Appears in Components panel | No | Yes, with a name |
| File size with many copies | Grows with each copy | Stored once |
| Glue to faces / cut openings | No | Yes |
| Can be saved and reused in other models | Not directly | Yes |
| Best for | One-off objects and temporary isolation | Anything repeated, or anything you might reuse |

## A simple rule of thumb

> If it appears more than once, or you might ever want it in another project, make it a component.

Many experienced modelers go further and make almost everything a component, because the naming alone makes large models easier to navigate and report on — cut-list extensions such as OpenCutList, for example, count components by name.

## Making one copy different: Make Unique

Sometimes you need nine identical windows and one that's wider. Right-click the odd one out and choose **Make Unique**. SketchUp creates a new definition for that instance, so edits to it no longer affect the others (and vice versa).

## Nesting: groups and components inside each other

You can place groups and components inside other groups and components. A cabinet component might contain door components, a drawer component and a carcass group. Nesting lets you:

- Move a whole assembly at once.
- Open it and edit just one part.
- Keep a clean hierarchy you can browse in the **Outliner** panel.

Keep nesting to a sensible depth. Three levels (building → room → furniture) is easy to work with; eight levels is a maze.

## Common mistakes

**Making components out of loose geometry that's still attached.** If the geometry you select is connected to other raw geometry, SketchUp will split faces unexpectedly. Group things as you go rather than at the end.

**Editing the wrong instance.** When you double-click into a component, other instances are shown too, and they update live. That's the feature, not a bug — use Make Unique first if you only want to change one.

**Exploding components to "fix" something.** Exploding throws away the link and the name, and often re-merges geometry with the surroundings. Open the component to edit instead.

**Scaling instead of editing.** Scaling a component instance from the outside stretches it without changing the definition, which can confuse cut lists and dynamic components. For real size changes, edit inside or make it unique.

**Not naming things.** "Component#37" is useless six months later. Name components when you create them.

## A 5-minute practice exercise

1. Draw a 450 × 450 mm square and push/pull it into a stool seat.
2. Draw one leg under it, select the leg, and press <kbd>G</kbd> to make it a component named "Stool leg".
3. Copy the leg to the other three corners with the Move tool while holding <kbd>Ctrl</kbd> (Windows) or <kbd>Option</kbd> (Mac).
4. Double-click one leg and taper it with the Scale tool. Watch all four update.
5. Select the seat and all legs and make them a group called "Stool". Copy the stool around the room.

You've just used components for repetition and a group for assembly — the pattern you'll use in almost every model.

## FAQ

### Do components make SketchUp faster?
Generally, yes. Because a component's geometry is stored once, a model with many repeated components is smaller than the same model built with many groups or loose geometry, which helps file size and load times.

### Can I convert a group into a component?
Yes. Right-click the group and choose **Make Component**. You can also select loose geometry in the group first and convert it.

### What's the difference between a component and a dynamic component?
A dynamic component is a regular component with added attributes and formulas — for example, a shelf that adds boards as you stretch it. Every dynamic component is a component, but not the other way round.

### Where do 3D Warehouse models come in?
Anything you download from 3D Warehouse arrives as a component, which is why you can place many copies without bloating your file.
