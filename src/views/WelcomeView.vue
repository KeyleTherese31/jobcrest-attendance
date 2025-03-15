<template>
  <div class="welcome-container">
    <div class="content text-center">
      <h1 class="text-bordered">Welcome, JobCrest Admin!</h1>
      <button class="btn btn-primary mt-3" @click="proceedToLogin">
        Proceed to Login
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    proceedToLogin() {
      this.$router.push("/login"); // Redirect directly to Login Form
    },
  },
};
</script>

<style scoped>
/* Background Styling */
.welcome-container {
  background: url("@/assets/background.jpg") no-repeat center center fixed;
  background-size: cover;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
}

/* Dark Overlay for Better Text Visibility */
.welcome-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Dark overlay */
}

/* Center Content */
.content {
  position: relative;
  z-index: 1;
  padding: 20px;
  color: white; /* Ensures text is visible */
}

/* Text Border Effect */
.text-bordered {
  text-shadow: 2px 2px 4px #0d1b2a; /* Dark blue shadow */
  font-weight: bold;
}

/* Fade-in Effect */
.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
