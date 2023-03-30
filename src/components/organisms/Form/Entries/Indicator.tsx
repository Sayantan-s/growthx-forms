import { Text } from '@/components/atoms';
import { breakpoints } from '@/styles/theme';
import { FC } from 'react';
import styled from 'styled-components';

interface Props {
  indicate: string;
}

export const Indicator: FC<Props> = ({ indicate }) => {
  return (
    <StyledText>
      Press <StyledIndicator as="span">{indicate}</StyledIndicator>
    </StyledText>
  );
};

Indicator.displayName = 'Form.Entries.Indicator';

const StyledText = styled(Text)`
  font-size: 1rem;
  @media (max-width: ${breakpoints.tab}) {
    display: none;
  }
`;

const StyledIndicator = styled(Text)`
  font-size: 1rem;
  font-weight: 600;
`;
