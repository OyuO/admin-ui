<script>
import Sidebar from "./components/Sidebar"
import {mapState} from "vuex"
import variables from "@/assets/styles/variables.scss"
import ResizeMixin from "./mixin/ResizeHandler"
import NavBar from "@/layout/components/NavBar.vue"

export default {
  name: "Layout",
  components: {NavBar, Sidebar},
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      theme: state => state.settings.theme,
      sideTheme: state => state.settings.sideTheme,
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      needTagsView: state => state.settings.tagsViews,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      }
    },
    variables() {
      return variables
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", {withoutAnimation: false})
    }
  }

}
</script>

<template>
  <div :class="classObj" class="app-wrapper" :style="{'--current-color':theme}">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <sidebar v-if="!sidebar.hide" class="sidebar-container"></sidebar>
    <div :class="{hasTagView:needTagsView,sidebarHide:sidebar.hide}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <nav-bar/>
        <div class="tags-view-container"></div>
      </div>
      <div class="right-panel">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "~@/assets/styles/mixin.scss";
@import "~@/assets/styles/variables.scss";

.navbar {
  height: 50px;
}

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.tags-view-container {
  height: 30px;
  width: 1860px;
  background-color: slategray;
}

</style>
