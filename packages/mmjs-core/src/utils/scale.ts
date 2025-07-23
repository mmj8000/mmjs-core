let _scaleOptions = {
  w: 1920,
  h: 1080,
  clientWidth: document?.documentElement?.clientWidth ?? 1920,
  clientHeight: document?.documentElement?.clientHeight ?? 879,
};

function getRatio() {
  return {
    x: _scaleOptions.clientWidth / _scaleOptions.w,
    y: _scaleOptions.clientHeight / _scaleOptions.h,
  };
}

export function setScaleOption(options: Partial<typeof _scaleOptions>) {
  Object.assign(_scaleOptions, options);
}

export function getScaleOption() {
  return { ..._scaleOptions };
}

export function scale(value: number, dir?: "x" | "y"): number;
export function scale(value: string, dir?: "x" | "y"): string;
export function scale(value: number | string, dir: "x" | "y" = "y") {
  const sizeScale = getRatio()[dir];

  if (typeof value === "number") {
    return sizeScale * value;
  }

  const floatValue = parseFloat(value);
  if (Number.isNaN(floatValue)) {
    return value;
  }

  const suffix = value.replace(floatValue.toString(), "");
  return sizeScale * floatValue + suffix;
}
