<template>
  <DomLegend />
</template>

<script setup lang="ts">
import DomLegend from "./components/dom_legend.vue";
// import { throttle, memoize } from "mmjs-core/share";
// import { throttle, memoize } from "mmjs-share/utils";
// const throttledFn = throttle(() => {
//   console.log("Throttled function");
// }, 500);

// // 手动取消节流
// setTimeout(() => {
//   throttledFn.cancel();
// }, 2000);
// const add = (a: number, b: number): number => {
//   console.log("Calculating...");
//   return a + b;
// };

// const memoizedAdd = memoize(add);
// console.log(memoizedAdd(1, 2)); // 输出计算日志
// console.log(memoizedAdd(1, 2)); // 从缓存读取
// import {
//   OptimizedVideoPlayer,
//   OptimizedVideoPlayerInstanceType,
//   IntersectionDraw,
//   BANDWIDTH_PRESETS,
//   type BandwidthOption,
// } from "mmjs-core/components";
// import { useAsyncIntervalFn } from "mmjs-core";
// const b: BandwidthOption = {
//   value: 0,
//   label: "",
//   description: "",
// };
// console.log(OptimizedVideoPlayer, IntersectionDraw, BANDWIDTH_PRESETS, b);
// import { WebSocketClient } from "mmjs-core/client/ws";
// console.log(WebSocketClient, "ws");
// import { useMergeRequest } from "mmjs-core/hooks/mergeRequest";
// console.log(useAsyncIntervalFn, useMergeRequest);
// import { scale, setScaleOption } from "mmjs-core/utils";

// console.log(scale(10), scale("10px"));
// setScaleOption({
//   clientHeight: 500,
// });
// console.log(scale(10), scale("10px"));
</script>
