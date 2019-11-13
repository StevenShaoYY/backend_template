<template>
  <el-select
    v-model="formData[itemConfig.prop]"
    style="margin-left:5px;"
    clearable
    :size="itemConfig.size"
    :disabled="itemConfig.disabled || formtype=='view'"
    :placeholder="itemConfig.placeholder?itemConfig.placeholder:'请选择'"
  >
    <el-option
      v-for="option in itemConfig.data"
      :key="option.id"
      :label="option.name"
      :value="option.id"
    />
  </el-select>
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
