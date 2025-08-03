import { promises as u } from "node:fs";
import f from "node:path";
async function d(e, i = {}) {
  const {
    filter: o = p,
    recursive: l = !1,
    exclude: a
  } = i;
  try {
    const s = await u.readdir(e, { withFileTypes: !0 }), t = [];
    return await Promise.all(s.map(async (r) => {
      const n = f.join(e, r.name);
      if (!(a && a.test(r.name))) {
        if (r.isFile() && o(r, n))
          t.push(n);
        else if (r.isDirectory() && l) {
          const c = await d(n, i);
          t.push(...c);
        }
      }
    })), t;
  } catch (s) {
    return console.error(`Error reading directory ${e}:`, s), [];
  }
}
function p(e, i) {
  return e.name.includes("$id");
}
export {
  d as enhancedFindFiles
};
