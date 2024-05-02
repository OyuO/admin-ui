<script>
import Logo from "@/layout/components/sidebar/Logo.vue";
import {mapGetters, mapState} from "vuex";
import SidebarItem from "@/layout/components/sidebar/SidebarItem.vue";

export default {
  components: {SidebarItem, Logo},
  computed: {
    ...mapState(["settings"]),
    ...mapGetters(["sidebarRouters", "sidebar"]),
    activeMenu() {
      const route = this.$route
      const {meta, path} = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<template>
  <div>
    <logo v-if="showLogo" :collapse="isCollapse"/>
    <el-scrollbar :class="settings.sideTheme">
      <el-menu :default-active="activeMenu" :collapse="isCollapse" :unique-opened="true" :collapse-transition="false"
               mode="vertical">
        <sidebar-item v-for="(route,index) in sidebarRouters" :key="route.path + index" :item="route"
                      :base-path="route.path"></sidebar-item>
      </el-menu>

    </el-scrollbar>
  </div>
</template>

<style scoped lang="less">

</style>
