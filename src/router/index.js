import Vue from "vue";
import VueRouter from "vue-router";
import WelcomeView from "@/views/WelcomeView.vue";
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/DashboardView.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: WelcomeView },
  { path: "/login", component: LoginView },
  { path: "/dashboard", component: DashboardView },
];

const router = new VueRouter({
  mode: "history", // Correct for Vue Router 3
  routes,
});

export default router;
