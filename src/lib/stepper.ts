export interface StepperBounds {
  min?: number;
  max?: number;
  step: number;
}

function decimalPlaces(value: number): number {
  if (!Number.isFinite(value)) return 0;
  const text = value.toString();
  const exponent = /e-(\d+)$/.exec(text);
  if (exponent) return Number(exponent[1]);
  const dot = text.indexOf('.');
  return dot === -1 ? 0 : text.length - dot - 1;
}

/** Rounds to the step's precision so 0.1 + 0.2 style float drift never reaches the UI. */
export function roundToStepPrecision(value: number, step: number): number {
  const places = Math.min(decimalPlaces(step), 6);
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
}

export function clamp(value: number, min = -Infinity, max = Infinity): number {
  if (min > max) throw new RangeError(`min (${min}) must not exceed max (${max})`);
  return Math.min(Math.max(value, min), max);
}

/** Applies `direction` steps to `value`, respecting bounds and step precision. */
export function applyStep(value: number, direction: 1 | -1, bounds: StepperBounds): number {
  if (!(bounds.step > 0)) throw new RangeError('step must be a positive number');
  const next = roundToStepPrecision(value + direction * bounds.step, bounds.step);
  return clamp(next, bounds.min, bounds.max);
}
