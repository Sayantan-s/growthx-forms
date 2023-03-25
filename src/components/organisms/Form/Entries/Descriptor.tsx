import { Text } from '@/components/atoms';
import { Props as TextProps } from '@/components/atoms/Text/types';
import DOMPurify from 'isomorphic-dompurify';
import { forwardRef } from 'react';
import styled from 'styled-components';

type FilteredTextProps = Omit<
  TextProps,
  'dangerouslySetInnerHTML' | 'children'
>;

interface Props extends FilteredTextProps {
  children: string | null;
}

export const Descriptor = forwardRef<HTMLParagraphElement, Props>(
  ({ children, ...rest }, ref) => {
    return children ? (
      <EntryDescriptor
        {...rest}
        as="p"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(children) }}
        ref={ref}
      />
    ) : null;
  }
);

Descriptor.displayName = 'Form.Entries.Descriptor';

const EntryDescriptor = styled(Text)`
  color: ${({ theme }) => theme.colors.black[300]};
  margin: ${({ theme }) => `${theme.spacing['4']} 0`};
`;
