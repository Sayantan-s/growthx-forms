import { forwardRef } from 'react';
import { Component } from './style';
import { Props } from './types';

export const Text = forwardRef<
  HTMLParagraphElement | HTMLHeadingElement | HTMLSpanElement,
  Props
>(({ as = 'p', children, ...props }, ref) => (
  <Component as={as} {...props} ref={ref}>
    {children}
  </Component>
));

Text.displayName = 'Text';
