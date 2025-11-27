var _ = Object.defineProperty;
var x = (b, l, t) => l in b ? _(b, l, { enumerable: !0, configurable: !0, writable: !0, value: t }) : b[l] = t;
var g = (b, l, t) => x(b, typeof l != "symbol" ? l + "" : l, t);
import { EventEmitter as O } from "../event/emitter.js";
class D extends O {
  constructor(t) {
    var e, r, o;
    super();
    g(this, "_options");
    g(this, "_idb");
    g(this, "_table");
    g(this, "_tableOptions");
    if (this._options = t, this._tableOptions = {
      name: ((e = t == null ? void 0 : t.table) == null ? void 0 : e.name) ?? this.constructor.name,
      options: (r = t == null ? void 0 : t.table) == null ? void 0 : r.options,
      transaction: (o = t.table) == null ? void 0 : o.transaction
    }, !this._tableOptions.name)
      throw new TypeError("表名不能为空");
    this._idb = this._createDatabase(), this._table = this._createTable();
  }
  // Getter 方法
  get options() {
    return this._options;
  }
  get idb() {
    return this._idb;
  }
  get table() {
    return this._table;
  }
  _createDatabase() {
    return new Promise((t, e) => {
      var d, u, w, $;
      if (!window.indexedDB) {
        const n = new Error("浏览器不支持 IndexedDB");
        return this.emit("error", { error: n }), e(n);
      }
      const r = ((u = (d = this._options) == null ? void 0 : d.database) == null ? void 0 : u.name) ?? "base", o = (($ = (w = this._options) == null ? void 0 : w.database) == null ? void 0 : $.version) ?? 1, i = indexedDB.open(r, o);
      i.onupgradeneeded = (n) => {
        var S;
        const a = n.target.result, { name: c, options: j } = this._tableOptions ?? {};
        if (!c) {
          const s = new Error("表名未定义");
          this.emit("error", {
            error: s,
            originalEvent: n
          }), e(s);
          return;
        }
        let h;
        a.objectStoreNames.contains(c) ? (h = n.target.transaction.objectStore(c), console.log(`[IndexedDB] 复用已有表：${c}`)) : (h = a.createObjectStore(c, j), console.log(`[IndexedDB] 创建新表：${c}`));
        const m = ((S = this.options.index) == null ? void 0 : S.list) ?? [], y = new Set(m.map((s) => s.name));
        Array.from(h.indexNames).forEach((s) => {
          y.has(s) || (h.deleteIndex(s), console.log(`[IndexedDB] 删除废弃索引：${s}`));
        }), m.forEach((s) => {
          h.indexNames.contains(s.name) || (h.createIndex(s.name, s.keyPath, s.options), console.log(`[IndexedDB] 创建新索引：${s.name}`));
        }), this.emit("upgradeneeded", {
          db: a,
          oldVersion: n.oldVersion,
          newVersion: n.newVersion,
          originalEvent: n
        });
      }, i.onerror = (n) => {
        const a = n.target.error;
        console.error("[IndexedDB] 初始化错误:", a), this.emit("error", { error: a, originalEvent: n }), e(a);
      }, i.onsuccess = (n) => {
        const a = n.target.result;
        console.log(`[IndexedDB] 打开成功，版本：${a.version}`), a.onclose = (c) => {
          console.log("[IndexedDB] 数据库已关闭"), this.emit("close", { originalEvent: c });
        }, a.onabort = (c) => {
          console.log("[IndexedDB] 事务已中断"), this.emit("abort", { originalEvent: c });
        }, this.emit("success", {
          db: a,
          originalEvent: n
        }), t(a);
      };
    });
  }
  async _createTable() {
    if (!this._tableOptions) {
      const r = new Error("表配置参数错误");
      return this.emit("error", { error: r }), Promise.reject(r);
    }
    const t = await this._idb, { name: e } = this._tableOptions;
    return t.transaction(e, "readonly").objectStore(e);
  }
  async $getObjectStore(t = "readonly") {
    const e = await this._idb, { name: r } = this._tableOptions ?? {}, o = e.transaction([r], t);
    return o.onerror = (i) => {
      const d = i.target.error;
      this.emit("error", { error: d, originalEvent: i });
    }, o.onabort = (i) => {
      this.emit("abort", { originalEvent: i });
    }, o.objectStore(r);
  }
  $wait(t) {
    return new Promise((e, r) => {
      try {
        const o = (i) => {
          i.onsuccess = () => e(i), i.onerror = (d) => {
            const u = d.target.error;
            this.emit("error", { error: u, originalEvent: d }), r(u);
          };
        };
        t instanceof Promise ? t.then(o).catch(r) : o(t);
      } catch (o) {
        this.emit("error", { error: o }), r(o);
      }
    });
  }
  async $add(t, e) {
    const r = await this.$getObjectStore("readwrite");
    return this.$wait(r.add(t, e));
  }
  async $delete(t) {
    const e = await this.$getObjectStore("readwrite");
    return this.$wait(e.delete(t));
  }
  async $deleteIndex(t) {
    return (await this.$getObjectStore("readwrite")).deleteIndex(t);
  }
  async $put(t, e) {
    const r = await this.$getObjectStore("readwrite");
    return this.$wait(r.put(t, e));
  }
  async $get(t) {
    const e = await this.$getObjectStore("readonly");
    return (await this.$wait(e.get(t))).result;
  }
  async $count(t) {
    const e = await this.$getObjectStore("readonly");
    return (await this.$wait(e.count(t))).result;
  }
  async $openCursor(t, e) {
    const r = await this.$getObjectStore("readonly");
    return this.$wait(r.openCursor(t, e));
  }
  async $getAll(t, e) {
    const r = await this.$getObjectStore("readonly");
    return (await this.$wait(
      r.getAll(t, e)
    )).result;
  }
  async $getAllKeys(t, e) {
    const r = await this.$getObjectStore("readonly");
    return (await this.$wait(
      r.getAllKeys(t, e)
    )).result;
  }
  async $clear() {
    const t = await this.$getObjectStore("readwrite");
    return this.$wait(t.clear());
  }
  async $idbIndex(t) {
    return (await this.$getObjectStore("readonly")).index(t);
  }
  async $close() {
    (await this.idb).close();
  }
}
export {
  D as WebIdbDatabase
};
