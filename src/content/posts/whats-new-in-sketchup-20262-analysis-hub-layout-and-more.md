---
title: "What's New in SketchUp 2026.2: Analysis Hub, LayOut and More"
description: SketchUp 2026.2 adds the Analysis Hub with Advanced Shadows, faster shadows, a new default LayOut graphics engine and clipping masks. Here is what to know.
pubDate: 2026-09-29
category: news
tags:
  - sketchup 2026
  - release notes
  - layout
  - shadows
  - analysis hub
aiAssisted: true
imageQuery: architect studying building sunlight model
sources:
  - title: SketchUp Desktop 2026.2 release notes (SketchUp Help Center)
    url: https://help.sketchup.com/en/sketchup-desktop-20262
  - title: SketchUp 2026.2 is out now! (SketchUp Community)
    url: https://forums.sketchup.com/t/sketchup-2026-2-is-out-now/347029
  - title: SketchUp 2026.2 Introduces New Analysis Possibilities (SketchUp for Design)
    url: https://sketchupfordesign.com/news/sketchup-2026-2-introduces-new-analysis-possibilities/
  - title: SketchUp Desktop 2026.0 release notes (SketchUp Help Center)
    url: https://help.sketchup.com/en/release-notes/sketchup-desktop-20260
  - title: SketchUp Release Notes index (SketchUp Help Center)
    url: https://help.sketchup.com/en/release-notes
cover:
  src: ./images/whats-new-in-sketchup-20262-analysis-hub-layout-and-more.jpg
  alt: Architect focused on designing a detailed architectural model indoors under soft lighting.
  credit: Ron Lach
  creditUrl: https://www.pexels.com/photo/architect-working-on-model-9618131/
  pexelsId: 9618131
---

SketchUp 2026.2, released on May 19, 2026, is the current feature release of SketchUp Desktop. Its headline additions are a new Analysis Hub with Advanced Shadows, a faster shadow system, LayOut's new graphics engine turned on by default, and clipping masks for groups in LayOut. Patch 2026.1.3 and the 2026.1 release sit behind it in the official release notes index.

We looked for a fresh SketchUp story from the last two weeks and did not find a new release or announcement from Trimble in that window, so this is a walk-through of the latest official release rather than breaking news. Everything below comes from the Help Center release notes and the SketchUp Community announcement.

## Analysis Hub and Advanced Shadows

The Analysis Hub is a new workspace for studying a design inside SketchUp. Its first tool, Advanced Shadows, lets you compare how shadows fall at different times of year, including solstices and equinoxes. That is useful for checking how much sun a facade, courtyard or garden gets, and how neighboring buildings or trees affect it.

Per the release notes, you open it from the **Extensions** menu (Analysis Hub) or from a shortcut in the **Shadows** panel.

The release notes also list several analysis types under SketchUp Labs, meaning they are experimental:

- Annual Illuminance
- Daylight Factor
- Underlit & Overlit
- Direct Sun
- Date & Time

Treat Labs results as early design guidance, not as a substitute for a formal daylight or energy study.

### Known limitations to plan around

The release notes list these Analysis Hub issues:

- Localization is not available until a later release.
- Advanced Shadows treats textured materials with less than 100% opacity as opaque, so glass and foliage textures can over-shade your results.
- The Analysis Hub icon may not appear on first start unless you reset the toolbars.

## Faster shadows

2026.2 includes a new fast shadow system that the notes say delivers significantly improved frame rates. If you work with shadows on in large models, this is the change most likely to be noticeable day to day.

It is not perfect yet. Known issues in the notes include:

- Edge shadows are not displayed.
- Face shadows can render incorrectly with section planes.
- X-ray mode can display incorrectly.
- Materials with mixed opacity cast shadows as fully opaque.
- Graphical artifacts can appear near section cuts.

If a presentation scene relies on section planes and shadows together, check it carefully after upgrading.

## LayOut: new graphics engine and clipping masks

LayOut's new graphics engine was experimental in earlier releases. In 2026.2 it is enabled by default. The notes describe improved text fidelity, rendering accuracy and font consistency, and the SketchUp Community announcement describes sharper text and more efficient handling of geometry and patterns. Because text rendering can differ between engines, open your existing title blocks and dense drawings and scan for changed text wrapping.

### Clipping masks for groups

You can now apply clipping masks to Groups and Scaled Groups, the way you already could with images and viewports. According to the release notes:

1. Draw a shape over the content you want to crop.
2. Select both the shape and the group.
3. Right-click and choose **Create Clipping Mask**.

Two caveats from the notes. Exporting a clipped group to DWG creates a viewport at full scale, and the known issues list says group clipping masks are ignored on DWG export, with geometry placed in Paper Space. If you send LayOut drawings to consultants as DWG, test one page before relying on this.

LayOut also picked up many bug fixes, including custom line widths below 0.1, custom flip shortcuts, dotted dash rendering, and Ctrl+Tab document cycling on Windows.

## Smaller workflow changes

- **Migrate Extensions:** the tool can migrate extensions from an earlier SketchUp version without restarting the application, keeping workspace positions and tray customizations.
- **Point clouds (Windows only):** Scene Properties now include point cloud visibility options, which helps on projects with several scan datasets.
- **Components panel (Windows):** searches now filter within your model only, with a dedicated button to reach 3D Warehouse.
- **Extension Manager:** moved to new UI infrastructure with improved performance.
- **Dynamic Components:** updated to version 1.8.5 with crash fixes.

## Revit Importer 1.2

The release includes Revit Importer 1.2026.1.6. It improves handling of complex categories such as railings and curtain walls, uses less triangulation on curved elements, and adds support for molding under wall sweeps. Parent components carry assembly-level information while children keep instance data. Fixes cover missing fascia boards and gutters and some models that previously failed to import.

One known issue is worth noting: the notes say upgrading the Revit extension can crash in some cases. If you rely on this importer, update outside a deadline week.

## For extension developers

The 2026.2 API notes include breaking changes to the C API. Entity-adding functions such as `SUEntitiesAddFaces()` now return `SU_ERROR_INVALID_OPERATION` when called on a detached `SUEntitiesRef`. New Ruby API methods include `Sketchup::Material#duplicate`, `Sketchup::Style#duplicate`, and `Layout::Group#clip_mask`. `Sketchup.send_action` is deprecated, and the embedded CEF used by `UI::HtmlDialog` is now version 137. Test dialog-heavy extensions before you tell customers to upgrade.

## What you should do

1. **Update through Help.** On Windows use Check for Update in the Help menu; on Mac use SketchUp > Check for Update. The Community announcement describes this route.
2. **Back up first.** Some early users reported crashes and download caching issues in the announcement thread.
3. **Test extensions.** Use the migrate tool, then open a real project and run your main extensions.
4. **Re-check LayOut files.** Look at text-heavy pages and any DWG export workflow.
5. **Try Advanced Shadows on a live project,** but keep the opacity limitation in mind.

## FAQ

### When was SketchUp 2026.2 released?

May 19, 2026, according to the Help Center release notes and the Community announcement.

### What is the Analysis Hub in SketchUp?

It is a new workspace for design analysis. It launches with Advanced Shadows, and lists additional experimental SketchUp Labs analyses such as Annual Illuminance and Daylight Factor. Open it from the Extensions menu or the Shadows panel.

### Is the new LayOut graphics engine optional?

The notes say it is now enabled by default and no longer experimental. They do not describe it as something you must accept without review, so check existing documents after upgrading.

### Can I install 2026.2 alongside an older version?

SketchUp installs of different major years generally coexist, but confirm on the download page for your platform. The Migrate Extensions tool is there to carry extensions over from an earlier version.

*SketchUp and 3D Warehouse are trademarks of Trimble Inc. SketchUp Warehouse is an independent site and is not affiliated with Trimble.*
