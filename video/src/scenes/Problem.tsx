import type React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Icon} from '../components/Icon';
import {headline, Kicker, SceneFrame} from '../components/SceneFrame';
import {enter} from '../components/motion';
import {md, MONO, springs} from '../theme';
import {beat} from './beats';

const ERRORS = [
  {code: 'ExpressiveButton(onClick = { … })', note: 'Unresolved reference', at: 0.02},
  {code: '@OptIn(ExperimentalMaterial3ExpressiveApi::class)\nButtonGroup(…)', note: 'Not needed: stable in 1.5.0', at: 0.3},
  {code: 'MaterialExpressiveTheme { … }', note: 'Internal in material3 1.4.0', at: 0.62},
];

const ErrorCard: React.FC<{readonly code: string; readonly note: string; readonly delay: number}> = ({code, note, delay}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = enter(frame, fps, delay, springs.fastSpatial);
  const strike = enter(frame, fps, delay + 14, springs.effects);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 40,
        padding: '40px 48px',
        borderRadius: 32,
        background: md.darkContainer,
        opacity: p,
        translate: `${(1 - p) * 120}px 0`,
      }}
    >
      <pre
        style={{
          margin: 0,
          fontFamily: MONO,
          fontSize: 36,
          lineHeight: 1.4,
          color: md.darkPrimary,
          textDecoration: strike > 0.5 ? 'line-through' : 'none',
          textDecorationColor: '#F2B8B5',
          textDecorationThickness: 3,
          opacity: interpolate(strike, [0, 1], [1, 0.6]),
        }}
      >
        {code}
      </pre>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '16px 24px',
          borderRadius: 16,
          background: md.errorContainer,
          color: md.onErrorContainer,
          fontSize: 30,
          fontWeight: 600,
          whiteSpace: 'nowrap',
          scale: strike,
        }}
      >
        <Icon name="error" size={36} fill /> {note}
      </div>
    </div>
  );
};

export const Problem = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const title = enter(frame, fps, 0);
  return (
    <SceneFrame dark>
      <div style={{position: 'absolute', left: 140, right: 140, top: 130}}>
        <div style={{opacity: title}}>
          <Kicker dark>
            <Icon name="smart_toy" size={34} /> What agents write today
          </Kicker>
        </div>
        <h1 style={{...headline, fontSize: 88, marginTop: 28, opacity: title, translate: `0 ${(1 - title) * 40}px`}}>
          Code that looks right, and isn't.
        </h1>
        <div style={{display: 'flex', flexDirection: 'column', gap: 30, marginTop: 72}}>
          {ERRORS.map((e) => (
            <ErrorCard key={e.code} code={e.code} note={e.note} delay={beat('02-problem', e.at)} />
          ))}
        </div>
      </div>
    </SceneFrame>
  );
};
