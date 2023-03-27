import { Text, View } from '@/components/atoms';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import styled from 'styled-components';
import { useFormContext } from '..';

interface Props {
  children: React.ReactNode;
  step: number;
}

export const Panel = forwardRef<HTMLDivElement, Props>(function Panel(
  { children, step },
  ref
) {
  const { step: formStep } = useFormContext();
  return formStep === step ? (
    <StyledPanel ref={ref}>
      <Pointer>
        <Text fontSize="1">{step + 1}</Text>
        <svg height="10" width="11">
          <path d="M7.586 5L4.293 1.707 5.707.293 10.414 5 5.707 9.707 4.293 8.293z"></path>
          <path d="M8 4v2H0V4z"></path>
        </svg>
      </Pointer>
      <StyledPanelContext>{children}</StyledPanelContext>
    </StyledPanel>
  ) : null;
});

Panel.displayName = 'Form.Entries.Panel';

const Pointer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing['1']};
  align-items: center;
  height: 3rem;
  svg {
    fill: ${({ theme }) => theme.colors.black[50]};
  }
`;

const StyledPanel = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing['3']};
`;

const StyledPanelContext = styled(View)`
  width: 100%;
`;
