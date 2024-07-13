import { SYSTEM_PORT } from "@/api/config/servicePort";
import { CommonReqRes } from "@/api/interface/index";
import http from "@/api";

// TODO: CommonReqRes.Res CommonReqRes.Req 要更加细化
export const getDeptsApi = (params: CommonReqRes.Req = {}) => {
  return http.get<CommonReqRes.ResArr>(`${SYSTEM_PORT}/depts`, params, { loading: false });
};

export const addDeptApi = (params: CommonReqRes.Req) => {
  return http.post<CommonReqRes.Res>(`${SYSTEM_PORT}/depts`, params);
};

export const updateDeptApi = (params: CommonReqRes.Req) => {
  return http.put<CommonReqRes.Res>(`${SYSTEM_PORT}/depts/${params.id}`, params);
};

export const deleteDeptApi = (ids: number | string) => {
  return http.delete<CommonReqRes.Res>(`${SYSTEM_PORT}/depts/${ids}`);
};

export const getDeptDetailApi = (id: number) => {
  return http.get<CommonReqRes.Res>(`${SYSTEM_PORT}/depts/${id}`);
};
