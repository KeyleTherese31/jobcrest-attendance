import Vue from "vue";
import VueRouter from "vue-router";
import WelcomeView from "@/views/WelcomeView.vue";
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/DashboardView.vue";
import Overview from "@/components/OverviewGraphs.vue";
import SetAttendance from "@/components/SetAttendance.vue";
import TrackReport from "@/components/TrackReport.vue";
import EmployeeList from "@/components/EmployeeList.vue";
import EditEmployeePage from "@/components/EditEmployeePage.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: WelcomeView },
  { path: "/login", component: LoginView },
  {
    path: "/dashboard",
    component: DashboardView,
    children: [
      { path: "overview", component: Overview },
      { path: "attendance", component: SetAttendance },
      { path: "track", component: TrackReport },
      { path: "employees", component: EmployeeList },
      {
        path: "/dashboard/employees/edit/:id",
        name: "editEmployee",
        component: EditEmployeePage, // Make sure to create this component
      },
      {
        path: "employees/add",
        component: () => import("@/components/AddEmployeeForm.vue"),
      },
      { path: "", redirect: "overview" },
    ],
  },
  { path: "*", redirect: "/" },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
