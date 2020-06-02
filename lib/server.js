'use strict';
const express = require('express');
const app = express();
const timestamp = require('../lib/middleware/timestamp.js');
const logger = require('../lib/middleware/logger.js');
const notFoundHandler = require('../lib/middleware/404.js');
const errorHandler = require('../lib/middleware/500.js');
app.use(express.json());
app.use(timestamp);
app.use(logger);



let dbProducts = [];


app.post('/api/v1/products', (req, res) => {
  let { category, name, display_name, description } = req.body;
  let record = { category, name, display_name, description };
  record.id = dbProducts.length + 1;
  dbProducts.push(record);
  res.json(record);
});


app.put('/api/v1/products/:id', (req, res) => {
  let { category, name, display_name, description } = req.body;
  let record = { category, name, display_name, description };
  const id = req.params.id;
  dbProducts.forEach((val,idx) => {
    if (val.id == id) {
      record.id = id;
      dbProducts[idx] = record;
    }
  });
  res.json(record);
});



app.delete('/api/v1/products/:id', (req, res) => {
  const id = req.params.id;
  dbProducts =  dbProducts.filter((val) => {
    return  (val.id != id) ? true : false;
  });
  res.json({});
});

app.get('/api/v1/products', (req, res) => {
  const count = dbProducts.length;
  const result = dbProducts;
  res.json({ count, result });
});


app.get('/api/v1/products/:id', (req, res) => {
  const id = req.params.id;
  let result;
  dbProducts.forEach(val=>{
    if (val.id == id) {
      result = val;
    }
  });
  res.json( result );
});


let dbcategory = [];


app.post('/api/v1/categories', (req, res) => {
  let { category, name, display_name, description } = req.body;
  let record = { category, name, display_name, description };
  record.id = dbcategory.length + 1;
  dbcategory.push(record);
  res.json(record);
});


app.put('/api/v1/categories/:id', (req, res) => {
  let { category, name, display_name, description } = req.body;
  let record = { category, name, display_name, description };
  const id = req.params.id;
  dbcategory.forEach((val,idx) => {
    if (val.id == id) {
      record.id = id;
      dbcategory[idx] = record;
    }
  });
  res.json(record);
});



app.delete('/api/v1/categories/:id', (req, res) => {
  const id = req.params.id;
  dbcategory =  dbcategory.filter((val) => {
    return  (val.id != id) ? true : false;
  });
  res.json({});
});


app.get('/api/v1/categories', (req, res) => {
  const count = dbcategory.length;
  const result = dbcategory;
  res.json({ count, result });
});



app.get('/api/v1/categories/:id', (req, res) => {
  const id = req.params.id;
  let result;
  dbcategory.forEach(val=>{
    if (val.id == id) {
      result = val;
    }
  });
  res.json( result );
});

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