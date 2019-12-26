<template>
  <div class="app-main-wrapper">
    <div class="menu_bar">
      <div class="sidebar-logo-container">
        <router-link class="sidebar-logo-link" to="/">
          <img src="../assets/icon/topicon.png" alt="">
        </router-link>
      </div>
      <router-link
        v-for="(item, index) of route"
        :key="index"
        :class="[path.indexOf(goto(item))==0?'active':'','menu_style']"
        :to="goto(item)"
      >
        <el-tooltip class="item" effect="dark" :content="getTitle(item)" placement="right">
          <div class="icon-class">
            <svg-icon :icon-class="getIcon(item)" />
          </div>
        </el-tooltip>
      </router-link>
    </div>
    <section class="app-main-c">
      <navbar-main class="main-header" />
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" />
      </transition>
    </section>
  </div>
</template>

<script>
import { NavbarMain } from './components'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('mainStore')
export default {
  name: 'Layout',
  components: {
    NavbarMain
  },
  data() {
    return {
      path: ''
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers'
    ]),
    key() {
      return this.$route.fullPath
    },
    route() {
      return this.permission_routers.filter((item, index) => {
        if (item.children) {
          return item
        }
      })
    }
  },
  created() {
    this.path = this.$route.path
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('mainStore/app/closeSideBar', { withoutAnimation: false })
    },
    goto(item) {
      let path = ''
      if (item.meta) {
        path = item.path
      } else if (item.path === '/') {
        path = item.path + item.children[0].path
      } else {
        path = item.path + '/' + item.children[0].path
      }
      return path
    },
    getIcon(item) {
      return item.meta ? item.meta.icon : item.children[0].meta.icon
    },
    getTitle(item) {
      return item.meta ? item.meta.title : item.children[0].meta.title
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-header {
    position: fixed;
    width: calc(100% - 80px);
    top: 0;
    left: 80px;
    height: 50px;
  }

  .app-main-wrapper {
    display: flex;
    .menu_bar {
      position: fixed;
      top: 0;
      left: 0;
      width: 80px;
      height: 100vh;
      background-color: rgb(45, 149, 236);
      z-index: 99999;
    }
    .sidebar-logo-container {
      background: #1e78c1;
    }
    .sidebar-logo-link {
      display: block;
      width: 100%;
      text-align: center;
      padding: 15px 10px 10px 10px;
    }
    .sidebar-logo-link img {
      display: block;
      width: 100%;
    }
    .active {
      color: #000000 !important;
    }
    .menu_style {
      display: block;
      width: 100%;
      text-align: center;
      padding: 15px 0;
      font-size: 22px;
      color: #ffffff;
    }
    .menu_style:hover {
      color: #000000;
      background-color: rgb(241, 252, 251);
    }
    .app-main-c {
      width: 100vw;
      height: calc(100vh - 50px);
    }
  }

</style>
