<template>
  <div class="set-attendance">
    <h2>Set Daily Attendance</h2>

    <!-- Shift and Date Selection -->
    <div class="selection-container">
      <div class="input-group">
        <label for="shift">Select Shift:</label>
        <select v-model="selectedShift" class="form-control large-input">
          <option value="A-Shift">A-Shift</option>
          <option value="C-Shift">C-Shift</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      <div class="input-group">
        <label for="date">Select Date:</label>
        <input
          type="date"
          v-model="selectedDate"
          class="form-control large-input"
        />
      </div>

      <!-- File Upload and Import Button -->
      <div class="input-group">
        <input
          type="file"
          ref="fileInput"
          class="form-control file-input"
          accept=".xls, .xlsx, .csv"
        />
        <button class="btn btn-success upload-btn" @click="handleImport">
          Import Spreadsheet
        </button>
      </div>

      <!-- Download Button -->
      <div class="input-group">
        <label for="fromDate">From:</label>
        <input type="date" v-model="fromDate" class="form-control" />
        <label for="toDate">To:</label>
        <input type="date" v-model="toDate" class="form-control" />
        <button class="btn btn-secondary" @click="downloadAttendance">
          Download Data
        </button>
      </div>
    </div>

    <!-- Attendance Table -->
    <table class="table table-bordered custom-table">
      <thead>
        <tr>
          <th>Employee No.</th>
          <th>Employee Name</th>
          <th>Attendance Status</th>
          <th>Status Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in paginatedEmployees" :key="employee.number">
          <td class="employee-number">{{ employee.number }}</td>
          <td class="employee-name">{{ employee.name }}</td>
          <td>
            <div class="btn-group">
              <button
                v-for="status in attendanceStatuses"
                :key="status"
                :class="[
                  'btn',
                  employee.status === status ? 'btn-info' : 'btn-outline-info',
                ]"
                @click="employee.status = status"
              >
                {{ status }}
              </button>
            </div>
          </td>
          <td>
            <select
              v-if="employee.status"
              v-model="employee.statusType"
              class="form-control"
            >
              <option
                v-for="type in getStatusTypes(employee.status)"
                :key="type"
                :value="type"
              >
                {{ type }}
              </option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Controls -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage >= totalPages">
        Next
      </button>
    </div>

    <button class="btn btn-primary save-btn" @click="saveAttendance">
      Save Attendance
    </button>
  </div>
</template>

<script>
import * as XLSX from "xlsx";
import axios from "axios";

export default {
  data() {
    return {
      selectedShift: "A-Shift",
      selectedDate: new Date().toISOString().split("T")[0],
      attendanceStatuses: ["Present", "Absent", "Others"],
      employees: [],
      currentPage: 1,
      pageSize: 5,
      fromDate: "",
      toDate: "",
    };
  },
  computed: {
    filteredEmployees() {
      return this.employees.filter(
        (emp) =>
          emp.shift === this.selectedShift && emp.status_category === "Active"
      );
    },
    paginatedEmployees() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.filteredEmployees.slice(start, start + this.pageSize);
    },
    totalPages() {
      return Math.ceil(this.filteredEmployees.length / this.pageSize);
    },
  },
  methods: {
    getStatusTypes(status) {
      const statusOptions = {
        Present: ["12 Hours", "8 Hours"],
        Absent: ["VL", "SL", "AWOL", "EL"],
        Others: ["RD", "NW"],
      };
      return statusOptions[status] || [];
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    async fetchEmployees() {
      try {
        const response = await axios.get("http://localhost:5000/api/employees");
        this.employees = response.data;
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    },
    async saveAttendance() {
      const records = this.filteredEmployees.map((emp) => ({
        date: this.selectedDate,
        employee_id: emp.id,
        shift: emp.shift,
        status: emp.status,
        status_type: emp.statusType,
      }));
      await axios.post("/api/attendance/save", { records });
      alert("Attendance has been saved!");
    },
    async handleImport() {
      const file = this.$refs.fileInput.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        const importedData = jsonData.map((row) => ({
          number: row["Employee No"] || "",
          name: row["Employee Name"] || "",
          status: row["Attendance Status"] || "",
          statusType: row["Status Type"] || "",
          shift: this.selectedShift,
          status_category: "Active",
        }));

        this.employees = this.employees.map((emp) => {
          const match = importedData.find((i) => i.number === emp.number);
          return match
            ? {
                ...emp,
                status: match.status,
                statusType: match.statusType,
              }
            : emp;
        });

        alert("Spreadsheet imported and attendance updated!");
      };

      reader.readAsArrayBuffer(file);
    },
    async downloadAttendance() {
      const response = await axios.post("/api/attendance/download", {
        from: this.fromDate,
        to: this.toDate,
      });
      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `attendance_${this.fromDate}_to_${this.toDate}.csv`
      );
      document.body.appendChild(link);
      link.click();
    },
  },
  mounted() {
    this.fetchEmployees();
  },
};
</script>

<style scoped>
.set-attendance {
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  font-family: "Segoe UI", sans-serif;
}

h2 {
  color: #00c6fb;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 25px;
  text-align: center;
}

.selection-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 25px;
  justify-content: space-between;
}

.input-group {
  flex: 1 1 200px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.input-group label {
  font-weight: 600;
  color: #333;
}

.large-input,
.file-input,
.form-control {
  height: 45px;
  font-size: 16px;
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
}

.file-upload-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1 1 100%;
  max-width: 350px;
  margin-top: 10px;
}

.upload-btn,
.save-btn,
.btn-secondary {
  background-color: #00c6fb;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
  width: fit-content;
  align-self: flex-start;
}

.upload-btn:hover,
.save-btn:hover,
.btn-secondary:hover {
  background-color: #00aed1;
}

.table {
  width: 100%;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ddd;
  margin-top: 20px;
}

.custom-table th,
.custom-table td {
  vertical-align: middle;
  text-align: center;
  padding: 12px;
  font-size: 15px;
}

.custom-table th {
  background-color: #00c6fb;
  color: white;
  font-weight: 600;
}

.employee-name,
.employee-number {
  font-weight: bold;
  color: #333;
}

.btn-group {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin: 25px 0;
}

.pagination button {
  padding: 8px 16px;
  font-size: 14px;
  border: 1px solid #00c6fb;
  background: white;
  color: #00c6fb;
  border-radius: 4px;
  transition: all 0.3s;
}

.pagination button:hover {
  background-color: #00c6fb;
  color: white;
}

/* Adjust Save Button Placement */
.save-btn {
  margin-top: 20px;
}

/* Responsive adjustments */
@media screen and (max-width: 768px) {
  .selection-container {
    flex-direction: column;
    align-items: stretch;
  }

  .file-upload-container,
  .upload-btn {
    width: 100%;
  }

  .btn-group {
    flex-direction: column;
    align-items: center;
  }

  .pagination {
    flex-direction: column;
  }
}
</style>
