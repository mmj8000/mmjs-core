import { defineComponent as b, inject as j, shallowRef as A, ref as F, computed as E, watchPostEffect as H, onScopeDispose as K, createElementBlock as c, openBlock as i, createElementVNode as u, Fragment as k, renderList as N, normalizeStyle as B, unref as o, normalizeClass as _, toDisplayString as R } from "vue";
import { cssomLegendInjectKey as T } from "./const.js";
import { getCustomLegendProperty as q, getSelectStatus as f, calculateViewBox as G, getIconModified as I, formatter as J } from "./methods.js";
import { normalizeLegendName as C } from "./filters.js";
import { useLegendAction as Q } from "./legend-action.js";
const U = { class: "cssom_legend" }, X = { class: "cssom_legend__wrapper" }, Y = { class: "cssom_legend__legend__wrap" }, Z = ["onClick", "onMouseenter", "onMouseleave"], ee = ["src"], ne = ["viewBox"], te = ["d"], se = ["title"], _e = /* @__PURE__ */ b({
  __name: "cssomLegend",
  props: {
    ecInstance: {},
    eventName: { default: "rendered" }
  },
  setup(v) {
    const g = j(T, void 0), m = A(), r = F(), { legendToggleSelect: M, highlight: $, downplay: z } = Q(m);
    function P(e, l) {
      var t, a;
      const n = ((t = r.value) == null ? void 0 : t.series) ?? [], s = n.at(l) ?? n.at(0);
      return s ? (a = e == null ? void 0 : e.data) != null && a.length ? C({
        legend: e,
        serie: s,
        series: n
      }) : C({
        legend: e,
        serie: s,
        series: n
      }) : [];
    }
    const D = E(
      () => {
        var e;
        return ((e = r.value) == null ? void 0 : e.legend) ?? [];
      }
    ), O = E(() => {
      var e;
      return ((e = r.value) == null ? void 0 : e.color) ?? [];
    });
    function d() {
      r.value = this.getOption();
    }
    function V(e, l) {
      var s;
      return {
        "--item-color": O.value[e],
        "--textStyle-color": (s = l == null ? void 0 : l.textStyle) == null ? void 0 : s.color
      };
    }
    function W() {
      var e;
      (e = m.value) == null || e.on(v.eventName, d);
    }
    function p() {
      var e;
      (e = m.value) == null || e.off(v.eventName, d);
    }
    return H(() => {
      var e;
      m.value = v.ecInstance ?? ((e = g == null ? void 0 : g.value) == null ? void 0 : e.ec), p(), W();
    }), K(() => {
      p();
    }), (e, l) => (i(), c("div", U, [
      u("div", X, [
        (i(!0), c(k, null, N(D.value, (n, s) => (i(), c("div", {
          class: _(["cssom_legend__legend", [`cssom_legend--box-${s}`]]),
          style: B(o(q)(n)),
          key: s
        }, [
          u("div", Y, [
            (i(!0), c(k, null, N(P(n, s), (t, a) => {
              var h, y, x, S, w;
              return i(), c("div", {
                class: _(["cssom_legend__legend_item", {
                  "cssom_legend__legend_item--unselect": !o(f)(
                    n,
                    t.name
                  )
                }]),
                key: a,
                style: B(V(a, t)),
                onClick: (L) => o(M)(t.name),
                onMouseenter: (L) => o($)(t.name),
                onMouseleave: (L) => o(z)(t.name)
              }, [
                (h = t.icon ?? n.icon) != null && h.startsWith("image://") ? (i(), c("img", {
                  key: 0,
                  class: _(["cssom_legend__image_icon", {
                    "cssom_legend__image_icon--unselect": !o(f)(
                      n,
                      t.name
                    )
                  }]),
                  src: (y = t.icon ?? n.icon) == null ? void 0 : y.slice(8),
                  alt: ""
                }, null, 10, ee)) : (x = t.icon ?? n.icon) != null && x.startsWith("path://") ? (i(), c("svg", {
                  key: 1,
                  class: _(["cssom_legend__svg_icon", {
                    "cssom_legend__svg_icon--unselect": !o(f)(
                      n,
                      t.name
                    )
                  }]),
                  viewBox: o(G)((S = t.icon ?? n.icon) == null ? void 0 : S.slice(7))
                }, [
                  u("path", {
                    d: (w = t.icon ?? n.icon) == null ? void 0 : w.slice(7)
                  }, null, 8, te)
                ], 10, ne)) : (i(), c("div", {
                  key: 2,
                  class: _(["cssom_legend__rect", [
                    `legend-icon--${o(I)(t.icon ?? n.icon)}`
                  ]])
                }, null, 2)),
                u("div", {
                  class: "cssom_legend__text",
                  title: t.name
                }, R(o(J)(n, t.name)), 9, se)
              ], 46, Z);
            }), 128))
          ])
        ], 6))), 128))
      ])
    ]));
  }
});
export {
  _e as default
};
