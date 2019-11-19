
import Vue from 'vue'
import { DEVE_MODE } from '../settings'
let Router = {}
if (process.env.NODE_ENV !== DEVE_MODE) {
  Router = require('vue-router').default
  Vue.use(Router)
}
/* Layout */
const Layout = () => import('@/layout')
const asyncRoutes = require('./asyncRoutes')
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
  path: '/login',
  component: () =>
            import('@/views/login/index'),
  hidden: true
},

{
  path: '/404',
  component: () =>
            import('@/views/404'),
  hidden: true
},

{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: () =>
                import('@/views/dashboard/index'),
    meta: { title: '基础应用', icon: 'dashboard' }
  }]
},

{
  path: '/example',
  component: Layout,
  redirect: '/example/table',
  name: 'Example',
  meta: { title: '资源管理', icon: 'example' },
  children: [{
    path: 'table',
    name: 'Table',
    component: () =>
                    import('@/views/table/index'),
    meta: { title: 'Table', icon: 'table' }
  },
  {
    path: 'tree',
    name: 'Tree',
    component: () =>
                    import('@/views/tree/index'),
    meta: { title: 'Tree', icon: 'tree' }
  }
  ]
}
  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]
let router = {}
if (process.env.NODE_ENV === DEVE_MODE) {
  router = {
    constantRoutes,
    asyncRouterMap: asyncRoutes.asyncRoutes
  }
} else {
  const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })
  router = createRouter()
  router.resetRouter = function() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
  }
}

export default router

