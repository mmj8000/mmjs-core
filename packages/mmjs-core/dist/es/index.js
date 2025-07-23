import "./hooks/index.js";
import "./client/index.js";
import "./components/index.js";
import "./utils/index.js";
import { useAxiosCancellation as a } from "./hooks/axiosCancellation.js";
import { useMergeRequest as i } from "./hooks/mergeRequest.js";
import { useDef as l, useVShallowRef as x } from "./hooks/vue.ref.js";
import { useAsyncIntervalFn as c } from "./hooks/interval.js";
import { WebSocketClient as S } from "./client/ws.js";
import { BANDWIDTH_PRESETS as d } from "./components/optimizedVideoPlayer/const.js";
import { default as I } from "./components/intersectionDraw/intersectionDraw.js";
import { default as R } from "./components/optimizedVideoPlayer/optimizedVideoPlayer.js";
import { keepDecimals as k } from "./utils/format.js";
import { getScaleOption as y, scale as C, setScaleOption as E } from "./utils/scale.js";
export {
  d as BANDWIDTH_PRESETS,
  I as IntersectionDraw,
  R as OptimizedVideoPlayer,
  S as WebSocketClient,
  y as getScaleOption,
  k as keepDecimals,
  C as scale,
  E as setScaleOption,
  c as useAsyncIntervalFn,
  a as useAxiosCancellation,
  l as useDef,
  i as useMergeRequest,
  x as useVShallowRef
};
