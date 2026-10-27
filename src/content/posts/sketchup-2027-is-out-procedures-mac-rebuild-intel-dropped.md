---
title: "SketchUp 2027 Is Out: Procedures, Mac Rebuild, Intel Dropped"
description: SketchUp 2027.0 shipped October 21, 2026 with non-destructive Procedures, tabbed documents, a rebuilt Mac app and no Intel Mac support. What to do before you upgrade.
pubDate: 2026-10-27
category: news
tags:
  - sketchup 2027
  - release notes
  - layout
  - mac
  - procedures
aiAssisted: true
author: rosa
beat: tuesday-brief
imageQuery: architect working at desk with monitors
sources:
  - title: SketchUp Desktop 2027.0 Release Notes (SketchUp Help Center)
    url: https://help.sketchup.com/en/release-notes/sketchup-desktop-20270
  - title: "SketchUp 2027 Is Here: What's New, AI and How to Upgrade (Procadsys)"
    url: https://procadsys.co.nz/news/sketchup-2027-release/
  - title: When will SketchUp 2027 be released? (SketchUp Community)
    url: https://forums.sketchup.com/t/when-will-sketchup-2027-be-released/350044
cover:
  src: ./images/sketchup-2027-is-out-procedures-mac-rebuild-intel-dropped.jpg
  alt: Side view of crop elegant female estate agent looking at floor plan on computer screen and noting down details on paper in light modern office
  credit: https://kaboompics.com/
  creditUrl: https://www.pexels.com/photo/crop-estate-agent-working-with-computer-in-office-4491459/
  pexelsId: 4491459
---

SketchUp 2027.0 is out. The official release notes are dated October 21, 2026. The headline changes are editable "Procedures" (Follow Me, Solid Tools and the new Copy Along stay adjustable after you create them), models open as tabs in one window, and a Mac app rebuilt on a new framework. The catch: it only installs on Apple silicon Macs, so Intel Mac users have to stay on SketchUp 2026.

Here is what changed, who should care, and what to do before you click update.

## What's new in SketchUp 2027

### Procedures: non-destructive modeling

This is the biggest modeling change. Per the release notes, Follow Me and the Solid Tools now create non-destructive Procedural Components, and Copy Along is a new procedure. The point is that you can go back and edit the path, profile or operation instead of rebuilding geometry. If you rely on the [Follow Me tool for moldings and pipes](/blog/sketchup-follow-me-tool/), that is the change to watch: a profile tweak no longer means redrawing the sweep.

A reseller summary adds detail: Solid Tools can work through nested components using Solid Collections, operations can be reversed or changed from Entity Info, and Copy Along arrays objects along a path with editable distribution and spacing. The same summary says Procedures are available on Pro and above, with Go getting them in SketchUp for Web. Check your plan before planning a workflow around them.

### Multiple documents in one window

You can now open and edit several models or LayOut documents in a single instance, using tabs or floating windows. Closing all the tabs keeps the app open. If you keep a component library model open next to a project, this removes a lot of window juggling.

### Section fill hatch patterns

Hatch patterns can now represent solid interiors in section views, managed from a new Hatch Patterns panel. That makes section cuts read like drawing-office output without painting fills by hand. The reseller summary says you can also import custom .PAT files.

### AutoFit Live Components

Drop a Live Component onto a flat face and it sizes itself to fit. Handy for windows, doors and fixtures where you used to resize by hand.

### LayOut

- A new hidden line rendering engine speeds up vector linework for complex models. It is a Public Labs feature, on by default, and you can switch back to the classic engine.
- Image adjustments on viewports: opacity, brightness, contrast, hue and saturation.
- A paperless Draw Mode for working at scale before you commit to a sheet size.

Trimble's claim of up to 85% faster heavy vector renders is quoted by the reseller summary; treat it as a best case and test on your own sheets.

### Interoperability and location

- More DWG/DXF import and export controls.
- Expanded IFC and TrimBIM support.
- USD enhancements.
- Add Location can geolocate a model using a coordinate reference system and project coordinates.

If you hand models to Revit, the reseller summary says a Revit importer and a SketchUp Importer for Revit plugin are tied to specific plans (Pro Advanced Workflows, Studio). Our guide to [moving a SketchUp model into Revit](/blog/how-to-get-a-sketchup-model-into-revit-and-keep-it-clean/) covers the file-exchange basics, which still apply.

### Mac and interface changes

SketchUp and LayOut on Mac now share the Windows layout, including dockable toolbars and trays, a revised Materials interface and a dockable Ruby Console. The Mac interface moved from Cocoa to Qt. Windows also gains the touchpad modifier controls that Mac already had. The Outliner can now sort component instances by tag.

### AI tools

The reseller summary lists AI Render, an AI Assistant, texture generation and a connector for Claude, with monthly credits that vary by plan and don't roll over. These are subscription features with usage limits. The Help Center release notes excerpt I reviewed doesn't detail them, so read the plan terms on Trimble's site before counting on them.

## Requirements: the part that can bite

The release notes state that 2027.0 is available only for Apple silicon Macs. Intel Macs can't install it. The notes say little else about system requirements, so check Trimble's official system requirements page for your Windows version, RAM and GPU before upgrading. I could not confirm the Windows requirements from the sources I used, so I'm not going to guess.

## Extension developers: Ruby 3.4.9

The release notes say Ruby is upgraded to 3.4.9, so native C extensions must be rebuilt, and macOS-specific workarounds should be retested because of the move to Qt. For you as a user, that means some extensions will lag. Prefer ones with active developers, and check each one's compatibility note before upgrading. Our guide to [migrating extensions and preferences](/blog/sketchup-migrate-extensions-and-preferences-update-without-pain/) shows how to move your setup across without starting over.

### Worth it?

- **Time cost:** An hour or two to install, migrate settings and test your extensions is a reasonable budget. Longer if you depend on niche plugins.
- **Money cost:** The reseller summary says 2027 is included with an active subscription at no extra charge. Confirm with your own account or reseller.
- **Skip for now if:** you run an Intel Mac, you are mid-project on a deadline, or a critical extension hasn't been updated.

## A safe upgrade routine

1. Finish or archive any live project. Don't switch versions mid-deliverable.
2. Back up your templates, extensions folder and preferences.
3. Install 2027 alongside your current version. Don't uninstall the old one yet.
4. Open a copy of a recent project, never the original. Remember that a file saved in a newer version may not open in older ones.
5. Test your extensions, LayOut sheets and any Revit or CAD exports.
6. Move over once everything checks out.

If you are still on 2024, note that [support for it ends January 31, 2027](/blog/sketchup-end-of-support-2024-ends-jan-31-2027-what-to-do/). And if you skipped the last point release, see [what 2026.2 added](/blog/whats-new-in-sketchup-20262-analysis-hub-layout-and-more/).

## What this means for you

- **Procedures (Follow Me, Solid Tools, Copy Along):** Act soon if you do repeat detailing like moldings, railings or arrays. Try them on a copy first.
- **Tabbed documents:** Nice to have. Use it as soon as you install.
- **Hatch patterns and LayOut changes:** Act if you produce section drawings regularly; ignore if you don't.
- **Intel Mac:** You can't upgrade. Stay on 2026 and plan hardware replacement, but there is no emergency.
- **Extensions:** Wait until your key ones confirm 2027 support.
- **AI tools:** Ignore until you've read the credit limits for your plan.

## FAQ

### When was SketchUp 2027 released?

The Help Center release notes for SketchUp Desktop 2027.0 are dated October 21, 2026.

### Does SketchUp 2027 run on Intel Macs?

No. The release notes say it is available only for Macs with Apple silicon. Intel Mac users should stay on SketchUp 2026.

### Will my extensions work in SketchUp 2027?

Pure Ruby extensions often do, but Ruby moved to 3.4.9, so extensions with native C components must be rebuilt by their developers. Check each extension's page or developer notes.

### Do I have to pay to upgrade to SketchUp 2027?

A reseller summary says it is included with an active subscription at no extra charge. If your subscription has lapsed, you will need to renew first. Confirm details with Trimble or your reseller.
