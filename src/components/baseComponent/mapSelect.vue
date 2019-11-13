<template>
  <el-col :span="24">
    <el-col
      style="margin-left:-5px;"
      :span="4"
    >
      <el-button
        size="small"
        type="primary"
        plain
        @click="openDialog(itemConfig)"
      >设置</el-button>
    </el-col>
    <el-col :span="10" style="">
      <el-form-item :prop="itemConfig.prop1" :rules="itemConfig.rules1">
        <span style="width:50px;display:inline-block;float:left">经度:</span>
        <el-input
          v-model="formData[itemConfig.prop1]"
          style="float:left;margin-left:-50px;padding-left:50px;"
          placeholder="请输入经度"
        />
      </el-form-item>
    </el-col>
    <el-col :span="10" style="">
      <el-form-item :prop="itemConfig.prop2" :rules="itemConfig.rules2">
        <span style="width:50px;display:inline-block;float:left">纬度:</span>
        <el-input
          v-model="formData[itemConfig.prop2]"
          style="float:left;margin-left:-50px;padding-left:50px;"
          placeholder="请输入纬度"
        />
      </el-form-item>
    </el-col>
    <map-dialog :visible="mapDialogVisible" :lat="mapLat" :lng="mapLng" @close="closeMapDialog()" @savemap="getSaveMapData" />
  </el-col>
</template>

<script>
import MapDialog from './mapDialog/mapDialog'
export default {
  components: {
    MapDialog
  },
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
      mapDialogVisible: false,
      tempMapItem: {},
      mapLat: '',
      mapLng: ''
    }
  },
  created() {
  },
  methods: {
    // 地图选点
    openDialog(val) {
      this.mapDialogVisible = true
      this.mapLng = this.formData[val.prop1]
      this.mapLat = this.formData[val.prop2]
      this.tempMapItem = val
    },
    closeMapDialog(val) {
      this.mapDialogVisible = false
    },
    getSaveMapData(mapData) {
      this.formData[this.tempMapItem.prop1] = mapData.lng
      this.formData[this.tempMapItem.prop2] = mapData.lat
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
