import { useCallback, useState } from 'react';

interface Props {
  hasOnboarding: boolean;
  limit: number;
}

const initialState = (hasOnboarding: boolean) => (hasOnboarding ? -1 : 0);

export const useFormControls = ({ hasOnboarding, limit }: Props) => {
  const [formStep, setFormStep] = useState(() => initialState(hasOnboarding));
  const [progress, setProgress] = useState(formStep);

  const handleIncrement = useCallback(() => {
    setFormStep((prevState) => (prevState < limit ? prevState + 1 : prevState));
    setProgress((prevState) => prevState + 1);
  }, [limit]);

  const handleDecrement = () => {
    setFormStep((prevState) =>
      prevState > initialState(hasOnboarding) ? prevState - 1 : prevState
    );
    setProgress((prevState) => prevState - 1);
  };

  return { formStep, handleDecrement, handleIncrement, progress };
};
