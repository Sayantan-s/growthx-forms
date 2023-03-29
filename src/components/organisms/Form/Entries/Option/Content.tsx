import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Content = styled(motion.ul)`
  gap: ${({ theme }) => theme.spacing['2']};
  display: inline-flex;
  list-style: none;
  padding: 0;
  flex-flow: column wrap;
  -webkit-box-align: stretch;
  align-items: stretch;
  width: 100%;
  max-width: 30rem;
`;
