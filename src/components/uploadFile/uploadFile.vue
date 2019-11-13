<template>
  <el-dialog title="上传文件" :visible.sync="dialogFormVisible" :before-close="close">
    <el-upload
      class="upload-demo"
      :action="innerUrl"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :before-upload="beforeUpload"
      :limit="1"
      :headers="innerHeader"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :on-success="handleSuccess"
      :data="uploadData"
    >
      <slot />
      <el-button size="small" type="primary" style="margin-right:20px;" @click.stop="download">导入模板下载</el-button>
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">请上传excel文件</div>
    </el-upload>
  </el-dialog>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  components: {},
  props: {
    // 数据接口
    visible: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: ''
    },
    uploadData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    hasslot: {
      type: Boolean,
      default: false
    },
    select: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      fileList: [],
      innerHeader: {}
    }
  },
  watch: {
    visible(newval, oldVal) {
      this.dialogFormVisible = newval
    },
    select(newval, oldVal) {
      this.uploadData.townId = this.select
    }
  },
  created() {
    this.innerUrl = process.env.VUE_APP_BASE_API + this.url
    this.innerHeader = {
      'Authorization': getToken()
    }
    if (this.hasslot) { this.uploadData.townId = this.select }
  },
  mounted() {
  },
  methods: {
    close() {
      this.dialogFormVisible = false
      this.$emit('close')
    },
    download() {
      this.$emit('download')
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleSuccess(response, file, fileList) {
      if (response.success === true) {
        this.$emit('success', response)
      } else {
        this.$emit('error', response)
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      console.log(file)
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    beforeUpload(file) {
      if (this.hasslot) {
        if (this.select === 0 || this.select === null) {
          this.$message.error('请先选择小镇！')
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
