---
title: 'SketchUp to Revit: Import, Link and Keep Your Model Clean'
description: 'Learn how to get a SketchUp model into Revit: import vs link, SKP vs IFC vs DWG, what survives, clean-up steps, and when to rebuild natively.'
pubDate: 2026-09-30
category: workflows
tags:
  - revit
  - sketchup
  - interoperability
  - ifc
  - import
  - bim
draft: false
cover:
  src: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0zEM704lD4V5WEgbrd7wZcwFievYFr-KGv4OU4Bp_vVruQZvyu8kpoeE&s=10
  alt: Architect with helmet presenting building blueprints on screen in modern office environment.
  credit: Gustavo Fring
  creditUrl: https://www.pexels.com/photo/man-presenting-on-screen-6285129/
  pexelsId: 6285129
sources:
  - title: Exporting SketchUp Files to Revit (SketchUp Help Center)
    url: https://help.sketchup.com/en/revit-interoperability/sketchup-to-revit
  - title: Importing and Exporting CAD Files (SketchUp Help Center)
    url: https://help.sketchup.com/en/sketchup/importing-and-exporting-cad-files
  - title: Importing CAD Files (Autodesk Revit Help)
    url: https://help.autodesk.com/cloudhelp/2022/ENU/Revit-Model/files/GUID-E8705303-0610-4A82-9118-0C3A742706D2.htm
aiAssisted: true
imageQuery: architect reviewing building model on screen
topicId: how-to-get-a-sketchup-model-into-revit-and-keep-it-clean
---

The short answer: bring the .skp file into Revit with **Insert > Import CAD** (or **Link CAD**), and use IFC instead when you need the result to behave like real building elements. Revit reads SketchUp geometry as a pile of shapes, not as walls and doors, so how much you prepare the model decides how useful it is afterward.

This guide covers the three routes, what carries over, how to clean the model before you leave SketchUp, and when it is faster to rebuild in Revit.

## Pick your route: import, link or IFC

Autodesk's Revit help lists SketchUp (SKP and DWG) among the formats that Import CAD accepts. SketchUp's Help Center describes three approaches.

| Route | Best for | Stays connected to the .skp? | Result in Revit |
|---|---|---|---|
| In-place component (import SKP) | Concept massing, custom elements, 3D Warehouse content | No, it is embedded | Geometry inside a family you can categorize |
| Link | Site context, surroundings, teams where some people stay in SketchUp | Yes, reload to update | A reference, not editable geometry |
| IFC export | Walls, windows, doors and other elements that need classification and scheduling | No, it is a one-time conversion | In-place components with categories |

Importing embeds the data in your Revit model. Linking keeps a connection to the external file, so changes show up when you reload it. Autodesk also notes that Revit treats imported SketchUp data as a complicated collection of geometry that can take more steps to manipulate.

### Import a SKP as an in-place component

Autodesk's documentation says to import the SKP into a Revit family, then load that family into the project. The SketchUp Help Center describes the in-place version:

1. In Revit, go to **Architecture > Component > Model In-Place** and choose a family category.
2. Go to **Insert > Link CAD** and choose the .skp file.
3. Finish the in-place family.

Assigning the right category matters, because it controls visibility, scheduling and how the element shows in views.

If you work in the Family Editor instead, use **Insert > Import CAD** and set Files of Type to SketchUp. Autodesk recommends Colors: Preserve, Layers: All, Import Units: Auto-Detect and Positioning: Auto - Origin to Origin as starting settings.

### Link a SketchUp model for context

Linking suits terrain, neighboring buildings and other detail you will not edit in Revit. Tags in SketchUp (called layers in Revit) come across, so you can control visibility from Revit. Revit's help recommends adjusting layers in SketchUp before import for better results. After you change the SketchUp file, reload the link in Revit.

### Use IFC when elements must be real

If you want Revit to know a wall is a wall, export IFC from SketchUp Pro. SketchUp's guidance:

1. Put all geometry in groups or components.
2. Make each one watertight. Entity Info shows a volume for a solid.
3. Assign an IFC classification to each component.
4. Go to **File > Export > 3D Model** and choose IFC 2.3.
5. In Revit, use **File > Open** and select the IFC file.

The help page warns that Revit does not interpret IFC walls with returns or height offsets. Model typical wall systems as straight segments.

## What survives and what does not

- **Geometry:** Comes across as shapes. On import it is not parametric, and there is no history of how you drew it.
- **Materials:** Carried across when they are applied to groups or components. Materials painted onto loose geometry may not come through.
- **Tags and layers:** Converted to layers in Revit, which gives you visibility control.
- **Components:** Treated as geometry, not as Revit families. Only the IFC route adds categories.
- **Faces in DWG/DXF:** SketchUp's Help Center says faces export as a triangulated polyface mesh with interior hidden lines. That is fine for reference but heavy to work with.

Version compatibility also matters. SketchUp's help suggests that, with an older Revit, you save the model in a SketchUp version one year older than the Revit release. Check which SketchUp versions your Revit version reads before a deadline, because this can vary.

## Clean up before you export

Most "Revit is slow" complaints trace back to the SketchUp file. Spend ten minutes here.

1. **Purge unused items.** Use **Window > Model Info > Statistics > Purge Unused** to remove leftover components, materials and styles.
2. **Group or componentize everything.** Loose faces and edges behave badly, and IFC needs groups or components.
3. **Check for solids.** Open Entity Info on each group you intend to use as an element. If there is no volume, there is a gap somewhere.
4. **Delete hidden and stray geometry.** Hidden furniture, stray edges and leftover construction lines all add weight.
5. **Reduce polygon-heavy components.** High-detail trees, cars and people from 3D Warehouse are the usual culprits. Swap them for simple stand-ins, or leave them out of the Revit copy.
6. **Organize tags.** Give tags clear names so the layers in Revit make sense.
7. **Set the origin.** Move the model near the origin and use a consistent unit. Revit's Auto - Origin to Origin positioning relies on it.
8. **Save a dedicated export copy.** Keep your working SketchUp file intact.

For DWG or DXF, SketchUp's help also recommends a Standard camera view with Parallel Projection on so scale stays accurate, and the export dialog lets you choose the AutoCAD version and which entities to include (faces, edges, construction geometry, dimensions, text, materials).

## Common problems and fixes

- **Model appears at the wrong scale.** Check Import Units in the Revit dialog and the units in SketchUp. Try Auto-Detect first.
- **Model is very far from your project.** Use origin-to-origin positioning, and fix the SketchUp origin if needed.
- **Materials are missing.** Reapply them to groups or components and re-export.
- **Revit is slow after import.** Reduce the detail, link instead of import, or use a simplified copy.
- **IFC walls look wrong.** Remove returns and height offsets, and model walls as straight solid segments.

## When to rebuild natively

Import is best for mass studies, context and one-off objects. Rebuild in Revit when:

- The element will be scheduled, tagged or need phasing, such as walls, floors, doors and windows.
- Drawings will come straight from the Revit model.
- You need parametric control, for example a door family with width and height parameters.
- The imported geometry is heavy and only a few elements matter.

A common pattern is to use the SketchUp model as a visual reference, link it, and trace walls and floors with native Revit tools. You keep the design intent and get proper building elements.

## FAQ

### Can Revit open a SketchUp .skp file directly?
Not as a normal project. Revit imports or links SKP files through **Insert > Import CAD** or **Link CAD**, and the geometry arrives as a family or a link, not as native Revit elements.

### Should I use IFC or SKP for SketchUp to Revit?
Use SKP for massing, context and quick references. Use IFC when you need classified elements, such as walls or windows, that Revit can schedule. IFC export needs SketchUp Pro and a carefully prepared, watertight model.

### Why are my SketchUp materials missing in Revit?
Materials travel reliably when applied to groups or components, not to raw faces. Reapply them at the group or component level and try again.

### Can I edit an imported SketchUp model in Revit?
Only in limited ways. The geometry is not parametric, so major changes are usually easier in SketchUp, followed by a reload if you linked it.
