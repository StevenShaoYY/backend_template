<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - #{$topbar_height} - #{$micro_top} - #{$micro_bottom});
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: $topbar_height;
  height: calc(100vh - #{$micro_bottom} - #{$micro_top});
  overflow: auto;
}
</style>
