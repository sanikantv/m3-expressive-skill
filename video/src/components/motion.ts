import {spring} from 'remotion';
import {springs} from '../theme';

/** 0→1 entrance driven by an expressive spatial spring, starting `delay` frames into the scene. */
export const enter = (frame: number, fps: number, delay = 0, config = springs.defaultSpatial) =>
  spring({frame: frame - delay, fps, config});

/** 0→1 color/opacity change with the effects spring (never overshoots). */
export const fadeIn = (frame: number, fps: number, delay = 0) =>
  spring({frame: frame - delay, fps, config: springs.effects});
