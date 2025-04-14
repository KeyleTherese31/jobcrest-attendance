<template>
  <div class="track-report">
    <h2>Track Attendance</h2>

    <!-- Date Filters -->
    <div class="filters">
      <label for="startDate">Start Date:</label>
      <input type="date" id="startDate" v-model="startDate" />
      <label for="endDate">End Date:</label>
      <input type="date" id="endDate" v-model="endDate" />
      <button @click="fetchReport" class="btn btn-secondary">Filter</button>
    </div>

    <!-- Tabs -->
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="['tab-button', { active: activeTab === tab }]"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Tab Content -->
    <div class="tab-content">
      <!-- Summary Tab -->
      <table v-if="activeTab === 'Summary'" class="table">
        <thead>
          <tr>
            <th>Date / Week</th>
            <th>Total Headcount</th>
            <th>Total Trainee</th>
            <th>Total Active</th>
            <th>Total Inactive</th>
            <th>Total Temp. Inactive</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in summaryData" :key="index">
            <td>{{ row.period }}</td>
            <td>{{ row.headcount }}</td>
            <td>{{ row.trainee }}</td>
            <td>{{ row.active }}</td>
            <td>{{ row.inactive }}</td>
            <td>{{ row.tempInactive }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Absents Tab -->
      <table v-if="activeTab === 'Absents'" class="table">
        <thead>
          <tr>
            <th>Date / Week</th>
            <th>VL</th>
            <th>SL</th>
            <th>AWOL</th>
            <th>EL</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in absentsData" :key="'absents' + index">
            <td>{{ row.period }}</td>
            <td>{{ row.vl }}</td>
            <td>{{ row.sl }}</td>
            <td>{{ row.awol }}</td>
            <td>{{ row.el }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Temp. Inactive Tab -->
      <table v-if="activeTab === 'Temp. Inactive'" class="table">
        <thead>
          <tr>
            <th>Date / Week</th>
            <th>PUM</th>
            <th>PVL</th>
            <th>SUS</th>
            <th>PSL</th>
            <th>ML</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tempInactiveData" :key="'temp' + index">
            <td>{{ row.period }}</td>
            <td>{{ row.pum }}</td>
            <td>{{ row.pvl }}</td>
            <td>{{ row.sus }}</td>
            <td>{{ row.psl }}</td>
            <td>{{ row.ml }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Inactives Tab -->
      <table v-if="activeTab === 'Inactives'" class="table">
        <thead>
          <tr>
            <th>Date / Week</th>
            <th>Absorbed</th>
            <th>Resigned</th>
            <th>PTR</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in inactiveData" :key="'inactive' + index">
            <td>{{ row.period }}</td>
            <td>{{ row.absorbed }}</td>
            <td>{{ row.resigned }}</td>
            <td>{{ row.ptr }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Download -->
    <button @click="downloadReport" class="btn btn-primary mt-4">
      Download Report
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      startDate: "",
      endDate: "",
      activeTab: "Summary",
      tabs: ["Summary", "Absents", "Temp. Inactive", "Inactives"],
      summaryData: [],
      absentsData: [],
      tempInactiveData: [],
      inactiveData: [],
    };
  },
  methods: {
    async fetchReport() {
      try {
        const response = await axios.get("/api/trackreport", {
          params: {
            startDate: this.startDate,
            endDate: this.endDate,
          },
        });

        this.summaryData = response.data.summaryData;
        this.absentsData = response.data.absentsData;
        this.tempInactiveData = response.data.tempInactiveData;
        this.inactiveData = response.data.inactiveData;
      } catch (error) {
        console.error("Error fetching report:", error);
      }
    },
    downloadReport() {
      const headers = [
        "Period,Headcount,Trainee,Active,Inactive,Temp. Inactive",
        "Period,VL,SL,AWOL,EL",
        "Period,PUM,PVL,SUS,PSL,ML",
        "Period,Absorbed,Resigned,PTR",
      ];
      const rows = [
        this.summaryData
          .map(
            (r) =>
              `${r.period},${r.headcount},${r.trainee},${r.active},${r.inactive},${r.tempInactive}`
          )
          .join("\n"),
        this.absentsData
          .map((r) => `${r.period},${r.vl},${r.sl},${r.awol},${r.el}`)
          .join("\n"),
        this.tempInactiveData
          .map((r) => `${r.period},${r.pum},${r.pvl},${r.sus},${r.psl},${r.ml}`)
          .join("\n"),
        this.inactiveData
          .map((r) => `${r.period},${r.absorbed},${r.resigned},${r.ptr}`)
          .join("\n"),
      ];
      const csvContent = headers.map((h, i) => `${h}\n${rows[i]}`).join("\n\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "attendance_track_report.csv";
      link.click();
    },
  },
  mounted() {
    this.fetchReport();
  },
};
</script>

<style scoped>
.track-report {
  padding: 20px;
  color: white;
}

.filters {
  margin-bottom: 20px;
}
.filters label {
  margin-right: 8px;
}
.filters input {
  margin-right: 16px;
}

.tabs {
  margin-bottom: 20px;
}
.tab-button {
  background: #333;
  color: white;
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  cursor: pointer;
}
.tab-button.active {
  background: #00c6fb;
}
.tab-button:hover {
  background: #009dcf;
}

.tab-content {
  max-height: 500px;
  overflow-y: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 10px;
  color: #f0f0f0; /* Lightened text */
}
.table th,
.table td {
  border: 1px solid #777; /* Lighter border for visibility */
  padding: 8px;
  text-align: center;
}

h2 {
  color: #00c6fb;
}

.btn {
  background-color: #00c6fb;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
}
.btn-secondary {
  background-color: #6c757d;
}
.btn:hover {
  background-color: #009dcf;
}
</style>
