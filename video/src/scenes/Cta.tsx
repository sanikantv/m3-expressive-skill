import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Icon} from '../components/Icon';
import {MorphShape} from '../components/MorphShape';
import {headline, SceneFrame} from '../components/SceneFrame';
import {enter, fadeIn} from '../components/motion';
import {md, MONO, springs} from '../theme';
import {beat} from './beats';

export const Cta = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const b = (f: number) => beat('09-cta', f);
  const logo = enter(frame, fps, 0, springs.slowSpatial);
  const cmd = enter(frame, fps, 10);
  const url = enter(frame, fps, b(0.6), springs.fastSpatial);
  return (
    <SceneFrame>
      <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 110}}>
        <div style={{width: 300, height: 300, borderRadius: '50%', background: md.primaryContainer, display: 'grid', placeItems: 'center', scale: logo}}>
          <MorphShape size={190} color={md.primary} />
        </div>
        <h1 style={{...headline, fontSize: 96, marginTop: 50, opacity: cmd}}>Install it in one command</h1>
        <div
          style={{
            marginTop: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            padding: '24px 38px',
            borderRadius: 26,
            background: md.surfaceHighest,
            fontFamily: MONO,
            fontSize: 38,
            opacity: cmd,
            scale: interpolate(cmd, [0, 1], [0.9, 1]),
          }}
        >
          <Icon name="terminal" size={44} color={md.primary} />
          npx skills add sanikantv/m3-expressive-skill
        </div>
        <div
          style={{
            marginTop: 56,
            padding: '26px 56px',
            borderRadius: 999,
            background: md.primary,
            color: md.onPrimary,
            fontSize: 64,
            fontWeight: 600,
            scale: url,
          }}
        >
          expressive.sanikant.dev
        </div>
        <div style={{marginTop: 34, display: 'flex', gap: 30, fontSize: 32, color: md.onSurfaceVariant, opacity: fadeIn(frame, fps, b(0.7))}}>
          <span style={{display: 'flex', alignItems: 'center', gap: 10}}>
            <Icon name="code" size={36} /> github.com/sanikantv/m3-expressive-skill
          </span>
          <span>·</span>
          <span>Free and open source · MIT</span>
        </div>
      </div>
    </SceneFrame>
  );
};
