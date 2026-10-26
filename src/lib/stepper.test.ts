import { describe, expect, it } from 'vitest';

import { applyStep, clamp, roundToStepPrecision } from './stepper';

describe('roundToStepPrecision', () => {
  it('removes floating point drift for fractional steps', () => {
    expect(0.1 + 0.2).not.toBe(0.3);
    expect(roundToStepPrecision(0.1 + 0.2, 0.1)).toBe(0.3);
    expect(roundToStepPrecision(2.5 * 3 + 0.0000001, 2.5)).toBe(7.5);
  });

  it('rounds to whole numbers for integer steps', () => {
    expect(roundToStepPrecision(7.9999999, 1)).toBe(8);
  });
});

describe('clamp', () => {
  it('limits values to the provided bounds', () => {
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(11, 0, 10)).toBe(10);
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('treats missing bounds as unbounded', () => {
    expect(clamp(1e9)).toBe(1e9);
  });

  it('rejects inverted bounds', () => {
    expect(() => clamp(1, 10, 0)).toThrow(RangeError);
  });
});

describe('applyStep', () => {
  it('increments and decrements by the step', () => {
    expect(applyStep(8, 1, { step: 1 })).toBe(9);
    expect(applyStep(8, -1, { step: 1 })).toBe(7);
  });

  it('handles 1.25 kg plate increments without drift', () => {
    let load = 0;
    for (let i = 0; i < 9; i++) load = applyStep(load, 1, { step: 1.25 });
    expect(load).toBe(11.25);
  });

  it('never goes below min or above max', () => {
    expect(applyStep(0, -1, { step: 1, min: 0 })).toBe(0);
    expect(applyStep(100, 1, { step: 5, max: 100 })).toBe(100);
    expect(applyStep(98, 1, { step: 5, max: 100 })).toBe(100);
  });

  it('rejects non-positive steps', () => {
    expect(() => applyStep(1, 1, { step: 0 })).toThrow(RangeError);
    expect(() => applyStep(1, 1, { step: -1 })).toThrow(RangeError);
    expect(() => applyStep(1, 1, { step: Number.NaN })).toThrow(RangeError);
  });
});
