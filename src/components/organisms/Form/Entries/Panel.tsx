import { Text, View } from '@/components/atoms';
import { ScrollDirection } from '@/hooks';
import { AnimatePresence, motion } from 'framer-motion';
import { forwardRef } from 'react';
import styled from 'styled-components';
import { useFormContext } from '..';
import { usePanelScrollContext } from './Panels';

interface Props {
  children: React.ReactNode;
  step: number;
}

export const variants = {
  initial: (scrollDirection: ScrollDirection) => ({
    translateY:
      !scrollDirection || scrollDirection === 'downward' ? '70vh' : '-70vh',
    opacity: 0,
  }),
  animate: { translateY: 0, opacity: 1 },
  exit: (scrollDirection: ScrollDirection) => ({
    translateY:
      !scrollDirection || scrollDirection === 'downward' ? '-70vh' : '70vh',
    opacity: 0,
  }),
};

export const Panel = forwardRef<HTMLDivElement, Props>(function Panel(
  { children, step },
  ref
) {
  const { step: formStep } = useFormContext();

  const { scrollDirection } = usePanelScrollContext();

  return (
    <AnimatePresence mode="popLayout" custom={scrollDirection}>
      {formStep === step ? (
        <StyledPanel
          ref={ref}
          key={step}
          custom={scrollDirection}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            type: 'tween',
            stiffness: 100,
            damping: 10,
            duration: 0.6,
          }}
        >
          <Pointer>
            <Text fontSize="1">{step + 1}</Text>
            <svg height="10" width="11">
              <path d="M7.586 5L4.293 1.707 5.707.293 10.414 5 5.707 9.707 4.293 8.293z"></path>
              <path d="M8 4v2H0V4z"></path>
            </svg>
          </Pointer>
          <StyledPanelContext>{children}</StyledPanelContext>
        </StyledPanel>
      ) : null}
    </AnimatePresence>
  );
});

Panel.displayName = 'Form.Entries.Panel';

const Pointer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing['1']};
  align-items: center;
  height: max-content;
  margin-top: ${({ theme }) => theme.spacing['1']};
  svg {
    fill: ${({ theme }) => theme.colors.black[50]};
  }
`;

const StyledPanel = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing['3']};
  width: 100%;
`;

const StyledPanelContext = styled(View)`
  width: 100%;
`;
