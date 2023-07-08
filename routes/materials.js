var express = require("express");
var router = express.Router();
var sql = require("mssql");
const getConnectionPool = require("../db");

router.post("/", async (req, res) => {
  const pool = getConnectionPool();

  try {
    await pool.connect();
    const request = new sql.Request(pool);

    // Map request body data to table columns
    request.input("MaterialCode", sql.VarChar, req.body.MaterialCode);
    request.input("Region", sql.VarChar, req.body.Region);
    request.input("Category_Level1", sql.VarChar, req.body.Category_Level1);
    request.input("Category_Level2", sql.VarChar, req.body.Category_Level2);
    request.input("Category_Level3", sql.VarChar, req.body.Category_Level3);
    request.input(
      "MaterialSpecification",
      sql.VarChar,
      req.body.MaterialSpecification
    );
    request.input("CarbonFactor", sql.Float, req.body.CarbonFactor);
    request.input("UnitOfMeasure", sql.VarChar, req.body.UnitOfMeasure);
    request.input("Density", sql.Float, req.body.Density);
    request.input("UnitOfDensity", sql.VarChar, req.body.UnitOfDensity);
    request.input("Manufacturer", sql.VarChar, req.body.Manufacturer);
    request.input("CementContent", sql.VarChar, req.body.CementContent);
    request.input("Validity", sql.Date, req.body.Validity);
    request.input("ISO", sql.VarChar, req.body.ISO);
    request.input("EN", sql.VarChar, req.body.EN);
    request.input("EPDavailability", sql.Bit, req.body.EPDavailability);
    request.input("EPDSource", sql.VarChar, req.body.EPDSource);
    request.input("EPDNo", sql.VarChar, req.body.EPDNo);
    request.input("DataSource", sql.VarChar, req.body.DataSource);
    request.input("Remarks", sql.VarChar, req.body.Remarks);
    request.input("IssueNo", sql.Int, req.body.IssueNo);
    request.input("Ananlyst", sql.VarChar, req.body.Ananlyst);
    request.input("CreatedDate", sql.DateTime, req.body.CreatedDate);
    request.input("CreatedBy", sql.VarChar, req.body.CreatedBy);
    request.input("UpdatedDate", sql.DateTime, req.body.UpdatedDate);
    request.input("UpdatedBy", sql.VarChar, req.body.UpdatedBy);
    request.input("IsReviewed", sql.Bit, req.body.IsReviewed);
    request.input("IsExpired", sql.Bit, req.body.IsExpired);
    request.input("ExpiredLinkTo", sql.VarChar, req.body.ExpiredLinkTo);
    request.input("CognitoResponse", sql.VarChar, req.body.CognitoResponse);

    // SQL INSERT query
    const query = `
            INSERT INTO [dbo].[CarbonFactorData]
            (
                [MaterialCode], 
                [Region],
                [Category_Level1],
                [Category_Level2],
                [Category_Level3],
                [MaterialSpecification],
                [CarbonFactor],
                [UnitOfMeasure],
                [Density],
                [UnitOfDensity],
                [Manufacturer],
                [CementContent],
                [Validity],
                [ISO],
                [EN],
                [EPDavailability],
                [EPDSource],
                [EPDNo],
                [DataSource],
                [Remarks],
                [IssueNo],
                [Ananlyst],
                [CreatedDate],
                [CreatedBy],
                [UpdatedDate],
                [UpdatedBy],
                [IsReviewed],
                [IsExpired],
                [ExpiredLinkTo],
                [CognitoResponse]
            )
            VALUES
            (
                @MaterialCode, 
                @Region,
                @Category_Level1,
                @Category_Level2,
                @Category_Level3,
                @MaterialSpecification,
                @CarbonFactor,
                @UnitOfMeasure,
                @Density,
                @UnitOfDensity,
                @Manufacturer,
                @CementContent,
                @Validity,
                @ISO,
                @EN,
                @EPDavailability,
                @EPDSource,
                @EPDNo,
                @DataSource,
                @Remarks,
                @IssueNo,
                @Ananlyst,
                @CreatedDate,
                @CreatedBy,
                @UpdatedDate,
                @UpdatedBy,
                @IsReviewed,
                @IsExpired,
                @ExpiredLinkTo,
                @CognitoResponse
            )
          `;
    await request.query(query);
    res.status(201).send("Material created successfully");
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).send("An error occurred during the operation");
  }
});

module.exports = router;
