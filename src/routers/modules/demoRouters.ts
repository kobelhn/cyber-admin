export default [
  {
    path: "/demo",
    name: "demo",
    redirect: "/demo/assembly",
    meta: {
      show: 1
    },
    children: [
      {
        path: "/demo/assembly",
        name: "assembly",
        redirect: "/demo/assembly/tabs",
        meta: {
          icon: "element:Briefcase",
          title: "常用组件",
          link: "",
          show: 1,
          isFull: false,
          isAffix: false,
          keepAlive: 1
        },
        children: [
          {
            path: "/demo/assembly/selectIcon",
            name: "selectIcon",
            component: () => import("@/views/assembly/selectIcon/index.vue"),
            meta: {
              icon: "element:Menu",
              title: "图标选择器",
              link: "",
              show: 1,
              isFull: false,
              isAffix: false,
              keepAlive: 1
            }
          },
          {
            path: "/demo/assembly/selectFilter",
            name: "selectFilter",
            component: () => import("@/views/assembly/selectFilter/index.vue"),
            meta: {
              icon: "element:Menu",
              title: "分类筛选器",
              link: "",
              show: 1,
              isFull: false,
              isAffix: false,
              keepAlive: 1
            }
          },
          {
            path: "/demo/assembly/treeFilter",
            name: "treeFilter",
            component: () => import("@/views/assembly/treeFilter/index.vue"),
            meta: {
              icon: "element:Menu",
              title: "树形筛选器",
              link: "",
              show: 1,
              isFull: false,
              isAffix: false,
              keepAlive: 1
            }
          },
          {
            path: "/demo/assembly/cyberIcon",
            name: "svgIcon",
            component: () => import("@/views/assembly/cyberIcon/index.vue"),
            meta: {
              icon: "element:Menu",
              title: "SVG 图标",
              link: "",
              show: 1,
              isFull: false,
              isAffix: false,
              keepAlive: 1
            }
          },
          {
            path: "/demo/assembly/uploadFile",
            name: "uploadFile",
            component: () => import("@/views/assembly/uploadFile/index.vue"),
            meta: {
              icon: "element:Menu",
              title: "文件上传",
              link: "",
              show: 1,
              isFull: false,
              isAffix: false,
              keepAlive: 1
            }
          },
          {
            path: "/demo/assembly/batchImport",
            name: "batchImport",
            component: () => import("@/views/assembly/batchImport/index.vue"),
            meta: {
              icon: "element:Menu",
              title: "批量添加数据",
              link: "",
              show: 1,
              isFull: false,
              isAffix: false,
              keepAlive: 1
            }
          },
          {
            path: "/demo/assembly/wangEditor",
            name: "wangEditor",
            component: () => import("@/views/assembly/wangEditor/index.vue"),
            meta: {
              icon: "element:Menu",
              title: "富文本编辑器",
              link: "",
              show: 1,
              isFull: false,
              isAffix: false,
              keepAlive: 1
            }
          },
          {
            path: "/demo/assembly/draggable",
            name: "draggable",
            component: () => import("@/views/assembly/draggable/index.vue"),
            meta: {
              icon: "element:Menu",
              title: "拖拽组件",
              link: "",
              show: 1,
              isFull: false,
              isAffix: false,
              keepAlive: 1
            }
          }
        ]
      },
      {
        path: "/demo/dashboard",
        name: "dashboard",
        redirect: "/demo/dashboard/dataVisualize",
        meta: {
          icon: "element:Odometer",
          title: "Dashboard",
          link: "",
          show: 1,
          isFull: false,
          isAffix: false,
          keepAlive: 1
        },
        children: [
          {
            path: "/demo/dashboard/dataVisualize",
            name: "dataVisualize",
            component: () => import("@/views/dashboard/dataVisualize/index.vue"),
            meta: {
              icon: "element:Menu",
              title: "数据可视化",
              link: "",
              show: 1,
              isFull: false,
              isAffix: false,
              keepAlive: 1
            }
          }
        ]
      },
      {
        path: "/demo/form",
        name: "form",
        redirect: "/demo/form/proForm",
        meta: {
          icon: "element:Tickets",
          title: "表单 Form",
          link: "",
          show: 1,
          isFull: false,
          isAffix: false,
          keepAlive: 1
        },
        children: [
          {
            path: "/demo/form/proForm",
            name: "proForm",
            component: () => import("@/views/form/proForm/index.vue"),
            meta: {
              icon: "element:Menu",
              title: "超级 Form",
              link: "",
              show: 1,
              isFull: false,
              isAffix: false,
              keepAlive: 1
            }
          },
          {
            path: "/demo/form/basicForm",
            name: "basicForm",
            component: () => import("@/views/form/basicForm/index.vue"),
            meta: {
              icon: "element:Menu",
              title: "基础 Form",
              link: "",
              show: 1,
              isFull: false,
              isAffix: false,
              keepAlive: 1
            }
          },
          {
            path: "/demo/form/validateForm",
            name: "validateForm",
            component: () => import("@/views/form/validateForm/index.vue"),
            meta: {
              icon: "element:Menu",
              title: "校验 Form",
              link: "",
              show: 1,
              isFull: false,
              isAffix: false,
              keepAlive: 1
            }
          },
          {
            path: "/demo/form/dynamicForm",
            name: "dynamicForm",
            component: () => import("@/views/form/dynamicForm/index.vue"),
            meta: {
              icon: "element:Menu",
              title: "动态 Form",
              link: "",
              show: 1,
              isFull: false,
              isAffix: false,
              keepAlive: 1
            }
          }
        ]
      },
      {
        path: "/demo/echarts",
        name: "echarts",
        redirect: "/demo/echarts/waterChart",
        meta: {
          icon: "element:TrendCharts",
          title: "ECharts",
          link: "",
          show: 1,
          isFull: false,
          isAffix: false,
          keepAlive: 1
        },
        children: [
          {
            path: "/demo/echarts/waterChart",
            name: "waterChart",
            component: () => import("@/views/echarts/waterChart/index.vue"),
            meta: {
              icon: "element:Menu",
              title: "水型图",
              link: "",
              show: 1,
              isFull: false,
              isAffix: false,
              keepAlive: 1
            }
          },
          {
            path: "/demo/echarts/columnChart",
            name: "columnChart",
            component: () => import("@/views/echarts/columnChart/index.vue"),
            meta: {
              icon: "element:Menu",
              title: "柱状图",
              link: "",
              show: 1,
              isFull: false,
              isAffix: false,
              keepAlive: 1
            }
          },
          {
            path: "/demo/echarts/lineChart",
            name: "lineChart",
            component: () => import("@/views/echarts/lineChart/index.vue"),
            meta: {
              icon: "element:Menu",
              title: "折线图",
              link: "",
              show: 1,
              isFull: false,
              isAffix: false,
              keepAlive: 1
            }
          },
          {
            path: "/demo/echarts/pieChart",
            name: "pieChart",
            component: () => import("@/views/echarts/pieChart/index.vue"),
            meta: {
              icon: "element:Menu",
              title: "饼图",
              link: "",
              show: 1,
              isFull: false,
              isAffix: false,
              keepAlive: 1
            }
          },
          {
            path: "/demo/echarts/radarChart",
            name: "radarChart",
            component: () => import("@/views/echarts/radarChart/index.vue"),
            meta: {
              icon: "element:Menu",
              title: "雷达图",
              link: "",
              show: 1,
              isFull: false,
              isAffix: false,
              keepAlive: 1
            }
          },
          {
            path: "/demo/echarts/nestedChart",
            name: "nestedChart",
            component: () => import("@/views/echarts/nestedChart/index.vue"),
            meta: {
              icon: "element:Menu",
              title: "嵌套环形图",
              link: "",
              show: 1,
              isFull: false,
              isAffix: false,
              keepAlive: 1
            }
          }
        ]
      },
      {
        path: "/demo/directives",
        name: "directives",
        redirect: "/demo/directives/copyDirect",
        meta: {
          icon: "element:Stamp",
          title: "自定义指令",
          link: "",
          show: 1,
          isFull: false,
          isAffix: false,
          keepAlive: 1
        },
        children: [
          {
            path: "/demo/directives/copyDirect",
            name: "copyDirect",
            component: () => import("@/views/directives/copyDirect/index.vue"),
            meta: {
              icon: "element:Menu",
              title: "复制指令",
              link: "",
              show: 1,
              isFull: false,
              isAffix: false,
              keepAlive: 1
            }
          },
          {
            path: "/demo/directives/watermarkDirect",
            name: "watermarkDirect",
            component: () => import("@/views/directives/watermarkDirect/index.vue"),
            meta: {
              icon: "element:Menu",
              title: "水印指令",
              link: "",
              show: 1,
              isFull: false,
              isAffix: false,
              keepAlive: 1
            }
          },
          {
            path: "/demo/directives/dragDirect",
            name: "dragDirect",
            component: () => import("@/views/directives/dragDirect/index.vue"),
            meta: {
              icon: "element:Menu",
              title: "拖拽指令",
              link: "",
              show: 1,
              isFull: false,
              isAffix: false,
              keepAlive: 1
            }
          },
          {
            path: "/demo/directives/debounceDirect",
            name: "debounceDirect",
            component: () => import("@/views/directives/debounceDirect/index.vue"),
            meta: {
              icon: "element:Menu",
              title: "防抖指令",
              link: "",
              show: 1,
              isFull: false,
              isAffix: false,
              keepAlive: 1
            }
          },
          {
            path: "/demo/directives/throttleDirect",
            name: "throttleDirect",
            component: () => import("@/views/directives/throttleDirect/index.vue"),
            meta: {
              icon: "element:Menu",
              title: "节流指令",
              link: "",
              show: 1,
              isFull: false,
              isAffix: false,
              keepAlive: 1
            }
          },
          {
            path: "/demo/directives/longpressDirect",
            name: "longpressDirect",
            component: () => import("@/views/directives/longpressDirect/index.vue"),
            meta: {
              icon: "element:Menu",
              title: "长按指令",
              link: "",
              show: 1,
              isFull: false,
              isAffix: false,
              keepAlive: 1
            }
          }
        ]
      }
    ]
  }
];
