import { ActivityIndicator, Pressable, StyleSheet, View, type PressableProps } from 'react-native';

import { radii, spacing, touchTarget, useTheme, type ThemeColors } from '@/theme';

import { Icon, type IconName } from './icon';
import { Text } from './text';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'md' | 'lg';

export interface ButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  loading?: boolean;
  fullWidth?: boolean;
}

function variantColors(variant: ButtonVariant, colors: ThemeColors) {
  switch (variant) {
    case 'primary':
      return {
        bg: colors.primary,
        pressed: colors.primaryPressed,
        fg: colors.onPrimary,
        border: colors.primary,
      };
    case 'secondary':
      return {
        bg: colors.surfaceRaised,
        pressed: colors.surfacePressed,
        fg: colors.text,
        border: colors.borderStrong,
      };
    case 'ghost':
      return {
        bg: 'transparent',
        pressed: colors.surfacePressed,
        fg: colors.text,
        border: 'transparent',
      };
    case 'danger':
      return {
        bg: colors.danger,
        pressed: colors.danger,
        fg: colors.onStatus,
        border: colors.danger,
      };
  }
}

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  fullWidth = false,
  disabled,
  accessibilityLabel,
  ...rest
}: ButtonProps) {
  const { colors } = useTheme();
  const c = variantColors(variant, colors);
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      aria-disabled={!!isDisabled}
      aria-busy={loading}
      disabled={isDisabled}
      hitSlop={4}
      style={({ pressed }) => [
        styles.base,
        {
          minHeight: size === 'lg' ? touchTarget.large : touchTarget.min,
          backgroundColor: pressed ? c.pressed : c.bg,
          borderColor: c.border,
          opacity: isDisabled ? 0.5 : 1,
          alignSelf: fullWidth ? 'stretch' : 'auto',
        },
      ]}
      {...rest}>
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator color={c.fg} />
        ) : icon ? (
          <Icon name={icon} size={20} color={c.fg} />
        ) : null}
        <Text variant="bodyStrong" style={{ color: c.fg }}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.md,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
});
