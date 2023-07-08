var express = require("express");
var router = express.Router();
var sql = require("mssql");
const getConnectionPool = require("../db");

router.get("/", async (req, res) => {
  const pool = getConnectionPool();
  try {
    await pool.connect();
    const request = pool.request();
    let baseQuery = "SELECT * FROM Materials";
    console.log("req.query.filters", req.query.filters);
    let filters = req.query.filters;
    let conditions = [];

    for (let filterKey of Object.keys(filters)) {
      if (filters[filterKey]) {
        conditions.push(`${filterKey} = '${filters[filterKey]}'`);
      }
    }

    let query = conditions.length
      ? baseQuery + " WHERE " + conditions.join(" AND ")
      : "";

    if (query) {
      const result = await request.query(query);
      res.json(result.recordset);
    } else {
      res.json([]);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
