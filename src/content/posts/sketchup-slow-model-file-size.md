---
title: Why Is My SketchUp Model So Slow? 12 Fixes That Work
description: A slow SketchUp model is almost always fixable. Twelve practical ways to cut file size, reduce lag when orbiting and keep large projects responsive.
pubDate: 2026-09-26
category: tutorials
tags:
  - performance
  - file size
  - troubleshooting
  - tips
imageQuery: architect working on 3d building model computer
aiAssisted: true
topicId: sketchup-slow-model-file-size
sources:
  - title: SketchUp Help Center
    url: https://help.sketchup.com/en
  - title: SketchUp Community Forums
    url: https://forums.sketchup.com/
cover:
  src: ./images/sketchup-slow-model-file-size.jpg
  alt: Architect evaluating a building design on a computer screen in an office setting.
  credit: Grove Brands
  creditUrl: https://www.pexels.com/photo/architect-working-on-computer-15764110/
  pexelsId: 15764110
---

Laggy orbiting, long saves and a spinning cursor usually come down to a handful of causes: too much geometry, too many large textures, too many visible effects, or graphics drivers that aren't pulling their weight. Work through the fixes below in order — the first five solve most problems.

## 1. Purge unused items

Open **Window → Model Info → Statistics** and click **Purge Unused**. This deletes components, materials, styles and tags that exist in the file but aren't used anywhere. On models built from many 3D Warehouse downloads, it can cut file size dramatically.

## 2. Find the heavy objects

Still in **Statistics**, look at total edges and faces. Then check individual suspects: open a component and look at its face count. Plants, cars, lamps and upholstered furniture downloaded from 3D Warehouse are the usual offenders. Replace them with lighter versions or hide them while modeling.

## 3. Use components for everything repeated

Twenty identical chairs as separate groups store the geometry twenty times. As components, it's stored once. Converting repeated objects to components is one of the biggest file-size wins available. (See our guide to [groups vs components](/blog/sketchup-groups-vs-components/).)

## 4. Hide what you're not working on

SketchUp redraws everything visible every time you orbit. Put entourage, furniture, landscaping and site context on their own tags and turn them off while you work on the building. Use **scenes** to switch quickly between "working" and "presentation" views.

## 5. Turn off expensive display effects

Several style and view settings cost a lot of redraw time:

- **Shadows** — turn them off while modeling and back on for output.
- **Profiles and extensions** in the Styles edge settings — thicker edges and extensions look nice but slow down large models.
- **Fog** and **sketchy edge styles**.
- **X-ray** and **back edges** on dense models.

## 6. Shrink oversized textures

A 6000-pixel photo applied to a small tile costs memory for no visible benefit. Resize large textures in an image editor before importing — 1024 or 2048 pixels wide is plenty for most materials — and remove duplicate materials that use the same image.

## 7. Lower circle and arc segment counts

A circle's default segment count is fine for a single object, but a staircase with hundreds of round balusters multiplies it. For small or distant round objects, lower the segment count when you draw them. Soften and smooth the edges so they still look round.

## 8. Reduce nesting and hidden geometry

Hidden geometry is still loaded. Delete construction leftovers, hidden faces you'll never need and old design options, or move options into separate files. Keep nesting shallow enough that you can navigate it in the Outliner without getting lost.

## 9. Use proxies for rendering assets

If you use a renderer such as V-Ray, Enscape, D5 or Twinmotion, use its proxy or asset library for trees, people and cars. Proxies show a lightweight placeholder in SketchUp and swap in full detail only at render time.

## 10. Split huge projects into reference models

For large sites or multi-building projects, split the work into separate files and bring them together as components or through Trimble Connect references. Each file stays light, and team members can work in parallel.

## 11. Update graphics drivers and check the GPU

SketchUp relies on your graphics card for drawing the viewport. Update GPU drivers from the manufacturer (NVIDIA, AMD or Intel) rather than relying on generic OS drivers. On laptops with two GPUs, make sure SketchUp is set to use the dedicated graphics card in your operating system or GPU control panel. Check **Preferences → Graphics** for hardware acceleration and anti-aliasing settings; lowering anti-aliasing can help on weaker hardware.

## 12. Know what hardware matters

SketchUp modeling is largely single-threaded, so a CPU with **high single-core speed** tends to matter more than a high core count. A capable dedicated GPU helps viewport drawing and matters a lot for real-time renderers. Enough RAM (16 GB is a comfortable baseline for most users; more for large projects and rendering) prevents swapping. Always compare against the current official system requirements on the SketchUp Help Center.

## A quick diagnostic routine

When a model suddenly gets slow, run this 5-minute check:

1. Save a copy.
2. **Purge Unused**.
3. Turn off shadows, fog and profiles.
4. Hide all entourage tags.
5. Check **Statistics** for face count and look for the heaviest component.

If orbiting is smooth after step 4, your problem is entourage. If it's still slow after step 5, look at textures, drivers and hardware.

## FAQ

### What is a "large" SketchUp file?
It depends on your hardware, but when files grow past a few hundred megabytes, saves and autosaves start to feel slow on most machines. Face count matters more than file size for orbiting speed.

### Does autosave slow SketchUp down?
On large files, autosave can cause brief pauses. You can adjust the interval in **Preferences → General**, but don't turn it off entirely — the pauses are cheaper than lost work.

### Will more RAM make SketchUp faster?
Only if you're running out. If your system is using all available memory, adding RAM helps a lot; if it isn't, a faster CPU or GPU will help more.

### Why is SketchUp slow only in one model?
That points to the model, not your computer. Purge it, check face count and textures, and look for one very heavy imported object.
