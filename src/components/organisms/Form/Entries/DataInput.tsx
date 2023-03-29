import { FC, Fragment, PropsWithChildren } from 'react';

export const DataInput: FC<PropsWithChildren> = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};

DataInput.displayName = 'Form.Entries.DataInput';
