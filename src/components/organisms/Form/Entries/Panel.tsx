import { PropsWithChildren, forwardRef } from 'react';

export const Root = forwardRef<HTMLDivElement, PropsWithChildren>(
  function Panel({ children }, ref) {
    return <div ref={ref}>{children}</div>;
  }
);

export const Panel = Object.assign(Root, {});

Panel.displayName = 'Form.Panel';
