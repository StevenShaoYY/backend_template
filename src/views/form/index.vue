<template>
  <div class="app-container">
    <search-table
      ref="baseTable"
      :api-service="formService"
      :grid-config="CONFIG.gridConfig"
      :grid-btn-config="CONFIG.gridBtnConfig"
      :grid-selection="false"
      :table-index="true"
      :grid-data="testData"
      :grid-edit-width="300"
      :config="CONFIG.searchConfig"
      router-edit="formedit"
      @test="testHandle"
    >
      <el-button size="mini" type="success" @click="add">添加表单</el-button>
    </search-table>
  </div>
</template>

<script>
import searchTable from '@/components/searchTable/searchTable'
import { formService } from '@/api/formService'
import { CONFIG } from './indexConfig'
export default {
  name: 'Dashboard',
  components: {
    searchTable
  },
  data() {
    return {
      formService,
      testData: [],
      CONFIG
    }
  },
  methods: {
    testHandle(val) {
      this.$message('这是一个测试按钮')
    },
    add() {
      const type = 'create'
      console.log()
      const url = '/' + this.formService.routerUrl + `/${this.formService.routerUrl}edit`
      const apisServiceStr = this.formService.routerUrl
      const urlType = this.formService.urlType
      this.$router.push({ path: url, query: {
        type,
        urlType,
        apiService: apisServiceStr
      }})
      // this.$router.push({ path: '/building/buildingedit', query: {
      //   building: JSON.stringify(this.FORMMODEL)
      // }})
    }
  }
}
</script>

<style scoped>
</style>

