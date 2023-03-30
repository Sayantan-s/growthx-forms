import { View } from '@/components/atoms';
import { ScrollDirection, useWheelScroll } from '@/hooks';
import { createContext, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useFormContext } from '..';

export interface Props {
  children: JSX.Element[] | JSX.Element;
}

interface PanelScrollContextProps {
  scrollDirection: ScrollDirection;
}

const PanelScrollContext = createContext<PanelScrollContextProps | null>(null);

export const Panels = ({ children }: Props) => {
  const { handleIncrement, handleDecrement, step, questions } =
    useFormContext();

  const [
    ,
    scrolling,
    onWheel,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  ] = useWheelScroll();

  useEffect(() => {
    if (step < questions.length - 1) {
      if (scrolling === 'downward') handleIncrement();
      else if (scrolling === 'upward') handleDecrement();
    }
  }, [scrolling]);

  return (
    <PanelScrollContext.Provider value={{ scrollDirection: scrolling }}>
      <StyledPanel
        type="stack"
        onWheel={onWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </StyledPanel>
    </PanelScrollContext.Provider>
  );
};

export const usePanelScrollContext = () => {
  const context = useContext(PanelScrollContext);
  if (!context) throw new Error(`Context couldn't be found!`);
  return context;
};

Panels.displayName = 'Form.Entries.Panels';

export const StyledPanel = styled(View)`
  height: 100vh;
  width: 100%;
`;
