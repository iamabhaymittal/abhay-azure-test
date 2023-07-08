var express = require("express");
var router = express.Router();
var sql = require("mssql");
const getConnectionPool = require("../../db");

router.post("/", async (req, res) => {
  const pool = getConnectionPool();
  try {
    await pool.connect();
    const request = new sql.Request(pool);
    const query = `INSERT INTO [dbo].[Documents] 
      ([Name],[UploadedBy],[UploadedDate],[BlobId]) 
      OUTPUT INSERTED.DocumentId
      VALUES (@Name,@UploadedBy,@UploadedDate,@BlobId)`;
    request.input("Name", sql.VarChar(200), req.body.Name);
    request.input("UploadedBy", sql.VarChar(200), req.body.UploadedBy);
    request.input("UploadedDate", sql.Date, req.body.UploadedDate);
    request.input("BlobId", sql.VarChar(200), req.body.BlobId);
    const result = await request.query(query);
    res.json(result.recordset[0]);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
