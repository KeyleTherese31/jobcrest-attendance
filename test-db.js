const db = require("./database");

db.schema
  .hasTable("employees")
  .then((exists) => {
    if (!exists) {
      return db.schema.createTable("employees", (table) => {
        table.increments("id").primary();
        table.string("name");
        table.string("position");
        table.string("status"); // Present, Absent, Leave
      });
    }
  })
  .then(() => {
    console.log("Database setup complete!");
    process.exit();
  })
  .catch((err) => console.error(err));
