import {
  InputConfig,
  InputConfigurationTextField,
  UserInput,
} from '@/api/api.types';
import { TextField } from '@/components/atoms';
import styled from 'styled-components';

export const InputField = ({ checks, type, inputConfig }: UserInput) => {
  switch (type) {
    case 'input':
      return (
        <StyledTextField
          {...(inputConfig as InputConfig<InputConfigurationTextField>)}
        />
      );
    default:
      return null;
  }
};

InputField.displayName = 'Form.Entries.Input';

const StyledTextField = styled(TextField)`
  box-shadow: ${({ theme }) => `${theme.colors.black[700]} 0px 2px`};
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
`;
