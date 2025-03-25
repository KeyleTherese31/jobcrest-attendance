<template>
  <div class="add-employee-container">
    <h2>Add New Employee</h2>

    <div class="form-wrapper">
      <form @submit.prevent="addEmployee">
        <!-- Status Selection -->
        <div class="form-group">
          <label>Status:</label>
          <select v-model="newEmployee.status">
            <option>Active</option>
            <option>Inactive</option>
            <option>Temporary Inactive</option>
          </select>
        </div>

        <div class="form-group">
          <label>Employee No:</label>
          <input v-model="newEmployee.employeeNo" required />
        </div>

        <div class="form-group">
          <label>Name:</label>
          <input v-model="newEmployee.name" required />
        </div>

        <!-- Plant & Shift Selection -->
        <div class="form-row">
          <div class="form-group">
            <label>Plant:</label>
            <select v-model="newEmployee.plant">
              <option>Plant 1</option>
              <option>Plant 3</option>
            </select>
          </div>
          <div class="form-group">
            <label>Shift:</label>
            <select v-model="newEmployee.shift">
              <option>A-Shift</option>
              <option>C-Shift</option>
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
          <input
            type="number"
            v-model.number="newEmployee.tenure"
            min="0"
            required
          />
        </div>

        <!-- Buttons -->
        <div class="form-buttons">
          <button type="submit" class="save-btn">Save Employee</button>
          <router-link
            to="/dashboard/employees"
            class="cancel-btn"
            @click.native.prevent="confirmNavigation"
          >
            Cancel
          </router-link>
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
      formChanged: false, // Track changes
    };
  },
  watch: {
    newEmployee: {
      deep: true,
      handler() {
        this.formChanged = true; // Mark as changed if any input is modified
      },
    },
  },
  methods: {
    addEmployee() {
      console.log("Employee added:", this.newEmployee);
      this.formChanged = false; // Reset change tracker after saving
      this.$router.push("/dashboard/employees");
    },
    confirmNavigation(event) {
      if (this.formChanged) {
        const confirmLeave = confirm(
          "You have unsaved changes. Are you sure you want to leave?"
        );
        if (!confirmLeave) {
          event.preventDefault();
        }
      }
    },
    handlePageReload(event) {
      if (this.formChanged) {
        event.preventDefault();
        event.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this.formChanged) {
      const answer = confirm(
        "You have unsaved changes. Do you really want to leave?"
      );
      if (!answer) {
        next(false);
      } else {
        next();
      }
    } else {
      next();
    }
  },
  created() {
    window.addEventListener("beforeunload", this.handlePageReload);
  },
  destroyed() {
    window.removeEventListener("beforeunload", this.handlePageReload);
  },
};
</script>

<style scoped>
.add-employee-container {
  max-width: 80%;
  min-width: 750px;
  margin: auto;
  background: #112240;
  padding: 30px;
  border-radius: 10px;
  color: white;
  display: flex;
  flex-direction: column;
}

/* Ensures the form doesn't overflow the screen */
.form-wrapper {
  max-height: 500px;
  overflow-y: auto;
  padding-right: 15px;
}

/* Form fields styling */
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
  padding: 12px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

/* Arrange Plant & Shift in One Row */
.form-row {
  display: flex;
  gap: 20px;
}

.form-row .form-group {
  flex: 1;
}

/* Buttons styling */
.form-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.save-btn {
  background: #00c6fb;
  padding: 12px 20px;
  border: none;
  cursor: pointer;
  color: white;
  border-radius: 5px;
  font-size: 16px;
}

.cancel-btn {
  background: #ff4d4d;
  padding: 12px 20px;
  text-decoration: none;
  color: white;
  border-radius: 5px;
  text-align: center;
  font-size: 16px;
}

/* Responsive Design */
@media (max-width: 800px) {
  .add-employee-container {
    max-width: 90%;
    min-width: auto;
  }
  .form-row {
    flex-direction: column;
  }
}
</style>
