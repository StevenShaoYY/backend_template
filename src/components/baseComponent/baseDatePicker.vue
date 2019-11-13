<template>
  <el-date-picker
    v-if="itemConfig.type === 'datepicker'"
    v-model="formData[itemConfig.prop]"
    :size="itemConfig.size"
    value-format="yyyy-MM-dd"
    :disabled="itemConfig.disabled || formtype=='view'"
    type="date"
    :placeholder="itemConfig.placeholder?itemConfig.placeholder:'请选择日期'"
  />
  <el-date-picker
    v-else-if="itemConfig.type === 'datetimepicker'"
    v-model="formData[itemConfig.prop]"
    value-format="yyyy-MM-dd HH:mm:ss"
    :size="itemConfig.size"
    :disabled="itemConfig.disabled || formtype=='view'"
    type="datetime"
    :placeholder="itemConfig.placeholder?itemConfig.placeholder:'请选择日期和时间'"
  />
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
  }
}
</script>

<style lang="scss" scoped>
</style>
