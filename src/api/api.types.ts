export interface ApiResponse<T, D> {
  data: {
    onboarding: T;
    questions: D[];
  };
}

export interface QnaType {}
export interface OnboardingType {
  heading: string;
  description: string;
  buttonText: string;
}
