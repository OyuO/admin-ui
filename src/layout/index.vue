<script>
import Sidebar from "./components/Sidebar"

export default {
  name: "Layout",
  components: {Sidebar}

}
</script>

<template>
  <div class="layout-container">
    <sidebar class="sidebar"></sidebar>
    <div class="right-panel"><h1>主面板</h1></div>
  </div>
</template>

<style scoped lang="scss">
.layout-container {
  height: 100%;
  width: 100%;
  display: flex
}

.sidebar {
  height: 100%;
  width: 10%;
}

.right-panel {
  width: 90%;
  height: 100%;
}

</style>
