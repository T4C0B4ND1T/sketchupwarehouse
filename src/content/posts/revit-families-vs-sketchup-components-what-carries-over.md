---
title: "Revit Families vs SketchUp Components: What Carries Over"
description: "Revit families vs SketchUp components: how types, instances and parameters compare, what converts in each direction, and what to rebuild by hand."
pubDate: 2026-11-27
category: workflows
tags:
  - revit
  - components
  - dynamic-components
  - interoperability
  - bim
aiAssisted: true
author: rosa
beat: on-the-job
topicId: revit-families-vs-sketchup-components-what-carries-over
imageQuery: architect reviewing building plans on desk
sources:
  - title: Six tips to maximize the Revit Importer (Trimble SketchUp blog)
    url: https://sketchup.trimble.com/en/blog/article/six-tips-to-maximize-the-revit-importer
  - title: Revit to SketchUp (SketchUp Help Center)
    url: https://help.sketchup.com/en/revit-interoperability/revit-to-sketchup
  - title: Using the SketchUp Importer for Revit (SketchUp Help Center)
    url: https://help.sketchup.com/en/using-sketchup-importer-revit
  - title: Importing Revit Metadata (SketchUp Help Center)
    url: https://help.sketchup.com/en/importing-revit-metadata
  - title: Dynamic Component Predefined Attributes (SketchUp Help Center)
    url: https://help.sketchup.com/en/sketchup/dynamic-component-predefined-attributes
  - title: About Families (Autodesk Revit Help)
    url: https://help.autodesk.com/cloudhelp/2016/ENU/Revit-Model/files/GUID-6DDC1D52-E847-4835-8F9A-466531E5FD29.htm
cover:
  src: ./images/revit-families-vs-sketchup-components-what-carries-over.jpg
  alt: Hands of an architect analyzing blueprints and financial graphs at a desk.
  credit: Gustavo Fring
  creditUrl: https://www.pexels.com/photo/architects-discussing-bluep-6285150/
  pexelsId: 6285150
---

A Revit family and a SketchUp component both let you define an object once and place it many times, but that's where the similarity ends. A family is a parametric, categorized BIM element with types. A component is a reusable chunk of geometry that only becomes parametric if you add Dynamic Component attributes. Moving from Revit to SketchUp, the geometry and identity survive well. Moving from SketchUp to Revit, expect geometry, not behavior.

## How each one works

### Revit families: category, types, parameters

Every Revit element belongs to a category (doors, furniture, generic models), and loadable elements come from families. According to Autodesk's [About Families](https://help.autodesk.com/cloudhelp/2016/ENU/Revit-Model/files/GUID-6DDC1D52-E847-4835-8F9A-466531E5FD29.htm) page, the parameters in a family stay the same, but different family types can hold different values for them. Think "Single-Flush door" as the family, with "36 x 84" and "32 x 80" as types.

Parameters come in two flavors:

- **Type parameters** apply to every element of that type. Change one and every placed instance updates.
- **Instance parameters** belong to a single placed element, such as a sill height or a mark.

Revit also assigns the category, so schedules, tags, phasing and filters all work off that structure. That's the real value of a family: it carries data, not just shape.

### SketchUp components: definitions and instances

A SketchUp component has one definition and any number of instances. Edit the definition and every instance changes. A copy can also be made unique, which creates a new definition. If you're hazy on that distinction, read [groups vs components in SketchUp](/blog/sketchup-groups-vs-components/) first.

There is no built-in "type" system. Where Revit would use two types of one family, SketchUp usually uses two separate component definitions, or one Dynamic Component with options.

### Dynamic Components: the closest thing to parameters

Dynamic Components add attributes and formulas to a component, so it can resize, copy itself, change material or hide parts. SketchUp's [predefined attribute reference](https://help.sketchup.com/en/sketchup/dynamic-component-predefined-attributes) lists attributes such as Copies, Copy, Hidden, Material, and the rotation and position attributes. The same page states that this is a Pro-only feature. A fence with pickets spaced by formula is the classic example.

Be clear-eyed about the difference. A Dynamic Component's formulas drive geometry inside SketchUp. A Revit parameter is data that Revit schedules, constrains and reports on. They solve different problems, and I'd treat a Dynamic Component as a modeling convenience, not a BIM substitute.

## Revit to SketchUp: what carries over

This direction works best, and it needs the right plan. The Trimble Revit Importer is only available with a SketchUp subscription that includes it (Pro Advanced Workflows or Studio) and runs only on Windows, per the [SketchUp Help Center](https://help.sketchup.com/en/revit-interoperability/revit-to-sketchup).

What the official material says survives:

- **Families become components.** Trimble's [importer tips](https://sketchup.trimble.com/en/blog/article/six-tips-to-maximize-the-revit-importer) state that families are converted into components and tagged with the name of the family category.
- **Identical objects stay identical.** The same article says identical entities are preserved as identical components, so editing one instance edits them all. Your 200 matching chairs remain one definition, which keeps the file lighter.
- **Parameters can come across as attributes.** Tick **Import revit metadata** in the importer and Revit element parameters are stored as SketchUp component attributes, per the [import steps](https://help.sketchup.com/en/revit-interoperability/revit-to-sketchup). Trimble's [metadata article](https://help.sketchup.com/en/importing-revit-metadata) covers the details, and the option makes the imported file larger. Turn it on only when you need the data.

What doesn't carry over: the family's editable parameter logic. You get the placed result, not the family editor behind it. You can't change a door's type in SketchUp and have it re-flex the way Revit would. Resizing means scaling the component or rebuilding it, and if the model goes back to Revit, those edits won't be tied to a family type. I haven't seen documentation promising otherwise, so don't assume it.

## SketchUp to Revit: what carries over

Here the rule is simpler: geometry yes, parametric behavior no. The [SketchUp Importer for Revit](/blog/sketchup-importer-for-revit-trimbles-new-sketchup-to-revit-plugin/) is a Revit extension, and you choose how each object comes in. Per Trimble's help, geometry that can't be edited as native Revit elements comes in as loadable families or as meshes in the category you choose. The full import and cleanup process is in our guide to [getting a SketchUp model into Revit](/blog/how-to-get-a-sketchup-model-into-revit-and-keep-it-clean/).

Practical points from the [importer help page](https://help.sketchup.com/en/using-sketchup-importer-revit):

- **Duplicate names break imports.** If a family or type name already exists in the Revit project, the import can fail. Rename the component in SketchUp and import again.
- **System categories can fall back to Generic Models.** If you assign a category where Revit doesn't allow families, objects may arrive as Generic Models. Pick a different category, or the Native or Mesh option.
- **Dirty geometry gets simplified.** Boundary problems can mean removed faces or filled holes. Clean the object in SketchUp and re-import.

I found no official statement that Dynamic Component formulas or options are carried into Revit as family parameters. Plan on the current geometry only. If you need a parametric Revit family, build it in the Family Editor.

## Comparison

| Feature | Revit family | SketchUp component |
|---|---|---|
| Reuse | Types and instances | Definition and instances |
| Categories | Required, drives schedules | None (tags are for visibility) |
| Variants | Family types | Separate definitions or Dynamic Component options |
| Parametric logic | Type and instance parameters | Dynamic Components (Pro) |
| Revit to SketchUp | n/a | Becomes component, tagged by category |
| SketchUp to Revit | Loadable family, native element or mesh | n/a |
| Editable logic after transfer | Lost on the way to SketchUp | Not carried to Revit as parameters (no documented support) |

## A realistic deliverable: furnishing a Revit floor plan from SketchUp

Say you have a Revit project that needs 40 custom chairs modeled in SketchUp.

1. Model one chair, make it a component, and give it a unique name that isn't in the Revit project. Name collisions are the most common failure.
2. Place every chair as an instance of that one definition. Don't make copies unique.
3. Clean up stray edges and holes so the importer doesn't simplify the shape.
4. In Revit, run the importer, select the chair component and assign the Furniture category if it's offered. If Revit refuses, try another category or Mesh.
5. Check the result in a schedule. If chairs don't count as expected, the category is the first suspect.

For a pre-built starting point, use a cleaned-up download from [3D Warehouse](/blog/3d-warehouse-sketchup-download/) and purge the extras before sending.

### Worth it?

- **Time:** Using the importer in place of manually rebuilding families saves real time on irregular furniture and fixtures. It won't save time on anything that needs type-driven parameters.
- **Cost:** It requires a SketchUp subscription tier that includes it (Pro Advanced Workflows or Studio), and runs on Windows only for the Revit-to-SketchUp direction.
- **Skip it if:** Your objects are standard doors, windows and fixtures. Use native Revit families for those and save SketchUp for custom pieces.

## Common mistakes

- **Expecting types to round-trip.** They don't. Treat transfers as one-way snapshots.
- **Using Dynamic Components as data carriers.** Revit won't read them as parameters. Put data in Revit.
- **Making copies unique.** It balloons the definition count and defeats the identical-component behavior that keeps files small.
- **Leaving metadata on by default.** It makes the file bigger. Switch it on only when the data is the point.

## FAQ

### Do Revit families become SketchUp components?

Yes. With the Revit Importer, families are converted to components tagged with their family category, and identical entities stay identical components.

### Can I turn a SketchUp component into a Revit family?

Partly. The Revit importer can bring objects in as loadable families or meshes, but it doesn't turn Dynamic Component formulas into Revit parameters as far as the documentation says. Build parametric families in Revit.

### Are Revit type and instance parameters kept in SketchUp?

If you enable Import Revit metadata, Revit parameters are stored as component attributes. Newer importer releases are described as importing type and instance parameters separately, but check your installed version.

### Are Dynamic Components available in SketchUp Free or Go?

SketchUp's help states that Dynamic Components are a Pro-only feature.
