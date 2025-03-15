const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./attendance.db",
  },
  useNullAsDefault: true,
});

module.exports = knex;
