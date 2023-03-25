import { forwardRef } from 'react';
import { useFormContext } from '..';

interface Props {
  children: JSX.Element[];
  step: number;
}

export const Panel = forwardRef<HTMLDivElement, Props>(function Panel(
  { children, step },
  ref
) {
  const { step: formStep } = useFormContext();

  return formStep === step + 1 ? <div ref={ref}>{children}</div> : null;
});

Panel.displayName = 'Form.Entries.Panel';
