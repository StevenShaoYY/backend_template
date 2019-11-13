<template>
  <el-col :span="cardConfig.span?cardConfig.span:24">
    <div v-if="!cardConfig.hidden || cardConfig.hidden===false" class="top card-container">
      <div class="wrapper-left">{{ cardConfig.title }}</div>
      <div v-if="cardConfig.showstatus" class="wrapper-right">
        <span class="status">{{ cardConfig.status }}</span>
      </div>
      <div v-if="cardConfig.statusOption" class="wrapper-right">
        <span class="status">{{ cardConfig.status }}</span>
        <el-select
          v-model="cardConfig.state"
          :placeholder="cardConfig.placeholder?item.placeholder:'请选择'"
          @change="statusChange"
        >
          <el-option
            v-for="option in cardConfig.data"
            :key="option.id"
            :label="option.name"
            :value="option.id"
          />
        </el-select>
      </div>
      <div v-if="cardConfig.showoperate" class="wrapper-right">
        <a :class="{operate:ispage}" @click="pageClick">页面</a>
        <a :class="{operate:isdata}" @click="dataClick">数据</a>
        <a :class="{operate:isoperate}" @click="operateClick">操作</a>
      </div>
    </div>
    <div :class="{'slot-wrapper':cardConfig.hidden!==true}">
      <slot />
    </div>
  </el-col>
</template>

<script>
export default {
  components: {},
  props: {
    // 数据接口
    cardConfig: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      ispage: true,
      isdata: false,
      isoperate: false
    }
  },
  methods: {
    pageClick() {
      this.ispage = true
      this.isdata = false
      this.isoperate = false
    },
    dataClick() {
      this.ispage = false
      this.isdata = true
      this.isoperate = false
    },
    operateClick() {
      this.ispage = false
      this.isdata = false
      this.isoperate = true
    },
    statusChange(val) {
      this.$emit('statuschange', val)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .top {
    background-color: rgba(241,246,252,0.6);
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid white;
    .wrapper-left {
      color: #333333;
      line-height: 60px;
      padding: 0 20px;
      font-size: 18px;
      font-weight: 700;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .wrapper-right {
      line-height: 60px;
      color: #333333;
      padding: 0 20px;
    }
    .status {
      color: green;
    }
    .operate {
      color:chocolate;
    }
  }
  .slot-wrapper{
    background-color: rgba(241,246,252,0.5);
    padding: 30px 25px;
  }
</style>
