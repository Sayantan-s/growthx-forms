import { ApiResponse, OnboardingType, QnaType } from '@/api/api.types';
import { PersistenceManager, isClientSide } from '@/utils';
import {
  FormEvent,
  FormEventHandler,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { Entries } from './Entries';
import { Header } from './Header';
import { Progressbar } from './Progressbar';
import { FormState, useFormControls } from './useFormControls';

export interface FormProps {
  children: JSX.Element[];
  payload: ApiResponse<OnboardingType, QnaType>['data'];
  persist?: boolean;
}

export interface FormStepProps {
  step: number;
  handleDecrement: () => void;
  handleIncrement: () => void;
  progress: number;
}

export type FormContextProps = FormStepProps &
  FormProps['payload'] & {
    formState: InitialState;
    handleChange: (eve: FormEvent<HTMLElement>) => void;
    handleSelect: (name: string, value: string) => void;
    persist: boolean;
    error: FormState;
  };

export type InitialState = { [key: string]: string };

const FormContext = createContext({} as FormContextProps);

const Root = ({
  children,
  payload: { onboarding, questions },
  persist = false,
}: FormProps) => {
  const peristenceManagerRef = useRef(
    new PersistenceManager<InitialState>('state')
  );

  const [initialState, setInitialState] = useState(() => {
    const content = questions.reduce((acc, question) => {
      const key = question.userinput.inputConfig.name;
      if (persist && isClientSide()) {
        const persistedData = peristenceManagerRef.current.get();
        acc[key] = persistedData ? persistedData[key] : '';
      } else acc[key] = '';
      return acc;
    }, {} as InitialState);
    return content;
  });

  const {
    formStep,
    handleDecrement,
    handleIncrement,
    progress,
    error,
    setError,
  } = useFormControls({
    hasOnboarding: !!onboarding,
    questions,
    formState: initialState,
  });

  const handleChange = useCallback(
    (eve: FormEvent<HTMLElement>) => {
      const target = eve.target as HTMLInputElement;
      setInitialState((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
      setError((prevState) => ({ ...prevState, [target.name]: null }));
      if (persist)
        peristenceManagerRef.current.set({
          ...initialState,
          [target.name]: target.value,
        });
    },
    [setError, persist, initialState]
  );

  const handleSelect = useCallback(
    (name: string, value: string) => {
      setInitialState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setError((prevState) => ({ ...prevState, [name]: null }));
      if (persist)
        peristenceManagerRef.current.set({
          ...initialState,
          [name]: value,
        });
      handleIncrement(value);
    },
    [setError, persist, initialState, handleIncrement]
  );

  const handleSubmit: FormEventHandler = useCallback((eve) => {
    eve.preventDefault();
  }, []);

  return (
    <FormContext.Provider
      value={{
        onboarding,
        questions,
        step: formStep,
        handleDecrement,
        handleIncrement,
        formState: initialState,
        handleChange,
        handleSelect,
        progress,
        persist,
        error,
      }}
    >
      <Container>
        <form onSubmit={handleSubmit}>{children}</form>
      </Container>
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error(`Context couldn't be found!`);
  return context;
};

export const Form = Object.assign(Root, { Progressbar, Entries, Header });

const Container = styled.div`
  height: inherit;
  background-color: ${({ theme }) => theme.colors.black[900]};
  position: relative;
`;
