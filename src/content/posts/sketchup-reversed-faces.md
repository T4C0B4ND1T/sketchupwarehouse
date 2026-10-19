---
title: How to Fix Reversed Faces in SketchUp (Blue Faces, Fast)
description: Blue faces in SketchUp can break renders and 3D prints. Learn what reversed faces are, how to fix them with Reverse and Orient Faces, and how to check solids.
pubDate: 2026-10-19
category: tutorials
tags:
  - reversed faces
  - face orientation
  - 3d printing
  - rendering
  - troubleshooting
aiAssisted: true
author: dana
beat: fix-it
topicId: sketchup-reversed-faces
imageQuery: 3D printer printing model workshop
sources:
  - title: Orienting faces – SketchUp Help Center
    url: https://help.sketchup.com/en/3d-warehouse/orienting-faces
  - title: Modeling Complex 3D Shapes with the Solid Tools – SketchUp Help Center
    url: https://help.sketchup.com/en/sketchup/modeling-complex-3d-shapes-solid-tools
  - title: Only back half of object is printing – SketchUp Forum
    url: https://forums.sketchup.com/t/only-back-half-of-object-is-printing/37293
  - title: Solid Inspector² thinks faces are reversed when they are not – SketchUp Forum
    url: https://forums.sketchup.com/t/solid-inspector-thinks-faces-are-reversed-when-they-are-not/181865
cover:
  src: ./images/sketchup-reversed-faces.jpg
  alt: A close-up shot of a 3D printer in a vibrant and modern workshop environment.
  credit: Jakub Zerdzicki
  creditUrl: https://www.pexels.com/photo/high-tech-3d-printer-in-modern-workshop-30482193/
  pexelsId: 30482193
---

If you are leaving blue faces in a model because "it looks fine with the textures on," that is the mistake to fix first. Blue means you are looking at the back of a face, and that can cause gaps in color, trouble in rendering software and failed 3D prints. The fix is quick: find the backward faces, flip them, and build the habit of checking orientation before you export.

## What reversed faces are

Every SketchUp face has two sides. By default, the front side is white and the back side is blue. The Help Center's guidance is that every face should be oriented so the front color points outward and the back color points inward, as if the model were a closed object with an outside and an inside.

A "reversed face" is a face whose back side points outward. You usually see it as a blue patch on the outside of a model. It happens often after drawing and pushing or pulling geometry, after rebuilding a face by tracing its edges, and with imported or downloaded models.

## Why it matters

- **Rendering.** SketchUp's own help page warns that inconsistent orientation can cause gaps in color across several faces or cause problems in rendering software. Renderers often treat the front side as the surface that receives the material, so a reversed face can show the wrong material or look dark. If you are choosing a renderer, our [Lumion vs Enscape comparison](/blog/lumion-vs-enscape-for-sketchup-users/) covers what each does with your model.
- **3D printing.** Slicers need to know which side of a surface is solid. In one SketchUp Forum thread about a print that came out half-finished, the diagnosis was reversed faces shown in blue plus internal faces that kept the model from being a solid. The advice: for printing, the faces need to be properly oriented.
- **Materials can hide the problem.** The same thread points out that materials and textures tend to mask reversed faces. A model can look perfect in a textured view and still be backward underneath.

## Step 1: Make the problem visible

Before you fix anything, see everything. Switch to a face style that does not show textures, so front and back colors are plain. Orbit all the way around the model and look for blue. Check the underside and interior too, since those are the places you rarely look.

If the model has softened or smoothed edges, the surfaces can be hard to read. The Help Center suggests selecting the whole entity and turning on **Hidden Geometry** from the context menu, which shows each individual surface so you can check it.

Open the group or component first (double-click it) so you are working on the geometry inside and not on the container.

## Step 2: Fix them

SketchUp gives you two native commands, both on the right-click menu. Use these before reaching for any extension.

### Reverse Faces (non-adjacent faces)

1. Select the face you want to flip with the Select tool.
2. Right-click it and choose **Reverse Faces**.
3. Repeat for each backward face that is not touching another one.

You can select several non-adjacent faces and flip them in one pass, but the blue-and-white check afterward is what tells you whether you flipped the right ones.

### Orient Faces (a connected group of faces)

1. Select the series of adjacent faces. If the whole object is wrong, open the group and press <kbd>Ctrl</kbd>+<kbd>A</kbd> (<kbd>Cmd</kbd>+<kbd>A</kbd> on Mac) to select everything inside.
2. Right-click and choose **Orient Faces**.

Orient Faces makes all the selected, adjacent faces consistent with each other. It does not decide which direction is "outside," so look at the result. If the whole object flipped to blue on the outside, leave the faces selected and choose **Reverse Faces** once to turn them all back.

That second step is worth remembering: orient first for consistency, then reverse once for direction.

### Where it goes wrong

- **Flipping a face that was already right.** If a face turns blue after you reverse it, you reversed a correct face. Reverse it again. Check the color after every change instead of flipping a batch blind.
- **Working outside the group.** If the geometry is loose in the model, it can stick to nearby edges and faces, and your selection grabs more than you intended. Group or componentize the object first. Our guide to [groups vs components](/blog/sketchup-groups-vs-components/) explains which to pick.
- **Trusting a textured view.** A materialed face can look right from the front while its geometry is backward. Always check with plain front and back colors.

## Step 3: Check that the object is a solid

For 3D printing and for the Solid Tools, orientation is only part of the job. SketchUp's help describes a solid as a group or component with a finite, closed volume and no leaks, such as missing faces or faces that fail to meet at an edge.

1. Make the object a group or component.
2. Right-click it and choose **Entity Info**.
3. Look at the upper-left corner of the dialog. It indicates whether the selection is a solid.

If it is not a solid, look for holes, missing faces, stray edges, or leftover internal faces. The forum thread above found internal faces were part of the printing problem even after the outer faces were corrected. Delete internal geometry, fill gaps, and check again.

## Extensions that help

The native commands cover most cases. When a model is large or inherited from someone else, a checking tool can save time.

- **Solid Inspector²** (Extension Warehouse) scans a group or component for problems such as internal faces and reversed faces, and can fix many of them. Treat its verdicts as a lead to verify. Forum users have reported that it sometimes flags faces as reversed when they are not, and that overlapping faces can throw its analysis off. Run it, then confirm with your own eyes and with Entity Info.
- SketchUp's help page for the Solid Tools also points to Solid Inspector, available to paid subscribers, for inspecting and fixing solid modeling problems.

Extensions need to be installed and kept current, and our guide to [managing SketchUp extensions](/blog/how-to-manage-update-and-uninstall-sketchup-extensions/) walks through that.

## Prevent it next time

- Draw the first face so its white side is up, and push or pull from there. Most reversals start with a face created upside down.
- Group early, name everything, and check Entity Info as you finish each object, not once at the end.
- Review downloaded models before you use them. Reversed faces are common in them.
- Keep a plain, texture-free view in your toolbar for orientation checks.

## Practice drill

This takes about five minutes.

1. Draw a rectangle, then push or pull it into a box.
2. Select the box and make it a group.
3. Open the group, select one side face, right-click and choose **Reverse Faces**. Notice the blue patch.
4. Select all the faces inside the group, right-click and choose **Orient Faces**. Watch what happens: either the box returns to white outside or the whole box turns blue.
5. If it is blue, choose **Reverse Faces** once more.
6. Close the group, right-click, open **Entity Info**, and confirm it reads as a solid.

## FAQ

### Why are some faces blue in SketchUp?

Blue is the default back-face color. A blue face on the outside of a model means the face is oriented backward. Reverse it, or use Orient Faces on a connected set.

### What is the difference between Reverse Faces and Orient Faces?

Reverse Faces flips the selected faces, and the Help Center recommends it for faces that are not adjacent. Orient Faces makes a series of adjacent faces consistent with each other.

### Do reversed faces affect 3D printing?

Yes. Forum guidance on a failed print says the faces need to be properly oriented, and that internal faces can also stop the model from being a solid. Fix both, then check Entity Info.

### Do I need an extension to fix reversed faces?

No. Reverse Faces and Orient Faces are built in. An extension like Solid Inspector² helps find problems in big or inherited models, but verify what it reports.
