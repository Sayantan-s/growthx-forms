import { Text, View } from '@/components/atoms';
import { breakpoints } from '@/styles/theme';
import { FC } from 'react';
import styled from 'styled-components';
import { useFormContext } from '..';

interface Props {
  children: React.ReactNode;
}

export const Submission: FC<Props> = ({ children }) => {
  const { step, questions } = useFormContext();
  return questions.length === step ? (
    <StyledView>
      <Text fontSize="4">{children}</Text>
    </StyledView>
  ) : null;
};

Submission.displayName = 'Form.Entries.Submission';

const StyledView = styled(View)`
  @media (max-width: ${breakpoints.tab}) {
    padding: ${({ theme }) => theme.spacing['4']};
  }
`;
