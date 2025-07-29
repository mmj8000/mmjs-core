function s(o, r) {
  let c = 0, t = null;
  const l = function(...i) {
    const e = Date.now(), n = r - (e - c);
    n <= 0 ? (t && (clearTimeout(t), t = null), o.apply(this, i), c = e) : t || (t = setTimeout(() => {
      o.apply(this, i), c = Date.now(), t = null;
    }, n));
  };
  return l.cancel = function() {
    t && (clearTimeout(t), t = null);
  }, l;
}
function f(o, r, c) {
  const t = /* @__PURE__ */ new Map(), l = (...e) => JSON.stringify(e), i = function(...e) {
    const n = (r || l)(...e);
    if (t.has(n)) {
      const u = t.get(n);
      if (u.expireAt > Date.now())
        return u.data;
      t.delete(n);
    }
    const a = o.apply(this, e);
    return t.set(n, {
      data: a,
      expireAt: Date.now() + (c ?? 1 / 0)
      // 默认永不过期
    }), a;
  };
  return i.cache = t, i.clear = () => t.clear(), i;
}
function p(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
export {
  p as isObject,
  f as memoize,
  s as throttle
};
