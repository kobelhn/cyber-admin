import { Login } from "@/api/interface/index";
import { AUTH_PORT, ACCOUNT_PORT } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 登录模块
 */
// 用户登录
export const loginApi = (params: Login.ReqLoginForm) => {
  return http.post<Login.ResLogin>(`${AUTH_PORT}/login`, params, { loading: false }); // 正常 post json 请求  ==>  application/json
  // return http.post<Login.ResLogin>(PORT1 + `/login`, params, { loading: false }); // 控制当前请求不显示 loading
  // return http.post<Login.ResLogin>(PORT1 + `/login`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
  // return http.post<Login.ResLogin>(PORT1 + `/login`, qs.stringify(params)); // post 请求携带表单参数  ==>  application/x-www-form-urlencoded
  // return http.get<Login.ResLogin>(PORT1 + `/login?${qs.stringify(params, { arrayFormat: "repeat" })}`); // get 请求可以携带数组等复杂参数
};

// 获取图片验证码
export const getVerifyCodeApi = (params: { width: number; height: number } = { width: 100, height: 50 }) => {
  return http.get<Login.ResCaptcha>(AUTH_PORT + `/captcha/img`, params, { loading: false });
};

// 获取菜单列表
export const getAuthMenuListApi = () => {
  return http.get<Menu.MenuOptions[]>(`${ACCOUNT_PORT}/menus`, {}, { loading: false });
};

// 获取用户信息
export const getUserInfoApi = () => {
  return http.get<Login.ResUserInfo>(`${ACCOUNT_PORT}/profile`, {}, { loading: false });
};

// 获取按钮权限
export const getAuthPermissionListApi = () => {
  return http.get<string[]>(`${ACCOUNT_PORT}/permissions`, {}, { loading: false });
};

// 用户退出登录
export const logoutApi = () => {
  return http.get(`${ACCOUNT_PORT}/logout`);
};
