<template>
  <div class="main-wrapper">
    <el-row :span="addcardConfig.span?addcardConfig.span:24" class="col">
      <el-col v-if="addcardConfig.createUser || addcardConfig.createBy" class="col-info">添加人：{{ addcardConfig.createUser || addcardConfig.createBy }}</el-col>
      <el-col v-if="addcardConfig.adviceAccount||addcardConfig.submitUsername" class="col-info">用户名：{{ addcardConfig.adviceAccount || addcardConfig.submitUsername }}</el-col>
      <el-col v-if="addcardConfig.createTime" class="col-info">添加时间：{{ addcardConfig.createTime }}</el-col>
      <el-col v-if="addcardConfig.updateUser || addcardConfig.updateBy" class="col-info">最后修改人：{{ addcardConfig.updateUser || addcardConfig.updateBy }}</el-col>
      <el-col v-if="addcardConfig.replyAccount" class="col-info">回复人：{{ addcardConfig.replyAccount || addcardConfig.updateBy }}</el-col>
      <el-col v-if="addcardConfig.handler" class="col-info">处理人：{{ addcardConfig.handler }}</el-col>
      <el-col v-if="addcardConfig.updateTime" class="col-info">最后修改时间：{{ addcardConfig.updateTime }}</el-col>
      <el-col v-if="addcardConfig.replyTime" class="col-info">回复时间：{{ addcardConfig.replyTime }}</el-col>
      <el-col v-if="addcardConfig.processingTime" class="col-info">处理时间：{{ addcardConfig.processingTime }}</el-col>
      <el-col v-if="addcardConfig.reason" class="col-info">{{ addcardConfig.reason }}</el-col>
    </el-row>
    <slot />
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {
    // 数据接口
    addcardConfig: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.main-wrapper {
  height: 60px;
  .col{
    background-color: #f1f6fc;
    display: flex;
    justify-content: space-between;
    .col-info{
      color: #333333;
    }
  }
}
</style>
