import { UserInputChecks } from '@/api/api.types';
import { Text } from '@/components/atoms';
import { Props as TextProps } from '@/components/atoms/Text/types';
import { forwardRef, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { useFormContext } from '..';

interface Props extends TextProps {
  children: string;
}

export const Heading = forwardRef<
  HTMLParagraphElement | HTMLHeadingElement | HTMLSpanElement,
  Props
>(({ as = 'p', children, ...props }, ref) => {
  const { step, questions, formState } = useFormContext();
  const result = useMemo(() => {
    // replacing values in the questions having the ${{num}} word with previous state value!
    const vars = questions[step]?.variables;
    return Array.isArray(vars) && vars.length
      ? children.replace(/\$[0-9]+/g, (match) => {
          const index = +match.slice(1);
          return formState[vars[index - 1]] || children;
        })
      : children;
  }, [step, questions, children, formState]);

  const checks = step > -1 ? questions[step]?.userinput.checks : null;

  return (
    <StyledQuestion as={as} checks={checks} {...props} ref={ref}>
      {result}
    </StyledQuestion>
  );
});

Heading.displayName = 'Form.Entries.Heading';

const StyledQuestion = styled(Text)<{ checks?: UserInputChecks | null }>`
  font-size: ${({ theme }) => theme.fontSize['3']};
  ${({ checks }) =>
    checks?.required &&
    css`
      &:after {
        content: '*';
        margin-left: ${({ theme }) => theme.spacing['1']};
      }
    `};
`;
