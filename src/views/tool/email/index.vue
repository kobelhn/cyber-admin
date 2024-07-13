<script setup lang="ts">
import { ref } from "vue";
import { ElMessage, type FormInstance } from "element-plus";
import WangEditor from "@/components/WangEditor/index.vue";
import { sendEmailApi } from "@/api/modules/tool";

const sendForm = ref<{
  to: string;
  subject: string;
  content: string;
}>({
  to: "",
  subject: "",
  content: ""
});
const sendFormRules = ref({
  to: [{ required: true, message: "请输入收件人邮箱", trigger: "blur" }],
  subject: [{ required: true, message: "请输入邮件主题", trigger: "blur" }],
  content: [{ required: true, message: "请输入邮件内容", trigger: "blur" }]
});
const formRef = ref<FormInstance>();

const sendEmail = () => {
  formRef.value!.validate((valid, fields) => {
    if (valid) {
      sendEmailApi(sendForm.value).then(() => {
        ElMessage.success("发送成功");
        resetForm();
      });
    } else {
      console.log("error submit!!", fields);
    }
  });
};

const resetForm = () => {
  formRef.value!.resetFields();
};
</script>

<template>
  <div class="card">
    <el-form ref="formRef" :model="sendForm" :rules="sendFormRules" label-width="120px">
      <el-form-item label="收件人" prop="to">
        <el-input v-model="sendForm.to" placeholder="请输入收件人邮箱，多个邮箱用逗号隔开" />
      </el-form-item>
      <el-form-item label="主题" prop="subject">
        <el-input v-model="sendForm.subject" placeholder="请输入邮件主题" />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <WangEditor v-model:value="sendForm.content" height="400px" />
      </el-form-item>
    </el-form>
    <div class="flx-horizontal-end mt20" style="width: 100%">
      <el-button @click="resetForm">重置</el-button>
      <el-button type="primary" @click="sendEmail">发送邮件</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
