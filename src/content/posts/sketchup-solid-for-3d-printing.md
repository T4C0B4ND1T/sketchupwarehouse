---
title: How to Make a SketchUp Model Solid for 3D Printing
description: "Make a SketchUp solid for 3D printing: check Entity Info, find holes and stray edges with Solid Inspector, fix face direction, and export a clean STL."
pubDate: 2026-11-09
category: tutorials
tags:
  - 3d printing
  - solid
  - stl
  - solid inspector
  - troubleshooting
aiAssisted: true
author: dana
beat: fix-it
topicId: sketchup-solid-for-3d-printing
imageQuery: 3D printer printing small model
sources:
  - title: 3D Printing a Model – SketchUp Help
    url: https://help.sketchup.com/en/sketchup/3d-printing-model
  - title: Importing and Exporting STL Files for 3D Printing – SketchUp Help
    url: https://help.sketchup.com/en/sketchup/importing-and-exporting-stl-files-3d-printing
  - title: Solid Inspector – SketchUp for Web Help
    url: https://help.sketchup.com/en/sketchup-web-solid-inspector
  - title: Modeling Complex 3D Shapes with the Solid Tools – SketchUp Help
    url: https://help.sketchup.com/en/sketchup/modeling-complex-3d-shapes-solid-tools
cover:
  src: ./images/sketchup-solid-for-3d-printing.jpg
  alt: Detailed view of a 3D printer, highlighting the printing process and technological innovation.
  credit: Jakub Zerdzicki
  creditUrl: https://www.pexels.com/photo/close-up-of-3d-printer-in-action-33977799/
  pexelsId: 33977799
---

If you exported an STL straight from a model that looks fine on screen and your slicer complained, the likely mistake is that the geometry was never solid. A printer needs a closed, watertight volume, and SketchUp will happily let you draw something that only looks like one.

The fix is a short routine: put the geometry in a group or component, check that SketchUp calls it solid, repair whatever blocks that, and then export. This article walks through each step.

## What "solid" means in SketchUp

SketchUp's help defines a solid as a group or component with a finite, closed volume and no leaks. A leak is a missing face, or faces that do not meet at a shared edge. Printers slice the model into layers, so any gap leaves the slicer unsure what is inside and what is outside.

The official 3D printing page lists four things to get right before export:

- **Orientation:** the printer builds layer by layer, so the part needs a base to sit on.
- **Solid group or component:** the geometry must be solid.
- **Face direction:** fronts point outward, backs point inward.
- **Volume:** a hollow box needs walls with real thickness, not single faces.

## Step 1: Put the part in a group or component

Solid status is reported for groups and components, not for loose geometry. Loose edges and faces also stick to each other, which makes later repairs messier. If you need a refresher, see [groups vs components](/blog/sketchup-groups-vs-components/).

1. Select everything that belongs to the part.
2. Right-click and choose **Make Group** (or **Make Component**).
3. Name it in Entity Info so you can find it later.

Make one group per physical part. Parts that print separately should be separate objects.

## Step 2: Check Entity Info

1. Select the group or component.
2. Choose **Window > Entity Info**.
3. Look at the upper-left corner of the window. It states whether the selection is a solid group or component.

If it says solid, your first check has passed. It is a good sign, not a guarantee, so still do the face direction check below. If it does not say solid, move on to the repairs.

## Step 3: Find the problem

### Desktop SketchUp: Solid Inspector 2

The official help page points desktop users to the free **Solid Inspector 2** extension by Thomas Thomassen. Install it from **Window > Extension Warehouse**: search for it and click the red **Install** button. It finds the reasons a group or component is not solid and can repair many of them, including reversed faces. For installing and updating extensions in general, see [how to manage SketchUp extensions](/blog/how-to-manage-update-and-uninstall-sketchup-extensions/).

### SketchUp for Web: built-in Solid Inspector

SketchUp for Web has a Solid Inspector in the panels on the right side of the interface. The help page describes this flow:

1. Activate Solid Inspector. It asks for a group or component and will not work on other selections.
2. Select your group or component.
3. Click **Run Inspection**.
4. Review the listed issues. Problem areas are highlighted in red in the model.
5. Select an error in the panel to zoom to its location.

The help page says it can automatically fix reversed faces, stray edges and holes in a face. Border holes, nested groups or components, image entities and short edges need manual fixes. The page does not say which plans include the tool, so check your own account.

## Step 4: Fix what it found

### Stray edges and internal geometry

A stray edge is an edge that is not part of a face boundary, and internal geometry is anything hidden inside the volume. Both stop a group from being solid. Open the group, turn on **View > Hidden Geometry** if you suspect hidden edges, and delete the extra edges or faces inside. Solid Inspector will zoom you to each one.

### Holes in a face and missing faces

A hole usually means one face is missing or an edge is slightly off the plane of its neighbors. Redraw an edge across the opening so SketchUp creates the face, or trace over a boundary edge with the Line tool. If the face refuses to appear, the edges around it are probably not coplanar. Check the corners where it fails.

### Reversed faces

Fronts must point outward. To check, choose **View > Face Style > Monochrome**. By default fronts are white and backs are dark gray, so any gray face on the outside is reversed. Right-click it and choose **Reverse Faces**. There is more detail in [how to fix reversed faces](/blog/sketchup-reversed-faces/).

### Overlapping parts

If two solids overlap, combining them cleanly matters. The Solid Tools help page notes that Outer Shell keeps only external faces, while Union can keep internal geometry. Solid Tools are described on the help page for SketchUp Pro, so confirm your edition before relying on them. For a single printed object made of overlapping pieces, Outer Shell is the better fit.

### Where it goes wrong

- **Explode-and-forget.** You exploded a group to edit it and the geometry merged with something nearby. Undo, and edit inside the group instead.
- **Thin surfaces.** A face with no thickness is not a volume. Use Push/Pull to give it walls.
- **Downloaded models.** Warehouse models are often built for rendering, with extra faces and nested groups. See [how to find, download and clean up 3D Warehouse models](/blog/3d-warehouse-sketchup-download/) before you print one.

## Step 5: Check units and export the STL

1. Open **Window > Model Info > Units** and confirm the model's units.
2. Select the part if you only want one object.
3. Choose **File > Export > 3D Model**.
4. Set the file type to **STereolithography File (.stl)**. This is the Save As Type list on Windows and the Format list on macOS.
5. Click **Options** and choose your settings, then **OK**.
6. Click **Export**.

The export options, per the help page:

| Option | What it does |
|---|---|
| Export Only Current Selection | Exports just the selected geometry, useful for parts that print separately |
| File Format | Binary (default) or ASCII; binary is recommended because the file is smaller |
| Swap YZ Coordinates | Off by default; when on, Y becomes the vertical axis instead of Z |
| STL Units | Defaults to the model's units; choose meters, centimeters, millimeters, feet or inches |

Set STL Units to match what your slicer expects. Millimeters are the common choice, but check your slicer's import settings. A part that arrives 25.4 times too big or small is almost always a units mismatch.

The help page does not state which SketchUp editions include STL export, so check your version if the option is missing.

## Practice drill

Spend five minutes on this:

1. Draw a 40 mm cube with the Rectangle and Push/Pull tools.
2. Make it a group and confirm Entity Info says solid.
3. Open the group, draw a stray line across one face, and then erase a single edge of the cube so a face disappears. Close the group.
4. Check Entity Info again. It should no longer report a solid.
5. Run Solid Inspector (extension on desktop, built-in on Web) and read what it reports.
6. Repair it, confirm it is solid again, and export the part as a binary STL in millimeters.
7. Open the STL in your slicer and check that the size reads 40 mm.

## FAQ

### Why does SketchUp say my group is not solid?

Something breaks the closed volume: a missing face, a stray edge, internal geometry, a nested group, or an edge that does not meet its neighbor. Solid Inspector shows where.

### Does a model marked solid always print?

No. Solid is necessary but not sufficient. You also need correct face direction, real wall thickness and a stable base. Community discussions note that face orientation and intersecting volumes are common leftover problems.

### Can I export several parts at once?

Yes, but separate files are often easier. Select one part at a time and enable Export Only Current Selection, so each part becomes its own STL.

### Which units should I use for STL export?

Use the units your slicer expects, usually millimeters. STL Units defaults to your model's units, and you can change it in the export options.
