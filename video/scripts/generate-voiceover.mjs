// Generates one Liam voiceover clip per scene with ElevenLabs (eleven_multilingual_v2) and writes
// public/voiceover/intro/<scene>.mp3 plus durations.json, which the composition uses for timing.
// Needs ELEVENLABS_API_KEY (kept in video/.env, which git ignores):
//   node --env-file=.env scripts/generate-voiceover.mjs          # only missing or changed scenes
//   node --env-file=.env scripts/generate-voiceover.mjs --force  # regenerate everything
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = new URL('..', import.meta.url);
const { voiceId, modelId, scenes } = JSON.parse(readFileSync(new URL('scripts/script.json', root), 'utf8'));
const dir = new URL('public/voiceover/intro/', root);
const key = process.env.ELEVENLABS_API_KEY;
if (!key) throw new Error('Set ELEVENLABS_API_KEY (node --env-file=.env …)');

const durationsFile = new URL('durations.json', dir);
const previous = existsSync(durationsFile) ? JSON.parse(readFileSync(durationsFile, 'utf8')) : {};
const result = {};

for (const scene of scenes) {
  const hash = createHash('sha1').update(`${voiceId}|${modelId}|${scene.text}`).digest('hex').slice(0, 12);
  const file = new URL(`${scene.id}.mp3`, dir);
  if (!process.argv.includes('--force') && existsSync(file) && previous[scene.id]?.hash === hash) {
    result[scene.id] = previous[scene.id];
    continue;
  }
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
    method: 'POST',
    headers: { 'xi-api-key': key, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
    body: JSON.stringify({
      text: scene.text,
      model_id: modelId,
      voice_settings: { stability: 0.45, similarity_boost: 0.8, style: 0.25, use_speaker_boost: true },
    }),
  });
  if (!res.ok) throw new Error(`${scene.id}: ${res.status} ${await res.text()}`);
  writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  const seconds = Number(
    execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', fileURLToPath(file)]).toString(),
  );
  result[scene.id] = { seconds: Math.round(seconds * 1000) / 1000, hash };
  console.log(`${scene.id}: ${result[scene.id].seconds}s`);
}
writeFileSync(durationsFile, JSON.stringify(result, null, 2) + '\n');
console.log(`total ${Object.values(result).reduce((s, d) => s + d.seconds, 0).toFixed(1)}s`);
