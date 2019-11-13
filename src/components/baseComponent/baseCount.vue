<template>
  <el-input-number
    v-if="itemConfig.type === 'inputnumber'"
    v-model="formData[itemConfig.prop]"
    :min="itemConfig.min"
    :max="itemConfig.max"
    :size="itemConfig.size"
    @change="handleChange"
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
