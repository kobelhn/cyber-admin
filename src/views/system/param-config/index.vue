<script setup lang="tsx" name="menuMange">
import { ref } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import ProTable from "@/components/ProTable/index.vue";
import { getParamConfigListApi } from "@/api/modules/system/param-config";

const proTable = ref();

// 表格配置项
const columns: ColumnProps[] = [
  {
    prop: "name",
    label: "参数名称",
    width: 120
  }
];
</script>

<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      title="参数配置"
      :indent="20"
      :columns="columns"
      :request-api="getParamConfigListApi"
      :search-col="4"
    >
    </ProTable>
  </div>
</template>
