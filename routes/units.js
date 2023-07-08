var express = require("express");
var router = express.Router();
var sql = require("mssql");
const getConnectionPool = require("../db");

router.get("/", async (req, res) => {
  const pool = getConnectionPool();
  try {
    await pool.connect();
    const request = pool.request();
    const query = `SELECT * FROM UnitOfMeasure`;
    const result = await request.query(query);
    res.json(result.recordset);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
