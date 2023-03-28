import {
  InputConfig,
  InputConfigurationCheckbox,
  UserInputChecks,
} from '@/api/api.types';
import { View } from '@/components/atoms';
import { FC, useMemo, useState } from 'react';
import styled, { css, useTheme } from 'styled-components';
import { useFormContext } from '../..';
import { Option } from '../Option';

const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

interface Props extends InputConfig<InputConfigurationCheckbox> {
  checks: UserInputChecks;
}

export const Checkboxlist: FC<Props> = ({ options, name, checks }) => {
  const {
    handleSelect: onSelect,
    formState,
    handleIncrement,
  } = useFormContext();
  const theme = useTheme();

  const [selected, setSelected] = useState<string[]>([]);
  const [hasSelected, setHasSelected] = useState(false);

  const [disableOptions, setDisableOptions] = useState(false);

  const checkboxOptions = useMemo(
    () =>
      'variable' in options
        ? options.value[formState[options.variable]] || options.value['all']
        : options,
    [formState, options]
  );

  const onAnimationComplete = () => {
    // trigger selection when the blinking animation completes
    // if (selected.length === checks.choose.value) {
    //   onSelect(name, selected.join(','));
    // }

    console.log('HELLO');
  };

  // console.log(selected.length, checks); // Double check the localstorage when the user changes role. !important

  const handleSelect = (option: string) => {
    const choosables = [...selected, option];
    setSelected(choosables);
    setDisableOptions(choosables.length === checks.choose.value);
  };

  return (
    <View>
      <CheckboxList type="stack">
        <CheckboxlistContent>
          <CheckboxOptionContent>
            {checkboxOptions.map(({ option, id }, index) => (
              <CheckboxOption
                option={option}
                key={id}
                onClickFinish={onAnimationComplete}
                onClick={() => handleSelect(option)}
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
