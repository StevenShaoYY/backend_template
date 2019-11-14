<template>
  <div class="app-wrapper">
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, AppMain } from './components'
import defaultSettings from '@/settings'
const { fixedHeader } = defaultSettings
export default {
  name: 'Layout',
  components: {
    Navbar,
    AppMain
  },
  computed: {
    fixedHeader() {
      return fixedHeader
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: 100%;
    transition: width 0.28s;
  }
  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }
</style>
