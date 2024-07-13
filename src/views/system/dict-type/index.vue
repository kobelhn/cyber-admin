<script setup lang="tsx" name="DictTypeManage">
import { ref } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import ProTable from "@/components/ProTable/index.vue";
import {
  getDictTypesApi,
  updateDictTypeApi,
  addDictTypeApi,
  deleteDictTypeApi,
  getDictItemsApi,
  deleteDictItemApi,
  updateDictItemApi,
  addDictItemApi
} from "@/api/modules/system/dict-type";
import { ElMessage, ElMessageBox } from "element-plus";

const proTable = ref();

// 表格配置项
const columns: ColumnProps[] = [
  {
    type: "expand"
  },
  {
    prop: "name",
    label: "字典名称"
  },
  {
    prop: "code",
    label: "字典编码"
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
    prop: "operation",
    label: "操作",
    width: 200,
    fixed: "right"
  }
];

const dictTypeForm = ref({
  code: "",
  name: "",
  status: 1,
  id: "",
  remark: ""
});
const dictTypeFormRules = {
  code: [{ required: true, message: "请输入字典编码", trigger: "blur" }],
  name: [{ required: true, message: "请输入字典名称", trigger: "blur" }]
};
const dictTypeDialogVisible = ref(false);
const dictTypeFormRef = ref();

const openDictTypeDialog = (row: any) => {
  if (row) {
    dictTypeForm.value.code = row.code;
    dictTypeForm.value.name = row.name;
    dictTypeForm.value.status = row.status;
    dictTypeForm.value.remark = row.remark;
    dictTypeForm.value.id = row.id;
  } else {
    dictTypeForm.value = {
      code: "",
      name: "",
      status: 1,
      id: "",
      remark: ""
    };
  }
  dictTypeDialogVisible.value = true;
};

const handleCloseOfDictTypeDialog = () => {
  dictTypeDialogVisible.value = false;
  dictTypeFormRef.value.resetFields();
};

const handleConfirmOfDictTypeDialog = () => {
  dictTypeFormRef.value.validate(valid => {
    if (valid) {
      const form = JSON.parse(JSON.stringify(dictTypeForm.value));
      const api = form.id ? updateDictTypeApi : addDictTypeApi;
      api(form)
        .then(() => {
          ElMessage.success(`${form.id ? "更新" : "新增"}字典成功`);
          dictTypeDialogVisible.value = false;
          proTable.value.search();
        })
        .catch(() => {
          ElMessage.error(`${form.id ? "更新" : "新增"}字典失败`);
        });
    }
  });
};

const deleteDictType = (row: any) => {
  ElMessageBox.confirm("确定删除该字典吗？", "提示", {
    type: "warning"
  }).then(() => {
    deleteDictTypeApi(row.id)
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

const handleDictTypeList = (data: any) => {
  data.items.forEach((it: any) => (it.expand = false));
  return data;
};

const handleExpandChange = (row: any) => {
  row.expand = !row.expand;
};

const dictItemDialogVisible = ref(false);
const dictItemForm = ref<{
  label: string;
  orderNo: number;
  status: number;
  typeId: number | string;
  value: string;
  id: number | string;
  remark: string;
}>({
  label: "",
  orderNo: 0,
  status: 1,
  typeId: "",
  value: "",
  id: "",
  remark: ""
});
const dictItemFormRules = {
  label: [{ required: true, message: "请输入字典项标签", trigger: "blur" }],
  value: [{ required: true, message: "请输入字典项值", trigger: "blur" }]
};
const dictItemFormRef = ref();
const proTableRefs = ref({});

const setProTableRef = (typeId: number, el: any) => {
  proTableRefs.value[typeId] = el;
};

const openDictItemDialog = (row: any, typeId: number) => {
  if (row) {
    dictItemForm.value.label = row.label;
    dictItemForm.value.orderNo = row.orderNo;
    dictItemForm.value.status = row.status;
    dictItemForm.value.typeId = typeId;
    dictItemForm.value.value = row.value;
    dictItemForm.value.id = row.id;
    dictItemForm.value.remark = row.remark;
  } else {
    dictItemForm.value = {
      label: "",
      orderNo: 0,
      status: 1,
      typeId: typeId,
      value: "",
      id: "",
      remark: ""
    };
  }
  dictItemDialogVisible.value = true;
};

const handleCloseOfDictItemDialog = () => {
  dictItemDialogVisible.value = false;
  dictItemFormRef.value.resetFields();
};

const handleConfirmOfDictItemDialog = () => {
  dictItemFormRef.value.validate(valid => {
    if (valid) {
      const form = JSON.parse(JSON.stringify(dictItemForm.value));
      const api = form.id ? updateDictItemApi : addDictItemApi;
      api(form)
        .then(() => {
          ElMessage.success(`${form.id ? "更新" : "新增"}字典项成功`);
          proTableRefs.value[form.typeId].search();
          dictItemDialogVisible.value = false;
        })
        .catch(() => {
          ElMessage.error(`${form.id ? "更新" : "新增"}字典项失败`);
        });
    }
  });
};

const deleteDictItem = (row: any) => {
  ElMessageBox.confirm("确定删除该字典项吗？", "提示", {
    type: "warning"
  }).then(() => {
    deleteDictItemApi(row.id)
      .then(() => {
        ElMessage.success("删除成功");
        proTableRefs.value[row.typeId].search();
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
      title="字典列表"
      :indent="20"
      :columns="columns"
      :request-api="getDictTypesApi"
      :search-col="4"
      :data-callback="handleDictTypeList"
      @expand-change="handleExpandChange"
    >
      <template #expand="scope">
        <div v-if="scope.row.expand" style="padding: 20px">
          <ProTable
            :ref="el => setProTableRef(scope.row.id, el)"
            title="字典项列表"
            :columns="[
              { prop: 'label', label: '字典项标签' },
              { prop: 'value', label: '字典项值' },
              { prop: 'orderNo', label: '排序' },
              {
                prop: 'status',
                label: '状态',
                tag: true,
                enum: [
                  { label: '停用', value: 0, tagType: 'info' },
                  { label: '启用', value: 1, tagType: 'success' }
                ]
              },
              { prop: 'remark', label: '备注' },
              { prop: 'createdAt', label: '创建时间' },
              { prop: 'creator', label: '创建人' },
              { prop: 'updatedAt', label: '更新时间' },
              { prop: 'updater', label: '更新人' },
              { prop: 'operation', label: '操作', width: 200, fixed: 'right' }
            ]"
            :request-api="getDictItemsApi"
            :init-param="{ typeId: scope.row.id }"
          >
            <template #tableHeader>
              <el-button type="primary" @click="openDictItemDialog(null, scope.row.id)">新增字典项</el-button>
            </template>
            <template #operation="iScope">
              <el-button type="primary" link @click="openDictItemDialog(iScope.row, scope.row.id)">编辑</el-button>
              <el-button type="primary" link @click="deleteDictItem(iScope.row)">删除</el-button>
            </template>
          </ProTable>
        </div>
      </template>
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" @click="openDictTypeDialog(null)">新增字典</el-button>
      </template>
      <!-- 菜单图标 -->
      <template #icon="scope">
        <el-icon v-if="scope.row.icon" :size="18">
          <component :is="scope.row.icon"></component>
        </el-icon>
      </template>
      <!-- 菜单操作 -->
      <template #operation="scope">
        <el-button type="primary" link @click="openDictTypeDialog(scope.row)">编辑</el-button>
        <el-button type="primary" link @click="deleteDictType(scope.row)">删除</el-button>
      </template>
    </ProTable>
    <el-dialog
      v-model="dictTypeDialogVisible"
      :title="dictTypeForm.id ? '新增字典' : '编辑字典'"
      width="30%"
      @close="handleCloseOfDictTypeDialog"
    >
      <el-form ref="dictTypeFormRef" :model="dictTypeForm" :rules="dictTypeFormRules" label-width="80px">
        <el-form-item v-show="false" label="id" prop="id">
          <el-input v-model="dictTypeForm.id" placeholder="请输入id"></el-input>
        </el-form-item>
        <el-form-item label="字典编码" prop="code">
          <el-input v-model="dictTypeForm.code" placeholder="请输入字典编码"></el-input>
        </el-form-item>
        <el-form-item label="字典名称" prop="name">
          <el-input v-model="dictTypeForm.name" placeholder="请输入字典名称"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="dictTypeForm.status">
            <el-radio-button :value="1">启用</el-radio-button>
            <el-radio-button :value="0">停用</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="dictTypeForm.remark" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleCloseOfDictTypeDialog">取 消</el-button>
          <el-button type="primary" @click="handleConfirmOfDictTypeDialog">确 定</el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="dictItemDialogVisible"
      :title="dictItemForm.id ? '新增字典项' : '编辑字典项'"
      width="30%"
      @close="handleCloseOfDictItemDialog"
    >
      <el-form ref="dictItemFormRef" :model="dictItemForm" :rules="dictItemFormRules" label-width="120px">
        <el-form-item v-show="false" label="id" prop="id">
          <el-input v-model="dictItemForm.id" placeholder="请输入id"></el-input>
        </el-form-item>
        <el-form-item label="字典项值" prop="value">
          <el-input v-model="dictItemForm.value" placeholder="请输入字典项值"></el-input>
        </el-form-item>
        <el-form-item label="字典项标签" prop="label">
          <el-input v-model="dictItemForm.label" placeholder="请输入字典项标签"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="orderNo">
          <el-input v-model="dictItemForm.orderNo" placeholder="请输入排序"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="dictItemForm.status">
            <el-radio-button :value="1">启用</el-radio-button>
            <el-radio-button :value="0">停用</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleCloseOfDictItemDialog">取 消</el-button>
          <el-button type="primary" @click="handleConfirmOfDictItemDialog">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
