import { ApiResponse } from '@/api/api.types';
import { once } from 'lodash';
import { createContext, useContext, useState } from 'react';
import styled from 'styled-components';
import { Entries } from './Entries';
import { Progressbar } from './Progressbar';
import { useFormControls } from './useFormControls';

export interface FormProps<TOnboard, TQuestions> {
  children: JSX.Element[];
  payload: ApiResponse<TOnboard, TQuestions>['data'];
}

export interface FormStepProps {
  step: number;
  handleDecrement: () => void;
  handleIncrement: () => void;
}

export type FormContextProps<TOnboard, TQuestions> = FormStepProps &
  FormProps<TOnboard, TQuestions>['payload'];

const createStateContext = once(<TOnboard, TQuestions>() =>
  createContext({} as FormContextProps<TOnboard, TQuestions>)
);

const Root = <TOnboard, TQuestions>({
  children,
  payload,
}: FormProps<TOnboard, TQuestions>) => {
  const FormContext = createStateContext<TOnboard, TQuestions>();
  const [reactiveState, setReactiveState] = useState(payload.questions);

  const { formStep, handleDecrement, handleIncrement } = useFormControls(
    children.length
  );

  return (
    <FormContext.Provider
      value={{
        onboarding: payload.onboarding,
        questions: reactiveState,
        step: formStep,
        handleDecrement,
        handleIncrement,
      }}
    >
      <Container>
        <form>Form {children}</form>
      </Container>
    </FormContext.Provider>
  );
};

export const useFormContext = <TOnboard, TQuestions>() => {
  const context = useContext(createStateContext<TOnboard, TQuestions>());
  if (!context) throw new Error(`Context couldn't be found!`);
  return context;
};

export const Form = Object.assign(Root, { Progressbar, Entries });

const Container = styled.div`
  height: inherit;
  background-color: ${({ theme }) => theme.colors.black[900]};
  position: relative;
`;
