<template>
  <div id="app">
    <Sidebar/>
    <router-view/>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar'

export default {
  name: 'App',
  components: {Sidebar}
}
</script>

<style>
@import '//at.alicdn.com/t/font_496303_kqrjhri8l25d0a4i.css';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

ul, li {
  list-style: none;
}

html, body, #app {
  height: 100%;
}

body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  fonst-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #eee;
}

a {
  text-decoration: none;
  color: #444;
}


.btn {
  color: #666;
  font-size: 12px;
  padding: 2px 4px;
  background-color: #fff;
  box-shadow: 0 0 2px 0 #ccc;
  border: none;
  cursor: pointer;
  display: inline-block;
}


#app {
  display: flex;
  align-items: stretch;
}
</style>
