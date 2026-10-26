import { Pressable, StyleSheet, type PressableProps } from 'react-native';

import { radii, touchTarget, useTheme } from '@/theme';

import { Icon, type IconName } from './icon';

export interface IconButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  icon: IconName;
  /** Required: icon-only controls have no visible text for screen readers. */
  accessibilityLabel: string;
  size?: 'md' | 'lg';
  tone?: 'default' | 'primary';
}

export function IconButton({
  icon,
  size = 'md',
  tone = 'default',
  disabled,
  ...rest
}: IconButtonProps) {
  const { colors } = useTheme();
  const dimension = size === 'lg' ? touchTarget.large : touchTarget.min;
  const bg = tone === 'primary' ? colors.primary : colors.surfaceRaised;
  const fg = tone === 'primary' ? colors.onPrimary : colors.text;

  return (
    <Pressable
      accessibilityRole="button"
      aria-disabled={!!disabled}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        {
          width: dimension,
          height: dimension,
          backgroundColor: pressed && tone === 'default' ? colors.surfacePressed : bg,
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
        },
      ]}
      {...rest}>
      <Icon name={icon} size={size === 'lg' ? 26 : 22} color={fg} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
