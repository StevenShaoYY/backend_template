<template>
  <el-checkbox-group
    v-model="formData[itemConfig.prop]"
    :placeholder="itemConfig.placeholder?itemConfig.placeholder:'请选择'"
    :size="itemConfig.size"
  >
    <el-checkbox
      v-for="(option, index) in itemConfig.data"
      :key="index"
      :label="option.id"
    >{{ option.name }}</el-checkbox>
  </el-checkbox-group>
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
    if (this.formData[this.itemConfig.prop] === '' || this.formData[this.itemConfig.prop] === undefined) {
      this.$set(this.formData, this.itemConfig.prop, [])
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
