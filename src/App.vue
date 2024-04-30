<template>
  <div id="app">
    <router-view></router-view>
    <a-logo :collapse="true"></a-logo>
  </div>
</template>

<script>
import SidebarLogo from "./layout/components/sidebar/Logo.vue"

export default {
  name: 'App',
  components: {
    'a-logo': SidebarLogo
  }
}
</script>

<style>
</style>
