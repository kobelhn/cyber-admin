<script setup lang="ts">
import { ref } from "vue";
import AssemblySize from "./components/AssemblySize.vue";
import Language from "./components/Language.vue";
import SearchMenu from "./components/SearchMenu.vue";
import ThemeSetting from "./components/ThemeSetting.vue";
import Message from "./components/Message.vue";
import Fullscreen from "./components/Fullscreen.vue";
import Avatar from "./components/Avatar.vue";
import GuideButton from "./components/GuideButton.vue";

const showButtons = ref(true);
</script>

<template>
  <div class="tool-bar-ri">
    <div class="header-icon">
      <cyber-icon v-if="showButtons" title="隐藏" name="element:ArrowRightBold" @click="showButtons = false" />
      <cyber-icon v-else title="展开" name="element:ArrowLeftBold" @click="showButtons = true" />
      <template v-if="showButtons">
        <GuideButton id="guideButton" />
        <AssemblySize id="assemblySize" />
        <Language id="language" />
        <SearchMenu id="searchMenu" />
        <ThemeSetting id="themeSetting" />
        <Message id="message" />
        <Fullscreen id="fullscreen" />
      </template>
    </div>
    <Avatar />
  </div>
</template>

<style scoped lang="scss">
.tool-bar-ri {
  display: flex;
  align-items: center;
  justify-content: center;
  .header-icon {
    display: flex;
    align-items: center;
    margin-right: 20px;
    & > * {
      margin-left: 21px;
      color: var(--el-header-text-color);
    }
  }
}
</style>
