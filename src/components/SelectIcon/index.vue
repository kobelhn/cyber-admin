<script setup lang="ts" name="SelectIcon">
import { ref, watchEffect, computed } from "vue";
import * as Icons from "@element-plus/icons-vue";
import iconfontIcons from "@/assets/iconfont/iconfont.json";

const props = defineProps<{
  modelValue: string | null;
}>();
const iconValue = ref<string | null>("");
const activeTab = ref<"svg" | "iconfont" | "element">("svg");

// 获取文件夹assets/svg-icons下的所有svg图标
const svgIcons = import.meta.glob("../../assets/svg-icons/*.svg", { eager: true });
// 获取svgIcons的文件名
const svgIconNames = Object.keys(svgIcons).map(key => key.replace("../../assets/svg-icons/", "").replace(".svg", ""));
// 获取文件iconfont/iconfont.scss的所有class
const iconfontIconNames = iconfontIcons.glyphs.map(item => item.font_class);
// 获取所有element-plus图标name
const elementPlusIconNames = Object.keys(Icons);

const searchQuery = ref<string>("");

const filteredSvgIconNames = computed(() => {
  return svgIconNames.filter(name => name.includes(searchQuery.value));
});

const filteredIconfontIconNames = computed(() => {
  return iconfontIconNames.filter(name => name.includes(searchQuery.value));
});

const filteredElementPlusIconNames = computed(() => {
  // element-plus图标的首字母都是大写，自动将searchQuery的首字母转为大写
  const query = searchQuery.value.charAt(0).toUpperCase() + searchQuery.value.slice(1);
  return elementPlusIconNames.filter(name => name.includes(query));
});

const emits = defineEmits(["update:modelValue"]);

const chooseIcon = (name: string) => {
  iconValue.value = activeTab.value + ":" + name;
  emits("update:modelValue", iconValue.value);
};

const emitValue = () => {
  emits("update:modelValue", iconValue.value);
};

const randomAnIcon = () => {
  const activeTabValue = activeTab.value;
  const iconNames =
    activeTabValue === "svg" ? svgIconNames : activeTabValue === "iconfont" ? iconfontIconNames : elementPlusIconNames;
  const randomIndex = Math.floor(Math.random() * iconNames.length);
  iconValue.value = activeTabValue + ":" + iconNames[randomIndex];
  emits("update:modelValue", iconValue.value);
};

watchEffect(() => {
  if (props.modelValue) {
    iconValue.value = props.modelValue;
  } else {
    iconValue.value = "";
  }
});
</script>

<template>
  <el-popover trigger="click" title="选择图标" width="640px" placement="top" @hide="searchQuery = ''">
    <template #reference>
      <div class="flx-align-center">
        <el-input
          v-model="iconValue"
          class="select-icon-input"
          placeholder="选择一个图标"
          clearable
          @change="emitValue"
        ></el-input>
        <cyber-icon v-if="iconValue" class="ml10" :name="iconValue" :size="24" />
      </div>
    </template>
    <div class="flx-justify-between mb10">
      <el-input v-model="searchQuery" placeholder="搜索图标" clearable />
      <el-button class="ml10" type="primary" @click="randomAnIcon">随机一下</el-button>
    </div>
    <el-tabs v-model="activeTab" type="border-card">
      <el-tab-pane style="max-height: 200px; overflow-y: auto" :label="`SVG 图标（${svgIconNames.length}个）`" name="svg">
        <div class="flx-wrap">
          <el-tooltip v-for="icon in filteredSvgIconNames" :key="icon" effect="light">
            <template #content>
              <div class="text-center">{{ icon }}</div>
            </template>
            <cyber-icon class="mr10 mb10" :name="`svg:${icon}`" :size="30" @click="chooseIcon(icon)" />
          </el-tooltip>
        </div>
      </el-tab-pane>
      <el-tab-pane
        style="max-height: 200px; overflow-y: auto"
        :label="`Iconfont 图标(${iconfontIconNames.length}个)`"
        name="iconfont"
      >
        <div class="flx-wrap">
          <el-tooltip v-for="icon in filteredIconfontIconNames" :key="icon" effect="light">
            <template #content>
              <div class="text-center">{{ icon }}</div>
            </template>
            <cyber-icon class="mr10 mb10" :name="`iconfont:${icon}`" :size="30" @click="chooseIcon(icon)" />
          </el-tooltip>
        </div>
      </el-tab-pane>
      <el-tab-pane
        style="max-height: 200px; overflow-y: auto"
        :label="`Element Plus 图标(${elementPlusIconNames.length}个)`"
        name="element"
      >
        <div class="flx-wrap">
          <el-tooltip v-for="icon in filteredElementPlusIconNames" :key="icon" effect="light">
            <template #content>
              <div class="text-center">{{ icon }}</div>
            </template>
            <cyber-icon class="mr10 mb10" :name="`element:${icon}`" :size="30" @click="chooseIcon(icon)" />
          </el-tooltip>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-popover>
</template>
