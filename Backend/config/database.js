'use strict';
const mongoose = require('mongoose');

const dbConnection = async () => {
  await mongoose
    .connect(process.env.DB_URI, { dbName: process.env.DB_NAME })
    .then((conn) => {
      console.log('Database connected :' + conn.connection.host);
    });
  // Handle errors outside express unhandle rejections
  /* .catch( ( err ) => {
        console.log( `Faild to connect with database : ${ err }` );
        process.exit( 1 );
    } ); */
};

module.exports = dbConnection;
