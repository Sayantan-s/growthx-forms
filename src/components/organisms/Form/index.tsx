import { ApiResponse } from '@/api/api.types';
import { once } from 'lodash';
import { createContext, useContext, useState } from 'react';
import styled from 'styled-components';
import { Entries } from './Entries';
import { Progressbar } from './Progressbar';
import { useFormControls } from './useFormControls';

export interface FormProps<TOnboard, TQuestions, TState> {
  children: JSX.Element[];
  payload: ApiResponse<TOnboard, TQuestions>['data'];
  initialState: TState;
}

export interface FormStepProps {
  step: number;
  handleDecrement: () => void;
  handleIncrement: () => void;
}

export type FormContextProps<TOnboard, TQuestions, TState> = FormStepProps &
  FormProps<TOnboard, TQuestions, TState>['payload'];

const createStateContext = once(<TOnboard, TQuestions, TState>() =>
  createContext({} as FormContextProps<TOnboard, TQuestions, TState>)
);

const Root = <TOnboard, TQuestions, TState>({
  children,
  payload: { onboarding, questions },
}: FormProps<TOnboard, TQuestions, TState>) => {
  const FormContext = createStateContext<TOnboard, TQuestions, TState>();
  const { formStep, handleDecrement, handleIncrement } = useFormControls(
    questions.length + 1
  );
  const [state, setState] = useState({} as TState);

  return (
    <FormContext.Provider
      value={{
        onboarding,
        questions,
        step: formStep,
        handleDecrement,
        handleIncrement,
      }}
    >
      <Container>
        <form>{children}</form>
      </Container>
    </FormContext.Provider>
  );
};

export const useFormContext = <TOnboard, TQuestions, TState>() => {
  const context = useContext(
    createStateContext<TOnboard, TQuestions, TState>()
  );
  if (!context) throw new Error(`Context couldn't be found!`);
  return context;
};

export const Form = Object.assign(Root, { Progressbar, Entries });

const Container = styled.div`
  height: inherit;
  background-color: ${({ theme }) => theme.colors.black[900]};
  position: relative;
`;
