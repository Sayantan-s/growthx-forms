import { View } from '@/components/atoms';
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
      <StyledPanelContext>{children}</StyledPanelContext>
    </StyledPanel>
  ) : null;
});

Panel.displayName = 'Form.Entries.Panel';

const StyledPanel = styled(motion.div)`
  display: flex;
  align-items: center;
`;

const StyledPanelContext = styled(View)`
  width: 100%;
`;
