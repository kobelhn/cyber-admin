<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import screenfull from "screenfull";

const isFullscreen = ref(screenfull.isFullscreen);

onMounted(() => {
  screenfull.on("change", () => {
    if (screenfull.isFullscreen) isFullscreen.value = true;
    else isFullscreen.value = false;
  });
});

const handleFullScreen = () => {
  if (!screenfull.isEnabled) ElMessage.warning("当前您的浏览器不支持全屏 ❌");
  screenfull.toggle();
};
</script>

<template>
  <div class="fullscreen">
    <cyber-icon
      :name="isFullscreen ? 'iconfont:fullscreen-exit' : 'iconfont:fullscreen'"
      class="toolBar-icon"
      @click="handleFullScreen"
    />
  </div>
</template>
