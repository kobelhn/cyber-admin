import { SYSTEM_PORT } from "@/api/config/servicePort";
import { CommonReqRes } from "@/api/interface/index";
import http from "@/api";

// TODO: CommonReqRes.Res CommonReqRes.Req 要更加细化
export const getDictTypesApi = (params: CommonReqRes.Req = {}) => {
  return http.get<CommonReqRes.Res>(`${SYSTEM_PORT}/dict-type`, params, { loading: false });
};

export const addDictTypeApi = (params: CommonReqRes.Req) => {
  return http.post<CommonReqRes.Res>(`${SYSTEM_PORT}/dict-type`, params);
};

export const updateDictTypeApi = (params: CommonReqRes.Req) => {
  return http.post<CommonReqRes.Res>(`${SYSTEM_PORT}/dict-type/${params.id}`, params);
};

export const deleteDictTypeApi = (ids: number | string) => {
  return http.delete<CommonReqRes.Res>(`${SYSTEM_PORT}/dict-type/${ids}`);
};

export const getDictTypeDetailApi = (id: number) => {
  return http.get<CommonReqRes.Res>(`${SYSTEM_PORT}/dict-type/${id}`);
};

export const getAllDictTypesApi = () => {
  return http.get<CommonReqRes.ResArr>(`${SYSTEM_PORT}/dict-type/select-options`);
};

export const getDictItemsApi = (params: CommonReqRes.Req) => {
  return http.get<CommonReqRes.Res>(`${SYSTEM_PORT}/dict-item`, params, { loading: false });
};

export const addDictItemApi = (params: CommonReqRes.Req) => {
  return http.post<CommonReqRes.Res>(`${SYSTEM_PORT}/dict-item`, params);
};

export const updateDictItemApi = (params: CommonReqRes.Req) => {
  return http.post<CommonReqRes.Res>(`${SYSTEM_PORT}/dict-item/${params.id}`, params);
};

export const deleteDictItemApi = (ids: number | string) => {
  return http.delete<CommonReqRes.Res>(`${SYSTEM_PORT}/dict-item/${ids}`);
};

export const getDictItemDetailApi = (id: number) => {
  return http.get<CommonReqRes.Res>(`${SYSTEM_PORT}/dict-item/${id}`);
};
