// require('dotenv').config();
// const open = require('open');
const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running

// console.log("__dirname", process.env)

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
// app.get('/ping', function (req, res) {
//   return res.send('pong');
// });

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'index.html'))
});


app.listen(port);

if (port === 8080) {
  // open(`http://localhost:${port}`);
  console.log(`App running at http://localhost:${port}`);}