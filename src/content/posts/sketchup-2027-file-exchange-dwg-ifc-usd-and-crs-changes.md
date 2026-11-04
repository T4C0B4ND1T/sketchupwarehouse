---
title: "SketchUp 2027 File Exchange: DWG, IFC, USD and CRS Changes"
description: SketchUp 2027 quietly overhauls DWG/DXF import, IFC and TrimBIM, USD and map coordinates. Here is what changed, who should care and what to do first.
pubDate: 2026-11-03
category: news
tags:
  - sketchup 2027
  - dwg
  - ifc
  - usd
  - interoperability
aiAssisted: true
author: rosa
beat: tuesday-brief
imageQuery: architect reviewing floor plans
sources:
  - title: SketchUp Desktop 2027.0 Release Notes (SketchUp Help Center)
    url: https://help.sketchup.com/en/release-notes/sketchup-desktop-20270
  - title: SketchUp Ruby API Release Notes
    url: https://ruby.sketchup.com/file.ReleaseNotes.html
  - title: SketchUp Supported Versions (SketchUp Help Center)
    url: https://help.sketchup.com/en/accounts-and-administration/supported-versions
cover:
  src: ./images/sketchup-2027-file-exchange-dwg-ifc-usd-and-crs-changes.jpg
  alt: Hands on a detailed architectural floor plan paper, showcasing home design layout.
  credit: SHVETS production
  creditUrl: https://www.pexels.com/photo/person-holding-a-floor-plan-9052461/
  pexelsId: 9052461
---

SketchUp 2027.0 (build 27.0.264, released October 21, 2026 per the official release notes) has headline features like Procedures and a unified interface. Buried under them is a long list of file-exchange changes: new DWG/DXF import controls, better IFC and TrimBIM handling, wider USD support and a coordinate reference system (CRS) workflow. If your week is mostly swapping files with engineers, surveyors and Revit users, this is the part of 2027 that will save or cost you the most time.

For the big picture, see our [overview of SketchUp 2027](/blog/sketchup-2027-is-out-procedures-mac-rebuild-intel-dropped/). This piece covers only the interoperability changes.

## What changed

### DWG/DXF import gets real controls

The 2027 release notes describe three new groups of options on DWG/DXF import:

- **Tessellation Quality.** Presets, or custom values for Angular Deviation, Chordal Tolerance and Max Edge Length. This is the setting that decides how smooth or how heavy curved CAD geometry becomes.
- **Annotations.** Text can come in as Contours Only, Filled Meshes, Native SketchUp Text or None. Dimensions can be Contours Only or Native. Hatches can be Linework or None.
- **Import Metadata.** When enabled, each element becomes a component, block metadata is classified as IfcAnnotation, and block components receive a CAD_Metadata property set.

On export, a new Geometry section lets you choose Smooth (SubD) or Flat-faceted (Polyface) mesh output.

The practical gain: you can stop importing a consultant's drawing, discovering 40,000 text meshes, and then spending an hour deleting them. Choose Native SketchUp Text or None up front.

### IFC and TrimBIM

- Import now supports SweptDiskSolid geometry, which is how reinforcing bars and meshes are commonly stored.
- Export now supports IfcLamp and IfcOutlet.
- A new Tags dropdown on import: Use IFC Classes (the default), Use IFC Layers or Don't create Tags.
- TrimBIM import and export now match the IFC feature set.
- CRS metadata is exported automatically via IfcProjectedCRS and IfcMapConversion.

### USD

SketchUp 2027 supports USD, USDA, USDC and USDZ. Export offers a Feature Level (Normal or Round Trip) and a Texture Level (Normal or Baked). Import offers Up Axis (Auto, Y or Z), Units and Edge visibility options. If you hand models to a game engine or a visualization pipeline, the Round Trip and Baked options are the ones to read about before your first export.

### Coordinate reference systems

Add Location can now import a CRS or calibration file, set the Project Base Point using Easting and Northing, and calculate elevation automatically. The model is adjusted for True North. That matters on site-plan and civil work, where "roughly in the right place" is not good enough. It also pairs with the IFC export change above: the CRS travels with the file.

### Section fill hatches

Not strictly interoperability, but related. Section fills can now use vector hatch patterns. A Hatch Patterns panel imports .skh files, images and .PAT files (one pattern per .PAT file). Patterns can be tied to materials, set in Entity Info or set in the Styles panel. The "Override Section Fill by Style" option switches between one uniform style fill and per-object or per-material hatches. If you have a firm hatch library in AutoCAD, .PAT import means you may not need to redraw it.

## Who it matters to

| If you... | Care level | Why |
|---|---|---|
| Receive DWG/DXF from consultants | High | Tessellation and annotation controls cut cleanup time |
| Exchange IFC or TrimBIM with BIM teams | High | Tag handling, rebar and CRS export |
| Work on sites and survey data | High | CRS and Project Base Point workflow |
| Export to game or visualization tools | Medium | USD options |
| Mostly model furniture or interiors alone | Low | Nothing here changes your day |

The Revit side of the story is unchanged by these notes, so if that is your main exchange, our guide to [getting a SketchUp model into Revit and keeping it clean](/blog/how-to-get-a-sketchup-model-into-revit-and-keep-it-clean/) still applies. The release notes do not say that any of these options change how Revit itself reads SketchUp files, so test before promising anything to a client.

## A sensible way to test it

Do this on a copy of a real project, not a deadline job.

1. Install SketchUp 2027 alongside your current version. Check the [supported versions page](https://help.sketchup.com/en/accounts-and-administration/supported-versions) for your current version's end-of-support date.
2. Import a recent consultant DWG with the default settings and note the file size and edge count.
3. Re-import with a coarser tessellation preset, Native SketchUp Text and Hatch set to None. Compare.
4. Turn on Import Metadata only if you need block data downstream. Every element becoming a component adds structure you may not want.
5. Export the result to IFC and open it in the viewer your collaborators use. Confirm tags and CRS arrived as expected.
6. Write down the settings that worked. A one-line import standard in your project template beats rediscovering this every job.

### Worth it?

- **Time saved:** Potentially a large share of CAD cleanup, but I haven't measured it and the release notes do not give numbers. It depends on how messy your inbound files are.
- **Cost:** 2027 is a new version. Check your subscription, since pricing and edition details vary and the notes I used don't state them.
- **Skip it if:** you never touch CAD, IFC or survey data, or you are locked to a version for a client deliverable.

## Things to watch before upgrading

- **Apple silicon only on Mac.** The release notes state Intel-based Macs are no longer supported.
- **Extensions.** The embedded Ruby moved from 3.2.2 to 3.4.9, and native C extensions must be rebuilt, according to the release notes. The Ruby API release notes list no breaking changes for 2027.0, but compiled extensions are a separate matter. Check each developer's compatibility note, and see our guide on [migrating extensions and preferences](/blog/sketchup-migrate-extensions-and-preferences-update-without-pain/).
- **macOS interface.** It moved from Cocoa to Qt, so Mac-specific workarounds should be retested.
- **Bug fixes worth knowing.** The notes mention fixes for missing DWG geometry, non-ASCII component names, IFC export of Asian characters, missing IFC reinforcements, STL compatibility and COLLADA crashes. If one of those bit you before, retest it.

## What this means for you

- **DWG/DXF import options:** Act now if you receive CAD files weekly. Test and save your settings.
- **IFC and TrimBIM tags, rebar, lamps:** Act now if you work with BIM teams. Otherwise ignore.
- **USD support:** Wait until you have a pipeline that needs it.
- **CRS and Project Base Point:** Act now for site and civil work. Ignore for interiors.
- **Hatch patterns:** Try when your next section drawing needs it. Import your .PAT library once.
- **Intel Mac and Ruby 3.4 changes:** Act now if either applies to you, before you upgrade.

## FAQ

### Does SketchUp 2027 import DWG files better than 2026?

The official notes add tessellation, annotation and metadata options to DWG/DXF import. "Better" depends on your files, so compare the same drawing in both versions.

### Can SketchUp 2027 export USD?

Yes. The release notes list USD, USDA, USDC and USDZ support, with Feature Level and Texture Level export options.

### Does SketchUp 2027 use coordinate reference systems?

Yes. Add Location can import a CRS or calibration file and set the Project Base Point with Easting and Northing. CRS metadata is also written on IFC export.

### Will my extensions work in SketchUp 2027?

Pure Ruby extensions often will, but the embedded Ruby is now 3.4.9 and native C extensions must be rebuilt. Check with the developer before upgrading a production machine.
