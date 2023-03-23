import { Button as B } from '@/components/atoms';
import { HTMLMotionProps } from 'framer-motion';
import { MouseEventHandler, PropsWithChildren, forwardRef } from 'react';

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<HTMLMotionProps<'button'>>
>(({ onClick, ...rest }, ref) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (eve) => {
    eve.preventDefault();
    onClick?.(eve);
  };

  return <B {...rest} onClick={handleClick} ref={ref} />;
});

Button.displayName = 'Form.Entries.Button';
