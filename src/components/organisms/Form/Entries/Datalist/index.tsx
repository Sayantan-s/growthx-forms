import { InputConfig, InputConfigurationDataList } from '@/api/api.types';
import { View } from '@/components/atoms';
import { pulseCSS, useClickOutside } from '@/hooks';
import { AnimatePresence, motion } from 'framer-motion';
import { ChangeEventHandler, FC, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useFormContext } from '../..';
import { DataListOption } from './DataListOption';
import { DataListInput } from './Input';

export const Datalist: FC<InputConfig<InputConfigurationDataList>> = ({
  options,
  ...rest
}) => {
  const [show, setShow] = useState(false);

  const { handleSelect, formState, handleChange } = useFormContext();
  const value = formState[rest.name];
  const [showSelected, setShowSelected] = useState<string>(
    formState[rest.name] || ''
  );
  const [hasSelected, setSelected] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => {
    setShow(false);
  });

  const handleShow = () => setShow(true);

  const handleHide = () => setShow(false);

  const onChange: ChangeEventHandler<HTMLInputElement> = (eve) => {
    setShowSelected(''); // Remove the tick if re-handlechanged!
    handleChange(eve);
  };

  const onSubmit = () => {
    if (hasSelected && showSelected) {
      handleSelect(rest.name, showSelected);
    }
    setSelected(false);
  };

  const handleClick = (option: string) => {
    setSelected(true);
    setShowSelected(option);
  };

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
    <View>
      <StyledDatalist type="stack" ref={ref}>
        <DataListInput
          {...rest}
          type="text"
          onFocus={handleShow}
          value={value}
          onChange={onChange}
          show={show}
        />
        <AnimatePresence onExitComplete={onSubmit}>
          {show ? (
            <StyledDatalistOptions
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
            >
              <View as="ul" type="stack" direction="vertical" gap="1">
                {filterOptions.map(({ id, option }, index) => (
                  <DataListOption
                    key={id}
                    option={manipulateInnerHTML(option)}
                    onClick={() => handleClick(option)}
                    onClickFinish={handleHide}
                    selected={showSelected === option}
                    index={index}
                  />
                ))}
              </View>
            </StyledDatalistOptions>
          ) : null}
        </AnimatePresence>
      </StyledDatalist>
    </View>
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

export const StyledDatalistOption = styled(motion.li)<{ $ispulsing: boolean }>`
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
  ${pulseCSS}
`;
