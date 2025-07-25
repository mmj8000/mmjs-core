import { defineComponent as f, inject as i, shallowRef as l, watchPostEffect as m, onScopeDispose as d, createElementBlock as r, openBlock as u } from "vue";
import { cssomLegendInjectKey as v } from "./const.js";
const p = { class: "cssom_legend" }, _ = /* @__PURE__ */ f({
  __name: "cssomLegend",
  props: {
    ecInstance: {},
    eventName: { default: "finished" }
  },
  setup(n) {
    const o = i(v, void 0), t = l();
    function c() {
      console.log(this.getOption());
    }
    function a() {
      var e;
      (e = t.value) == null || e.on(n.eventName, c);
    }
    function s() {
      var e;
      (e = t.value) == null || e.off(n.eventName, c);
    }
    return m(() => {
      var e;
      t.value = n.ecInstance ?? ((e = o == null ? void 0 : o.value) == null ? void 0 : e.ec), s(), a();
    }), d(() => {
      s();
    }), (e, h) => (u(), r("div", p));
  }
});
export {
  _ as default
};
