import {Composition} from 'remotion';
import {Intro} from './Intro';
import {Poster} from './Poster';
import {FPS, TOTAL_FRAMES} from './timeline';

export const RemotionRoot = () => {
  return (
    <>
      <Composition id="Intro" component={Intro} durationInFrames={TOTAL_FRAMES} fps={FPS} width={1920} height={1080} />
      {/* Long enough to contain the frozen frame, at the video fps so spring timings match. */}
      <Composition id="Poster" component={Poster} durationInFrames={300} fps={FPS} width={1920} height={1080} />
    </>
  );
};
