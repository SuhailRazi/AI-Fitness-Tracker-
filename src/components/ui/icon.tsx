import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';

export type IconName = ComponentProps<typeof Ionicons>['name'];

interface IconProps {
  name: IconName;
  size?: number;
  color: string;
}

/** Decorative icon. Interactive parents are responsible for accessibility labels. */
export function Icon({ name, size = 22, color }: IconProps) {
  return (
    <Ionicons
      name={name}
      size={size}
      color={color}
      aria-hidden
      accessibilityElementsHidden
      importantForAccessibility="no"
    />
  );
}
