import { defineComponent as v, ref as w, shallowRef as h, watch as k, createElementBlock as o, openBlock as i, renderSlot as u, createElementVNode as c, Fragment as I, renderList as T } from "vue";
import { useIntersectionObserver as g } from "@vueuse/core";
import { requestAnimationFrame as O } from "raf-polyfill-es";
const R = { class: "intersection_draw__loading_content" }, b = { class: "intersection_draw__inner_skeleton" }, V = /* @__PURE__ */ v({
  __name: "intersectionDraw",
  props: {
    timeoutTime: { default: 100 },
    once: { type: Boolean, default: !0 },
    skeletonRows: { default: 10 },
    noSupportTime: { default: 500 },
    useIntersectionObserverOptions: {}
  },
  emits: ["show", "hide"],
  setup(t, { expose: m, emit: d }) {
    const n = d, s = w(!1), r = h(), { isSupported: a, stop: l, resume: f, pause: p } = g(
      r,
      ([e]) => {
        O(() => {
          setTimeout(() => {
            s.value = (e == null ? void 0 : e.isIntersecting) || !1;
          }, t.timeoutTime);
        }), e != null && e.isIntersecting ? (n("show"), t.once && l()) : n("hide");
      },
      t.useIntersectionObserverOptions
    );
    return k(
      a,
      (e) => {
        e === !1 && setTimeout(() => {
          s.value = !0;
        }, t.noSupportTime);
      },
      {
        immediate: !0
      }
    ), m({
      isSupported: a,
      pause: p,
      stop: l,
      resume: f
    }), (e, S) => (i(), o("div", {
      class: "intersection_draw",
      ref_key: "intersectionRef",
      ref: r
    }, [
      s.value ? u(e.$slots, "default", { key: 1 }, void 0, !0) : u(e.$slots, "temp", { key: 0 }, () => [
        c("div", R, [
          c("div", b, [
            (i(!0), o(I, null, T(e.skeletonRows, (B, _) => (i(), o("div", {
              class: "intersection_draw__skeleton_item",
              key: _
            }))), 128))
          ])
        ])
      ], !0)
    ], 512));
  }
});
export {
  V as default
};
