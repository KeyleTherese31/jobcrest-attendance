import Vue from "vue";
import VueRouter from "vue-router";
import WelcomeView from "@/views/WelcomeView.vue";
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/DashboardView.vue";
import EmployeeList from "../components/EmployeeList.vue";
import AddEmployeeForm from "../components/AddEmployeeForm.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: WelcomeView },
  { path: "/login", component: LoginView },
  {
    path: "/dashboard",
    component: DashboardView,
    children: [
      {
        path: "employee-list",
        name: "EmployeeList",
        component: EmployeeList,
      },
      {
        path: "add-employee",
        name: "AddEmployeeForm",
        component: AddEmployeeForm,
      },
    ],
  },
  { path: "/employee-list", component: EmployeeList },
  { path: "/add-employee", component: AddEmployeeForm },
];

const router = new VueRouter({
  mode: "history", // Correct for Vue Router 3
  routes,
});

export default router;
