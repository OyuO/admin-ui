<script>
import path from "path"
import {isExternal} from "@/utils/validate"
import Item from "./Item"
import AppLink from "./AppLink"

export default {
  name: "SidebarItem",
  components: {Item, AppLink},
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  data() {
    this.onlyOneChild = null
    return {}
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      if (!children) {
        children = []
      }
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          this.onlyOneChild = item
          return true
        }
      })
      if (showingChildren.length === 1) {
        return true
      }

      if (showingChildren.length === 0) {
        this.onlyOneChild = {...parent, path: "", noShowingChildren: true}
        return true
      }

      return false
    },
    resolvePath(routePath, routeQuery) {
      // console.log("routePath",routePath,routeQuery)
      if (isExternal(routePath)) {
        return routePath
      }

      if (isExternal(this.basePath)) {
        return this.basePath
      }

      if (routeQuery) {
        let query = JSON.parse(routeQuery)
        return {path: path.resolve(this.basePath, routePath), query: query}
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

<template>
  <div v-if="!item.hidden">
    <template
        v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path,onlyOneChild.query)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <item :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" :title="onlyOneChild.meta.title"/>
        </el-menu-item>
      </app-link>
    </template>
    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title"/>
      </template>
      <sidebar-item v-for="(child,index) in item.children" :key="child.path + index" :is-nest="true" :item="child"
                    :base-path="resolvePath((child.path))" class="nest-menu"/>
    </el-submenu>
  </div>
</template>

<style scoped lang="scss">

</style>
