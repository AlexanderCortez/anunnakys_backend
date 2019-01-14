const express = require('express');
require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const controllers = require('./controllers');


const { PORT, NODE_ENV } = process.env;
const config = require('./config/index')(NODE_ENV);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', controllers);
app.use(express.static(path.join(__dirname, 'client')));
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/index.html`));
});
app.listen(PORT, (err) => {
  if (!err) {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.database, {
      useCreateIndex: true,
      useNewUrlParser: true,
    });
    console.log('Running on port', PORT);
  } else {
    console.log('error: ', err.messsage);
  }
});
