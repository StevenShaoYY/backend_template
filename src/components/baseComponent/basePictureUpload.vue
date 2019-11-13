<template>
  <el-upload
    v-model="formData[itemConfig.prop]"
    accept="image/png, image/gif, image/jpg, image/jpeg"
    class="avatar-uploader"
    :action="uploadUrl"
    :show-file-list="false"
    :disabled="itemConfig.disabled"
    :before-upload="beforeAvatarUpload"
    :on-success="handleSuccess"
    :on-exceed="handleExceed"
    :file-list="fileList"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" @click="imgRepost(itemConfig.prop)">
    <el-button
      v-if="!imageUrl && formtype!='view'&& !itemConfig.disabled"
      style="margin-left:5px;"
      size="small"
      :disabled="itemConfig.disabled"
      type="primary"
      plain
      @click="changePic(itemConfig.prop)"
    >点击上传</el-button>
    <div>
      <el-button v-if="imageUrl && formtype!='view'" size="small" :disabled="itemConfig.disabled" type="primary" plain @click="imgRepost(itemConfig.prop)">重传</el-button>
      <el-button v-if="imageUrl && formtype!='view'" size="small" :disabled="itemConfig.disabled" type="primary" plain @click.stop="imgRemove(itemConfig.prop)">删除</el-button>
    </div>
    <div
      v-if="formtype!='view'&& !itemConfig.disabled"
      slot="tip"
      style="margin-left:5px;"
      class="el-upload__tip"
    >只能上传jpg/png文件</div>
  </el-upload>
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
      fileList: [],
      imageUrl: undefined,
      uploadUrl: '',
      PicProp: ''
    }
  },
  created() {
    this.uploadUrl = process.env.VUE_APP_IMAGE_API + 'upload?project=micropark'
    if (this.formData[this.itemConfig.prop] !== '' && this.formData[this.itemConfig.prop] !== undefined) {
      this.$set(this.fileList, 0, {})
      this.$set(this.fileList[0], 'url', this.formData[this.itemConfig.prop])
      this.imageUrl = this.formData[this.itemConfig.prop]
    }
  },
  methods: {
    imgRepost(prop) {
      this.PicProp = prop
    },
    changePic(prop) {
      this.PicProp = prop
    },
    handleExceed() {
      this.$message({
        message: '最多只能上传两张图片，请先删除图片再上传！',
        type: 'warning'
      })
    },
    handleSuccess(response, file) {
      this.formData[this.itemConfig.prop] = process.env.VUE_APP_IMAGE_API + 'stream/micropark/' + response.ObjectId
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    imgRemove(prop) {
      this.$set(this.formData, prop, '')
      this.imageUrl = ''
      this.$set(this.fileList, 0, [])
    },
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
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
    margin-left: 5px;
    margin-bottom: 5px;
  }
</style>
