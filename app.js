const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const controllers = require('./app/controllers');

require('dotenv').config();

const { PORT } = process.env;
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
    console.log('Running on port', PORT);
  } else {
    console.log('error: ', err.messsage);
  }
});
