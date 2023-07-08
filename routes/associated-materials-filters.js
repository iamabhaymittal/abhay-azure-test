var express = require("express");
var router = express.Router();
var sql = require("mssql");
const getConnectionPool = require("../db");

router.get("/", async (req, res) => {
  const pool = getConnectionPool();
  try {
    await pool.connect();

    const request = pool.request();
    let filters = req.query;

    let filterKeys = Object.keys(filters).filter((key) => filters[key] !== "");

    if (filterKeys.length !== 0) {
      let whereClause =
        "WHERE " + filterKeys.map((key) => `${key} = @${key}`).join(" AND ");

      filterKeys.forEach((key) => request.input(key, filters[key]));

      let columns = [
        "Category",
        "SubCategoryL1",
        "SubCategoryL2",
        "Specification",
        "GeographicalScope",
        "EPDValidityDate",
        "Manufacturer",
      ];

      let promises = columns.map((column) =>
        // skipping queries for columns that are already a filter
        filters[column]
          ? null
          : request.query(
              `SELECT DISTINCT ${column} FROM Materials ${whereClause}`
            )
      );

      let results = await Promise.all(promises);

      let responseObj = {};
      results.forEach((result, index) => {
        if (result) {
          // filter was not applied on this column
          responseObj[columns[index]] = result.recordset;
        }
      });

      res.json(responseObj);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
