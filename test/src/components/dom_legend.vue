<template>
  <Demo :option="pieOption" />
  <Demo :option="lineOption" />
  <Demo :option="barOption" />
</template>

<script lang="ts" setup>
import { pieOption, lineOption, barOption } from "./const";
import Demo from "./demo.vue";
</script>
<style lang="less" scoped></style>
