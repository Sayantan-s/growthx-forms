import { useState } from 'react';
import { DefaultTheme, css, keyframes } from 'styled-components';

export const usePulse = (time?: number): [boolean, () => void] => {
  const [isPulsating, setIsPulsating] = useState(false);

  const handlePulsate = () => {
    setIsPulsating(true);
    setTimeout(() => {
      setIsPulsating(false);
    }, time || 2000);
  };

  return [isPulsating, handlePulsate];
};

export const pulse = (theme: DefaultTheme) => keyframes`
  0% {
    background-color: ${theme.colors.black[50]}15;
  }
  100% {
    background-color: ${theme.colors.black[50]}60;
  }
`;

export const pulseCSS = ({
  $ispulsing,
  theme,
}: {
  theme: DefaultTheme;
  $ispulsing: boolean;
}) =>
  $ispulsing &&
  css`
    animation: ${pulse(theme)} 0.15s ease-in-out;
    animation-iteration-count: 3;
  `;
