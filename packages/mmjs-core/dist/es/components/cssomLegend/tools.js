function m(e = "") {
  let n = 1 / 0, a = 1 / 0, t = -1 / 0, i = -1 / 0;
  const f = e.match(/[a-df-z][^a-df-z]*/gi);
  return f == null || f.forEach((x) => {
    const h = x.slice(1).trim().split(/[\s,]+/).map(Number);
    for (let s = 0; s < h.length; s += 2) {
      const c = h[s], l = h[s + 1];
      isNaN(c) || (n = Math.min(n, c)), isNaN(l) || (a = Math.min(a, l)), isNaN(c) || (t = Math.max(t, c)), isNaN(l) || (i = Math.max(i, l));
    }
  }), `${n} ${a} ${t - n + 2} ${i - a + 2}`;
}
function o(e) {
  const n = [], a = /\{([^}|]+)\|([^}]+)\}/g;
  let t, i = 0;
  for (; (t = a.exec(e)) !== null; )
    t.index > i && n.push({
      type: "text",
      content: e.substring(i, t.index)
    }), n.push({
      type: "rich",
      name: t[1],
      content: t[2] ?? ""
    }), i = t.index + t[0].length;
  return i < e.length && n.push({
    type: "text",
    content: e.substring(i)
  }), n;
}
export {
  m as calculateViewBox,
  o as parseRichFormatString
};
