import { TOOLS_PORT } from "@/api/config/servicePort";
import { CommonReqRes } from "@/api/interface/index";
import http from "@/api";

export const sendEmailApi = (params: CommonReqRes.Req) => {
  return http.post<CommonReqRes.Res>(`${TOOLS_PORT}/email/send`, params);
};

export const getStorageListApi = (params: CommonReqRes.Req) => {
  return http.get<CommonReqRes.Res>(`${TOOLS_PORT}/storage/list`, params);
};

export const deleteStorageFileApi = (params: CommonReqRes.Req) => {
  return http.post<CommonReqRes.Res>(`${TOOLS_PORT}/storage/delete`, params);
};
