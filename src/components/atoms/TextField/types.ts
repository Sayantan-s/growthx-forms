import { InputConfig, InputConfigurationTextField } from '@/api/api.types';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { ExtraStyleProps } from '../types.common';

export type TextFieldProps = ExtraStyleProps;

export type Props = TextFieldProps &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
  InputConfig<InputConfigurationTextField>;
