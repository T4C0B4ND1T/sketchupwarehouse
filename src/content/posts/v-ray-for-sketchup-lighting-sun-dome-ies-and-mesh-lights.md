---
title: "V-Ray for SketchUp Lighting: Sun, Dome, IES and Mesh Lights"
description: "Learn when to use each V-Ray for SketchUp light: Sun, Dome with HDRI, IES, Rectangle and Mesh lights, plus how to fix overexposed, washed-out renders."
pubDate: 2026-10-05
category: rendering
tags:
  - vray
  - lighting
  - hdri
  - sketchup
  - rendering
aiAssisted: true
author: theo
beat: render-lab
topicId: v-ray-for-sketchup-lighting-sun-dome-ies-and-mesh-lights
imageQuery: modern living room natural light
sources:
  - title: Lights - V-Ray for SketchUp - Chaos Docs
    url: https://documentation.chaos.com/space/VSKETCHUP/109776489/Lights
  - title: Dome Light - V-Ray for SketchUp - Chaos Docs
    url: https://documentation.chaos.com/space/VSKETCHUP/109790396
  - title: Rectangle Light - V-Ray for SketchUp - Chaos Docs
    url: https://documentation.chaos.com/space/VSKETCHUP/109777165
  - title: Improve Dome Light and HDRI Maps in V-Ray for SketchUp - Educk.org
    url: https://educk.org/improve-dome-light-and-hdri-maps-in-v-ray-for-sketchup/
  - title: Best Lighting in V-Ray for SketchUp - Educk.org
    url: https://educk.org/best-lighting-in-v-ray-for-sketchup/
  - title: "V-Ray Tip: Match V-Ray Sun Intensity to Physical Camera Exposure - NovEdge"
    url: https://novedge.com/blogs/design-news/v-ray-tip-match-v-ray-sun-intensity-to-physical-camera-exposure
cover:
  src: ./images/v-ray-for-sketchup-lighting-sun-dome-ies-and-mesh-lights.jpg
  alt: Inviting modern living room featuring a leather sofa, armchair, and a warm fireplace for relaxation.
  credit: Curtis Adams
  creditUrl: https://www.pexels.com/photo/cozy-living-room-with-a-fireplace-and-a-carpet-24245758/
  pexelsId: 24245758
---

For most V-Ray for SketchUp scenes you need three things: the Sun for daylight direction and shadows, a Dome Light (usually with an HDRI) for sky and ambient light, and a few artificial lights such as IES, Rectangle or Mesh lights for interiors. Brightness problems almost always come from stacking lights and then fighting them with multipliers, rather than controlling the camera exposure.

This guide covers what each light does, when to pick it, and how to avoid the overexposure mistakes that make renders look flat and blown out. Exact UI labels and defaults can differ between V-Ray versions, so check the Asset Editor in your own install.

## The V-Ray light types at a glance

According to the Chaos documentation for V-Ray for SketchUp, the available lights include Omni, Rectangle, Spot, Sphere, Dome, Sun, Sky, IES, Mesh (Light Mesh) and Luminaire lights. The Sun is created automatically with the scene, so it has no separate creation icon. Negative intensity values are not allowed for any light.

| Light | Best for | Watch out for |
|---|---|---|
| Sun (with Sky) | Exterior daylight, sun patches through windows | Over-bright interiors if the camera isn't balanced |
| Dome | HDRI sky and soft ambient light, window views | Double lighting if you also use a bright Sun and sky |
| Rectangle | Windows as light sources, panel lights, soft fill | Facing the wrong way (single-sided) |
| IES | Downlights, spotlights, real fixture patterns | Placing the light inside the geometry |
| Sphere / Omni | Lamp bulbs, candles, simple glow | Hot spots from very small, very bright sources |
| Mesh | Custom shapes: LED strips, neon, lamp shades | Heavy scenes with many complex meshes |

## Sun: direction, shadows and the daylight baseline

The V-Ray Sun is a light source that simulates the sun in the sky. In V-Ray for SketchUp it follows SketchUp's shadow settings, so the date, time and geolocation you set in your model drive where the sun falls. Set your location before judging any lighting.

Use the Sun when you want:

- Crisp, directional shadows in exterior views.
- Light patches on floors and walls through windows.
- Accurate seasonal or time-of-day studies.

Keep the Sun intensity multiplier near its default and change the camera exposure instead. Advice from a V-Ray tip on matching sun to camera exposure is to light in physical units and adjust the exposure, not light power, for overall brightness. If shadows are too sharp, increase the Sun's size setting (usually called a size multiplier) for softer edges rather than lowering intensity.

## Dome Light: sky, HDRI and ambient fill

Chaos describes the Dome Light as creating light within a spherical dome to emulate traditional global illumination, frequently used to load HDRI environment images. It's the quickest way to get realistic, soft lighting with believable reflections.

### Setting up an HDRI dome

1. Add a Dome Light from the V-Ray toolbar and open the Asset Editor.
2. In the Dome Light properties, load your HDRI in the texture slot. Educk recommends 4K or 8K maps from sources such as Poly Haven.
3. Set the Dome Light shape to Sphere (the default in newer versions).
4. Start the intensity around 100 and tune from there. One SketchUp V-Ray tutorial suggests a range of roughly 30–100 depending on the HDRI, and higher for interiors. Treat these as starting points, not rules.
5. Expand the texture's Texture Placement section and change **Rotate H** to move the sun position in the HDRI. This changes both the shadows and what you see through windows.
6. If you also use the V-Ray Sun, avoid conflicting light sources. The same tutorial advises disabling the sunlight contribution in the Dome Light properties when the HDRI already contains a sun.

### Separating lighting from background

A bright HDRI often looks wrong as a backdrop even when it lights the scene well. A workaround from Educk is to use two Dome Lights: set the main one to **Invisible** so it lights the scene without showing in the background, then add a second dome for the background only and untick its Shadows, Affect Diffuse, Affect Specular and Affect Reflections options. You can also use the Finite Dome settings in V-Ray 6 and later to control background size and ground blend, and the color tools to desaturate an over-vibrant map.

## IES lights: real fixtures, real patterns

Chaos describes IES lights as simulating the distribution pattern of a light source by loading an IES file, which holds details such as intensity and falloff. They are the right choice for recessed downlights, track lights, wall washers and anything where the shape of the light pool matters.

Practical tips:

- Download IES profiles from the manufacturer of the fixture you're specifying. That makes the render match the product.
- Place the light just below the ceiling surface, not inside it. Educk specifically warns to put it underneath the model, not inside, or it won't work properly.
- Don't also add a Sphere light inside a downlight model unless you want extra glow. One light per fixture is cleaner.
- Use the profile's own intensity first. Only adjust if the IES file lacks proper values.

## Rectangle lights: windows and soft panels

The Chaos docs call the Rectangle Light a planar light source shaped like a rectangle or circular disk, useful for man-made sources like lamps in an interior. It also has a Directionality setting from 0 to 1: closer to 1 focuses the light more, closer to 0 spreads it to all sides.

Common uses:

- A rectangle light placed in a window opening to supply soft daylight in interiors, especially when the Dome alone is not enough.
- Ceiling light panels and cove lighting.
- Large softboxes for product shots.

Larger lights give softer shadows. Check the arrow or facing direction when you place one, because a light facing the wrong way is a classic "why is my room dark" problem.

## Mesh lights: custom shapes

Chaos says Mesh lights create light sources with volume and shape defined by scene geometry, removing the need for self-illuminated objects. In SketchUp, you typically convert a group or component into a light mesh through V-Ray's tools. Use them for LED strips, neon tubes, shaped pendant shades and glowing signs.

Keep the geometry simple. A complex mesh with many polygons is harder to sample, and noise will show faster than with a simple rectangle. If a plain rectangle gives the same look, use that.

## Realistic intensities and fixing overexposure

There is no single correct number because units, camera settings and HDRIs all interact. What does hold up is the order of operations.

### Fix exposure before lights

1. Use a V-Ray Physical Camera with exposure enabled.
2. Start with a sensible daylight interior exposure. One V-Ray guide suggests ISO 200, f/5.6 and 1/60 s (EV around 11–12) as a starting point for interiors lit by windows. Adjust to taste.
3. If the image is too bright, lower ISO or raise the f-number before shortening the shutter speed.
4. Only then change individual light intensities to balance the mix.

### Common mistakes

- **Cranking the Sun multiplier.** It blows out sunlit surfaces first. Lower the camera exposure instead.
- **Double sun.** An HDRI with a visible sun plus the V-Ray Sun creates two shadow directions and extra brightness. Disable one.
- **Pure-white materials.** A wall with an RGB value near 255 reflects almost all light and clips easily. Use a slightly darker albedo, such as a light grey-white.
- **Emissive materials as primary lighting.** Self-illuminated materials can look bright on screen without lighting the room well. Use real lights for illumination.
- **Fixing everything in post.** If highlights are burned in the frame buffer, lowering highlight burn in the corrections can help, but fix the exposure at the source first.

### Interior checklist

1. Dome with HDRI at a modest intensity for the outside.
2. Rectangle lights or portal-style lights at the windows if the interior is noisy or dark.
3. IES lights for fixtures, mesh lights for strips.
4. Physical Camera exposure tuned last.

## FAQ

### Do I need the Sun if I use an HDRI?

No. An HDRI Dome can provide both sky and sun. Use the V-Ray Sun when you want precise, location-based sun control, and avoid running both at full strength.

### Why is my V-Ray interior too dark?

Check that lights face into the room, that the camera exposure suits an interior, and that the Dome has enough intensity. Windows often need a Rectangle light or higher Dome intensity to feed light inside.

### Why is my V-Ray render overexposed?

Usually it's a combination of a high Sun multiplier, double lighting, and camera settings. Reset multipliers to defaults and use ISO, f-number and shutter speed to control brightness.

### Where do I get IES files?

Lighting manufacturers publish them on their product pages, and some third-party packs are available. Use the manufacturer file when you need the render to match a specific fixture.
