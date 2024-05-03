import "./assets/base.css";
import "./assets/utils.css";
// remixicon
import 'remixicon/fonts/remixicon.css'

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// formkit
import { plugin, defaultConfig } from "@formkit/vue";
import theDefaultConfig from "../formkit.config";

// firebase
import "@/services/firebase";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(plugin, defaultConfig(theDefaultConfig));

app.mount("#app");
