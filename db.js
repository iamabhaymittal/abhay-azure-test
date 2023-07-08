var sql = require("mssql");

const dbConfig = {
  server: "gleeds-basic.database.windows.net",
  database: "carbon factor db",
  user: "developeruser",
  password: "gleedsdev@321",
  port: 1433,
  // These two settings are important to fix issues with Azure SQL
  options: {
    encrypt: true,
    enableArithAbort: true,
  },
};

function getConnectionPool() {
  const pool = new sql.ConnectionPool(dbConfig);
  pool.on("error", (err) => {
    console.error("SQL Pool Error", err);
  });
  return pool;
}

module.exports = getConnectionPool;
