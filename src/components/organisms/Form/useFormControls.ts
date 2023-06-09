import {
  InputConfig,
  InputConfigurationDataList,
  QnaType,
  UserInput,
} from '@/api/api.types';
import { useCallback, useState } from 'react';
import { InitialState } from '.';

interface Props {
  hasOnboarding: boolean;
  questions: QnaType[];
  formState: InitialState;
}

export type FormState = { [key: string]: string | null };

const initialState = (hasOnboarding: boolean) => (hasOnboarding ? -1 : 0);

function isValidEmail(email: string) {
  const pattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return pattern.test(email);
}

function isTaskSpecificEmail(email: string) {
  const taskPattern = /^[a-zA-Z]+[\w-]*\+[a-zA-Z0-9._-]+@([\w-]+\.)+[\w-]{2,}$/;
  return taskPattern.test(email);
}

function isValidPhoneNumber(num: string) {
  const pattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  return pattern.test(num);
}

function validator(
  input: UserInput,
  val: string | null,
  formState: InitialState
): string | undefined {
  if (!input) return;
  const {
    checks,
    inputConfig: { name },
  } = input;
  const value = typeof val === 'string' ? val : formState[name];
  if (checks.required.value && value.trim() === '')
    return checks.required.message;

  if (
    checks?.email?.value &&
    (!isValidEmail(value) ||
      (isValidEmail(value) && isTaskSpecificEmail(value)))
  )
    return checks.email.message;

  if (
    checks?.choose?.value &&
    'options' in input.inputConfig &&
    'variable' in input.inputConfig.options &&
    checks.choose.value !==
      JSON.parse(value)[formState[input.inputConfig.options.variable]]?.length
  ) {
    return checks.choose.message;
  }

  if (checks?.number?.value && isValidPhoneNumber(value))
    return checks.number.message;

  if (
    checks?.shouldBeAnOption?.value &&
    (
      input.inputConfig as InputConfig<InputConfigurationDataList>
    ).options.findIndex(({ option }) => value === option) === -1
  )
    return checks.shouldBeAnOption.message;
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
        typeof value === 'string' ? value : null,
        formState
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
