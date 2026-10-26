import type React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Icon} from '../components/Icon';
import {headline, Kicker, SceneFrame} from '../components/SceneFrame';
import {allShapes, Shape} from '../components/Shape';
import {enter} from '../components/motion';
import {md, springs} from '../theme';
import {beat} from './beats';

/** A dot sliding along a track with a Material spring, replaying every 1.6 s. */
const Track: React.FC<{readonly label: string; readonly sub: string; readonly config: {damping: number; stiffness: number; mass: number}; readonly start: number}> = ({
  label,
  sub,
  config,
  start,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const cycle = 48;
  const local = Math.max(0, frame - start);
  const leg = Math.floor(local / cycle);
  const p = spring({frame: local % cycle, fps, config});
  const x = leg % 2 === 0 ? p : 1 - p;
  return (
    <div>
      <div style={{fontSize: 34, fontWeight: 600}}>{label}</div>
      <div style={{fontSize: 26, color: md.onSurfaceVariant, marginBottom: 14}}>{sub}</div>
      <div style={{position: 'relative', height: 76, borderRadius: 999, background: md.surfaceHighest}}>
        <div style={{position: 'absolute', top: 8, left: `calc(8px + ${x} * (100% - 76px))`, width: 60, height: 60, borderRadius: '50%', background: md.primary}} />
      </div>
    </div>
  );
};

export const ShapesMotion = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const title = enter(frame, fps, 0);
  const panel = enter(frame, fps, beat('06-shapes-motion', 0.5));
  return (
    <SceneFrame>
      <div style={{position: 'absolute', left: 120, top: 90, width: 900}}>
        <div style={{opacity: title}}>
          <Kicker>
            <Icon name="star" size={34} fill /> MaterialShapes · MotionScheme
          </Kicker>
        </div>
        <h1 style={{...headline, fontSize: 84, marginTop: 24, whiteSpace: 'nowrap', opacity: title}}>35 shapes. Real springs.</h1>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 14, marginTop: 36}}>
          {allShapes.map((s, i) => {
            const p = spring({frame: frame - 6 - i * 1.6, fps, config: springs.fastSpatial});
            return (
              <div key={s.name} style={{aspectRatio: '1', display: 'grid', placeItems: 'center', borderRadius: 28, background: md.surfaceContainer}}>
                <Shape name={s.name as never} size={76} color={i % 9 === 4 ? md.tertiary : md.primary} style={{scale: p, rotate: `${(1 - p) * -120}deg`}} />
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          right: 120,
          top: 300,
          width: 620,
          display: 'flex',
          flexDirection: 'column',
          gap: 40,
          padding: 44,
          borderRadius: 44,
          background: md.surfaceLow,
          opacity: panel,
          translate: `${(1 - panel) * 80}px 0`,
        }}
      >
        <Track label="Expressive · fast spatial" sub="damping 0.6 · stiffness 800" config={springs.fastSpatial} start={beat('06-shapes-motion', 0.5)} />
        <Track label="Expressive · default spatial" sub="damping 0.8 · stiffness 380" config={springs.defaultSpatial} start={beat('06-shapes-motion', 0.5)} />
        <Track label="Standard · default spatial" sub="damping 0.9 · stiffness 700" config={{damping: 2 * 0.9 * Math.sqrt(700), stiffness: 700, mass: 1}} start={beat('06-shapes-motion', 0.5)} />
      </div>
    </SceneFrame>
  );
};
