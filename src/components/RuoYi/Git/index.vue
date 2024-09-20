<script>
export default {
  name: "RuoYiGit",
  data() {
    return {
      url: "https://gitee.com/y_project/RuoYi-Vue"
    }
  },
  methods: {
    goto() {
      window.open(this.url)
    }
  }
}
</script>

<template>
  <div>
    <svg-icon icon-class="github" @click="goto"></svg-icon>
  </div>
</template>
