<script>
import loginApi from "@/api/login";
import validcode from "@/assets/images/validcode.gif"

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        code: '',
        uuid: '',
        rememberMe: false
      },
      validCodeImgUrl: validcode,
      rules: {
        username: [
          {required: true, message: '请输入您的账号', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入您的密码', trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    refreshValidCodeImg() {
      loginApi.getValidCodeImg().then(res => {
        const data = res.data
        console.log(data)
        this.validCodeImgUrl = 'data:image/gif;base64,' + data.img
        this.loginForm.uuid = data.uuid
      })
    },
    submitLoginForm() {
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          loginApi.login(this.loginForm).then(res => {
            const data = res.data
            if (data.code !== 200) {
              return this.$message.error(data.msg)
            }
          })
        } else {
          return false
        }
      })
    }
  },
  created() {
    this.refreshValidCodeImg()
  }
}
</script>

<template>
  <div class="login_container">
    <el-form :model="loginForm" :rules="rules" ref="loginForm">
      <h3 class="title">若依后台管理系统</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="账号" prefix-icon="el-icon-user-solid"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" placeholder="密码"
                  prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input class="valid_code_form_input" v-model="loginForm.code" placeholder="验证码"
                  prefix-icon="el-icon-circle-check"></el-input>
        <img class="valid_code_img" :src="validCodeImgUrl" @click="refreshValidCodeImg"/>
      </el-form-item>
      <el-checkbox style="margin:0px 0px 22px 0px;" v-model="loginForm.rememberMe">记住密码</el-checkbox>
      <el-form-item>
        <el-button style="width: 100%" type="primary" @click="submitLoginForm">
          登录
        </el-button>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2018-2024 ruoyi.vip All Rights Reserved.</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-form {
  box-sizing: border-box;
  background-color: white;
  width: 400px;
  padding: 25px 25px 5px 25px;
  border-radius: 6px;

  .title {
    color: #707070;
    margin: 0px auto 30px auto;
    text-align: center;
  }
}

.valid_code_form_input {
  width: 67%;
}

.valid_code_img {
  width: 25%;
  height: 40px;
  vertical-align: middle;
  float: right;
}

.el-login-footer {
  position: fixed;
  bottom: 0;
  color: #fff;
  font-size: 12px;
  letter-spacing: 1px;
  text-align: center;
  line-height: 40px;
}

</style>
