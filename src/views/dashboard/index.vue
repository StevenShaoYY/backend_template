<template>
  <div class="main-dashboard-container">
    <div class="main-dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('mainStore')
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.main-dashboard {
  &-container {
    padding: 50px 0 0 80px;
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
