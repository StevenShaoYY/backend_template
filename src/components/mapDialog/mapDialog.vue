<template>
  <div class="main-wrapper">
    <el-dialog title="地图选点" :visible.sync="dialogFormVisible" :before-close="close" width="80%" :fullscreen="true">

      <el-row :gutter="26">
        <el-col :span="24">
          <el-col :span="12">
            <el-col :span="4">
              <span class="font">经度</span>
            </el-col>
            <el-col :span="20">
              <el-input
                v-model="mapForm.lng"
                placeholder="请输入经度"
              />
            </el-col>
          </el-col>
          <el-col :span="12">
            <el-col :span="4">
              <span class="font">纬度</span>
            </el-col>
            <el-col :span="20">
              <el-input
                v-model="mapForm.lat"
                placeholder="请输入纬度"
              />
            </el-col>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-amap :amap-manager="amapManager" :vid="'amap-vue'" class="amap-box">
            <el-amap-marker v-if="markShow" :position="position">
              <div class="marker1">
                <img class="people-image" src="../../assets/icon/mapselect.png" alt="">
              </div>
            </el-amap-marker>
          </el-amap>
        </el-col>

      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="saveMap">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import VueAMap from 'vue-amap'
const amapManager = new VueAMap.AMapManager()
export default {
  components: {},
  props: {
    // 数据接口
    visible: {
      type: Boolean,
      default: false
    },
    lat: {
      type: String,
      default: ''
    },
    lng: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      amapManager,
      dialogFormVisible: false,
      mapForm: {
        lat: '',
        lng: ''
      },
      position: [],
      markShow: false
    }
  },
  watch: {
    // 实现表单数据的绑定，实时接收父组件的数据变化
    visible(newval, oldVal) {
      this.dialogFormVisible = newval
      if (newval === true) {
        setTimeout(() => {
          this.selectPoint()
        }, 1000)
      }
    },
    lat(newval, oldVal) {
      if (newval !== '') {
        this.mapForm.lat = newval
        this.position[1] = newval
        this.markShow = true
      }
    },
    lng(newval, oldVal) {
      if (newval !== '') {
        this.mapForm.lng = this.lng
        this.position[0] = newval
        this.markShow = true
      }
    }
  },
  created() {
    // this.dialogFormVisible = this.visible
  },
  mounted() {
    // this.mapForm.lat = this.lat
    // this.mapForm.lng = this.lng
  },
  methods: {
    // 地图选点
    selectPoint() {
      amapManager._map.on('click', e => {
        this.mapForm.lat = e.lnglat.lat.toString()
        this.mapForm.lng = e.lnglat.lng.toString()
        this.position = [
          e.lnglat.lng,
          e.lnglat.lat
        ]
        this.markShow = true
        // this.ruleForm.position = [
        //   e.lnglat.lng,
        //   e.lnglat.lat
        // ]
        // this.currentCmd.position = [
        //   e.lnglat.lng,
        //   e.lnglat.lat
        // ]
        // this.showSelectPoint = true
      }, this)
    },
    close() {
      this.dialogFormVisible = false
      this.$emit('close')
    },
    saveMap() {
      this.dialogFormVisible = false
      this.$emit('savemap', this.mapForm)
      this.$emit('close')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.main-wrapper {
  .amap-box {
    margin-top: 20px;
    width: 100%;
    height: 65vh;
  }
  .font {
    font-size: 16px;
    font-weight: 400;
    line-height: 40px;
  }
  .people-image{
    transform: translate(-42%,-42%)
  }
}
</style>
