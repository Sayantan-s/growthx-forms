import { forwardRef } from 'react';
import { Box, Stack } from './style';
import { Props, StackProps } from './types';

export const View = forwardRef<HTMLElement, Props & StackProps>(
  ({ type = 'box', children, ...rest }, ref) => {
    const Component = type === 'box' ? Box : Stack;
    console.log(type, rest.gap);
    return (
      <Component {...rest} ref={ref}>
        {typeof children === 'function' ? children() : children}
      </Component>
    );
  }
);

View.displayName = 'View';
