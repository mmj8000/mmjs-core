var c, o;
let e = {
  w: 1920,
  h: 1080,
  clientWidth: ((c = document == null ? void 0 : document.documentElement) == null ? void 0 : c.clientWidth) ?? 1920,
  clientHeight: ((o = document == null ? void 0 : document.documentElement) == null ? void 0 : o.clientHeight) ?? 879
};
function s() {
  return {
    x: e.clientWidth / e.w,
    y: e.clientHeight / e.h
  };
}
function u(t) {
  Object.assign(e, t);
}
function f() {
  return { ...e };
}
function a(t, r = "y") {
  const i = s()[r];
  if (typeof t == "number")
    return i * t;
  const n = parseFloat(t);
  if (Number.isNaN(n))
    return t;
  const l = t.replace(n.toString(), "");
  return i * n + l;
}
export {
  f as getScaleOption,
  a as scale,
  u as setScaleOption
};
