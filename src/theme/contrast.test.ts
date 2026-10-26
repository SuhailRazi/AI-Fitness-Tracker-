import { describe, expect, it } from 'vitest';

import { contrastRatio, relativeLuminance } from './contrast';

describe('relativeLuminance', () => {
  it('returns 0 for black and 1 for white', () => {
    expect(relativeLuminance('#000000')).toBe(0);
    expect(relativeLuminance('#FFFFFF')).toBe(1);
  });

  it('rejects colors that are not #RRGGBB', () => {
    expect(() => relativeLuminance('#FFF')).toThrow(/#RRGGBB/);
    expect(() => relativeLuminance('rgba(0,0,0,1)')).toThrow(/#RRGGBB/);
  });
});

describe('contrastRatio', () => {
  it('is 21:1 for black on white regardless of order', () => {
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 5);
    expect(contrastRatio('#FFFFFF', '#000000')).toBeCloseTo(21, 5);
  });

  it('is 1:1 for identical colors', () => {
    expect(contrastRatio('#336699', '#336699')).toBe(1);
  });

  it('matches the published WCAG value for #767676 on white', () => {
    expect(contrastRatio('#767676', '#FFFFFF')).toBeCloseTo(4.54, 2);
  });
});
