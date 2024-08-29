<template>
  <div :class="{'show':show}" class="header-search">
    <svg-icon class-name="search-icon" icon-class="search" @click.stop="click"/>
    <el-select ref="headerSearchSelect" v-model="search" :remote-method="querySearch"
               filterable default-first-option remote placeholder="Search" class="header-search-select"
               @change="change">
      <el-option
          v-for="option in options"
          :key="option.item.path"
          :label="option.item.title.join(' > ')"
          :value="option.item">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "HeaderSearch",
  data() {
    return {
      show: false,
      search: undefined,
      options: []
    }
  },
  mounted() {
    this.list = this.states.map(item => {
      return {value: `value:${item}`, label: `label:${item}`}
    })
  },
  methods: {
    querySearch(query) {
      console.log(query)
    },
    change() {
      console.log("change")
    },
    click() {
      this.show = !this.show
    }
  }
}
</script>

<style scoped lang="scss">
.header-search {
  font-size: 0 !important;

  .search-icon {
    cursor: pointer;
    font-size: 1.125rem;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 1.125rem;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
