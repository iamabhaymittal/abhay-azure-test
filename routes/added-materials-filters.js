var express = require("express");
var router = express.Router();
var sql = require("mssql");
const getConnectionPool = require("../db");

router.get("/", async (req, res) => {
  const pool = getConnectionPool();
  try {
    await pool.connect();
    const request = pool.request();
    let query1 = `SELECT DISTINCT Category FROM Materials`;
    let query2 = `SELECT DISTINCT SubCategoryL1 FROM Materials`;
    let query3 = `SELECT DISTINCT SubCategoryL2 FROM Materials`;
    let query4 = `SELECT DISTINCT Specification FROM Materials`;
    let query5 = `SELECT DISTINCT GeographicalScope FROM Materials`;
    let query6 = `SELECT DISTINCT EPDValidityDate FROM Materials`;
    let query7 = `SELECT DISTINCT Manufacturer FROM Materials`;

    const result1 = await request.query(query1);
    const result2 = await request.query(query2);
    const result3 = await request.query(query3);
    const result4 = await request.query(query4);
    const result5 = await request.query(query5);
    const result6 = await request.query(query6);
    const result7 = await request.query(query7);
    res.json({
      Category: result1.recordset,
      SubCategoryL1: result2.recordset,
      SubCategoryL2: result3.recordset,
      Specification: result4.recordset,
      GeographicalScope: result5.recordset,
      EPDValidityDate: result6.recordset,
      Manufacturer: result7.recordset,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
