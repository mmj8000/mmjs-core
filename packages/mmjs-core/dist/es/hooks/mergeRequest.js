import "@enhances/with-resolvers";
function f(i) {
  const s = /* @__PURE__ */ new Map();
  return (...o) => {
    const t = JSON.stringify(o);
    let e = s.get(t);
    e || (e = {
      resolves: [],
      rejects: [],
      status: "finally"
    }, s.set(t, e));
    const { resolve: l, reject: c, promise: u } = Promise.withResolvers();
    return e.resolves.push(l), e.rejects.push(c), e.status === "requesting" || (e.status = "requesting", i(...o).then((r) => {
      e.resolves.forEach((n) => n(r)), e.resolves = [];
    }).catch((r) => {
      e.rejects.forEach((n) => n(r)), e.rejects = [];
    }).finally(() => {
      e.status = "finally", s.delete(t);
    })), u;
  };
}
export {
  f as useMergeRequest
};
