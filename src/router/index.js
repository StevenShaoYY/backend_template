import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

const routes = Vue.__share_pool__.routes
function handelRoutes(route) {
  Reflect.ownKeys(route).forEach(key => {
    route[key].constantRoutes.forEach(i => {
      if (i.path) {
        i.path = `/${key}${i.path}`
      }
      if (i.redirect) {
        i.redirect = `/${key}${i.redirect}`
      }
    })
    route[key].asyncRouterMap.forEach(i => {
      if (i.path) {
        i.path = `/${key}${i.path}`
      }
      if (i.redirect) {
        i.redirect = `/${key}${i.redirect}`
      }
    })
  })
}
handelRoutes(routes)
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
  component: () => import('@/views/login/index'),
  hidden: true
},
{
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true
},
{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index'),
    meta: { title: '首页', icon: 'dashboard' }
  }]
}
// 404 page must be placed at the end !!!
// { path: '*', redirect: '/404', hidden: true }
]
// constantRoutes.push({
//   path: '/e_you_manage',
//   component: Layout,
//   redirect: '/e_you_manage',
//   children: routes['e_you_manage'].constantRoutes,
//   meta: { title: '系统设置', icon: 'xitong', menu_code: 'eyou_system' }
// })
Vue.__share_pool__.routes.finalRoute = constantRoutes
export const asyncRouterMap = [
  {
    path: '/test',
    component: Layout,
    name: 'test',
    redirect: '/test/dashboard',
    children: [...routes['test'].constantRoutes, ...routes['test'].asyncRouterMap],
    meta: { title: 'test中心', icon: 'wuye', roles: ['admin', 'editor'] }
  }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
