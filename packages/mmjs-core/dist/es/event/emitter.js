var c = Object.defineProperty;
var f = (s, t, e) => t in s ? c(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var h = (s, t, e) => f(s, typeof t != "symbol" ? t + "" : t, e);
class u {
  constructor() {
    // 事件存储：key=事件类型，value=回调函数数组
    h(this, "_events", {});
  }
  /**
   * 绑定事件
   * @param type 事件类型
   * @param handler 回调函数
   * @returns 自身实例（支持链式调用）
   */
  on(t, e) {
    if (typeof e != "function")
      throw new TypeError("事件回调必须是函数");
    return this._events[t] || (this._events[t] = []), this._events[t].includes(e) || this._events[t].push(e), this;
  }
  /**
   * 解绑事件
   * @param type 事件类型（不传则解绑所有事件）
   * @param handler 回调函数（不传则解绑该类型下所有事件）
   * @returns 自身实例（支持链式调用）
   */
  off(t, e) {
    if (!t)
      return this._events = {}, this;
    const n = this._events[t];
    if (!n) return this;
    if (!e)
      return n.length = 0, this;
    const i = n.findIndex((r) => r === e);
    return i !== -1 && n.splice(i, 1), this;
  }
  /**
   * 触发事件
   * @param type 事件类型
   * @param args 传递给回调的参数（可多个）
   * @returns 自身实例（支持链式调用）
   */
  emit(t, ...e) {
    var i;
    return (((i = this._events[t]) == null ? void 0 : i.slice()) || []).forEach((r) => {
      try {
        r(...e);
      } catch (o) {
        console.error(`[EventEmitter 错误] 事件类型: ${String(t)}`, o);
      }
    }), this;
  }
  /**
   * 检查是否有指定类型的事件绑定
   * @param type 事件类型
   * @returns 是否存在绑定
   */
  hasEvent(t) {
    var e;
    return !!((e = this._events[t]) != null && e.length);
  }
  /**
   * 获取指定类型的所有事件回调
   * @param type 事件类型
   * @returns 回调函数数组（只读副本）
   */
  getHandlers(t) {
    var e;
    return ((e = this._events[t]) == null ? void 0 : e.slice()) || [];
  }
}
export {
  u as EventEmitter
};
