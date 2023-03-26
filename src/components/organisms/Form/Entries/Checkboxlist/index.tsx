import {
  InputConfig,
  InputConfigurationCheckbox,
  UserInputChecks,
} from '@/api/api.types';
import { Text, View } from '@/components/atoms';
import { AnimationDefinition, motion } from 'framer-motion';
import { FC, useMemo, useState } from 'react';
import styled, { css, useTheme } from 'styled-components';
import { useFormContext } from '../..';
import Tick from '../Tick';
import { SelectedProps } from './type';

const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

interface Props extends InputConfig<InputConfigurationCheckbox> {
  checks: UserInputChecks;
}

export const Checkboxlist: FC<Props> = ({ options, name, checks }) => {
  const { handleSelect: onSelect, formState } = useFormContext();
  const theme = useTheme();

  const [selected, setSelected] = useState(() =>
    typeof checks.choose === 'number' && checks.choose > 1
      ? formState[name].split(',')
      : formState[name]
      ? [formState[name]]
      : []
  );

  const [disableOptions, setDisableOptions] = useState(false);

  const checkboxOptions = useMemo(
    () =>
      'variable' in options
        ? options.value[formState[options.variable]] || options.value['all']
        : options,
    [formState, options]
  );

  const onAnimationComplete = (def: AnimationDefinition) => {
    // trigger selection when the blinking animation completes
    const denoter = def as { backgroundColor: string[] | string };
    if (
      !Array.isArray(denoter.backgroundColor) &&
      selected.length === checks.choose
    ) {
      onSelect(name, selected.join(','));
    }
  };

  console.log(selected.length, checks); // Double check the localstorage when the user changes role. !important

  const handleSelect = (option: string) => {
    const choosables = [...selected, option];
    setSelected(choosables);
    setDisableOptions(choosables.length === checks.choose);
  };

  return (
    <CheckboxList type="stack">
      <CheckboxlistContent>
        <View as="ul" type="stack" direction="vertical" gap="2">
          {checkboxOptions.map(({ option, id }, index) => (
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
              onAnimationComplete={onAnimationComplete}
              onClick={() => handleSelect(option)}
              selected={selected.includes(option)}
              disabled={!selected.includes(option) && disableOptions}
            >
              <View type="stack" gap="2">
                <KeyPad>{alphabets[index]}</KeyPad>
                <Text>{option}</Text>
              </View>
              {selected.includes(option) ? (
                <Tick color={theme.colors.black[50]} />
              ) : null}
            </Option>
          ))}
        </View>
      </CheckboxlistContent>
    </CheckboxList>
  );
};

const Option = styled(motion.li)<SelectedProps>`
  list-style: none;
  width: 50%;
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
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
    `}
`;

const CheckboxList = styled(View)`
  margin-top: ${({ theme }) => theme.spacing['9']};
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

const CheckboxlistContent = styled(View)`
  width: 100%;
  margin: ${({ theme }) => `${theme.spacing['3']} 0`};
`;
