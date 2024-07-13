<script setup lang="ts" name="CyberIcon">
import { useGlobalStore } from "@/stores/modules/global";
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    name: string; // 名称
    prefix?: string; // 前缀
    type?: string; // 类型
    size?: number; // 尺寸
    color?: string; // 颜色
    primary?: boolean; // 是否使用主题色
    inherit?: boolean; // 是否继承父组件的样式
  }>(),
  {
    name: "",
    prefix: "icon",
    type: "",
    size: 0,
    color: "",
    primary: false,
    inherit: false
  }
);

const store = useGlobalStore();

const defaultIconSize = computed(() => (store.assemblySize === "default" ? 16 : store.assemblySize === "small" ? 14 : 18));
const defaultPrimaryColor = computed(() => store.primary);

const computedType = computed(() => props.type || (props.name.includes(":") ? props.name.split(":")[0] : "svg"));
const computedIconName = computed(() => (props.name.includes(":") ? props.name.split(":")[1] : props.name));
const computedIconStyle = computed(() => {
  if (props.inherit) return {};
  return {
    width: `${props.size || defaultIconSize.value}px`,
    height: `${props.size || defaultIconSize.value}px`,
    fontSize: `${props.size || defaultIconSize.value}px`,
    color: props.primary ? props.color || defaultPrimaryColor.value : props.color || "inherit"
  };
});

const symbolId = computed(() => `#${props.prefix || "icon"}-${computedIconName.value}`);
const iconfontClass = computed(() => `${props.prefix || "icon"}-${computedIconName.value}`);
</script>

<template>
  <div class="cyber-icon" :style="computedIconStyle">
    <svg v-if="computedType === 'svg'" aria-hidden="true">
      <use :xlink:href="symbolId" />
    </svg>
    <i v-if="computedType === 'iconfont'" :class="`iconfont ${iconfontClass}`" />
    <el-icon v-if="computedType === 'element'">
      <component :is="computedIconName" />
    </el-icon>
  </div>
</template>

<style lang="scss">
.cyber-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg,
  .el-icon > svg {
    width: inherit;
    height: inherit;
    padding: 0;
    margin: 0;
    font-size: inherit;
    line-height: inherit;
    fill: currentColor;
  }
  i.iconfont {
    font-size: inherit;
    color: inherit;
  }
}
</style>
