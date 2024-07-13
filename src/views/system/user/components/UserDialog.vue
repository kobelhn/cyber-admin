<script setup lang="ts">
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { nextTick, ref, watchEffect } from "vue";
import { addUserApi, updateUserApi } from "@/api/modules/system/user";
import { getRolesApi } from "@/api/modules/system/role";
import { getDeptsApi } from "@/api/modules/system/dept";

type UserInfo = {
  avatar?: string; // 头像
  username?: string; // 用户名
  password?: string; // 密码
  roleIds?: (number | string)[]; // 角色ID数组
  deptId?: number | string; // 部门ID
  nickname?: string; // 昵称
  email?: string; // 邮箱
  phone?: string; // 电话
  qq?: string; // QQ
  remark?: string; // 备注
  status?: 0 | 1; // 状态 0 禁用 1 启用
  id?: number | string; // 用户ID
};

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    userInfo: UserInfo;
  }>(),
  {
    modelValue: false,
    userInfo: () => ({})
  }
);

const dialogVisible = ref(props.modelValue);
const userForm = ref<UserInfo>({
  avatar: "", // 默认头像 TODO: 上传头像
  password: "a123456", // 默认密码
  username: "",
  roleIds: [],
  deptId: "",
  nickname: "",
  email: "",
  phone: "",
  qq: "",
  remark: "",
  status: 1,
  id: ""
});
const emits = defineEmits(["update:modelValue", "close", "refresh"]);
const rolesData = ref<any[]>([]);
const deptsData = ref<any[]>([]);
const defaultExpandKeys = ref<(number | string)[]>([]);

const formRef = ref<FormInstance>();
const formRules = ref<FormRules>({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    {
      pattern: /^[\w-]{4,16}$/,
      message: "用户名必须是4-16位字母、数字、下划线、减号组成",
      trigger: "blur"
    }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      pattern: /^(?!\d+$)(?![a-z]+$)[0-9A-Z]{6,20}$/i,
      message: "密码必须包含数字和字母，长度在6-20之间",
      trigger: "blur"
    }
  ],
  roleIds: [{ required: true, message: "请选择角色", trigger: "change" }],
  deptId: [{ required: true, message: "请选择部门", trigger: "change" }],
  email: [{ type: "email", message: "请输入正确的邮箱地址", trigger: ["blur", "change"] }],
  phone: [{ required: true, message: "请输入电话号码", trigger: "blur" }]
});

const handleConfirm = () => {
  formRef.value?.validate((valid, fields) => {
    if (valid) {
      const apiCall = userForm.value.id ? updateUserApi : addUserApi;
      apiCall(userForm.value)
        .then(() => {
          ElMessage.success(`${userForm.value.id ? "更新" : "新增"}用户成功`);
          emits("update:modelValue", false);
          emits("refresh");
        })
        .catch(err => {
          console.error(err);
          ElMessage.error(`${userForm.value.id ? "更新" : "新增"}用户失败`);
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
      Promise.all([getRolesApi(), getDeptsApi()])
        .then(([roleRes, deptRes]) => {
          rolesData.value = roleRes.data.items;
          deptsData.value = deptRes.data;
        })
        .catch(err => {
          console.error(err);
        });
      if (props.userInfo.id) {
        Object.keys(userForm.value).forEach(key => {
          if (props.userInfo.hasOwnProperty(key)) {
            userForm.value[key] = props.userInfo[key];
          }
        });
        userForm.value.password = ""; // 编辑模式下，不显示密码
        defaultExpandKeys.value = [props.userInfo.deptId!];
      }
    } else {
      formRef.value?.resetFields();
    }
  });
});
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="`${userInfo.id ? '编辑用户' : '新增用户'}`" width="30%" @close="handleClose">
    <el-form ref="formRef" :model="userForm" :rules="formRules" label-width="100px">
      <!-- 注：添加一个这个是为了方便调用resetFields时也重置id为null，不写的话调用了也不会重置 -->
      <el-form-item v-show="false" label="用户ID" prop="id">
        <el-input v-model="userForm.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-input v-model="userForm.avatar" placeholder="头像暂时不做上传" readonly />
      </el-form-item>
      <el-form-item label="角色" prop="roleIds">
        <el-select v-model="userForm.roleIds" multiple placeholder="请选择角色">
          <el-option v-for="role in rolesData" :key="role.id" :label="role.name" :value="role.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门" prop="deptId">
        <el-tree-select
          v-model="userForm.deptId"
          :data="deptsData"
          :default-expanded-keys="defaultExpandKeys"
          filterable
          node-key="id"
          :props="{ value: 'id', label: 'name', children: 'children' }"
          clearable
          check-strictly
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username" :disabled="!!userInfo.id" />
      </el-form-item>
      <el-form-item v-if="!userInfo.id" label="密码" prop="password">
        <el-input
          v-model="userForm.password"
          :placeholder="`${userInfo.id ? '无需修改请留空' : '请输入密码'}`"
          type="password"
          show-password
        />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="userForm.nickname" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userForm.email" />
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="userForm.phone" />
      </el-form-item>
      <el-form-item label="QQ" prop="qq">
        <el-input v-model="userForm.qq" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="userForm.remark" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="userForm.status">
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
