import { View } from '@/components/atoms';
import styled from 'styled-components';

export interface Props {
  children: JSX.Element[] | JSX.Element;
}

export const Panels = ({ children }: Props) => {
  return <View>{children}</View>;
};

Panels.displayName = 'Form.Entries.Panels';

export const StyledPanel = styled(View)`
  background-color: red;
`;
