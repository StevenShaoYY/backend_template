import Layout from '@/layout'
export const asyncRoutes = [
  {
    path: '/form',
    component: Layout,
    meta: { title: '表单系统', icon: 'form', roles: ['admin', 'editor'] },
    redirect: '/form/formindex',
    children: [{
      path: 'formindex',
      name: 'FormIndex',
      component: () =>
                import('@/views/form/index'),
      meta: { title: '表单系统首页', roles: ['admin', 'editor'] }
    },
    {
      path: 'formEdit',
      name: 'FormEdit',
      component: () =>
                import('@/views/form/edit'),
      meta: { title: '表单系统', roles: ['admin', 'editor'] },
      hidden: true
    }
    ]
  }
]
