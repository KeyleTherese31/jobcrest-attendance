<template>
  <div class="overview-container">
    <!-- Stats Row -->
    <div class="stats-row">
      <div class="stat-card" v-for="(stat, index) in statsData" :key="index">
        <h3 class="stat-title">{{ stat.title }}</h3>
        <div class="stat-value">{{ stat.value }}</div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="charts-container">
      <!-- Pie Chart -->
      <div class="chart-card">
        <h2 class="chart-title">Headcount Distribution</h2>
        <div class="chart-area">
          <apexchart
            type="pie"
            :options="pieOptions"
            :series="pieData.series"
          ></apexchart>
        </div>
      </div>

      <!-- Line Chart -->
      <div class="chart-card">
        <div class="chart-header">
          <h2 class="chart-title">Attendance Trends</h2>
          <select v-model="graphRange" class="time-select">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div class="chart-area">
          <apexchart
            type="line"
            :options="lineChartOptions"
            :series="lineData.datasets"
          ></apexchart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApexCharts from "vue-apexcharts";

export default {
  name: "OverviewGraph",
  components: {
    apexchart: ApexCharts,
  },
  data() {
    return {
      graphRange: "daily",
      statsData: [
        { title: "JMI Requirement", value: 120 },
        { title: "FSCI Requirement", value: 110 },
        { title: "Actual Attendance", value: 105 },
        { title: "Attendance Rate (JMI)", value: "87.5%" },
        { title: "Attendance Rate (FSCI)", value: "95.4%" },
      ],
      pieData: {
        series: [45, 20, 10, 25],
      },
      pieOptions: {
        labels: ["Active", "Inactive", "Temporary Inactive", "Trainee"],
        colors: ["#00c6fb", "#1e3a5f", "#112240", "#ffffff"],
        legend: {
          position: "bottom",
        },
      },
    };
  },
  computed: {
    chartLabels() {
      if (this.graphRange === "daily")
        return ["Mon", "Tue", "Wed", "Thu", "Fri"];
      if (this.graphRange === "weekly")
        return ["Week 1", "Week 2", "Week 3", "Week 4"];
      return ["Jan", "Feb", "Mar", "Apr"];
    },
    lineChartOptions() {
      return {
        chart: {
          height: 350,
          type: "line",
        },
        xaxis: {
          categories: this.chartLabels,
        },
        fill: {
          opacity: 0.4,
        },
        colors: ["#00c6fb"],
        title: {
          text: "Active Headcount Rate",
          align: "center",
        },
      };
    },
    lineData() {
      return {
        datasets: [
          {
            name: "Active Headcount Rate",
            data:
              this.graphRange === "daily"
                ? [80, 85, 78, 90, 95]
                : this.graphRange === "weekly"
                ? [88, 92, 85, 90]
                : [82, 87, 90, 95],
          },
        ],
      };
    },
  },
};
</script>

<style scoped>
.overview-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #0d1b2a;
  color: white;
  border-radius: 16px;
  min-height: 100vh;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.stats-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 15px;
  width: 100%;
  flex-wrap: wrap;
}

.stat-card {
  background-color: #112240;
  border-radius: 10px;
  padding: 15px;
  flex: 1;
  min-width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.stat-title {
  font-size: 14px;
  margin-bottom: 8px;
  color: #ffffffcc;
}

.stat-value {
  font-size: 20px;
  font-weight: bold;
}

.charts-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.chart-card {
  background-color: #112240;
  border-radius: 12px;
  padding: 15px;
  height: 300px;
  display: flex;
  flex-direction: column;
}

.chart-title {
  font-size: 16px;
  margin-bottom: 15px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.time-select {
  background-color: #1e3a5f;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
}

.time-select:focus {
  outline: none;
}

.chart-area {
  flex: 1;
  width: 100%;
  height: 100%;
  position: relative;
}

@media (min-width: 1024px) {
  .charts-container {
    flex-direction: row;
  }

  .chart-card {
    width: 50%;
  }
}

@media (max-width: 768px) {
  .stats-row {
    flex-direction: column;
  }

  .stat-card {
    width: 100%;
  }
}
</style>
