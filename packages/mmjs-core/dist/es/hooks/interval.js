function m(i, l, o) {
  let t;
  const {
    immediate: r = !0
  } = o ?? {};
  let e = i;
  function c() {
    e = null, t && (clearTimeout(t), t = void 0);
  }
  function a() {
    e = i, n();
  }
  function n() {
    t = setTimeout(() => {
      var u;
      (u = e == null ? void 0 : e()) == null || u.finally(n);
    }, l);
  }
  return r && n(), {
    pause: c,
    resume: a
  };
}
export {
  m as useAsyncIntervalFn
};
