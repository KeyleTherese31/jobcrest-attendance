<template>
  <div class="add-employee-container">
    <h2>Add New Employee</h2>
    <form @submit.prevent="addEmployee">
      <div class="form-group">
        <label>Employee No:</label>
        <input v-model="newEmployee.employeeNo" required />
      </div>
      <div class="form-group">
        <label>Name:</label>
        <input v-model="newEmployee.name" required />
      </div>

      <!-- Status, Gender, Marital Status in One Row -->
      <div class="form-row">
        <div class="form-group">
          <label>Status:</label>
          <select v-model="newEmployee.status">
            <option>Active</option>
            <option>Inactive</option>
            <option>Temporary Inactive</option>
          </select>
        </div>
        <div class="form-group">
          <label>Gender:</label>
          <select v-model="newEmployee.gender">
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <div class="form-group">
          <label>Marital Status:</label>
          <select v-model="newEmployee.maritalStatus">
            <option>Single</option>
            <option>Married</option>
            <option>Divorced</option>
            <option>Widowed</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label>Process Certification:</label>
        <input v-model="newEmployee.processCertification" />
      </div>
      <div class="form-group">
        <label>Supervisor:</label>
        <input v-model="newEmployee.supervisor" required />
      </div>
      <div class="form-group">
        <label>Date Hired:</label>
        <input type="date" v-model="newEmployee.dateHired" required />
      </div>
      <div class="form-group">
        <label>Tenure:</label>
        <input v-model="newEmployee.tenure" />
      </div>
      <div class="form-group">
        <label>Date of Certification:</label>
        <input type="date" v-model="newEmployee.dateOfCertification" />
      </div>

      <div class="form-buttons">
        <button type="submit" class="save-btn">Save Employee</button>
        <router-link to="/dashboard" class="cancel-btn">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newEmployee: {
        employeeNo: "",
        name: "",
        status: "Active",
        processCertification: "",
        supervisor: "",
        dateHired: "",
        tenure: "",
        dateOfCertification: "",
        gender: "Male",
        maritalStatus: "Single",
      },
    };
  },
  methods: {
    addEmployee() {
      console.log("Employee added:", this.newEmployee);
      this.$router.push("/employee-list");
    },
  },
};
</script>

<style scoped>
.add-employee-container {
  max-width: 650px;
  margin: auto;
  background: #112240;
  padding: 25px;
  border-radius: 10px;
  color: white;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

/* Arrange Status, Gender, Marital Status in One Row */
.form-row {
  display: flex;
  gap: 15px;
}

.form-row .form-group {
  flex: 1;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.save-btn {
  background: #00c6fb;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  color: white;
  border-radius: 5px;
}

.cancel-btn {
  background: #ff4d4d;
  padding: 10px 15px;
  text-decoration: none;
  color: white;
  border-radius: 5px;
  text-align: center;
}
</style>
