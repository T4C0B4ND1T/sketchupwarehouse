---
title: SketchUp System Requirements Explained (2027 and Beyond)
description: What SketchUp 2027 actually requires on Windows and Mac, what the official minimums leave out, and practical hardware picks for small, medium and big models.
pubDate: 2026-11-11
category: hardware
tags:
  - system requirements
  - hardware
  - windows 11
  - apple silicon
  - gpu
  - ram
aiAssisted: true
author: theo
beat: rig-check
topicId: sketchup-system-requirements
imageQuery: desktop computer workstation dual monitors
sources:
  - title: SketchUp Hardware and Software Requirements (SketchUp Help Center)
    url: https://help.sketchup.com/en/sketchup/system-requirements
  - title: End of Support - Intel Mac and Windows 10 (SketchUp Help Center)
    url: https://help.sketchup.com/en/end-support-intel-mac-windows
  - title: "Important Update: End of Support for Intel Mac and Windows 10 in Future SketchUp for Desktop Releases (SketchUp Forums)"
    url: https://forums.sketchup.com/t/important-update-end-of-support-for-intel-mac-and-windows-10-in-future-sketchup-for-desktop-releases/350196
cover:
  src: ./images/sketchup-system-requirements.jpg
  alt: A clean and stylish workspace featuring dual monitors, a lamp, and office supplies.
  credit: Lee Campbell
  creditUrl: https://www.pexels.com/photo/imac-aluminum-on-table-115655/
  pexelsId: 115655
---

SketchUp 2027 needs Windows 11 or a Mac with Apple silicon, at least 8 GB of RAM on Windows, a discrete graphics card on Windows, and 6 GB of free disk space. Those are minimums, though, and they describe a machine that opens SketchUp, not one that stays pleasant with a large model. This guide covers the official numbers first, then what I'd actually buy or upgrade.

## The official requirements

SketchUp's Help Center currently lists SketchUp 2025, 2026 and 2027 as supported, and says 2024 and older are not. The table below is for SketchUp 2027.0 and later, taken from the Help Center's requirements page.

| | Windows | Mac |
|---|---|---|
| Operating system | Windows 11 | macOS 27 (Golden Gate), 26 (Tahoe) or 15 (Sequoia) |
| Processor | 2+ GHz | Apple silicon required; listed as a 2.1+ GHz processor or a current-generation M1 |
| RAM | At least 8 GB | No figure given; the page says Apple devices with an M-series chip meet the minimum RAM and graphics requirements |
| Graphics | A discrete (separate from the CPU) graphics card; classic renderer needs OpenGL 3.1 | New graphics engine needs Metal 2 support |
| Disk space | At least 6 GB free | At least 6 GB free |
| Other | Microsoft .NET Framework 4.6.2 or higher; 3-button scroll-wheel mouse | 3-button scroll-wheel mouse |

Everywhere, you need an internet connection to install SketchUp and authorize your subscription, and some features need a connection to work.

Two things in that table are easy to skim past:

- **Discrete GPU on Windows.** A graphics card separate from the CPU is listed as a requirement. A laptop that only has integrated graphics falls below the line.
- **The mouse.** A three-button, scroll-wheel mouse is on the official list. Orbit is the middle button, so a trackpad-only workflow is an upgrade you'll feel quickly.

### What changed in 2027

Support for Windows 10 and Intel Macs ends with SketchUp 2027.0. According to the Help Center:

- 2027.0 and later require Windows 11. SketchUp may still install on Windows 10, but as an unsupported OS it may be unstable.
- 2027.0 and later require Apple silicon. Intel Mac users can't install 2027.0 or later updates, and Macs from 2019 or earlier are no longer supported.
- SketchUp 2026.2 stays a fully supported legacy version, so Windows 10 and Intel Mac users can keep working on it.

If you're deciding whether to stay on 2026.2, keep an eye on the support timeline in our post on [SketchUp end of support and the January 2027 cutoff for 2024](/blog/sketchup-end-of-support-2024-ends-jan-31-2027-what-to-do/). For what else is new in the release, see [SketchUp 2027: Procedures, the Mac rebuild and Intel being dropped](/blog/sketchup-2027-is-out-procedures-mac-rebuild-intel-dropped/).

## What the minimums leave out

The official page is a floor. Here is where I'd go past it, and why. These are my recommendations, not Trimble's.

### Graphics memory

The Help Center recommends a modern GPU with at least 8 GB of VRAM for models that use PBR texture maps, ambient occlusion and image-based lighting. That's the one place the page goes beyond bare minimums, and it's worth taking seriously: if you plan to use those display features, VRAM is the number to check on a spec sheet, not just the card's model name.

### RAM

Eight gigabytes gets SketchUp running, but your operating system, browser, PDF set and a renderer all share it. For anyone working on full building models, I'd treat 16 GB as the practical starting point and 32 GB as comfortable if you keep a render engine or viewer open beside SketchUp. This is a judgment call based on how many applications you run at once, not a SketchUp-published threshold.

### The CPU matters in a specific way

SketchUp's core modeling work, such as drawing, pushing and pulling, and editing geometry in a large model, is something you feel as single-thread responsiveness. A fast clock speed tends to help more than a long core count. Extra cores earn their keep in renderers and some analysis tools, not in everyday modeling. Check which of your tools use multiple cores before paying for them.

### Storage

Six gigabytes is the install footprint. Your real storage need is models, component libraries, texture collections and renders. An SSD is the sensible default for any machine bought now; I'd keep a few hundred gigabytes free for working files.

## Rig tiers: what to aim for

These tiers describe what I'd look for, not tested benchmarks. Prices shift too often to quote, so I've skipped them.

| Tier | Who it suits | What to look for |
|---|---|---|
| Budget | Hobbyists, woodworkers, small interiors | Windows 11 machine with a discrete GPU, 16 GB RAM, SSD; or a base Apple silicon Mac |
| Mid-range | Architects and designers with mid-size models and some real-time rendering | Discrete GPU with 8 GB or more VRAM, 32 GB RAM, fast CPU clock; or a higher-memory Apple silicon Mac |
| Heavy | Large site models, big component libraries, rendering beside modeling | The best single-thread CPU you can afford, a GPU with generous VRAM, 32 GB or more RAM |

### Windows or Mac?

It depends on what else you run. If your plugins and renderers are Windows-first, or you work with Revit, Windows is the less awkward choice. If you value battery life and quiet and your toolset runs on macOS, Apple silicon is now the only Mac option for new SketchUp releases anyway. Check that your key extensions and render engine support your platform before you commit.

### Don't overspend on

- **A workstation GPU you don't need.** For modeling alone, a mid-range discrete card is plenty. Spend on VRAM only if you use PBR textures and the lighting features above, or a GPU renderer.
- **Core count for modeling.** More cores won't speed up pushing and pulling.
- **RAM beyond your workload.** If your files are small, 64 GB is money better spent on an SSD or a monitor.
- **A 4K-everything setup** if it means choosing a weaker GPU to pay for the screen.

For laptop-specific advice by budget, see [best laptop for SketchUp](/blog/best-laptop-for-sketchup/).

## Check your own machine

1. On Windows, press <kbd>Win</kbd> + <kbd>R</kbd>, type `dxdiag`, and press <kbd>Enter</kbd>. The System tab shows your processor and memory, and the Display tab shows your graphics card.
2. On a Mac, open the Apple menu and choose **About This Mac** to see the chip and memory. An Intel chip means you're limited to 2026.2.
3. Compare against the table above, particularly the OS version and whether your GPU is discrete.
4. If everything passes but SketchUp still drags, the model is often the problem rather than the machine. Our guide to [why a SketchUp model gets slow](/blog/sketchup-slow-model-file-size/) walks through the fixes.

## FAQ

### Can I run SketchUp 2027 on Windows 10?

Not as a supported setup. 2027.0 and later require Windows 11. The Help Center says it may still install on Windows 10, but as an unsupported OS it may be unstable. SketchUp 2026.2 remains a fully supported option.

### Does SketchUp 2027 run on an Intel Mac?

No. 2027.0 and later require Apple silicon. Intel Mac users should stay on SketchUp 2026.2 or an earlier supported version.

### How much RAM does SketchUp need?

On Windows, the official minimum is 8 GB. For larger models and multitasking I'd start at 16 GB. The Mac page gives no separate figure and says M-series Apple devices meet the minimum RAM requirement.

### Do I need a dedicated graphics card for SketchUp?

On Windows, the requirements page calls for a discrete graphics card. It also recommends a modern GPU with at least 8 GB of VRAM if you use PBR texture maps, ambient occlusion and image-based lighting. On Mac, Apple silicon with Metal 2 support covers the requirement.
