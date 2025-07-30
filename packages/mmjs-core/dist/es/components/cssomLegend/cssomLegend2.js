import { defineComponent as oe, inject as se, useTemplateRef as z, shallowRef as re, ref as ie, watchEffect as K, computed as P, onScopeDispose as le, createElementBlock as u, openBlock as m, createElementVNode as T, Fragment as k, renderList as D, withModifiers as E, normalizeStyle as $, unref as g, normalizeClass as v } from "vue";
import { cssomLegendInjectKey as ce } from "./const.js";
import { forPropertsEffect as ae, getCustomLegendProperty as ue, getSelectStatus as b, getIconModified as me, formatter as fe } from "./methods.js";
import { normalizeLegendName as de, transformCss as pe } from "./filters.js";
import { useLegendAction as ge } from "./legend-action.js";
import { throttle as he } from "mmjs-share";
import { scrollDirMap as H } from "./help.const.js";
import { calculateViewBox as _e } from "./tools.js";
import { transfromState as O } from "./transform.js";
const ve = { class: "cssom_legend" }, ye = { class: "cssom_legend__wrapper" }, Le = ["onWheelCapture"], Se = ["onClick", "onMouseenter", "onMouseleave"], Ce = ["src"], we = ["viewBox"], We = ["d"], Re = ["innerHTML"], Ne = /* @__PURE__ */ oe({
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
  setup(i, { emit: G }) {
    const x = se(ce, void 0), V = z("cssomLegendRefKey"), A = z(
      "cssomLegendWrapRefKey"
    ), w = re(), W = ie(), M = G;
    K(() => {
      typeof i.transfromFn == "function" && (O.transform = i.transfromFn);
    });
    const { legendToggleSelect: j, highlight: Y, downplay: q } = ge(w);
    function J(e) {
      !i.disabled && j(e), M("legendToggleSelect", e);
    }
    function Q(e) {
      !i.disabled && Y(e), M("highlight", e);
    }
    function U(e) {
      !i.disabled && q(e), M("downplay", e);
    }
    function X(e, r) {
      var o;
      const t = ((o = W.value) == null ? void 0 : o.series) ?? [];
      return de({
        legend: e,
        series: t,
        legendIndex: r
      });
    }
    function Z(e, r) {
      if (!i.enchanceCenter) return {};
      if (e.type === "scroll" || e.orient === "vertical" || !A.value)
        return {};
      if (e.left !== "center" && e.right !== "center") return {};
      try {
        const t = A.value[r], o = t.parentElement, n = o.getBoundingClientRect(), s = window.getComputedStyle(o), f = parseFloat(s.paddingLeft), h = parseFloat(s.paddingRight), _ = parseFloat(s.borderLeftWidth), d = parseFloat(s.borderRightWidth), c = n.width - f - h - _ - d;
        let a = 0;
        const y = Array.from(t.children), L = parseFloat(String(e.itemGap || 0)) * (y.length - 1), S = y.map((l) => l.clientWidth);
        let C = S.reduce((l, p) => (l += p, l <= c && (a += 1), l), L);
        return C > c ? {
          "--custom-max-width": `${S.slice(0, a).reduce((p, R) => (p += R, p), L)}px`
        } : {
          "--custom-max-width": `${C}px`
        };
      } catch (t) {
        console.error(`[Enhance Center]: ${t}`);
      }
    }
    const I = P(
      () => {
        var e;
        return ((e = W.value) == null ? void 0 : e.legend) ?? [];
      }
    ), F = P(() => {
      var r;
      let e = (r = W.value) == null ? void 0 : r.color;
      return Array.isArray(e) ? e : e ? [e] : [];
    }), B = he(function() {
      W.value = this.getOption();
    }, i.throttleTime);
    function ee(e, r, t) {
      var d, c, a, y, L, S, C, l, p, R;
      let o = (c = (d = t == null ? void 0 : t.serie) == null ? void 0 : d.itemStyle) == null ? void 0 : c.color;
      const n = {
        dataIndex: e,
        seriesIndex: r,
        value: (y = (a = t.serie) == null ? void 0 : a.data) == null ? void 0 : y[e],
        data: (S = (L = t.serie) == null ? void 0 : L.data) == null ? void 0 : S[e],
        seriesType: (C = t.serie) == null ? void 0 : C.type,
        name: (l = t.serie) == null ? void 0 : l.name,
        seriesName: t == null ? void 0 : t.name,
        color: null,
        componentIndex: r,
        componentSubType: (p = t.serie) == null ? void 0 : p.type,
        componentType: "customSeries"
      };
      o && F.value.splice(e, 0, o);
      let s = F.value[e];
      const f = {}, h = (t == null ? void 0 : t.textStyle) ?? {};
      ae(h, f, "textStyle", pe);
      const _ = typeof s == "function" ? s(n) : s;
      return {
        "--item-color": O.transformGradientCss(_),
        "--data-item-icon": (R = t.icon) == null ? void 0 : R.replaceAll("image://", ""),
        ...f
      };
    }
    function te(e, r, t) {
      var s;
      if (r.type !== "scroll") return;
      e.preventDefault();
      const o = (s = V.value) == null ? void 0 : s[t];
      if (!o) return;
      const n = H[r.orient] ?? H.horizontal;
      o.scrollTo(n(o, e.deltaY));
    }
    function ne() {
      var e;
      (e = w.value) == null || e.on(i.eventName, B);
    }
    function N() {
      var e;
      (e = w.value) == null || e.off(i.eventName, B);
    }
    return K(() => {
      var e;
      w.value = i.ecInstance ?? ((e = x == null ? void 0 : x.value) == null ? void 0 : e.ec), N(), ne();
    }), le(() => {
      N();
    }), (e, r) => (m(), u("div", ve, [
      T("div", ye, [
        (m(!0), u(k, null, D(I.value, (t, o) => (m(), u("div", {
          class: v(["cssom_legend__legend", [
            `cssom_legend--box-${o}`,
            `cssom_legend__legend--${t.type ?? "plain"}`,
            `legend_orient--${t.orient ?? "horizontal"}`
          ]]),
          ref_for: !0,
          ref: "cssomLegendRefKey",
          style: $(g(ue)(t)),
          key: o,
          onWheelCapture: E((n) => te(n, t, o), ["stop"])
        }, [
          T("div", {
            ref_for: !0,
            ref: "cssomLegendWrapRefKey",
            class: v(["cssom_legend__legend__wrap", [`cssom_legend__legend__wrap--${t.type ?? "plain"}`]]),
            style: $(Z(t, o))
          }, [
            (m(!0), u(k, null, D(X(t, o), (n, s) => {
              var f, h, _, d, c;
              return m(), u("div", {
                class: v(["cssom_legend__legend_item", {
                  "cssom_legend__legend_item--unselect": !g(b)(
                    t,
                    n.name
                  )
                }]),
                key: s,
                style: $(ee(s, o, n)),
                onClick: E((a) => J(n.name), ["stop"]),
                onMouseenter: E((a) => Q(n.name), ["stop"]),
                onMouseleave: E((a) => U(n.name), ["stop"])
              }, [
                (f = n.icon ?? t.icon) != null && f.startsWith("image://") ? (m(), u("img", {
                  key: 0,
                  class: v(["cssom_legend__image_icon", {
                    "cssom_legend__image_icon--unselect": !g(b)(
                      t,
                      n.name
                    )
                  }]),
                  src: (h = n.icon ?? t.icon) == null ? void 0 : h.slice(8),
                  alt: ""
                }, null, 10, Ce)) : (_ = n.icon ?? t.icon) != null && _.startsWith("path://") ? (m(), u("svg", {
                  key: 1,
                  class: v(["cssom_legend__svg_icon", {
                    "cssom_legend__svg_icon--unselect": !g(b)(
                      t,
                      n.name
                    )
                  }]),
                  viewBox: g(_e)((d = n.icon ?? t.icon) == null ? void 0 : d.slice(7))
                }, [
                  T("path", {
                    d: (c = n.icon ?? t.icon) == null ? void 0 : c.slice(7)
                  }, null, 8, We)
                ], 10, we)) : (m(), u("div", {
                  key: 2,
                  class: v(["cssom_legend__rect", [...g(me)(n.icon ?? t.icon, n)]])
                }, null, 2)),
                T("div", {
                  class: "cssom_legend__text",
                  innerHTML: g(fe)(t, n.name)
                }, null, 8, Re)
              ], 46, Se);
            }), 128))
          ], 6)
        ], 46, Le))), 128))
      ])
    ]));
  }
});
export {
  Ne as default
};
