import { HTMLAttributes } from 'react';
import { ExtraStyleProps } from '../types.common';

type HeadingType = 1 | 2 | 3 | 4 | 5 | 6;

export interface TextProps extends ExtraStyleProps {
  as?: 'p' | `h${HeadingType}` | 'span';
  level?: `${HeadingType}`;
}

export type Props = TextProps & HTMLAttributes<HTMLElement>;
