import { shallowRef as f, ref as n } from "vue";
import { requestAnimationFrame as l } from "raf-polyfill-es";
function c(t) {
  return f();
}
function m(t, o = (e) => e * 500) {
  const e = n(0), r = n(!1);
  function u() {
    l(() => {
      e.value += 1, e.value < t ? (r.value = !1, setTimeout(u, o(t))) : r.value = !0;
    });
  }
  return u(), function(a) {
    return r.value ? !0 : e.value >= a;
  };
}
export {
  m as useDef,
  c as useVShallowRef
};
