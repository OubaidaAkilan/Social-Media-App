'use strict';
const {
  express,
  dotenv,
  morgan,
  cookieParser,
  cors,
} = require('./ourPackages.js');

const accountRoutes = require('./Account/accountRoutes.js');
const userRoutes = require('./User/userRoutes.js');
const postRoutes = require('./Post/postRoutes.js');
const storyRoutes = require('./Story/storyRoutes.js');
const commentRoutes = require('./Comment/commentRoutes.js');
const followerRoutes = require('./Follower/followerRoutes.js');
const likeRoutes = require('./Like/likeRoutes.js');
const uploadRoutes = require('./Image/uploadImageRoutes.js');
const globalErorrHandlingMidleware = require('./ErrorHandler/globalErorrHandlingMidleware.js');
const ApiError = require('./ErrorHandler/ApiError.js');

//===== DB
const dbConnection = require('./config/database.js');

//==== Enviroment
dotenv.config({ path: 'config.env' });

//==== Error handling

// express app
const app = express();

// Middlewares

// we parse the data within body request from string into json
app.set('trust proxy', 1);
app.use(cookieParser());
app.use(express.json());
//===== CORS
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

if (process.env.NODE_ENV === 'development') {
  //==== Check The Mode Of Enviroments
  app.use(morgan('tiny'));
  console.log(` Mode : ${process.env.NODE_ENV} `);
}

// Mount Routes
app.get('/', (req, res) => {
  res.send('Test test the server 😁');
});
app.use('/api/v1/account', accountRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/story', storyRoutes);
app.use('/api/v1/comment', commentRoutes);
app.use('/api/v1/follower', followerRoutes);
app.use('/api/v1/like', likeRoutes);
app.use('/api/v1/upload', uploadRoutes);

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
// @desc Handle unhandled routes and send error into Error handling middleware.
app.all('*', (req, res, next) => {
  // Create error and send it to global error handling middleware.
  next(new ApiError(`Cant find this rout ${req.originalUrl}`, 400));
});

// Global error handling middleware, you must use it after mount routs
app.use(globalErorrHandlingMidleware);

// @desc  Handle errors outside express unhandle rejections.
process.on('unhandledRejection', (err) => {
  console.error(`unhandledRejection : ${err.name} | ${err.message} `);
  server.close(() => {
    console.error('Shutting down .....');
    process.exit(1); //to stop app.
  });
});
