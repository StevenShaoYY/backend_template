<template>
  <div class="dashboard-container">
    <base-form
      ref="dialogForm"
      :type="formType"
      :expand-btn="expandBtn"
      :config="CONFIG"
      :form-data="formModel"
      @submit="dialogSubmit"
      @formcancle="formCancle"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import baseForm from '@/components/baseForm/baseForm'
import { FORMCONFIG, EXPANDBTN } from './formConfig'
import { ApiService } from '@/api/apiService'

export default {
  name: 'Dashboard',
  components: {
    baseForm
  },
  data() {
    return {
      UserApiService: {},
      formModel: {},
      formData: {},
      CONFIG: FORMCONFIG,
      formType: 'create',
      expandBtn: EXPANDBTN
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  mounted() {
  },
  created() {
    // 更新时获得部门下拉菜单
    this.UserApiService = new ApiService(this.$route.query.apiService, this.$route.query.urlType)
    if (this.$route.query.formData) {
      this.formData = JSON.parse(this.$route.query.formData)
      this.formModel = this.formData
      this.$route.meta.title = '表单系统' + '修改'
    } else {
      this.$route.meta.title = '表单系统' + '新增'
    }
    this.formType = this.$route.query.type
  },
  methods: {
    dialogSubmit(val) {
      this.UserApiService.update(val).then(res => {
        this.$router.go(-1)
      })
    },
    formCancle() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
}
</style>
