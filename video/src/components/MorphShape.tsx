import type React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import shapes from '../data/shapes.json';

// LoadingIndicatorDefaults.IndeterminateIndicatorPolygons, as start/end paths from graphics-shapes Morph.
// Morph output is a linear blend of matched cubics, so blending the numbers reproduces it.
const num = /-?\d+(?:\.\d+)?/g;
const pairs = shapes.loading.map((p) => {
  const a = p.frames[0];
  const b = p.frames[p.frames.length - 1];
  return {text: a.split(num), from: a.match(num)!.map(Number), to: b.match(num)!.map(Number)};
});

const spring = (t: number) => {
  // Expressive fast spatial: damping ratio 0.6, stiffness 800.
  const w0 = Math.sqrt(800);
  const z = 0.6;
  const wd = w0 * Math.sqrt(1 - z * z);
  return 1 - Math.exp(-z * w0 * t) * (Math.cos(wd * t) + ((z * w0) / wd) * Math.sin(wd * t));
};

/** The LoadingIndicator morph: one shape every `secondsPerShape`, rotating continuously. */
export const MorphShape: React.FC<{
  readonly size: number;
  readonly color: string;
  readonly secondsPerShape?: number;
  readonly rotateDegPerSecond?: number;
  readonly style?: React.CSSProperties;
}> = ({size, color, secondsPerShape = 0.75, rotateDegPerSecond = 80, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const index = Math.floor(t / secondsPerShape) % pairs.length;
  const local = t - Math.floor(t / secondsPerShape) * secondsPerShape;
  const k = spring(Math.min(local, 0.6));
  const p = pairs[index];
  let d = p.text[0];
  for (let i = 0; i < p.from.length; i++) d += (p.from[i] + (p.to[i] - p.from[i]) * k).toFixed(2) + p.text[i + 1];
  return (
    <svg width={size} height={size} viewBox="-4 -4 108 108" style={{overflow: 'visible', ...style}}>
      <path d={d} fill={color} style={{transformOrigin: '50px 50px', rotate: `${t * rotateDegPerSecond}deg`}} />
    </svg>
  );
};
