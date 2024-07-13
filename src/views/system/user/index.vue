<script setup lang="tsx" name="UserManage">
import { ref, reactive } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import ProTable from "@/components/ProTable/index.vue";
import UserDialog from "./components/UserDialog.vue";
import TreeFilter from "@/components/TreeFilter/index.vue";
import { getUserListApi, deleteUserApi, updateUserPasswordApi } from "@/api/modules/system/user";
import { getDeptsApi } from "@/api/modules/system/dept";
import { ElMessage, ElMessageBox } from "element-plus";

const proTable = ref();

const treeFilterData = ref<any>([]);
const initParam = reactive({ deptId: "" });
const userDialogVisible = ref(false);
const currentRow = ref<{ [key: string]: any }>({});

const getTreeFilter = async () => {
  const { data } = await getDeptsApi();
  treeFilterData.value = data;
};

getTreeFilter();

const changeTreeFilter = (val: string) => {
  proTable.value!.pageable.pageNum = 1;
  initParam.deptId = val;
};

const deleteUser = (id: number) => {
  ElMessageBox.confirm("确定删除该用户吗？", {
    title: "提示",
    type: "warning",
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    confirmButtonClass: "el-button--danger",
    callback: (action: string) => {
      if (action === "confirm") {
        deleteUserApi(id).then(() => {
          ElMessage.success("删除成功");
          refreshTable();
        });
      }
    }
  });
};

const batchDeleteUser = () => {
  const ids = proTable.value!.selectedListIds;
  ElMessageBox.confirm("确定删除选中用户吗？", {
    title: "提示",
    type: "warning",
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    confirmButtonClass: "el-button--danger",
    callback: (action: string) => {
      if (action === "confirm") {
        deleteUserApi(ids.join(",")).then(() => {
          ElMessage.success("删除成功");
          refreshTable();
        });
      }
    }
  });
};

const openUserDialog = (row: any = {}) => {
  currentRow.value = row;
  if (row.id) {
    currentRow.value.deptId = row.dept?.id;
    currentRow.value.roleIds = row.roles?.map((item: any) => item.id);
  }
  userDialogVisible.value = true;
};

const modifyUserPassword = (row: any) => {
  ElMessageBox.prompt("请输入新密码", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    inputPattern: /^(?!\d+$)(?![a-z]+$)[0-9A-Z]{6,20}$/i,
    inputErrorMessage: "密码必须包含数字和字母，长度在6-20之间"
  }).then(({ value }) => {
    if (value) {
      const params = { id: row.id, password: value };
      updateUserPasswordApi(params).then(() => {
        ElMessage.success("修改密码成功");
        refreshTable();
      });
    }
  });
};

const refreshTable = () => {
  proTable.value!.search();
};

// 表格配置项
const columns: ColumnProps[] = [
  {
    type: "selection",
    width: 50
  },
  {
    type: "index",
    width: 60,
    label: "序号"
  },
  {
    prop: "avatar",
    label: "头像",
    width: 150,
    render: scope => {
      return (
        <el-image
          style="width: 50px; height: 50px; border-radius: 50%"
          src={scope.row.avatar || "/src/assets/images/avatar.gif"}
        />
      );
    }
  },
  {
    prop: "username",
    label: "用户名",
    width: 120,
    search: {
      el: "input"
    }
  },
  {
    prop: "nickname",
    label: "昵称",
    width: 120,
    search: {
      el: "input"
    }
  },
  {
    prop: "dept.name",
    label: "所在部门",
    width: 120,
    tag: true
  },
  {
    prop: "roles",
    label: "所属角色",
    width: 200,
    render: scope => {
      return scope.row.roles.map((item: any) => <el-tag type="warning">{item.name}</el-tag>);
    }
  },
  {
    prop: "email",
    label: "邮箱",
    width: 200
  },
  {
    prop: "phone",
    label: "手机号",
    width: 120,
    search: {
      el: "input"
    }
  },
  {
    prop: "remark",
    label: "备注",
    width: 200
  },
  {
    prop: "status",
    label: "状态",
    enum: [
      { label: "启用", value: 1, tagType: "success" },
      { label: "禁用", value: 0, tagType: "danger" }
    ],
    tag: true
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
    prop: "operation",
    label: "操作",
    width: 240,
    fixed: "right"
  }
];
</script>

<template>
  <div class="main-box">
    <TreeFilter label="name" title="组织架构" :data="treeFilterData" @change="changeTreeFilter" />
    <div class="table-box">
      <ProTable
        ref="proTable"
        title="用户列表"
        :indent="20"
        :columns="columns"
        :request-api="getUserListApi"
        :search-col="4"
        :init-param="initParam"
      >
        <!-- 表格 header 按钮 -->
        <template #tableHeader="scope">
          <el-button type="primary" @click="openUserDialog({})">新增用户</el-button>
          <el-button type="danger" :disabled="!scope.isSelected" @click="batchDeleteUser">删除用户</el-button>
        </template>
        <!-- 菜单图标 -->
        <template #icon="scope">
          <el-icon v-if="scope.row.icon" :size="18">
            <component :is="scope.row.icon"></component>
          </el-icon>
        </template>
        <!-- 菜单操作 -->
        <template #operation="scope">
          <el-button type="primary" link @click="openUserDialog(scope.row)">编辑</el-button>
          <el-button type="primary" link @click="deleteUser(scope.row.id)">删除</el-button>
          <el-button type="primary" link @click="modifyUserPassword(scope.row)">修改密码</el-button>
        </template>
      </ProTable>
    </div>
    <UserDialog v-model="userDialogVisible" :user-info="currentRow" @refresh="refreshTable" />
  </div>
</template>
