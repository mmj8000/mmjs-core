function o(l) {
  function n(t) {
    var e;
    (e = l.value) == null || e.dispatchAction(
      {
        type: "legendToggleSelect",
        // 图例名称
        name: t
      },
      {
        flush: !1,
        silent: !0
      }
    );
  }
  function i(t) {
    var e;
    (e = l.value) == null || e.dispatchAction(
      {
        type: "highlight",
        // 图例名称
        name: t
      },
      {
        flush: !1,
        silent: !0
      }
    );
  }
  function u(t) {
    var e;
    (e = l.value) == null || e.dispatchAction(
      {
        type: "downplay",
        // 图例名称
        name: t
      },
      {
        flush: !1,
        silent: !0
      }
    );
  }
  return {
    legendToggleSelect: n,
    highlight: i,
    downplay: u
  };
}
export {
  o as useLegendAction
};
