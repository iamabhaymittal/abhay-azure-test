var express = require("express");
var router = express.Router();
var sql = require("mssql");
const getConnectionPool = require("../../db");

router.post("/", async (req, res) => {
  const pool = getConnectionPool();
  try {
    await pool.connect();
    const request = new sql.Request(pool);

    console.log("req.body:documentID", req.body.DocumentId);
    console.log("req.body:Category", req.body.Category);

    const query = `
    INSERT INTO [dbo].[Materials]
    (
      [Category],
      [SubCategoryL1],
      [SubCategoryL2],
      [Specification],
      [GWPTotalA1A3_kgCo2e],
      [GWPTotalA4_kgCo2e],
      [GWPTotalA5_kgCo2e],
      [DeclaredUnit],
      [Density],
      [UnitOfDensity],
      [Manufacturer],
      [GeographicalScope],
      [ManufacturingLocation],
      [EPDPublicationDate],
      [EPDValidityDate],
      [EPDRegistrationNumber],
      [Remarks],
      [DocumentId]
    )
    VALUES
    (
      @Category,
      @SubCategoryL1,
      @SubCategoryL2,
      @Specification,
      @GWPTotalA1A3_kgCo2e,
      @GWPTotalA4_kgCo2e,
      @GWPTotalA5_kgCo2e,
      @DeclaredUnit,
      @Density,
      @UnitOfDensity,
      @Manufacturer,
      @GeographicalScope,
      @ManufacturingLocation,
      @EPDPublicationDate,
      @EPDValidityDate,
      @EPDRegistrationNumber,
      @Remarks,
      @DocumentId
    )`;

    request.input("Category", sql.VarChar(30), req.body.Category);
    request.input("SubCategoryL1", sql.VarChar(30), req.body.SubCategoryL1);
    request.input("SubCategoryL2", sql.VarChar(30), req.body.SubCategoryL2);
    request.input("Specification", sql.VarChar(200), req.body.Specification);
    request.input(
      "GWPTotalA1A3_kgCo2e",
      sql.Decimal(6, 2),
      req.body.GWPTotalA1A3_kgCo2e
    );
    request.input(
      "GWPTotalA4_kgCo2e",
      sql.Decimal(6, 2),
      req.body.GWPTotalA4_kgCo2e
    );
    request.input(
      "GWPTotalA5_kgCo2e",
      sql.Decimal(6, 2),
      req.body.GWPTotalA5_kgCo2e
    );
    request.input("DeclaredUnit", sql.Int, req.body.DeclaredUnit); //Foreign Key //unitMeasureResult
    request.input("Density", sql.Decimal, req.body.Density);
    request.input("UnitOfDensity", sql.Int, req.body.UnitOfDensity); //Foreign Key //unitDensityResult
    request.input("Manufacturer", sql.VarChar(200), req.body.Manufacturer);
    request.input(
      "GeographicalScope",
      sql.VarChar(200),
      req.body.GeographicalScope
    );
    request.input(
      "ManufacturingLocation",
      sql.VarChar(200),
      req.body.ManufacturingLocation
    );
    // request.input("EPDSourceId", sql.Int, req.body.EPDSourceId); //Foreign Key
    request.input("EPDPublicationDate", sql.Date, req.body.EPDPublicationDate);
    request.input("EPDValidityDate", sql.Date, req.body.EPDValidityDate);
    request.input(
      "EPDRegistrationNumber",
      sql.VarChar(30),
      req.body.EPDRegistrationNumber
    );
    request.input("DocumentId", sql.Int, req.body.DocumentId);
    request.input("Remarks", sql.VarChar(200), req.body.Remarks);

    await request.query(query);

    res.status(201).send("Material Added successfully");
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).send("An error occurred during the query");
  }
});

module.exports = router;
