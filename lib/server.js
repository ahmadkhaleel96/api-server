'use strict';

const express = require('express');
const timestamp = require('../lib/middleware/timestamp.js');
const logRequest = require('../lib/middleware/logger.js');
const errorHandler = require('../lib/middleware/500.js');
const notFoundHandler = require('../lib/middleware/404.js');


const app = express();

// global middleware
app.use(express.json()); //body-parser to add body to the req
app.use(logRequest);
app.use(timestamp);

let db_products = [];

// query string

//Products

app.post('/products', timestamp, (req, res) => {
  const {category, name, display_name, description} = req.body;
  const record = {category, name, display_name, description};
  db_products.push(record);
  res.json(record);
});

app.get('/products', timestamp, logRequest, (req, res) => {
  const count = db_products.length;
  const result = db_products;
  res.json({count,result});
});

//params
app.get('/products/:p_id', timestamp, logRequest, (req, res) => {
  console.log(req.params);
  const index = req.params.p_id;
  res.json(db_products[index]);
});

app.put('/products/:p_id', timestamp, logRequest, (req, res) => {
  const {category, name, display_name, description} = req.body;
  const record = {category, name, display_name, description};
  const index = req.params.p_id;
  db_products[index] = record;
  res.json(db_products[index]);
});

app.patch('/products/:p_id', timestamp, logRequest, (req, res) => {
  const {category, name, display_name, description} = req.body;
  const record = {category, name, display_name, description};
  const index = req.params.p_id;
  db_products[index] = record;
  res.json(db_products[index]);
});

app.delete('/products/:p_id', timestamp, logRequest, (req, res) => {
  const index = req.params.p_id;
  db_products.splice(index,1);
  res.json('Deletes the record of product');
});

//Categories

let db_categories = [];

app.post('/categories', timestamp, logRequest, (req, res) => {
  const {name, display_name, description} = req.body;
  const record = {name, display_name, description};
  db_categories.push(record);
  res.json(record);
});

app.get('/categories', timestamp, logRequest, (req, res) => {
  const count = db_categories.length;
  const result = db_categories;
  res.json({count,result});
});

//params
app.get('/categories/:c_id', timestamp, logRequest, (req, res) => {
  console.log(req.params);
  const index = req.params.c_id;
  res.json(db_categories[index]);
});

app.put('/categories/:c_id', timestamp, logRequest, (req, res) => {
  const {category, name, display_name, description} = req.body;
  const record = {category, name, display_name, description};
  const index = req.params.c_id;
  db_categories[index] = record;
  res.json(db_categories[index]);
});

app.patch('/categories/:c_id', timestamp, logRequest, (req, res) => {
  const {name, display_name, description} = req.body;
  const record = { name, display_name, description};
  const index = req.params.c_id;
  db_categories[index] = record;
  res.json(db_categories[index]);
});

app.delete('/categories/:c_id', timestamp, logRequest, (req, res) => {
  const index = req.params.c_id;
  db_categories.splice(index,1);
  res.json('Deletes the record of categories');
});


app.use('*', timestamp, notFoundHandler, logRequest);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    const PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};