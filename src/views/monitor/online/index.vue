<script>
import {list} from "@/api/monitor/online"
import {parseTime} from "../../../utils/ruoyi"

export default {
  name: "Online",
  data() {
    return {
      queryParams: {
        ipaddr: undefined,
        username: undefined
      },
      list: [],
      loading: false,
      total: undefined,
      pageNum: 1,
      pageSize: 10
    }
  },
  methods: {
    parseTime,
    getList() {
      this.loading = true
      list(this.queryParams).then(response => {
        this.list = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    handleForceLogout() {

    }
  },
  created() {
    this.getList()
  }
}
</script>

<template>
  <div class="app-container">
    <el-form :model="queryParams" label-width="68px" size="small" inline>
      <el-form-item label="登录地址">
        <el-input v-model="queryParams.ipaddr" size="small" placeholder="请输入登录地址">
        </el-input>
      </el-form-item>
      <el-form-item label="用户名称">
        <el-input v-model="queryParams.username" size="small" placeholder="请输入用户名称">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading"
              :data="list.slice((pageNum-1) * pageSize,pageNum*pageSize)"
              style="width: 100%">
      <el-table-column
          label="序号"
          type="index"
          align="center">
        <template slot-scope="scope">
          <span>{{ (pageNum - 1) * pageSize + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="tokenId"
          label="会话编号"
          align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="userName"
          label="登录名称" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="deptName"
          label="部门名称" align="center">
      </el-table-column>
      <el-table-column
          prop="ipaddr"
          label="主机" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="loginLocation"
          label="登录地点" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="browser"
          label="浏览器" align="center">
      </el-table-column>
      <el-table-column
          prop="os"
          label="操作系统" align="center">
      </el-table-column>
      <el-table-column
          prop="loginTime"
          label="登录时间" align="center">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.loginTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleForceLogout(scope.row)">
            强退
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize"/>
  </div>
</template>

<style scoped lang="scss">

</style>
