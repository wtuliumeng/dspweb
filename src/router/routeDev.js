
/**
 * 这里配置开发环境写死的路由和菜单，方便开发
 */

//静态路由
var routeDevList = [
    {
        path: '/routedev',
        component: resolve => require(['../components/test/RouteDev'], resolve),
        meta: {
            title: '静态菜单路由'
        }
    },

    {
        path: '/usersimcert',
        component: resolve  => require(['../components/simulation/userSimCert.vue'], resolve),
        meta: {
             title: '用户模拟认证'
        }
    },

    {
        path: '/asynctasksimcall',
        component: resolve  => require(['../components/simulation/asyncTaskSimCall.vue'], resolve),
        meta: {
             title: '异步任务模拟调用'
        }
    },

    {
        path: '/synctasksimcall',
        component: resolve  => require(['../components/simulation/synctasksimcall.vue'], resolve),
        meta: {
             title: '实时任务模拟调用'
        }
    },

    {
        path: '/userconfig',
        component: resolve => require(['../components/configcenter/userconfig.vue'], resolve),
        meta: {
            title: '用户配置'
        }
    },
    {
        path: '/synctaskconfig',
        component: resolve => require(['../components/configcenter/synctaskconfig.vue'], resolve),
        meta: {
            title: '实时任务配置'
        }
    },
    {
        path: '/asynctaskconfig',
        component: resolve => require(['../components/configcenter/asynctaskconfig.vue'], resolve),
        meta: {
            title: '异步任务配置'
        }
    },
    {
        path: '/datamanage',
        component: resolve => require(['../components/statistic/dataManage.vue'], resolve),
        meta: {
            title: '数据集服务'
        }
    },
    {
        path: '/dataretrieval',
        component: resolve => require(['../components/statistic/dataRetrieval.vue'], resolve),
        meta: {
            title: '数据检索'
        }
    },
    {
        path: '/fileretrieval',
        component: resolve => require(['../components/statistic/fileRetrieval.vue'], resolve),
        meta: {
            title: '文件检索'
        }
    },
    {
        path: '/datadev',
        component: resolve => require(['../components/monitorcenter/DataDev'], resolve),
        meta: {
            title: '采集服务监控'
        }
    },
    {
        path: '/servicemonitor',
        component: resolve => require(['../components/monitorcenter/ServiceMonitor'], resolve),
        meta: {
            title: '异步交换服务监控'
        }
    },
    {
        path: '/callservicemonitor',
        component: resolve => require(['../components/monitorcenter/CallServiceMonitor'], resolve),
        meta: {
            title: '调用服务监控'
        }
    }

];
//静态菜单 开发先写死
var menuDevList = [
    {
        icon: 'el-icon-date',
        index: Math.random()+'',
        title: '配置管理',
        subs: [
            {
                index: 'userconfig',
                title: '用户配置'
            },
            {
                index: 'synctaskconfig',
                title: '实时任务配置'
            },
            {
                index: 'asynctaskconfig',
                title: '异步任务配置'
            }
        ]
    },
    {
        icon: 'el-icon-date',
        index: Math.random()+'',
        title: '数据集管理',
        subs: [
            {
                index: 'datamanage',
                title: '数据集服务'
            },
            {
                index: 'dataretrieval',
                title: '数据检索'
            },
            {
                index: 'fileretrieval',
                title: '文件检索'
            }
        ]
    },
    {
        icon: 'el-icon-date',
        index: Math.random()+'',
        title: '模拟调用',
        subs: [
            {
                index: 'usersimcert',
                title: '用户模拟认证'
            },
            {
                index: 'asynctasksimcall',
                title: '异步任务模拟调用'
            },
            {
                index: 'synctasksimcall',
                title: '实时任务模拟调用'
            }
        ]
    },
    {
        icon: 'el-icon-date',
        index: Math.random()+'',
        title: '监控中心',
        subs: [
            {
                index: 'datadev',
                title: '采集服务监控'
            },
            {
                index: 'servicemonitor',
                title: '异步交换服务监控'
            },
            {
                index: 'callservicemonitor',
                title: '实时调用服务监控'
            }
        ]
    }
]


var routeDev = {
    ROUTE_DEV: true,//是否写入静态路由（开关）
    routeDevList: routeDevList,
    MENU_DEV: true,//是否写入静态菜单（开关）
    menuDevList: menuDevList,
}
export default routeDev;
