<script setup lang="ts" name="MenuManage">
import { ref } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import ProTable from "@/components/ProTable/index.vue";
import { getMenuListApi, deleteMenuApi } from "@/api/modules/system/menu";
import MenuDialog from "./components/MenuDialog.vue";
import { ElMessageBox } from "element-plus";

const proTable = ref();
const menuDialogVisible = ref(false);

// 表格配置项
const columns: ColumnProps[] = [
  {
    prop: "type",
    label: "菜单类型",
    width: 150,
    enum: [
      { label: "目录", value: 0, tagType: "primary" },
      { label: "菜单", value: 1, tagType: "success" },
      { label: "权限", value: 2, tagType: "info" }
    ],
    tag: true
  },
  { prop: "name", label: "菜单名称", width: 150, search: { el: "input" } },
  { prop: "icon", label: "菜单图标", width: 120 },
  { prop: "path", label: "路由地址", width: 300 },
  { prop: "component", label: "组件路径", width: 300 },
  { prop: "permission", label: "权限标识", width: 200, tag: true },
  { prop: "orderNo", label: "排序", width: 100 },
  {
    prop: "show",
    label: "是否显示",
    width: 100,
    tag: true,
    enum: [
      { label: "显示", value: 1, tagType: "success" },
      { label: "隐藏", value: 0, tagType: "danger" }
    ]
  },
  { prop: "activeMenu", label: "高亮菜单", width: 200 },
  {
    prop: "keepAlive",
    label: "是否缓存",
    width: 100,
    tag: true,
    enum: [
      { label: "是", value: 1, tagType: "success" },
      { label: "否", value: 0, tagType: "danger" }
    ]
  },
  {
    prop: "status",
    label: "状态",
    width: 100,
    tag: true,
    enum: [
      { label: "启用", value: 1, tagType: "success" },
      { label: "禁用", value: 0, tagType: "danger" }
    ]
  },
  {
    prop: "createdAt",
    label: "创建时间",
    width: 200,
    dateFormate: true
  },
  {
    prop: "updatedAt",
    label: "更新时间",
    width: 200,
    dateFormate: true
  },
  {
    prop: "isExt",
    label: "是否外链",
    width: 200,
    tag: true,
    enum: [
      { label: "是", value: true },
      { label: "否", value: false }
    ]
  },
  {
    prop: "extOpenMode",
    label: "外链打开方式",
    width: 200,
    tag: true,
    render: scope => {
      return scope.row.isExt ? (scope.row.extOpenMode === 1 ? "外部打开" : "内部打开") : "--";
    }
  },
  { prop: "operation", label: "操作", width: 250, fixed: "right" }
];

const dialogType = ref<"add" | "edit">("add");
// TODO: 类型需要调整
const treeData = ref<any[]>([]);
const info = ref({});

// 打开新增/编辑菜单弹窗
// TODO: 类型需要调整 row: any
const openMenuDialog = (type: "add" | "edit", row: any) => {
  menuDialogVisible.value = true;
  dialogType.value = type;
  info.value = row;
  treeData.value = [
    {
      id: 0,
      name: "根目录",
      children: proTable.value.tableData
    }
  ];
};

const deleteMenu = (id: number) => {
  ElMessageBox.confirm("确定删除该菜单吗？", "提示", {
    type: "warning"
  }).then(() => {
    deleteMenuApi(id).then(() => {
      refreshTable();
    });
  });
};

const refreshTable = () => {
  proTable.value.search();
};
</script>

<template>
  <div class="table-box">
    <ProTable ref="proTable" title="菜单列表" :indent="20" :columns="columns" :request-api="getMenuListApi" :pagination="false">
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" @click="openMenuDialog('add', {})">新增菜单</el-button>
      </template>
      <!-- 菜单图标 -->
      <template #icon="scope">
        <div class="flx-center">
          <cyber-icon v-if="scope.row.icon" :name="scope.row.icon" />
        </div>
      </template>
      <!-- 菜单操作 -->
      <template #operation="scope">
        <el-button type="primary" link @click="openMenuDialog('edit', scope.row)">编辑</el-button>
        <el-button type="primary" link @click="openMenuDialog('add', scope.row)">新增</el-button>
        <el-button type="primary" link @click="deleteMenu(scope.row.id)">删除</el-button>
      </template>
    </ProTable>
    <menu-dialog
      v-model="menuDialogVisible"
      :extra="{
        type: dialogType,
        info,
        treeData
      }"
      @refresh="refreshTable"
    />
  </div>
</template>
