
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});