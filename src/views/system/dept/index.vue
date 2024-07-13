<script setup lang="tsx" name="DeptManage">
import { ref } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import ProTable from "@/components/ProTable/index.vue";
import { getDeptsApi, updateDeptApi, addDeptApi, deleteDeptApi } from "@/api/modules/system/dept";
import { ElMessage, ElMessageBox } from "element-plus";

const proTable = ref();

// 表格配置项
const columns: ColumnProps[] = [
  {
    prop: "name",
    label: "部门名称"
  },
  {
    prop: "orderNo",
    label: "排序"
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
    prop: "operation",
    label: "操作"
  }
];

const submitForm = ref({
  id: "",
  name: "",
  orderNo: "",
  parentId: ""
});
const submitFormRef = ref();
const rules = ref({
  name: [{ required: true, message: "请输入部门名称", trigger: "blur" }],
  orderNo: [{ required: true, message: "请输入排序", trigger: "blur" }]
});

const dialogVisible = ref(false);

const handleClose = () => {
  dialogVisible.value = false;
  submitFormRef.value.resetFields();
};

const handleConfirm = () => {
  submitFormRef.value.validate(valid => {
    if (valid) {
      const form = JSON.parse(JSON.stringify(submitForm.value));
      const api = form.id ? updateDeptApi : addDeptApi;
      api(form)
        .then(() => {
          ElMessage.success(`${form.id ? "更新" : "新增"}部门成功`);
          dialogVisible.value = false;
          proTable.value.search();
        })
        .catch(err => {
          console.error(err);
          ElMessage.error(`${form.id ? "更新" : "新增"}部门失败`);
        });
    }
  });
};

const openDeptDialog = (row: any) => {
  dialogVisible.value = true;
  if (row) {
    submitForm.value.id = row.id;
    submitForm.value.name = row.name;
    submitForm.value.orderNo = row.orderNo;
    submitForm.value.parentId = row.parent?.id || null;
  } else {
    submitForm.value = {
      id: "",
      name: "",
      orderNo: "",
      parentId: ""
    };
  }
};

const handleDelete = (row: any) => {
  ElMessageBox.confirm("确定删除该部门吗？", "提示", {
    type: "warning"
  }).then(() => {
    deleteDeptApi(row.id)
      .then(() => {
        ElMessage.success("删除成功");
        proTable.value.search();
      })
      .catch(err => {
        console.error(err);
        ElMessage.error("删除失败");
      });
  });
};
</script>

<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      title="部门列表"
      :indent="20"
      :columns="columns"
      :request-api="getDeptsApi"
      :search-col="4"
      :pagination="false"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" @click="openDeptDialog(null)">新增部门</el-button>
      </template>
      <!-- 菜单图标 -->
      <template #icon="scope">
        <el-icon v-if="scope.row.icon" :size="18">
          <component :is="scope.row.icon"></component>
        </el-icon>
      </template>
      <!-- 菜单操作 -->
      <template #operation="scope">
        <el-button type="primary" link @click="openDeptDialog(scope.row)">编辑</el-button>
        <el-button type="primary" link @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </ProTable>
    <el-dialog v-model="dialogVisible" :title="submitForm.id ? '编辑部门' : '新增部门'" width="30%" @close="handleClose">
      <el-form ref="submitFormRef" :model="submitForm" :rules="rules" label-width="100px">
        <el-form-item v-show="false" label="部门ID" prop="id">
          <el-input v-model="submitForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="submitForm.name" />
        </el-form-item>
        <el-form-item label="排序" prop="orderNo">
          <el-input v-model.number="submitForm.orderNo" />
        </el-form-item>
        <el-form-item label="上级部门" prop="parentId">
          <el-tree-select
            v-model="submitForm.parentId"
            :data="proTable.tableData"
            filterable
            node-key="id"
            check-strictly
            :default-expanded-keys="[submitForm.parentId]"
            :props="{ value: 'id', label: 'name', children: 'children' }"
            clearable
            style="width: 100%"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">提交</el-button>
      </template>
    </el-dialog>
  </div>
</template>
