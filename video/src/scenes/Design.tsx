import type React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Icon} from '../components/Icon';
import {headline, Kicker, SceneFrame} from '../components/SceneFrame';
import {Shape} from '../components/Shape';
import {enter} from '../components/motion';
import {md, springs} from '../theme';
import {beat} from './beats';

const Rule: React.FC<{readonly title: string; readonly at: number; readonly children: React.ReactNode}> = ({title, at, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = enter(frame, fps, at, springs.fastSpatial);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 30,
        padding: 44,
        borderRadius: 44,
        background: md.surfaceContainer,
        opacity: p,
        translate: `0 ${(1 - p) * 80}px`,
      }}
    >
      <div style={{height: 420, display: 'grid', placeItems: 'center'}}>{children}</div>
      <div style={{fontSize: 42, fontWeight: 600, lineHeight: 1.2}}>{title}</div>
    </div>
  );
};

/** Unselected = tonal rounded square, selected = primary pill. */
const Selection: React.FC<{readonly start: number}> = ({start}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const k = spring({frame: frame - start, fps, config: springs.fastSpatial});
  return (
    <div style={{display: 'flex', gap: 14}}>
      {[0, 1, 2].map((i) => {
        const on = i === 1 ? k : 0;
        return (
          <div
            key={i}
            style={{
              width: 110 + on * 40,
              height: 110,
              borderRadius: interpolate(on, [0, 1], [26, 55]),
              background: on > 0.5 ? md.primary : md.secondaryContainer,
              display: 'grid',
              placeItems: 'center',
              color: on > 0.5 ? md.onPrimary : md.onSecondaryContainer,
            }}
          >
            {on > 0.5 && <Icon name="check" size={50} />}
          </div>
        );
      })}
    </div>
  );
};

export const Design = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const title = enter(frame, fps, 0);
  const b = (f: number) => beat('07-design', f);
  const hero = spring({frame: frame - b(0.72), fps, config: springs.fastSpatial});
  return (
    <SceneFrame>
      <div style={{position: 'absolute', left: 140, right: 140, top: 110}}>
        <div style={{opacity: title}}>
          <Kicker>
            <Icon name="auto_awesome" size={34} /> From Google's M3 Expressive guidance
          </Kicker>
        </div>
        <h1 style={{...headline, fontSize: 88, marginTop: 26, opacity: title}}>Knows the design rules too.</h1>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 30, marginTop: 64}}>
          <Rule title="Selection changes shape" at={b(0.2)}>
            <Selection start={b(0.3)} />
          </Rule>
          <Rule title="Contrast for the main action" at={b(0.45)}>
            <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
              <div style={{display: 'flex', gap: 4, padding: '0 12px', height: 96, alignItems: 'center', borderRadius: 999, background: md.surfaceHighest}}>
                {['undo', 'redo', 'image'].map((n) => (
                  <div key={n} style={{width: 70, height: 70, display: 'grid', placeItems: 'center', color: md.onSurfaceVariant}}>
                    <Icon name={n} size={38} />
                  </div>
                ))}
              </div>
              <div style={{width: 112, height: 112, borderRadius: 30, background: md.tertiary, color: md.onTertiary, display: 'grid', placeItems: 'center'}}>
                <Icon name="edit" size={50} />
              </div>
            </div>
          </Rule>
          <Rule title="One hero moment, not ten" at={b(0.68)}>
            <div style={{position: 'relative', width: 280, height: 280, display: 'grid', placeItems: 'center'}}>
              <Shape name="Sunny" size={280} color={md.primaryContainer} style={{position: 'absolute', inset: 0, scale: hero, rotate: `${frame * 0.4}deg`}} />
              <span style={{position: 'relative', fontSize: 170, fontWeight: 700, color: md.primary, scale: hero}}>1</span>
            </div>
          </Rule>
        </div>
      </div>
    </SceneFrame>
  );
};
