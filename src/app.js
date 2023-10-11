const express = require('express');
const connect_db = require('./config/connect-db');

const app = express();

const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!');
});


connect_db();

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
