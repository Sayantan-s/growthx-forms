import { Text as Heading } from '@/components/atoms';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FormContextProps, useFormContext } from '..';
import { Button } from './Button';
import { DataInput } from './DataInput';
import { Descriptor } from './Descriptor';
import { Onboarding } from './Onboarding';
import { Panel } from './Panel';
import { Panels } from './Panels';

interface Props<TOnBoard, TQuestions, TState> {
  children: (
    props: FormContextProps<TOnBoard, TQuestions, TState>
  ) => JSX.Element;
}

const Root = <TOnBoard, TQuestions, TState>({
  children,
}: Props<TOnBoard, TQuestions, TState>) => {
  const context = useFormContext<TOnBoard, TQuestions, TState>();
  return (
    <GrowthXEntry>
      <GrowthXEntrylContent>{children(context)}</GrowthXEntrylContent>
    </GrowthXEntry>
  );
};

Onboarding.displayName = 'Form.Entries.Onboarding';
Panel.displayName = 'Form.Entries.Panel';
Heading.displayName = 'Form.Entries.Heading';

export const Entries = Object.assign(Root, {
  Onboarding,
  Panel,
  Button,
  Descriptor,
  Heading,
  Panels,
  DataInput,
});

const GrowthXEntry = styled(motion.div)`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const GrowthXEntrylContent = styled.div`
  width: 100%;
  max-width: 72rem;
  margin: 10rem auto;
`;
