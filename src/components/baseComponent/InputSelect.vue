<template>
  <el-col style="margin-left:5px;padding:0px;" :span="24">
    <el-col :span="14" style="padding:0px;">
      <el-form-item :prop="itemConfig.prop1" :rules="itemConfig.rules1">
        <el-input
          v-model="formData[itemConfig.prop1]"
          :size="itemConfig.size"
          :disabled="itemConfig.disabled"
          :placeholder="itemConfig.placeholder1?itemConfig.placeholder1:'请输入'"
        />
      </el-form-item>
    </el-col>
    <el-col :span="10">
      <el-form-item :prop="itemConfig.prop2" :rules="itemConfig.rules2">
        <el-select
          v-model="formData[itemConfig.prop2]"
          :disabled="itemConfig.disabled"
          clearable
          :size="itemConfig.size"
          :placeholder="itemConfig.placeholder2?itemConfig.placeholder2:'请选择'"
        >
          <el-option
            v-for="option in itemConfig.data"
            :key="option.id"
            :label="option.name"
            :value="option.id"
          />
        </el-select>
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
  }
}
</script>

<style lang="scss" scoped>
</style>
