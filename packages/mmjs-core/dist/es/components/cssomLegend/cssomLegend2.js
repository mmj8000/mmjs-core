import { defineComponent as te, inject as ne, useTemplateRef as A, shallowRef as oe, ref as se, computed as F, watchEffect as le, onScopeDispose as ie, createElementBlock as c, openBlock as r, createElementVNode as w, Fragment as k, renderList as z, withModifiers as W, normalizeStyle as x, unref as a, normalizeClass as u } from "vue";
import { cssomLegendInjectKey as ce } from "./const.js";
import { getCustomLegendProperty as re, getSelectStatus as R, calculateViewBox as ae, getIconModified as de, formatter as ue } from "./methods.js";
import { normalizeLegendName as me } from "./filters.js";
import { useLegendAction as ge } from "./legend-action.js";
import { throttle as fe } from "mmjs-share";
import { scrollDirMap as K } from "./help.const.js";
const _e = { class: "cssom_legend" }, he = { class: "cssom_legend__wrapper" }, pe = ["onWheelCapture"], ve = ["onClick", "onMouseenter", "onMouseleave"], ye = ["src"], Le = ["viewBox"], we = ["d"], We = ["innerHTML"], $e = /* @__PURE__ */ te({
  __name: "cssomLegend",
  props: {
    ecInstance: {},
    eventName: { default: "rendered" },
    throttleTime: { default: 500 },
    disabled: { type: Boolean, default: !1 },
    enchanceCenter: { type: Boolean, default: !0 }
  },
  emits: ["legendToggleSelect", "highlight", "downplay"],
  setup(i, { emit: D }) {
    const C = ne(ce, void 0), H = A("cssomLegendRefKey"), M = A(
      "cssomLegendWrapRefKey"
    ), f = oe(), _ = se(), S = D, { legendToggleSelect: P, highlight: O, downplay: V } = ge(f);
    function j(e) {
      !i.disabled && P(e), S("legendToggleSelect", e);
    }
    function G(e) {
      !i.disabled && O(e), S("highlight", e);
    }
    function Y(e) {
      !i.disabled && V(e), S("downplay", e);
    }
    function q(e, s) {
      var o;
      const t = ((o = _.value) == null ? void 0 : o.series) ?? [];
      return me({
        legend: e,
        series: t,
        legendIndex: s
      });
    }
    function I(e, s) {
      if (!i.enchanceCenter) return {};
      if (e.type === "scroll" || e.orient === "vertical" || !M.value)
        return {};
      if (e.left !== "center" && e.right !== "center") return {};
      const t = M.value[s], o = t.parentElement, n = o.getBoundingClientRect(), l = window.getComputedStyle(o), h = parseFloat(l.paddingLeft), p = parseFloat(l.paddingRight), v = parseFloat(l.borderLeftWidth), y = parseFloat(l.borderRightWidth), m = n.width - h - p - v - y;
      let g = 0;
      const $ = Array.from(t.children), b = parseFloat(String(e.itemGap || 0)) * ($.length - 1), B = $.map((d) => d.clientWidth);
      let N = B.reduce((d, L) => (d += L, d <= m && (g += 1), d), b);
      return N > m ? {
        "--custom-max-width": `${B.slice(0, g).reduce((L, ee) => (L += ee, L), b)}px`
      } : {
        "--custom-max-width": `${N}px`
      };
    }
    const J = F(
      () => {
        var e;
        return ((e = _.value) == null ? void 0 : e.legend) ?? [];
      }
    ), Q = F(() => {
      var e;
      return ((e = _.value) == null ? void 0 : e.color) ?? [];
    }), E = fe(function() {
      _.value = this.getOption();
    }, i.throttleTime);
    function U(e, s) {
      var o;
      return {
        "--item-color": Q.value[e],
        "--textStyle-color": (o = s == null ? void 0 : s.textStyle) == null ? void 0 : o.color
      };
    }
    function X(e, s, t) {
      var l;
      if (s.type !== "scroll") return;
      e.preventDefault();
      const o = (l = H.value) == null ? void 0 : l[t];
      if (!o) return;
      const n = K[s.orient] ?? K.horizontal;
      o.scrollTo(n(o, e.deltaY));
    }
    function Z() {
      var e;
      (e = f.value) == null || e.on(i.eventName, E);
    }
    function T() {
      var e;
      (e = f.value) == null || e.off(i.eventName, E);
    }
    return le(() => {
      var e;
      f.value = i.ecInstance ?? ((e = C == null ? void 0 : C.value) == null ? void 0 : e.ec), T(), Z();
    }), ie(() => {
      T();
    }), (e, s) => (r(), c("div", _e, [
      w("div", he, [
        (r(!0), c(k, null, z(J.value, (t, o) => (r(), c("div", {
          class: u(["cssom_legend__legend", [
            `cssom_legend--box-${o}`,
            `cssom_legend__legend--${t.type ?? "plain"}`,
            `legend_orient--${t.orient ?? "horizontal"}`
          ]]),
          ref_for: !0,
          ref: "cssomLegendRefKey",
          style: x(a(re)(t)),
          key: o,
          onWheelCapture: W((n) => X(n, t, o), ["stop"])
        }, [
          w("div", {
            ref_for: !0,
            ref: "cssomLegendWrapRefKey",
            class: u(["cssom_legend__legend__wrap", [`cssom_legend__legend__wrap--${t.type ?? "plain"}`]]),
            style: x(I(t, o))
          }, [
            (r(!0), c(k, null, z(q(t, o), (n, l) => {
              var h, p, v, y, m;
              return r(), c("div", {
                class: u(["cssom_legend__legend_item", {
                  "cssom_legend__legend_item--unselect": !a(R)(
                    t,
                    n.name
                  )
                }]),
                key: l,
                style: x(U(l, n)),
                onClick: W((g) => j(n.name), ["stop"]),
                onMouseenter: W((g) => G(n.name), ["stop"]),
                onMouseleave: W((g) => Y(n.name), ["stop"])
              }, [
                (h = n.icon ?? t.icon) != null && h.startsWith("image://") ? (r(), c("img", {
                  key: 0,
                  class: u(["cssom_legend__image_icon", {
                    "cssom_legend__image_icon--unselect": !a(R)(
                      t,
                      n.name
                    )
                  }]),
                  src: (p = n.icon ?? t.icon) == null ? void 0 : p.slice(8),
                  alt: ""
                }, null, 10, ye)) : (v = n.icon ?? t.icon) != null && v.startsWith("path://") ? (r(), c("svg", {
                  key: 1,
                  class: u(["cssom_legend__svg_icon", {
                    "cssom_legend__svg_icon--unselect": !a(R)(
                      t,
                      n.name
                    )
                  }]),
                  viewBox: a(ae)((y = n.icon ?? t.icon) == null ? void 0 : y.slice(7))
                }, [
                  w("path", {
                    d: (m = n.icon ?? t.icon) == null ? void 0 : m.slice(7)
                  }, null, 8, we)
                ], 10, Le)) : (r(), c("div", {
                  key: 2,
                  class: u(["cssom_legend__rect", [...a(de)(n.icon ?? t.icon, n)]])
                }, null, 2)),
                w("div", {
                  class: "cssom_legend__text",
                  innerHTML: a(ue)(t, n.name)
                }, null, 8, We)
              ], 46, ve);
            }), 128))
          ], 6)
        ], 46, pe))), 128))
      ])
    ]));
  }
});
export {
  $e as default
};
