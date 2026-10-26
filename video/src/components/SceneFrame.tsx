import type React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {FONT, md} from '../theme';
import {Shape, type ShapeName} from './Shape';

const DECOR: {name: ShapeName; x: number; y: number; size: number; speed: number}[] = [
  {name: 'Cookie9Sided', x: -140, y: -160, size: 520, speed: 0.06},
  {name: 'Clover4Leaf', x: 1640, y: 760, size: 460, speed: -0.05},
  {name: 'Sunny', x: 1580, y: -120, size: 260, speed: 0.09},
];

/** Surface background with a few slowly turning Material shapes in the corners. */
export const SceneFrame: React.FC<{readonly dark?: boolean; readonly children: React.ReactNode}> = ({
  dark,
  children,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: dark ? md.darkSurface : md.surface,
        fontFamily: FONT,
        color: dark ? md.darkOnSurface : md.onSurface,
        overflow: 'hidden',
      }}
    >
      {DECOR.map((d) => (
        <Shape
          key={d.name}
          name={d.name}
          size={d.size}
          color={dark ? md.darkContainer : md.surfaceContainer}
          style={{position: 'absolute', left: d.x, top: d.y, rotate: `${frame * d.speed}deg`}}
        />
      ))}
      {children}
    </AbsoluteFill>
  );
};

/** Small pill label above a headline. */
export const Kicker: React.FC<{readonly children: React.ReactNode; readonly dark?: boolean; readonly style?: React.CSSProperties}> = ({
  children,
  dark,
  style,
}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 26px',
      borderRadius: 999,
      background: dark ? md.darkHigh : md.secondaryContainer,
      color: dark ? md.darkOnSurfaceVariant : md.onSecondaryContainer,
      fontSize: 32,
      fontWeight: 600,
      ...style,
    }}
  >
    {children}
  </div>
);

export const headline: React.CSSProperties = {
  margin: 0,
  fontSize: 104,
  lineHeight: 1.05,
  fontWeight: 600,
  letterSpacing: '-0.01em',
};
