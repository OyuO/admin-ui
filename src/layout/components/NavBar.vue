<script>
import Hamburger from "@/components/Hamburger"
import Breadcrumb from "@/layout/components/Breadcrumb/index.vue"
import Search from "@/components/HeaderSearch"
import {mapGetters} from "vuex"
import RuoYiGit from "@/components/RuoYi/Git/index.vue"
import Screenfull from "@/components/Screenfull/index.vue"

export default {
  name: "NavBar",
  components: {
    Screenfull,
    RuoYiGit,
    Hamburger,
    Breadcrumb,
    Search
  },
  computed: {
    ...mapGetters([
      "sidebar", "avatar", "device"
    ]),
    setting: {
      get() {
        return this.$store.state.settings.showSettings
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "showSettings",
          value: val
        })
      }
    },
    topNav: {
      get() {
        return this.$store.state.settings.topNav
      }
    }
  },
  methods: {
    toggleSidebar() {
      this.$store.dispatch("app/toggleSidebar")
    },
    async logout() {
      this.$confirm("确定注销并退出系统吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("LogOut").then(() => {
          location.href = "/index"
        }).catch(() => {

        })
      })
    }
  }
}
</script>

<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container"
               @toggleClick="toggleSidebar"></hamburger>
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container"></breadcrumb>
    <div class="right-menu">
      <search class="svg-container"/>
      <el-tooltip class="item" effect="dark" content="源码地址" placement="bottom">
        <ruo-yi-git class="svg-container"></ruo-yi-git>
      </el-tooltip>
      <div class="svg-container">
        <svg data-v-248913c8="" aria-hidden="true" class="svg-icon">
          <use data-v-248913c8="" xlink:href="#icon-question"></use>
        </svg>
      </div>
      <div class="svg-container">
        <screenfull></screenfull>
      </div>
      <div class="svg-container">
        <svg data-v-248913c8="" aria-hidden="true" class="svg-icon size-icon">
          <use data-v-248913c8="" xlink:href="#icon-size"></use>
        </svg>
      </div>
      <div class="svg-container">
        <img src="@/assets/images/profile.jpg" style="width: 40px;height: 40px;"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.navbar {
  display: flex;
  align-items: center;
  position: relative;

  #hamburger-container {
    line-height: 46px;
    width: 50px;
    height: 50px;
    cursor: pointer;
    float: left;
    text-align: center;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    position: absolute;
    right: 2rem;
    display: flex;

    .svg-container {
      padding: 0 0.5rem;
      display: flex;
      align-items: center;
      cursor: pointer;

      .svg-icon {
        width: 1.125rem;
        height: 1.125rem;
      }
    }
  }
}
</style>
