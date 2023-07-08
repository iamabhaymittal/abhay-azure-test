var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var userMaterialRouter = require("./routes/materials/request");
var unitsRouter = require("./routes/units");
var latestDocumentRouter = require("./routes/documents");
var addDocumentRouter = require("./routes/documents/add-document");
var addedMaterialsRouter = require("./routes/added-materials");
var addedMaterialFiltersRouter = require("./routes/added-materials-filters");
var associatedMaterialsFiltersRouter = require("./routes/associated-materials-filters");
var searchMaterialsRouter = require("./routes/search-added-materials");
var filterAddedMaterialsRouter = require("./routes/filter-added-materials");
var addMaterialRouter = require("./routes/materials/add-material");
var addMaterialToCarbonDbTableRouter = require("./routes/materials");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/materials/request", userMaterialRouter);
app.use("/units", unitsRouter);
app.use("/documents", latestDocumentRouter);
app.use("/documents/add-document", addDocumentRouter);
app.use("/materials/added-materials", addedMaterialsRouter);
app.use("/materials/added-materials-filters", addedMaterialFiltersRouter);
app.use(
  "/materials/associated-materials-filters",
  associatedMaterialsFiltersRouter
);
app.use("/materials/search-materials", searchMaterialsRouter);
app.use("/materials/filter-added-materials", filterAddedMaterialsRouter);
app.use("/materials/add-material", addMaterialRouter);
app.use("/materials", addMaterialToCarbonDbTableRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
