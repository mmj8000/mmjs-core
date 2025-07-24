import { ref as m, onMounted as f, onScopeDispose as h } from "vue";
function d(t, u) {
  const { initialValue: v = 1, max: s = 4, min: r = 0.5, step: l = 0.1, callback: n } = u ?? {}, e = m(v);
  function a(i) {
    i.deltaY > 0 ? e.value -= l : e.value += l, e.value = Math.min(Math.max(e.value, r), s), n == null || n(i, e.value);
  }
  f(() => {
    t.value.addEventListener("wheel", a, {
      passive: !1
    });
  });
  function o() {
    t.value.removeEventListener("wheel", a);
  }
  return h(() => {
    o();
  }), {
    wheel: e,
    removeEvent: o
  };
}
export {
  d as useWheel
};
