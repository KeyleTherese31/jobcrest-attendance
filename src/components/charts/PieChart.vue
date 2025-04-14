<template>
  <div class="h-full">
    <canvas ref="pieCanvas" class="w-full h-full"></canvas>
  </div>
</template>

<script>
import { Pie } from "chart.js/auto";

export default {
  props: ["data"],
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      new Pie(this.$refs.pieCanvas.getContext("2d"), {
        type: "pie",
        data: this.data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: "white",
                padding: 10,
              },
              position: "bottom",
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped>
canvas {
  display: block;
}
</style>
