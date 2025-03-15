<template>
  <div class="overview">
    <h2>Absence Overview</h2>
    <BarChart :chart-data="absenceData" />
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";

export default {
  components: {
    BarChart: {
      extends: Bar,
      props: ["chartData"],
      mounted() {
        this.renderChart(this.chartData, {
          responsive: true,
          maintainAspectRatio: false,
        });
      },
    },
  },
  data() {
    return {
      absenceData: {
        labels: ["VL", "SL", "AWOL", "EL"],
        datasets: [
          {
            label: "Absences",
            backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"],
            data: [10, 5, 7, 3], // Mock data, replace later with actual fetched data
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
.overview {
  padding: 20px;
  text-align: center;
}
h2 {
  color: #00c6fb;
}
</style>
