import { FormProps, FormStepProps, useFormContext } from '..';

export interface Props<TOnboard, TQuestions> {
  children: (
    props: Pick<FormProps<TOnboard, TQuestions>['payload'], 'onboarding'> &
      FormStepProps
  ) => JSX.Element;
}

const Root = <TOnboard, TQuestions>({
  children,
}: Props<TOnboard, TQuestions>) => {
  const { onboarding, step, handleDecrement, handleIncrement } = useFormContext<
    TOnboard,
    TQuestions
  >();
  return (
    <div>
      {children({ onboarding, step, handleDecrement, handleIncrement })}
    </div>
  );
};

Root.displayName = 'Form.Onboarding';

export const Onboarding = Object.assign(Root, {});
