<template>
  <div class="employee-list-container">
    <h2>Employee List</h2>

    <!-- Navigation for Plants & Shifts -->
    <div class="nav-buttons">
      <button
        v-for="plant in plants"
        :key="plant.name"
        @click="togglePlant(plant.name)"
        :class="['nav-btn', { active: activePlant === plant.name }]"
      >
        {{ plant.name }}
      </button>
    </div>

    <div v-if="activePlant">
      <div class="shift-buttons">
        <button
          v-for="shift in shifts"
          :key="shift"
          @click="activeShift = shift"
          :class="['shift-btn', { active: activeShift === shift }]"
        >
          {{ shift }}
        </button>
      </div>

      <!-- Employee Table -->
      <div v-if="activeShift">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search employee..."
          class="search-bar"
        />
        <table class="employee-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Employee No</th>
              <th>Name</th>
              <th>Process Certification</th>
              <th>Supervisor</th>
              <th>Date Hired</th>
              <th>Tenure</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="employee in filteredEmployees"
              :key="employee.employeeNo"
            >
              <td>
                <span :class="['status-badge', employee.status.toLowerCase()]">
                  {{ employee.status }}
                </span>
              </td>
              <td>{{ employee.employeeNo }}</td>
              <td>{{ employee.name }}</td>
              <td>{{ employee.processCertification }}</td>
              <td>{{ employee.supervisor }}</td>
              <td>{{ employee.dateHired }}</td>
              <td>{{ employee.tenure }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <br />
    <br />
    <!-- Add Employee Section -->
    <div class="add-employee-section">
      <h3>Add Employee(s)</h3>
      <router-link to="/dashboard/employees/add" class="add-btn">
        Add Manually
      </router-link>

      <!-- File Input for Importing Employees -->
      <input
        type="file"
        @change="importFile"
        accept=".xlsx, .csv, .txt, .dat"
        class="file-input"
      />

      <button class="import-btn" @click="triggerFileInput">
        📂 Import File
      </button>
    </div>
  </div>
</template>

<script>
import * as XLSX from "xlsx";

export default {
  data() {
    return {
      plants: [{ name: "Plant 1" }, { name: "Plant 3" }],
      activePlant: "Plant 1", // Default selected plant
      shifts: ["A-Shift", "C-Shift", "All Shift"],
      activeShift: "All Shift",
      searchQuery: "",
      employees: [], // Employee list (dummy or from API)
    };
  },
  computed: {
    filteredEmployees() {
      return this.employees.filter((emp) =>
        emp.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    togglePlant(plant) {
      this.activePlant = plant;
    },
    triggerFileInput() {
      document.querySelector(".file-input").click();
    },
    importFile(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target.result;

        if (file.name.endsWith(".xlsx") || file.name.endsWith(".csv")) {
          this.processExcelFile(data);
        } else if (file.name.endsWith(".txt") || file.name.endsWith(".dat")) {
          this.processTextOrDatFile(data);
        } else {
          alert(
            "Unsupported file format. Please upload an Excel, CSV, TXT, or DAT file."
          );
        }
      };

      if (file.name.endsWith(".dat")) {
        reader.readAsText(file); // Read as text (if plain)
      } else {
        reader.readAsBinaryString(file);
      }
    },
    processExcelFile(data) {
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      this.employees = jsonData.map((row) => ({
        status: row["Status"] || "",
        employeeNo: row["Employee No"] || "",
        name: row["Name"] || "",
        processCertification: row["Process Certification"] || "",
        supervisor: row["Supervisor"] || "",
        dateHired: row["Date Hired"] || "",
        tenure: row["Tenure"] || "",
      }));
    },
    processTextOrDatFile(data) {
      const rows = data.split("\n").map((line) => line.split(","));

      this.employees = rows.slice(1).map((row) => ({
        status: row[0] || "",
        employeeNo: row[1] || "",
        name: row[2] || "",
        processCertification: row[3] || "",
        supervisor: row[4] || "",
        dateHired: row[5] || "",
        tenure: row[6] || "",
      }));
    },
  },
};
</script>

<style scoped>
.nav-buttons,
.shift-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.nav-btn,
.shift-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: #1e3a5f;
  color: white;
}

.nav-btn.active,
.shift-btn.active {
  background: #00c6fb;
}

.search-bar {
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
}

.employee-table {
  width: 100%;
  border-collapse: collapse;
  background: #112240;
}

.employee-table th,
.employee-table td {
  padding: 10px;
  border-bottom: 1px solid #555;
}

.status-badge {
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  text-transform: uppercase;
}

.status-badge.active {
  background: #28a745;
  color: white;
}

.status-badge.inactive {
  background: #dc3545;
  color: white;
}

.status-badge.temporary {
  background: #ffc107;
  color: black;
}

.file-input {
  display: none;
}

.import-btn {
  background: #00c6fb;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  color: white;
  border-radius: 5px;
  margin-left: 10px;
}
</style>
