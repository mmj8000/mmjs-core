import { normalizeURL as p } from "./url.js";
const y = /* @__PURE__ */ (() => {
  let l = null;
  const d = (n) => {
    const t = [], e = n.indexOf("#"), r = e === -1 ? n : n.slice(0, e), i = r.indexOf("?");
    if (i !== -1 && (t[0] = r.slice(i + 1)), e !== -1) {
      const o = n.slice(e), s = o.indexOf("?");
      s !== -1 && (t[1] = o.slice(s + 1));
    }
    return t;
  }, f = (n) => typeof n == "boolean" ? n.toString() : n, c = (n, t = {}) => {
    const e = { ...t };
    for (const r of n.split("&")) {
      if (!r.trim()) continue;
      const [i, o] = r.split("="), s = decodeURIComponent(i), a = o === void 0 ? !0 : decodeURIComponent(o);
      s in e ? Array.isArray(e[s]) ? e[s].push(f(a)) : e[s] = [
        f(e[s]),
        f(a)
      ] : e[s] = a;
    }
    return e;
  }, u = (n, t = !0) => {
    const e = d(n);
    if (e.length === 0) return {};
    let r = c(e[0] ?? "");
    return t && e.length > 1 && (r = c(e[1], r)), r;
  }, h = (n, t = !0) => {
    try {
      let e = {};
      const r = new URL(p(n)), i = r.search.slice(1);
      if (i && (e = c(i)), t) {
        const o = r.hash, s = o.indexOf("?");
        if (s !== -1) {
          const a = o.slice(s + 1);
          e = c(a, e);
        }
      }
      return e;
    } catch (e) {
      return console.warn("Failed to use native URL parser, falling back", e), u(n, t);
    }
  };
  return (n = window.location.href, t = {}) => {
    const { includeHashParams: e = !0 } = t;
    return l === null && (l = typeof URL < "u" && typeof URLSearchParams < "u" && typeof window < "u"), l ? h(n, e) : u(n, e);
  };
})();
export {
  y as parseUrlParams
};
