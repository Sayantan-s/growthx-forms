import { HTMLAttributes } from 'react';

type HeadingType = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps {
  as?: 'p' | `h${HeadingType}`;
  level?: `${HeadingType}`;
}

export type Props = HeadingProps & HTMLAttributes<HTMLElement>;
