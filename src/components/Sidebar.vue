<template xmlns="">
  <div id="sidebar">
    <Avatar/>
    <div class="icons">
      <router-link to="/note" title="笔记">
        <i class="iconfont icon-note"/>
      </router-link>
      <router-link to="/notebooks" title="笔记本">
        <i class="iconfont icon-notebook"/>
      </router-link>
      <router-link to="/trash" title="回收站">
        <i class="iconfont icon-trash"/>
      </router-link>
    </div>
    <div class="logout">
      <i class="iconfont icon-logout" title="退出登录" @click="onLogout"/>
    </div>
  </div>
</template>

<script>
import Avatar from './Avatar'
import {mapActions} from 'vuex'

export default {
  components: {Avatar},
  methods: {
    ...mapActions(['logout']),
    onLogout() {
      this.$confirm('确认退出', '是否退出当前帐号', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.logout({path: '/login'})
      })
    }
  }
}
</script>

<style scoped>
#sidebar {
  position: relative;
  width: 100px;
  text-align: center;
  background-color: #2c333c;
}

.icons {
  margin-top: 30px;
}

.icons a {
  padding: 15px 0;
  display: block;
}

.icons .router-link-active {
  background: #5e6266;
  border-right: 4px solid #2dbe61;
}

.logout {
  position: absolute;
  bottom: 30px;
  width: 100%;
  text-align: center;
  cursor: pointer;
}

.iconfont {
  color: #fff;
}
</style>
