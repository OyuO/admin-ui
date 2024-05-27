import Vue from "vue"
import Router from "vue-router"
import Layout from "@/layout"

Vue.use(Router)

export const constantRoutes = [
    {
        path: "/redirect",
        component: Layout,
        hidden: true,
        children: [
            {
                path: "/redirect/:path(.*)",
                component: () => import("@/views/redirect")
            }
        ]
    },
    {
        path: "/login",
        component: () => import("@/views/login"),
        hidden: true
    },
    {
        path: "/register",
        component: () => import("@/views/register"),
        hidden: true
    },
    {
        path: "/404",
        component: () => import("@/views/error/404"),
        hidden: true
    },
    {
        path: "/401",
        component: () => import("@/views/error/401"),
        hidden: true
    },
    {
        path: "",
        component: Layout,
        redirect: "index",
        children: [
            {
                path: "index",
                component: () => import("@/views/index"),
                name: "Index",
                meta: {title: "首页", icon: "dashboard", affix: true}
            }
        ]
    },
    {
        path: "/user",
        component: Layout,
        hidden: true,
        redirect: "noredirect",
        children: [
            {
                path: "profile",
                component: () => import("@/views/system/user/profile/index"),
                name: "Profile",
                meta: {title: "个人中心", icon: "user"}
            }
        ]
    }
]

export const dynamicRoutes = [
    {
        path: "/system/user-auth",
        component: Layout,
        hidden: true,
        permissions: ["system:user:edit"],
        children: [
            {
                path: "role/:userId(\\d+)",
                component: () => import("@/views/system/user/authRole"),
                name: "AuthRole",
                meta: {title: "分配角色", activeMenu: "/system/user"}
            }
        ]
    },
    {
        path: "/system/role-auth",
        component: Layout,
        hidden: true,
        permissions: ["system:role:edit"],
        children: [
            {
                path: "user/:roleId(\\d+)",
                component: () => import("@/views/system/role/authUser"),
                name: "AuthUser",
                meta: {title: "分配用户", activeMenu: "/system/role"}
            }
        ]
    },
    {
        path: "/system/dict-data",
        component: Layout,
        permissions: ["system:dict:list"],
        children: [
            {
                path: "index/:dictId(\\d+)",
                component: () => import("@/views/system/dict/data"),
                name: "Data",
                meta: {title: "字典数据", activeMenu: "/system/dict"}
            }
        ]
    },
    {
        path: "/monitor/job-log",
        component: Layout,
        hidden: true,
        permissions: ["monitor:job:list"],
        children: [
            {
                path: "index/:jobId(\\d+)",
                component: () => import("@/views/monitor/job/log"),
                name: "JobLog",
                meta: {title: "调度日志", activeMenu: "/monitor/job"}
            }
        ]
    },
    {
        path: "/tool/gen-edit",
        component: Layout,
        hidden: true,
        permissions: ["tool:gen:edit"],
        children: [
            {
                path: "index/:tableId(\\d+)",
                component: () => import("@/views/tool/gen/editTable"),
                name: "GameEdit",
                meta: {title: "修改生成配置", activeMenu: "/tool/gen"}
            }
        ]
    }
]


let routerPush = Router.prototype.push
let routerReplace = Router.prototype.replace

Router.prototype.push = function (location) {
    return routerPush.call(this, location).catch(err => err)
}

Router.prototype.replace = function (location) {
    return routerReplace.call(this, location).catch(err => err)
}

export default new Router({
    mode: "history",
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
})
