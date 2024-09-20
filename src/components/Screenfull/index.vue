<script>
import screenfull from "screenfull"

export default {
  name: "Screenfull",
  data() {
    return {
      isFullscreen: false
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.beforeDestroy()
  },
  methods: {
    click() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: "you browser can not work",
          type: "warning"
        })
        return false
      }
      screenfull.toggle()
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen
    },
    init() {
      if (screenfull.isEnabled) {
        screenfull.on("change", this.change)
      }
    },
    destroy() {
      if (screenfull.isEnabled) {
        screenfull.off("change", this.change)
      }
    }
  }
}
</script>

<template>
  <div>
    <svg-icon :icon-class="isFullscreen ?'exit-fullscreen':'fullscreen'" @click="click"></svg-icon>
  </div>
</template>

<style scoped lang="scss">

</style>
