import "./hooks/index.js";
import "./client/index.js";
import "./components/index.js";
import "./utils/index.js";
import { useAxiosCancellation as f } from "./hooks/axiosCancellation.js";
import { useMergeRequest as a } from "./hooks/mergeRequest.js";
import { useDef as l, useRestRef as x, useVShallowRef as n } from "./hooks/vue.ref.js";
import { useAsyncIntervalFn as c } from "./hooks/interval.js";
import { useWheel as S } from "./hooks/mouse.js";
import { WebSocketClient as d } from "./client/ws.js";
import { BANDWIDTH_PRESETS as I } from "./components/optimizedVideoPlayer/const.js";
import { default as W } from "./components/intersectionDraw/intersectionDraw.js";
import { default as h } from "./components/optimizedVideoPlayer/optimizedVideoPlayer.js";
import { keepDecimals as w } from "./utils/format.js";
import { getScaleOption as z, scale as C, setScaleOption as E } from "./utils/scale.js";
import { normalizeURL as T } from "./utils/url.js";
export {
  I as BANDWIDTH_PRESETS,
  W as IntersectionDraw,
  h as OptimizedVideoPlayer,
  d as WebSocketClient,
  z as getScaleOption,
  w as keepDecimals,
  T as normalizeURL,
  C as scale,
  E as setScaleOption,
  c as useAsyncIntervalFn,
  f as useAxiosCancellation,
  l as useDef,
  a as useMergeRequest,
  x as useRestRef,
  n as useVShallowRef,
  S as useWheel
};
