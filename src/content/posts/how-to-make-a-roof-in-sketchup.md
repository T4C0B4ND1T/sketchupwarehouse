---
title: "How to Make a Roof in SketchUp: Gable, Hip and Shed"
description: "Learn how to make a roof in SketchUp with native tools: build gable, hip and shed roofs step by step, fix common errors, and see when a roof extension helps."
pubDate: 2026-11-24
category: tutorials
tags:
  - roof
  - modeling
  - gable roof
  - hip roof
  - shed roof
  - extensions
aiAssisted: true
author: dana
beat: build-along
topicId: how-to-make-a-roof-in-sketchup
imageQuery: house roof framing construction
sources:
  - title: Modeling Specific Shapes, Objects, and Building Features in 3D (SketchUp Help)
    url: https://help.sketchup.com/en/sketchup/modeling-specific-shapes-objects-and-building-features-3d
  - title: Moving Entities Around (SketchUp Help)
    url: https://help.sketchup.com/en/sketchup/moving-entities-around
  - title: Pushing and Pulling Shapes into 3D (SketchUp Help)
    url: https://help.sketchup.com/en/sketchup/pushing-and-pulling-shapes-3d
  - title: Default Keyboard Shortcuts (SketchUp Help)
    url: https://help.sketchup.com/en/default-keyboard-shortcuts
  - title: Instant Roof, instant productivity (SketchUp blog)
    url: https://sketchup.trimble.com/en/blog/article/instant-roof-instant-productivity
  - title: TIG Roof (Sketchucation Plugin Store)
    url: https://sketchucation.com/pluginstore?pln=Roof
cover:
  src: ./images/how-to-make-a-roof-in-sketchup.jpg
  alt: Wooden roof structure in progress with open sky view, ideal for construction themes.
  credit: Saeed Khokhar
  creditUrl: https://www.pexels.com/photo/wooden-frame-of-roof-on-concrete-building-8491085/
  pexelsId: 8491085
---

If your roofs keep coming out as stacked boxes, or as a pile of triangles you can't edit, you are probably building the roof as a separate object instead of raising it out of the building's top face. The fix is to keep the roof attached to the walls' outline and move a single edge, because SketchUp does the rest of the geometry for you.

Below are the three common roof forms, gable, hip and shed, built with native tools. At the end there is a short section on when a roof extension is worth installing.

## Before you start: set up the footprint

Every method here starts from a flat, closed face at the top of your walls. Work inside a group so the roof does not stick to the walls you have already built. If you are unsure how grouping works, see [groups vs components](/blog/sketchup-groups-vs-components/).

1. Draw the building outline with the Rectangle tool (<kbd>R</kbd>).
2. Pull the walls up with Push/Pull (<kbd>P</kbd>): click the face, move the cursor, and type the height. The Measurements box shows the distance as you go.
3. Decide on an overhang. With the Offset tool (<kbd>F</kbd>), offset the top face outward by the eave depth and type the distance. This gives the roof its own outline, slightly larger than the walls.

Putting the overhang in first matters. If you add it after the ridge is raised, the slopes change.

A note on pitch: pitch is rise over run. A 6:12 roof rises 6 units for every 12 units of horizontal run. For a gable, the run is half the building width, so the ridge height is half the width multiplied by the pitch fraction. Work that number out first and type it in, instead of dragging by eye.

## How to make a gable roof

A gable roof has two slopes meeting at a ridge, with a triangular wall at each end.

1. Select the top face and make it a separate group or component, so edits stay contained.
2. Open the group. With the Line tool (<kbd>L</kbd>), draw a line between the midpoints of the two short ends. SketchUp's midpoint inference appears when you hover over an edge, which makes this line land exactly in the centre.
3. Switch to the Move tool (<kbd>M</kbd>) and click the ridge line. Click once to pick it up, then move straight up the blue axis. Hold <kbd>Shift</kbd> once the move line turns blue to lock to the axis, or use the arrow keys, as described on the Moving Entities Around help page.
4. Type the ridge height you calculated and press <kbd>Enter</kbd>.

The two roof planes now slope down to the eaves, and the end walls come up into gable triangles. The Move tool accepts a typed signed distance, so a negative value moves the ridge down.

### Where it goes wrong

- **The roof is flat or only one plane moves.** You did not draw the ridge line fully from edge to edge, so the face was never split. Undo, redraw the line so it touches both midpoints, and check that both halves are separate faces.
- **The ridge slides sideways.** You moved without an axis lock. Press the Shift or arrow key lock before you type the height.
- **You cannot select the roof edge.** It is inside a group you have not opened. Double-click the group to edit it first.

## How to make a hip roof

A hip roof slopes on all four sides. For a square building it is a pyramid, and the official SketchUp help describes exactly that method: draw a square, draw both diagonals to find the centre, then use the Move tool on the centre point and raise it along the blue axis. Holding the <kbd>Up Arrow</kbd> locks the move to vertical.

For a rectangular building you need a ridge, not a point:

1. Draw a line down the centre of the roof face, from the midpoint of one short end to the midpoint of the other.
2. Create guide lines parallel to each short end at a distance of half the building width. The Tape Measure tool creates guides.
3. Trace the ridge: draw a line along the centreline between the two points where the guides cross it. This is the ridge. Delete the leftover centreline segments at each end.
4. Draw lines from each corner of the roof outline to the nearest end of the ridge. These are the hips, and they run at 45 degrees in plan, which gives equal slopes on every side.
5. Erase stray guides, then use Move to raise the ridge along the blue axis by the calculated height.

If the four faces do not look flat, check that the hip lines meet the ridge ends exactly. A line that misses by a hair leaves a face split into slivers.

### Where it goes wrong

- **Faces are blue or look inside-out.** You flipped a face when drawing over it. Follow the steps in [how to fix reversed faces](/blog/sketchup-reversed-faces/).
- **The hips are not at 45 degrees.** The guide distance was not half the width. Delete the guides and re-measure.

## How to make a shed roof

A shed roof is one sloping plane, the simplest of the three.

1. Draw the roof outline on top of the walls, grouped.
2. Select one long edge of the top face with the Select tool (<kbd>Spacebar</kbd>).
3. With Move (<kbd>M</kbd>), pick up that edge and raise it along the blue axis. Type the rise, such as the full width multiplied by the pitch fraction, and press <kbd>Enter</kbd>.

The wall ends beneath the slope become trapezoids once you extend them. If a wall face does not follow the roof, redraw one line across the wall to split it, then erase the face above the roof line.

### Where it goes wrong

- **Walls and roof are one object.** Raising the edge drags the wall faces along with it. Keep the roof in its own group before moving anything.
- **The roof is not planar.** You moved a single corner instead of a full edge. Undo and select the entire edge.

## Using a roof extension

Native tools are enough for most simple roofs, and I'd learn them first because they teach you how the geometry behaves. For complex plans with many wings and valleys, an extension saves a lot of time.

| Extension | Roof types | Where to get it | Notes |
| --- | --- | --- | --- |
| Instant Roof | Hip, gable, shed, trellis | SketchUp extension listing | Free version available; Pro adds more slopes and is priced at US$39 per year according to the SketchUp blog |
| TIG Roof | Roofs with adjustable parameters | Sketchucation Plugin Store | Listed in the Sketchucation store; check the listing for current version support |

Instant Roof is by Chuck Vali. According to the SketchUp blog, you select a face and choose **Extensions > Instant Roof > Make Roof**. Selecting one edge adds a gable, two edges put gables on both ends, and three edges give a shed. Check the extension's listing for the SketchUp versions it supports before installing.

For installing and removing these safely, see [how to manage, update and uninstall extensions](/blog/how-to-manage-update-and-uninstall-sketchup-extensions/).

## Practice drill

Give yourself five minutes. Draw a 20 ft by 30 ft rectangle and pull it up 10 ft. Group the top face, then build a 6:12 gable roof by typing the ridge height. Undo it and build a shed roof from the same face. Finally, rebuild it as a hip roof using guide lines. Name each group (Roof-Gable, Roof-Shed, Roof-Hip) as you go.

## FAQ

### What is the easiest way to make a roof in SketchUp?

For a single slope or a simple gable, draw the ridge line on the top face, then raise it with the Move tool. Type the height so the pitch is exact.

### How do I set a roof pitch in SketchUp?

Calculate the rise from the run and the pitch fraction, then type that number while moving the ridge or edge. SketchUp has no built-in pitch field for this method.

### Can I make a roof in SketchUp Free or the web version?

The Move, Line and Offset methods are standard modeling tools, though extension availability differs by edition. Check your edition's extension support before relying on a plugin.

### Which roof extension should I use?

Instant Roof is a good place to start because it has a free version and covers gable, hip and shed. TIG Roof is an alternative from the Sketchucation store. For more places to look, see [where to download SketchUp plugins](/blog/where-to-find-sketchup-plugins-extension-warehouse-vs-sketchucation-and-others/).
