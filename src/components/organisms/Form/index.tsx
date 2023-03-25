import { ApiResponse, OnboardingType, QnaType } from '@/api/api.types';
import { createContext, useContext, useState } from 'react';
import styled from 'styled-components';
import { Entries } from './Entries';
import { Progressbar } from './Progressbar';
import { useFormControls } from './useFormControls';

export interface FormProps {
  children: JSX.Element[];
  payload: ApiResponse<OnboardingType, QnaType>['data'];
}

export interface FormStepProps {
  step: number;
  handleDecrement: () => void;
  handleIncrement: () => void;
}

export type FormContextProps = FormStepProps &
  FormProps['payload'] & { formState: InitialState };

type InitialState = { [key: string]: string };

const FormContext = createContext({} as FormContextProps);

const Root = ({ children, payload: { onboarding, questions } }: FormProps) => {
  const { formStep, handleDecrement, handleIncrement } = useFormControls(
    questions.length + 1
  );
  const [initialState, setInitialState] = useState(() => {
    const content = questions.reduce((acc, question) => {
      acc[question.userinput.inputConfig.name] = '';
      return acc;
    }, {} as InitialState);
    return content;
  });

  return (
    <FormContext.Provider
      value={{
        onboarding,
        questions,
        step: formStep,
        handleDecrement,
        handleIncrement,
        formState: initialState,
      }}
    >
      <Container>
        <form>{children}</form>
      </Container>
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error(`Context couldn't be found!`);
  return context;
};

export const Form = Object.assign(Root, { Progressbar, Entries });

const Container = styled.div`
  height: inherit;
  background-color: ${({ theme }) => theme.colors.black[900]};
  position: relative;
`;
