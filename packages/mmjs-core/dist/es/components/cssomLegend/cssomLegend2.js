import { defineComponent as f, inject as a, shallowRef as r, watchPostEffect as d, onScopeDispose as l, createElementBlock as p, openBlock as m } from "vue";
import { cssomLegendInjectKey as u } from "./const.js";
const _ = { class: "cssom_legend" }, E = /* @__PURE__ */ f({
  __name: "cssomLegend",
  props: {
    ecInstance: {}
  },
  setup(s) {
    const n = a(u, void 0), o = r();
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
    return d(() => {
      var e;
      o.value = s.ecInstance ?? ((e = n == null ? void 0 : n.value) == null ? void 0 : e.ec), t(), i();
    }), l(() => {
      t();
    }), (e, h) => (m(), p("div", _));
  }
});
export {
  E as default
};
