import { shallowRef as c, ref as u } from "vue";
import { requestAnimationFrame as f } from "raf-polyfill-es";
function m(e) {
  return c();
}
function v(e, r = (t) => t * 500) {
  const t = u(0), n = u(!1);
  function s() {
    f(() => {
      t.value += 1, t.value < e ? (n.value = !1, setTimeout(s, r(e))) : n.value = !0;
    });
  }
  return s(), function(i) {
    return n.value ? !0 : t.value >= i;
  };
}
function o(e) {
  const r = o._clone(e), t = u(e);
  function n() {
    t.value = o._clone(r);
  }
  return {
    state: t,
    resetState: n
  };
}
o._clone = function(e) {
  return window && "structuredClone" in window ? structuredClone(e) : JSON.parse(JSON.stringify(e));
};
export {
  v as useDef,
  o as useRestRef,
  m as useVShallowRef
};
