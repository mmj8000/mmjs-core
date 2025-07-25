import { defineComponent as a, inject as f, shallowRef as r, watchPostEffect as l, onScopeDispose as d, createElementBlock as p, openBlock as m } from "vue";
import { ecInjectName as u } from "./const.js";
const _ = { class: "cssom_legend" }, g = /* @__PURE__ */ a({
  __name: "cssomLegend",
  props: {
    ecInstance: {}
  },
  setup(s) {
    const n = f(u, void 0), o = r();
    function c() {
      console.log(this.getOption());
    }
    function i() {
      var e;
      (e = o.value) == null || e.on("finished", c);
    }
    function t() {
      var e;
      (e = o.value) == null || e.off("finished", c);
    }
    return l(() => {
      o.value = s.ecInstance ?? (n == null ? void 0 : n.value), t(), i();
    }), d(() => {
      t();
    }), (e, h) => (m(), p("div", _));
  }
});
export {
  g as default
};
