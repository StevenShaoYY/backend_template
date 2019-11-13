<template>
  <el-col :span="24">
    <el-upload
      v-model="formData[itemConfig.prop]"
      :action="fileUploadUrl"
      :show-file-list="false"
      :on-success="filehandleSuccess"
      :on-change="filehandleSuccess"
      :on-exceed="filehandleExceed"
      :limit="itemConfig.limit"
      :file-list="pdfFileList"
      list-type="picture"
    >
      <el-button v-if="formtype!='view' && !itemConfig.disabled" size="small" type="primary" plain :disabled="itemConfig.disabled">点击上传</el-button>
      <div v-if="formtype!='view' && !itemConfig.disabled" slot="tip" class="el-upload__tip">请上传文件</div>
    </el-upload>
    <div v-for="(item2, index2) of pdfFileList" :key="index2" class="flie2-container">
      <a :href="item2.url" class="file-avatar">{{ item2.name }}</a>
      <el-button v-if="formtype!='view' && !itemConfig.disabled" type="danger" icon="el-icon-error" class="file-btn-del" circle @click.stop="fileRemove(index2,itemConfig.prop)" />
    </div>
  </el-col>
</template>

<script>
export default {
  props: {
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    itemConfig: {
      type: Object,
      default: () => {
        return {}
      }
    },
    formtype: {
      type: String,
      default: 'form'
    }
  },
  data() {
    return {
      fileUploadUrl: '',
      pdfFileList: []
    }
  },
  created() {
    this.fileUploadUrl = process.env.VUE_APP_FILE_API + 'upload?project=eyou'
    if (this.formData[this.itemConfig.prop] !== '' && this.formData[this.itemConfig.prop] !== undefined) {
      this.pdfFileList = JSON.parse(this.formData[this.itemConfig.prop])
    }
  },
  methods: {
    filehandleSuccess(response, file) {
      if (response.data) {
        this.pdfFileList.push({
          url: process.env.VUE_APP_FILE_API + 'download/eyou/' + response.data.objectId,
          name: file.name
        })
        this.formData[this.itemConfig.prop] = JSON.stringify(this.pdfFileList)
      }
    },
    fileRemove(index, prop) {
      if (this.pdfFileList.length > 0) {
        this.pdfFileList.splice(index, 1)
        this.formData[this.itemConfig.prop] = JSON.stringify(this.pdfFileList)
      }
    },
    filehandleExceed() {
      this.$message({
        message: `最多只能上传${this.itemConfig.limit}个文件，请先删除文件再上传！`,
        type: 'warning'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .flie2-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .pic-avatar{
      display: none;
    }
    button {
      padding: 0px;
      height: 17px;
      margin-right:30px;
    }
  }
  .file-avatar{
    display: block;
    font-size: 12px;
    color:#606266;
  }
</style>
