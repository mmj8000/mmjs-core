import f from "axios";
function j(u) {
  const l = /* @__PURE__ */ new Map();
  let a = null, s = null;
  function r(c) {
    const { method: e, url: t, params: n, data: i } = c ?? {};
    let o = [e == null ? void 0 : e.toUpperCase(), t];
    return n && Object.keys(n).length && o.push(`params:${JSON.stringify(n)}`), i && (typeof i == "object" ? o.push(`data:${JSON.stringify(i)}`) : o.push(`data:${i}`)), o.join("|");
  }
  function d(c) {
    return c.allowDuplicate !== void 0 ? !c.allowDuplicate : u != null && u.shouldAllowDuplicate ? !u.shouldAllowDuplicate(c, l) : !0;
  }
  function h(c) {
    p(), a = c.interceptors.request.use(
      (e) => {
        const t = r(e);
        if (l.has(t) && d(e)) {
          const n = l.get(t);
          n == null || n.cancel(`取消重复请求: ${t}`), l.delete(t);
        }
        return e.cancelToken = new f.CancelToken((n) => {
          l.set(t, {
            cancel: n,
            timestamp: Date.now()
          });
        }), e;
      }
    ), s = c.interceptors.response.use(
      function(e) {
        if (typeof e == "object" && (e != null && e.hasOwnProperty("config"))) {
          const t = r(e.config);
          l.delete(t);
        }
        return e;
      },
      (e) => {
        if (f.isCancel(e))
          return console.log("请求被取消:", e.message), Promise.reject({
            isCancelled: !0,
            message: e.message,
            error: e
          });
        if (typeof e == "object" && (e != null && e.hasOwnProperty("config"))) {
          const t = r(e.config);
          l.delete(t);
        }
        return Promise.reject(e);
      }
    );
  }
  function p() {
    a !== null && s !== null && (f.interceptors.request.eject(a), f.interceptors.response.eject(s), a = null, s = null);
  }
  function m(c = "取消所有未完成请求") {
    l.forEach(({ cancel: e }, t) => {
      e(`${c}: ${t}`), l.delete(t);
    });
  }
  function y(c, e = "取消指定请求") {
    l.forEach((t, n) => {
      c(n, t) && (t.cancel(`${e}: ${n}`), l.delete(n));
    });
  }
  return {
    pendingRequests: l,
    useService: h,
    cancelAllPendingRequests: m,
    cancelRequest: y,
    clearInterceptors: p
  };
}
export {
  j as useAxiosCancellation
};
