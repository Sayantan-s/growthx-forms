import { forwardRef } from 'react';
import { Component } from './style';
import { Props } from './types';

export const TextField = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return <Component {...props} ref={ref} />;
});

TextField.displayName = 'TextField';
