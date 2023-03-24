import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 4px;
  position: relative;
`;

export const Bar = styled.div`
  height: 100%;
  background-color: ${({ theme }) => `${theme.colors.blue[500]}50`};
`;

export const Progress = styled(motion.div)`
  height: 100%;
  width: 50%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.blue[500]};
`;
