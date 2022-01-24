<template>
  <div class="hello">
    123
    <el-switch
      v-model="value"
      active-color="#13ce66"
      inactive-color="#ff4949">
    </el-switch>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      value: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
