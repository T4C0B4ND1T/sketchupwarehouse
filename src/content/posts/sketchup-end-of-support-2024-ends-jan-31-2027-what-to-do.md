---
title: "SketchUp End of Support: 2024 Ends Jan 31, 2027 – What to Do"
description: SketchUp's End of Support page was updated Oct 6, 2026. SketchUp 2024 loses support on Jan 31, 2027 – here is what stops working and how to plan the upgrade.
pubDate: 2026-10-13
category: news
tags:
  - sketchup
  - end of support
  - upgrade
  - sketchup 2026
  - licensing
aiAssisted: true
author: rosa
beat: tuesday-brief
imageQuery: architect working at desk calendar planning
sources:
  - title: SketchUp End of Support Policy (SketchUp Help Center)
    url: https://help.sketchup.com/en/admin/end-of-support-policy
  - title: SketchUp Desktop 2026.2 release notes (SketchUp Help Center)
    url: https://help.sketchup.com/en/sketchup-desktop-20262
  - title: October 2026 Developer Meetup (SketchUp Community)
    url: https://forums.sketchup.com/t/october-2026-developer-meetup/350082
cover:
  src: ./images/sketchup-end-of-support-2024-ends-jan-31-2027-what-to-do.jpg
  alt: Young architect at a desk working on blueprint designs under lamp light.
  credit: Ron Lach
  creditUrl: https://www.pexels.com/photo/adult-man-sitting-on-chair-by-deck-and-drawing-9617369/
  pexelsId: 9617369
---

If you are still working in SketchUp 2024, the clock is running: its End of Support date is January 31, 2027, about three and a half months from now. SketchUp's official End of Support page was updated on October 6, 2026, and it is the page to check before you decide whether to upgrade now or later.

This is a planning story, not an emergency. Nothing breaks overnight. But a few things degrade quietly once a version is unsupported, and it is cheaper to handle them on your schedule than during a client deadline.

## What the policy says

According to SketchUp's Help Center, desktop versions become unsupported on January 31 of the third year after the version year. The page lists these dates:

| Version | End of Support |
|---|---|
| 2023 and earlier | Already unsupported |
| 2024 | January 31, 2027 |
| 2025 | January 31, 2028 |
| 2026 | January 31, 2029 |

The page also notes that these dates may vary depending on when the newest version is released, so treat them as current rather than guaranteed. I did not find a changelog on the page, so I cannot tell you exactly what changed on October 6. The page itself says SketchUp 2026 is the latest version.

## What stops working on an unsupported version

The policy lists several consequences. The one that matters most day to day is web services:

- **Online features stop.** Features that need an internet connection stop working, including 3D Warehouse, Extension Warehouse, Add Location, Generate Report, Sefaira, Live Components and Trimble Connect. The stated reason is that the embedded web browsers in older versions are outdated and cannot be updated.
- **Extensions may misbehave.** Many extensions use embedded browsers for their dialogs, and extensions built for newer versions may not work well, or at all, on old ones.
- **No help from support.** Support will ask you to upgrade before going further, and SketchUp will not provide download links for unsupported versions.
- **Security.** Unsupported versions carry greater security risk.

The practical cost: if you rely on pulling components from 3D Warehouse or installing extensions through Extension Warehouse, an unsupported install is a much weaker tool. Keep a copy of your installer if you must stay on an old version, because you will not be able to get it from SketchUp later.

## File compatibility

The policy points out that SketchUp 21.0 introduced a versionless file format that works forwards and backwards. Starting with 24.0, you can no longer save .skp files in a format compatible with older, unsupported versions. If you send files to a consultant who is on 2023 or earlier, expect friction. Agree on a version with the people you exchange files with, or export to a neutral format. If your destination is Revit, the [SketchUp to Revit workflow](/blog/how-to-get-a-sketchup-model-into-revit-and-keep-it-clean/) covers keeping the exchange clean.

## Licensing: who can upgrade for free

Per the policy page:

- **Pro, Studio and Higher Education subscribers** get supported desktop versions as part of the subscription. Download the latest from the SketchUp downloads page.
- **Classic licenses** are only valid for the version that was purchased. Moving to a current version requires a Pro or Studio subscription. That is a recurring cost, so price it against how many seats you actually need.
- **SketchUp Go and Free** do not include the desktop client.
- **Managed machines** in labs or organizations: your administrator may already have a newer version to distribute, so ask before buying anything.

To confirm your subscription, log in to the Trimble Account Management Portal and open Plan Settings. To check which version you run, open About SketchUp (Help menu on Windows, SketchUp menu on Mac).

## The upgrade is less painful than it used to be

SketchUp 2026.2 was released on May 19, 2026, and its release notes say the Migrate Extensions tool can now move extensions from an earlier supported version without restarting SketchUp. On Windows, panel tray customizations come along. Note the wording: *supported* version. Migrate while your old version is still on the supported list. Our guide to [migrating extensions and preferences](/blog/sketchup-migrate-extensions-and-preferences-update-without-pain/) walks through it.

2026.2 also made the improved LayOut graphics engine the default and added LayOut clipping masks for groups and scaled groups. For the full list, see our [2026.2 rundown](/blog/whats-new-in-sketchup-20262-analysis-hub-layout-and-more/).

A sensible upgrade routine, in order:

1. Open About SketchUp and note your version.
2. Check your subscription in the Trimble Account Management Portal.
3. Install the new version alongside the old one; do not uninstall yet.
4. Run Migrate Extensions, then open your template and a live project.
5. Check each extension you depend on is still maintained. [Updating or removing extensions](/blog/how-to-manage-update-and-uninstall-sketchup-extensions/) is a good moment to drop abandoned ones.
6. Retire the old version once a real project has opened and saved cleanly.

### Worth it?

- **Time:** an afternoon for a single machine with a handful of extensions; longer if you have custom templates or many plug-ins.
- **Cost:** nothing extra on an active Pro, Studio or education subscription. Classic-license holders need a subscription.
- **Who can skip it for now:** offline-only users on 2024 who never use 3D Warehouse, Extension Warehouse or Trimble Connect. Even then, set a date before January 31, 2027.

## A side note for extension developers

A post on the SketchUp Community forum from September 21, 2026 says the October online Developer Meetup is postponed until the start of November. No new date was given. If you maintain extensions, watch that forum category.

## What this means for you

- **On SketchUp 2023 or earlier:** act now. You are already unsupported and online features are affected.
- **On SketchUp 2024:** plan the move before January 31, 2027. Do the migration while 2024 is still supported.
- **On SketchUp 2025:** ignore for now. Your date is January 31, 2028.
- **On SketchUp 2026:** nothing to do; you are covered until January 31, 2029.
- **On a classic license:** act now to price a subscription against your budget.
- **Extension developers:** watch for the rescheduled November meetup.

## FAQ

### When does SketchUp 2024 lose support?
January 31, 2027, according to SketchUp's End of Support Policy page.

### Will my SketchUp 2024 files stop opening?
The policy page does not say that. It does say that from version 24.0 you cannot save .skp files in a format compatible with older, unsupported versions.

### Does an unsupported version still run?
The page lists consequences, not a shutdown: some basic features become unavailable, web-based services stop working, extensions may fail and support will ask you to upgrade.

### Is the upgrade free?
For active Pro, Studio and Higher Education subscribers, supported desktop versions are included. Classic licenses are only valid for the version purchased, so moving to a current version requires a subscription.
