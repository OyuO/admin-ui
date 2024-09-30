<script>
export default {
  name: "ScrollPane",
  data() {
    return {
      left: 0
    }
  }
}
</script>

<template>
  <el-scrollbar :vertical="false" class="scroll-container" ref="scrollContainer">
    <slot></slot>
  </el-scrollbar>
</template>

<style scoped lang="scss">

</style>
