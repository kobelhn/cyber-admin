import { CommonReqRes } from "@/api/interface/index";
import http from "@/api";

export const getNetDiskListApi = (params: CommonReqRes.Req) => {
  return http.get<CommonReqRes.Res>(`/netdisk/manage/list`, params);
};
