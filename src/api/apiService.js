import request from '@/utils/request'

export class ApiService {
  constructor(url, type) {
    this.baseUrl = `${type}/${url}`
    this.routerUrl = url
    this.urlType = type
  }

  // 获取列表数据
  list(data) {
    return request({
      url: this.baseUrl + '/list',
      method: 'post',
      data
    })
  }

  // 新增数据
  create(data) {
    return request({
      url: this.baseUrl + '/add',
      method: 'post',
      data: data
    })
  }

  // 修改数据
  update(data) {
    return request({
      url: this.baseUrl + '/update',
      method: 'patch',
      data: data
    })
  }

  // 删除数据
  delete(id) {
    return request({
      url: this.baseUrl + '/delete/' + id,
      method: 'delete'
    })
  }

  // 获取数据详情
  view(id) {
    return request({
      url: this.baseUrl + '/view/' + id,
      method: 'get'
    })
  }
}
