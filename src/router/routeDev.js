
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

];
//静态菜单
var menuDevList = [
    {
        icon: 'el-icon-date',
        index: Math.random()+'',
        title: '配置管理',
        subs: [
            {
                index: 'routedev',
                title: '用户配置'
            },
            {
                index: 'routedev',
                title: '实时任务配置'
            },
            {
                index: 'routedev',
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
                index: 'routedev',
                title: '数据集配置'
            },
            {
                index: 'routedev',
                title: '数据集查询'
            },
            {
                index: 'routedev',
                title: '系统文件查询'
            }
        ]
    },
    {
        icon: 'el-icon-date',
        index: Math.random()+'',
        title: '模拟模块',
        subs: [
            {
                index: 'routedev',
                title: '用户模拟认证'
            },
            {
                index: 'routedev',
                title: '异步任务模拟调用'
            },
            {
                index: 'routedev',
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
                index: 'routedev',
                title: '采集服务监控'
            },
            {
                index: 'routedev',
                title: '异步交换服务监控'
            },
            {
                index: 'routedev',
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
