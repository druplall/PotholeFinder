const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = 3000;
const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
