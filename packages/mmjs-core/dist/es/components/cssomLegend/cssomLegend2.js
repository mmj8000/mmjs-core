import { defineComponent as le, inject as ce, useTemplateRef as D, shallowRef as ae, ref as me, watchEffect as H, computed as G, onScopeDispose as ue, createElementBlock as u, openBlock as f, createElementVNode as b, Fragment as J, renderList as V, withModifiers as E, normalizeStyle as z, unref as _, normalizeClass as w } from "vue";
import { cssomLegendInjectKey as fe } from "./const.js";
import { forPropertsEffect as pe, getCustomLegendProperty as de, getSelectStatus as K, getIconModified as ge, formatter as _e } from "./methods.js";
import { normalizeLegendName as he, transformCss as ye } from "./filters.js";
import { useLegendAction as ve } from "./legend-action.js";
import { throttle as Se } from "mmjs-share/utils";
import { scrollDirMap as j } from "./help.const.js";
import { calculateViewBox as we } from "./tools.js";
import { transfromState as F } from "./transform.js";
const Ce = { class: "cssom_legend" }, Le = { class: "cssom_legend__wrapper" }, We = ["onWheelCapture"], xe = ["onClick", "onMouseenter", "onMouseleave"], Re = ["src"], Te = ["viewBox"], Me = ["d"], be = ["innerHTML"], Pe = /* @__PURE__ */ le({
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
  setup(l, { emit: Y }) {
    const N = ce(fe, void 0), q = D("cssomLegendRefKey"), O = D(
      "cssomLegendWrapRefKey"
    ), R = ae(), T = me(), $ = Y;
    H(() => {
      typeof l.transfromFn == "function" && (F.transform = l.transfromFn);
    });
    const { legendToggleSelect: Q, highlight: U, downplay: X } = ve(R);
    function Z(t) {
      !l.disabled && Q(t), $("legendToggleSelect", t);
    }
    function I(t) {
      !l.disabled && U(t), $("highlight", t);
    }
    function ee(t) {
      !l.disabled && X(t), $("downplay", t);
    }
    function te(t, s) {
      var n;
      const e = ((n = T.value) == null ? void 0 : n.series) ?? [];
      return he({
        legend: t,
        series: e,
        legendIndex: s
      });
    }
    function oe(t, s) {
      if (!l.enchanceCenter) return {};
      if (t.type === "scroll" || t.orient === "vertical" || !O.value)
        return {};
      if (t.left !== "center" && t.right !== "center") return {};
      try {
        const e = O.value[s], n = e.parentElement, o = n.getBoundingClientRect(), c = window.getComputedStyle(e), r = window.getComputedStyle(n), p = parseFloat(r.paddingLeft), y = parseFloat(r.paddingRight), v = parseFloat(r.borderLeftWidth), d = parseFloat(r.borderRightWidth), a = parseFloat(c.rowGap), C = o.width - p - y - v - d;
        let S = 0;
        const L = Array.from(e.children), M = a * (L.length - 1), W = L.map((i) => {
          const m = window.getComputedStyle(i), g = parseFloat(m.marginLeft), B = parseFloat(m.marginRight);
          return i.clientWidth + g + B;
        });
        let x = W.reduce((i, m) => (i += m, i <= C && (S += 1), i), M);
        if (x > C) {
          let i = W.slice(0, S).reduce((g, B) => (g += B, g), a * (S - 1));
          return {
            "--custom-max-width": F.transformWrapMaxWidth(
              i,
              "px"
            )
          };
        }
        return {
          "--custom-max-width": F.transformWrapMaxWidth(x, "px")
        };
      } catch (e) {
        console.error(`[Enhance Center]: ${e}`);
      }
    }
    const ne = G(
      () => {
        var t;
        return ((t = T.value) == null ? void 0 : t.legend) ?? [];
      }
    ), se = G(() => {
      var s;
      let t = (s = T.value) == null ? void 0 : s.color;
      return Array.isArray(t) ? t : t ? [t] : [];
    }), P = Se(function() {
      T.value = this.getOption();
    }, l.throttleTime);
    function h(t, s, e) {
      var d, a, C, S, L, M, W, x, A, i, m, g;
      let n = (a = (d = e == null ? void 0 : e.serie) == null ? void 0 : d.itemStyle) == null ? void 0 : a.color;
      Reflect.set(
        h,
        "__colors",
        JSON.parse(JSON.stringify(se.value))
      );
      const o = e == null ? void 0 : e.name, c = {
        $vars: ["seriesName", "name", "value"],
        borderColor: (S = (C = e == null ? void 0 : e.serie) == null ? void 0 : C.itemStyle) == null ? void 0 : S.borderColor,
        dataIndex: t,
        seriesIndex: s,
        value: (M = (L = e.serie) == null ? void 0 : L.data) == null ? void 0 : M[t],
        data: (x = (W = e.serie) == null ? void 0 : W.data) == null ? void 0 : x[t],
        seriesType: (A = e.serie) == null ? void 0 : A.type,
        name: (i = e.serie) == null ? void 0 : i.name,
        seriesId: `\0${o}\x000`,
        seriesName: o,
        dataType: void 0,
        color: h.__colors[t],
        componentIndex: s,
        componentSubType: (m = e.serie) == null ? void 0 : m.type,
        componentType: "customSeries"
      };
      n && h.__colors.splice(t, 0, n);
      let r = h.__colors[t];
      const p = {}, y = (e == null ? void 0 : e.textStyle) ?? {};
      pe(y, p, "textStyle", ye);
      const v = typeof r == "function" ? r(c) : r;
      return {
        "--item-color": F.transformGradientCss(v),
        "--data-item-icon": (g = e.icon) == null ? void 0 : g.replaceAll("image://", ""),
        ...p
      };
    }
    h.__colors = [];
    function re(t, s, e) {
      var c;
      if (s.type !== "scroll") return;
      t.preventDefault();
      const n = (c = q.value) == null ? void 0 : c[e];
      if (!n) return;
      const o = j[s.orient] ?? j.horizontal;
      n.scrollTo(o(n, t.deltaY));
    }
    function ie() {
      var t;
      (t = R.value) == null || t.on(l.eventName, P);
    }
    function k() {
      var t;
      (t = R.value) == null || t.off(l.eventName, P);
    }
    return H(() => {
      var t;
      R.value = l.ecInstance ?? ((t = N == null ? void 0 : N.value) == null ? void 0 : t.ec), k(), ie();
    }), ue(() => {
      k();
    }), (t, s) => (f(), u("div", Ce, [
      b("div", Le, [
        (f(!0), u(J, null, V(ne.value, (e, n) => (f(), u("div", {
          class: w(["cssom_legend__legend", [
            `cssom_legend--box-${n}`,
            `cssom_legend__legend--${e.type ?? "plain"}`,
            `legend_orient--${e.orient ?? "horizontal"}`
          ]]),
          ref_for: !0,
          ref: "cssomLegendRefKey",
          style: z(_(de)(e)),
          key: n,
          onWheelCapture: E((o) => re(o, e, n), ["stop"])
        }, [
          b("div", {
            ref_for: !0,
            ref: "cssomLegendWrapRefKey",
            class: w(["cssom_legend__legend__wrap", [`cssom_legend__legend__wrap--${e.type ?? "plain"}`]]),
            style: z(oe(e, n))
          }, [
            (f(!0), u(J, null, V(te(e, n), (o, c) => {
              var r, p, y, v, d;
              return f(), u("div", {
                class: w(["cssom_legend__legend_item", {
                  "cssom_legend__legend_item--unselect": !_(K)(
                    e,
                    o.name
                  )
                }]),
                key: c,
                style: z(h(c, n, o)),
                onClick: E((a) => Z(o.name), ["stop"]),
                onMouseenter: E((a) => I(o.name), ["stop"]),
                onMouseleave: E((a) => ee(o.name), ["stop"])
              }, [
                (r = o.icon ?? e.icon) != null && r.startsWith("image://") ? (f(), u("img", {
                  key: 0,
                  class: w(["cssom_legend__image_icon", {
                    "cssom_legend__image_icon--unselect": !_(K)(
                      e,
                      o.name
                    )
                  }]),
                  src: (p = o.icon ?? e.icon) == null ? void 0 : p.slice(8),
                  alt: ""
                }, null, 10, Re)) : (y = o.icon ?? e.icon) != null && y.startsWith("path://") ? (f(), u("svg", {
                  key: 1,
                  class: w(["cssom_legend__svg_icon", {
                    "cssom_legend__svg_icon--unselect": !_(K)(
                      e,
                      o.name
                    )
                  }]),
                  viewBox: _(we)((v = o.icon ?? e.icon) == null ? void 0 : v.slice(7))
                }, [
                  b("path", {
                    d: (d = o.icon ?? e.icon) == null ? void 0 : d.slice(7)
                  }, null, 8, Me)
                ], 10, Te)) : (f(), u("div", {
                  key: 2,
                  class: w(["cssom_legend__rect", [..._(ge)(o.icon ?? e.icon, o)]])
                }, null, 2)),
                b("div", {
                  class: "cssom_legend__text",
                  innerHTML: _(_e)(e, o.name)
                }, null, 8, be)
              ], 46, xe);
            }), 128))
          ], 6)
        ], 46, We))), 128))
      ])
    ]));
  }
});
export {
  Pe as default
};
