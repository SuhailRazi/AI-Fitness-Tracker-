import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

import {
  fontFamily,
  typography,
  useTheme,
  type ThemeColors,
  type TypographyVariant,
} from '@/theme';

type TextColor = Extract<
  keyof ThemeColors,
  | 'text'
  | 'textMuted'
  | 'textSubtle'
  | 'textInverse'
  | 'primary'
  | 'onPrimary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'sample'
>;

export interface TextProps extends RNTextProps {
  variant?: TypographyVariant;
  color?: TextColor;
  align?: 'left' | 'center' | 'right';
}

export function Text({ variant = 'body', color = 'text', align, style, ...rest }: TextProps) {
  const { colors } = useTheme();
  return (
    <RNText
      maxFontSizeMultiplier={1.6}
      style={[
        typography[variant],
        { color: colors[color], fontFamily: fontFamily.sans, textAlign: align },
        style,
      ]}
      {...rest}
    />
  );
}
