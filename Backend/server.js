'use strict';
const express = require('express');
const dotenv = require('dotenv');

//===== DB
const dbConnection = require('./config/database');

//==== Enviroment
dotenv.config({ path: 'config.env' });

//==== Error handling

// express app
const app = express();

// Middlewares

// Mount Routes
app.get('/', (req, res) => {
  res.send('Test test the server 😁');
});

// ==== Connection with server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port  ${PORT}`);
  //==== Connect the DB
  dbConnection();
});
