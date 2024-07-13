<script setup lang="ts" name="GuideButton">
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  allowClose: true,
  doneBtnText: "结束",
  nextBtnText: "下一步",
  prevBtnText: "上一步",
  steps: [
    {
      element: "#collapseIcon",
      popover: {
        title: "折叠按钮",
        description: "展开或折叠侧边栏",
        side: "right"
      }
    },
    {
      element: "#breadcrumb",
      popover: {
        title: "面包屑",
        description: "指示当前页的位置",
        side: "right"
      }
    },
    {
      element: "#assemblySize",
      popover: {
        title: "切换尺寸",
        description: "切换系统控件和字体尺寸",
        side: "left"
      }
    },
    {
      element: "#language",
      popover: {
        title: "切换语言",
        description: "切换系统语言",
        side: "left"
      }
    },
    {
      element: "#searchMenu",
      popover: {
        title: "页面搜索",
        description: "页面搜索，快速导航",
        side: "left"
      }
    },
    {
      element: "#themeSetting",
      popover: {
        title: "主题换肤",
        description: "自定义主题，布局风格",
        side: "left"
      }
    },
    {
      element: "#message",
      popover: {
        title: "消息通知",
        description: "消息通知，查看最新消息",
        side: "left"
      }
    },
    {
      element: "#fullscreen",
      popover: {
        title: "全屏展示",
        description: "全屏/退出全屏",
        side: "left"
      }
    }
  ]
});
</script>

<template>
  <el-tooltip content="使用引导" placement="bottom">
    <cyber-icon name="element:Guide" @click.prevent.stop="driverObj.drive()" />
  </el-tooltip>
</template>
