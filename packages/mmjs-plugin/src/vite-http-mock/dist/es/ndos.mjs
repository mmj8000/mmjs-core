import { promises as u } from "node:fs";
import f from "node:path";
import { fileExists as m } from "./utils.mjs";
async function p(r, s = {}) {
  const {
    filter: o = d,
    recursive: l = !1,
    exclude: n
  } = s;
  try {
    const e = [];
    if (!m(r)) return e;
    const a = await u.readdir(r, { withFileTypes: !0 });
    return await Promise.all(a.map(async (i) => {
      const t = f.join(r, i.name);
      if (!(n && n.test(i.name))) {
        if (i.isFile() && o(i, t))
          e.push(t);
        else if (i.isDirectory() && l) {
          const c = await p(t, s);
          e.push(...c);
        }
      }
    })), e;
  } catch (e) {
    return console.error(`Error reading directory ${r}:`, e), [];
  }
}
function d(r, s) {
  return r.name.includes("$id");
}
export {
  p as enhancedFindFiles
};
