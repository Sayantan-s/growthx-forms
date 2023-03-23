import { motion } from 'framer-motion';
import { FC } from 'react';
import styled from 'styled-components';
import { useFormContext } from '..';
import { Button } from './Button';
import { Descriptor } from './Descriptor';
import { Onboarding } from './Onboarding';
import { Panel } from './Panel';

interface Props {
  children: JSX.Element[];
}

const Root: FC<Props> = ({ children }) => {
  const { step } = useFormContext();
  if (children[0].type.displayName !== 'Form.Entries.Onboarding')
    throw new Error('First Component should be Form.Entries.Onboarding');
  return (
    <GrowthXEntry>
      <GrowthXEntrylContent>{children[step]}</GrowthXEntrylContent>
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
