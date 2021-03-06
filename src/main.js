import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { createI18n } from "vue-i18n";
//import { createI18n } from "vue-i18n/index";
import enMsg from "./i18n/en";
import zhMsg from "./i18n/zh";

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

createApp(App).use(store).use(router).use(i18n).mount("#app");
