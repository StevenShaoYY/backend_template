<template>
  <div class="main-wrapper">
    <base-form
      ref="dialogForm"
      :config="config"
      :form-data="formData"
      type="search"
      @submit="searchSubmit"
    />
    <slot />
    <base-table
      ref="searchTable"
      class="table-container"
      :api-service="apiService"
      :table-index="tableIndex"
      :grid-config="gridConfig"
      :grid-btn-config="gridBtnConfig"
      :grid-data="gridData"
      :grid-edit-width="gridEditWidth"
      :is-async="isAsync"
      :grid-selection="gridSelection"
      :hide-edit-area="hideEditArea"
      :router-edit="routerEdit"
      @selectChange="handleSelectionChange"
    />
  </div>
</template>

<script>
import baseTable from '@/components/baseTable/baseTable'
import baseForm from '@/components/baseForm/baseForm'
export default {
  components: {
    baseTable,
    baseForm
  },
  props: {
    // 数据接口
    apiService: {
      type: Object,
      default: () => {
        return {}
      }
    },
    //  表格编辑区域宽度
    gridEditWidth: {
      type: Number,
      default: 100
    },
    // 判断是否是异步数据
    isAsync: {
      type: Boolean,
      default: true
    },
    //  是否隐藏表格操作
    hideEditArea: {
      type: Boolean,
      default: false
    },
    // 表格配置
    gridConfig: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 表格按钮配置
    gridBtnConfig: {
      type: Object,
      default: () => {
        return {}
      }
    },
    //  表格是否可选择
    gridSelection: {
      type: Boolean,
      default: false
    },
    tableIndex: {
      type: Boolean,
      default: false
    },
    // 表格死数据
    gridData: {
      type: Array,
      default: () => {
        return []
      }
    },
    config: {
      type: Array,
      default: () => {
        return []
      }
    },
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    routerEdit: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 展示的表格数据，数据来源可能是父组件传递的固定数据，可能是接口请求数据
      showGridData: [],
      // 当前页码
      currentPage: 1,
      // 每页显示数量
      currentPageSize: 10,
      // 列表数据总数
      dataTotal: 0,
      // 表单数据
      formModel: {},
      //  表格加载状态
      listLoading: false
    }
  },
  watch: {
    // 防止表格预置数据不成功，涉及生命周期问题
    gridData() {
      this.showGridData = this.gridData
    }
  },
  mounted() {
    this.$refs.searchTable.getData(this.formData)
  },
  methods: {
    // 获取列表数据
    // getData() {
    //   this.listLoading = true
    //   const params = {
    //     page: this.currentPage,
    //     size: this.currentPageSize
    //   }
    //   this.apiService.list(params).then(res => {
    //     this.showGridData = res.data.records
    //     this.dataTotal = res.data.total
    //     this.listLoading = false
    //   }, err => {
    //     console.log(err)
    //     this.listLoading = false
    //   })
    // },
    getData() {
      this.$refs.searchTable.getData(this.formData)
    },
    searchSubmit(formData) {
      this.$refs.searchTable.getData(formData)
    },
    // 改变选择函数
    handleSelectionChange(val) {
      this.$emit('selectChange', val)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.main-wrapper {
  .expand-btn-comtainer{
    display: inline-block;
    margin-left: 10px;
  }
  .table-container{
    margin-top: 15px;
  }
}
</style>
