const p = /* @__PURE__ */ (() => {
  let l = null;
  const h = (t) => {
    const n = [], e = t.indexOf("#"), r = e === -1 ? t : t.slice(0, e), a = r.indexOf("?");
    if (a !== -1 && (n[0] = r.slice(a + 1)), e !== -1) {
      const o = t.slice(e), s = o.indexOf("?");
      s !== -1 && (n[1] = o.slice(s + 1));
    }
    return n;
  }, f = (t) => typeof t == "boolean" ? t.toString() : t, c = (t, n = {}) => {
    const e = { ...n };
    for (const r of t.split("&")) {
      if (!r.trim()) continue;
      const [a, o] = r.split("="), s = decodeURIComponent(a), i = o === void 0 ? !0 : decodeURIComponent(o);
      s in e ? Array.isArray(e[s]) ? e[s].push(f(i)) : e[s] = [
        f(e[s]),
        f(i)
      ] : e[s] = i;
    }
    return e;
  }, u = (t, n = !0) => {
    const e = h(t);
    if (e.length === 0) return {};
    let r = c(e[0] ?? "");
    return n && e.length > 1 && (r = c(e[1], r)), r;
  }, d = (t, n = !0) => {
    try {
      let e = {};
      const r = new URL(t), a = r.search.slice(1);
      if (a && (e = c(a)), n) {
        const o = r.hash, s = o.indexOf("?");
        if (s !== -1) {
          const i = o.slice(s + 1);
          e = c(i, e);
        }
      }
      return e;
    } catch (e) {
      return console.warn("Failed to use native URL parser, falling back", e), u(t, n);
    }
  };
  return (t = window.location.href, n = {}) => {
    const { includeHashParams: e = !0 } = n;
    return l === null && (l = typeof URL < "u" && typeof URLSearchParams < "u"), l ? d(t, e) : u(t, e);
  };
})();
export {
  p as parseUrlParams
};
