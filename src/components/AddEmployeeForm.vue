<template>
  <div class="add-employee-container">
    <h2>Add New Employee</h2>

    <div class="form-wrapper">
      <form @submit.prevent="addEmployee">
        <div class="form-group">
          <label>Status:</label>
          <select v-model="newEmployee.status" class="form-control">
            <option>Active</option>
            <option>Inactive</option>
            <option>Temporary Inactive</option>
          </select>
        </div>

        <div class="form-group">
          <label>Employee No:</label>
          <input
            v-model="newEmployee.employeeNo"
            class="form-control"
            required
          />
        </div>

        <div class="form-group">
          <label>Name:</label>
          <input v-model="newEmployee.name" class="form-control" required />
        </div>

        <div class="form-row">
          <div class="form-group col">
            <label>Plant:</label>
            <select v-model="newEmployee.plant" class="form-control">
              <option>Plant 1</option>
              <option>Plant 3</option>
            </select>
          </div>
          <div class="form-group col">
            <label>Shift:</label>
            <select v-model="newEmployee.shift" class="form-control">
              <option>A-Shift</option>
              <option>C-Shift</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>Process Certification:</label>
          <input
            v-model="newEmployee.processCertification"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label>Supervisor:</label>
          <input
            v-model="newEmployee.supervisor"
            class="form-control"
            required
          />
        </div>

        <div class="form-group">
          <label>Date Hired:</label>
          <input
            type="date"
            v-model="newEmployee.dateHired"
            class="form-control"
            required
          />
        </div>

        <div class="form-group">
          <label>Tenure:</label>
          <input
            type="number"
            v-model.number="newEmployee.tenure"
            class="form-control"
            min="0"
            required
          />
        </div>

        <div class="form-buttons">
          <button type="submit" class="btn btn-primary">Save Employee</button>
          <button type="button" class="btn btn-danger" @click="cancelForm">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newEmployee: {
        employeeNo: "",
        name: "",
        plant: "Plant 1",
        shift: "A-Shift",
        status: "Active",
        processCertification: "",
        supervisor: "",
        dateHired: "",
        tenure: null,
      },
    };
  },
  methods: {
    addEmployee() {
      if (
        !this.newEmployee.employeeNo ||
        !this.newEmployee.name ||
        !this.newEmployee.supervisor ||
        !this.newEmployee.dateHired ||
        this.newEmployee.tenure === null
      ) {
        alert("Please fill in all required fields!");
        return;
      }
      alert("Employee saved successfully!");
      this.$router.push("/dashboard/employees");
    },
    cancelForm() {
      if (
        confirm("Are you sure you want to leave? Unsaved changes will be lost.")
      ) {
        this.$router.push("/dashboard/employees");
      }
    },
  },
};
</script>

<style scoped>
.add-employee-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background: #222;
  color: white;
  border-radius: 10px;
}

/* Makes form scrollable */
.form-wrapper {
  max-height: 500px;
  overflow-y: auto;
}

/* Aligns plant & shift fields */
.form-row {
  display: flex;
  gap: 15px;
}

/* Buttons styling */
.form-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
