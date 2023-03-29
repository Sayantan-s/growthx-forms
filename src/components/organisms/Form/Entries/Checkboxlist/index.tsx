import {
  InputConfig,
  InputConfigurationCheckbox,
  UserInputChecks,
} from '@/api/api.types';
import { Text, View } from '@/components/atoms';
import { FC, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import { useFormContext } from '../..';
import { Option } from '../Option';

interface Props extends InputConfig<InputConfigurationCheckbox> {
  checks: UserInputChecks;
}

export const Checkboxlist: FC<Props> = ({ options, name, checks }) => {
  const { handleSelect, formState } = useFormContext();
  const [selected, setSelected] = useState<string[]>(() => {
    if (formState[name] && 'variable' in options) {
      const value = formState[name];
      return JSON.parse(value)[formState[options.variable]] || [];
    }
    return [];
  });

  const choose = checks.choose.value as number;

  const [disableOptions, setDisableOptions] = useState(
    selected.length === choose
  );

  const checkboxOptions = useMemo(
    () =>
      'variable' in options
        ? options.value[formState[options.variable]] || options.value['all']
        : options,
    [formState, options]
  );

  const onAnimationComplete = () => {
    handleSelect(
      name,
      'variable' in options
        ? JSON.stringify({ [formState[options.variable]]: selected })
        : JSON.stringify(selected),
      { toNext: selected.length === choose }
    );
  };

  const onClick = (option: string) => {
    let choosables = [];
    if (selected.includes(option)) {
      choosables = selected.filter((prevOption) => prevOption !== option);
      'variable' in options &&
        handleSelect(
          name,
          choosables.length
            ? JSON.stringify({ [formState[options.variable]]: choosables })
            : ''
        );
    } else {
      choosables = [...selected, option];
    }
    setSelected(choosables);
    setDisableOptions(choosables.length === checks.choose.value);
  };

  return (
    <View>
      <CheckboxList type="stack">
        <CheckboxlistContent>
          <StyledText fontSize="1">
            {choose - selected.length
              ? `Choose ${choose - selected.length} ${
                  choose - selected.length < choose ? 'more' : ''
                }`
              : null}
          </StyledText>
          <CheckboxOptionContent>
            {checkboxOptions.map(({ option, id }, index) => (
              <CheckboxOption
                option={option}
                key={id}
                onClickFinish={onAnimationComplete}
                onClick={() => onClick(option)}
                selected={selected.includes(option)}
                disabled={!selected.includes(option) && disableOptions}
                index={index}
              />
            ))}
          </CheckboxOptionContent>
        </CheckboxlistContent>
      </CheckboxList>
    </View>
  );
};

const CheckboxOption = styled(Option)<{ disabled?: boolean }>`
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
    `}
`;

const CheckboxOptionContent = styled(Option.Content)`
  max-width: 40rem;
`;

const CheckboxList = styled(View)`
  margin-top: ${({ theme }) => theme.spacing['9']};
`;

const CheckboxlistContent = styled(View)`
  width: 100%;
  margin: ${({ theme }) => `${theme.spacing['3']} 0`};
`;

const StyledText = styled(Text)`
  height: ${({ theme }) => theme.spacing['8']};
`;
