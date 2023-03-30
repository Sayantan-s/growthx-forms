import { Button as B, Spinner } from '@/components/atoms';
import { useKeyDown } from '@/hooks';
import { HTMLMotionProps } from 'framer-motion';
import { MouseEventHandler, PropsWithChildren, forwardRef } from 'react';
import styled from 'styled-components';

export interface Props extends PropsWithChildren<HTMLMotionProps<'button'>> {
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ onClick, children, isLoading, ...rest }, ref) => {
    const isKeyDown = useKeyDown();

    const handleClick: MouseEventHandler<HTMLButtonElement> = (eve) => {
      eve.preventDefault();
      !isKeyDown && onClick?.(eve);
    };

    return (
      <StyledButton {...rest} onClick={handleClick} ref={ref}>
        {isLoading ? <Spinner /> : children}
      </StyledButton>
    );
  }
);

Button.displayName = 'Form.Entries.Button';

const StyledButton = styled(B)`
  padding: ${({ theme }) => `${theme.spacing['3']} ${theme.spacing['4']}`};
  min-width: 8rem;
  height: 4.5rem;
  line-height: 4.5rem;
  border-radius: 0.5rem;
  outline: none;
  border: none;
  background-color: ${({ theme }) => theme.colors.blue[600]};
  color: ${({ theme }) => theme.colors.blue[50]};
  font-size: ${({ theme }) => theme.fontSize['2']};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing['3']};
  svg {
    fill: ${({ theme }) => theme.colors.blue[50]};
  }
  &:disabled {
    background-color: ${({ theme }) => `${theme.colors.blue[600]}30`};
  }
`;
