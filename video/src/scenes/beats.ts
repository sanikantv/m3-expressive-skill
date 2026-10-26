import {VOICE_DELAY, voiceFrames, type SceneId} from '../timeline';

/** Frame at which `fraction` of a scene's narration has been spoken. */
export const beat = (id: SceneId, fraction: number) => Math.round(VOICE_DELAY + voiceFrames(id) * fraction);
