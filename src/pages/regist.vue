<template>
  <div class="regist" :style="{backgroundImage:loginBg}">
    <div class="contBox">
      <input type="text" name="regName" placeholder="请输入用户名" v-model="username">
      <input type="text" name="regNickName" placeholder="请输入昵称" v-model="nickname">
      <input type="password" name="regPas" placeholder="请输入密码" v-model="password" autocomplate="new-password">
      <input type="password" name="regPas2" placeholder="请确认密码" v-model="password2" autocomplate="new-password">
      <div class="buttonBox">
        <button class="cursorP" @click="toLogin">登录</button>
        <button class="cursorP" @click="registSub">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
import bg from '../assets/img/bg.jpg'
import { regist } from '../service/api.js'
import md5 from 'md5'
export default {
  name: 'regist',
  data () {
    return {
      loginBg: 'url(' + bg + ')',
      username: '',
      password: '',
      nickname: '',
      password2: ''
    }
  },
  methods: {
    toLogin () {
      this.$router.push('/login')
    },
    registSub () {
      if (this.username === '' || this.nickname === '' || this.password === '' || this.password2 === '') {
        this.$message.error('请完善信息!')
      } else {
        if (this.password !== this.password2) {
          this.$message.error('两次密码不一致!')
        } else {
          let secrPas = md5(md5(this.password))
          regist({name: this.username, password: secrPas, nickName: this.nickname}).then(res => {
            if (res.data.status === 1) {
              this.$message.success('注册成功!')
              this.$router.push('/login')
            } else {
              this.$message.error(res.data.msg)
            }
          })
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.regist {
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
    input:not(:first-child) {
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
