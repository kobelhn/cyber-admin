<script setup lang="ts" name="RoleDialog">
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { nextTick, ref, watchEffect } from "vue";
import { addRoleApi, updateRoleApi, getRoleDetailApi } from "@/api/modules/system/role";
import { getMenuListApi } from "@/api/modules/system/menu";

type RoleInfo = {
  name?: string; // 角色名称
  value?: string; // 角色值
  remark?: string; // 备注
  menuIds?: (number | string)[]; // 菜单ID数组
  status?: 0 | 1; // 状态 0 禁用 1 启用
  id?: number | string; // 角色ID
};

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    roleInfo: RoleInfo;
  }>(),
  {
    modelValue: false,
    roleInfo: () => ({})
  }
);

const dialogVisible = ref(props.modelValue);
const roleForm = ref<RoleInfo>({
  name: "",
  value: "",
  remark: "",
  menuIds: [],
  status: 1,
  id: ""
});
const emits = defineEmits(["update:modelValue", "close", "refresh"]);
const menuData = ref<any[]>([]);
const treeRef = ref();

const formRef = ref<FormInstance>();
const formRules = ref<FormRules>({
  name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
  value: [
    { required: true, message: "请输入角色值", trigger: "blur" },
    {
      pattern: /^[a-z0-9]+$/i,
      message: "角色值只能包含字母和数字",
      trigger: "blur"
    }
  ]
});

const handleConfirm = () => {
  formRef.value?.validate((valid, fields) => {
    if (valid) {
      const apiCall = roleForm.value.id ? updateRoleApi : addRoleApi;
      const form = JSON.parse(JSON.stringify(roleForm.value));
      form.menuIds = treeRef.value!.getCheckedKeys().concat(treeRef.value!.getHalfCheckedKeys());
      apiCall(form)
        .then(() => {
          ElMessage.success(`${form.id ? "更新" : "新增"}用户成功`);
          emits("update:modelValue", false);
          emits("refresh");
        })
        .catch(err => {
          console.error(err);
          ElMessage.error(`${form.id ? "更新" : "新增"}用户失败`);
        });
    } else {
      console.log("error submit!!", fields);
    }
  });
};

const handleClose = () => {
  emits("update:modelValue", false);
  emits("close");
};

watchEffect(() => {
  dialogVisible.value = props.modelValue;
  nextTick(() => {
    if (dialogVisible.value) {
      getMenuListApi({}).then(res => {
        // 过滤掉所有status为0的数据及其子项
        menuData.value = res.data.filter((item: any) => {
          if (item.status === 0) return false;
          if (item.children) {
            item.children = item.children.filter((child: any) => child.status !== 0);
          }
          return true;
        });
        if (props.roleInfo.id) {
          getRoleDetailApi(props.roleInfo.id).then(res => {
            const { data } = res;
            Object.keys(roleForm.value).forEach(key => {
              if (data.hasOwnProperty(key)) {
                roleForm.value[key] = data[key];
              }
            });
            // 递归查找出所有的叶子节点id
            const getLeafIds = (data: any[]) => {
              const ids: number[] = [];
              data.forEach((item: any) => {
                if (item.children) {
                  ids.push(...getLeafIds(item.children));
                } else {
                  ids.push(item.id);
                }
              });
              return ids;
            };
            roleForm.value.menuIds = getLeafIds(menuData.value).filter((id: number) => data.menuIds.includes(id));
          });
        }
      });
    } else {
      formRef.value?.resetFields();
    }
  });
});
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="`${roleInfo.id ? '编辑角色' : '新增角色'}`" width="30%" @close="handleClose">
    <el-form ref="formRef" :model="roleForm" :rules="formRules" label-width="100px">
      <!-- 注：添加一个这个是为了方便调用resetFields时也重置id为null，不写的话调用了也不会重置 -->
      <el-form-item v-show="false" label="用户ID" prop="id">
        <el-input v-model="roleForm.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="roleForm.name" />
      </el-form-item>
      <el-form-item label="角色值" prop="value">
        <el-input v-model="roleForm.value" />
      </el-form-item>
      <el-form-item label="分配菜单" prop="menuIds">
        <el-tree
          ref="treeRef"
          node-key="id"
          :data="menuData"
          show-checkbox
          :expand-on-click-node="false"
          :default-checked-keys="roleForm.menuIds"
          accordion
          :props="{
            value: 'id',
            children: 'children',
            label: 'name'
          }"
        >
          <template #default="scope">
            <span class="el-tree-node__label">
              <slot :row="scope">
                {{ scope.node.label }}
              </slot>
            </span>
          </template>
        </el-tree>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="roleForm.remark" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="roleForm.status">
          <el-radio-button :value="1" label="启用"></el-radio-button>
          <el-radio-button :value="0" label="禁用"></el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleConfirm">提交</el-button>
    </template>
  </el-dialog>
</template>
