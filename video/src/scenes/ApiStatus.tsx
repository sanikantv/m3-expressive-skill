import type React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Icon} from '../components/Icon';
import {headline, Kicker, SceneFrame} from '../components/SceneFrame';
import {enter} from '../components/motion';
import {md, MONO, springs} from '../theme';
import {beat} from './beats';

type Status = 'stable' | 'optin' | 'internal' | 'missing';
const CHIP: Record<Status, {icon: string; label: string; bg: string; fg: string}> = {
  stable: {icon: 'check_circle', label: 'Stable', bg: md.primaryContainer, fg: md.onPrimaryContainer},
  optin: {icon: 'science', label: 'Opt-in', bg: md.tertiaryContainer, fg: md.onTertiaryContainer},
  internal: {icon: 'lock', label: 'Internal', bg: md.surfaceHighest, fg: md.onSurfaceVariant},
  missing: {icon: 'block', label: 'Not there', bg: md.surfaceHighest, fg: md.onSurfaceVariant},
};
const ROWS: [string, Status, Status][] = [
  ['MaterialExpressiveTheme · MotionScheme', 'internal', 'stable'],
  ['ButtonGroup · ToggleButton · SplitButton', 'missing', 'stable'],
  ['FloatingActionButtonMenu · FloatingToolbar', 'missing', 'stable'],
  ['LoadingIndicator', 'missing', 'optin'],
  ['MaterialShapes', 'missing', 'optin'],
];

const Chip: React.FC<{readonly status: Status; readonly p: number}> = ({status, p}) => {
  const c = CHIP[status];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 20px',
        borderRadius: 14,
        background: c.bg,
        color: c.fg,
        fontSize: 30,
        fontWeight: 600,
        scale: p,
      }}
    >
      <Icon name={c.icon} size={32} fill={status === 'stable'} /> {c.label}
    </span>
  );
};

export const ApiStatus = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const title = enter(frame, fps, 0);
  const dep = enter(frame, fps, beat('04-api-status', 0.78), springs.fastSpatial);
  return (
    <SceneFrame>
      <div style={{position: 'absolute', left: 140, right: 140, top: 110}}>
        <div style={{opacity: title}}>
          <Kicker>
            <Icon name="verified" size={34} /> Checked against the material3 sources
          </Kicker>
        </div>
        <h1 style={{...headline, fontSize: 88, marginTop: 26, opacity: title}}>Knows your material3 version.</h1>
        <div style={{marginTop: 48, borderRadius: 36, background: md.surfaceLow, overflow: 'hidden'}}>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 300px 360px', padding: '22px 40px', background: md.surfaceHigh, fontSize: 30, fontWeight: 700}}>
            <span>API</span>
            <span>1.4.0</span>
            <span>1.5.0-beta02</span>
          </div>
          {ROWS.map(([api, a, b], i) => {
            const row = enter(frame, fps, 6 + i * 5);
            const old = enter(frame, fps, beat('04-api-status', 0.12) + i * 3, springs.fastSpatial);
            const now = enter(frame, fps, beat('04-api-status', 0.22 + i * 0.09), springs.fastSpatial);
            return (
              <div
                key={api}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 300px 360px',
                  alignItems: 'center',
                  padding: '18px 40px',
                  borderTop: `2px solid ${md.outlineVariant}`,
                  opacity: row,
                  translate: `0 ${(1 - row) * 30}px`,
                }}
              >
                <span style={{fontFamily: MONO, fontSize: 30}}>{api}</span>
                <span>
                  <Chip status={a} p={old} />
                </span>
                <span>
                  <Chip status={b} p={now} />
                </span>
              </div>
            );
          })}
        </div>
        <div
          style={{
            marginTop: 34,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 18,
            padding: '18px 30px',
            borderRadius: 22,
            background: md.secondaryContainer,
            color: md.onSecondaryContainer,
            fontSize: 32,
            opacity: dep,
            translate: `0 ${interpolate(dep, [0, 1], [30, 0])}px`,
          }}
        >
          <Icon name="error" size={36} /> Deprecated:
          <span style={{fontFamily: MONO, textDecoration: 'line-through'}}>ListItem(headlineContent = …)</span>→
          <span style={{fontFamily: MONO, fontWeight: 600}}>ListItem {'{ Text(…) }'}</span>
        </div>
      </div>
    </SceneFrame>
  );
};
