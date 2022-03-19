<template>
  <div class="app-tab">
    <router-link to="/">mania pp计算</router-link>
    <router-link to="/sayo">还不快谢谢小夜</router-link>
    <router-link to="/about">关于</router-link>
  </div>
  <div class="app-content">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
.app-tab {
  font-family: sans-serif;
  padding: 20px 30px;
  margin-top: 1em;
  margin-bottom: 40px;
  user-select: none;
  overflow-x: auto;
  text-align: center;
}

.app-tab a {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}
.app-tab a:hover {
  background: #e0e0e0;
}
.app-tab a.active {
  background: #e0e0e0;
}

.app-content {
  margin: 0 auto;
  width: 470px;
  height: 420px;
  padding: 20px 30px;
  border: 1px solid #eee;
  border-radius: 2px;
}
</style>
