function c(n) {
  function i(e) {
    var t;
    (t = n.value) == null || t.dispatchAction({
      type: "legendToggleSelect",
      // 图例名称
      name: e
    });
  }
  function l(e) {
    var t;
    (t = n.value) == null || t.dispatchAction({
      type: "highlight",
      // 图例名称
      name: e
    });
  }
  function o(e) {
    var t;
    (t = n.value) == null || t.dispatchAction({
      type: "downplay",
      // 图例名称
      name: e
    });
  }
  return {
    legendToggleSelect: i,
    highlight: l,
    downplay: o
  };
}
export {
  c as useLegendAction
};
