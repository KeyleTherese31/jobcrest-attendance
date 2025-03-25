<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-box">
      <h3>Unsaved Changes</h3>
      <p>You have unsaved changes. Are you sure you want to leave?</p>
      <div class="modal-actions">
        <button @click="confirmLeave" class="leave-btn">Leave</button>
        <button @click="cancelLeave" class="stay-btn">Stay</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isVisible"],
  methods: {
    confirmLeave() {
      this.$emit("confirm"); // Notify parent to allow leaving
    },
    cancelLeave() {
      this.$emit("cancel"); // Notify parent to stay on the page
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-box {
  background: #112240;
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 350px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.leave-btn {
  background: #ff4d4d;
  padding: 10px;
  border: none;
  cursor: pointer;
  color: white;
  border-radius: 5px;
}

.stay-btn {
  background: #00c6fb;
  padding: 10px;
  border: none;
  cursor: pointer;
  color: white;
  border-radius: 5px;
}
</style>
