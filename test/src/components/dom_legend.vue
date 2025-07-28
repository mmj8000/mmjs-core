<template>
  <button @click="test = !test">切换1</button>
  <Demo :option="pieOption" v-if="test" />
  <Demo :option="lineOption" />
  <Demo :option="barOption" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { pieOption, lineOption, barOption } from "./const";
import Demo from "./demo.vue";
const test = ref(true);
</script>
<style lang="less" scoped></style>
