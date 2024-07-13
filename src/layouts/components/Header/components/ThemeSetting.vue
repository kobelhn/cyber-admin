<script setup lang="ts">
import mittBus from "@/utils/mittBus";
const openDrawer = () => {
  mittBus.emit("openThemeDrawer");
};
</script>

<template>
  <div class="theme-setting">
    <cyber-icon name="iconfont:skin" class="toolBar-icon" @click="openDrawer" />
  </div>
</template>
