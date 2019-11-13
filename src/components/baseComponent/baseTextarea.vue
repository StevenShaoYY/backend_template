<template>
  <el-col :span="24">
    <el-input
      v-model="formData[itemConfig.prop]"
      :disabled="itemConfig.disabled || formtype=='view'"
      :autosize="itemConfig.autosize"
      type="textarea"
      :placeholder="itemConfig.placeholder?itemConfig.placeholder:'请输入'"
    />
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
    }
  },
  created() {
  },
  methods: {
    inputEmit(val) {
      this.$emit('resultchange', val)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
