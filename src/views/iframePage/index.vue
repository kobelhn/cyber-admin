<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const src = route.meta.link as string;

defineOptions({
  name: "IFramePage"
});

const loading = ref(true);

const onFrameLoad = () => {
  loading.value = false;
};
</script>
<template>
  <div v-loading="loading" class="iframe-box">
    <iframe class="iframe-box" :src="src" @load="onFrameLoad" />
  </div>
</template>

<style lang="scss" scoped>
.iframe-box {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
