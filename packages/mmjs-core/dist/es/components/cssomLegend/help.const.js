const o = ["left", "top", "right", "bottom"], n = {
  left: "-50%",
  right: "50%",
  default: "0px"
}, a = {
  bottom: "50%",
  top: "-50%",
  default: "0px"
}, r = {
  horizontal: "horizontal",
  vertical: "vertical"
}, l = {
  circle: "circle",
  rect: "rect",
  roundRect: "roundRect",
  triangle: "triangle",
  diamond: "diamond",
  pin: "pin",
  arrow: "arrow",
  none: "none"
}, c = {
  [r.horizontal]: (t, e) => ({
    left: t.scrollLeft += e * 0.3
  }),
  [r.vertical]: (t, e) => ({
    top: t.scrollTop += e * 0.3
  })
};
export {
  r as ecOrientValue,
  l as innerIocnNames,
  o as matchCenterKey,
  c as scrollDirMap,
  n as translateCenterXMaps,
  a as translateCenterYMaps
};
