<template>
  <DomLegend />
</template>

<script setup lang="ts">
import DomLegend from "./components/dom_legend.vue";
import { parseUrlParams } from 'mmjs-share/parseUrlParams';
// import { parseUrlParams } from 'mmjs-core/utils/parseUrlParams';
// import type {
//   CssomLegendInstanceType,
//   BandwidthOption,
//   FilterTemplateFnParameters,
// } from "mmjs-core/types/components";
// 测试用例
// const testCases = [
//   { url: "https://example.com/?test=has#/path?without=value", desc: "混合参数" },
//   { url: "https://example.com/#/path?hash=param", desc: "仅hash参数" },
//   { url: "https://example.com/?main=param", desc: "仅主参数" },
//   { url: "https://example.com/path", desc: "无参数" },
//   { url: "https://example.com/?a=1&a=2&c=abc#/path?b=3&b=4&d", desc: "重复参数混合" },
//   { url: "https://example.com/?flag#/path?another", desc: "无值参数" }
// ];

// testCases.forEach(({ url, desc }) => {
//   console.log(`测试用例: ${desc}`);
//   console.log(`URL: ${url}`);
//   console.log('包含hash参数:', parseUrlParams(url));
//   console.log('不包含hash参数:', parseUrlParams(url, { includeHashParams: false }));
//   console.log('---');
// });

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
