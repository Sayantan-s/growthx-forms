import {
  InputConfig,
  InputConfigurationPhone,
  UserInputChecks,
} from '@/api/api.types';
import { TextField, View } from '@/components/atoms';
import { breakpoints } from '@/styles/theme';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { useFormContext } from '../..';
import FlagSearch from './FlagSearch';

interface Props extends InputConfig<InputConfigurationPhone> {
  checks: UserInputChecks;
}

export const Phone: FC<Props> = ({ checks, withCountryCode, ...rest }) => {
  const { formState, handleChange } = useFormContext();
  const [dialCode, setDialcode] = useState<string | null>(null);

  return (
    <Content>
      <PhoneContainer type="stack" gap="3">
        <FlagSearch onGetDialCode={setDialcode} />
        <StyledTextField
          {...rest}
          onChange={handleChange}
          value={formState[rest.name]}
        />
      </PhoneContainer>
    </Content>
  );
};

const StyledTextField = styled(TextField)`
  max-width: 100%;
  box-shadow: ${({ theme }) => `${theme.colors.black[700]} 0px 2px`};
  -webkit-box-shadow: ${({ theme }) => `${theme.colors.black[700]} 0px 2px`};
  outline: none;
  transition: 0.2s box-shadow;
  padding: ${({ theme }) => `${theme.spacing['2']} 0`};
  font-size: ${({ theme }) => theme.fontSize['5']};
  color: ${({ theme }) => theme.colors.black[50]};
  font-weight: ${({ theme }) => theme.fontWeights.thin};
  margin: ${({ theme }) => `${theme.spacing['3']} 0`};
  &:focus {
    outline: none;
    box-shadow: ${({ theme }) => `${theme.colors.black[100]} 0px 2px`};
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.black[700]};
  }
`;

const PhoneContainer = styled(View)`
  align-items: stretch;
`;

const Content = styled.div`
  position: relative;
  max-width: 60%;
  @media (max-width: ${breakpoints.tab}) {
    max-width: 100%;
  }
`;
