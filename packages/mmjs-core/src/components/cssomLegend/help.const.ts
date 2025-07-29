
export const matchCenterKey = ["left", "top", "right", "bottom"];

export const translateCenterXMaps = {
  left: "-50%",
  right: "50%",
  default: "0px",
} as const;

export const translateCenterYMaps = {
  bottom: "50%",
  top: "-50%",
  default: "0px",
} as const;

export const ecOrientValue = {
  horizontal: "horizontal",
  vertical: "vertical",
} as const;

export const innerIocnNames = {
  circle: "circle",
  rect: "rect",
  roundRect: "roundRect",
  triangle: "triangle",
  diamond: "diamond",
  pin: "pin",
  arrow: "arrow",
  none: "none",
} as const;

export const scrollDirMap = {
  [ecOrientValue.horizontal]: (target: HTMLElement, deltaY: number) => {
    return {
      left: (target.scrollLeft += deltaY * 0.3),
    };
  },
  [ecOrientValue.vertical]: (target: HTMLElement, deltaY: number) => {
    return {
      top: (target.scrollTop += deltaY * 0.3),
    };
  },
} as const;
