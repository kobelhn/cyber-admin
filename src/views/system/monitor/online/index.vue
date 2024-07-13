<script setup lang="tsx" name="menuMange">
import { ref } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import ProTable from "@/components/ProTable/index.vue";
import { getOnlineListApi } from "@/api/modules/system/monitor";

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
    <ProTable
      ref="proTable"
      title="在线用户列表"
      :indent="20"
      :columns="columns"
      :request-api="getOnlineListApi"
      :search-col="4"
      :pagination="false"
    >
    </ProTable>
  </div>
</template>
