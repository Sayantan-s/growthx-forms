import {
  InputConfig,
  InputConfigurationCheckbox,
  InputConfigurationDataList,
  InputConfigurationPhone,
  InputConfigurationRadio,
  InputConfigurationTextField,
  UserInput,
} from '@/api/api.types';
import { HTMLAttributes } from 'react';
import { useFormContext } from '..';
import { Checkboxlist } from './Checkboxlist';
import { Datalist } from './Datalist';
import { Phone } from './Phone';
import { RadioList } from './RadioList';
import { TextInput } from './TextInput';

type Props = UserInput & HTMLAttributes<HTMLElement>;

export const InputField = ({ checks, type, inputConfig, ...rest }: Props) => {
  const { formState } = useFormContext();
  switch (type) {
    case 'input':
      return (
        <TextInput
          checks={checks}
          {...(inputConfig as InputConfig<InputConfigurationTextField>)}
          {...rest}
          value={formState[inputConfig.name]} // Passing the changed value
        />
      );
    case 'datalist':
      return (
        <Datalist
          {...(inputConfig as InputConfig<InputConfigurationDataList>)}
        />
      );
    case 'radio':
      return (
        <RadioList {...(inputConfig as InputConfig<InputConfigurationRadio>)} />
      );
    case 'checkbox':
      return (
        <Checkboxlist
          {...(inputConfig as InputConfig<InputConfigurationCheckbox>)}
          checks={checks}
        />
      );
    case 'phone':
      return (
        <Phone
          {...(inputConfig as InputConfig<InputConfigurationPhone>)}
          checks={checks}
        />
      );
    default:
      return null;
  }
};

InputField.displayName = 'Form.Entries.Input';
