function f(e, n) {
  let l = 0, t = null;
  const r = function(...c) {
    const o = Date.now(), i = n - (o - l);
    i <= 0 ? (t && (clearTimeout(t), t = null), e.apply(this, c), l = o) : t || (t = setTimeout(() => {
      e.apply(this, c), l = Date.now(), t = null;
    }, i));
  };
  return r.cancel = function() {
    t && (clearTimeout(t), t = null);
  }, r;
}
function a(e, n, l) {
  const t = /* @__PURE__ */ new Map(), r = (...o) => JSON.stringify(o), c = function(...o) {
    const i = (n || r)(...o);
    if (t.has(i)) {
      const s = t.get(i);
      if (s.expireAt > Date.now())
        return s.data;
      t.delete(i);
    }
    const u = e.apply(this, o);
    return t.set(i, {
      data: u,
      expireAt: Date.now() + (l ?? 1 / 0)
      // 默认永不过期
    }), u;
  };
  return c.cache = t, c.clear = () => t.clear(), c;
}
function p(e) {
  const n = typeof e;
  return e != null && (n == "object" || n == "function");
}
function y(e) {
  if (typeof e != "object" || e === null) return !1;
  const n = Object.getPrototypeOf(e);
  return n === null || n === Object.prototype;
}
export {
  p as isObject,
  y as isPlainObject,
  a as memoize,
  f as throttle
};
