<script>
import {changeUserStatus, deptTreeSelect, listUser} from "@/api/system/user"
import RightToolbar from "@/components/RightToolbar/index.vue"
import {getToken} from "@/utils/auth"
import {parseTime} from "../../../utils/ruoyi"

export default {
  components: {RightToolbar},
  data() {
    return {
      loading: true,
      ids: [],
      multiple: true,
      showSearch: true,
      total: 0,
      userList: null,
      title: "",
      deptOptions: undefined,
      open: false,
      deptName: undefined,
      initPassword: undefined,
      dateRange: [],
      postOptions: [],
      roleOptions: [],
      form: {},
      defaultProps: {
        children: "children",
        label: "label"
      },
      upload: {
        open: false,
        title: "",
        isUploading: false,
        updateSupport: 0,
        headers: {Authorization: "Bearer " + getToken()},
        url: process.env["VUE_APP_BASE_API "] = "/system/user/importData"
      },
      queryParams: {
        pageNum: 1,
        pageSize:
            10,
        userName:
        undefined,
        phoneNumber:
        undefined,
        status:
        undefined,
        deptId:
        undefined
      },
      columns: [
        {
          key: 0, label: "用户编号", visible: true
        },
        {
          key: 1, label: "用户名称", visible: true
        },
        {
          key: 2, label: "用户名称", visible: true
        },
        {
          key: 3, label: "部门", visible: true
        },
        {
          key: 4, label: "手机号码", visible: true
        },
        {
          key: 5, label: "状态", visible: true
        },
        {
          key: 6, label: "创建时间", visible: true
        }
      ],
      rules: {}
    }
  },
  methods: {
    parseTime,
    getList() {
      this.loading = true
      listUser(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.userList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    getDeptTree() {
      deptTreeSelect().then(response => {
        this.deptOptions = response.data
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleStatusChange(row) {
      let text = row.status === "0" ? "启用" : "停用"
      this.$modal.confirm(`确认要${text}${row.userName}用户吗?`).then(function () {
        return changeUserStatus(row.userId, row.status)
      }).then(() => {
        this.$modal.msgSuccess(`${text}成功`)
      }).catch(function () {
        row.status = row.status === "0" ? "1" : "0"
      })
    },
    handleNodeClick(data) {
      this.queryParams.deptId = data.id
      this.handleQuery()
    },
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    handleUpdate() {

    },
    handleDelete() {

    },
    handleCommand() {

    }
  },
  watch: {
    deptName(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.getList()
    this.getDeptTree()
  }
}
</script>

<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="head-container">
          <el-input v-model="deptName" prefix-icon="el-icon-search" placeholder="请输入部门名称" size="small"
                    clearable style="margin-bottom: 20px"></el-input>
        </div>
        <div class="head-container">
          <el-tree :data="deptOptions" :props="defaultProps" @node-click="handleNodeClick" default-expand-all
                   highlight-current :expand-on-click-node="false" :filter-node-method="filterNode" ref="tree"
                   node-key="id"></el-tree>
        </div>
      </el-col>
      <el-col :span="20">
        <el-row>
          <el-col>
            <el-form :inline="true" :model="queryParams" class="demo-form-inline" size="small">
              <el-form-item label="用户名称">
                <el-input v-model="queryParams.userName" placeholder="请输入用户名称" clearable
                          style="width: 240px"></el-input>
              </el-form-item>
              <el-form-item label="手机号码">
                <el-input v-model="queryParams.phoneNumber" placeholder="请输入手机号码" clearable
                          style="width: 240px"></el-input>
              </el-form-item>
              <el-form-item label="状态">
                <el-select v-model="queryParams.status" placeholder="用户状态" clearable style="width: 240px">
                  <el-option label="正常" value="0"></el-option>
                  <el-option label="停用" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="创建时间">
                <el-date-picker v-model="dateRange"
                                style="width: 240px"
                                value-format="yyyy-MM-dd"
                                type="daterange"
                                range-separator="-"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini">重置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row :gutter="10" style="margin-bottom: 8px">
          <el-col :span="1.5">
            <el-button type="primary" plain size="mini" icon="el-icon-plus">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain size="mini" icon="el-icon-edit">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain size="mini" icon="el-icon-delete">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="info" plain size="mini" icon="el-icon-upload2">导入</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain size="mini" icon="el-icon-download">导出</el-button>
          </el-col>
          <right-toolbar :show-search.sync="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
        </el-row>
        <el-table v-loading="loading" :data="userList">
          <el-table-column type="selection" width="50" align="center"/>
          <el-table-column label="用户编号" align="center" key="userId" prop="userId" v-if="columns[0].visible"/>
          <el-table-column label="用户名称" align="center" key="userName" prop="userName" v-if="columns[1].visible"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="用户昵称" align="center" key="nickName" prop="nickName" v-if="columns[2].visible"
                           :show-overflow-tooltip="true"/>
          <el-table-column label="部门" align="center" key="deptName" prop="dept.deptName"
                           v-if="columns[3].visible"/>
          <el-table-column label="手机号码" align="center" key="phonenumber" prop="phonenumber"
                           v-if="columns[4].visible" width="120"/>
          <el-table-column label="状态" align="center" key="status"
                           v-if="columns[5].visible">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status" active-value="0" inactive-value="1"
                         @change="handleStatusChange(scope.row)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center" prop="createTime" v-if="columns[6].visible" width="160">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
            <template slot-scope="scope" v-if="scope.row.userId !== 1">
              <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
                         v-hasPermi="['system:user:edit']">
                修改
              </el-button>
              <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
                         v-hasPermi="['system:user:remove']">
                删除
              </el-button>
              <el-dropdown size="mini" trigger="click" @command="(command) => handleCommand(command,scope.row)"
                           v-hasPermi="['system:user:resetPwd','system:user:edit']">
                <el-button size="mini" type="text" icon="el-icon-d-arrow-right">
                  更多
                </el-button>
                <el-dropdown-menu>
                  <el-dropdown-item command="handleResetPwd" icon="el-icon-key" v-hasPermi="['system:user:resetPwd']">
                    重置密码
                  </el-dropdown-item>
                  <el-dropdown-item command="handleAutoRole" icon="el-icon-circle-check"
                                    v-hasPermi="['system:user:edit']">
                    分配角色
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">

</style>
