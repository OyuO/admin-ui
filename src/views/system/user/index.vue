<script>
import {deptTreeSelect, listUser} from "@/api/system/user"
import RightToolbar from "@/components/RightToolbar/index.vue"
import {getToken} from "@/utils/auth"

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
      rules: {},
      tableData: [{
        date: "2016-05-03",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄"
      }, {
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄"
      }, {
        date: "2016-05-04",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄"
      }, {
        date: "2016-05-01",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄"
      }, {
        date: "2016-05-08",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄"
      }, {
        date: "2016-05-06",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄"
      }, {
        date: "2016-05-07",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄"
      }],
      data: [{
        label: "一级 1",
        children: [{
          label: "二级 1-1",
          children: [{
            label: "三级 1-1-1"
          }]
        }]
      }, {
        label: "一级 2",
        children: [{
          label: "二级 2-1",
          children: [{
            label: "三级 2-1-1"
          }]
        }, {
          label: "二级 2-2",
          children: [{
            label: "三级 2-2-1"
          }]
        }]
      }, {
        label: "一级 3",
        children: [{
          label: "二级 3-1",
          children: [{
            label: "三级 3-1-1"
          }]
        }, {
          label: "二级 3-2",
          children: [{
            label: "三级 3-2-1"
          }]
        }]
      }]
    }
  },
  methods: {
    getList() {
      this.loading = true
      listUser(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.userList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    onSubmit() {
    },
    getDeptTree() {
      deptTreeSelect().then(response => {
        this.deptOptions = response.data
      })
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
        <el-input v-model="deptName" prefix-icon="el-icon-search" placeholder="请输入部门名称" size="small"
                  clearable style="margin-bottom: 20px"></el-input>
        <el-tree :data="deptOptions" :props="defaultProps" @node-click="handleNodeClick"
                 :highlight-current="true" :expand-on-click-node="false"></el-tree>
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
                  <el-option label="正常" value="ENABLED"></el-option>
                  <el-option label="停用" value="DISABLED"></el-option>
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
                <el-button type="primary" icon="el-icon-search" size="mini" @click="onSubmit">搜索</el-button>
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
          <el-table-column label="部门" align="center" key="deptName" prop="deptName"
                           v-if="columns[3].visible"/>
          <el-table-column label="手机号码" align="center" key="phoneNumber" prop="phoneNumber"
                           v-if="columns[4].visible"/>
          <el-table-column label="状态" align="center" key="status"
                           v-if="columns[5].visible"/>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">

</style>
