import { createApp } from "vue";
import ElementPlus from "element-plus";
//import zhCn from "element-plus/es/locale/lang/zh-cn";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { createI18n } from "vue-i18n";
import enMsg from "./components/i18n/en";
import zhMsg from "./components/i18n/zh";

const i18n = createI18n({
  locale: "zh",
  messages: {
    en: {
      message: enMsg,
    },
    zh: {
      message: zhMsg,
    },
  },
});

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus, {
    //locale: zhCn,
  })
  .use(i18n)
  .mount("#app");
