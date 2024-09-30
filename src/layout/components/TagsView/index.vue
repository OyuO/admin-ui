<script>
import ScrollPane from "@/layout/components/TagsView/ScrollPane.vue"

export default {
  name: "TagsView",
  components: {ScrollPane},
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: []
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    }
  },
  watch: {
    $route() {
      this.addTags()
    }
  },
  mounted() {
    this.addTags()
  },
  methods: {
    addTags() {
      const {name} = this.$route
      if (name) {
        this.$store.dispatch("tagsView/addView", this.$route)
        if (this.$route.meta.link) {
          this.$store.dispatch("tagsView/addIframeView", this.$route)
        }
      }
      return false
    }
  }
}
</script>

<template>
  <scroll-pane>
    <router-link v-for="tag in visitedViews" ref="tag" :key="tag.path"
                 :to="{path:tag.path,query:tag.query,fullPath:tag.fullPath}" tag="span" class="tags-view-item">
      <span>{{ tag.title }}</span>
    </router-link>
  </scroll-pane>
</template>

<style scoped lang="scss">
.tags-view-item {
  display: inline-block;
  line-height: 26px;
  height: 26px;
  margin: 4px 0 4px 1rem;
  padding: 0 8px;
  border: #d8dce5 solid 1px;
  font-size: 12px;
}
</style>
