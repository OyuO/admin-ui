<script>
import {addUser, changeUserStatus, deptTreeSelect, getUser, listUser} from "@/api/system/user"
import RightToolbar from "@/components/RightToolbar/index.vue"
import {getToken} from "@/utils/auth"
import {parseTime} from "@/utils/ruoyi"
import Treeselect from "@riophae/vue-treeselect"
import "@riophae/vue-treeselect/dist/vue-treeselect.css"

export default {
  name: "User",
  dicts: ["sys_normal_disable", "sys_user_sex"],
  components: {RightToolbar, Treeselect},
  data() {
    return {
      loading: true,
      selectUsers: [],
      multiple: true,
      showSearch: true,
      total: 0,
      userList: null,
      title: "",
      open: false,
      deptName: undefined,
      initPassword: "123456",
      dateRange: [],
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
      userAddForm: {
        nickName: undefined,
        deptId: undefined,
        phoneNumber: undefined,
        email: undefined,
        userName: undefined,
        password: undefined,
        sex: undefined,
        status: "0",
        postIds: undefined,
        roleIds: undefined,
        remark: undefined
      },
      userAddFormRules: {
        nickName: [
          {required: true, message: "请输入用户昵称", trigger: "blur"}
        ],
        userName: [
          {required: true, message: "请输入用户名称", trigger: "blur"}
        ],
        password: [
          {required: true, message: "请输入用户密码", trigger: "blur"}
        ],
        email: [
          {
            type: "email",
            message: "请输入有效的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      },
      rules: {},
      // addDialog
      userAddDialogVisible: false,
      deptOptions: [],
      postOptions: []
    }
  },
  methods: {
    handleSelectionChange(select) {
      this.selectUsers = select
    },
    submitUserAddForm() {
      this.$refs["userAddForm"].validate(valid => {
        if (valid) {
          addUser(this.userAddForm).then(response => {
            this.$message.success("创建用户成功!")
            this.userAddDialogVisible = false
            this.getList()
          })
        } else {
          return false
        }
      })
    },
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
    resetQuery() {
      this.dateRange = []
      this.resetForm("userQueryForm")
      this.handleQuery()
    },
    handleAdd() {
      getUser().then(response => {
        this.postOptions = response.posts
        this.roleOptions = response.roles
        this.userAddForm.password = this.initPassword
        this.userAddDialogVisible = true
      })
    },
    handleUpdate() {

    },
    handleDelete() {

    },
    handleCommand() {

    },
    resetUserAddForm() {
      this.resetForm("userAddForm")
    }
  },
  computed: {
    editButtonDisabled() {
      return this.selectUsers.length !== 1
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
            <el-form :inline="true" :model="queryParams" class="demo-form-inline" size="small" ref="userQueryForm">
              <el-form-item label="用户名称" prop="userName">
                <el-input v-model="queryParams.userName" placeholder="请输入用户名称" clearable
                          style="width: 240px"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="phoneNumber">
                <el-input v-model="queryParams.phoneNumber" placeholder="请输入手机号码" clearable
                          style="width: 240px"></el-input>
              </el-form-item>
              <el-form-item label="状态" prop="status">
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
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row :gutter="10" style="margin-bottom: 8px">
          <el-col :span="1.5">
            <el-button type="primary" plain size="mini" icon="el-icon-plus" @click="handleAdd">新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain size="mini" icon="el-icon-edit" :disabled="editButtonDisabled">修改
            </el-button>
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
        <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
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
    <el-dialog
        title="添加用户"
        :visible.sync="userAddDialogVisible"
        width="600px"
        append-to-body @close="resetUserAddForm" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form ref="userAddForm" :model="userAddForm" :rules="userAddFormRules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户昵称" prop="nickName">
              <el-input v-model="userAddForm.nickName" placeholder="请输入用户昵称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="归属部门" prop="deptId">
              <treeselect v-model="userAddForm.deptId" :options="deptOptions" :showCount="true"
                          placeholder="请选择归属部门"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="phoneNumber">
              <el-input v-model="userAddForm.phoneNumber" placeholder="请输入手机号码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="userAddForm.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名称" prop="userName">
              <el-input v-model="userAddForm.userName" placeholder="请输入用户名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户密码" prop="password">
              <el-input v-model="userAddForm.password" placeholder="请输入用户密码" type="password"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户性别" prop="sex">
              <el-select v-model="userAddForm.sex" placeholder="请选择性别">
                <el-option
                    v-for="dict in dict.type.sys_user_sex"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="userAddForm.status">
                <el-radio v-for="dict in dict.type.sys_normal_disable" :key="dict.value" :label="dict.value">
                  {{ dict.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="岗位" prop="postIds">
              <el-select v-model="userAddForm.postIds" placeholder="请选择岗位" multiple>
                <el-option
                    v-for="item in postOptions"
                    :key="item.postId"
                    :label="item.postName"
                    :value="item.postId"
                    :disabled="item.status === 1"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色" prop="roleIds">
              <el-select v-model="userAddForm.roleIds" placeholder="请选择角色" multiple>
                <el-option
                    v-for="item in roleOptions"
                    :key="item.roleId"
                    :label="item.roleName"
                    :value="item.roleId"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="备注" prop="remark">
            <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="userAddForm.remark">
            </el-input>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUserAddForm">确 定</el-button>
        <el-button @click="userAddDialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">

</style>
