---
title: "SketchUp Importer for Revit: Trimble's New SketchUp-to-Revit Plugin"
description: Trimble's new SketchUp Importer for Revit turns SketchUp components into native Revit elements. Here's who it's for, what's confirmed and what to do now.
pubDate: 2026-11-10
category: news
tags:
  - revit
  - bim
  - sketchup 2027
  - interoperability
  - trimble
aiAssisted: true
author: rosa
beat: tuesday-brief
imageQuery: architect reviewing building plans on laptop
sources:
  - title: "Join SketchUp Private Labs: Take your SketchUp-to-Revit workflow to the next level (SketchUp Community)"
    url: https://forums.sketchup.com/t/join-sketchup-private-labs-take-your-sketchup-to-revit-workflow-to-the-next-level/350157
  - title: SketchUp 2027 bridges design workflows (AEC Magazine)
    url: https://aecmag.com/cad/sketchup-2027-bridges-design-workflows
  - title: SketchUp Desktop 2027.0 release notes (SketchUp Help Center)
    url: https://help.sketchup.com/en/release-notes/sketchup-desktop-20270
  - title: Revit to SketchUp (SketchUp Help Center)
    url: https://help.sketchup.com/revit-interoperability/revit-to-sketchup
cover:
  src: ./images/sketchup-importer-for-revit-trimbles-new-sketchup-to-revit-plugin.jpg
  alt: Architect reviewing building models and designs at a work desk under soft lighting in a modern office setting.
  credit: Tima Miroshnichenko
  creditUrl: https://www.pexels.com/photo/a-man-working-behind-his-desk-6614750/
  pexelsId: 6614750
---

Trimble is building a plugin that runs inside Revit and converts SketchUp components into native, editable Revit elements. It is called the SketchUp Importer for Revit, and it targets the most expensive step in the SketchUp-to-Revit handoff: rebuilding walls, floors and openings by hand. It is in testing, so treat it as something to evaluate, not something to base a deadline on.

## What changed

Until now, the official route between the two programs has been one-directional. SketchUp's built-in Revit Importer brings Revit models *into* SketchUp, and SketchUp's [Revit to SketchUp help page](https://help.sketchup.com/revit-interoperability/revit-to-sketchup) says it requires a SketchUp Pro Scan, Pro Advanced Workflows or Studio subscription. Going the other way, SketchUp into Revit, usually meant importing a dumb mesh or a DWG and remodeling over it.

The new importer is a Revit plugin aimed at that second direction. According to Trimble's post in the SketchUp Community forum (dated September 24, 2026), the features being tested are:

- **Native geometry conversion:** SketchUp components become editable Revit families, starting with walls, floors, windows, doors and curtain walls.
- **A SketchUp panel inside Revit:** Entity Info, Outliner and Materials tools for working with both imported and native Revit objects.
- **Trimble Connect integration:** push and pull models to and from the cloud from within Revit.

Coverage of the SketchUp 2027 launch from [AEC Magazine](https://aecmag.com/cad/sketchup-2027-bridges-design-workflows) adds one detail on how it works: it recognizes component tags and classes and maps them to Revit categories, producing native architectural elements that can be edited, scheduled and documented.

## What is confirmed, and what isn't

Confirmed by Trimble's forum post:

- It is available for testing through SketchUp Private Labs.
- Eligibility is SketchUp Studio or Pro Advanced Workflows subscribers who also have Revit access.
- You join through the Advanced Workflows Labs group (the sign-up link is in the forum post).
- The initial element list is described as a starting scope.

Not stated in the sources I found: supported Revit versions, a firm general-availability date, a full list of limitations, and whether any pricing changes apply. Some coverage mentions a November 2026 release at no extra cost for Pro Advanced Workflows and Studio, but I could not confirm that on a primary Trimble page, so check Trimble's current announcement before you plan around it.

It also isn't tied to the 2027 desktop requirements in any way I could verify. For the record, SketchUp 2027.0 (released October 21, 2026, version 27.0.264 per the [release notes](https://help.sketchup.com/en/release-notes/sketchup-desktop-20270)) needs Windows 11 or an Apple silicon Mac. Whether the importer works with older SketchUp versions is something to ask in the Labs group.

## Who it matters to

**Design-development teams handing SketchUp massing to a Revit team.** This is the core audience. If your SketchUp model already has clean components with sensible tags and classes, the mapping step is where you save time. If it doesn't, the importer will faithfully convert your mess.

**Studios on Pro Advanced Workflows or Studio.** You may already be paying for the capability; the cost of testing it is your time.

**Everyone else.** If you're on a lower subscription, or you don't use Revit, nothing here changes for you today.

## How to get ready now

Whatever the final feature list, the importer rewards the same habits that make any SketchUp-to-Revit exchange work. Do this prep once and keep it as a template:

1. **Build a tag and class convention.** Decide which SketchUp tag or class maps to which Revit category (wall, floor, door, window, curtain wall) and write it down. Mapping only works if the names are consistent.
2. **Model walls, floors and openings as separate, named components.** Not groups of loose geometry. If you're unsure which to use, see [groups vs components](/blog/sketchup-groups-vs-components/).
3. **Purge the file.** Delete unused components, materials and hidden junk before handoff. Our guide to [keeping a SketchUp model clean for Revit](/blog/how-to-get-a-sketchup-model-into-revit-and-keep-it-clean/) covers the checklist.
4. **Use tags properly.** Tags drive mapping, so a messy tag structure means a messy import. See [SketchUp tags (layers)](/blog/sketchup-tags-layers/).
5. **Test on one small, real deliverable.** Take a single floor plate or one facade bay, run it through, and check whether elements land in the right category and schedule correctly. Judge it on the cleanup time left over, not on the demo.

### Worth it?

- **Time saved:** potentially the hours spent re-drawing massing as Revit elements. How many depends entirely on how well your model is organized, and I haven't tested it, so don't take any number on faith.
- **Cost:** no separate price confirmed. It requires an eligible subscription plus Revit.
- **Skip it if:** you're not on Studio or Pro Advanced Workflows, you hand off to Revit only as a one-off reference, or your deadline can't absorb a beta tool. Keep your current mesh or DWG route until the feature is out of testing.

## What this means for you

- **Importer in Private Labs:** If you're eligible and move SketchUp into Revit regularly, join the group and test it on one small model now. Don't switch a live project over.
- **Revit version support and release date:** Wait. Neither is confirmed in the sources I found.
- **Tag and class convention:** Act now. It's free, it helps with every exchange format, and it's the likely foundation of this importer.
- **Lower-tier subscription or no Revit:** Ignore this for now.

## FAQ

### Is the SketchUp Importer for Revit the same as the Revit Importer in SketchUp?

No. The Revit Importer inside SketchUp brings Revit models into SketchUp. The SketchUp Importer for Revit is a plugin inside Revit that brings SketchUp components into Revit as native elements.

### Who can use it?

During testing, SketchUp Studio or Pro Advanced Workflows subscribers who also have Revit access, via the Advanced Workflows Labs group, according to Trimble's forum post.

### Which Revit versions does it support?

Trimble's post doesn't say. Ask in the Labs group or check Trimble's documentation before installing.

### What elements does it convert?

The initial scope listed is walls, floors, windows, doors and curtain walls, converted from SketchUp components into editable Revit families. Expect that list to change as testing continues.
