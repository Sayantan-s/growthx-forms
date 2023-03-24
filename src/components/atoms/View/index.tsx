import { forwardRef } from 'react';
import { Box, Stack } from './style';
import { Props } from './types';

export const View = forwardRef<HTMLElement, Props>(
  ({ as = 'div', type = 'box', children, ...props }, ref) => {
    const Component = type === 'box' ? Box : Stack;
    return (
      <Component as={as} {...props} ref={ref}>
        {typeof children === 'function' ? children() : children}
      </Component>
    );
  }
);

View.displayName = 'View';
