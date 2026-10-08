---
title: 'SketchUp for Beginners: The First 10 Tools to Master'
description: New to SketchUp? Learn the 10 essential tools, their default keyboard shortcuts, and a mini practice project that puts them together in about 20 minutes.
pubDate: 2026-09-28
updatedDate: 2026-09-28
category: tutorials
tags:
  - sketchup
  - beginners
  - tools
  - shortcuts
  - tutorial
draft: false
cover:
  src: ./images/pasted-image-1790686138983.png
  alt: Sketchup window displayed on laptop
sources:
  - title: Default Keyboard Shortcuts – SketchUp Help
    url: https://help.sketchup.com/en/default-keyboard-shortcuts
  - title: Softening, Smoothing, and Hiding Geometry – SketchUp Help
    url: https://help.sketchup.com/en/sketchup/softening-smoothing-and-hiding-geometry
aiAssisted: true
author: dana
beat: fundamentals
imageQuery: architect designing 3d model on laptop
topicId: sketchup-for-beginners
---

SketchUp looks like it has dozens of tools, but you can build a surprising amount with just ten. Learn these, memorize their default shortcuts, and finish the practice project at the end, and you will have the core workflow that every other SketchUp skill builds on.

The shortcuts below are SketchUp's defaults, taken from the official [Default Keyboard Shortcuts](https://help.sketchup.com/en/default-keyboard-shortcuts) page. You can change any of them in the shortcut settings, and they may differ slightly between versions or in SketchUp for Web.

## The core idea: draw 2D, pull to 3D

Almost everything in SketchUp starts the same way. You draw a flat shape (edges that close into a face), then push, pull, move or copy it into volume. The first ten tools are really about doing that loop quickly and accurately.

## Quick reference

| # | Tool | Shortcut | Best for |
|---|------|----------|----------|
| 1 | Select | <kbd>Space</kbd> | Choosing edges, faces, groups |
| 2 | Line | <kbd>L</kbd> | Drawing edges and closing faces |
| 3 | Rectangle | <kbd>R</kbd> | Fast, square-cornered faces |
| 4 | Push/Pull | <kbd>P</kbd> | Turning faces into 3D |
| 5 | Move | <kbd>M</kbd> | Moving and copying geometry |
| 6 | Rotate | <kbd>Q</kbd> | Turning objects around a point |
| 7 | Offset | <kbd>F</kbd> | Inset or outset copies of a face |
| 8 | Tape Measure | <kbd>T</kbd> | Guide lines and precise distances |
| 9 | Orbit / Pan / Zoom | <kbd>O</kbd> / <kbd>H</kbd> / <kbd>Z</kbd> | Navigating your model |
| 10 | Eraser | <kbd>E</kbd> | Deleting edges and cleaning up |

## 1. Select (<kbd>Space</kbd>)

The Select tool is your default. Click once to select an edge or face, double-click a face to select it plus its edges, and triple-click to select everything connected to it. Dragging a box left-to-right selects only what is fully inside the box; right-to-left also picks up anything the box touches.

Tip: press <kbd>Space</kbd> whenever you are unsure what tool is active. It is the fastest way to reset.

## 2. Line (<kbd>L</kbd>)

Click a start point, move in a direction, then either click again or type a length and press <kbd>Enter</kbd>. The colored inference lines (red, green, blue) tell you when you are parallel to an axis. When edges form a closed loop on one plane, SketchUp fills in a face automatically.

Common mistake: a face that will not appear usually means a tiny gap or edges that are not coplanar. Retrace the last edge to close it.

## 3. Rectangle (<kbd>R</kbd>)

Click one corner, drag to the opposite corner, and click. For exact sizes, type dimensions such as `3000,2000` and press <kbd>Enter</kbd> (units follow your template). The values appear in the Measurements box at the bottom right. You do not need to click in it; just start typing.

## 4. Push/Pull (<kbd>P</kbd>)

Click a face, move the cursor, and click again to extrude it. Type a number and press <kbd>Enter</kbd> for an exact depth. This one tool creates walls, slabs, blocks, and also cuts holes when you push a face back through a solid.

Tip: double-click a face with Push/Pull to repeat the last distance you used. This is great for making several identical steps or slabs.

## 5. Move (<kbd>M</kbd>)

Select an object, choose Move, click a base point, and click a destination. Two habits matter here:

- Pick a meaningful base point (a corner or midpoint) so placement is predictable.
- Use the arrow keys to lock the direction to an axis. The right arrow locks red, the left arrow green, and the up arrow blue.

Tap <kbd>Ctrl</kbd> (<kbd>Option</kbd> on Mac) after choosing Move to toggle copy mode, then type a distance and `x` plus a number, such as `5x`, to make multiple copies. Typing `/4` instead divides the distance into four equal copies.

## 6. Rotate (<kbd>Q</kbd>)

Rotate needs three clicks: the center point, the starting direction, and the ending angle. Type an angle and press <kbd>Enter</kbd> for precision. Like Move, it can copy when you toggle <kbd>Ctrl</kbd> (<kbd>Option</kbd> on Mac), which makes it ideal for arrays of chairs around a table.

## 7. Offset (<kbd>F</kbd>)

Offset creates a parallel copy of a face's edges, inside or outside the original. Use it for window frames, picture frames, borders and steps. Click the face, drag inward, type a distance, and press <kbd>Enter</kbd>. Follow it with Push/Pull to sink or raise the new inner face.

## 8. Tape Measure (<kbd>T</kbd>)

Despite the name, this tool is used mostly to place guide lines. Click an edge and drag away to create a guide at an exact distance, which you can type. Guides do not become geometry, so they are perfect for marking where a door or shelf should go before you draw it. Delete them via Edit > Delete Guides when you are done.

## 9. Orbit, Pan and Zoom (<kbd>O</kbd>, <kbd>H</kbd>, <kbd>Z</kbd>)

You will spend as much time navigating as modeling, so learn these early:

- **Orbit** (<kbd>O</kbd>): rotate your view around the model. With a three-button mouse, holding the middle button does this without switching tools.
- **Pan** (<kbd>H</kbd>): slide the view. Holding <kbd>Shift</kbd> with the middle button drag also pans.
- **Zoom** (<kbd>Z</kbd>): use the scroll wheel to zoom toward your cursor.
- **Zoom Extents** (<kbd>Shift</kbd>+<kbd>Z</kbd>): fit the whole model in view. This is the "I'm lost" button.

A real three-button mouse makes SketchUp far more comfortable than a trackpad. If you are shopping, [search for a 3D modeling mouse](https://www.amazon.com/s?k=3d+modeling+mouse) and look for a clickable wheel.

## 10. Eraser (<kbd>E</kbd>)

Click an edge to delete it, and any faces depending on that edge go with it. Hold <kbd>Shift</kbd> while erasing to hide edges instead of deleting them, or tap <kbd>Ctrl</kbd> (<kbd>Option</kbd> on Mac) to soften and smooth them, which is how you get rid of the faceted look on curved surfaces. To remove a face but keep its edges, select the face and press <kbd>Delete</kbd> instead.

## Mini practice project: a simple shed

This takes about 20 minutes and uses all ten tools.

1. Press <kbd>R</kbd> and draw a rectangle on the ground. Type `3000,2400` (or `10',8'` in feet) and press <kbd>Enter</kbd>.
2. Press <kbd>P</kbd>, click the rectangle, and type `2400` (or `8'`) to raise the box.
3. Use <kbd>O</kbd> and scroll to look at the front face.
4. Press <kbd>T</kbd>, click the bottom edge, and drag out a guide `300` (or `1'`) from the left edge, then another at `1200`. Do the same for a horizontal guide at `900`.
5. Press <kbd>R</kbd> and draw a door-sized rectangle snapped to those guides.
6. Press <kbd>F</kbd>, click the door face, and offset inward by `50`. Press <kbd>P</kbd> and push the inner panel back a little to form a recess.
7. Press <kbd>L</kbd> and draw a line across the top from the midpoint of one side to the midpoint of the other on the end wall, then use <kbd>M</kbd> to lift the ridge to form a pitched roof.
8. Use <kbd>Q</kbd> to rotate a copy of a small box (a crate) beside the shed to practice copying and angles.
9. Press <kbd>E</kbd> to remove stray edges, then <kbd>Shift</kbd>+<kbd>Z</kbd> to view the whole model.

Save early, and save often.

## What to learn next

Once these feel automatic, add the Scale tool (<kbd>S</kbd>), the Paint Bucket (<kbd>B</kbd>), and Follow Me for moldings and curved profiles. After that, learn groups and components, since they keep your model organized and prevent geometry from sticking together.

## FAQ

### What are the most important SketchUp tools for beginners?

Line, Rectangle, Push/Pull and Move do most of the work. Add Select, Orbit, Offset, Tape Measure and Eraser, and you can model furniture, rooms and small buildings.

### How long does it take to learn SketchUp?

Most people can build simple objects within a few hours. Feeling fast and comfortable with inferences, groups and components usually takes a few weeks of regular practice.

### Do I need to memorize the keyboard shortcuts?

No, but the ones for Select, Line, Rectangle, Push/Pull and Move pay off quickly. You can also customize shortcuts to fit your habits.

### Why won't my shape turn into a face?

The edges probably have a gap or do not lie on the same plane. Zoom in on the corners, redraw the last edge, or use the Line tool to close the shape.

*SketchUp and 3D Warehouse are trademarks of Trimble. This site is not affiliated with Trimble.*
