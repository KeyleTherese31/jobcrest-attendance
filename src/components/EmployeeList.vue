<template>
  <div class="employee-list-container">
    <div class="header">
      <h2>Employee List</h2>
      <div class="actions">
        <router-link to="/dashboard/employees/add" class="add-btn">
          ➕ Add Employee
        </router-link>
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
          @click="toggleShift(shift)"
          :class="['shift-btn', { active: activeShift === shift }]"
        >
          {{ shift }}
        </button>
      </div>

      <!-- Employee Table with Pagination -->
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(employee, index) in paginatedEmployees"
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
              <td>
                <button @click="editEmployee(index)" class="edit-btn">
                  ✏️
                </button>
                <button @click="confirmDelete(index)" class="delete-btn">
                  ❌
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination Controls -->
        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">
            ⬅️ Previous
          </button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage >= totalPages">
            Next ➡️
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as XLSX from "xlsx";
import axios from "axios"; // Add axios for HTTP requests

export default {
  data() {
    return {
      plants: [{ name: "Plant 1" }, { name: "Plant 3" }],
      activePlant: "Plant 1",
      shifts: ["A-Shift", "C-Shift", "All Shift"],
      activeShift: "All Shift",
      searchQuery: "",
      employees: [], // Employee list
      currentPage: 1,
      itemsPerPage: 3, // Pagination limit
    };
  },
  computed: {
    filteredEmployees() {
      return this.employees.filter(
        (emp) =>
          emp.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
          emp.plant === this.activePlant &&
          (this.activeShift === "All Shift" || emp.shift === this.activeShift)
      );
    },
    totalPages() {
      return Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
    },
    paginatedEmployees() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredEmployees.slice(start, start + this.itemsPerPage);
    },
  },
  methods: {
    togglePlant(plant) {
      this.activePlant = plant;
      this.currentPage = 1;
    },
    toggleShift(shift) {
      this.activeShift = shift;
      this.currentPage = 1;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
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
          alert("Unsupported file format.");
        }
      };

      if (file.name.endsWith(".dat")) {
        reader.readAsText(file);
      } else {
        reader.readAsBinaryString(file);
      }
    },
    processExcelFile(data) {
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      // Convert data into employee objects
      let newEmployees = jsonData.map((row) => ({
        employeeNo: row["Employee No"] || "",
        name: row["Name"] || "",
        status: row["Status"] || "",
        processCertification: row["Process Certification"] || "",
        supervisor: row["Supervisor"] || "",
        dateHired: row["Date Hired"] || "",
        tenure: row["Tenure"] || "",
        plant: row["Plant"] || "",
        shift: row["Shift"] || "",
      }));

      // Add new employees while preventing duplicates
      this.mergeEmployees(newEmployees);
    },
    processTextOrDatFile(data) {
      const rows = data.split("\n").map((row) => row.split(","));
      let newEmployees = rows.map((row) => ({
        employeeNo: row[0] || "",
        name: row[1] || "",
        status: row[2] || "",
        processCertification: row[3] || "",
        supervisor: row[4] || "",
        dateHired: row[5] || "",
        tenure: row[6] || "",
        plant: row[7] || "",
        shift: row[8] || "",
      }));
      this.mergeEmployees(newEmployees);
    },
    mergeEmployees(newEmployees) {
      const existingEmployeeNos = new Set(
        this.employees.map((e) => e.employeeNo)
      );

      newEmployees.forEach((employee) => {
        if (!existingEmployeeNos.has(employee.employeeNo)) {
          this.employees.push(employee); // Add only if not duplicate
        }
      });

      this.saveEmployeesToDatabase(); // Save updated list to backend
    },
    saveEmployeesToDatabase() {
      axios
        .post("http://localhost:5000/api/employees", this.employees)
        .then((response) => {
          console.log("Employees saved successfully:", response);
        })
        .catch((error) => {
          console.error("Error saving employees:", error);
        });
    },
    loadEmployees() {
      const storedEmployees = localStorage.getItem("employees");
      if (storedEmployees) {
        this.employees = JSON.parse(storedEmployees);
      }
    },
    confirmDelete(index) {
      if (confirm("Are you sure you want to delete this employee?")) {
        this.employees.splice(index, 1);
        this.saveEmployeesToDatabase(); // Save after deletion
      }
    },
    editEmployee(index) {
      alert(`Edit employee: ${this.employees[index].name}`);
    },
  },
  mounted() {
    this.loadEmployees(); // Load data when component is mounted
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

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.actions {
  display: flex;
  gap: 10px;
}

.add-btn,
.import-btn {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: #28a745;
  color: white;
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

.editable {
  border: 1px solid #ccc;
  padding: 5px;
  width: 100%;
}

.delete-btn {
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 3px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.pagination button {
  padding: 5px 10px;
  margin: 0 5px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  background: #00c6fb;
  color: white;
}
</style>
