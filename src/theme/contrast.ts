/** WCAG 2.x relative-luminance and contrast-ratio helpers for `#RRGGBB` colors. */

function parseHex(hex: string): [number, number, number] {
  const digits = /^#([0-9a-f]{6})$/i.exec(hex)?.[1];
  if (!digits) {
    throw new Error(`Expected a #RRGGBB color, received "${hex}"`);
  }
  const value = parseInt(digits, 16);
  return [(value >> 16) & 0xff, (value >> 8) & 0xff, value & 0xff];
}

function channelToLinear(channel: number): number {
  const c = channel / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

export function relativeLuminance(hex: string): number {
  const [r, g, b] = parseHex(hex);
  return 0.2126 * channelToLinear(r) + 0.7152 * channelToLinear(g) + 0.0722 * channelToLinear(b);
}

export function contrastRatio(foreground: string, background: string): number {
  const a = relativeLuminance(foreground);
  const b = relativeLuminance(background);
  const [lighter, darker] = a > b ? [a, b] : [b, a];
  return (lighter + 0.05) / (darker + 0.05);
}

/** WCAG AA thresholds: 4.5:1 for body text, 3:1 for large text and UI components. */
export const WCAG_AA_TEXT = 4.5;
export const WCAG_AA_LARGE = 3;
