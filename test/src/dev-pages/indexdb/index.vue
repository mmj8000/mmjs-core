<template>
  <div>indexdb</div>
</template>
<script lang="ts" setup>
import { idb } from "mmjs-core/idb";

console.log(idb);
async function main() {
  const db = await idb.open();
  console.log(db);
}
main();
</script>
