---
title: "Lumion LiveSync for SketchUp: Setup and Workflow"
description: "A practical Lumion LiveSync SketchUp workflow: install the plugin, know what syncs, handle materials and tags, and decide when to export a .skp instead."
pubDate: 2026-10-28
category: rendering
tags:
  - lumion
  - livesync
  - sketchup
  - rendering
  - workflow
aiAssisted: true
author: theo
beat: render-lab
topicId: lumion-livesync-for-sketchup-setup-and-workflow
imageQuery: architect working at desk with two monitors
sources:
  - title: Download Lumion LiveSync for SketchUp - Lumion Support
    url: https://support.lumion.com/hc/en-us/articles/360007502894
  - title: Model import guidelines for SketchUp - Lumion Support
    url: https://support.lumion.com/hc/en-us/articles/360007745233-Model-import-guidelines-for-SketchUp
  - title: Lumion for SketchUp - Lumion
    url: https://lumion.com/sketchup-rendering
  - title: Lumion View & LiveSync - SketchUp Extension Warehouse
    url: https://extensions.sketchup.com/extension/606f2587-2b62-4405-a0f9-74c228dda6ed/lumion-view-and-live-sync
cover:
  src: ./images/lumion-livesync-for-sketchup-setup-and-workflow.jpg
  alt: Side view of concentrated adult female with short hair and eyeglasses writing down ideas while working on project at table with computer in modern office
  credit: https://kaboompics.com/
  creditUrl: https://www.pexels.com/photo/focused-woman-editing-paper-documents-during-work-at-desk-with-computer-4491453/
  pexelsId: 4491453
---

Lumion LiveSync keeps an open SketchUp model connected to Lumion, so changes you make in SketchUp appear in Lumion while you work. It needs a Lumion plan that includes it (Lumion describes it as a Lumion Pro feature), and the right plugin build depends on your SketchUp version. This guide covers the workflow rather than just the install; for troubleshooting and reconnecting saved projects, see our [LiveSync setup, versions and fixes](/blog/lumion-livesync-with-sketchup-setup-versions-and-fixes/) article.

## Step 1: Match your versions

Lumion's support pages show that the plugin situation has shifted. There is now a newer plugin that bundles LiveSync with Lumion View, distributed through SketchUp's Extension Warehouse, and an older LiveSync-only plugin that Lumion describes as frozen with its existing features. Lumion's download page lists the older build (3.60.786) as covering SketchUp 2020 to 2025 with Lumion 10.3 and newer, and notes that Lumion 10.3 and 11 are no longer officially supported.

Lumion's page also warns that the previous build (3.60.785) can cause model or material problems with SketchUp 2025. Don't assume an old installer works on a new SketchUp.

Because Lumion updates these pages as SketchUp ships releases, check the [official download page](https://support.lumion.com/hc/en-us/articles/360007502894) before installing, especially if you are on SketchUp 2026 or 2027. I haven't verified 2027 support, so confirm it first.

## Step 2: Install the plugin

1. In SketchUp, open the Extension Manager and search for Lumion, or open the [Extension Warehouse listing](https://extensions.sketchup.com/extension/606f2587-2b62-4405-a0f9-74c228dda6ed/lumion-view-and-live-sync).
2. Install, then restart SketchUp if the Lumion toolbar doesn't appear.
3. Open Lumion on the same Windows PC and start or open a project.
4. In SketchUp, start LiveSync from the Lumion toolbar. Lumion imports the model automatically.

If extension management is new to you, our guide to [managing, updating and uninstalling SketchUp extensions](/blog/how-to-manage-update-and-uninstall-sketchup-extensions/) covers the Extension Manager.

## What syncs live

According to Lumion's pages:

- **Geometry:** model changes are reflected in real time.
- **Materials:** Lumion's import guidelines say PBR texture maps and material settings changed in your modeling software update immediately in Lumion while LiveSync is active.
- **Camera:** Lumion's older LiveSync documentation describes the Lumion view following the SketchUp view.

Lumion materials can still be applied and saved in the Lumion editor. Lumion's own materials are where the realism usually comes from, so decide up front which program owns which surface.

## Materials: who owns what

My preference is to treat SketchUp as the owner of geometry and material assignment, and Lumion as the owner of lighting, landscaping and the look of key surfaces like water, glass and foliage.

Two rules follow from that:

- **Give each surface you want to treat differently its own SketchUp material.** Lumion's guidelines note that surfaces sharing a SketchUp material are merged in Lumion, so a single "White" material across walls and trim means one Lumion material for both.
- **Name materials clearly.** "Oak_floor" is easier to find in Lumion's list than "Material 14".

## Tags (layers) and hidden geometry

Lumion's pages I could access don't say how SketchUp tags or hidden objects behave under LiveSync, and I'd rather not guess. A D5 Render forum thread reports that D5's sync doesn't handle hidden layers, but that is a different product and shouldn't be assumed to apply to Lumion.

Test it on a small copy: hide a tag, change something, and see what Lumion does. Whatever you find, keeping a clean tag structure helps; see [how to organize SketchUp tags properly](/blog/sketchup-tags-layers/).

## Settings I'd start with

| Setting | Starting value | Why |
|---|---|---|
| Model position | Near the origin (0,0,0) | Lumion's guidelines suggest checking scale and position when a model seems missing. |
| Material assignment | One SketchUp material per surface type | Shared materials merge in Lumion. |
| Edges | Enable only if you want line work | Lumion lists an edges option in the LiveSync settings; leave it off otherwise. |
| Model weight | Purge unused components and materials first | A lighter model syncs and renders with less strain; see [why SketchUp models get slow](/blog/sketchup-slow-model-file-size/). |
| Project file name and folder | Fix before building the Lumion scene | Lumion identifies the model by name and location. |

## A workflow that holds up

1. Get the model to a stable state in SketchUp: clean geometry, named materials, sensible origin.
2. Start LiveSync and confirm the model imports.
3. Light the scene first. Sun angle and exposure make or break a render, and it is much easier to judge before you dress the scene in detail.
4. Add landscaping, entourage and Lumion materials around the model.
5. Keep modeling in SketchUp for revisions, and spot-check the Lumion side after each larger change.
6. Save the Lumion project, and don't rename or move the SketchUp file afterwards.

## When to export a .skp instead

LiveSync isn't always the right call. A plain .skp import is simpler when:

- The model is finished and you only need to render it.
- You are on a version combination LiveSync doesn't cover. Lumion's page lists .SKP import as an option for older Lumion versions with SketchUp 2024.
- The SketchUp and Lumion sessions can't run on the same machine at once.
- A live connection keeps misbehaving and you need a stable import to meet a deadline.

One caveat: Lumion's guidelines say its import skips features newer than the Lumion version supports, so newer SketchUp features may not appear. If something is missing, update Lumion or simplify the feature.

If you are still choosing between renderers, our [Lumion vs Enscape comparison](/blog/lumion-vs-enscape-for-sketchup-users/) frames who should pick which.

## FAQ

### Is Lumion LiveSync free?

The plugin is free, but Lumion's SketchUp page says you need a Lumion Pro plan to use it. It offers a 14-day Pro trial.

### Does LiveSync work on Mac?

Lumion's documentation describes LiveSync as running with both programs on the same Windows PC. Check Lumion's current requirements if you are on macOS.

### Do material changes in SketchUp update in Lumion?

Yes, Lumion says PBR texture maps and material settings changed in your modeling software update immediately in Lumion while LiveSync is active.

### Which SketchUp versions does LiveSync support?

It depends on the plugin build and your Lumion version. Lumion lists build 3.60.786 for SketchUp 2020 to 2025 and recommends the newer plugin from the Extension Warehouse for current releases. Check the official download page before installing.
