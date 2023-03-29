import { Text, View } from '@/components/atoms';
import { FC } from 'react';
import { useFormContext } from '..';

interface Props {
  children: React.ReactNode;
}

export const Submission: FC<Props> = ({ children }) => {
  const { step, questions } = useFormContext();
  return questions.length === step ? (
    <View>
      <Text fontSize="4">{children}</Text>
    </View>
  ) : null;
};

Submission.displayName = 'Form.Entries.Submission';
