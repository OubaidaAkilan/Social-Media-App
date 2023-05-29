'use strict';
const { express, dotenv, bodyParser } = require('./ourPackages.js');
const accountRoutes = require('./Account/accountRoutes.js');
//===== DB
const dbConnection = require('./config/database.js');

//==== Enviroment
dotenv.config({ path: 'config.env' });

//==== Error handling

// express app
const app = express();

// Middlewares
app.use(bodyParser.json());

// Mount Routes
app.get('/', (req, res) => {
  res.send('Test test the server 😁');
});
app.use('/api/v1/account', accountRoutes);

//==== Connect the DB
dbConnection()
  .then(() => {
    // ==== Connection with server
    const PORT = process.env.PORT || 8000;

    const server = app.listen(PORT, () => {
      console.log(`Server running on port  ${PORT}`);
    });
  })
  .catch((e) => {
    console.error('Failed to connect to the database:', error);
  });

//===Error Handling

app.use(globalErorrHandlingMidleware); // Global error handling middleware, you must use it after mount routs

// @desc  Handle errors outside express unhandle rejections.
process.on('unhandledRejection', (err) => {
  console.error(`unhandledRejection : ${err.name} | ${err.message} `);
  server.close(() => {
    console.error('Shutting down .....');
    process.exit(1); //to stop app.
  });
});
