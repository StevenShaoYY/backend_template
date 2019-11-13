import Mock from 'mockjs'

const data = Mock.mock({
  'items|10': [{
    id: '@id',
    flowNumber: '@id',
    eventContent: '@sentence(10, 12)',
    submitUsername: 'name',
    submitTime: '@datetime',
    state: '@integer(1, 3)',
    emergency: '@integer(1, 3)',
    city: '330100',
    county: '330106',
    province: '330000'
  }]
})

export default [{
  url: '/mock/form/list',
  type: 'post',
  response: config => {
    const items = data.items
    return {
      status: 200,
      data: {
        total: items.length,
        records: items
      }
    }
  }
},
{
  url: '/mock/form/add',
  type: 'post',
  response: config => {
    const items = data.items
    return {
      status: 200,
      data: {
        total: items.length,
        items: items
      }
    }
  }
},
{
  url: '/mock/form/update',
  type: 'patch',
  response: config => {
    const items = data.items
    return {
      status: 200,
      data: {
        total: items.length,
        items: items
      }
    }
  }
},
{
  url: '/mock/form/delete',
  type: 'delete',
  response: config => {
    const items = data.items
    return {
      status: 200,
      data: {
        total: items.length,
        items: items
      }
    }
  }
}
]
