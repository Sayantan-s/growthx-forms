import { View } from '@/components/atoms';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledLogo = styled(View)`
  position: relative;
  height: 3rem;
  width: 10rem;
  margin: 0 auto;
`;

export const ViewOverLay = styled(View)`
  position: fixed;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.black[900]};
  top: 0;
  width: 100%;
  z-index: 100;
  justify-content: center;
`;

export const Container = styled(View)`
  width: 100%;
  height: 3px;
  position: relative;
  margin-top: ${({ theme }) => theme.spacing['4']};
  overflow: hidden;
`;

export const Bar = styled(motion.div)`
  height: 100%;
  background-color: ${({ theme }) => `${theme.colors.black[50]}50`};
`;

export const Progress = styled(motion.div)`
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.black[50]};
  width: 40%;
`;

export const StyledView = styled(View)`
  width: 20rem;
`;
