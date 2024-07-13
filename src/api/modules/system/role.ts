import { SYSTEM_PORT } from "@/api/config/servicePort";
import { CommonReqRes } from "@/api/interface/index";
import http from "@/api";

// TODO: CommonReqRes.Res CommonReqRes.Req 要更加细化
export const getRolesApi = (params: CommonReqRes.Req = {}) => {
  return http.get<CommonReqRes.Res>(`${SYSTEM_PORT}/roles`, params, { loading: false });
};

export const addRoleApi = (params: CommonReqRes.Req) => {
  return http.post<CommonReqRes.Res>(`${SYSTEM_PORT}/roles`, params);
};

export const updateRoleApi = (params: CommonReqRes.Req) => {
  return http.put<CommonReqRes.Res>(`${SYSTEM_PORT}/roles/${params.id}`, params);
};

export const deleteRoleApi = (id: number | string) => {
  return http.delete<CommonReqRes.Res>(`${SYSTEM_PORT}/roles/${id}`);
};

export const getRoleDetailApi = (id: number | string) => {
  return http.get<CommonReqRes.Res>(`${SYSTEM_PORT}/roles/${id}`);
};
