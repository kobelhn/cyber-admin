import { SYSTEM_PORT } from "@/api/config/servicePort";
import { MenuManage, CommonReqRes } from "@/api/interface/index";
import http from "@/api";

export const getMenuListApi = (params: MenuManage.ReqMenuParams) => {
  return http.get<Menu.MenuOptions[]>(`${SYSTEM_PORT}/menus`, params, { loading: false });
};

export const addMenuApi = (data: MenuManage.AddMenuParams) => {
  return http.post(`${SYSTEM_PORT}/menus`, data);
};

export const getMenuDetailApi = (id: number) => {
  return http.get<Menu.MenuOptions>(`${SYSTEM_PORT}/menus/${id}`);
};

export const updateMenuApi = (data: MenuManage.AddMenuParams) => {
  return http.put(`${SYSTEM_PORT}/menus/${data.id}`, data);
};

export const deleteMenuApi = (id: number) => {
  return http.delete(`${SYSTEM_PORT}/menus/${id}`);
};

export const getAllPermissionsApi = () => {
  return http.get<CommonReqRes.ResArr>(`${SYSTEM_PORT}/menus/permissions`);
};
