import { createApp } from "vue";
import App from "./App.vue";
import "/src/styles.css";

import router from "@/router/router.js";
createApp(App).use(router).mount("#app");
