<template>
  <div class="card content-box">
    <el-alert
      title="SVG 图标目前使用 vite-plugin-svg-icons 插件完成，官方文档请查看 ：https://github.com/vbenjs/vite-plugin-svg-icons"
      type="warning"
      :closable="false"
    />
    <el-alert title="支持svg图标、iconfont图标、element-plus图标的综合图标组件" type="warning" :closable="false" />
    <div class="icon-list">
      <h3>ElementPlus 图标</h3>
      <cyber-icon name="element:Edit" :size="100" color="green" />
      <h3>SVG 图标</h3>
      <cyber-icon name="svg:youtube" :size="100" color="blue" />
      <h3>Iconfont 图标</h3>
      <cyber-icon name="iconfont:search" :size="100" color="red" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./index.scss";
</style>
