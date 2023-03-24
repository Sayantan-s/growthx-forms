import { ReactNode } from 'react';

export interface Props {
  type?: 'stack' | 'box';
  as?: keyof JSX.IntrinsicElements;
  children: ReactNode | ((...args: unknown[]) => JSX.Element);
}
