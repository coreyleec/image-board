const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running

console.log("__dirname", __dirname, favicon, favicon.ico, app)

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
// app.get('/ping', function (req, res) {
//   return res.send('pong');
// });

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("*", (req, res) => {
  let url = path.join(__dirname, '../client/build', 'index.html');
  if (!url.startsWith('/app/')) // since we're on local windows
    url = url.substring(1);
  res.sendFile(url);
});


app.listen(port);