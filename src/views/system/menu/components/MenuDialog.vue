<script setup lang="ts">
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { ref, watchEffect } from "vue";
import { addMenuApi, updateMenuApi } from "@/api/modules/system/menu";
import SelectIcon from "@/components/SelectIcon/index.vue";
import { nextTick } from "vue";

type MenuInfo = {
  type?: 0 | 1 | 2; // 0目录 1菜单 2权限
  parentId?: number | string; // 父级ID
  id?: number | string; // 菜单ID
  name?: string; // 菜单名称
  orderNo?: number; // 排序
  path?: string; // 路由地址
  component?: string; // 组件路径
  isExt?: boolean; // 是否外链
  extOpenMode?: 1 | 2; // 外链打开方式 1 外部打开 2 内部打开
  show?: 0 | 1; // 是否显示
  activeMenu?: string; // 高亮菜单
  keepAlive?: 0 | 1; // 是否缓存
  status?: 0 | 1; // 状态 0 禁用 1 启用
  icon?: string; // 图标
  permission?: string; // 权限标识
};

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    extra: {
      type?: "add" | "edit";
      info?: MenuInfo;
      // TODO: 类型需要调整
      treeData?: any[];
    };
  }>(),
  {
    modelValue: false,
    extra: () => ({
      type: "add",
      info: {},
      treeData: []
    })
  }
);

const emits = defineEmits(["update:modelValue", "close", "refresh"]);

const dialogVisible = ref(props.modelValue);
const defaultExpandedKeys = ref<(number | string)[]>([0]);

const menuForm = ref<MenuInfo>({
  type: 0,
  parentId: 0,
  name: "",
  orderNo: 0,
  path: "",
  component: "",
  isExt: false,
  extOpenMode: 1,
  show: 1,
  activeMenu: "",
  keepAlive: 1,
  status: 1,
  icon: "",
  permission: "",
  id: ""
});
const menuFormRef = ref<FormInstance>();
const menuFormRules = {
  type: [{ required: true, message: "请选择菜单类型", trigger: "change" }],
  name: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
  orderNo: [{ required: true, message: "请输入排序", trigger: "blur" }],
  path: [
    { required: true, message: "请输入路由地址", trigger: "blur" },
    { pattern: /^http(s)|\/\w+/, message: "请输入正确的路由地址", trigger: "blur" }
  ],
  component: [
    { required: true, message: "请输入组件路径", trigger: "blur" },
    { pattern: /^http(s)|\/\w+/, message: "请输入正确的组件路径", trigger: "blur" }
  ]
} as FormRules;

const handleClose = () => {
  emits("update:modelValue", false);
  emits("close");
};

const handleConfirm = () => {
  menuFormRef.value?.validate().then(() => {
    const data = JSON.parse(JSON.stringify(menuForm.value));
    if (data.parentId === 0) {
      data.parentId = null;
    }
    Object.keys(data).forEach(key => {
      if (data[key] === "") {
        data[key] = null;
      }
    });
    const operateApi = props.extra.type === "add" ? addMenuApi : updateMenuApi;
    operateApi(data).then(() => {
      emits("update:modelValue", false);
      emits("refresh");
      ElMessage.success("操作成功");
    });
  });
};

watchEffect(() => {
  dialogVisible.value = props.modelValue;
  nextTick(() => {
    if (props.modelValue) {
      if (props.extra.type === "edit" && props.extra.info?.id) {
        Object.keys(menuForm.value).forEach(key => {
          if (props.extra.info?.hasOwnProperty(key)) {
            menuForm.value[key] = props.extra.info[key];
          }
        });
      }
      menuForm.value.parentId = props.extra.info?.parentId || 0;
      if (props.extra.type === "add" && props.extra.info?.id) {
        menuForm.value.parentId = props.extra.info?.id;
      }
      defaultExpandedKeys.value = [menuForm.value.parentId];
    } else {
      menuFormRef.value?.resetFields();
    }
  });
});
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="extra.type === 'add' ? '新增菜单' : '编辑菜单'" width="30%" @close="handleClose">
    <el-form ref="menuFormRef" :model="menuForm" :rules="menuFormRules" label-width="120px">
      <!-- 注：添加一个这个是为了方便调用resetFields时也重置id为null，不写的话调用了也不会重置 -->
      <el-form-item v-show="false" label="数据ID" prop="id">
        <el-input v-model="menuForm.id" disabled />
      </el-form-item>
      <el-form-item label="菜单类型" prop="type">
        <el-radio-group v-model="menuForm.type">
          <el-radio-button :value="0" label="目录"></el-radio-button>
          <el-radio-button :value="1" label="菜单"></el-radio-button>
          <el-radio-button :value="2" label="权限"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="父级菜单" prop="parentId">
        <el-tree-select
          v-model="menuForm.parentId"
          :data="extra.treeData"
          filterable
          node-key="id"
          check-strictly
          :default-expanded-keys="defaultExpandedKeys"
          :props="{ value: 'id', label: 'name', children: 'children' }"
          clearable
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="menuForm.name" />
      </el-form-item>
      <el-form-item v-if="menuForm.type !== 2" label="路由地址" prop="path">
        <el-input v-model="menuForm.path" />
      </el-form-item>
      <template v-if="menuForm.type === 1">
        <el-form-item label="组件路径" prop="component">
          <el-input v-model="menuForm.component" />
        </el-form-item>
      </template>
      <el-form-item label="排序" prop="orderNo">
        <el-input v-model="menuForm.orderNo" />
      </el-form-item>
      <template v-if="menuForm.type !== 2">
        <el-form-item label="图标" prop="icon">
          <select-icon v-model="menuForm.icon" />
        </el-form-item>
        <el-form-item label="是否外链" prop="isExt">
          <el-radio-group v-model="menuForm.isExt">
            <el-radio-button :value="true" label="是"></el-radio-button>
            <el-radio-button :value="false" label="否"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="menuForm.isExt" label="外链打开方式" prop="extOpenMode">
          <el-radio-group v-model="menuForm.extOpenMode">
            <el-radio-button :value="1" label="外部打开"></el-radio-button>
            <el-radio-button :value="2" label="内部打开"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否显示" prop="show">
          <el-radio-group v-model="menuForm.show">
            <el-radio-button :value="0" label="否"></el-radio-button>
            <el-radio-button :value="1" label="是"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="menuForm.show === 0" label="高亮菜单" prop="activeMenu">
          <el-input v-model="menuForm.activeMenu" />
        </el-form-item>
        <el-form-item v-if="menuForm.type !== 0" label="是否缓存" prop="keepAlive">
          <el-radio-group v-model="menuForm.keepAlive">
            <el-radio-button :value="0" label="否"></el-radio-button>
            <el-radio-button :value="1" label="是"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </template>
      <el-form-item v-if="menuForm.type !== 0" label="权限标识" prop="permission">
        <el-input v-model="menuForm.permission" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="menuForm.status">
          <el-radio-button :value="1" label="启用"></el-radio-button>
          <el-radio-button :value="0" label="禁用"></el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
