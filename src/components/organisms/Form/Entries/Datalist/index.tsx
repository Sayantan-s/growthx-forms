import { InputConfig, InputConfigurationDataList } from '@/api/api.types';
import { Text, View } from '@/components/atoms';
import DOMPurify from 'dompurify';
import { AnimatePresence, AnimationDefinition, motion } from 'framer-motion';
import { ChangeEventHandler, FC, useMemo, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { useFormContext } from '../..';
import Tick from '../Tick';
import { DataListInput } from './Input';

export const Datalist: FC<InputConfig<InputConfigurationDataList>> = ({
  options,
  ...rest
}) => {
  const [show, setShow] = useState(false);

  const { handleSelect: onSelect, formState } = useFormContext();
  const [value, setValue] = useState(formState[rest.name]);
  const [showSelected, setShowSelected] = useState<string>(
    formState[rest.name] || ''
  );
  const theme = useTheme();

  const handleShow = () => setShow(true);

  const handleHide = () => setShow(false);

  const handleSelect = (option: string) => {
    setValue(option);
    onSelect(rest.name, option);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (eve) => {
    setValue(eve.target.value);
    setShowSelected(''); // Remove the tick if re-handlechanged!
  };

  const onAnimationComplete = (
    option: string,
    ...args: [AnimationDefinition]
  ) => {
    // trigger selection when the blinking animation completes
    const denoter = args[0] as { backgroundColor: string[] | string };
    if (!Array.isArray(denoter.backgroundColor)) {
      handleSelect(option);
      handleHide();
    }
  };

  const handleClick = (option: string) => setShowSelected(option);

  const filterOptions = useMemo(() => {
    // keep options which have the current input value
    return options.filter(({ option }) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
  }, [options, value]);

  const manipulateInnerHTML = (
    str: string // highlight the presence of current value in input
  ) =>
    value
      ? str.replace(
          new RegExp(value, 'gi'),
          (match) => `<b class="marked">${match}</b>`
        )
      : str;

  return (
    <StyledDatalist
      type="stack"
      onBlur={() => {
        console.log('blur...');
      }}
    >
      <DataListInput
        {...rest}
        type="text"
        onFocus={handleShow}
        value={value}
        onChange={handleChange}
      />
      <AnimatePresence>
        {show ? (
          <StyledDatalistOptions
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
          >
            <View as="ul" type="stack" direction="vertical" gap="1">
              {filterOptions.map(({ id, option }) => (
                <StyledDatalistOption
                  whileTap={{
                    backgroundColor: [
                      `${theme.colors.black[50]}15`,
                      `${theme.colors.black[50]}60`,
                      `${theme.colors.black[50]}15`,
                    ],
                  }}
                  transition={{ repeat: 2, duration: 0.2 }}
                  key={id}
                  onAnimationComplete={(...args) =>
                    onAnimationComplete(option, ...args)
                  }
                  onClick={() => handleClick(option)}
                >
                  <Text
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(manipulateInnerHTML(option)),
                    }}
                  />{' '}
                  {showSelected === option && (
                    <Tick color={theme.colors.black[50]} />
                  )}
                </StyledDatalistOption>
              ))}
            </View>
          </StyledDatalistOptions>
        ) : null}
      </AnimatePresence>
    </StyledDatalist>
  );
};

const StyledDatalist = styled(View)`
  width: 100%;
  position: relative;
`;

const StyledDatalistOptions = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.black[900]};
  overflow-y: scroll;
  height: 40rem;
`;

export const StyledDatalistOption = styled(motion.li)`
  padding: ${({ theme }) => `0 ${theme.spacing['3']}`};
  border: 1px solid ${({ theme }) => theme.colors.black[400]};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => `${theme.colors.black[50]}15`};
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  .marked {
    font-weight: ${({ theme }) => theme.fontWeights.heading};
  }
  &:hover {
    background-color: ${({ theme }) => `${theme.colors.black[50]}40`};
  }
`;
