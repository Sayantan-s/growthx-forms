import { Button, TextField, View } from '@/components/atoms';
import { Props as TextFieldProps } from '@/components/atoms/TextField/types';
import { breakpoints } from '@/styles/theme';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import styled from 'styled-components';
// interface Props extends TextFieldProps {}

export const DataListInput = forwardRef<
  HTMLInputElement,
  TextFieldProps & { show: boolean }
>(({ show, ...props }, ref) => {
  return (
    <InputContainer>
      <StyledContent>
        <StyledTextField {...props} ref={ref} />
        <InputButton>
          <motion.svg
            animate={{
              transform: show ? 'rotate(180deg)' : 'rotate(360deg)',
            }}
            height={9}
            width={14}
          >
            <path d="M12.293.293l1.414 1.414L7 8.414.293 1.707 1.707.293 7 5.586z" />
          </motion.svg>
        </InputButton>
      </StyledContent>
    </InputContainer>
  );
});

DataListInput.displayName = 'Form.Entries.Datalist.Input';

const StyledTextField = styled(TextField)`
  outline: none;
  transition: 0.2s box-shadow;
  font-size: ${({ theme }) => theme.fontSize['5']};
  color: ${({ theme }) => theme.colors.black[50]};
  font-weight: ${({ theme }) => theme.fontWeights.thin};
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.black[700]};
  }
  @media (max-width: ${breakpoints.tab}) {
    font-size: ${({ theme }) => theme.fontSize['4']};
  }
`;

const StyledContent = styled(View)`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: ${({ theme }) => theme.spacing['2']};
`;

const InputContainer = styled.div`
  width: 100%;
  box-shadow: ${({ theme }) => `${theme.colors.black[700]} 0px 2px`};
  -webkit-box-shadow: ${({ theme }) => `${theme.colors.black[700]} 0px 2px`};
  margin: ${({ theme }) => `${theme.spacing['3']} 0`};
  &:focus-within {
    box-shadow: ${({ theme }) => `${theme.colors.black[100]} 0px 2px`};
  }
`;

const InputButton = styled(Button)`
  width: 3.2rem;
  aspect-ratio: 1/1;
  background-color: transparent;
  svg {
    fill: ${({ theme }) => theme.colors.black[50]};
  }
`;
