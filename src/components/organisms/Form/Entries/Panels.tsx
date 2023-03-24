import { View } from '@/components/atoms';

export interface Props {
  children: JSX.Element[];
}

export const Panels = ({ children }: Props) => {
  if (children[0].type.displayName !== 'Form.Entries.Onboarding')
    throw new Error('First Component should be Form.Entries.Onboarding!');
  return <View>{children}</View>;
};

Panels.displayName = 'Form.Entries.Panels';
