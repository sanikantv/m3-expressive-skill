import durations from '../public/voiceover/intro/durations.json';
import script from '../scripts/script.json';

export const FPS = 30;
/** Frames of crossfade between scenes (both scenes play during it). */
export const TRANSITION = 15;
/** Voice starts this many frames into its scene. */
export const VOICE_DELAY = 10;
/** Silence kept after each line before the next scene's transition. */
const TAIL = 0.35;

export type SceneId = (typeof script.scenes)[number]['id'];

export const sceneFrames = (id: SceneId) => {
  const seconds = (durations as Record<string, {seconds: number}>)[id].seconds;
  return Math.ceil((seconds + TAIL) * FPS) + VOICE_DELAY + TRANSITION;
};

/** Voice length in frames, to time on-screen beats to the narration. */
export const voiceFrames = (id: SceneId) =>
  Math.round((durations as Record<string, {seconds: number}>)[id].seconds * FPS);

export const SCENES = script.scenes.map((s) => s.id as SceneId);

export const TOTAL_FRAMES =
  SCENES.reduce((sum, id) => sum + sceneFrames(id), 0) - TRANSITION * (SCENES.length - 1) + 45;
