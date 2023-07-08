var express = require("express");
var router = express.Router();
var sql = require("mssql");
const getConnectionPool = require("../../db");

router.get("/", async (req, res) => {
  const pool = getConnectionPool();
  const tableName = "CarbonFactorData";
  console.log(req.query.user);
  try {
    const poolConnect = pool.connect();
    await poolConnect; // ensures that the pool has been created
    const request = pool.request(); // or: new sql.Request(pool1)
    const query = `SELECT * FROM ${tableName} WHERE Ananlyst = @Ananlyst`;
    request.input("Ananlyst", sql.VarChar, req.query.user);
    const result = await request.query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).send("An error occurred during the query");
  }
});

module.exports = router;
