const express = require('express');
const cors = require('cors');
const path = require('path');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));


// const cloud_uri = process.env.ATLAS_URI;
//const uri = "mongodb://localhost:27017/users";
// mongoose.connect(cloud_uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
//     );
// console.log('connected to cloud');

// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// })

const usersRouter = require('./routes/route');
const { default: axios } = require('axios');
app.use('/nse', usersRouter);
 
app.listen(port, () => 
    console.log('Server is running on port:', port)
);