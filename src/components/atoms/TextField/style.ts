import styled from 'styled-components';
import { TextFieldProps } from './types';

export const Component = styled.input<TextFieldProps>`
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  &[type='number'] {
    -moz-appearance: textfield;
  }
  &[type='number']:hover,
  &[type='number']:focus {
    -moz-appearance: number-input;
  }
`;
