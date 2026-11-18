---
title: "Chaos Cosmos in SketchUp: Free 3D Assets for V-Ray and Enscape"
description: What Chaos Cosmos is, which Chaos products include it, how Cosmos assets, proxies and variants behave in SketchUp, and what to check on licensing.
pubDate: 2026-11-18
category: rendering
tags:
  - chaos cosmos
  - v-ray
  - enscape
  - assets
  - proxies
aiAssisted: true
author: theo
beat: render-lab
topicId: chaos-cosmos-in-sketchup-free-3d-assets-for-v-ray-and-enscape
imageQuery: modern living room interior furniture
sources:
  - title: Chaos Cosmos – Chaos
    url: https://www.chaos.com/cosmos
  - title: "The power of dynamic geometry: V-Ray proxies and Chaos Cosmos – Chaos blog"
    url: https://blog.chaos.com/the-power-of-dynamic-geometry-v-ray-proxies-and-chaos-cosmos
  - title: Unlock more Cosmos assets in Enscape – Chaos
    url: https://www.chaos.com/enscape/cosmos-assets
  - title: V-Ray for SketchUp features – Chaos
    url: https://www.chaos.com/vray/sketchup/features
cover:
  src: ./images/chaos-cosmos-in-sketchup-free-3d-assets-for-v-ray-and-enscape.jpg
  alt: A close-up of an elegant gray sofa with an artistic decorative cushion in a modern living room.
  credit: Vidal Balielo Jr.
  creditUrl: https://www.pexels.com/photo/brown-and-white-throw-pillow-on-the-couch-11295890/
  pexelsId: 11295890
---

Chaos Cosmos is a library of render-ready 3D models, materials and HDRI skies that you browse from inside Chaos products, including V-Ray for SketchUp and Enscape. Chaos describes it as free content, but what you can actually reach depends on your product and plan, so check that before you build a workflow around it.

This article covers what Cosmos is, how its assets behave in a SketchUp scene, and the licensing questions worth settling up front.

## What Cosmos is, and who gets it

According to Chaos, Cosmos holds 30,000+ assets (furniture, vegetation, people, vehicles, lighting, materials and HDRIs) and is accessible from Enscape, V-Ray, Corona, Envision and Vantage. For a SketchUp user, the two relevant entry points are:

- **V-Ray for SketchUp.** Cosmos is built into the V-Ray interface. One third-party source says it arrived in V-Ray 5 and replaced the older material library in V-Ray 6; confirm against your installed version.
- **Enscape.** Cosmos assets are delivered through Enscape and stay in Enscape's real-time format. Chaos's Enscape page lists different asset counts by plan: Solo, Premium and Collection (the Enscape page I consulted lists 5,914, 8,907 and 11,498 Cosmos assets respectively). These figures change, so treat them as a snapshot.

SketchUp itself does not include Cosmos. You need a Chaos product that works with SketchUp, which is a paid subscription. "Free" here means the assets don't cost extra within your plan, not that the whole thing is free.

If you are weighing the two renderers, see [Lumion vs Enscape for SketchUp users](/blog/lumion-vs-enscape-for-sketchup-users/). For what changed in Enscape's asset tools recently, see [Enscape 4.22 for SketchUp users](/blog/enscape-422-for-sketchup-users-veras-20-ai-assets-cosmos/).

## Placing Cosmos assets in a SketchUp scene

The exact button layout shifts between V-Ray releases, so I'm describing the workflow rather than quoting menu paths.

1. Open the V-Ray toolbar or Asset Editor in SketchUp and open the Cosmos browser.
2. Search or filter by category (furniture, vegetation, people and so on) and choose an asset.
3. Place it in the model, then move and rotate it with SketchUp's own tools.
4. Render with V-Ray, or look at it in V-Ray Vision for a quicker preview.

Chaos says Cosmos assets come at accurate scale, so a chair should land at chair size. Still, check the scale of anything that looks off before you duplicate it fifty times. Treat placed assets like any other repeated object, and keep your file organized with [tags](/blog/sketchup-tags-layers/) so you can hide entourage when you model.

## Assets, proxies and merging

This is where people get confused. Per the Chaos blog:

- A Cosmos asset is an encapsulated file that renders as high-poly geometry. You don't convert it to place it.
- Cosmos assets carry built-in levels of detail (LODs) tied to V-Ray Vision. V-Ray for SketchUp always loads the highest LOD for rendering. V-Ray Vision defaults to the second-highest, and distant assets drop to the lowest.
- A standard V-Ray proxy mesh is what you use when you need to change materials.

You can convert an asset into an editable proxy with the merge button in the Asset Editor. Merging is irreversible: it sets the asset to High LOD, breaks the Cosmos link and removes the lower LODs that Vision uses.

### Try variants before merging

Many Cosmos assets offer material or geometry variants you can switch in the Asset Editor. Switching is non-destructive and keeps the Cosmos link and LOD behavior. Only merge when you need edits the variants can't give you, such as a custom fabric on one sofa.

Because assets load as references, the SketchUp file stays lighter than if you had imported full meshes. If a scene still crawls, [these slow-model fixes](/blog/sketchup-slow-model-file-size/) cover the usual culprits.

## Settings I'd start with

Cosmos has few real "settings", but these habits matter:

| Setting / habit | Starting value | Why |
|---|---|---|
| Asset mode | Leave as Cosmos asset | Keeps LODs and the link; lighter viewport |
| Material changes | Use variants first | Reversible; avoids merging |
| Merge to proxy | Only when needed | Irreversible, drops lower LODs |
| Preview | V-Ray Vision for layout | Uses the lower LODs, so it stays responsive |
| Final render | V-Ray renderer | Always uses the highest LOD |
| Repeated objects | Place one, then copy | Easy to swap or fix in one go |

My bias: light the scene before you dress it. A well-lit empty room tells you more about your render than a hundred plants will.

## V-Ray versus Enscape: who should use which

| If you are... | Lean toward | Reason |
|---|---|---|
| Doing still images with fine material control | V-Ray for SketchUp | Asset Editor, variants and proxy merge |
| Walking clients through a live model | Enscape | Cosmos assets stay in the real-time format |
| Needing animated people or objects | Enscape (or Vantage/Envision) | Chaos notes animated assets don't carry animation in V-Ray renders |

Neither is better for everyone. Pick by output.

## Licensing notes

I could not find the usage terms spelled out on the Cosmos page itself, which links to Terms of Use and a EULA, so read those yourself. Points I could verify:

- Chaos states its products are for professional use and not consumer use (Enscape pricing page).
- Plans renew automatically until cancelled, and asset availability varies by product and tier.
- The Cosmos page has an FAQ on commercial and advertising use, but I couldn't read its answer.

I could not confirm what happens to assets already used in a delivered project if your subscription lapses, or whether you can redistribute Cosmos files. Don't assume either way. If you ship models to clients, ask Chaos support and keep the answer on file.

## Common mistakes

- **Merging too early.** Try variants first, since a merge can't be undone.
- **Judging final quality in Vision.** It uses lower LODs than a final V-Ray render.
- **Expecting animation in V-Ray stills.** Animated assets are for Enscape, Vantage and Envision.
- **Assuming plan parity.** Your Enscape tier determines how many assets you see.

## FAQ

### Is Chaos Cosmos really free?

The assets are included with Chaos products rather than sold separately, but you need a paid Chaos product to use them, and availability varies by tier.

### Does Cosmos work with SketchUp?

Yes, through V-Ray for SketchUp and Enscape for SketchUp. Check that your installed versions include the Cosmos browser.

### What is the difference between a Cosmos asset and a V-Ray proxy?

A Cosmos asset is an encapsulated file with built-in LODs. A proxy mesh is the standard format you use when you need material edits. Merging turns the first into the second.

### Can I use Cosmos assets in client work?

Chaos products are meant for professional use, but I couldn't verify the specific asset terms. Read the Terms of Use and EULA, or ask Chaos support.
