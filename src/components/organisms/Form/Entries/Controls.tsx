import { View } from '@/components/atoms';
import { breakpoints } from '@/styles/theme';
import { FC } from 'react';
import styled from 'styled-components';

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export const Controls: FC<Props> = ({ children }) => {
  return (
    <StyledControlPanel type="stack" gap="2" direction="horizontal">
      {children}
    </StyledControlPanel>
  );
};

Controls.displayName = 'Form.Entries.Controls';

const StyledControlPanel = styled(View)`
  margin-top: ${({ theme }) => theme.spacing['3']};
  @media (max-width: ${breakpoints.tab}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing['4']};
  }
`;
