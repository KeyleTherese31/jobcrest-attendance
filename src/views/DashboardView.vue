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
          :class="{ active: $route.path === item.path }"
        >
          <router-link :to="item.path" class="nav-link">
            <font-awesome-icon :icon="item.icon" class="nav-icon" />
            <span class="nav-text" v-if="!isCollapsed">{{ item.label }}</span>
          </router-link>
        </li>
      </ul>
    </div>

    <!-- Main Dashboard Content -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
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
  },
  data() {
    return {
      isCollapsed: false,
      navItems: [
        {
          name: "Overview",
          label: "Overview",
          path: "/dashboard",
          icon: "chart-bar",
        },
        {
          name: "SetAttendance",
          label: "Set Attendance",
          path: "/dashboard/attendance",
          icon: "calendar-check",
        },
        {
          name: "TrackReport",
          label: "Track Report",
          path: "/dashboard/track",
          icon: "file-alt",
        },
        {
          name: "EmployeeList",
          label: "Employee List",
          path: "/dashboard/employees",
          icon: "users",
        },
      ],
    };
  },
  methods: {
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
  width: 240px;
  background: #1b263b;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: width 0.3s ease-in-out;
  overflow: hidden;
}

.sidebar.collapsed {
  width: 80px;
}

.logo {
  width: 120px;
  margin-bottom: 15px;
  transition: opacity 0.3s;
}

.sidebar.collapsed .logo {
  opacity: 0;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
}

/* Nav Buttons - Aligned in a single line */
.sidebar li {
  padding: 12px;
  text-align: left;
  border-radius: 8px;
  cursor: pointer;
  background: #1e3a5f;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding-left: 15px;
}

.sidebar li.active {
  background: #00c6fb;
  color: #0d1b2a;
}

/* Nav Items in One Line */
.nav-link {
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
  width: 100%;
  gap: 12px; /* Adds spacing between icon and text */
  white-space: nowrap; /* Prevents text wrapping */
}

/* Increased Icon Size and Spacing */
.nav-icon {
  font-size: 20px;
  min-width: 24px; /* Ensures consistent alignment */
}

.nav-text {
  font-size: 16px;
}

/* Sidebar Collapsed */
.sidebar.collapsed li {
  justify-content: center;
  width: 100%;
  padding-left: 0;
}

.sidebar.collapsed .nav-text {
  display: none;
}

/* Main Content */
.content {
  flex: 1;
  padding: 20px;
}

/* Button Styling */
.toggle-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  margin-bottom: 15px;
  transition: 0.3s;
}
</style>
