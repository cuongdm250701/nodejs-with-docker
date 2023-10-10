const express = require('express');
const connectDB = require('./config/connect-db');

const app = express();

const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

connectDB();

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
