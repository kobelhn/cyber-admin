// 请求响应参数（不包含data）
export interface Result {
  code: string;
  msg: string;
}

// 请求响应参数（包含data）
export interface ResultData<T = any> extends Result {
  data: T;
}

// 分页响应参数
export interface ResPage<T> {
  list: T[];
  pageNum: number;
  pageSize: number;
  total: number;
}

// 分页请求参数
export interface ReqPage {
  pageNum: number;
  pageSize: number;
}

// 文件上传模块
export namespace Upload {
  export interface ResFileUrl {
    fileUrl: string;
  }
}

// 登录模块
export namespace Login {
  export interface ReqLoginForm {
    username: string;
    password: string;
    captchaId: string;
    verifyCode: string;
  }
  export interface ResLogin {
    token: string;
  }
  export interface ResPermissions {
    [key: string]: string[];
  }

  export interface ResCaptcha {
    img: string;
    id: string;
  }

  export interface ResUserInfo {
    [key: string]: any;
  }
}

// 用户管理模块
export namespace User {
  export interface ReqUserParams extends ReqPage {
    username: string;
    gender: number;
    idCard: string;
    email: string;
    address: string;
    createTime: string[];
    status: number;
  }
  export interface ResUserList {
    id: string;
    username: string;
    gender: number;
    user: { detail: { age: number } };
    idCard: string;
    email: string;
    address: string;
    createTime: string;
    status: number;
    avatar: string;
    photo: any[];
    children?: ResUserList[];
  }
  export interface ResStatus {
    userLabel: string;
    userValue: number;
  }
  export interface ResGender {
    genderLabel: string;
    genderValue: number;
  }
  export interface ResDepartment {
    id: string;
    name: string;
    children?: ResDepartment[];
  }
  export interface ResRole {
    id: string;
    name: string;
    children?: ResRole[];
  }
}

// 菜单管理模块
export namespace MenuManage {
  // 为了更佳的健壮性，建议这里按照后端的swagger文档进行参数和返回值的完善
  export interface ReqMenuParams {
    [key: string]: any;
  }

  export interface AddMenuParams {
    type: 0 | 1 | 2; // 0目录 1菜单 2权限
    parentId: number | null; // 父级ID
    name: string; // 菜单名称
    orderNo: number; // 排序
    path: string | null; // 路由地址
    component: string | null; // 组件路径
    isExt: boolean; // 是否外链
    extOpenMode: 1 | 2; // 外链打开方式 1 外部打开 2 内部打开
    show: 0 | 1; // 是否显示
    activeMenu: string | null; // 高亮菜单
    keepAlive: 0 | 1; // 是否缓存
    status: 0 | 1; // 状态 0 禁用 1 启用
    icon: string | null; // 图标
    permission: string | null; // 权限标识
    id?: number | null; // 菜单ID
  }
}

// 为了偷懒，声明一个通用的请求和响应的类型声明
export namespace CommonReqRes {
  export interface Req {
    [key: string]: any;
  }

  export interface Res {
    [key: string]: any;
  }

  export type ResArr = Res[];
}
