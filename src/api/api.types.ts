export interface ApiResponse<T, D> {
  data: {
    onboarding: T;
    questions: D[];
  };
}

type InputTypes = 'input' | 'checkbox' | 'radio' | 'datalist';
export interface UserInputChecks {
  [key: string]: boolean;
}

interface InputConfiguration {
  name: string;
}

interface ListOptions {
  id: string;
  option: string;
}

export interface InputConfigurationTextField {
  placeholder: string;
  type: 'text' | 'email';
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
  options:
    | ListOptions[]
    | {
        [key: string]: ListOptions;
      };
}

export interface InputConfigurationPhone {
  placeholder: string;
  type: 'number';
  withCountryCode: boolean;
}

export type InputConfig<T> = InputConfiguration & T;

export interface UserInput {
  checks: UserInputChecks;
  type: InputTypes;
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
