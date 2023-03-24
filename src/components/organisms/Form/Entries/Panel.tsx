import { forwardRef } from 'react';
import { useFormContext } from '..';

interface Props {
  children: JSX.Element[];
  step: number;
}

// Step should'nt be Zero!

export const Panel = forwardRef<HTMLDivElement, Props>(function Panel(
  { children, step },
  ref
) {
  const { step: formStep } = useFormContext();

  return formStep === step ? <div ref={ref}>{children}</div> : null;
});

Panel.displayName = 'Form.Entries.Panel';
