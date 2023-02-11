import "./bootstrap";
import { createApp } from "vue";
import ViewUIPlus from "view-ui-plus";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store";
import "view-ui-plus/dist/styles/viewuiplus.css";
import BaseCard from "./views/pages/Component/BaseCard.vue";
import BaseBtn from "./views/pages/Component/BaseBtn.vue";

// perfectscrollbar plugins
import PerfectScrollbar from "vue3-perfect-scrollbar";
import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css";

const app = createApp(App);
app.component("BaseCard", BaseCard)
    .component("BaseBtn", BaseBtn)
    .use(router)
    .use(PerfectScrollbar)
    .use(store)
    .use(ViewUIPlus)
    .mount("#app");
