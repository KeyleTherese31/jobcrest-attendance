<template>
  <div class="bg-[#1e3a5f] p-3 rounded-xl shadow text-center">
    <h3 class="text-xs text-gray-300 truncate">{{ title }}</h3>
    <p class="text-xl font-bold text-white mt-1">{{ value }}</p>
  </div>
</template>

<script>
export default {
  props: ["title", "value"],
};
</script>

<style scoped></style>
