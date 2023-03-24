import { FC } from 'react';
import { Bar, Container, Progress } from './style';

export const Progressbar: FC = () => {
  return (
    <Container>
      <Bar />
      <Progress />
    </Container>
  );
};

Progressbar.displayName = 'Form.Progressbar';
