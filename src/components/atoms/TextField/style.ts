import styled from 'styled-components';
import { TextFieldProps } from './types';

export const Component = styled.input<TextFieldProps>`
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type='number'] {
    -moz-appearance: textfield;
  }
`;
