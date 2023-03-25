import styled from 'styled-components';
import { Props, StackProps } from './types';

export const Box = styled.div<Props>``;

export const Stack = styled.div<Props & StackProps>`
  display: flex;
  align-items: center;
  flex-direction: ${({ direction }) =>
    direction === 'vertical' ? 'column' : 'row'};
  gap: ${({ theme, gap }) => theme.spacing[gap || '0']};
`;
