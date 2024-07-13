import { SYSTEM_PORT } from "@/api/config/servicePort";
import { CommonReqRes } from "@/api/interface/index";
import http from "@/api";

// TODO: CommonReqRes.Res CommonReqRes.Req 要更加细化
export const getUserListApi = (params: CommonReqRes.Req) => {
  return http.get<CommonReqRes.Res>(`${SYSTEM_PORT}/users`, params, { loading: false });
};

export const addUserApi = (params: CommonReqRes.Req) => {
  return http.post<CommonReqRes.Res>(`${SYSTEM_PORT}/users`, params);
};

export const updateUserApi = (params: CommonReqRes.Req) => {
  return http.put<CommonReqRes.Res>(`${SYSTEM_PORT}/users/${params.id}`, params);
};

export const deleteUserApi = (ids: number | string) => {
  return http.delete<CommonReqRes.Res>(`${SYSTEM_PORT}/users/${ids}`);
};

export const getUserDetailApi = (id: number) => {
  return http.get<CommonReqRes.Res>(`${SYSTEM_PORT}/users/${id}`);
};

export const updateUserPasswordApi = (params: CommonReqRes.Req) => {
  return http.post<CommonReqRes.Res>(`${SYSTEM_PORT}/users/${params.id}/password`, params);
};
