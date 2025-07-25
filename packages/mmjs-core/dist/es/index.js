import "./hooks/index.js";
import "./client/index.js";
import "./utils/index.js";
import { useAxiosCancellation as m } from "./hooks/axiosCancellation.js";
import { useMergeRequest as f } from "./hooks/mergeRequest.js";
import { useDef as i, useRestRef as x, useVShallowRef as a } from "./hooks/vue.ref.js";
import { useAsyncIntervalFn as u } from "./hooks/interval.js";
import { useWheel as R } from "./hooks/mouse.js";
import { WebSocketClient as g } from "./client/ws.js";
import { keepDecimals as k } from "./utils/format.js";
import { getScaleOption as C, scale as D, setScaleOption as O } from "./utils/scale.js";
import { normalizeURL as b } from "./utils/url.js";
export {
  g as WebSocketClient,
  C as getScaleOption,
  k as keepDecimals,
  b as normalizeURL,
  D as scale,
  O as setScaleOption,
  u as useAsyncIntervalFn,
  m as useAxiosCancellation,
  i as useDef,
  f as useMergeRequest,
  x as useRestRef,
  a as useVShallowRef,
  R as useWheel
};
