# Application Endpoints

This application has several endpoints that fulfill different functionalities. They are as follows:

## Materials

- **POST /materials:** This endpoint posts requests to the `CarbonFactorData` table.

- **POST /materials/add-material:** This endpoint posts requests to the `Materials` table.

- **GET /filter-added-materials:** This endpoint gets data from the `Materials` table based on applied filters.

- **GET /search-added-materials:** This endpoint retrieves data from the `Materials` table based on a search query.

- **GET /associated-materials-filters:** This endpoint retrieves the filters based on the previously applied filters from the `Materials` table.

- **GET /added-materials-filters:** This endpoint gets the distinct columns data from the `Materials` table.

- **GET /added-materials:** This endpoint retrieves all the data from the `Materials` table.

## Documents

- **POST /documents/add-document:** This endpoint posts requests to the `Documents` table.

- **GET /documents:** This endpoint gets the latest data from the `Documents` table.

## Units

- **GET /units:** This endpoint retrieves all the data from the `Units` table.

## Material Requests

- **GET /materials/request:** This endpoint retrieves data based on the user from the `CarbonFactorData` table.
