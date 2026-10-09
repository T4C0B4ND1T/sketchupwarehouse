---
title: "How to Manage SketchUp Extensions: Update, Disable, Uninstall"
description: "Learn to manage SketchUp extensions with Extension Manager: update, disable or uninstall them, find the Plugins folder and fix load errors."
pubDate: 2026-10-09
category: extensions
tags:
  - extensions
  - extension manager
  - troubleshooting
  - plugins
  - maintenance
aiAssisted: true
author: rosa
beat: worth-it
topicId: how-to-manage-update-and-uninstall-sketchup-extensions
imageQuery: organized workshop tool wall
sources:
  - title: Managing Extensions - SketchUp Help
    url: https://help.sketchup.com/en/extension-warehouse/managing-extensions
  - title: Adding Extensions to SketchUp - SketchUp Help
    url: https://prod-aws-help.sketchup.com/article/3000263
  - title: Extensions won't update from Extension Manager - SketchUp Forums
    url: https://forums.sketchup.com/t/extensions-wont-update-from-extension-manager/79348
  - title: Uninstalled extensions keep coming back - SketchUp Forums
    url: https://forums.sketchup.com/t/uninstalled-extensions-keep-coming-back/347750
  - title: Load Errors on Startup - SketchUp Forums
    url: https://forums.sketchup.com/t/load-errors-on-startup/33787
cover:
  src: ./images/how-to-manage-update-and-uninstall-sketchup-extensions.jpg
  alt: Neatly organized tools hanging on a workshop wall, including hammers and scissors.
  credit: cottonbro studio
  creditUrl: https://www.pexels.com/photo/hammer-and-mallets-hanging-on-the-wall-7484795/
  pexelsId: 7484795
---

Everything you need to manage SketchUp extensions lives in the Extension Manager, under **Extensions > Extension Manager**. Disable an extension when you want it off but intact, uninstall it when you're done with it, and update through the Manage tab. If something fails to load, the Ruby Console will tell you why.

Treat this as a ten-minute housekeeping job a couple of times a year. Every extension you keep loaded is something that can slow startup or break after an upgrade.

## Open the Extension Manager

In SketchUp, choose **Extensions > Extension Manager**. The window has a Home tab, where you enable and disable extensions, and a Manage tab, where you update and uninstall them. The same window is where you install a downloaded `.rbz` file, using its **Install Extension** button.

The Extension Manager also syncs with the My Extensions page on the Extension Warehouse website, so what you install and manage in one place is reflected in the other. One catch: extensions you installed manually from another source won't show up on the Warehouse page.

For the easiest installs, open the Warehouse from inside SketchUp via **Extensions > Extension Warehouse**. From a regular browser you only get a Download button, and you then install the file yourself.

## Disable vs uninstall

| | Disable | Uninstall |
|---|---|---|
| Where | Home tab toggle | Manage tab, Uninstall |
| Extension files | Stay on disk | Removed |
| Reversible in one click | Yes | No, you reinstall |
| Best for | Testing, troubleshooting, seasonal tools | Abandoned or replaced extensions |

### Disable

On the Home tab, use the toggle beside the extension. The Enable and Disable links at the top of the window apply to all extensions at once. Disabling everything is a fast way to test whether an extension is behind a crash or slowdown: turn them all off, then re-enable in small batches.

### Uninstall

On the Manage tab, click **Uninstall** beside an extension. The Uninstall button at the top right removes all of them, so read the button before you click.

Some extensions are built into SketchUp. A forum thread on [uninstalled extensions that keep coming back](https://forums.sketchup.com/t/uninstalled-extensions-keep-coming-back/347750) reports that bundled ones can't be removed, only switched off. The same thread says that deleting the `.rb` files by hand, as some online guides suggest, just means SketchUp restores them at launch. That's community advice rather than official documentation, but the practical takeaway is simple: use the Extension Manager, not file deletion.

### Worth it?

- **Time:** A few minutes per audit, and it pays back in a cleaner startup and fewer mystery conflicts.
- **Cost:** Free. It's all built in.
- **Skip it if:** You run two or three extensions and nothing misbehaves. Check for updates after major SketchUp releases and leave it at that.

## Update extensions

SketchUp shows a notification when you open a new or existing model and an update is available. Click **Update Now** there, or:

1. Open **Extensions > Extension Manager**.
2. Go to the **Manage** tab.
3. Click **Update** beside one extension, or the **Update** button at the top right to update everything.

Updates are only offered for extensions the Extension Manager knows about. Anything installed by hand from a developer's site needs the developer's own update route, usually a new `.rbz`.

### When an update won't take

Forum users report cases where the Extension Manager says an update finished but the version didn't change. In [that thread](https://forums.sketchup.com/t/extensions-wont-update-from-extension-manager/79348), suggestions include signing out of the Extension Warehouse and back in, updating from the Warehouse inside SketchUp instead, or uninstalling and reinstalling the extension. These are user reports, not official fixes, but they are the cheapest things to try in that order.

Back up anything that stores custom settings before you uninstall. If you're moving to a new SketchUp version rather than just updating one extension, see [how to migrate extensions and preferences](/blog/sketchup-migrate-extensions-and-preferences-update-without-pain/) first.

## Check who made an extension

On the Manage tab, click the arrow on the right of an entry to expand it. You'll see its digital signature and developer details. Do this for anything you didn't install through the Warehouse. When you install a downloaded `.rbz`, SketchUp may show a trust warning; accept it only if you trust the source.

I'd also be wary of extensions with no recent updates and no active developer. They tend to be the ones that break on the next SketchUp release, and a dead plugin is a bigger risk than a missing feature.

## Find the Plugins folder

Don't guess at paths, because the location differs by operating system and SketchUp version. Ask SketchUp instead:

1. Open **Window > Ruby Console**.
2. Type `Sketchup.find_support_file("Plugins")` and press <kbd>Enter</kbd>.
3. The console prints the folder path for your installation.

To open that folder directly, forum moderators suggest `UI.openURL("file:///#{Sketchup.find_support_file('Plugins')}")`.

One thing not to do: don't drop `.rbz` files into the Plugins folder. An `.rbz` is a package that the Extension Manager unpacks, so install it with the **Install Extension** button.

## Troubleshoot load errors

A load error at startup usually means one extension is failing and the rest are fine. Work through this:

1. **Read the error.** SketchUp reports load errors on startup. Open the Ruby Console to see the full message and the file name involved.
2. **Reproduce it.** Following advice in the forum thread on [load errors on startup](https://forums.sketchup.com/t/load-errors-on-startup/33787), you can type `load 'yourfile.rb'` in the console to get the complete error.
3. **Look for missing dependencies.** A "cannot load such file" message usually means a required file is absent, so reinstall the extension rather than patching it.
4. **Disable and bisect.** Disable everything on the Home tab, then re-enable in batches until the problem returns.
5. **Check compatibility.** Older extensions may not run on newer SketchUp versions. Look at the developer's page or the extension's Warehouse listing for supported versions.
6. **Reinstall cleanly.** Uninstall the extension in the Manage tab, restart SketchUp, and install the current version.

On Mac, one forum case traced load failures to a case-sensitive disk format, so check that if the usual fixes fail. Also watch for old plugins that leave their own `sketchup.rb` or `extensions.rb` in the Plugins folder. Identify which plugin put it there before removing anything.

If your model is slow rather than failing to load, extensions are only one suspect. The [slow model checklist](/blog/sketchup-slow-model-file-size/) covers the rest.

## A simple maintenance routine

- After each SketchUp upgrade, open the Manage tab and update everything.
- Disable, don't delete, extensions you use only for certain projects.
- Uninstall anything you haven't opened in a year.
- Keep the `.rbz` for every manually installed extension in one folder so you can reinstall quickly.
- If you assign shortcuts to extension commands, review them after removing extensions; see [SketchUp keyboard shortcuts](/blog/sketchup-keyboard-shortcuts/).

## FAQ

### How do I update all my SketchUp extensions at once?

Open **Extensions > Extension Manager**, go to the Manage tab and click the Update button at the top right. It updates the extensions the Extension Manager tracks.

### Should I disable or uninstall an extension I rarely use?

Disable it if you might need it again, since its files stay in place and one toggle brings it back. Uninstall it if it's abandoned or replaced.

### Why does an extension I uninstalled keep coming back?

It is probably built into SketchUp, or you deleted its files by hand and SketchUp restored them. Use the Extension Manager, and switch off bundled extensions rather than trying to remove them.

### Where is the SketchUp Plugins folder?

It varies by system and version. In the Ruby Console, run `Sketchup.find_support_file("Plugins")` to get the exact path on your machine.
