import { View } from '@/components/atoms';
import { AnimatePresence } from 'framer-motion';
import { useFormContext } from '..';
import { variants } from './Panel';
import { usePanelScrollContext } from './Panels';

export interface Props {
  children: React.ReactNode;
}

export const Onboarding = ({ children }: Props) => {
  const { step: formStep } = useFormContext();

  const { scrollDirection } = usePanelScrollContext();

  return (
    <AnimatePresence mode="popLayout" custom={scrollDirection} initial={false}>
      {formStep === -1 ? (
        <View
          key={formStep}
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
          {children}
        </View>
      ) : null}
    </AnimatePresence>
  );
};

Onboarding.displayName = 'Form.Entries.Onboarding';
