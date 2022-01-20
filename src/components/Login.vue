<template>
  <div id="login">
    <div class="container">
      <form action="#" v-if="show">
        <h1>登录账户</h1>
        <input type="text"
               placeholder="Username"
               v-model="login.username"/>
        <input type="password"
               placeholder="Password"
               v-model="login.password"/>
        <button class="btn">登 录</button>
        <button class="tipBtn" @click="toggleShow">还没有账户？立即创建</button>
      </form>
      <form action="#" v-if="!show">
        <h1>创建账户</h1>
        <input type="text"
               placeholder="Username"
               v-model="register.username"/>
        <input type="password"
               placeholder="Password"
               v-model="register.password"/>
        <button class="btn">登 录</button>
        <button class="tipBtn" @click="toggleShow">已有账户，点击登录</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      show: false,
      login: {
        username: '',
        password: '',
      },
      register: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    toggleShow() {
      return this.show = !this.show
    }
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
  margin-top: 30px;
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
  padding-top: 20px;
  font-size: 13px;
  border: none;
  border-bottom: 1px solid black;
  background: #fff;
  cursor: pointer;
}
</style>
