import { View } from '@/components/atoms';

export interface Props {
  children: JSX.Element[] | JSX.Element;
}

export const Panels = ({ children }: Props) => {
  return <View>{children}</View>;
};

Panels.displayName = 'Form.Entries.Panels';
