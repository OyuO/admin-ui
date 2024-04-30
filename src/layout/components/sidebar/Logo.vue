<script>
import logoImg from "@/assets/logo/logo.png"

export default {
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      logo: logoImg
    }
  }
}
</script>
<template>
  <div>
    <router-link to="/index" v-if="collapse">
      <img :src="logo"/>
    </router-link>
    <router-link class="logo-title-link" to="/index" v-else>
      <img class="logo-img" :src="logo"/>
      <span>若依管理系统</span>
    </router-link>
  </div>
</template>

<style scoped lang="less">
.logo-title-link {
  display: inline-flex;
  align-items: center
}

.logo-img {
  vertical-align: middle;
}
</style>
