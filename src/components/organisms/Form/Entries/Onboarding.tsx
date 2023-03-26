import { View } from '@/components/atoms';
import { useFormContext } from '..';

export interface Props {
  children: React.ReactNode;
}

export const Onboarding = ({ children }: Props) => {
  const { step: formStep } = useFormContext();
  return formStep === -1 ? <View>{children}</View> : null;
};

Onboarding.displayName = 'Form.Entries.Onboarding';
