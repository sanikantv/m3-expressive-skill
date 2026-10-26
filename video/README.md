# Intro video

The 78-second intro for the M3 Expressive Skill, made with [Remotion](https://www.remotion.dev).
The output is `../art/intro.mp4` (with `../art/intro-poster.jpg`). The site's build copies both
into `site/public/media/`.

- **Look:** Material 3 baseline purple scheme, Google Sans Flex (normal width, weight 600 headings,
  same as the site), Material Symbols Rounded. The shapes and the loading-indicator morph come
  from `src/data/shapes.json`, which is generated from material3's `MaterialShapes`.
- **Motion:** every entrance uses Material's `MotionScheme.expressive()` springs, converted for
  Remotion in `src/theme.ts`.
- **Voice:** ElevenLabs, voice **Liam**, model `eleven_multilingual_v2`. The script is in
  `scripts/script.json`, one line per scene. Each scene lasts as long as its line.

## Edit and render

```bash
npm ci
npm run dev                      # Remotion Studio: preview and tweak
```

Change narration:

1. Edit `scripts/script.json`.
2. Put the key in `.env` (git-ignored): `ELEVENLABS_API_KEY=sk_…`
3. Run `npm run voiceover`. It only regenerates lines whose text changed and updates
   `public/voiceover/intro/durations.json`. The timeline follows automatically.

Render and publish:

```bash
npm run render    # out/intro.mp4, then loudness-normalized (-16 LUFS) to ../art/intro.mp4
npm run poster    # ../art/intro-poster.jpg
```

Needs ffmpeg for the loudness pass. Remotion is free for individuals and teams of up to three
(see the [Remotion license](https://www.remotion.dev/license)).
