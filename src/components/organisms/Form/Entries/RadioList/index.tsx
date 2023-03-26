import { InputConfig, InputConfigurationRadio } from '@/api/api.types';
import { Button, Text, TextField, View } from '@/components/atoms';
import { AnimationDefinition, motion } from 'framer-motion';
import React, { FC, useState } from 'react';
import styled, { css, useTheme } from 'styled-components';
import { useFormContext } from '../..';
import Tick from '../Tick';
import { SelectedProps } from './type';

const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const RadioList: FC<InputConfig<InputConfigurationRadio>> = ({
  options,
  others,
  name,
}) => {
  const { handleSelect: onSelect, formState } = useFormContext();
  const [showInput, setShowInput] = useState(false);
  const [value, setValue] = useState('');
  const theme = useTheme();
  const [selected, setSelected] = useState(formState[name]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (eve) =>
    setValue(eve.target.value);

  const handleShowInput = () => setShowInput(true);

  const handleClick = (option: string) => setSelected(option);

  const handleSubmitOthers: React.MouseEventHandler<HTMLButtonElement> = (
    eve
  ) => {
    eve.stopPropagation();
    if (!value) {
      setShowInput(false);
    } else {
      onSelect(name, value);
    }
  };

  const onAnimationComplete = (
    option: string,
    ...args: [AnimationDefinition]
  ) => {
    // trigger selection when the blinking animation completes
    const denoter = args[0] as { backgroundColor: string[] | string };
    if (!Array.isArray(denoter.backgroundColor)) {
      onSelect(name, option);
    }
  };

  return (
    <View type="stack">
      <RadioListContent>
        <View as="ul" type="stack" direction="vertical" gap="2">
          {options.map(({ option, id }, index) => (
            <Option
              key={id}
              whileTap={{
                backgroundColor: [
                  `${theme.colors.black[50]}15`,
                  `${theme.colors.black[50]}60`,
                  `${theme.colors.black[50]}15`,
                ],
              }}
              transition={{ repeat: 2, duration: 0.2 }}
              onAnimationComplete={(...args) =>
                onAnimationComplete(option, ...args)
              }
              onClick={() => handleClick(option)}
              selected={selected === option}
            >
              <View type="stack" gap="2">
                <KeyPad>{alphabets[index]}</KeyPad>
                <Text>{option}</Text>
              </View>
              {selected === option ? (
                <Tick color={theme.colors.black[50]} />
              ) : null}
            </Option>
          ))}
          {others ? (
            <InputOption
              onClick={handleShowInput}
              selected={selected === value}
            >
              {showInput ? (
                <InputComponent>
                  <StyledTextField
                    type="text"
                    name="other"
                    placeholder="Type your answer"
                    value={value}
                    onChange={handleChange}
                  />
                  <SubmitOthersButton onClick={handleSubmitOthers}>
                    <Tick color={theme.colors.black[700]} />
                  </SubmitOthersButton>
                </InputComponent>
              ) : (
                <View type="stack" gap="2">
                  <KeyPad>{alphabets[options.length]}</KeyPad>
                  <Text>Others</Text>
                </View>
              )}
            </InputOption>
          ) : null}
        </View>
      </RadioListContent>
    </View>
  );
};

const Option = styled(motion.li)<SelectedProps>`
  list-style: none;
  width: 30%;
  align-self: flex-start;
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

const InputOption = styled(Option)`
  padding: ${({ theme }) => `0 ${theme.spacing['1']} 0 ${theme.spacing['3']}`};
  &:hover {
    background-color: ${({ theme }) => `${theme.colors.black[50]}15`};
  }
`;

const SubmitOthersButton = styled(Button)`
  background-color: transparent;
  height: 80%;
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.black[100]};
  border-radius: 0.5rem;
`;

const KeyPad = styled(View)`
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

const RadioListContent = styled(View)`
  width: 100%;
  margin: ${({ theme }) => `${theme.spacing['3']} 0`};
`;

const InputComponent = styled(View)`
  width: 100%;
  height: 100%;
  align-items: center;
  display: flex;
`;

const StyledTextField = styled(TextField)`
  font-size: ${({ theme }) => theme.fontSize['2']};
  font-weight: ${({ theme }) => theme.fontWeights.thin};
  color: ${({ theme }) => theme.colors.black[50]};
  &::placeholder {
    color: ${({ theme }) => theme.colors.black[100]};
  }
`;
