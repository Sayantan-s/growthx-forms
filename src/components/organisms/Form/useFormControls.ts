import { useState } from 'react';

export const useFormControls = (limit: number) => {
  const [formStep, setFormStep] = useState(0);

  const handleIncrement = () =>
    setFormStep((prevState) => (prevState < limit ? prevState + 1 : prevState));

  const handleDecrement = () =>
    setFormStep((prevState) => (prevState > 0 ? prevState - 1 : prevState));

  return { formStep, handleDecrement, handleIncrement };
};
