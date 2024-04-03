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
      <el-input v-model="username" placeholder="username"></el-input>
      <el-input v-model="password" placeholder="password"></el-input>
      <el-input style="width: 63%" v-model="code" placeholder="验证码"></el-input>
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
  padding: 20px;
  border-radius: 6px;

  .title {
    margin: 0px auto 30px auto;
    text-align: center;
  }

  .el-input {
    margin-bottom: 10px;
  }
}

</style>
