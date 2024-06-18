<script>
import logoImg from "@/assets/logo/logo.png"
import variables from "@/assets/styles/variables.scss"

export default {
  name: "SidebarLogo",
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    variables() {
      return variables
    },
    sideTheme() {
      return this.$store.state.settings.sideTheme
    }
  },
  data() {
    return {
      title: process.env.VUE_APP_TITLE,
      logo: logoImg
    }
  }
}
</script>
<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}"
       :style="{backgroundColor:sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground}">
    <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/index">
      <img :src="logo"/>
    </router-link>
    <router-link key="expand" class="sidebar-logo-link" to="/index" v-else>
      <img class="sidebar-logo" :src="logo"/>
      <h1 class="sidebar-title"
          :style="{ color: sideTheme === 'theme-dark' ? variables.logoTitleColor : variables.logoLightTitleColor }">
        {{ title }}</h1>
    </router-link>
  </div>
</template>

<style scoped lang="scss">
.sidebar-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }
}
</style>
