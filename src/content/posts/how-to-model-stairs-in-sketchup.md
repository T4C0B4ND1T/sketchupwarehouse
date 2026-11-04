---
title: "How to Model Stairs in SketchUp: Straight Run with Arrays"
description: "Learn how to model stairs in SketchUp: work out code-friendly rise and run, build one tread, then use the Move tool's array to copy a straight flight."
pubDate: 2026-11-02
category: tutorials
tags:
  - stairs
  - move tool
  - arrays
  - modeling
  - tutorial
aiAssisted: true
author: dana
beat: build-along
topicId: how-to-model-stairs-in-sketchup
imageQuery: wooden staircase interior home
sources:
  - title: Copying What You've Already Drawn – SketchUp Help
    url: https://help.sketchup.com/en/article/3000092
  - title: Using the Measurements Box – SketchUp Help
    url: https://help.sketchup.com/en/using-measurements-box
  - title: Tread Depth and Risers – Viewrail stair code guide
    url: https://resources.viewrail.com/code-compliance/stair-code/tread-depth-and-risers
  - title: 2018 Residential Stair Guide (IRC R311.7.5)
    url: https://timnath.org/wp-content/uploads/2022/03/2018-RESIDENTIAL-STAIR-GUIDE.pdf
cover:
  src: ./images/how-to-model-stairs-in-sketchup.jpg
  alt: A beautifully designed spiral staircase with marble steps and wooden panels, showcasing architectural elegance.
  credit: Mehmet Turgut  Kirkgoz
  creditUrl: https://www.pexels.com/photo/elegant-spiral-staircase-with-wooden-panels-40211701/
  pexelsId: 40211701
---

Most people model stairs by drawing every step by hand and nudging the last few until the top lines up with the floor. The fix is to do the arithmetic first, build one step, and let SketchUp's Move tool array copy it. This article covers a straight run, with rise and run that stay inside typical residential code limits.

## Start with the numbers, not the geometry

Two figures drive a straight stair: the total rise (floor to floor) and the riser height. Divide one by the other and you get the number of risers, which must be a whole number. That is why a stair modeled by eye never closes cleanly at the top.

For the US residential examples below, the model code (IRC R311.7.5) sets a maximum riser of 7¾ in and a minimum tread of 10 in, and says the tallest riser in a flight may not exceed the shortest by more than ⅜ in. Commercial stairs under the IBC are stricter (7 in maximum riser, 11 in minimum tread). Local amendments and adopted editions differ, so check your own jurisdiction before you draw to these numbers. Also note that a tread minimum may be measured with or without nosing, which changes what you draw.

### A worked example

Say the floor-to-floor height is 108 in (9 ft).

1. Pick a target riser near 7 in: 108 ÷ 7 ≈ 15.4. Round up to **14 risers**, because 15 would give a 7.2 in riser and 13 would give 8.3 in, which is over the limit.
2. Actual riser = 108 ÷ 14 = **7.714 in**, under the 7¾ in maximum.
3. A flight always has one fewer tread than risers, because the top floor acts as the last tread. So you need **13 treads**.
4. Choose a tread depth of 10 in. Total run = 13 × 10 = **130 in**.

A common rule of thumb pairs a comfortable stair with riser plus tread values in a familiar range, but treat that as design preference, not code.

## Set up the model

Work in a new file with units set to Architectural (inches) under Window > Model Info > Units. Sort out units first, because the Measurements box interprets typed numbers in the current unit.

Draw the stair in its own space, and wrap each finished part in a group or component as you go. If you are unsure which to use, read [groups vs components](/blog/sketchup-groups-vs-components/) first. For this stair, a component is the better choice: it lets you change the tread once and have every copy update.

## Build one tread

1. Use the Rectangle tool (<kbd>R</kbd>) on the ground plane. Type `10,36` and press <kbd>Enter</kbd> for a tread 10 in deep and 36 in wide. The width is only an example; use the width your design needs. If your system uses a different list separator, SketchUp expects that one.
2. Select the Push/Pull tool (<kbd>P</kbd>), click the face, and type `1.5` for a 1½ in thick slab.
3. Triple-click the slab to select all of it, right-click and choose Make Component. Name it "Tread".
4. Raise the slab to its first position. With the Move tool (<kbd>M</kbd>), pull it up along the blue axis and type `7.714` before pressing <kbd>Enter</kbd>. The top face of tread 1 now sits one riser above the floor.

The rule behind that last step: the top of every tread is a whole number of risers above the floor, so tread 1 is 1 × 7.714 in, tread 2 is 2 × 7.714 in, and so on.

## Copy the tread with an array

The Move tool makes copies when you toggle copy mode with <kbd>Ctrl</kbd> on Windows or <kbd>Option</kbd> on macOS; a plus sign appears beside the cursor. After the first copy, typing a number and `x` creates a linear array, as described in the SketchUp Help Center page on copying.

Each copy needs to move 10 in along one axis and 7.714 in along another, which a single typed length cannot do. The easiest way is to give the Move tool a reference to snap to.

1. In a side view, draw a helper rectangle on the red-blue plane that is 10 in wide and 7.714 in tall. Its opposite corners are exactly one step's run and rise apart.
2. Select the Tread component and activate the Move tool.
3. Press <kbd>Ctrl</kbd> (Windows) or <kbd>Option</kbd> (macOS) once so the plus sign appears.
4. Click the lower-left corner of the helper rectangle as the start point, then click its upper-right corner as the end point. SketchUp places the first copy one run and one rise away.
5. Without clicking again, type `12x` and press <kbd>Enter</kbd>. SketchUp repeats the copy, and you now have the original plus 12 more.

That makes 13 treads in total. The Help Center describes typing a number with `x` (or `*`) as spacing each copy at the same distance from the previous one, while a number with `/` divides the gap between the original and the first copy. For a stair you want the `x` version, because the offset is fixed by your code numbers.

Delete the helper rectangle afterward. If you press the copy key a second time before typing, Move switches into Stamp mode instead, and you would need to start the copy again.

### Add the structure underneath

Floating treads are fine for a preview, but most stairs need a support. A simple way to model one:

1. Go to a side view and draw the sloped line from the front-bottom edge of tread 1 up to the top of tread 13.
2. Offset or draw the stringer profile down from that line by the depth of your stringer, close the shape, and Push/Pull it to the stringer thickness.
3. Group it, name it "Stringer", and copy it to the other side of the stair.

Put the stringers, treads and handrail on separate tags so you can hide each one. The [tags article](/blog/sketchup-tags-layers/) explains how to set that up cleanly.

### Where it goes wrong

- **The top tread does not meet the floor.** Usually the riser count and tread count are off by one. Check that you copied 12 times to get 13 treads, and that the final riser (from tread 13 to the upper floor) is the same 7.714 in. Fix it by comparing the top of tread 13 with the upper floor's height minus one riser.
- **Typing `12x` gives "Invalid length entered" or does nothing.** The array only works right after a copy move and before you start another action. Put the number first, then `x`. If you clicked elsewhere, undo and repeat the copy step.
- **Treads are the wrong size in a bigger model.** Typed values are read in the current model units. If you see tiny or huge steps, check the unit settings and whether you meant inches or millimeters. Also confirm the component is not scaled; reset it with right-click > Reset Scale if it is.

## Adjust later without redrawing

Because the treads are copies of one component, edit one tread and all update. If the floor-to-floor height changes, recalculate the riser, update the helper rectangle, and delete and redo the array. Keeping the arithmetic in a note on the model, or a text label, makes this quick.

If you need to bring the finished model into other software later, keep the stair as a clean group of components. The [SketchUp to Revit workflow article](/blog/how-to-get-a-sketchup-model-into-revit-and-keep-it-clean/) covers why tidy structure matters on export.

## Practice drill

Take five minutes and model a stair for a 96 in floor-to-floor height. Work out the number of risers with a target riser near 7 in, then the exact riser height and the total run for a 10 in tread. Build one tread as a component, raise it by one riser, and array 12 more or however many your numbers call for. When you finish, check that the last tread top sits exactly one riser below the 96 in line. If it does, your arithmetic is sound.

## FAQ

### How do I make stairs in SketchUp quickly?

Calculate the riser height from the floor-to-floor height, build one tread as a component, then use the Move tool's copy mode and a number followed by `x` to repeat it. That is faster and more accurate than drawing each step.

### What is a good riser and tread size for stairs?

For US residential work, the IRC allows a maximum riser of 7¾ in and requires a minimum tread of 10 in. Commercial stairs under the IBC use 7 in and 11 in. Your local code may amend these, so confirm with your building department.

### Why does the Move tool array not work?

The `x` multiplier only applies right after you finish a copy move. Make sure copy mode is on (<kbd>Ctrl</kbd> on Windows, <kbd>Option</kbd> on macOS), complete one copy, and type the number then `x` before doing anything else.

### Can I model curved or L-shaped stairs the same way?

Straight runs are the simplest case. An L-shaped stair can be built as two straight flights plus a landing using the same method. Curved stairs need rotated copies instead and are a separate topic.
