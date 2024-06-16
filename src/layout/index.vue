<script>
import Sidebar from "./components/Sidebar"
import {mapState} from "vuex"
import variables from "@/assets/styles/variables.scss"
import ResizeMixin from "./mixin/ResizeHandler"

export default {
  name: "Layout",
  components: {Sidebar},
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
  }

}
</script>

<template>
  <div :class="classObj" class="app-wrapper" :style="{'--current-color':theme}">
    <sidebar class="sidebar-container"></sidebar>
    <div class="right-panel"><h1>主面板</h1></div>
  </div>
</template>

<style scoped lang="scss">
@import "~@/assets/styles/mixin.scss";
@import "~@/assets/styles/variables.scss";
//.layout-container {
//  height: 100%;
//  width: 100%;
//  display: flex
//}
//
//.sidebar {
//  height: 100%;
//  width: 10%;
//  background: #304156;
//}
//
//.right-panel {
//  width: 90%;
//  height: 100%;
//}
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

</style>
