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

      </div>
      <div class="header">首页</div>
      <div class="right-panel"><h1>主面板</h1></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "~@/assets/styles/mixin.scss";
@import "~@/assets/styles/variables.scss";

.navbar {
  height: 50px;
  background-color: red;
}

.header {
  background-color: green;
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

</style>
