import { Button as B } from '@/components/atoms';
import { HTMLMotionProps } from 'framer-motion';
import { MouseEventHandler, PropsWithChildren, forwardRef } from 'react';
import styled from 'styled-components';

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<HTMLMotionProps<'button'>>
>(({ onClick, ...rest }, ref) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (eve) => {
    eve.preventDefault();
    onClick?.(eve);
  };

  return <StyledButton {...rest} onClick={handleClick} ref={ref} />;
});

Button.displayName = 'Form.Entries.Button';

const StyledButton = styled(B)`
  padding: ${({ theme }) => `${theme.spacing['3']} ${theme.spacing['4']}`};
  min-width: 8rem;
  border-radius: 0.5rem;
  outline: none;
  border: none;
  background-color: ${({ theme }) => theme.colors.blue[600]};
  color: ${({ theme }) => theme.colors.blue[50]};
  font-size: ${({ theme }) => theme.fontSize['2']};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  svg {
    fill: ${({ theme }) => theme.colors.blue[50]};
  }
`;
