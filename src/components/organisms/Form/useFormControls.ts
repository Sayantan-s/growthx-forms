import {
  InputConfig,
  InputConfigurationDataList,
  QnaType,
  UserInput,
} from '@/api/api.types';
import { useCallback, useEffect, useState } from 'react';
import { InitialState } from '.';

interface Props {
  hasOnboarding: boolean;
  questions: QnaType[];
  formState: InitialState;
}

export type FormState = { [key: string]: string | null };

const initialState = (hasOnboarding: boolean) => (hasOnboarding ? -1 : 0);

function validator(
  input: UserInput,
  val: InitialState | string
): string | undefined {
  if (!input) return;
  const {
    checks,
    inputConfig: { name },
  } = input;
  const value = typeof val === 'string' ? val : val[name];
  if (checks.required.value && value.trim() === '') {
    return checks.required.message;
  }
  if (
    checks?.shouldBeAnOption?.value &&
    (
      input.inputConfig as InputConfig<InputConfigurationDataList>
    ).options.findIndex(({ option }) => value === option) === -1
  ) {
    return checks.shouldBeAnOption.message;
  }
}

export const useFormControls = ({
  hasOnboarding,
  questions,
  formState,
}: Props) => {
  const [formStep, setFormStep] = useState(() => initialState(hasOnboarding));
  const [progress, setProgress] = useState(formStep);
  const limit = questions.length;
  const [error, setError] = useState(() => {
    const content = questions.reduce((acc, question) => {
      const key = question.userinput.inputConfig.name;
      acc[key] = null;
      return acc;
    }, {} as FormState);
    return content;
  });

  const handleIncrement = useCallback(
    (value?: string) => {
      const errorMessage = validator(
        questions[formStep]?.userinput,
        typeof value === 'string' ? value : formState
      );
      const name = questions[formStep]?.userinput.inputConfig.name;
      if (errorMessage)
        setError((prevState) => ({
          ...prevState,
          [name]: errorMessage,
        }));
      else {
        setFormStep((prevState) =>
          prevState < limit ? prevState + 1 : prevState
        );
        setProgress((prevState) => prevState + 1);
        if (name) setError((prevState) => ({ ...prevState, [name]: null }));
      }
    },
    [questions, formStep, formState, limit]
  );

  const handleDecrement = () => {
    setFormStep((prevState) =>
      prevState > initialState(hasOnboarding) ? prevState - 1 : prevState
    );
    setProgress((prevState) => prevState - 1);
  };

  useEffect(() => {
    function onWindowKeyPress(eve: KeyboardEvent) {
      if (eve.keyCode === 13) {
        handleIncrement();
      }
    }
    window.addEventListener('keypress', onWindowKeyPress);
    return () => {
      window.removeEventListener('keypress', onWindowKeyPress);
    };
  }, [handleIncrement]);

  return {
    formStep,
    handleDecrement,
    handleIncrement,
    progress,
    error,
    setError,
    validator,
  };
};
