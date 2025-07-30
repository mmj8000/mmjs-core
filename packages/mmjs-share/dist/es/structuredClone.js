const w = typeof structuredClone == "function";
function d(c, s) {
  const r = /* @__PURE__ */ new Map();
  function o(t) {
    if (typeof t != "object" || t === null)
      return t;
    if (r.has(t))
      return r.get(t);
    if (t instanceof Date) {
      const n = new Date(t);
      return r.set(t, n), n;
    }
    if (t instanceof RegExp) {
      const n = new RegExp(t.source, t.flags);
      return r.set(t, n), n;
    }
    if (t instanceof Map) {
      const n = /* @__PURE__ */ new Map();
      return r.set(t, n), t.forEach((e, i) => {
        n.set(o(i), o(e));
      }), n;
    }
    if (t instanceof Set) {
      const n = /* @__PURE__ */ new Set();
      return r.set(t, n), t.forEach((e) => {
        n.add(o(e));
      }), n;
    }
    if (t instanceof ArrayBuffer) {
      const n = new ArrayBuffer(t.byteLength);
      return new Uint8Array(n).set(new Uint8Array(t)), r.set(t, n), n;
    }
    if (ArrayBuffer.isView(t)) {
      const n = o(t.buffer), e = Object.getPrototypeOf(t).constructor, i = new e(
        n,
        t.byteOffset,
        t.length
      );
      return r.set(t, i), i;
    }
    if (t instanceof Blob)
      return r.set(t, t), t;
    const p = Object.getPrototypeOf(t), f = Object.create(p);
    r.set(t, f);
    const b = Reflect.ownKeys(t);
    for (const n of b) {
      const e = Object.getOwnPropertyDescriptor(t, n);
      e.get || e.set ? Object.defineProperty(f, n, e) : f[n] = o(
        t[n]
      );
    }
    return f;
  }
  return o(c);
}
let y = function(c, s) {
  return w ? y = globalThis.structuredClone : y = d, y(c, s);
};
const g = (c, s) => y(c, s);
export {
  g as structuredClonePolyfill
};
