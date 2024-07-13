import { SYSTEM_PORT } from "@/api/config/servicePort";
import { CommonReqRes } from "@/api/interface/index";
import http from "@/api";

// TODO: CommonReqRes.Res CommonReqRes.Req 要更加细化
export const getOnlineListApi = (params: CommonReqRes.Req = {}) => {
  return http.get<CommonReqRes.Res>(`${SYSTEM_PORT}/online/list`, params, { loading: false });
};

// TODO: CommonReqRes.Res CommonReqRes.Req 要更加细化
export const getLogsListApi = (params: CommonReqRes.Req = {}) => {
  return http.get<CommonReqRes.Res>(`${SYSTEM_PORT}/log/login/list`, params, { loading: false });
};

// TODO: CommonReqRes.Res CommonReqRes.Req 要更加细化
export const getServeStatApi = (params: CommonReqRes.Req = {}) => {
  return http.get<CommonReqRes.Res>(`${SYSTEM_PORT}/serve/stat`, params, { loading: false });
};
