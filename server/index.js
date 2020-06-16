const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const server = http.createServer(app);
const dotenv = require('dotenv');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

import routers from './routers/storage.router'
dotenv.config()
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next();
});
app.use(cors('*'));

app.use('/',upload.any(),routers)

server.listen(process.env.PORT);
module.exports = app;