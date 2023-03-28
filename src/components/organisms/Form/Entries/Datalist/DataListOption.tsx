import { Text } from '@/components/atoms';
import { pulseCSS, usePulse } from '@/hooks';
import { HTMLMotionProps, motion } from 'framer-motion';
import DOMPurify from 'isomorphic-dompurify';
import { FC, MouseEventHandler } from 'react';
import styled, { useTheme } from 'styled-components';
import Tick from '../Tick';

interface OptionProps {
  option?: string;
  selected: boolean;
  index: number;
  onClickFinish?: (option: string) => void;
}

export type Props = HTMLMotionProps<'li'> & OptionProps;

export const DataListOption: FC<Props> = ({
  onClickFinish,
  option,
  selected,
  onClick,
  ...rest
}) => {
  const [isPulsing, handlePulsing] = usePulse();
  const theme = useTheme();
  const handleAnimate = () => onClickFinish?.(option!);

  const handleClick: MouseEventHandler<HTMLLIElement> = (eve) => {
    if (!selected) {
      handlePulsing();
    }
    onClick?.(eve);
  };

  return (
    <StyledDatalistOption
      $ispulsing={isPulsing}
      onAnimationEnd={handleAnimate}
      onClick={handleClick}
      {...rest}
    >
      <Text
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(option!),
        }}
      />{' '}
      {selected && <Tick color={theme.colors.black[50]} />}
    </StyledDatalistOption>
  );
};

export const StyledDatalistOption = styled(motion.li)<{ $ispulsing: boolean }>`
  padding: ${({ theme }) => `0 ${theme.spacing['3']}`};
  border: 1px solid ${({ theme }) => theme.colors.black[400]};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => `${theme.colors.black[50]}15`};
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  .marked {
    font-weight: ${({ theme }) => theme.fontWeights.heading};
  }
  &:hover {
    background-color: ${({ theme }) => `${theme.colors.black[50]}40`};
  }
  ${pulseCSS}
`;
