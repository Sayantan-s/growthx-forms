import { FC, useEffect, useState } from 'react';
import { useFormContext } from '..';
import { Bar, Container, Progress } from './style';

export const Progressbar: FC = () => {
  const { progress, questions, step } = useFormContext();
  const progressLength =
    progress / questions.length < 0 ? 0 : progress / questions.length;

  const [hideProgress, setHideProgress] = useState(false);
  useEffect(() => {
    if (step === questions.length) {
      setTimeout(() => {
        setHideProgress(true);
      }, 1000);
    }
  }, [step, questions]);
  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {!hideProgress ? (
        <>
          <Bar />
          <Progress
            initial={{ translateX: '-100%' }}
            animate={{ translateX: `${-100 + progressLength * 100}%` }}
            transition={{ type: 'tween' }}
          />
        </>
      ) : null}
    </Container>
  );
};

Progressbar.displayName = 'Form.Progressbar';
