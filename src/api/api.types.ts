export interface ApiResponse<T, D> {
  data: {
    onboarding: T;
    questions: D[];
  };
}

export interface QnaType {
  question: string;
  captions: string;
}
export interface OnboardingType {
  heading: string;
  description: string;
  buttonText: string;
}
