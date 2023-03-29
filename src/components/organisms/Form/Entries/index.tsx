import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FormContextProps, useFormContext } from '..';
import { Button } from './Button';
import { Controls } from './Controls';
import { DataInput } from './DataInput';
import { Descriptor } from './Descriptor';
import { Error } from './Error';
import { Heading } from './Heading';
import { Indicator } from './Indicator';
import { InputField } from './InputField';
import { Onboarding } from './Onboarding';
import { Panel } from './Panel';
import { Panels } from './Panels';
import { Submission } from './Submission';

interface Props {
  children: (props: FormContextProps) => JSX.Element;
}

const Root = ({ children }: Props) => {
  const context = useFormContext();
  return (
    <GrowthXEntry>
      <GrowthXEntrylContent>{children(context)}</GrowthXEntrylContent>
    </GrowthXEntry>
  );
};

Onboarding.displayName = 'Form.Entries.Onboarding';
Panel.displayName = 'Form.Entries.Panel';

export const Entries = Object.assign(Root, {
  Onboarding,
  Panel,
  Button,
  Descriptor,
  Panels,
  DataInput,
  InputField,
  Indicator,
  Controls,
  Heading,
  Error,
  Submission,
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
