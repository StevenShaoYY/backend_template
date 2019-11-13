import request from '@/utils/request'

export function getProvinceOptions(id) {
  return request({
    url: `http://localhost:9090/eyousystem/region/list/${id}`,
    method: 'get',
    headers: {
      Authorization: 'eyJyZWFsTmFtZSI6Im1pY3JvcGFyayIsIm9nSWQiOjIsInVzZXJOYW1lIjoibWljcm9wYXJrMSIsImFsZyI6IkhTMjU2IiwiaXNTeXMiOnRydWV9.eyJqdGkiOiIxIiwic3ViIjoibWljcm9wYXJrMSIsImlhdCI6MTU3Mjg1ODQ4NiwiYXV0aCI6IlJPTEVfQURELFJPTEVfREVMLFJPTEVfRVhQT1JULFJPTEVfSU1QUk9SVCxST0xFX1VQREFURSxST0xFX1ZJRVciLCJleHAiOjE1NzI5NDQ4ODZ9.TZHe7Zd5SHoXPITTktQyQxLCWBQz3Dp-UThSxvwkX9c'
    }
  })
}
