---
title: "Where to Download SketchUp Plugins: Official vs Community Sources"
description: "Where to download SketchUp plugins safely: Extension Warehouse, SketchUcation, developer sites and GitHub compared, with install steps and trust checks."
pubDate: 2026-10-23
category: extensions
tags:
  - extensions
  - extension warehouse
  - sketchucation
  - plugins
  - safety
aiAssisted: true
author: rosa
beat: worth-it
topicId: where-to-find-sketchup-plugins-extension-warehouse-vs-sketchucation-and-others
imageQuery: designer browsing software on laptop desk
sources:
  - title: "SketchUp Help: Installing an extension (Extension Warehouse)"
    url: https://help.sketchup.com/en/extension-warehouse/installing-trial-extension
  - title: "SketchUp Help: Extension encryption and signing"
    url: https://help.sketchup.com/en/extension-warehouse/extension-encryption-and-signing
  - title: SketchUp Extension Warehouse
    url: https://extensions.sketchup.com/
  - title: SketchUcation Tools
    url: https://sketchucation.com/plugin/696-sketchucationtools
  - title: "SketchUp Forums: Signed/Unsigned extensions?"
    url: https://forums.sketchup.com/t/signed-unsigned-extensions/37653
cover:
  src: ./images/where-to-find-sketchup-plugins-extension-warehouse-vs-sketchucation-and-others.jpg
  alt: A man wearing headphones focused on typing at his laptop in a contemporary office setting.
  credit: cottonbro studio
  creditUrl: https://www.pexels.com/photo/bearded-man-in-plaid-shirt-using-laptop-6803549/
  pexelsId: 6803549
---

Start with the Extension Warehouse. It's the official store, it installs from inside SketchUp, and it's the safest default. Go to SketchUcation or a developer's own site only when the extension you want isn't in the Warehouse, and treat anything else as "read before you install."

This is a Worth It? style rundown of where each source fits, what it costs you in trust and time, and how to install from each.

## The short answer

| Source | Best for | Cost model | Install route | Trust level |
|---|---|---|---|---|
| Extension Warehouse | First stop for almost everything | Free and paid listings | In SketchUp, or download an .rbz | Highest: Trimble's own store |
| SketchUcation Plugin Store | Community classics, niche tools | Free listings (the site advertises 900+) | SketchUcation Tools, or .rbz | Moderate: community-run |
| Developer's own site | Paid tools sold direct, newest builds | Varies by developer | .rbz via Extension Manager | Depends on the developer |
| GitHub and forum posts | Open-source and experimental tools | Usually free | .rbz or manual file copy | Lowest: you vet it yourself |

## Extension Warehouse (official)

[Extension Warehouse](https://extensions.sketchup.com/) is SketchUp's official extension store. You can browse it in a web browser without SketchUp installed, or from inside SketchUp via the Extension Manager. Per the SketchUp Help Center, most paid extensions can be bought and downloaded inside SketchUp, though some must be purchased from the developer's website, in which case you follow that site's instructions.

One concrete safety feature: the Warehouse signs uploaded extensions. SketchUp's help page describes this as injecting a signature file into the package, which SketchUp checks at install time to confirm the contents haven't changed since signing. An unsigned or altered extension may not load, depending on your Extension Loading Policy. Be clear on what that proves, though. A forum discussion of signing points out that a signature verifies integrity, not intent. It tells you the file is what the developer uploaded, not that the developer's code is harmless.

### Installing from the Warehouse

1. Open the Extension Manager from the Extensions menu (or its toolbar icon).
2. Search or browse the Warehouse, open an extension's page and install it from there.
3. Alternatively, download the .rbz from the extension's page in your browser and use the manual route below.

## Installing any .rbz file manually

This works for every source in this article. It follows SketchUp's help page:

1. Download the .rbz file. An .rbz is simply the packaged extension.
2. Open the Extension Manager from the Extensions menu or toolbar icon.
3. Click **Install Extension**.
4. Select the .rbz file and click **Open**.
5. For third-party extensions SketchUp warns you to install only from trusted sources. Click **Yes** only if you trust it.

Restart SketchUp if the extension doesn't appear. Once installed, you can enable, disable and remove it from the same Extension Manager; our guide to [managing, updating and uninstalling SketchUp extensions](/blog/how-to-manage-update-and-uninstall-sketchup-extensions/) covers that.

## SketchUcation (community)

SketchUcation is the long-running community hub, and its Plugin Store dates back to around 2013. Its current helper is SketchUcation Tools, which the site's page describes as a way to search the store and install, manage and update extensions from inside SketchUp. It also lists installing from ZIP or RBZ archives. The page lists the store as having over 900 free plugins and extensions.

### Installing SketchUcation Tools

Per SketchUcation's page, for SketchUp 2018 and later:

1. Download the SketchucationTools.rbz file from sketchucation.com.
2. Open the Extension Manager from the Extensions menu and click **Install Extension**.
3. Pick the .rbz file and restart SketchUp.

For SketchUp 2017 and earlier, the page says to do the equivalent from Preferences > Extensions. In practice, anything that old is out of support; see [SketchUp's end-of-support dates](/blog/sketchup-end-of-support-2024-ends-jan-31-2027-what-to-do/) if you're deciding whether to upgrade.

Two cautions. SketchUcation Tools is itself an extension that runs code on your machine, so the same trust rules apply to it. And community stores hold old listings. An extension that hasn't been updated in years may not load in a current SketchUp, so check the listed compatibility and last-updated date before you bother.

## Developer sites, GitHub and forums

Many of the best paid tools (rendering plugins, sub-D modelers, estimating tools) are sold directly by their developers, sometimes in addition to a Warehouse listing. That's normal. Buy from the developer's own domain, not a reseller or a "free download" mirror.

GitHub and forum attachments are where you find open-source tools and experiments. Some are excellent and actively maintained. Many are single-person projects with no signing and no review. If you use one:

- Prefer a tagged release with a downloadable .rbz over copying loose files.
- Check the last commit date and open issues.
- Read the Ruby files if you can. They're plain text and extensions can do anything Ruby can, including touching files outside your model.

## Trust and safety checklist

SketchUp extensions are Ruby code with broad access to your computer. Before installing:

- **Check the publisher.** A named developer with a website and support channel beats an anonymous upload.
- **Check the date.** Last update within your SketchUp version's lifetime is a good sign. Abandoned plugins are a maintenance liability even when they aren't malicious.
- **Be suspicious of cracked or "free" versions of paid extensions.** They're the classic route for malware, and they won't get updates.
- **Don't loosen your Extension Loading Policy just to make one extension load.** One forum thread shows developers recommending an unrestricted setting for unsigned extensions. That's their workaround for their own tools, not a general recommendation. If an extension is unsigned, ask why before overriding the check.
- **Install one at a time.** If SketchUp gets slow or unstable, you'll know which one caused it.

## Licensing models you'll meet

- **Free:** No cost, often donation-supported or open source.
- **Paid, perpetual:** One-time purchase, sometimes with paid upgrades for major versions.
- **Subscription:** Common for rendering and BIM-style tools. Cancel and it stops working.
- **Trial:** Offered by some paid extensions. Check the listing, as it varies by developer.

Watch for licenses tied to a single machine or login. If you work across a desktop and a laptop, confirm how many activations you get before paying.

## Worth it?

### Worth it?

- **Time saved:** The Warehouse route takes a couple of minutes per extension, and update checks are handled in the Extension Manager. Manual .rbz installs take about the same effort but you own the updating.
- **Cost:** Browsing and installing is free. Individual extensions are priced by their developers.
- **Who should skip it:** If you rely on SketchUp's native tools and haven't hit a specific bottleneck, don't collect extensions "just in case." If you're upgrading SketchUp, read how to [migrate extensions and preferences](/blog/sketchup-migrate-extensions-and-preferences-update-without-pain/) first.

My rule: Warehouse first, then the developer's site, then SketchUcation for community tools, and GitHub only for things you're willing to inspect.

## FAQ

### Is the SketchUp Extension Warehouse free to use?
Browsing and downloading free extensions is free, and you don't need SketchUp installed to browse it. Paid extensions are priced by their developers, and per SketchUp Help, some are purchased from the developer's own site.

### Is SketchUcation safe?
It's a long-established community site, but it isn't Trimble's store, and listings vary in age and quality. Apply the same checks you would anywhere else: known author, recent updates, and compatibility with your SketchUp version.

### Why won't my downloaded plugin load?
Common causes are an unsigned or modified extension blocked by your Extension Loading Policy, an extension built for an older SketchUp version, or a missing restart. Check the Extension Manager to see whether it's installed but disabled.

### Can I install a plugin without the Extension Warehouse?
Yes. Download the .rbz from any source, then use Extension Manager > **Install Extension** and select the file.
