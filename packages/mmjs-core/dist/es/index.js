import "./hooks/index.js";
import "./client/index.js";
import "./utils/index.js";
import { useAxiosCancellation as p } from "./hooks/axiosCancellation.js";
import { useMergeRequest as l } from "./hooks/mergeRequest.js";
import { useDef as f, useRestRef as i, useVShallowRef as n } from "./hooks/vue.ref.js";
import { useAsyncIntervalFn as u } from "./hooks/interval.js";
import { useWheel as R } from "./hooks/mouse.js";
import { WebSocketClient as U } from "./client/ws.js";
import { keepDecimals as h, normalizeNumUnit as k } from "./utils/format.js";
import { getScaleOption as A, scale as C, setScaleOption as D } from "./utils/scale.js";
import { normalizeURL as W } from "./utils/url.js";
import { parseUrlParams as q } from "./utils/parseUrlParams.js";
export {
  U as WebSocketClient,
  A as getScaleOption,
  h as keepDecimals,
  k as normalizeNumUnit,
  W as normalizeURL,
  q as parseUrlParams,
  C as scale,
  D as setScaleOption,
  u as useAsyncIntervalFn,
  p as useAxiosCancellation,
  f as useDef,
  l as useMergeRequest,
  i as useRestRef,
  n as useVShallowRef,
  R as useWheel
};
