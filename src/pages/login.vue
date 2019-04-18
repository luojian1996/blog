<template>
  <div class="login" :style="{backgroundImage:loginBg}">
    <div class="contBox">
      <input type="text" name="loginName" placeholder="请输入用户名" v-model="username">
      <input type="password" name="loginPas" placeholder="请输入密码" v-model="password" autocomplete="new-password">
      <div class="buttonBox">
        <button class="cursorP" @click="loginEvent">登录</button>
        <button class="cursorP" @click="toRegist">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
import bg from '../assets/img/bg.jpg'
import { login } from '../service/api.js'
import md5 from 'md5'
export default {
  name: 'login',
  data () {
    return {
      loginBg: 'url(' + bg + ')',
      username: '',
      password: ''
    }
  },
  methods: {
    toRegist () {
      this.$router.push('/regist')
    },
    loginEvent () {
      let secrPas = md5(md5(this.password))
      login({name: this.username, password: secrPas}).then(res => {
        if (res.data.status === 1) {
          this.$message.success('登录成功!')
          this.$router.push('/index')
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  background-size: 100% 100%;
  position: relative;
  .contBox {
    width: 300px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -150px;
    margin-top: -30px;
    input {
      background-color: rgba(255, 255, 255, 0);
      border: 1px solid #fff;
      width: 300px;
      height: 30px;
      border-radius: 5px;
      padding-left: 5px;
      color: #fff;
    }
    input:nth-child(2) {
      margin-top: 10px;
    }
    input::-webkit-input-placeholder {
      color: rgba(255,255,255,0.8);
    }
    .buttonBox {
      margin-top: 10px;
      display: flex;
      text-align: center;
      justify-content: space-between;
      button {
        width: 45%;
        border: 1px solid #fff;
        padding: 2px 8px;
        border-radius: 3px;
      }
    }
  }
}
</style>
