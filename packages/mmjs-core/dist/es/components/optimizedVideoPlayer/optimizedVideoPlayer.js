import a from "./optimizedVideoPlayer2.js";
import { createElementBlock as s, openBlock as n, createElementVNode as e, createCommentVNode as d, Fragment as p, renderList as u, normalizeClass as C, toDisplayString as l } from "vue";
import '../../../css/components/optimizedVideoPlayer/optimizedVideoPlayer.css';/* empty css                      */
import c from "../../_virtual/_plugin-vue_export-helper.js";
const L = { class: "video-player-wrapper" }, h = {
  class: "video-container",
  ref: "containerRef"
}, m = ["id", "poster", "controls"], f = { class: "dialog-content" }, v = { class: "bandwidth-options" }, g = ["onClick"], w = {
  key: 1,
  class: "floating-controls"
};
function B(o, t, b, k, y, $) {
  return n(), s("div", L, [
    e("div", h, [
      e("video", {
        id: o.playerId,
        class: "video-js",
        poster: o.poster,
        preload: "auto",
        controls: o.showControls,
        playsinline: "true"
      }, null, 8, m)
    ], 512),
    o.isShowBandwidthDialog ? (n(), s("div", {
      key: 0,
      tabindex: "-1",
      autofocus: "",
      onBlur: t[0] || (t[0] = (...i) => o.popupBlur && o.popupBlur(...i)),
      class: "bandwidth-dialog",
      ref: "popupRef"
    }, [
      e("div", f, [
        t[2] || (t[2] = e("h3", null, "选择视频质量", -1)),
        e("div", v, [
          (n(!0), s(p, null, u(o.bandwidthOptions, (i, r) => (n(), s("button", {
            key: r,
            class: C({ active: o.currentBandwidthPreset === r }),
            onClick: (A) => o.selectBandwidth(r)
          }, l(i.label) + " (" + l(i.description) + ") ", 11, g))), 128))
        ])
      ])
    ], 544)) : d("", !0),
    o.currentBandwidthPreset !== "custom" ? (n(), s("div", w, [
      e("button", {
        onClick: t[1] || (t[1] = (...i) => o.toggleBandwidthDialog && o.toggleBandwidthDialog(...i)),
        class: "control-btn",
        title: "切换质量"
      }, t[3] || (t[3] = [
        e("svg", {
          viewBox: "0 0 24 24",
          width: "18",
          height: "18"
        }, [
          e("path", {
            fill: "currentColor",
            d: "M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"
          })
        ], -1)
      ]))
    ])) : d("", !0)
  ]);
}
const z = /* @__PURE__ */ c(a, [["render", B], ["__scopeId", "data-v-d341adb0"]]);
export {
  z as default
};
