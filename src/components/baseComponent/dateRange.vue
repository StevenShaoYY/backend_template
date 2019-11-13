<template>
  <el-col
    v-if="itemConfig.type==='daterange'"
    style="margin-left:-5px;"
    :span="24"
  >
    <el-col :span="11">
      <el-form-item :prop="itemConfig.prop1" :rules="itemConfig.rules1">
        <el-date-picker
          v-model="formData[itemConfig.prop1]"
          type="date"
          :size="itemConfig.size"
          :placeholder="itemConfig.placeholder?itemConfig.placeholder1:'请选择日期'"
          style="width: 100%;"
          :disabled="itemConfig.disabled || formtype=='view'"
          value-format="yyyy-MM-dd"
          @change="datePickerChange($event,itemConfig.prop1,itemConfig.prop2)"
        />
      </el-form-item>
    </el-col>
    <el-col class="line" :span="2">{{ itemConfig.linkWord }}</el-col>
    <el-col :span="11">
      <el-form-item :prop="itemConfig.prop2" :rules="itemConfig.rules2">
        <el-date-picker
          v-model="formData[itemConfig.prop2]"
          type="date"
          :size="itemConfig.size"
          :placeholder="itemConfig.placeholder?itemConfig.placeholder2:'请选择日期'"
          style="width: 100%;"
          :disabled="itemConfig.disabled || formtype=='view'"
          value-format="yyyy-MM-dd"
          @change="datePickerChange($event,itemConfig.prop1,itemConfig.prop2)"
        />
      </el-form-item>
    </el-col>
  </el-col>
  <el-col
    v-else-if="itemConfig.type==='datetimepickerrange'"
    style="margin-left:-5px;"
    :span="24"
  >
    <el-col :span="11">
      <el-form-item :prop="itemConfig.prop1" :rules="itemConfig.rules1">
        <el-date-picker
          v-model="formData[itemConfig.prop1]"
          type="datetime"
          :placeholder="itemConfig.placeholder?itemConfig.placeholder1:'请选择日期和时间'"
          style="width: 100%;"
          :disabled="itemConfig.disabled || formtype=='view'"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="datePickerChange($event,itemConfig.prop1,itemConfig.prop2)"
        />
      </el-form-item>
    </el-col>
    <el-col class="line" :span="2">{{ itemConfig.linkWord }}</el-col>
    <el-col :span="11">
      <el-form-item :prop="itemConfig.prop2" :rules="itemConfig.rules2">
        <el-date-picker
          v-model="formData[itemConfig.prop2]"
          type="datetime"
          :placeholder="itemConfig.placeholder?itemConfig.placeholder2:'请选择日期和时间'"
          style="width: 100%;"
          :disabled="itemConfig.disabled || formtype=='view'"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="datePickerChange($event,itemConfig.prop1,itemConfig.prop2)"
        />
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
    datePickerChange(val, prop1, prop2) {
      if (this.formData[prop2] !== '' && this.formData[prop1] !== '') {
        if (this.formData[prop2] < this.formData[prop1]) {
          this.$message({
            message: '起始时间需要早于结束时间！',
            type: 'warning'
          })
          this.formData[prop2] = this.formData[prop1] = val
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .line {
    text-align: center;
  }
</style>
