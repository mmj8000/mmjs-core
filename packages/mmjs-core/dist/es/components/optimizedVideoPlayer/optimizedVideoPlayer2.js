import { defineComponent as _, shallowRef as d, computed as h, nextTick as P, watch as v, onMounted as x, onBeforeUnmount as N } from "vue";
import V from "video.js";
import "video.js/dist/video-js.css";
import { BANDWIDTH_PRESETS as H } from "./const.js";
import { merge as M } from "lodash-es";
const A = _({
  name: "OptimizedVideoPlayer",
  props: {
    src: {
      type: [String, Object],
      required: !0
    },
    controlBar: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: Object,
      default: () => ({})
    },
    playerId: {
      type: String,
      default: () => `video-player-${Math.random().toString(36).substring(2, 9)}`
    },
    bandwidthOptionProps: {
      type: Object,
      default: () => H
    },
    poster: {
      type: String,
      default: ""
    },
    intersectionThreshold: {
      type: Number,
      default: 0.5,
      validator: (n) => n >= 0 && n <= 1
    },
    bandwidthPreset: {
      type: String,
      default: "custom"
    },
    bandwidthLimit: {
      type: Number,
      default: 3e5,
      validator: (n) => n >= 1e5
    },
    showControls: {
      type: Boolean,
      default: !0
    },
    showBandwidthSelector: {
      type: Boolean,
      default: !0
    }
  },
  emits: ["ready", "play", "pause", "ended", "error", "bandwidth-change"],
  setup(n, { emit: a, expose: O }) {
    const t = d(null), u = d(null), c = d(null), o = d(!1), i = d(n.bandwidthPreset);
    let r = null;
    const f = h(() => {
      const e = { ...n.bandwidthOptionProps };
      return n.bandwidthPreset !== "custom" && delete e.custom, e;
    }), p = h(() => {
      var e;
      return i.value === "custom" ? n.bandwidthLimit : (e = f.value[i.value]) == null ? void 0 : e.value;
    }), E = h(
      () => M(
        {
          autoplay: !0,
          controls: n.showControls,
          muted: !0,
          fluid: !0,
          preload: "auto",
          liveui: !1,
          controlBar: n.controlBar,
          html5: {
            nativeControlsForTouch: !1,
            vhs: {
              overrideNative: !0,
              bandwidth: p.value,
              enableLowInitialPlaylist: !0,
              limitRenditionByPlayerDimensions: !1
            }
          }
        },
        n.options
      )
    ), S = () => {
      if (t.value) return;
      const e = document.getElementById(n.playerId);
      e && (t.value = V(e, E.value, () => {
        a("ready", t.value);
      }), I(), C(), D(), y(n.src));
    }, y = (e) => {
      t.value && (typeof e == "string" ? t.value.src({ src: e, type: "application/x-mpegURL" }) : t.value.src(e));
    }, I = () => {
      t.value && (t.value.on("play", () => a("play")), t.value.on("pause", () => a("pause")), t.value.on("ended", () => a("ended")), t.value.on("error", () => a("error")));
    }, C = () => {
      !t.value || !u.value || (r = new IntersectionObserver(
        (e) => {
          e.forEach((l) => {
            var s;
            t.value && (l.isIntersecting ? !document.hidden && t.value.autoplay() && ((s = t.value.play()) == null || s.catch((B) => {
              console.log("播放被阻止:", B), a("error", B);
            })) : (t.value.pause(), a("pause")));
          });
        },
        {
          threshold: n.intersectionThreshold,
          root: null
        }
      ), r.observe(u.value));
    }, D = () => {
      document.addEventListener("visibilitychange", m);
    }, m = () => {
      var e;
      t.value && (document.hidden ? (t.value.pause(), a("pause")) : u.value && L(u.value) && ((e = t.value.play()) == null || e.catch((l) => {
        console.log("播放被阻止:", l), a("error", l);
      })));
    }, L = (e) => {
      const l = e.getBoundingClientRect();
      return l.top >= 0 && l.left >= 0 && l.bottom <= (window.innerHeight || document.documentElement.clientHeight) && l.right <= (window.innerWidth || document.documentElement.clientWidth);
    }, w = (e) => {
      var l, s;
      (s = (l = t.value) == null ? void 0 : l.tech_) != null && s.vhs && (t.value.tech_.vhs.bandwidth = e, t.value.tech_.vhs.throughput = e, a("bandwidth-change", e));
    }, R = (e) => {
      i.value !== e && (i.value = e), o.value = !1;
    };
    function T() {
      setTimeout(() => {
        o.value = !1;
      }, 100);
    }
    const j = () => {
      o.value = !o.value, o.value && P(() => {
        var e;
        (e = c.value) == null || e.focus();
      });
    }, g = () => {
      r && (r.disconnect(), r = null), document.removeEventListener("visibilitychange", m), t.value && (t.value.dispose(), t.value = null);
    };
    v(
      () => n.src,
      (e) => y(e)
    ), v(p, (e) => w(e)), v(
      () => n.showControls,
      (e) => {
        t.value && t.value.controls(e);
      }
    ), v(
      () => n.bandwidthPreset,
      (e) => {
        i.value = e;
      }
    ), x(S), N(g);
    const b = {
      play: () => {
        var e;
        return ((e = t.value) == null ? void 0 : e.play()) || Promise.reject("Player not initialized");
      },
      pause: () => {
        var e;
        return (e = t.value) == null ? void 0 : e.pause();
      },
      dispose: g,
      getPlayer: () => t.value,
      setBandwidth: (e) => {
        typeof e == "string" ? i.value = e : (i.value = "custom", w(e));
      },
      toggleControls: (e) => {
        if (t.value) {
          const l = typeof e == "boolean" ? e : !t.value.controls();
          t.value.controls(l);
        }
      },
      showBandwidthDialog: () => {
        o.value = !0, P(() => {
          var e;
          (e = c.value) == null || e.focus();
        });
      },
      hideBandwidthDialog: () => {
        var e;
        (e = c.value) == null || e.blur(), o.value = !1;
      }
    };
    return O(b), {
      containerRef: u,
      popupRef: c,
      isShowBandwidthDialog: o,
      currentBandwidthPreset: i,
      bandwidthOptions: f,
      toggleBandwidthDialog: j,
      selectBandwidth: R,
      popupBlur: T,
      ...b
    };
  }
});
export {
  A as default
};
