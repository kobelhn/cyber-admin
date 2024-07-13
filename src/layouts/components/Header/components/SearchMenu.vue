<script setup lang="ts" name="SearchMenu">
import { ref, computed, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/modules/auth";

const router = useRouter();
const authStore = useAuthStore();
const menuList = computed(() => authStore.flatMenuListGet.filter(item => item.meta.show === 1));

const searchMenuList = (queryString: string, cb: Function) => {
  const results = queryString ? menuList.value.filter(filterNodeMethod(queryString)) : menuList.value;
  cb(results);
};

// 打开搜索框
const isShowSearch = ref(false);
const menuInputRef = ref();
const searchMenu = ref("");
const handleOpen = () => {
  isShowSearch.value = true;
  nextTick(() => {
    setTimeout(() => {
      menuInputRef.value.focus();
    });
  });
};

// 搜索窗关闭
const closeSearch = () => {
  isShowSearch.value = false;
};

// 筛选菜单
const filterNodeMethod = (queryString: string) => {
  return (restaurant: Menu.MenuOptions) => {
    return (
      restaurant.path.toLowerCase().indexOf(queryString.toLowerCase()) > -1 ||
      restaurant.meta.title.toLowerCase().indexOf(queryString.toLowerCase()) > -1
    );
  };
};

// 点击菜单跳转
const handleClickMenu = (menuItem: Menu.MenuOptions | Record<string, any>) => {
  searchMenu.value = "";
  if (menuItem.meta.isExt && menuItem.meta.extOpenMode === 1) window.open(menuItem.meta.link, "_blank");
  else router.push(menuItem.path);
  closeSearch();
};
</script>

<template>
  <div class="menu-search-dialog">
    <cyber-icon name="iconfont:search" class="toolBar-icon" @click="handleOpen" />
    <el-dialog v-model="isShowSearch" destroy-on-close :modal="false" :show-close="false" fullscreen @click="closeSearch">
      <el-autocomplete
        ref="menuInputRef"
        v-model="searchMenu"
        value-key="path"
        size="large"
        placeholder="菜单搜索 ：支持菜单名称、路径"
        :fetch-suggestions="searchMenuList"
        popper-class="cyber-vue3-autocomplete-popover"
        @select="handleClickMenu"
        @click.stop
      >
        <template #prefix>
          <cyber-icon name="element:Search" />
        </template>
        <template #default="{ item }">
          <cyber-icon v-if="item.meta.icon" :name="item.meta.icon" />
          <span> {{ item.meta.title }} </span>
        </template>
      </el-autocomplete>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.menu-search-dialog {
  :deep(.el-dialog) {
    background-color: rgb(0 0 0 / 50%);
    border-radius: 0 !important;
    box-shadow: unset !important;
    .el-dialog__header {
      border-bottom: none !important;
    }
  }
  :deep(.el-autocomplete) {
    position: absolute;
    top: 100px;
    left: 50%;
    width: 550px;
    transform: translateX(-50%);
    .el-input__wrapper {
      background-color: var(--el-bg-color);
    }
  }
}
</style>
<style lang="scss">
.cyber-vue3-autocomplete-popover {
  .el-autocomplete-suggestion {
    li {
      display: flex;
      align-items: center;
      .cyber-icon {
        margin-right: 10px;
      }
    }
  }
}
</style>
