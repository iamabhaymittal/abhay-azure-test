var express = require("express");
var router = express.Router();
var sql = require("mssql");
const getConnectionPool = require("../db");

router.get("/", async (req, res) => {
  const pool = getConnectionPool();
  try {
    await pool.connect();
    const request = pool.request();
    let query = `SELECT * FROM Materials`;
    if (req.query.search) {
      query += ` WHERE 
        Category LIKE '%${req.query.search}%' OR 
        SubCategoryL1 LIKE '%${req.query.search}%' OR 
        SubCategoryL2 LIKE '%${req.query.search}%' OR 
        Specification LIKE '%${req.query.search}%' OR 
        GWPTotalA1A3_kgCo2e LIKE '%${req.query.search}%' OR 
        GWPTotalA4_kgCo2e LIKE '%${req.query.search}%' OR 
        GWPTotalA5_kgCo2e LIKE '%${req.query.search}%' OR 
        DeclaredUnit LIKE '%${req.query.search}%' OR 
        Density LIKE '%${req.query.search}%' OR 
        UnitOfDensity LIKE '%${req.query.search}%' OR 
        Manufacturer LIKE '%${req.query.search}%' OR 
        GeographicalScope LIKE '%${req.query.search}%' OR 
        ManufacturingLocation LIKE '%${req.query.search}%' OR 
        EPDPublicationDate LIKE '%${req.query.search}%' OR 
        EPDValidityDate LIKE '%${req.query.search}%' OR 
        EPDRegistrationNumber LIKE '%${req.query.search}%' OR 
        Remarks LIKE '%${req.query.search}%' OR
        DocumentId LIKE '%${req.query.search}%'`;
    }
    const result = await request.query(query);
    res.json(result.recordset);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
