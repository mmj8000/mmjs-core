import o from "./optimizedVideoPlayer.js";
import { BANDWIDTH_PRESETS as t } from "./const.js";
console.warn(
  " ^0.11.0 版本后，OptimizedVideoPlayer 将来的某个版本弃用默认导出，使用具名导出 "
);
export {
  t as BANDWIDTH_PRESETS,
  o as OptimizedVideoPlayer,
  o as default
};
