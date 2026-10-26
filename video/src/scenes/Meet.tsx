import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Icon} from '../components/Icon';
import {SceneFrame, headline} from '../components/SceneFrame';
import {Shape} from '../components/Shape';
import {enter, fadeIn} from '../components/motion';
import {md, MONO, springs} from '../theme';
import {beat} from './beats';

const AGENTS = ['Claude Code', 'Codex', 'Cursor', 'Copilot'];

/** `top`: space above the logo (the poster uses less, to fit its play button). */
export const Meet = ({top = 150}: {readonly top?: number}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const logo = enter(frame, fps, 0, springs.fastSpatial);
  const title = enter(frame, fps, 8);
  const install = enter(frame, fps, beat('03-meet', 0.42));
  return (
    <SceneFrame>
      <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: top}}>
        <div style={{position: 'relative', width: 230, height: 230, scale: logo, rotate: `${interpolate(logo, [0, 1], [-90, 0])}deg`}}>
          <Shape name="Cookie9Sided" size={230} color={md.primary} />
          <Shape name="Clover4Leaf" size={96} color={md.primaryContainer} style={{position: 'absolute', left: 67, top: 67}} />
        </div>
        <h1 style={{...headline, fontSize: 120, marginTop: 48, opacity: title, translate: `0 ${(1 - title) * 50}px`}}>
          M3 Expressive Skill
        </h1>
        <p style={{margin: '18px 0 0', fontSize: 48, color: md.onSurfaceVariant, opacity: fadeIn(frame, fps, 16)}}>
          Material 3 Expressive for Jetpack Compose, for your AI agent
        </p>
        <div
          style={{
            marginTop: 56,
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            padding: '22px 34px',
            borderRadius: 24,
            background: md.surfaceHighest,
            fontFamily: MONO,
            fontSize: 34,
            opacity: install,
            scale: interpolate(install, [0, 1], [0.9, 1]),
          }}
        >
          <Icon name="terminal" size={40} color={md.primary} />
          npx skills add sanikantv/m3-expressive-skill
        </div>
        <div style={{display: 'flex', gap: 22, marginTop: 52}}>
          {AGENTS.map((a, i) => {
            const p = enter(frame, fps, beat('03-meet', 0.5 + i * 0.06), springs.fastSpatial);
            return (
              <div
                key={a}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '18px 30px',
                  borderRadius: 999,
                  background: i === 0 ? md.primary : md.primaryContainer,
                  color: i === 0 ? md.onPrimary : md.onPrimaryContainer,
                  fontSize: 38,
                  fontWeight: 600,
                  scale: p,
                }}
              >
                <Icon name="check_circle" size={40} fill /> {a}
              </div>
            );
          })}
        </div>
      </div>
    </SceneFrame>
  );
};
