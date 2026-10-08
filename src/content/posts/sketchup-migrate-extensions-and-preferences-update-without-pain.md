---
title: "SketchUp Migrate Extensions and Preferences: Update Without Pain"
description: SketchUp 2026.2 lets Migrate Extensions run without a restart. Here is how to move extensions, preferences, materials and templates to a new version.
pubDate: 2026-10-06
category: news
tags:
  - sketchup
  - sketchup 2026.2
  - extensions
  - migration
  - updates
aiAssisted: true
author: rosa
beat: tuesday-brief
imageQuery: architect working at desk laptop
sources:
  - title: SketchUp Desktop 2026.2 release notes (SketchUp Help Center)
    url: https://help.sketchup.com/en/sketchup-desktop-20262
  - title: Migrating After Updating (SketchUp Help Center)
    url: https://help.sketchup.com/en/migrating-to-new-version
  - title: "SketchUp 2026.2: packed with new possibilities (Design8)"
    url: https://design8.com/en/news/sketchup-2026-2-packed-with-new-possibilities/
  - title: When will SketchUp 2027 be released? (SketchUp Community)
    url: https://forums.sketchup.com/t/when-will-sketchup-2027-be-released/350044
cover:
  src: ./images/sketchup-migrate-extensions-and-preferences-update-without-pain.jpg
  alt: An architect working late at night in an office, using a laptop and surrounded by building models.
  credit: Tima Miroshnichenko
  creditUrl: https://www.pexels.com/photo/a-man-working-in-the-office-6615044/
  pexelsId: 6615044
---

SketchUp 2026.2 changed one small but useful thing for anyone who installs new versions: the Migrate Extensions tool no longer needs a restart, and your extensions appear in your workspace in the same positions as before. If you update every year, this is the part of the process that used to eat an afternoon. This article walks through the full migration so your new install feels like your old one.

A note on timing: as of this writing we did not find a new SketchUp release or Trimble announcement from the past two weeks, so this is a practical explainer based on the current official release notes (2026.2) and the Help Center's migration guide. No release date for SketchUp 2027 has been announced, and the SketchUp forum thread on the topic confirms there is no official word. SketchUp 2026 itself shipped in October 2025, so many users are thinking about their next upgrade now. Preparing is cheap, and the steps below apply to any new version.

## What changed in 2026.2

According to the [SketchUp Desktop 2026.2 release notes](https://help.sketchup.com/en/sketchup-desktop-20262), the Migrate Extensions tool now transfers extensions and preferences from previous versions without requiring you to restart SketchUp. Extensions keep their previous positions in your workspace, including Windows panel customizations.

The same release brought other changes, such as the Analysis Hub and LayOut updates. We cover those in [what's new in SketchUp 2026.2](/blog/whats-new-in-sketchup-20262-analysis-hub-layout-and-more/), so this article stays on migration.

## Who this matters to

- **Extension-heavy users.** If you run a dozen or more extensions, reinstalling each one by hand is slow and error-prone.
- **Windows users with custom panel layouts.** The Help Center notes that migrating preferences on Windows includes your panel tray customizations and other workspace changes.
- **Studios and teams.** A repeatable checklist keeps everyone's setup consistent after an update.
- **Anyone who has lost custom templates or materials** after an update and had to rebuild them.

## Step-by-step: migrate extensions and preferences

These steps follow the Help Center's [Migrating After Updating](https://help.sketchup.com/en/migrating-to-new-version) page. Menu names can differ slightly between versions, so check that page if something does not match.

### 1. Install the new version alongside the old one

Keep the old version installed until you have confirmed everything works. The migration tools read from your earlier installation, and you want a fallback for client files.

### 2. Run Migrate Extensions

SketchUp prompts you to migrate the first time you run a new version. To run it manually:

1. Go to **Extensions > Migrate Extensions**.
2. Use the options to search your device for your extensions folder.
3. Click **Next**.
4. The tool imports your extensions into the new version.

Before 2026.2 you had to restart afterwards. In 2026.2 and later, the extensions appear right away.

### 3. Run Migrate Preferences

The Extension Migrator also runs the Migrate Preferences utility. If you want to run it yourself, the Help Center recommends migrating extensions first, then:

1. Restart SketchUp.
2. Go to **File > Migrate Preferences**.
3. Select the SketchUp version you want to migrate from.
4. Click **Migrate**.
5. Restart SketchUp again.

This carries over customized settings. Check your shortcuts afterwards. If you maintain a custom set, our guide to [SketchUp keyboard shortcuts](/blog/sketchup-keyboard-shortcuts/) covers setting them up, and the Help Center also has an Importing and Exporting Shortcuts page for a backup.

### 4. Copy templates, components, materials and styles

Extension and preference migration is not everything. The Help Center lists classifications, components, materials, styles and templates as items you can transfer by copying files.

On Windows:

1. In the old version, open **Window > Preferences** and go to **Files**.
2. Open the relevant folder in File Explorer and copy its contents somewhere safe.
3. In the new version, open the same **Files** section and open the matching folder.
4. Paste the files in.

On macOS, the guide uses Finder: choose **Go > Go to Folder**, enter the old version's path (for example `~/Library/Application Support/SketchUp 2023/SketchUp`), copy the files, then paste them into the matching new-version folder. You may need to create folders for some file types.

### 5. Recover the classic material libraries if you want them

For SketchUp 2025 and later, the Help Center says new default libraries were introduced, with an expanded SketchUp material library in 3D Warehouse. If you preferred the older collections, copy the folders from the old installation's Materials location and add them in the Materials panel using **Details > Add collection to favorites**. The exact folder paths for Windows and macOS are on the Help Center page.

## Common problems and fixes

**A purchased extension asks for a license again.** The Help Center notes that purchased extensions from outside Extension Warehouse may need to be reauthorized after migration. Have your license keys or vendor accounts handy.

**An extension did not show up.** Some extensions only support certain SketchUp versions. Check the extension's page on Extension Warehouse or the developer's site for compatibility, and update it if the developer has released a newer build.

**Your panel layout looks wrong.** Confirm you ran Migrate Preferences and selected the correct source version, then restart. On Windows, panel tray customizations are part of what that utility moves.

**The new version feels slower than the old one.** Migrating every extension also migrates the ones you no longer use. Open the Extension Manager and disable what you do not need. Extensions are a common cause of sluggishness; see [why your SketchUp model is slow](/blog/sketchup-slow-model-file-size/) for other fixes.

## What you should do now

1. Make a list of your installed extensions and their license keys.
2. Copy your templates, custom materials and shortcut files to a backup folder.
3. When you install any new version, keep the old one until a few real projects have opened and saved cleanly.
4. Do not assume a model saved in a newer version will open in an older one. Keep a copy of important project files before you open them in a new release.

## FAQ

### Do I need to restart SketchUp after Migrate Extensions in 2026.2?

According to the 2026.2 release notes, no. The tool transfers extensions and preferences without a restart, and extensions appear in the same workspace positions. The Help Center's preference migration steps still include restarting SketchUp before and after running Migrate Preferences, so follow that page if you run the preferences step yourself.

### Where is Migrate Extensions in SketchUp?

Go to **Extensions > Migrate Extensions**. SketchUp also prompts you to run it the first time you open a new version.

### Will my paid extensions still work after migrating?

Usually, but the Help Center warns that purchased extensions from outside Extension Warehouse may need to be reauthorized. Keep your licenses accessible.

### When is SketchUp 2027 coming out?

No official release date has been announced. The SketchUp 2026 release came in October 2025, but that is only a pattern, not a promise. Watch the SketchUp Community forum and the Help Center release notes for the real announcement.
