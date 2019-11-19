const Layout = () => import('@/layout')
export const asyncRoutes = [
  {
    path: '/form',
    component: Layout,
    meta: { title: '表单系统', icon: 'form', roles: ['admin', 'editor'], menu_code: 'eyou_front_sys' },
    redirect: '/form/formindex',
    children: [{
      path: 'formindex',
      name: 'FormIndex',
      component: () =>
                import('@/views/form/index'),
      meta: { title: '表单系统首页', roles: ['admin', 'editor'], menu_code: 'eyou_front_sys' }
    },
    {
      path: 'formEdit',
      name: 'FormEdit',
      component: () =>
                import('@/views/form/edit'),
      meta: { title: '表单系统', roles: ['admin', 'editor'], menu_code: 'eyou_front_sys' },
      hidden: true
    }
    ]
  }
]
