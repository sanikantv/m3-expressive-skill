import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';

// Material 3 baseline scheme (seed #6750A4), the same tokens as expressive.sanikant.dev.
export const md = {
  primary: '#6750A4',
  onPrimary: '#FFFFFF',
  primaryContainer: '#EADDFF',
  onPrimaryContainer: '#4F378B',
  secondaryContainer: '#E8DEF8',
  onSecondaryContainer: '#4A4458',
  tertiary: '#7D5260',
  onTertiary: '#FFFFFF',
  tertiaryContainer: '#FFD8E4',
  onTertiaryContainer: '#633B48',
  error: '#B3261E',
  errorContainer: '#F9DEDC',
  onErrorContainer: '#8C1D18',
  surface: '#FEF7FF',
  surfaceLowest: '#FFFFFF',
  surfaceLow: '#F7F2FA',
  surfaceContainer: '#F3EDF7',
  surfaceHigh: '#ECE6F0',
  surfaceHighest: '#E6E0E9',
  onSurface: '#1D1B20',
  onSurfaceVariant: '#49454F',
  outlineVariant: '#CAC4D0',
  // Dark scheme, for the "problem" scene.
  darkSurface: '#141218',
  darkContainer: '#211F26',
  darkHigh: '#2B2930',
  darkOnSurface: '#E6E0E9',
  darkOnSurfaceVariant: '#CAC4D0',
  darkPrimary: '#D0BCFF',
} as const;

export const FONT = "'Google Sans Flex', sans-serif";
export const ICON_FONT = "'Material Symbols Rounded'";
export const MONO = "'SF Mono', Menlo, Consolas, monospace";

// Google Sans Flex at normal width (weights 400–700), like paywall.sanikant.dev; Material Symbols subset.
loadFont({family: 'Google Sans Flex', url: staticFile('fonts/google-sans-flex-latin.woff2'), weight: '1 1000'});
loadFont({family: 'Material Symbols Rounded', url: staticFile('fonts/material-symbols-rounded.woff2'), display: 'block'});

/**
 * MotionScheme.expressive() springs from material3 1.5.0-beta02, converted for Remotion's spring():
 * Material gives a damping ratio ζ and stiffness k (mass 1); Remotion wants the damping
 * coefficient c = 2ζ√k.
 */
const toRemotion = (ratio: number, stiffness: number) => ({
  damping: 2 * ratio * Math.sqrt(stiffness),
  stiffness,
  mass: 1,
});
export const springs = {
  fastSpatial: toRemotion(0.6, 800),
  defaultSpatial: toRemotion(0.8, 380),
  slowSpatial: toRemotion(0.8, 200),
  effects: toRemotion(1, 1600),
};
