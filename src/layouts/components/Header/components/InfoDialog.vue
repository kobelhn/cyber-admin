<script setup lang="ts">
import { useUserStore } from "@/stores/modules/user";
import { computed, ref } from "vue";

const userStore = useUserStore();
const dialogVisible = ref(false);
const openDialog = () => {
  dialogVisible.value = true;
};

const userInfo = computed(() => userStore.userInfo);

defineExpose({ openDialog });
</script>

<template>
  <el-dialog v-model="dialogVisible" title="个人信息" width="500px" draggable>
    <el-descriptions title="基本信息">
      <el-descriptions-item label="用户名">{{ userInfo.nickname }}</el-descriptions-item>
      <el-descriptions-item label="手机/电话">{{ userInfo.phone }}</el-descriptions-item>
      <el-descriptions-item label="QQ">{{ userInfo.qq }}</el-descriptions-item>
      <el-descriptions-item label="邮箱">{{ userInfo.email }}</el-descriptions-item>
    </el-descriptions>
    <el-descriptions title="角色信息">
      <el-descriptions-item v-for="role in userInfo.roles" :key="role.id" label="角色">{{ role.name }}</el-descriptions-item>
    </el-descriptions>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>
