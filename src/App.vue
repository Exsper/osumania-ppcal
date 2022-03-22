<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :router="true"
  >
    <el-menu-item index="/">{{ $t("message.page_mania_pp_cal") }}</el-menu-item>
    <el-menu-item index="/sayo">{{
      $t("message.page_mania_pp_cal_sayo")
    }}</el-menu-item>
    <el-button class="langbtn" @click="changeLaguages">{{
      langText
    }}</el-button>
  </el-menu>

  <el-main class="app-content">
    <router-view />
  </el-main>
</template>

<script>
import { ref } from "vue";
import { ElButton, ElMenu, ElMenuItem, ElMain } from "element-plus";

const activeIndex = ref("/");
export default {
  components: {
    ElButton,
    ElMenu,
    ElMenuItem,
    ElMain,
  },
  data() {
    return {
      activeIndex,
      lang: "zh",
      langText: "English",
    };
  },
  name: "App",
  methods: {
    changeLaguages() {
      this.lang = this.$i18n.locale === "zh" ? "en" : "zh";
      this.$i18n.locale = this.lang;
      this.langText = this.lang === "zh" ? "English" : "简体中文";
    },
  },
};
</script>

<style scoped>
.app-content {
  margin: 20px auto;
  width: 600px;
  height: auto;
  padding: 20px 30px;
  border: 1px solid #eee;
  border-radius: 2px;
}
.langbtn {
  vertical-align: 10px;
  height: 30px;
  text-align: center;
}
</style>
