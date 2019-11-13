<template>
  <el-radio-group
    v-if="itemConfig.type === 'radio'"
    v-model="formData[itemConfig.prop]"
    :size="itemConfig.size"
    :placeholder="itemConfig.placeholder?itemConfig.placeholder:'请选择'"
  >
    <el-radio
      v-for="option in itemConfig.data"
      :key="option.id"
      :label="option.id"
    >{{ option.name }}</el-radio>
  </el-radio-group>
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
