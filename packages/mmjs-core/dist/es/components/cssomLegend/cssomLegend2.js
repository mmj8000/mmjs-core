import { defineComponent as f, inject as i, shallowRef as r, watchPostEffect as l, onScopeDispose as d, createElementBlock as p, openBlock as m } from "vue";
import { ecInjectName as u } from "./const.js";
const _ = { class: "cssom_legend" }, g = /* @__PURE__ */ f({
  __name: "cssomLegend",
  props: {
    ecInstance: {}
  },
  setup(s) {
    const n = i(u), o = r();
    function c() {
      console.log(this.getOption());
    }
    function a() {
      var e;
      (e = o.value) == null || e.on("finished", c);
    }
    function t() {
      var e;
      (e = o.value) == null || e.off("finished", c);
    }
    return l(() => {
      o.value = s.ecInstance ?? (n == null ? void 0 : n.value), t(), a();
    }), d(() => {
      t();
    }), (e, h) => (m(), p("div", _));
  }
});
export {
  g as default
};
