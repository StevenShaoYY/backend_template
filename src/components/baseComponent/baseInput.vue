<template>
  <el-col :span="24" style="display:flex">
    <el-input
      v-model="formData[itemConfig.prop]"
      :size="itemConfig.size"
      :show-password="itemConfig.password"
      :disabled="itemConfig.disabled || formtype=='view'"
      :placeholder="itemConfig.placeholder?itemConfig.placeholder:'请输入'"
      @focus="inputEmit(itemConfig.emit, formData[itemConfig.prop])"
    />
    <span v-if="itemConfig.unit" style="margin-left:10px;">{{ itemConfig.unit }}</span>
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
