import { Text, View } from '@/components/atoms';
import { AnimationDefinition, HTMLMotionProps, motion } from 'framer-motion';
import { FC } from 'react';
import styled, { css, useTheme } from 'styled-components';
import Tick from '../Tick';
import { Content } from './Content';

interface OptionProps {
  option?: string;
  selected: boolean;
  index: number;
  onClickFinish?: (option: string) => void;
}

export type Props = HTMLMotionProps<'li'> & OptionProps;

export const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const Root: FC<Props> = ({
  selected,
  index,
  option,
  children,
  onClickFinish,
  ...rest
}) => {
  const theme = useTheme();

  const handleAnimate = (option: string, ...args: [AnimationDefinition]) => {
    // trigger selection when the blinking animation completes
    const denoter = args[0] as { backgroundColor: string[] | string };
    if (!Array.isArray(denoter.backgroundColor)) {
      onClickFinish?.(option);
    }
  };

  return (
    <Component
      whileTap={{
        backgroundColor: [
          `${theme.colors.black[50]}15`,
          `${theme.colors.black[50]}60`,
          `${theme.colors.black[50]}15`,
        ],
      }}
      transition={{ repeat: 2, duration: 0.2 }}
      selected={selected}
      onAnimationComplete={(...args) => handleAnimate(option!, ...args)}
      {...rest}
    >
      {children || (
        <>
          <View type="stack" gap="2">
            <Key>{alphabets[index]}</Key>
            <Text>{option}</Text>
          </View>
          {selected ? <Tick color={theme.colors.black[50]} /> : null}
        </>
      )}
    </Component>
  );
};

export const Option = Object.assign(Root, { Content });

const Component = styled(motion.li)<
  Omit<Props, 'option' | 'index' | 'onClickFinish'>
>`
  list-style: none;
  padding: ${({ theme }) => `0 ${theme.spacing['3']}`};
  border: 1px solid ${({ theme }) => theme.colors.black[400]};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => `${theme.colors.black[50]}15`};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  &:hover {
    background-color: ${({ theme }) => `${theme.colors.black[50]}40`};
  }
  ${({ selected }) =>
    selected &&
    css`
      border: 1px solid ${({ theme }) => theme.colors.black[50]};
    `}
`;

const Key = styled(View)`
  width: 2.5rem;
  aspect-ratio: 1/1;
  background-color: ${({ theme }) => theme.colors.black[900]};
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.fontWeights.heading};
  border: 1px solid ${({ theme }) => theme.colors.black[50]};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.3rem;
`;
