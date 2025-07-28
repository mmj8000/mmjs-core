function u(l, a) {
  let o = 0, t = null;
  const c = function(...i) {
    const e = Date.now(), n = a - (e - o);
    n <= 0 ? (t && (clearTimeout(t), t = null), l.apply(this, i), o = e) : t || (t = setTimeout(() => {
      l.apply(this, i), o = Date.now(), t = null;
    }, n));
  };
  return c.cancel = function() {
    t && (clearTimeout(t), t = null);
  }, c;
}
function f(l, a, o) {
  const t = /* @__PURE__ */ new Map(), c = (...e) => JSON.stringify(e), i = function(...e) {
    const n = (a || c)(...e);
    if (t.has(n)) {
      const s = t.get(n);
      if (s.expireAt > Date.now())
        return s.data;
      t.delete(n);
    }
    const r = l.apply(this, e);
    return t.set(n, {
      data: r,
      expireAt: Date.now() + (o ?? 1 / 0)
      // 默认永不过期
    }), r;
  };
  return i.cache = t, i.clear = () => t.clear(), i;
}
export {
  f as memoize,
  u as throttle
};
