<script setup lang="tsx" name="RoleManage">
import { ref } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import ProTable from "@/components/ProTable/index.vue";
import { getRolesApi, deleteRoleApi } from "@/api/modules/system/role";
import { ElMessageBox } from "element-plus";
import RoleDialog from "./components/RoleDialog.vue";

const proTable = ref();

const currentRow = ref<{ [key: string]: any }>({});
const roleDialogVisible = ref(false);

// 表格配置项
const columns: ColumnProps[] = [
  {
    prop: "name",
    label: "角色名称"
  },
  {
    prop: "value",
    label: "角色值"
  },
  {
    prop: "remark",
    label: "备注"
  },
  {
    prop: "status",
    label: "状态",
    tag: true,
    enum: [
      { label: "停用", value: 0, tagType: "info" },
      { label: "启用", value: 1, tagType: "success" }
    ]
  },
  {
    prop: "createdAt",
    label: "创建时间"
  },
  {
    prop: "creator",
    label: "创建人"
  },
  {
    prop: "updatedAt",
    label: "更新时间"
  },
  {
    prop: "updater",
    label: "更新人"
  },
  {
    prop: "default",
    label: "默认"
  },
  {
    prop: "operation",
    label: "操作",
    width: 180
  }
];

const deleteCurrentRole = (id: number | string) => {
  ElMessageBox.confirm("确定删除该角色吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteRoleApi(id).then(() => {
      proTable.value!.search();
    });
  });
};

const refreshTable = () => {
  proTable.value!.search();
};

const openRoleDialog = (row: any = {}) => {
  currentRow.value = row;
  roleDialogVisible.value = true;
};
</script>

<template>
  <div class="table-box">
    <ProTable ref="proTable" title="角色列表" :indent="20" :columns="columns" :request-api="getRolesApi" :search-col="4">
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" @click="openRoleDialog()">新增角色</el-button>
      </template>
      <!-- 菜单操作 -->
      <template #operation="scope">
        <template v-if="scope.row.id !== 1">
          <el-button type="primary" link @click="openRoleDialog(scope.row)">编辑</el-button>
          <el-button type="primary" link @click="deleteCurrentRole(scope.row.id)">删除</el-button>
        </template>
      </template>
    </ProTable>
    <RoleDialog v-model="roleDialogVisible" :role-info="currentRow" @refresh="refreshTable" />
  </div>
</template>
