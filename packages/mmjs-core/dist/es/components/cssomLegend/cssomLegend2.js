import { defineComponent as F, inject as K, shallowRef as R, ref as q, computed as k, watchEffect as G, onScopeDispose as I, createElementBlock as s, openBlock as l, createElementVNode as d, Fragment as T, renderList as $, normalizeStyle as B, unref as c, normalizeClass as m, withModifiers as f } from "vue";
import { cssomLegendInjectKey as J } from "./const.js";
import { getCustomLegendProperty as Q, getSelectStatus as v, calculateViewBox as U, getIconModified as X, formatter as Y } from "./methods.js";
import { normalizeLegendName as Z } from "./filters.js";
import { useLegendAction as ee } from "./legend-action.js";
import { throttle as ne } from "mmjs-share";
const te = { class: "cssom_legend" }, oe = { class: "cssom_legend__wrapper" }, se = ["onClick", "onMouseenter", "onMouseleave"], le = ["src"], ie = ["viewBox"], ce = ["d"], ae = ["innerHTML"], fe = /* @__PURE__ */ F({
  __name: "cssomLegend",
  props: {
    ecInstance: {},
    eventName: { default: "rendered" },
    throttleTime: { default: 500 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["legendToggleSelect", "highlight", "downplay"],
  setup(i, { emit: C }) {
    const g = K(J, void 0), _ = R(), u = q(), r = C, { legendToggleSelect: N, highlight: b, downplay: z } = ee(_);
    function H(e) {
      !i.disabled && N(e), r("legendToggleSelect", e);
    }
    function O(e) {
      !i.disabled && b(e), r("highlight", e);
    }
    function P(e) {
      !i.disabled && z(e), r("downplay", e);
    }
    function V(e, a) {
      var o;
      const n = ((o = u.value) == null ? void 0 : o.series) ?? [];
      return Z({
        legend: e,
        series: n,
        legendIndex: a
      });
    }
    const W = k(
      () => {
        var e;
        return ((e = u.value) == null ? void 0 : e.legend) ?? [];
      }
    ), j = k(() => {
      var e;
      return ((e = u.value) == null ? void 0 : e.color) ?? [];
    }), h = ne(function() {
      u.value = this.getOption();
    }, i.throttleTime);
    function A(e, a) {
      var o;
      return {
        "--item-color": j.value[e],
        "--textStyle-color": (o = a == null ? void 0 : a.textStyle) == null ? void 0 : o.color
      };
    }
    function D() {
      var e;
      (e = _.value) == null || e.on(i.eventName, h);
    }
    function p() {
      var e;
      (e = _.value) == null || e.off(i.eventName, h);
    }
    return G(() => {
      var e;
      _.value = i.ecInstance ?? ((e = g == null ? void 0 : g.value) == null ? void 0 : e.ec), p(), D();
    }), I(() => {
      p();
    }), (e, a) => (l(), s("div", te, [
      d("div", oe, [
        (l(!0), s(T, null, $(W.value, (n, o) => (l(), s("div", {
          class: m(["cssom_legend__legend", [
            `cssom_legend--box-${o}`,
            `cssom_legend__legend--${n.type ?? "plain"}`
          ]]),
          style: B(c(Q)(n)),
          key: o
        }, [
          d("div", {
            class: m(["cssom_legend__legend__wrap", [`cssom_legend__legend__wrap--${n.type ?? "plain"}`]])
          }, [
            (l(!0), s(T, null, $(V(n, o), (t, y) => {
              var w, L, M, S, x;
              return l(), s("div", {
                class: m(["cssom_legend__legend_item", {
                  "cssom_legend__legend_item--unselect": !c(v)(
                    n,
                    t.name
                  )
                }]),
                key: y,
                style: B(A(y, t)),
                onClick: f((E) => H(t.name), ["stop"]),
                onMouseenter: f((E) => O(t.name), ["stop"]),
                onMouseleave: f((E) => P(t.name), ["stop"])
              }, [
                (w = t.icon ?? n.icon) != null && w.startsWith("image://") ? (l(), s("img", {
                  key: 0,
                  class: m(["cssom_legend__image_icon", {
                    "cssom_legend__image_icon--unselect": !c(v)(
                      n,
                      t.name
                    )
                  }]),
                  src: (L = t.icon ?? n.icon) == null ? void 0 : L.slice(8),
                  alt: ""
                }, null, 10, le)) : (M = t.icon ?? n.icon) != null && M.startsWith("path://") ? (l(), s("svg", {
                  key: 1,
                  class: m(["cssom_legend__svg_icon", {
                    "cssom_legend__svg_icon--unselect": !c(v)(
                      n,
                      t.name
                    )
                  }]),
                  viewBox: c(U)((S = t.icon ?? n.icon) == null ? void 0 : S.slice(7))
                }, [
                  d("path", {
                    d: (x = t.icon ?? n.icon) == null ? void 0 : x.slice(7)
                  }, null, 8, ce)
                ], 10, ie)) : (l(), s("div", {
                  key: 2,
                  class: m(["cssom_legend__rect", [...c(X)(t.icon ?? n.icon, t)]])
                }, null, 2)),
                d("div", {
                  class: "cssom_legend__text",
                  innerHTML: c(Y)(n, t.name)
                }, null, 8, ae)
              ], 46, se);
            }), 128))
          ], 2)
        ], 6))), 128))
      ])
    ]));
  }
});
export {
  fe as default
};
