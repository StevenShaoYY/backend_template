<template>
  <div class="dashboard-container">
    首页
    <div class="echart-container">
      <piechart />
    </div>
  </div>
</template>

<script>
import piechart from '../../components/echart/piechart'
export default {
  name: 'Dashboard',
  components: {
    piechart
  },
  data() {
    return {
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    font-size: 16px;
    background: #fff;
    height: 100%;
  }
}
.echart-container{
  width: 400px;
  height: 300px;
  background-color: #999;
}
</style>
