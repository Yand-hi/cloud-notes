<template>
  <div id="login">
    <div class="container">
      <form action="#" v-show="show">
        <h1>登录账户</h1>
        <input type="text"
               placeholder="Username"
               v-model="login.username"/>
        <input type="password"
               placeholder="Password"
               v-model="login.password"/>
        <p v-show="login.isError">{{ login.notice }}</p>
        <button class="btn" @click="onLogin">登 录</button>
        <button class="tipBtn" @click="toggleShow">还没有账户？立即创建</button>
      </form>
      <form action="#" v-show="!show">
        <h1>创建账户</h1>
        <input type="text"
               placeholder="Username"
               v-model="register.username"/>
        <input type="password"
               placeholder="Password"
               v-model="register.password"/>
        <p v-show="register.isError">{{ register.notice }}</p>
        <button class="btn" @click="onRegister">创 建</button>
        <button class="tipBtn" @click="toggleShow">已有账户，点击登录</button>
      </form>
    </div>
  </div>
</template>

<script>
import request from '../helpers/request'

export default {
  name: 'Login',
  data() {
    return {
      show: false,
      login: {
        username: '',
        password: '',
        notice: '',
        isError: false
      },
      register: {
        username: '',
        password: '',
        notice: '用户名或密码格式错误',
        isError: false
      }
    }
  },
  methods: {
    toggleShow() {
      return this.show = !this.show
    },
    onLogin() {
      if (!this.login.username || !this.login.password) {
        this.login.isError = true
        this.login.notice = '用户名和密码不能为空'
      } else {
        this.login.isError = false
        request('/auth/login', 'POST', {username: this.login.username, password: this.login.password})
          .then(data => {
            console.log(data)
          })
      }
    },
    onRegister() {
      const usernameTest = /^[a-zA-Z0-9_-]{4,9}$/.test(this.register.username)
      const passwordTest = /^[a-zA-Z0-9_-]{4,9}$/.test(this.register.password)
      if (!usernameTest || !passwordTest) {
        this.register.isError = true
        window.alert('用户名和密码必须是4-9位数字字母或下划线的任意组合')
      } else {
        this.register.isError = false
        request('/auth/register', 'POST', {username: this.register.username, password: this.register.password})
          .then(data => {
            console.log(data)
          })
      }
    },
  }
}
</script>

<style scoped>
#login {
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(128, 127, 131, 0.8);
}

.container {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
  width: 420px;
  height: 450px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  font-weight: bold;
  margin: 0 0 1rem;
}

.btn {
  background-image: linear-gradient(to right, #6441A5 0%, #2a0845 51%, #6441A5 100%)
}

.btn {
  margin-top: 20px;
  padding: 15px 45px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  border-radius: 10px;
}

.btn:hover {
  background-position: right center;
  text-decoration: none;
  color: #fff;
}


form {
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 50px;
  width: 80%;
  height: 100%;
  text-align: center;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.tipBtn {
  font-size: 13px;
  padding-top: 20px;
  border: none;
  border-bottom: 1px solid black;
  background: #fff;
  cursor: pointer;
}

p {
  font-size: 12px;
  color: red;
}
</style>
