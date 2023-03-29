import { forwardRef } from 'react';
import { Component } from './styles';
import { Props } from './type';

export const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => (
  <Component whileTap={{ scale: 0.98 }} {...props} ref={ref} />
));

Button.displayName = 'Button';
