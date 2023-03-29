import 'styled-components';

declare module 'styled-components' {
  type Strength =
    | '50'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';

  export interface DefaultTheme {
    colors: Record<'red' | 'black' | 'blue', Record<Strength, string>>;
    fontSize: Record<`${number}`, `${number}rem`>;
    spacing: Record<`${number}`, `${number}rem`>;
    fontWeights: {
      thin: 300;
      body: 400;
      heading: 500;
      bold: 700;
    };
    lineHeights: {
      body: 1.5;
      heading: 1.125;
    };
  }
}

declare module 'lodash';
