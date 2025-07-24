import "./hooks/index.js";
import "./client/index.js";
import "./components/index.js";
import "./utils/index.js";
import { useAxiosCancellation as f } from "./hooks/axiosCancellation.js";
import { useMergeRequest as i } from "./hooks/mergeRequest.js";
import { useDef as s, useVShallowRef as x } from "./hooks/vue.ref.js";
import { useAsyncIntervalFn as u } from "./hooks/interval.js";
import { useWheel as S } from "./hooks/mouse.js";
import { WebSocketClient as d } from "./client/ws.js";
import { BANDWIDTH_PRESETS as A } from "./components/optimizedVideoPlayer/const.js";
import { default as O } from "./components/intersectionDraw/intersectionDraw.js";
import { default as g } from "./components/optimizedVideoPlayer/optimizedVideoPlayer.js";
import { keepDecimals as k } from "./utils/format.js";
import { getScaleOption as y, scale as z, setScaleOption as C } from "./utils/scale.js";
import { normalizeURL as P } from "./utils/url.js";
export {
  A as BANDWIDTH_PRESETS,
  O as IntersectionDraw,
  g as OptimizedVideoPlayer,
  d as WebSocketClient,
  y as getScaleOption,
  k as keepDecimals,
  P as normalizeURL,
  z as scale,
  C as setScaleOption,
  u as useAsyncIntervalFn,
  f as useAxiosCancellation,
  s as useDef,
  i as useMergeRequest,
  x as useVShallowRef,
  S as useWheel
};
