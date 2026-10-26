import type React from 'react';
import {ICON_FONT} from '../theme';

/** Material Symbols Rounded glyph (ligature). */
export const Icon: React.FC<{
  readonly name: string;
  readonly size?: number;
  readonly color?: string;
  readonly fill?: boolean;
  readonly style?: React.CSSProperties;
}> = ({name, size = 40, color, fill, style}) => (
  <span
    style={{
      fontFamily: ICON_FONT,
      fontSize: size,
      lineHeight: 1,
      color,
      fontVariationSettings: fill ? "'FILL' 1" : undefined,
      fontFeatureSettings: "'liga'",
      display: 'inline-block',
      ...style,
    }}
  >
    {name}
  </span>
);
