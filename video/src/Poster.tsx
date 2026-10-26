import {AbsoluteFill, Freeze} from 'remotion';
import {Icon} from './components/Icon';
import {Meet} from './scenes/Meet';
import {md} from './theme';

/** README/site poster: the "Meet" scene once everything is in, with a play button on top. */
export const Poster = () => (
  <AbsoluteFill>
    <Freeze frame={240}>
      <Meet top={80} />
    </Freeze>
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', padding: 54}}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '22px 40px 22px 30px',
          borderRadius: 999,
          background: md.tertiary,
          color: md.onTertiary,
          fontFamily: "'Google Sans Flex', sans-serif",
          fontSize: 40,
          fontWeight: 600,
          boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
        }}
      >
        <Icon name="play_arrow" size={60} fill /> Watch the intro · 1:18
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);
