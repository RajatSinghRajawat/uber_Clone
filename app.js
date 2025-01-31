const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const databaseConfig = require('./src/config/uberConfig');
const router = require('./src/routes/uberRoutes');
const cookieParser = require('cookie-parser');
const captainrouter = require('./src/routes/captainRoutes');
const Mrouter = require('./src/routes/mapsRoutes');
const app = express();
app.use(cors());
databaseConfig()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(router);
app.use('/captains',captainrouter);
app.use('/maps' , Mrouter)
// app.use((err, req, res) => {
//     console.error(err.stack);
//     res.status(500).send('Something went wrong!');
// });

module.exports = app;

