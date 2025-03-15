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

      <!-- File Upload Button -->
      <div class="input-group">
        <input
          type="file"
          @change="importSpreadsheet"
          class="form-control file-input"
          accept=".xls, .xlsx, .csv"
        />
        <button class="btn btn-success upload-btn">Import Spreadsheet</button>
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
        <tr v-for="(employee, index) in filteredEmployees" :key="index">
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
                @click="
                  employee.status = status;
                  employee.statusType = '';
                "
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

    <button class="btn btn-primary save-btn" @click="saveAttendance">
      Save Attendance
    </button>
  </div>
</template>

<script>
import * as XLSX from "xlsx"; // Ensure xlsx is installed for spreadsheet parsing

export default {
  data() {
    return {
      selectedShift: "A-Shift",
      selectedDate: new Date().toISOString().split("T")[0],
      attendanceStatuses: ["Present", "Absent", "Others"],
      employees: [], // Start with an empty list
    };
  },
  computed: {
    filteredEmployees() {
      return this.employees.filter((emp) => emp.shift === this.selectedShift);
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
    saveAttendance() {
      console.log("Attendance Saved:", {
        date: this.selectedDate,
        shift: this.selectedShift,
        records: this.filteredEmployees,
      });
      alert("Attendance has been saved!");
    },
    importSpreadsheet(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        // Assuming columns are "Employee No", "Employee Name", "Shift"
        this.employees = jsonData.map((row) => ({
          number: row["Employee No"],
          name: row["Employee Name"],
          shift: row["Shift"] || "A-Shift",
          status: "",
          statusType: "",
        }));

        console.log("Imported Data:", this.employees);
        alert("Spreadsheet imported successfully!");
      };
      reader.readAsArrayBuffer(file);
    },
  },
};
</script>

<style scoped>
.set-attendance {
  padding: 20px;
}

.selection-container {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.large-input {
  height: 50px;
  font-size: 18px;
  width: 288px;
}

.upload-btn {
  height: 40px;
  font-size: 18px;
  padding: 10px 10px;
  display: flex;
  align-items: center;
}

.file-input {
  height: 50px;
  font-size: 18px;
  width: 288px;
  padding: 10px;
  margin-bottom: 10px;
}

.save-btn {
  margin-top: 15px;
  font-size: 18px;
  padding: 10px 20px;
}

/* Table Styles */
.custom-table {
  background-color: white;
}

.employee-name,
.employee-number {
  color: black;
  font-weight: bold;
}

/* Button Styles */
.btn-group {
  display: flex;
  gap: 5px;
}

h2 {
  color: #00c6fb;
}
</style>
