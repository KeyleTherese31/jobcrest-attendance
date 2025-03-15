<template>
  <div class="dashboard-container">
    <!-- Sidebar Navigation -->
    <div class="sidebar">
      <img src="@/assets/logo.jpg" alt="JobCrest Logo" class="logo" />
      <ul>
        <li
          v-for="item in navItems"
          :key="item.name"
          @click="setTab(item.name)"
          :class="{ active: selectedTab === item.name }"
        >
          <font-awesome-icon :icon="item.icon" class="nav-icon" />
          {{ item.label }}
        </li>
      </ul>
    </div>

    <!-- Main Dashboard Content -->
    <div class="content">
      <component :is="currentView"></component>
    </div>
  </div>
</template>

<script>
import Overview from "@/components/OverviewGraphs.vue";
import SetAttendance from "@/components/SetAttendance.vue";
import TrackReport from "@/components/TrackReport.vue";
import EmployeeList from "@/components/EmployeeList.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faChartBar,
  faCalendarCheck,
  faFileAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

library.add(faChartBar, faCalendarCheck, faFileAlt, faUsers);

export default {
  components: {
    FontAwesomeIcon,
    Overview,
    SetAttendance,
    TrackReport,
    EmployeeList,
  },
  data() {
    return {
      selectedTab: "Overview",
      navItems: [
        { name: "Overview", label: "Overview", icon: "chart-bar" },
        {
          name: "SetAttendance",
          label: "Set Daily Attendance",
          icon: "calendar-check",
        },
        { name: "TrackReport", label: "Track Report", icon: "file-alt" },
        { name: "EmployeeList", label: "Employee List", icon: "users" },
      ],
    };
  },
  computed: {
    currentView() {
      switch (this.selectedTab) {
        case "SetAttendance":
          return "SetAttendance";
        case "TrackReport":
          return "TrackReport";
        case "EmployeeList":
          return "EmployeeList";
        default:
          return "Overview";
      }
    },
  },
  methods: {
    setTab(tab) {
      this.selectedTab = tab;
    },
  },
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  height: 100vh;
  background: #0d1b2a;
  color: white;
}

/* Sidebar Styling */
.sidebar {
  width: 250px;
  background: #1b263b;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  width: 120px;
  margin-bottom: 20px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  width: 100%;
}

.sidebar li {
  padding: 15px;
  margin: 10px 0;
  text-align: center;
  border-radius: 30px;
  cursor: pointer;
  background: #1e3a5f;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.sidebar li.active {
  background: #00c6fb;
  color: #0d1b2a;
}

/* Icon Styling */
.nav-icon {
  font-size: 18px;
}

/* Main Content */
.content {
  flex: 1;
  padding: 20px;
}
</style>
