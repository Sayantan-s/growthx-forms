import { InputConfig, InputConfigurationRadio } from '@/api/api.types';
import { Text, TextField, View } from '@/components/atoms';
import { motion } from 'framer-motion';
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useFormContext } from '../..';
import { Button } from '../Button';
import { Option, alphabets } from '../Option';

export const RadioList: FC<InputConfig<InputConfigurationRadio>> = ({
  options,
  others,
  name,
}) => {
  const { handleSelect, formState } = useFormContext();
  const [showInput, setShowInput] = useState(false);
  const [selected, setSelected] = useState(formState[name]);
  const [value, setValue] = useState(formState[name]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (eve) =>
    setValue(eve.target.value);

  const handleSubmitOthers: React.MouseEventHandler<HTMLButtonElement> = (
    eve
  ) => {
    eve.stopPropagation();
    if (!value) {
      setShowInput(false);
    } else {
      handleSelect(name, value);
    }
  };

  const handleShowInput = () => setShowInput(true);

  const handleClick = (option: string) => {
    setSelected((prevState) => (prevState === option ? '' : option));
    if (selected) {
      handleSelect(name, '');
    }
  };

  const onClickFinish = (option: string) => {
    handleSelect(name, option, { toNext: true });
  };

  return (
    <View>
      <View type="stack">
        <RadioListContent>
          <Option.Content>
            {options.map(({ option, id }, index) => (
              <Option
                option={option}
                index={index}
                key={id}
                onClick={() => handleClick(option)}
                onClickFinish={onClickFinish}
                selected={selected === option}
              />
            ))}
            <InputOption onClick={handleShowInput}>
              <View type="stack" gap="2">
                <KeyPad>{alphabets[options.length]}</KeyPad>
                <Text>Others</Text>
              </View>
            </InputOption>
          </Option.Content>
        </RadioListContent>
      </View>
    </View>
  );
};

const InputOption = styled(motion.li)`
  padding: ${({ theme }) => `0 ${theme.spacing['1']} 0 ${theme.spacing['3']}`};
  list-style: none;
  width: 100%;
  align-self: flex-start;
  border: 1px solid ${({ theme }) => theme.colors.black[400]};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => `${theme.colors.black[50]}15`};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  &:hover {
    background-color: ${({ theme }) => `${theme.colors.black[50]}40`};
  }
`;

const SubmitOthersButton = styled(Button)`
  background-color: transparent;
  height: 80%;
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.black[100]};
  border-radius: 0.5rem;
`;

const KeyPad = styled(View)`
  width: 2.5rem;
  aspect-ratio: 1/1;
  background-color: ${({ theme }) => theme.colors.black[900]};
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.fontWeights.heading};
  border: 1px solid ${({ theme }) => theme.colors.black[50]};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.3rem;
`;

const RadioListContent = styled(View)`
  width: 100%;
  margin: ${({ theme }) => `${theme.spacing['3']} 0`};
`;

const InputComponent = styled(View)`
  width: 100%;
  height: 100%;
  align-items: center;
  display: flex;
`;

const StyledTextField = styled(TextField)`
  font-size: ${({ theme }) => theme.fontSize['2']};
  font-weight: ${({ theme }) => theme.fontWeights.thin};
  color: ${({ theme }) => theme.colors.black[50]};
  &::placeholder {
    color: ${({ theme }) => theme.colors.black[100]};
  }
`;

// {
//   others ? (
//     <InputOption onClick={handleShowInput}>
//       {showInput ? (
//         <InputComponent>
//           <StyledTextField
//             type="text"
//             name="other"
//             placeholder="Type your answer"
//             value={value}
//             onChange={handleChange}
//           />
//           <SubmitOthersButton onClick={handleSubmitOthers}>
//             <Tick color={theme.colors.black[700]} />
//           </SubmitOthersButton>
//         </InputComponent>
//       ) : (
//         <>
//           <View type="stack" gap="2">
//             <KeyPad>{alphabets[options.length]}</KeyPad>
//             <Text>Others</Text>
//           </View>
//           {selected ? <Tick color={theme.colors.black[50]} /> : null}
//         </>
//       )}
//     </InputOption>
//   ) : null;
// }
