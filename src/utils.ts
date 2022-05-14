export function createFilterValue(values: { blurAmount: number, brightness: number }) {
  const blurValue = values.blurAmount !== 0 ? `blur(${values.blurAmount}px)` : null;
  const brightnessValue = values.brightness !== 0 ? `brightness(${values.brightness}%)` : null;

  return [blurValue, brightnessValue].filter(Boolean).join(' ');
}

export function createFilterValueParts(values: { blurAmount: number, brightness: number }) {
  const blurValue = values.blurAmount !== 0 ? values.blurAmount : null;
  const brightnessValue = values.brightness !== 0 ? values.brightness : null;

  return {
    blurValue: {
      start: 'blur(',
      content: blurValue,
      end: 'px)',
    },
    brightnessValue: {
      start: 'brightness(',
      content: brightnessValue,
      end: '%)',
    }
  }
}

export function hexToParts(hex, alpha) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
    a: alpha
  }
}

export function hexToRGB(hex: string, alpha: number) {
  const { r, g, b, a } = hexToParts(hex, alpha);

  return `rgba(${r},${g},${b},${a})`;
}