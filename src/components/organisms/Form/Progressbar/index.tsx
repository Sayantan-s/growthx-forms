import { FC } from 'react';
import { useFormContext } from '..';
import { Bar, Container, Progress } from './style';

export const Progressbar: FC = () => {
  const { progress, questions } = useFormContext();
  return (
    <Container>
      <Bar />
      <Progress
        animate={{ width: `${(progress / questions.length) * 100}%` }}
      />
    </Container>
  );
};

Progressbar.displayName = 'Form.Progressbar';
