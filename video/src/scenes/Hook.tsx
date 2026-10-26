import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Icon} from '../components/Icon';
import {MorphShape} from '../components/MorphShape';
import {headline, Kicker, SceneFrame} from '../components/SceneFrame';
import {enter, fadeIn} from '../components/motion';
import {md, springs} from '../theme';
import {beat} from './beats';

export const Hook = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const blob = enter(frame, fps, 0, springs.slowSpatial);
  const line1 = enter(frame, fps, 6);
  const line2 = enter(frame, fps, beat('01-hook', 0.55), springs.fastSpatial);
  return (
    <SceneFrame>
      <div style={{position: 'absolute', left: 140, top: 250, width: 1000}}>
        <div style={{opacity: fadeIn(frame, fps, 0), translate: `0 ${(1 - line1) * 30}px`}}>
          <Kicker>
            <Icon name="auto_awesome" size={34} /> Jetpack Compose · material3 1.5
          </Kicker>
        </div>
        <h1 style={{...headline, marginTop: 40, opacity: line1, translate: `0 ${(1 - line1) * 60}px`}}>
          Material 3 Expressive
          <br />
          <span style={{color: md.primary}}>is in Compose.</span>
        </h1>
        <div
          style={{
            marginTop: 56,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 20,
            padding: '22px 34px',
            borderRadius: 28,
            background: md.tertiaryContainer,
            color: md.onTertiaryContainer,
            fontSize: 50,
            fontWeight: 600,
            opacity: line2,
            scale: interpolate(line2, [0, 1], [0.85, 1]),
            transformOrigin: 'left center',
          }}
        >
          <Icon name="smart_toy" size={56} fill /> Your AI agent gets it wrong.
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          right: 150,
          top: 190,
          width: 640,
          height: 640,
          borderRadius: '50%',
          background: md.primaryContainer,
          display: 'grid',
          placeItems: 'center',
          scale: blob,
        }}
      >
        <MorphShape size={420} color={md.primary} />
      </div>
    </SceneFrame>
  );
};
