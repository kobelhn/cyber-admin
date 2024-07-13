<script setup lang="ts">
import { getServeStatApi } from "@/api/modules/system/monitor";
import { ref } from "vue";

const data = ref({});

getServeStatApi().then(res => {
  data.value = res.data;
});
</script>

<template>
  <div>{{ data }}</div>
</template>
