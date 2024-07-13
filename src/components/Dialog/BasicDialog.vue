<script lang="ts" setup>
import { ref, watch } from "vue";
const props = withDefaults(
  defineProps<{
    visible: boolean;
    showCancel: boolean;
    showConfirm: boolean;
    cancelText: string;
    confirmText: string;
    autoHeight: boolean;
  }>(),
  {
    visible: false,
    showCancel: true,
    showConfirm: true,
    cancelText: "",
    confirmText: "",
    autoHeight: false
  }
);

const dialogVisible = ref(props.visible);

watch(
  () => props.visible,
  val => {
    dialogVisible.value = val;
  }
);

const emit = defineEmits(["update:visible", "confirm"]);

const handleClose = () => {
  emit("update:visible", false);
};

const handleConfirm = () => {
  emit("confirm");
  handleClose(); // Optionally close the dialog on confirm
};
</script>

<template>
  <el-dialog v-model="dialogVisible" v-bind="$attrs" class="cyber-basic-dialog" destroy-on-close @close="handleClose">
    <div
      class="cyber-basic-dialog__body"
      :style="`max-height: ${autoHeight ? 'auto' : $attrs.height ? $attrs.height + 'px' : '520px'}`"
    >
      <slot></slot>
    </div>
    <template #footer>
      <div class="cyber-basic-dialog__footer">
        <el-button v-if="showCancel" @click="handleClose">{{ cancelText || $t("common.cancel") }}</el-button>
        <el-button v-if="showConfirm" type="primary" @click="handleConfirm">{{ confirmText || $t("common.confirm") }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.cyber-basic-dialog {
  &__body {
    padding: 20px;
    overflow: auto;
  }
  &__footer {
    display: flex;
    justify-content: flex-end;
    padding: 10px 20px;
  }
}
</style>
