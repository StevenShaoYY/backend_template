<template>
  <el-col
    :span="24"
    style="margin-left:-5px;"
  >
    <el-col :span="11">
      <el-form-item :prop="itemConfig.prop1" :rules="itemConfig.rules1">
        <el-input
          v-model="formData[itemConfig.prop1]"
          :size="itemConfig.size"
          :placeholder="itemConfig.placeholder1?itemConfig.placeholder1:'请输入'"
        />
      </el-form-item>
    </el-col>
    <el-col :span="2">{{ itemConfig.linkWord }}</el-col>
    <el-col :span="11">
      <el-form-item :prop="itemConfig.prop2" :rules="itemConfig.rules2">
        <el-form-item :prop="itemConfig.prop2" :rules="itemConfig.rules2">
          <el-input
            v-model="formData[itemConfig.prop2]"
            :size="itemConfig.size"
            :placeholder="itemConfig.placeholder2?itemConfig.placeholder2:'请输入'"
          />
        </el-form-item>
      </el-form-item>
    </el-col>
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
