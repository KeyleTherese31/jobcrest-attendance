<template>
  <div class="h-full">
    <canvas ref="lineCanvas" class="w-full h-full"></canvas>
  </div>
</template>

<script>
import { Line } from "chart.js/auto";

export default {
  props: ["labels", "data"],
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      new Line(this.$refs.lineCanvas.getContext("2d"), {
        type: "line",
        data: this.data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              ticks: { color: "white" },
              grid: { color: "#1e3a5f" },
            },
            y: {
              ticks: { color: "white" },
              grid: { color: "#1e3a5f" },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: "white",
              },
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped>
/* Remove height limit so container controls it */
canvas {
  display: block;
}
</style>
