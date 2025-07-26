import { defineComponent as h, inject as N, shallowRef as x, ref as y, computed as w, watchPostEffect as z, onScopeDispose as C, createElementBlock as s, openBlock as o, createElementVNode as u, Fragment as g, renderList as v, normalizeStyle as S, unref as B, normalizeClass as D, toDisplayString as I } from "vue";
import { cssomLegendInjectKey as O } from "./const.js";
import { getCustomLegendProperty as P } from "./methods.js";
import { normalizeLegendName as b } from "./filters.js";
const j = { class: "cssom_legend" }, k = { class: "cssom_legend__wrapper" }, F = { class: "cssom_legend__text" }, $ = /* @__PURE__ */ h({
  __name: "cssomLegend",
  props: {
    ecInstance: {},
    eventName: { default: "finished" }
  },
  setup(a) {
    const l = N(O, void 0), d = x(), i = y();
    function p(e) {
      var r;
      const t = ((r = i.value) == null ? void 0 : r.series) ?? [], n = t.at(e) ?? t.at(0);
      return n ? ((n == null ? void 0 : n.data) ?? []).map((m) => b(n, m)) : [];
    }
    const E = w(() => {
      var e;
      return ((e = i.value) == null ? void 0 : e.legend) ?? [];
    });
    function _() {
      i.value = this.getOption();
    }
    function L() {
      var e;
      (e = d.value) == null || e.on(a.eventName, _);
    }
    function f() {
      var e;
      (e = d.value) == null || e.off(a.eventName, _);
    }
    return z(() => {
      var e;
      d.value = a.ecInstance ?? ((e = l == null ? void 0 : l.value) == null ? void 0 : e.ec), f(), L();
    }), C(() => {
      f();
    }), (e, t) => (o(), s("div", j, [
      u("div", k, [
        (o(!0), s(g, null, v(E.value, (n, c) => (o(), s("div", {
          class: D(["cssom_legend__legend", [`cssom_legend--box-${c}`]]),
          style: S(B(P)(n)),
          key: c
        }, [
          (o(!0), s(g, null, v(p(c), (r, m) => (o(), s("div", {
            class: "cssom_legend__legend_item",
            key: m
          }, [
            t[0] || (t[0] = u("div", { class: "cssom_legend__rect" }, null, -1)),
            u("div", F, I(r), 1)
          ]))), 128))
        ], 6))), 128))
      ])
    ]));
  }
});
export {
  $ as default
};
