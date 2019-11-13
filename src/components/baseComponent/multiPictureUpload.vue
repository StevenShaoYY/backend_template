<template>
  <el-col :span="24">
    <el-upload
      v-model="formData[itemConfig.prop]"
      accept="image/png, image/gif, image/jpg, image/jpeg"
      class="avatar-uploader"
      :action="uploadUrl"
      multiple
      :show-file-list="false"
      :limit="itemConfig.limit"
      :before-upload="beforeAvatarUpload"
      :on-success="handleSuccessMore"
      :on-exceed="handleExceed"
      :file-list="picFileList"
      list-type="picture"
    >
      <el-button v-if="formtype!='view'&& !itemConfig.disabled" size="small" type="primary" :disabled="itemConfig.disabled" plain>点击上传</el-button>
      <div v-if="formtype!='view'&& !itemConfig.disabled" slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
    </el-upload>
    <div v-for="(item2, index2) of picFileList" :key="index2" class="flie-container">
      <img :src="item2.url" class="pic-avatar">
      <el-button v-if="formtype!='view'&& !itemConfig.disabled" type="danger" icon="el-icon-error" class="pic-btn-del" circle @click.stop="file2Remove(index2,itemConfig.prop)" />
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
      uploadUrl: '',
      picFileList: [],
      fileList2: []
    }
  },
  created() {
    this.uploadUrl = process.env.VUE_APP_IMAGE_API + 'upload?project=micropark'
    if (this.formData[this.itemConfig.prop] !== '' && this.formData[this.itemConfig.prop] !== undefined) {
      this.picFileList = JSON.parse(this.formData[this.itemConfig.prop])
    }
  },
  methods: {
    // 上传图片成功
    handleSuccessMore(response, file) {
      if (response) {
        if (this.picFileList) {
          this.picFileList.push({
            'url': process.env.VUE_APP_IMAGE_API + 'stream/micropark/' + response.ObjectId
          })
        }
        this.formData[this.itemConfig.prop] = JSON.stringify(this.picFileList)
      }
    },
    file2Remove(index, prop) {
      if (this.picFileList) {
        this.picFileList.splice(index, 1)
        this.formData[this.itemConfig.prop] = JSON.stringify(this.picFileList)
      }
    },
    handleExceed() {
      this.$message({
        message: `最多只能上传${this.itemConfig.limit}张图片，请先删除图片再上传！`,
        type: 'warning'
      })
    },
    // 上传图片前验证
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isLt2M
    }
  }
}
</script>

<style lang="scss" scoped>
  .flie-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .pic-avatar{
      // display: none;
    }
    .pic-btn-del{
      // display: none;
    }
    button {
      padding: 0px;
      height: 17px;
      margin-right:30px;
    }
  }
  .pic-avatar{
    display: block;
    width: 200px;
    height: 150px;
    font-size: 12px;
    color:#606266;
  }
</style>
