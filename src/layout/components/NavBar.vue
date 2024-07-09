<script>
import Hamburger from "@/components/Hamburger"
import Breadcrumb from "@/layout/components/Breadcrumb/index.vue"
import {mapGetters} from "vuex"

export default {
  name: "NavBar",
  components: {
    Hamburger,
    Breadcrumb
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
    <hamburger id="hamburger-container" :is-active="sidebar.opened"></hamburger>
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container"></breadcrumb>
  </div>
</template>

<style scoped lang="scss">
.navbar {
  display: flex;
  align-items: center;

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
}
</style>
