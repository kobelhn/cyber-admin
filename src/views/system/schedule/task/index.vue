<script setup lang="tsx" name="menuMange">
import { ref } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import ProTable from "@/components/ProTable/index.vue";
import { getTasksListApi } from "@/api/modules/system/schedule";

const proTable = ref();

// 表格配置项
const columns: ColumnProps[] = [
  {
    prop: "name",
    label: "任务名称",
    width: 120
  }
];
</script>

<template>
  <div class="table-box">
    <ProTable ref="proTable" title="任务列表" :indent="20" :columns="columns" :request-api="getTasksListApi" :search-col="4">
    </ProTable>
  </div>
</template>
