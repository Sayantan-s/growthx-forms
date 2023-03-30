import { postFormPayload } from '@/api';
import { ApiResponse, OnboardingType, QnaType } from '@/api/api.types';
import { PersistenceManager, isClientSide } from '@/utils';
import {
  FormEvent,
  MutableRefObject,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { Entries } from './Entries';
import { Header } from './Header';
import { Overlay } from './Overlay';
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
    handleSelect: (
      name: string,
      value: string,
      movement?: {
        toNext: boolean;
      }
    ) => void;
    persist: boolean;
    error: FormState;
    formSubmitState: FormSubmission;
    handleSubmit: (eve?: FormEvent<HTMLElement>) => Promise<void>;
  };

export type InitialState = { [key: string]: string };

export type FormSubmission = 'idle' | 'loading' | 'success' | 'failed';

const FormContext = createContext({} as FormContextProps);

const createInitialState = (
  questions: QnaType[],
  persistenceManagerRef: MutableRefObject<PersistenceManager<InitialState>>,
  persist: boolean
) => {
  const content = questions.reduce((acc, question) => {
    const key = question.userinput.inputConfig.name;
    if (persist && isClientSide()) {
      const persistedData = persistenceManagerRef.current.get();
      acc[key] = persistedData ? persistedData[key] : '';
    } else acc[key] = '';
    return acc;
  }, {} as InitialState);
  return content;
};

const Root = ({
  children,
  payload: { onboarding, questions },
  persist = false,
}: FormProps) => {
  const peristenceManagerRef = useRef(
    new PersistenceManager<InitialState>('state')
  );

  const [initialState, setInitialState] = useState(() =>
    createInitialState(questions, peristenceManagerRef, persist)
  );

  const [formSubmitState, setFormSubmitState] =
    useState<FormSubmission>('idle');

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
    (name: string, value: string, movement?: { toNext: boolean }) => {
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
      movement?.toNext && handleIncrement(value);
    },
    [setError, persist, initialState, handleIncrement]
  );

  const handleSubmit = useCallback(
    async (eve?: FormEvent<HTMLElement>) => {
      eve?.preventDefault();
      setFormSubmitState('loading');
      try {
        await postFormPayload(initialState);
        handleIncrement();
        setFormSubmitState('success');
        setInitialState(
          createInitialState(questions, peristenceManagerRef, persist)
        );
        peristenceManagerRef.current.clear();
      } catch (error) {
        setFormSubmitState('failed');
      } finally {
        setFormSubmitState('idle');
      }
    },
    [initialState, persist, questions, handleIncrement]
  );

  useEffect(() => {
    async function onWindowKeyPress(eve: KeyboardEvent) {
      if (
        formStep === questions.length - 1 &&
        eve.keyCode === 13 &&
        eve.metaKey
      ) {
        handleSubmit();
      } else if (formStep < questions.length - 1 && eve.keyCode === 13) {
        handleIncrement();
      }
    }
    window.addEventListener('keydown', onWindowKeyPress);
    return () => {
      window.removeEventListener('keydown', onWindowKeyPress);
    };
  }, [formStep, handleIncrement, handleSubmit, questions.length]);

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
        formSubmitState,
        handleSubmit,
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

export const Form = Object.assign(Root, {
  Progressbar,
  Entries,
  Header,
  Overlay,
});

const Container = styled.div`
  height: inherit;
  background-color: ${({ theme }) => theme.colors.black[900]};
  position: relative;
`;
