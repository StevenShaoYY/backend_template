<template>
  <div class="main-wrapper">
    <el-table
      v-loading="listLoading"
      :data="showGridData"
      border
      style="width: 100%"
      header-row-class-name="table-header2"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="gridSelection"
        type="selection"
        width="55"
      />
      <el-table-column
        v-if="tableIndex"
        label="序号"
        type="index"
        width="50"
      />
      <el-table-column
        v-for="(item,index) in gridConfig"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        show-overflow-tooltip
        :width="item.width?item.width:''"
      >
        <template slot-scope="scope">
          <Cell
            v-if="item.render"
            :row="scope.row"
            :column="item"
            :index="scope.$index"
            :render="item.render"
          />
          <span v-else>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="!hideEditArea" fixed="right" align="center" label="操作" :width="gridEditWidth?gridEditWidth:200">
        <template slot-scope="scope" class="btn-comtainer">
          <el-button v-if="gridBtnConfig.view || (gridBtnConfig.viewState && scope.row[gridBtnConfig.viewState.statusProp]==gridBtnConfig.viewState.status)" size="mini" type="primary" @click="view(scope.row)">查看</el-button>
          <el-button
            v-if="gridBtnConfig.update || (gridBtnConfig.updateState && scope.row[gridBtnConfig.updateState.statusProp]==gridBtnConfig.updateState.status) "
            size="mini"
            type="primary"
            @click="createOrUpdate(scope.row)"
          >修改
          </el-button>
          <el-button v-if="gridBtnConfig.delete || (gridBtnConfig.deleteState && scope.row[gridBtnConfig.deleteState.statusProp]==gridBtnConfig.deleteState.status)" size="mini" type="danger" @click="remove(scope.row)">删除</el-button>
          <!--扩展按钮-->
          <div
            v-if="gridBtnConfig.expands && gridBtnConfig.expands.length>0"
            class="expand-btn-comtainer"
          >
            <el-button
              v-for="(item2,index2) in gridBtnConfig.expands"
              v-show="scope.row[item2.statusProp]==item2.status"
              :key="index2"
              size="mini"
              :type="item2.type?item2.type:'primary'"
              @click="handleEmit(item2.emitName, scope.row)"
            >
              {{ item2.name }}
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--crud的分页组件-->
    <div class="crud-pagination">
      <!--如果不是异步请求展示数据，需要隐藏分页-->
      <el-pagination
        v-if="isAsync"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="currentPageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import Cell from './expand'

export default {
  components: {
    Cell
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
    //  表格是否可选择
    gridSelection: {
      type: Boolean,
      default: false
    },
    tableIndex: {
      type: Boolean,
      default: true
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
    // 表格死数据
    gridData: {
      type: Array,
      default: () => {
        return []
      }
    },
    routerEdit: {
      type: String,
      default: ''
    },
    deleteId: {
      type: String,
      default: undefined
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
      listLoading: false,
      searchParams: {}
    }
  },
  watch: {
    // 防止表格预置数据不成功，涉及生命周期问题
    gridData() {
      this.showGridData = this.gridData
    }
  },
  created() {
    if (localStorage.getItem('PAGE_STORAGE')) {
      this.currentPage = parseInt(localStorage.getItem('PAGE_STORAGE'))
    }
  },
  mounted() {
    // this.getData()
  },
  methods: {
    // 获取列表数据
    getData(searchParams) {
      this.listLoading = true
      if (localStorage.getItem('PAGE_STORAGE')) {
        this.currentPage = parseInt(localStorage.getItem('PAGE_STORAGE'))
      }
      if (localStorage.getItem('SIZE_STORAGE')) {
        this.currentPageSize = parseInt(localStorage.getItem('SIZE_STORAGE'))
      }
      let params = {
        page: this.currentPage,
        size: this.currentPageSize
      }
      if (searchParams) {
        this.searchParams = searchParams
      }
      if (this.searchParams !== {}) {
        params = { ...params, ...this.searchParams }
      }

      this.apiService.list(params).then(res => {
        this.showGridData = res.data.records || res.data.data
        this.dataTotal = res.data.total
        this.listLoading = false
      }, err => {
        console.log(err)
        this.listLoading = false
      })
    },
    createOrUpdate(item) {
      localStorage.setItem('PAGE_STORAGE', this.currentPage)
      localStorage.setItem('SIZE_STORAGE', this.currentPageSize)
      this.formModel = item ? Object.assign({}, item) : Object.assign({}, this.formData)
      const type = (item ? 'update' : 'create')
      let url = ''
      if (this.routerEdit === '') {
        url = '/' + this.apiService.routerUrl + '/edit'
      } else {
        url = this.routerEdit
      }
      const apisServiceStr = this.apiService.routerUrl
      const urlType = this.apiService.urlType
      const fmStr = JSON.stringify(this.formModel)
      this.$router.push({ path: url, query: {
        formData: fmStr,
        type,
        urlType,
        apiService: apisServiceStr
      }})
    },
    // 处理相应父组件的事件方法
    handleEmit(emitName, row) {
      this.$parent.$emit(emitName, row)
      this.$emit(emitName, row)
    },
    handleCurrentChange(page) {
      this.currentPage = page
      localStorage.setItem('PAGE_STORAGE', page)
      if (this.searchParams !== {}) {
        this.getData(this.searchParams)
      } else {
        this.getData()
      }
    },
    handleSizeChange(size) {
      this.currentPageSize = size
      localStorage.setItem('SIZE_STORAGE', size)
      if (this.searchParams !== {}) {
        this.getData(this.searchParams)
      } else {
        this.getData()
      }
    },
    // 模态框数据提交
    dialogSubmit(data) {
      this.apiService[data.userId ? 'update' : 'create'](data).then(res => {
        this.getData()
        this.$message.success(this.dialogTitle + '成功！')
      })
    },
    remove(data) {
      //  处理删除逻辑
      console.log(data)
      this.$confirm('此操作将永久删除该条记录, 是否继续?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning' }).then(() => {
        if (this.deleteId !== undefined) {
          this.apiService.delete(data[this.deleteId]).then(res => {
            this.getData()
            this.$message.success('删除成功！')
            this.$emit('afterdelete', data)
            this.$parent.$emit('afterdelete', data)
          })
        } else if (data.id !== undefined) {
          this.apiService.delete(data.id).then(res => {
            this.getData()
            this.$message.success('删除成功！')
            this.$emit('afterdelete', data)
            this.$parent.$emit('afterdelete', data)
          })
        } else if (data.itemId !== undefined) {
          this.apiService.delete(data.itemId).then(res => {
            this.getData()
            this.$message.success('删除成功！')
            this.$emit('afterdelete', data)
            this.$parent.$emit('afterdelete', data)
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    view(item) {
      this.formModel = Object.assign({}, item)
      const type = 'view'
      let url = ''
      if (this.routerEdit === '') {
        url = '/' + this.apiService.routerUrl + '/edit'
      } else {
        url = this.routerEdit
      }
      const apisServiceStr = this.apiService.routerUrl
      const urlType = this.apiService.urlType
      const fmStr = JSON.stringify(this.formModel)
      this.$router.push({ path: url, query: {
        formData: fmStr,
        type,
        urlType,
        apiService: apisServiceStr
      }})
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
  /* .expand-btn-comtainer :first-child {
    margin-left: -10px;
    padding-left:12px;
  } */
  .expand-btn-comtainer{
    display: inline-block;
    margin-left: 6px;
    .el-button {
      margin-right: 6px;
    }
    .el-button + .el-button{
      margin-left: 0px;
    }
  }
  .crud-pagination{
    margin-top: 10px;
  }
}
</style>
