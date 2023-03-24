import { View } from '@/components/atoms';
import { useFormContext } from '..';

export interface Props {
  children: React.ReactNode;
}

const Root = ({ children }: Props) => {
  const { step: formStep } = useFormContext();
  return formStep === 0 ? <View>{children}</View> : null;
};

Root.displayName = 'Form.Entries.Onboarding';

export const Onboarding = Object.assign(Root, {});
