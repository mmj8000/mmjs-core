<template></template>

<script setup lang="ts">
import {
  OptimizedVideoPlayer,
  OptimizedVideoPlayerInstanceType,
} from "mmjs-core/components";
import {
  IntersectionDraw,
  useAsyncIntervalFn,
  BANDWIDTH_PRESETS,
  type BandwidthOption,
} from "mmjs-core";
const b: BandwidthOption = {
  value: 0,
  label: "",
  description: "",
};
console.log(OptimizedVideoPlayer, IntersectionDraw, BANDWIDTH_PRESETS, b);
import { WebSocketClient } from "mmjs-core/client/ws";
console.log(WebSocketClient, "ws");
import { useMergeRequest } from "mmjs-core/hooks/mergeRequest";
console.log(useAsyncIntervalFn, useMergeRequest);
</script>
