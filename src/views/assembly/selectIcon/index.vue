<script setup lang="ts" name="selectIcon">
import { ref } from "vue";
import SelectIcon from "@/components/SelectIcon/index.vue";
const iconValue = ref("");
</script>

<template>
  <div class="card content-box">
    <span class="text"> 图标选择器 🍓🍇🍈🍉</span>
    <SelectIcon v-model="iconValue" />
  </div>
</template>

<style scoped lang="scss">
@import "./index.scss";
</style>
