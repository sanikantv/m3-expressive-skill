import {Audio} from '@remotion/media';
import {linearTiming, TransitionSeries} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {Sequence, staticFile} from 'remotion';
import {ApiStatus} from './scenes/ApiStatus';
import {Compiled} from './scenes/Compiled';
import {Components} from './scenes/Components';
import {Cta} from './scenes/Cta';
import {Design} from './scenes/Design';
import {Hook} from './scenes/Hook';
import {Meet} from './scenes/Meet';
import {Problem} from './scenes/Problem';
import {ShapesMotion} from './scenes/ShapesMotion';
import {sceneFrames, TRANSITION, VOICE_DELAY} from './timeline';
import './theme';

const Voice = ({id}: {readonly id: string}) => (
  <Sequence name={`Voice ${id}`} from={VOICE_DELAY} layout="none">
    <Audio src={staticFile(`voiceover/intro/${id}.mp3`)} />
  </Sequence>
);

const fadeT = () => <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames: TRANSITION})} />;

export const Intro = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence name="Hook" durationInFrames={sceneFrames('01-hook')}>
        <Hook />
        <Voice id="01-hook" />
      </TransitionSeries.Sequence>
      {fadeT()}
      <TransitionSeries.Sequence name="Problem" durationInFrames={sceneFrames('02-problem')}>
        <Problem />
        <Voice id="02-problem" />
      </TransitionSeries.Sequence>
      {fadeT()}
      <TransitionSeries.Sequence name="Meet" durationInFrames={sceneFrames('03-meet')}>
        <Meet />
        <Voice id="03-meet" />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={linearTiming({durationInFrames: TRANSITION})} />
      <TransitionSeries.Sequence name="API status" durationInFrames={sceneFrames('04-api-status')}>
        <ApiStatus />
        <Voice id="04-api-status" />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={linearTiming({durationInFrames: TRANSITION})} />
      <TransitionSeries.Sequence name="Components" durationInFrames={sceneFrames('05-components')}>
        <Components />
        <Voice id="05-components" />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={linearTiming({durationInFrames: TRANSITION})} />
      <TransitionSeries.Sequence name="Shapes and motion" durationInFrames={sceneFrames('06-shapes-motion')}>
        <ShapesMotion />
        <Voice id="06-shapes-motion" />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={linearTiming({durationInFrames: TRANSITION})} />
      <TransitionSeries.Sequence name="Design rules" durationInFrames={sceneFrames('07-design')}>
        <Design />
        <Voice id="07-design" />
      </TransitionSeries.Sequence>
      {fadeT()}
      <TransitionSeries.Sequence name="Compiled" durationInFrames={sceneFrames('08-compiled')}>
        <Compiled />
        <Voice id="08-compiled" />
      </TransitionSeries.Sequence>
      {fadeT()}
      <TransitionSeries.Sequence name="Call to action" durationInFrames={sceneFrames('09-cta') + 45}>
        <Cta />
        <Voice id="09-cta" />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
