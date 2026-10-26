import type React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Icon} from '../components/Icon';
import {MorphShape} from '../components/MorphShape';
import {headline, SceneFrame} from '../components/SceneFrame';
import {enter} from '../components/motion';
import {md, springs} from '../theme';
import {beat} from './beats';

/** Connected button group: the selected option becomes a primary pill and widens. */
const Connected: React.FC<{readonly start: number}> = ({start}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const options = ['Day', 'Week', 'Month', 'Year'];
  const step = Math.max(0, Math.floor((frame - start) / 22));
  const selected = (1 + step) % options.length;
  return (
    <div style={{display: 'flex', gap: 4, width: 640}}>
      {options.map((o, i) => {
        const since = frame - (start + Math.max(0, step) * 22);
        const on = i === selected ? spring({frame: since, fps, config: springs.fastSpatial}) : 0;
        const wasOn = i === (selected + options.length - 1) % options.length && step > 0 ? 1 - spring({frame: since, fps, config: springs.fastSpatial}) : 0;
        const k = Math.max(on, wasOn);
        const edge = i === 0 ? '999px 12px 12px 999px' : i === options.length - 1 ? '12px 999px 999px 12px' : '12px';
        return (
          <div
            key={o}
            style={{
              flex: 1 + 0.35 * k,
              height: 96,
              display: 'grid',
              placeItems: 'center',
              borderRadius: k > 0.5 ? 999 : edge,
              background: k > 0.5 ? md.primary : md.secondaryContainer,
              color: k > 0.5 ? md.onPrimary : md.onSecondaryContainer,
              fontSize: 34,
              fontWeight: 600,
            }}
          >
            {o}
          </div>
        );
      })}
    </div>
  );
};

/** FAB menu: the FAB turns into a round close button and the items rise out of it. */
const FabMenu: React.FC<{readonly start: number}> = ({start}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const open = spring({frame: frame - start, fps, config: springs.fastSpatial});
  const items = [
    ['photo_library', 'Add photos'],
    ['share', 'Share album'],
    ['search', 'Search'],
  ];
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6}}>
      {items.map(([icon, label], i) => {
        const p = spring({frame: frame - start - (items.length - i) * 3, fps, config: springs.fastSpatial});
        return (
          <div
            key={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              height: 58,
              padding: '0 24px',
              borderRadius: 999,
              background: md.primaryContainer,
              color: md.onPrimaryContainer,
              fontSize: 26,
              fontWeight: 600,
              opacity: p,
              translate: `0 ${(1 - p) * 40}px`,
            }}
          >
            <Icon name={icon} size={34} /> {label}
          </div>
        );
      })}
      <div
        style={{
          width: 76,
          height: 76,
          display: 'grid',
          placeItems: 'center',
          borderRadius: interpolate(open, [0, 1], [20, 38]),
          background: open > 0.5 ? md.tertiary : md.tertiaryContainer,
          color: open > 0.5 ? md.onTertiary : md.onTertiaryContainer,
          rotate: `${open * 90}deg`,
        }}
      >
        <Icon name={open > 0.5 ? 'close' : 'edit'} size={44} />
      </div>
    </div>
  );
};

/** Floating toolbar (pill) beside a contrasting square-ish FAB. */
const Toolbar: React.FC = () => {
  const frame = useCurrentFrame();
  const sel = Math.floor(frame / 24) % 3;
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
      <div style={{display: 'flex', gap: 6, height: 100, padding: '0 14px', alignItems: 'center', borderRadius: 999, background: md.surfaceHighest}}>
        {['undo', 'format_paint', 'image', 'more_vert'].map((n, i) => (
          <div
            key={n}
            style={{
              width: i === sel + 1 ? 104 : 72,
              height: 72,
              display: 'grid',
              placeItems: 'center',
              borderRadius: 999,
              background: i === sel + 1 ? md.secondaryContainer : 'transparent',
              color: md.onSurfaceVariant,
            }}
          >
            <Icon name={n} size={38} />
          </div>
        ))}
      </div>
      <div style={{width: 100, height: 100, display: 'grid', placeItems: 'center', borderRadius: 26, background: md.primaryContainer, color: md.onPrimaryContainer}}>
        <Icon name="add" size={46} />
      </div>
    </div>
  );
};

/** Wavy linear progress (gap + stop dot) and the contained loading indicator. */
const Progress: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = interpolate(frame, [0, 6 * fps], [0.12, 0.92], {extrapolateRight: 'clamp'});
  const width = 480;
  const pts: string[] = [];
  for (let x = 0; x <= width * p; x += 4) pts.push(`${x},${16 + 7 * Math.sin((x - frame * 3) / 12)}`);
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 44}}>
      <svg width={width} height={32}>
        <polyline points={pts.join(' ')} fill="none" stroke={md.primary} strokeWidth={8} strokeLinecap="round" />
        <line x1={width * p + 14} y1={16} x2={width} y2={16} stroke={md.secondaryContainer} strokeWidth={8} strokeLinecap="round" />
        <circle cx={width - 4} cy={16} r={4} fill={md.primary} />
      </svg>
      <div style={{width: 120, height: 120, borderRadius: '50%', background: md.primaryContainer, display: 'grid', placeItems: 'center'}}>
        <MorphShape size={72} color={md.onPrimaryContainer} />
      </div>
    </div>
  );
};

const Card: React.FC<{readonly label: string; readonly at: number; readonly children: React.ReactNode}> = ({label, at, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = enter(frame, fps, at, springs.fastSpatial);
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 22,
        borderRadius: 44,
        background: md.surfaceContainer,
        padding: 30,
        opacity: p,
        scale: interpolate(p, [0, 1], [0.8, 1]),
      }}
    >
      <div style={{height: 250, display: 'grid', placeItems: 'center'}}>{children}</div>
      <div style={{fontSize: 40, fontWeight: 600}}>{label}</div>
    </div>
  );
};

export const Components = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const title = enter(frame, fps, 0);
  const b = (f: number) => beat('05-components', f);
  return (
    <SceneFrame>
      <div style={{position: 'absolute', left: 120, right: 120, top: 70}}>
        <h1 style={{...headline, fontSize: 80, textAlign: 'center', opacity: title}}>Every Expressive component</h1>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26, marginTop: 40, gridAutoRows: 400}}>
          <Card label="Button groups" at={b(0)}>
            <Connected start={b(0.05)} />
          </Card>
          <Card label="FAB menu" at={b(0.12)}>
            <FabMenu start={b(0.2)} />
          </Card>
          <Card label="Floating toolbar" at={b(0.25)}>
            <Toolbar />
          </Card>
          <Card label="Wavy progress · Loading indicator" at={b(0.38)}>
            <Progress />
          </Card>
        </div>
      </div>
    </SceneFrame>
  );
};
