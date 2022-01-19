<template>
  <div id="sidebar">
    <div class="icons">
      <router-link to="/note/1" title="笔记"></router-link>
      <router-link to="/notebooks" title="笔记本"></router-link>
      <router-link to="/trash/2" title="回收站"></router-link>
    </div>
    <div class="logout" @click="onLogout">
      <i></i>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>

</style>
