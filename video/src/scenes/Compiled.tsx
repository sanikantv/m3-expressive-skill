import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Icon} from '../components/Icon';
import {headline, SceneFrame} from '../components/SceneFrame';
import {Shape} from '../components/Shape';
import {enter} from '../components/motion';
import {md, MONO, springs} from '../theme';
import {beat} from './beats';

const CODE = `@Composable
fun MorphingButton(onClick: () -> Unit) {
    Button(
        onClick = onClick,
        shapes = ButtonDefaults.shapes(),
    ) { Text("Continue") }
}`;

const KEYWORDS = /\b(fun|val|var)\b|@Composable|"[^"]*"/g;

const highlight = (text: string) => {
  const out: {t: string; c?: string}[] = [];
  let last = 0;
  for (const m of text.matchAll(KEYWORDS)) {
    out.push({t: text.slice(last, m.index)});
    out.push({t: m[0], c: m[0].startsWith('"') ? '#7DCFA8' : '#F7B3D1'});
    last = m.index! + m[0].length;
  }
  out.push({t: text.slice(last)});
  return out;
};

export const Compiled = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const b = (f: number) => beat('08-compiled', f);
  const title = enter(frame, fps, 0);
  const typed = Math.round(interpolate(frame, [8, b(0.45)], [0, CODE.length], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const term = enter(frame, fps, b(0.42));
  const ok = enter(frame, fps, b(0.58), springs.fastSpatial);
  const badge = enter(frame, fps, b(0.7), springs.fastSpatial);
  return (
    <SceneFrame>
      <h1 style={{...headline, fontSize: 88, position: 'absolute', left: 140, top: 110, opacity: title}}>Every sample compiles.</h1>
      <div
        style={{
          position: 'absolute',
          left: 140,
          top: 300,
          width: 1000,
          padding: '40px 46px',
          borderRadius: 36,
          background: md.darkSurface,
          color: md.darkOnSurface,
          fontFamily: MONO,
          fontSize: 38,
          lineHeight: 1.5,
          whiteSpace: 'pre',
          opacity: title,
        }}
      >
        <div style={{display: 'flex', gap: 12, marginBottom: 22}}>
          {['#F2B8B5', '#FFD8E4', '#C2E7C9'].map((c) => (
            <span key={c} style={{width: 18, height: 18, borderRadius: 9, background: c}} />
          ))}
          <span style={{marginLeft: 16, fontSize: 24, color: md.darkOnSurfaceVariant}}>Buttons.kt</span>
        </div>
        {highlight(CODE.slice(0, typed)).map((s, i) => (
          <span key={i} style={{color: s.c}}>
            {s.t}
          </span>
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 1000,
          top: 770,
          width: 760,
          padding: '34px 40px',
          borderRadius: 36,
          background: md.darkContainer,
          color: md.darkOnSurface,
          fontFamily: MONO,
          fontSize: 32,
          lineHeight: 1.6,
          opacity: term,
          translate: `0 ${(1 - term) * 60}px`,
          boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
        }}
      >
        <div style={{color: md.darkOnSurfaceVariant}}>$ ./gradlew :snippets:assembleDebug</div>
        <div style={{color: '#7DCFA8', fontWeight: 700, opacity: ok, fontSize: 34, marginTop: 8}}>BUILD SUCCESSFUL in 2s</div>
        <div style={{color: md.darkOnSurfaceVariant, opacity: ok}}>material3 1.5.0-beta02 · 0 warnings</div>
      </div>
      <div style={{position: 'absolute', right: 150, top: 230, width: 320, height: 320, display: 'grid', placeItems: 'center', scale: badge}}>
        <Shape name="Sunny" size={320} color={md.primary} style={{position: 'absolute', inset: 0, rotate: `${frame * 0.5}deg`}} />
        <div style={{position: 'relative', textAlign: 'center', color: md.onPrimary}}>
          <Icon name="check" size={70} />
          <div style={{fontSize: 56, fontWeight: 700, lineHeight: 1}}>28</div>
          <div style={{fontSize: 24, fontWeight: 600}}>snippets in CI</div>
        </div>
      </div>
    </SceneFrame>
  );
};
