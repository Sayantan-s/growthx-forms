import { View } from '@/components/atoms';
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
    <View>
      {children({ onboarding, step, handleDecrement, handleIncrement })}
    </View>
  );
};

Root.displayName = 'Form.Onboarding';

export const Onboarding = Object.assign(Root, {});
