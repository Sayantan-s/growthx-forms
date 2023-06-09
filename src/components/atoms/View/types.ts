import { HTMLAttributes, ReactNode } from 'react';
import { DefaultTheme } from 'styled-components';
export interface Props extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  type?: 'stack' | 'box';
  as?: keyof JSX.IntrinsicElements;
  children: ReactNode | ((...args: unknown[]) => JSX.Element);
}

export interface StackProps {
  gap?: keyof DefaultTheme['spacing'];
  direction?: 'vertical' | 'horizontal';
}
