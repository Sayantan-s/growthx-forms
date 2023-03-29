import { FC } from 'react';
import { useFormContext } from '..';
import { Bar, Container, Progress } from './style';

export const Progressbar: FC = () => {
  const { progress, questions, step } = useFormContext();
  const progressLength =
    progress / questions.length < 0 ? 0 : progress / questions.length;
  return (
    <Container>
      <Bar />
      <Progress
        initial={{ translateX: '-100%' }}
        animate={{ translateX: `${-100 + progressLength * 100}%` }}
        transition={{ type: 'tween' }}
      />
    </Container>
  );
};

Progressbar.displayName = 'Form.Progressbar';

//(progress / questions.length) * 100
