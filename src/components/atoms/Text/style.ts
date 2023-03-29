import styled from 'styled-components';
import { TextProps } from './types';

export const Component = styled.p<TextProps>`
  font-size: ${({ theme, fontSize }) => theme.fontSize[fontSize || '2']};
`;
