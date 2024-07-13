<script setup lang="tsx" name="menuMange">
import { ref } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import ProTable from "@/components/ProTable/index.vue";
import { getLogsListApi } from "@/api/modules/system/monitor";

const proTable = ref();

// 表格配置项
const columns: ColumnProps[] = [
  {
    prop: "username",
    label: "用户名称",
    width: 120
  }
];
</script>

<template>
  <div class="table-box">
    <ProTable ref="proTable" title="登录日志" :indent="20" :columns="columns" :request-api="getLogsListApi" :search-col="4">
    </ProTable>
  </div>
</template>
