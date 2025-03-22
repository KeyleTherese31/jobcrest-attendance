<template>
  <div class="dashboard-container">
    <!-- Sidebar Navigation -->
    <div :class="['sidebar', { collapsed: isCollapsed }]">
      <button @click="toggleSidebar" class="toggle-btn">
        <font-awesome-icon :icon="isCollapsed ? 'bars' : 'times'" />
      </button>
      <img
        v-if="!isCollapsed"
        src="@/assets/logo.jpg"
        alt="JobCrest Logo"
        class="logo"
      />
      <ul>
        <li
          v-for="item in navItems"
          :key="item.name"
          @click="setTab(item.name)"
          :class="{ active: selectedTab === item.name }"
        >
          <font-awesome-icon :icon="item.icon" class="nav-icon" />
          <span v-if="!isCollapsed">{{ item.label }}</span>
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
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

library.add(faChartBar, faCalendarCheck, faFileAlt, faUsers, faBars, faTimes);

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
      isCollapsed: false,
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
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
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
  transition: width 0.3s;
  overflow: hidden;
}

.sidebar.collapsed {
  width: 80px;
}

.logo {
  width: 120px;
  margin-bottom: 20px;
  transition: opacity 0.3s;
}

.sidebar.collapsed .logo {
  opacity: 0;
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

.sidebar.collapsed li {
  justify-content: center;
}

.sidebar.collapsed li span {
  display: none;
}

/* Toggle Button */
.toggle-btn {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  margin-bottom: 20px;
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
