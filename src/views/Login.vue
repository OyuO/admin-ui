<script>
export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
      code: ''
    }
  }
}
</script>

<template>
  <div class="login_container">
    <el-form>
      <h3 class="title">若依后台管理系统</h3>
      <el-form-item prop="username">
        <el-input v-model="username" placeholder="username" prefix-icon="el-icon-user-solid"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="password" placeholder="password" prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input class="valid_code_form_input" v-model="code" placeholder="验证码"
                  prefix-icon="el-icon-circle-check"></el-input>
        <img class="valid_code_img" src="@/assets/images/validcode.gif"/>
      </el-form-item>
      <el-checkbox style="margin:0px 0px 20px 0px;">记住密码</el-checkbox>
      <el-form-item>
        <el-button style="width: 100%" type="primary" icon="el-icon-search">
          登录
        </el-button>
      </el-form-item>
    </el-form>
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
  background-color: white;
  width: 400px;
  padding: 25px 25px 5px 25px;
  border-radius: 6px;

  .title {
    color: #707070;
    margin: 0px auto 30px auto;
    text-align: center;
  }

  .el-input {
    margin-bottom: 10px;
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

</style>
