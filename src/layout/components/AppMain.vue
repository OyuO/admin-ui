<script>
export default {
  name: "AppMain",
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view v-if="!$route.meta.link" :key="key"></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<style scoped lang="scss">

</style>
