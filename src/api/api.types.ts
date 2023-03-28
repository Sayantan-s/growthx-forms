export interface ApiResponse<T, D> {
  data: {
    onboarding: T;
    questions: D[];
  };
}

type InputTypes = 'input' | 'checkbox' | 'radio' | 'datalist' | 'phone';
export interface UserInputChecks {
  [key: string]: {
    value: boolean | number | string;
    message?: string;
  };
}

interface InputConfiguration {
  name: string;
}

export interface WithReference<TData> {
  variable: string;
  value: {
    [key: string]: TData;
  };
}

interface ListOptions {
  id: string;
  option: string;
}

export interface InputConfigurationTextField {
  placeholder: string;
  type: 'text' | 'email' | 'number';
}

export interface InputConfigurationDataList {
  placeholder: string;
  options: ListOptions[];
}

export interface InputConfigurationRadio {
  others: boolean;
  options: ListOptions[];
}

export interface InputConfigurationCheckbox {
  others: boolean;
  options: ListOptions[] | WithReference<ListOptions[]>;
}

export interface InputConfigurationPhone {
  placeholder: string;
  type: 'number';
  withCountryCode: boolean;
}

export type InputConfig<T = unknown> = InputConfiguration & T;

export interface UserInput {
  checks: UserInputChecks;
  type: InputTypes;
  block_next?: boolean;
  inputConfig: InputConfig<
    | InputConfigurationTextField
    | InputConfigurationDataList
    | InputConfigurationCheckbox
    | InputConfigurationRadio
    | InputConfigurationPhone
  >;
}

export interface QnaType {
  caption: string | null;
  id: string;
  question: string;
  userinput: UserInput;
  variables: string[] | null;
}
export interface OnboardingType {
  heading: string;
  description: string;
  buttonText: string;
}
