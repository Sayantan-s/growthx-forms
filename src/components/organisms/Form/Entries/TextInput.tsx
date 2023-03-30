import { UserInputChecks } from '@/api/api.types';
import { TextField, View } from '@/components/atoms';
import { Props as TextFieldProps } from '@/components/atoms/TextField/types';
import { breakpoints } from '@/styles/theme';
import { forwardRef } from 'react';
import styled from 'styled-components';
import { useFormContext } from '..';

interface Props extends TextFieldProps {
  checks: UserInputChecks;
}

export const TextInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { formState, handleChange } = useFormContext();
  return (
    <View>
      <StyledTextField
        {...props}
        value={formState[props.name]}
        onChange={handleChange}
        ref={ref}
      />
    </View>
  );
});

TextInput.displayName = 'Form.Entries.TextInput';

const StyledTextField = styled(TextField)`
  box-shadow: ${({ theme }) => `${theme.colors.black[700]} 0px 2px`};
  -webkit-box-shadow: ${({ theme }) => `${theme.colors.black[700]} 0px 2px`};
  outline: none;
  transition: 0.2s box-shadow;
  padding: ${({ theme }) => `${theme.spacing['2']} 0`};
  font-size: ${({ theme }) => theme.fontSize['5']};
  color: ${({ theme }) => theme.colors.black[50]};
  margin: ${({ theme }) => `${theme.spacing['3']} 0`};
  font-weight: ${({ theme }) => theme.fontWeights.thin};
  &:focus {
    outline: none;
    box-shadow: ${({ theme }) => `${theme.colors.black[100]} 0px 2px`};
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.black[700]};
  }
  @media (max-width: ${breakpoints.tab}) {
    font-size: ${({ theme }) => theme.fontSize['4']};
  }
`;
