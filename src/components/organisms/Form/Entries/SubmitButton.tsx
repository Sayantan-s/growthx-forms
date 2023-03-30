import { breakpoints } from '@/styles/theme';
import { forwardRef } from 'react';
import styled from 'styled-components';
import { Button, Props } from './Button';

export const SubmitButton = forwardRef<HTMLButtonElement, Props>(
  (props, ref) => {
    return <StyledButton {...props} ref={ref} />;
  }
);

SubmitButton.displayName = 'Form.Entries.SubmitButton';

const StyledButton = styled(Button)`
  @media (max-width: ${breakpoints.tab}) {
    width: 100%;
  }
`;
