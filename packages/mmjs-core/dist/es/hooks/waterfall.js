import { ref as n, watchEffect as r, unref as a } from "vue";
function s(u, f) {
  const o = n([]);
  return r(() => {
    var c;
    const t = a(f);
    o.value = [];
    for (let e = 0; e < t; e++)
      o.value[e] = {
        cols: [],
        id: `id_${e}`,
        colIndex: e
      };
    let l = 0;
    (c = u.value) == null || c.forEach((e) => {
      o.value[l].cols.push(e), l++, l >= t && (l = 0);
    });
  }), {
    colList: o
  };
}
export {
  s as useWaterfallColumns
};
