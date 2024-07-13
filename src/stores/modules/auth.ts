import { defineStore } from "pinia";
import { AuthState } from "@/stores/interface";
import { getAuthPermissionListApi, getAuthMenuListApi } from "@/api/modules/login";
import { getFlatMenuList, getShowMenuList, getAllBreadcrumbList } from "@/utils";

export const useAuthStore = defineStore({
  id: "cyber-auth",
  state: (): AuthState => ({
    // 按钮权限列表
    permissionList: [],
    // 菜单权限列表
    authMenuList: []
  }),
  getters: {
    // 权限列表
    permissionListGet: state => state.permissionList,
    // 菜单权限列表 ==> 这里的菜单没有经过任何处理
    authMenuListGet: state => state.authMenuList,
    // 菜单权限列表 ==> 左侧菜单栏渲染，需要剔除 show === 0
    showMenuListGet: state => getShowMenuList(state.authMenuList),
    // 菜单权限列表 ==> 扁平化之后的一维数组菜单，主要用来添加动态路由
    flatMenuListGet: state => getFlatMenuList(state.authMenuList),
    // 递归处理后的所有面包屑导航列表
    breadcrumbListGet: state => getAllBreadcrumbList(state.authMenuList)
  },
  actions: {
    // Get permissionList
    async getAuthPermissionList() {
      const { data } = await getAuthPermissionListApi();
      this.permissionList = data;
    },
    // Get AuthMenuList
    async getAuthMenuList() {
      const { data } = await getAuthMenuListApi();
      const handle = (list: Menu.MenuOptions[]) => {
        list.forEach(item => {
          if (item.children) {
            handle(item.children);
          }
          // 处理外链地址
          if (item.meta.isExt) {
            item.meta.link = item.path;
            // 处理路由path，去掉:// 如：http://www.baidu.com => /http/www.baidu.com
            item.path = item.path.replace(new RegExp("://"), "/");
            // 内联打开时直接处理component
            if (item.meta.extOpenMode === 2) {
              item.component = "/iframePage/index";
            }
          }
          // path统一处理，补全开头的/
          item.path = item.path.startsWith("/") ? item.path : `/${item.path}`;
          // isFull => 是否全屏显示
          item.meta.isFull = item.meta.isFull || item.path.includes("fullscreen");
          // 处理item.name => 动态路由addRoute添加时，name相同不会重复添加 => 如：/system/user => system.user /system/user/:id => system.user.id
          item.name = item.path.replaceAll(":", "").split("/").filter(Boolean).join(".");
        });
      };
      handle(data);
      this.authMenuList = data;
    }
  }
});
