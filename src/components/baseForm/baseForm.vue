<template>
  <el-row class="main-wrapper">
    <el-form ref="configForm" :model="formModel" :status-icon="flag" label-width="auto">
      <div v-for="(configList,index1) in formConfig" :key="index1+1000" class="card-container">
        <card :card-config="configList.TitleConfig" @statuschange="statusChange">
          <!-- 组合组件放这里 -->
          <el-row v-if="configList.FormConfig" :gutter="10">
            <el-col v-for="(item,index) in configList.FormConfig" :key="index" :span="item.span?item.span:8">
              <el-form-item :prop="item.prop" :rules="item.rules || item.rules1" :label="item.label" :label-width="item.label?item.labelWidth?item.labelWidth+'px':'':'0px'" :class="{item_rule:item.rules||item.rules1 }">
                <!-- 省市区三级联动 -->
                <base-address v-if="item.type=='address'" :form-data="formData" :item-config="item" />
                <!-- 地图选点 -->
                <map-select v-if="item.type=='map'" :form-data="formData" :item-config="item" />
                <!-- 时间范围选择 日期时间双选范围选择 -->
                <date-range v-if="item.type=='daterange' || item.type=='datetimepickerrange'" :form-data="formData" :item-config="item" />
                <!-- 两个输入框 -->
                <double-input v-if="item.type=='doubleInput'" :form-data="formData" :item-config="item" />
                <!--输入框表单类型-->
                <base-input v-if="item.type ==='text'" :form-data="formData" :item-config="item" />
                <!--文本域表单类型-->
                <base-textarea v-if="item.type === 'textarea'" :form-data="formData" :item-config="item" />
                <!--checkbox表单类型-->
                <base-check-box v-if="item.type === 'checkbox'" :form-data="formData" :item-config="item" />
                <!--radio表单类型-->
                <base-radio v-if="item.type === 'radio'" :form-data="formData" :item-config="item" />
                <!--下拉选择类型-->
                <base-select v-if="item.type === 'select'" :form-data="formData" :item-config="item" />
                <!-- 日期选择器，日期时间选择器 -->
                <base-date-picker v-if="item.type === 'datepicker' || item.type === 'datetimepicker'" :form-data="formData" :item-config="item" />
                <!-- 计数器 -->
                <base-count v-if="item.type === 'inputnumber'" :form-data="formData" :item-config="item" />
                <!-- 输入框加下拉框组合 -->
                <input-select v-if="item.type=='inputselect'" :form-data="formData" :item-config="item" />
                <!-- 图片列表 -->
                <el-col v-if="item.type=='imglist'" style="padding:0px;" :span="24">
                  <img v-for="(item2, index2) of formData[item.prop]" :key="index2" class="pic-pic-list" :src="item2.url" alt="">
                </el-col>
                <!-- 图片上传 -->
                <base-picture-upload v-if="item.type=='upload'" :form-data="formData" :item-config="item" />
                <!-- 文件上传 -->
                <base-file-upload v-if="item.type=='fileUpload'" :form-data="formData" :item-config="item" />
                <!-- 多张图片上传 -->
                <multi-picture-upload v-if="item.type=='uploadmore'" :form-data="formData" :item-config="item" />
              </el-form-item>
            </el-col>
            <el-col v-if="type=='search'" :span="type=='form'?24:2" style="margin-left:10px; margin-top:7px;">
              <el-button type="primary" size="mini" @click="search">搜索</el-button>
            </el-col>
          </el-row>
        </card>
      </div>
      <div v-if="type=='form' || type=='create' || type=='update'" class="btn-wrapper">
        <el-button type="primary" @click="submitForm">确认</el-button>
        <el-button @click="submitCancle">取消</el-button>
      </div>
      <div v-if="type=='view' " class="btn-wrapper">
        <el-button @click="submitCancle">返回</el-button>
      </div>
      <el-row v-if="type=='custom'">
        <el-col :span="24" style="margin-left:10px;margin-top:10px;">
          <el-button
            v-for="(btnitem,btnindex) in expandBtn"
            v-show="formModel[btnitem.statusProp]==btnitem.status"
            :key="btnindex"
            style="margin-right:15px;"
            :type="btnitem.type?btnitem.type:'primary'"
            @click="handleEmit(btnitem, formModel)"
          >
            {{ btnitem.name }}
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-row></template>

<script>
import baseInput from '@/components/baseComponent/baseInput'
import doubleInput from '@/components/baseComponent/doubleInput'
import dateRange from '@/components/baseComponent/dateRange'
import mapSelect from '@/components/baseComponent/mapSelect'
import baseTextarea from '@/components/baseComponent/baseTextarea'
import baseCheckBox from '@/components/baseComponent/baseCheckBox'
import baseRadio from '@/components/baseComponent/baseRadio'
import baseSelect from '@/components/baseComponent/baseSelect'
import baseDatePicker from '@/components/baseComponent/baseDatePicker'
import baseCount from '@/components/baseComponent/baseCount'
import InputSelect from '@/components/baseComponent/InputSelect'
import baseAddress from '@/components/baseComponent/baseAddress'
import basePictureUpload from '@/components/baseComponent/basePictureUpload'
import multiPictureUpload from '@/components/baseComponent/multiPictureUpload'
import baseFileUpload from '@/components/baseComponent/baseFileUpload'
import card from '@/components/card/card'
// import addcard from '@/components/card/addcard'
export default {
  components: {
    baseInput,
    baseTextarea,
    doubleInput,
    dateRange,
    mapSelect,
    baseCheckBox,
    baseRadio,
    baseSelect,
    baseDatePicker,
    baseCount,
    InputSelect,
    baseAddress,
    basePictureUpload,
    baseFileUpload,
    multiPictureUpload,
    card
    // addcard
  },
  props: {
    config: {
      type: Array,
      default: () => {
        return []
      }
    },
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    type: {
      type: String,
      default: 'form'
    },
    expandBtn: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      formModel: {},
      formConfig: {},
      flag: true
    }
  },
  computed: {
    formModelNew() {
      return JSON.parse(JSON.stringify(this.formModel))
    }
  },
  watch: {
    // 实现表单数据的绑定，实时接收父组件的数据变化
    formData(newval, oldVal) {
      this.formModel = this.formData
    },
    formModelNew: {
      deep: true,
      handler(newval, oldVal) {
        for (const CONFIG_LIST of this.config) {
          if (CONFIG_LIST.FormConfig) {
            for (const formConfig of CONFIG_LIST.FormConfig) {
              if (formConfig.linkage) {
                if (newval[formConfig.prop] !== oldVal[formConfig.prop]) {
                  formConfig.linkage(this.formModel, formConfig)
                } else if (newval[formConfig.prop1] !== oldVal[formConfig.prop1] || newval[formConfig.prop2] !== oldVal[formConfig.prop2]) {
                  formConfig.linkage(this.formModel, formConfig)
                }
              }
            }
          }
        }
      }
    }
  },
  mounted() {
    // 将组件上的属性赋值给当前组件内变量，因为props只能单向绑定,还需要监听属性值变化进行父子组件间交互
    this.formConfig = this.config
    this.formModel = this.formData
    this.getFormModel(this.formConfig, this.formModel)
    for (const innerFormConfig of this.formConfig) {
      if (innerFormConfig.FormConfig) {
        for (const item of innerFormConfig.FormConfig) {
          if (item.type === 'imglist') {
            if (this.formModel[item.prop]) { this.formModel[item.prop] = JSON.parse(this.formModel[item.prop]) }
          }
        }
      }
    }
  },
  created() {
  },
  methods: {
    getFormModel(config, modal) {
      for (const configList of config) {
        if (configList.FormConfig) {
          const tempConfig = configList.FormConfig
          for (const i of tempConfig) {
            for (const index in i) {
              if (index.indexOf('prop') >= 0) {
                if (!modal[i[index]]) {
                  this.$set(modal, i[index], '')
                }
              }
            }
          }
        }
      }
    },
    // 提交表单数据
    submitForm() {
      this.$refs.configForm.validate(valid => {
        if (valid) {
          // 让父组件接收到响应数据
          this.$emit('submit', this.formModel)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitCancle() {
      this.resetForm()
      this.$emit('formcancle')
    },
    // 重置表单状态
    resetForm() {
      if (this.$refs.configForm) {
        this.$refs.configForm.resetFields()
      }
    },
    search() {
      this.$refs.configForm.validate(valid => {
        if (valid) {
          // 让父组件接收到响应数据
          this.$emit('submit', this.formModel)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 输入框事件
    inputEmit(name, data) {
      if (name) { this.$emit(name, data) }
    },
    // 拓展按钮事件处理
    handleEmit(item, row) {
      // this.$parent.$emit(emitName, row)
      if (item.verify === true) {
        this.$refs.configForm.validate(valid => {
          if (valid) {
          // 让父组件接收到响应数据
            this.$emit(item.emitName, row)
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        this.$emit(item.emitName, row)
      }
    },
    statusChange(val) {
      this.$emit('statuschange', val)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.main-wrapper {
  .btn-wrapper{
    padding: 20px;
  }
  .card-container {
    overflow: hidden;
  }
  .card-container + .card-container {
    margin: 10px 0px;
  }
  .rule{
    color:red;
    position: absolute;
    margin-top: 10px;
    margin-left: -10px;
  }
  .pic-pic-list{
    width: 200px;
    margin: 10px;
  }
}
</style>
