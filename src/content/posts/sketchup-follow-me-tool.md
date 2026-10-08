---
title: "How to Use the SketchUp Follow Me Tool: Moldings, Pipes, Lathes"
description: "Learn the SketchUp Follow Me tool step by step: model crown molding, pipes and lathed shapes like vases, and fix faceted curves and failed extrusions."
pubDate: 2026-10-07
category: tutorials
tags:
  - follow me
  - modeling
  - molding
  - lathe
  - beginner
aiAssisted: true
author: dana
beat: fundamentals
topicId: sketchup-follow-me-tool
imageQuery: carpenter installing crown molding ceiling
sources:
  - title: Extruding with Follow Me - SketchUp Help
    url: https://help.sketchup.com/en/sketchup/extruding-follow-me
  - title: Follow Me Tool - SketchUp for iPad Help
    url: https://help.sketchup.com/en/sketchup-ipad/follow-me-tool
  - title: Change the number of segments in an arc or a circle - SketchUp Community
    url: https://forums.sketchup.com/t/change-the-number-of-segments-in-an-arc-or-a-circle/201259
  - title: Advanced follow me tool? - SketchUcation
    url: https://community.sketchucation.com/post/1032232
cover:
  src: ./images/sketchup-follow-me-tool.jpg
  alt: Bright white ceiling with a single hanging light bulb highlighting minimal interior design.
  credit: La Miko
  creditUrl: https://www.pexels.com/photo/photo-of-white-painted-ceiling-3615726/
  pexelsId: 3615726
---

The Follow Me tool extrudes a flat face along a path of connected edges. Use it for anything with a constant cross-section that runs along a line or around a perimeter: crown molding, baseboards, gutters, pipes and handrails. It also builds lathed shapes such as spindles, bowls and vases.

You'll find it on the Tools menu, the Edit toolbar and the Large Tool Set. On macOS it's also in the Tool palette. The workflow is always the same: draw a profile, define a path, then run the profile along it.

## How Follow Me works

You need two things:

- **A profile:** a closed face that is roughly perpendicular to the path. It doesn't have to touch the path.
- **A path:** a continuous run of edges, such as a line, an arc, a rectangle's outline or a circle.

Follow Me sweeps the profile along the path and builds new geometry. If you need a refresher on the basics first, see [SketchUp for Beginners: The First 10 Tools to Master](/blog/sketchup-for-beginners/).

One rule catches many people. According to the Help Center, the path and the profile must be in the same group or component, so edit that context before you start. Groups and components behave differently here, and [groups vs components](/blog/sketchup-groups-vs-components/) explains why.

## Method 1: Preselect the path

This is the most predictable method, and the one I use for most work.

1. Draw the profile on its own face. Delete any leftover edges so the profile is a clean, closed shape perpendicular to the path.
2. Choose the Select tool and select every edge of the path. Double-click or triple-click an edge to grab connected edges quickly.
3. Activate Follow Me. The path stays selected.
4. Click the profile face. SketchUp extrudes it along the whole path.

## Method 2: Draw it by hand

Use this when you want to choose the direction yourself.

1. Draw a profile perpendicular to the path.
2. Activate Follow Me.
3. Click the profile face, then drag along the path. The path highlights in red as your pointer touches it.
4. Click at the end of the path to finish, or press <kbd>Esc</kbd> to cancel and start over.

The Help Center notes that if the first edge of the path doesn't touch the profile, the extrusion starts at that edge instead.

The SketchUcation forum describes a shortcut: hold <kbd>Alt</kbd> and click a face, and Follow Me follows all of that face's edges. I couldn't find this in the official documentation, and it may vary by version and platform. Test it on a scrap shape before you rely on it.

## Model crown molding or a baseboard

1. Draw a rectangle or the room outline as the path. For molding on an existing room, use the top edges of the walls.
2. Zoom into a corner and draw the molding profile on a face at the corner. Use the Line and Arc tools, and make it a closed shape.
3. Select the path edges you want the molding to follow.
4. Activate Follow Me and click the profile.

Corners are mitered automatically, so you get clean joints without cutting anything.

If the molding comes out inside the wall or ceiling, your profile was drawn on the wrong side of the corner. Undo, redraw the profile so it sits where the molding should appear, and run it again.

## Model a pipe or railing

A pipe is a circular profile following a line-and-arc path.

1. Draw the path with the Line tool, and add the Arc tool for bends.
2. At one end, draw a circle perpendicular to the path. To make a hollow pipe, draw a smaller circle inside it and delete the inner face.
3. Select the path, activate Follow Me and click the ring or circle face.

For a hollow pipe, follow the ring face, not the inner circle. If the extrusion fails, check that the path edges are connected with no gaps.

## Make lathed shapes: vases, bowls, spindles

Follow Me can spin a profile around a circle, which acts as the path.

1. Draw a circle with the Circle tool. This is your path.
2. Draw half of the cross-section with the Line, Arc or Freehand tool. It must form a closed face, sit perpendicular to the circle, and have its bottom edge aligned with the circle's center point.
3. Select the circle's edge with the Select tool.
4. Activate Follow Me and click the cross-section face.

Complex profiles can take a few seconds to process. Once it's done, delete the leftover circle and the original profile face if they remain.

## Fix faceting on round forms

Faceting means a smooth shape shows flat bands or visible edges. SketchUp builds circles and arcs from straight segments, so a lathed vase made from a low-segment circle looks like a many-sided prism. Two fixes work together.

### Increase the segments before you extrude

A circle has 24 sides by default. Select the Circle tool, type a larger number such as `48` or `64`, and press <kbd>Enter</kbd> before you click to place it. The same works for arcs. According to forum threads, the setting resets to the default in a new session, so enter it each time.

You can also change an existing circle: select only the circle's edge and edit the segment count in Entity Info. This stops working once the circle becomes part of a 3D shape, so change it before running Follow Me.

Don't overdo it. Very high segment counts add geometry and slow the model down, as covered in [why your SketchUp model is slow](/blog/sketchup-slow-model-file-size/). For a lathed object seen at normal distance, a moderate count usually looks fine.

### Smooth the shading

Segments still show as lines until you hide or soften the edges. Select the curved surface and use Soften Edges (in Entity Info or the Soften Edges panel in the Default Tray) to smooth the shading. The Eraser can do the same: hold <kbd>Ctrl</kbd> (<kbd>Option</kbd> on Mac) while erasing to soften and smooth, whereas <kbd>Shift</kbd> only hides edges. Check the Eraser's Help Center page if you want to confirm for your version.

## Troubleshooting Follow Me

| Problem | Likely cause | Fix |
|---|---|---|
| Nothing happens, or the extrusion is partial | Gap in the path or the profile | Zoom in, find the gap and close it with the Line tool |
| Lathe comes out wrong | Profile isn't perpendicular to the circle | Orbit around and check the angle |
| Profile won't extrude | Path and profile are in different groups | Move both into the same group or component |
| Result is twisted or flipped | Profile not perpendicular to the path | Redraw the profile square to the path |
| Extra faces left over | The original profile remains | Delete the leftover profile and path edges |

## FAQ

### Can Follow Me work on any path?

It works on continuous connected edges, including lines, arcs, curves and circles. If the path has gaps, close them first.

### Does Follow Me work in SketchUp for iPad?

Yes. It has no optional tool modes on iPad. It works best if you preselect both the face and the path, and you can draw along the path with a pencil or click-move-click with a mouse.

### Why is my profile not following the whole path?

Usually there is a gap in the path, or the path wasn't fully selected. Select every edge before activating the tool.

### How do I make a smooth sphere or bowl?

Draw a circle with a higher segment count, draw a half profile aligned to the circle's center, and follow the circle with the profile. Then soften the edges to hide the facets.
