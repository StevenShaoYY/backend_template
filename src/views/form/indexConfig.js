export const CONFIG = {
  searchConfig: [{
    TitleConfig: {
      hidden: true
    },
    FormConfig: [{
      span: 4,
      label: '事件流水号',
      labelWidth: '90',
      prop: 'flowNumber',
      type: 'text',
      size: 'mini'
    },
    {
      span: 4,
      label: '提交用户',
      prop: 'submitUsername',
      labelWidth: '80',
      size: 'mini',
      type: 'text'
    },
    {
      span: 9,
      label: '提交时间',
      prop1: 'submitTimeStart',
      prop2: 'submitTimeEnd',
      labelWidth: '80',
      linkWord: '到',
      size: 'mini',
      type: 'daterange'
    },
    {
      span: 4,
      label: '处理状态',
      labelWidth: '80',
      size: 'mini',
      prop: 'state',
      type: 'select',
      data: [{ name: '已处理', id: 2 }, { name: '关闭', id: 3 }]
    }
    ]
  }],
  gridConfig: [
    { label: '事件流水号', prop: 'flowNumber' },
    { label: '事件内容', prop: 'eventContent' },
    { label: '提交时间', prop: 'submitTime' },
    { label: '提交用户', prop: 'submitUsername' },
    {
      label: '状态',
      prop: 'state',
      render: (h, params) => {
        if (params.row.state === 1) {
          return h(
            'el-tag', {
              props: {
                type: 'warning',
                size: 'mini'
              }
            },
            '待处理'
          )
        } else if (params.row.state === 2) {
          return h(
            'el-tag', {
              props: {
                type: 'success',
                size: 'mini'
              }
            },
            '已处理'
          )
        } else if (params.row.state === 3) {
          return h(
            'el-tag', {
              props: {
                type: 'info',
                size: 'mini'
              }
            },
            '已关闭'
          )
        }
      }
    }
  ],
  gridBtnConfig: {
    create: true,
    update: true,
    delete: true,
    view: false,
    expands: [
      { name: '测试', emitName: 'test', type: 'primary' }
    ]
  }
}
