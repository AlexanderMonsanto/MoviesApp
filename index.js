var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static(__dirname + "/public"))

app.set("view engine", 'ejs');

app.get('/',function(req, res){
  res.render('moviesite/index')

})

app.get('/search',function(req, res){
  var request = require('request');

request('http://www.omdbapi.com/?s=' + req.query.pelicula, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log(info);
    res.render("moviesite/search", info);
  }
})
})

app.get('/moviesite/:imdbID', function(req, res){
  var ID = req.params.imdbID
  request('http://www.omdbapi.com/?i=' + ID + '&plot=full', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log(info);
    res.render("moviesite/imdb", info);
  } else { alert:"Not a Movie"}
})
})

app.listen(process.env.PORT || 3000);
