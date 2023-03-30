import { View } from '@/components/atoms';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled(View)`
  width: 100%;
  height: 4px;
  position: relative;
`;

export const Bar = styled(motion.div)`
  height: 100%;
  background-color: ${({ theme }) => `${theme.colors.blue[500]}50`};
`;

export const Progress = styled(motion.div)`
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.blue[500]};
  width: 100%;
`;
