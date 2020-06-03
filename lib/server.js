'use strict';
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const timestamp = require('../lib/middleware/timestamp.js');
const logger = require('../lib/middleware/logger.js');
const notFoundHandler = require('../lib/middleware/404.js');
const errorHandler = require('../lib/middleware/500.js');
const categoryRoute = require('../lib/routes/categories.js');
const productsRoute = require('../lib/routes/products.js');

app.use(express.json());
app.use(timestamp);
app.use(logger);


app.use(morgan('dev'));
app.use(cors());

app.use('/api/v1', categoryRoute);
app.use('/api/v1', productsRoute);



app.use('*', notFoundHandler);
app.use(errorHandler);
module.exports = {
  server: app,
  start: (port) => {
    const PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`),
    );
  },
}; 