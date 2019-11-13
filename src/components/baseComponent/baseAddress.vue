<template>
  <el-col style="margin-left:-5px;" :span="24">
    <el-col :span="6">
      <el-form-item :prop="itemConfig.prop1" :rules="itemConfig.rules1">
        <el-select
          v-model="formData[itemConfig.prop1]"
          clearable
          :placeholder="itemConfig.placeholder?itemConfig.placeholder:'请选择省'"
          @change="getCityOptions($event,itemConfig.prop2,itemConfig.prop3,true)"
        >
          <el-option
            v-for="pro in addressOptions[itemConfig.prop1]"
            :key="pro.id"
            :label="pro.name"
            :value="String(pro.id)"
          />
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item :prop="itemConfig.prop2" :rules="itemConfig.rules2">
        <el-select
          v-model="formData[itemConfig.prop2]"
          clearable
          :disabled="addressDisabledOptions[itemConfig.prop2]"
          :placeholder="itemConfig.placeholder?itemConfig.placeholder:'请选择市'"
          @change="getCountyOptions($event,itemConfig.prop3,true)"
        >
          <el-option
            v-for="city in addressOptions[itemConfig.prop2]"
            :key="city.id"
            :label="city.name"
            :value="String(city.id)"
          />

        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item :prop="itemConfig.prop3" :rules="itemConfig.rules3">
        <el-select
          v-model="formData[itemConfig.prop3]"
          clearable
          :placeholder="itemConfig.placeholder?itemConfig.placeholder:'请选择区'"
          :disabled="addressDisabledOptions[itemConfig.prop3]"
          @change="regionChange($event,itemConfig.prop3)"
        >
          <el-option
            v-for="Region in addressOptions[itemConfig.prop3]"
            :key="Region.id"
            :label="Region.name"
            :value="String(Region.id)"
          />

        </el-select>
      </el-form-item>
    </el-col>
    <el-col v-if="itemConfig.prop4" :span="6">
      <el-form-item :prop="itemConfig.prop4" :rules="itemConfig.rules1">
        <el-input
          v-model="formData[itemConfig.prop4]"
          placeholder="请输入详细地址"
        />
      </el-form-item>
    </el-col>
  </el-col>
</template>

<script>
import { getProvinceOptions } from '@/api/region'
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
      addressOptions: {},
      addressDisabledOptions: {}
    }
  },
  created() {
    console.log(this.formData)
    if (this.formData[this.itemConfig.prop1]) {
      this.formData[this.itemConfig.prop1] = this.formData[this.itemConfig.prop1].toString()
    }
    this.getProvinceOptions(this.itemConfig.prop1, false)
    if (this.formData[this.itemConfig.prop1] !== '' && this.formData[this.itemConfig.prop1] !== undefined) {
      this.formData[this.itemConfig.prop2] = this.formData[this.itemConfig.prop2].toString()
      this.getCityOptions(this.formData[this.itemConfig.prop1], this.itemConfig.prop2, false)
      if (this.formData[this.itemConfig.prop2] !== '' && this.formData[this.itemConfig.prop1] !== undefined) {
        this.formData[this.itemConfig.prop3] = this.formData[this.itemConfig.prop3].toString()
        this.getCountyOptions(this.formData[this.itemConfig.prop2], this.itemConfig.prop3, false)
      }
    } else {
      this.addressDisabledOptions[this.itemConfig.prop2] = true
      this.addressDisabledOptions[this.itemConfig.prop3] = true
    }
  },
  methods: {
    // 省市区三级联动
    // flag 判断是选择后修改，还是进入时的默认值
    getProvinceOptions(prop1, flag) {
      this.$set(this.addressOptions, prop1, [])
      getProvinceOptions(0).then(res => {
        this.$set(this.addressOptions, prop1, res.data)
      })
    },
    getCityOptions(val, prop2, prop3, flag) {
      this.$set(this.addressOptions, prop2, [])
      this.$set(this.addressOptions, prop3, [])
      if (flag) { this.formData[prop2] = '' }
      if (flag) { this.formData[prop3] = '' }
      getProvinceOptions(val).then(res => {
        this.$set(this.addressOptions, prop2, res.data)
        this.addressDisabledOptions[prop2] = false
      })
    },
    getCountyOptions(val, prop3, flag) {
      this.$set(this.addressOptions, prop3, [])
      if (flag) { this.formData[prop3] = '' }
      getProvinceOptions(val).then(res => {
        this.$set(this.addressOptions, prop3, res.data)
        this.addressDisabledOptions[prop3] = false
      })
    },
    regionChange(val, prop3) {
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
