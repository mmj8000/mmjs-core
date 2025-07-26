import { normalizeNumUnit as t } from "../../utils/format.js";
import { ecOrientValue as n } from "./help.const.js";
const a = {
  orient(e, r) {
    switch (e) {
      case n.horizontal:
        return "row";
      case n.vertical:
        return "column";
      default:
        return e;
    }
  },
  itemWidth(e, r) {
    return t(e);
  },
  itemHeight(e, r) {
    return t(e);
  },
  itemGap(e, r) {
    return t(e);
  },
  default(e, r) {
    return e;
  }
};
function f(e, r) {
  switch (e.type) {
    case "pie":
      return r.name;
  }
  return r;
}
export {
  f as normalizeLegendName,
  a as transformCss
};
