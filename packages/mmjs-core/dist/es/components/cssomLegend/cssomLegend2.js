import { defineComponent as ne, inject as oe, useTemplateRef as N, shallowRef as se, ref as le, watchEffect as A, computed as k, onScopeDispose as ie, createElementBlock as c, openBlock as r, createElementVNode as w, Fragment as z, renderList as K, withModifiers as W, normalizeStyle as x, unref as a, normalizeClass as m } from "vue";
import { cssomLegendInjectKey as ce } from "./const.js";
import { getCustomLegendProperty as re, getSelectStatus as R, getIconModified as ae, formatter as de } from "./methods.js";
import { normalizeLegendName as me } from "./filters.js";
import { useLegendAction as ue } from "./legend-action.js";
import { throttle as fe } from "mmjs-share";
import { scrollDirMap as D } from "./help.const.js";
import { calculateViewBox as ge } from "./tools.js";
import { transfromState as he } from "./transform.js";
const _e = { class: "cssom_legend" }, pe = { class: "cssom_legend__wrapper" }, ve = ["onWheelCapture"], ye = ["onClick", "onMouseenter", "onMouseleave"], Le = ["src"], we = ["viewBox"], We = ["d"], Se = ["innerHTML"], Be = /* @__PURE__ */ ne({
  __name: "cssomLegend",
  props: {
    ecInstance: {},
    eventName: { default: "rendered" },
    throttleTime: { default: 500 },
    disabled: { type: Boolean, default: !1 },
    enchanceCenter: { type: Boolean, default: !0 },
    transfromFn: {}
  },
  emits: ["legendToggleSelect", "highlight", "downplay"],
  setup(l, { emit: H }) {
    const S = oe(ce, void 0), P = N("cssomLegendRefKey"), M = N(
      "cssomLegendWrapRefKey"
    ), g = se(), h = le(), C = H;
    A(() => {
      typeof l.transfromFn == "function" && (he.transform = l.transfromFn);
    });
    const { legendToggleSelect: O, highlight: V, downplay: j } = ue(g);
    function G(e) {
      !l.disabled && O(e), C("legendToggleSelect", e);
    }
    function Y(e) {
      !l.disabled && V(e), C("highlight", e);
    }
    function q(e) {
      !l.disabled && j(e), C("downplay", e);
    }
    function I(e, s) {
      var o;
      const t = ((o = h.value) == null ? void 0 : o.series) ?? [];
      return me({
        legend: e,
        series: t,
        legendIndex: s
      });
    }
    function J(e, s) {
      if (!l.enchanceCenter) return {};
      if (e.type === "scroll" || e.orient === "vertical" || !M.value)
        return {};
      if (e.left !== "center" && e.right !== "center") return {};
      const t = M.value[s], o = t.parentElement, n = o.getBoundingClientRect(), i = window.getComputedStyle(o), _ = parseFloat(i.paddingLeft), p = parseFloat(i.paddingRight), v = parseFloat(i.borderLeftWidth), y = parseFloat(i.borderRightWidth), u = n.width - _ - p - v - y;
      let f = 0;
      const $ = Array.from(t.children), b = parseFloat(String(e.itemGap || 0)) * ($.length - 1), F = $.map((d) => d.clientWidth);
      let B = F.reduce((d, L) => (d += L, d <= u && (f += 1), d), b);
      return B > u ? {
        "--custom-max-width": `${F.slice(0, f).reduce((L, te) => (L += te, L), b)}px`
      } : {
        "--custom-max-width": `${B}px`
      };
    }
    const Q = k(
      () => {
        var e;
        return ((e = h.value) == null ? void 0 : e.legend) ?? [];
      }
    ), U = k(() => {
      var e;
      return ((e = h.value) == null ? void 0 : e.color) ?? [];
    }), E = fe(function() {
      h.value = this.getOption();
    }, l.throttleTime);
    function X(e, s) {
      var o;
      return {
        "--item-color": U.value[e],
        "--textStyle-color": (o = s == null ? void 0 : s.textStyle) == null ? void 0 : o.color
      };
    }
    function Z(e, s, t) {
      var i;
      if (s.type !== "scroll") return;
      e.preventDefault();
      const o = (i = P.value) == null ? void 0 : i[t];
      if (!o) return;
      const n = D[s.orient] ?? D.horizontal;
      o.scrollTo(n(o, e.deltaY));
    }
    function ee() {
      var e;
      (e = g.value) == null || e.on(l.eventName, E);
    }
    function T() {
      var e;
      (e = g.value) == null || e.off(l.eventName, E);
    }
    return A(() => {
      var e;
      g.value = l.ecInstance ?? ((e = S == null ? void 0 : S.value) == null ? void 0 : e.ec), T(), ee();
    }), ie(() => {
      T();
    }), (e, s) => (r(), c("div", _e, [
      w("div", pe, [
        (r(!0), c(z, null, K(Q.value, (t, o) => (r(), c("div", {
          class: m(["cssom_legend__legend", [
            `cssom_legend--box-${o}`,
            `cssom_legend__legend--${t.type ?? "plain"}`,
            `legend_orient--${t.orient ?? "horizontal"}`
          ]]),
          ref_for: !0,
          ref: "cssomLegendRefKey",
          style: x(a(re)(t)),
          key: o,
          onWheelCapture: W((n) => Z(n, t, o), ["stop"])
        }, [
          w("div", {
            ref_for: !0,
            ref: "cssomLegendWrapRefKey",
            class: m(["cssom_legend__legend__wrap", [`cssom_legend__legend__wrap--${t.type ?? "plain"}`]]),
            style: x(J(t, o))
          }, [
            (r(!0), c(z, null, K(I(t, o), (n, i) => {
              var _, p, v, y, u;
              return r(), c("div", {
                class: m(["cssom_legend__legend_item", {
                  "cssom_legend__legend_item--unselect": !a(R)(
                    t,
                    n.name
                  )
                }]),
                key: i,
                style: x(X(i, n)),
                onClick: W((f) => G(n.name), ["stop"]),
                onMouseenter: W((f) => Y(n.name), ["stop"]),
                onMouseleave: W((f) => q(n.name), ["stop"])
              }, [
                (_ = n.icon ?? t.icon) != null && _.startsWith("image://") ? (r(), c("img", {
                  key: 0,
                  class: m(["cssom_legend__image_icon", {
                    "cssom_legend__image_icon--unselect": !a(R)(
                      t,
                      n.name
                    )
                  }]),
                  src: (p = n.icon ?? t.icon) == null ? void 0 : p.slice(8),
                  alt: ""
                }, null, 10, Le)) : (v = n.icon ?? t.icon) != null && v.startsWith("path://") ? (r(), c("svg", {
                  key: 1,
                  class: m(["cssom_legend__svg_icon", {
                    "cssom_legend__svg_icon--unselect": !a(R)(
                      t,
                      n.name
                    )
                  }]),
                  viewBox: a(ge)((y = n.icon ?? t.icon) == null ? void 0 : y.slice(7))
                }, [
                  w("path", {
                    d: (u = n.icon ?? t.icon) == null ? void 0 : u.slice(7)
                  }, null, 8, We)
                ], 10, we)) : (r(), c("div", {
                  key: 2,
                  class: m(["cssom_legend__rect", [...a(ae)(n.icon ?? t.icon, n)]])
                }, null, 2)),
                w("div", {
                  class: "cssom_legend__text",
                  innerHTML: a(de)(t, n.name)
                }, null, 8, Se)
              ], 46, ye);
            }), 128))
          ], 6)
        ], 46, ve))), 128))
      ])
    ]));
  }
});
export {
  Be as default
};
