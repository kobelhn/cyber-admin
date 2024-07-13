<script setup lang="tsx" name="UserManage">
import { ref } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import ProTable from "@/components/ProTable/index.vue";
import { getStorageListApi, deleteStorageFileApi } from "@/api/modules/tool";

const proTable = ref();

// 表格配置项
const columns: ColumnProps[] = [
  {
    type: "index",
    width: 60,
    label: "序号"
  },
  {
    prop: "name",
    label: "文件名"
  },
  {
    prop: "extName",
    label: "文件后缀名"
  },
  {
    prop: "size",
    label: "文件大小"
  },
  {
    prop: "type",
    label: "文件类型"
  },
  {
    prop: "createAt",
    label: "上传时间"
  },
  {
    prop: "username",
    label: "上传人"
  },
  {
    prop: "operation",
    label: "操作",
    width: 240,
    fixed: "right"
  }
];

const deleteFile = (id: number) => {
  deleteStorageFileApi({
    ids: [id]
  }).then(() => {
    proTable.value!.search();
  });
};
</script>

<template>
  <div class="main-box">
    <div class="table-box">
      <ProTable ref="proTable" title="用户列表" :indent="20" :columns="columns" :request-api="getStorageListApi" :search-col="4">
        <!-- 菜单操作 -->
        <template #operation="scope">
          <el-button type="primary" link @click="deleteFile(scope.row.id)">删除</el-button>
        </template>
      </ProTable>
    </div>
  </div>
</template>
