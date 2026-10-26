import type React from 'react';
import shapes from '../data/shapes.json';

export type ShapeName = (typeof shapes.shapes)[number]['name'];
const byName = new Map(shapes.shapes.map((s) => [s.name, s.path]));

/** One of the 35 MaterialShapes, from material3's polygon definitions (0..100 box). */
export const Shape: React.FC<{
  readonly name: ShapeName;
  readonly size: number;
  readonly color: string;
  readonly style?: React.CSSProperties;
}> = ({name, size, color, style}) => (
  <svg width={size} height={size} viewBox="-4 -4 108 108" style={{overflow: 'visible', ...style}}>
    <path d={byName.get(name)} fill={color} />
  </svg>
);

export const allShapes = shapes.shapes;
