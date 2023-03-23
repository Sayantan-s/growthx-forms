import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    red: {
      '50': '#fff0f0',
      '100': '#ffdddd',
      '200': '#ffc1c1',
      '300': '#ff9596',
      '400': '#ff5859',
      '500': '#ff2526',
      '600': '#fd0506',
      '700': '#d60001',
      '800': '#ae0405',
      '900': '#910b0c',
    },
    black: {
      '50': '#f7f7f7',
      '100': '#e3e3e3',
      '200': '#c8c8c8',
      '300': '#a4a4a4',
      '400': '#818181',
      '500': '#666666',
      '600': '#515151',
      '700': '#434343',
      '800': '#383838',
      '900': '#000000',
    },
    blue: {
      '50': '#eef7ff',
      '100': '#d9edff',
      '200': '#bce1ff',
      '300': '#8ecfff',
      '400': '#59b3ff',
      '500': '#258bff',
      '600': '#1b72f5',
      '700': '#145ce1',
      '800': '#174ab6',
      '900': '#19418f',
    },
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  fontSize: {
    1: '1.4rem',
    2: '1.8rem',
    3: '2rem',
    4: '2.5rem',
    5: '3rem',
    6: '3.5rem',
    7: '4rem',
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
};

export type Theme = typeof theme;
