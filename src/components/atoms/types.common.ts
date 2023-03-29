import { DefaultTheme } from 'styled-components';

interface PropertyPossiblities<TProperty extends string = string> {
  property: TProperty;
  direction: `${TProperty}${'x' | 'y' | 't' | 'b' | 'l' | 'r'}`;
}

type PropertyGenerator<TProperty extends string> =
  PropertyPossiblities<TProperty>[keyof PropertyPossiblities];

type Padding = PropertyGenerator<'p'>;
type Margin = PropertyGenerator<'m'>;

type StyleProps = {
  [Key in Padding | Margin]?: `${keyof DefaultTheme['spacing']}`;
};

export interface ExtraStyleProps extends StyleProps {
  fontSize?: `${keyof DefaultTheme['fontSize']}`;
}
