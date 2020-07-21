const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (err) throw err;
    console.log('MongDB connection');
  }
);

const routes = require('./backend/routes/index');
app.use(routes);

if (process.env.NODE_ENV === 'product') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log('Server is Started Port: ' + port);
});
