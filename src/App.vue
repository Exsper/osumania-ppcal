<template>
  <div class="app-tab">
    <router-link to="/">{{ $t("message.page_mania_pp_cal") }}</router-link>
    <router-link to="/sayo">{{
      $t("message.page_mania_pp_cal_sayo")
    }}</router-link>
    <router-link to="/about">{{ $t("message.page_about") }}</router-link>
    <span class="spanlang" @click="changeLaguages">{{ langText }}</span>
  </div>
  <div class="app-content">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: "zh",
      langText: "简体中文",
    };
  },
  name: "App",
  methods: {
    changeLaguages() {
      this.lang = this.$i18n.locale === "zh" ? "en" : "zh";
      this.$i18n.locale = this.lang;
      this.langText = this.lang === "zh" ? "简体中文" : "English";
    },
  },
};
</script>

<style scoped>
.app-tab {
  font-family: sans-serif;
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 50px;
  overflow-x: auto;
  text-align: center;
  background: #bba8ff;
  white-space: nowrap;
  overflow-y: hidden;
}

.app-tab a {
  font-weight: bold;
  font-size: 20px;
  padding: 24px 10px;
  line-height: 50px;
  border: 1px solid #c2b1ff;
  height: 50px;
  cursor: pointer;
  background: #d0c3ff;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
}
.app-tab a:hover {
  background: #d5cafd;
}
.app-tab a.router-link-active {
  background: #fffefe;
}

.app-content {
  margin: 80px auto;
  width: 500px;
  height: 420px;
  padding: 20px 30px;
  border: 1px solid #eee;
  border-radius: 2px;
}

.spanlang {
  float: right;
  padding: 0 10px;
  width: 50px;
  font-weight: bold;
  font-size: 12px;
  line-height: 50px;
  border: 1px solid #c2b1ff;
  height: 50px;
  cursor: pointer;
  background: #d0c3ff;
  text-align: center;
  white-space: nowrap;
}
</style>
