<template>
  <div class="edit-employee">
    <h2>Edit Employee</h2>
    <form @submit.prevent="saveChanges">
      <div>
        <label for="name">Name:</label>
        <input v-model="employee.name" type="text" id="name" />
      </div>
      <div>
        <label for="status">Status:</label>
        <input v-model="employee.status" type="text" id="status" />
      </div>
      <!-- Add more fields as needed -->
      <button type="submit">Save Changes</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      employee: {
        name: "",
        status: "",
        // Add more fields as needed
      },
    };
  },
  methods: {
    fetchEmployeeData() {
      const employeeId = this.$route.params.id;
      axios
        .get(`http://localhost:5000/api/employees/${employeeId}`)
        .then((response) => {
          this.employee = response.data;
        })
        .catch((error) => {
          console.error("Error fetching employee data:", error);
        });
    },
    saveChanges() {
      const employeeId = this.$route.params.id;
      axios
        .put(`http://localhost:5000/api/employees/${employeeId}`, this.employee)
        .then((response) => {
          console.log("Employee updated:", response);
          this.$router.push("/dashboard/employees"); // Redirect to the employee list
        })
        .catch((error) => {
          console.error("Error updating employee:", error);
        });
    },
  },
  mounted() {
    this.fetchEmployeeData();
  },
};
</script>
