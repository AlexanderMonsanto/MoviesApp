var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");
var db = require('./models');

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static(__dirname + "/public"))

app.set("view engine", 'ejs');

app.get('/',function(req, res){
  res.render('moviesite/index')

})

app.get('/search',function(req, res){
  request('http://www.omdbapi.com/?s=' + req.query.pelicula, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    var info = JSON.parse(body);
    console.log(info);
    res.render("moviesite/search", info);
  } else { res.send("Selecionar una pelicula")}
})
})

app.get('/moviesite/favorites',function(req, res){
  db.Wishlist.findAll().done(function(err, data){
    res.render('moviesite/favorites',{Wishlist:data})
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

app.post('/save',function(req, res){
  db.Wishlist.findOrCreate({where: req.body}).done(function (err, data, created){
    res.render('moviesite/save',{'title':data.movie_title,'ID':data.movie_imbdID,'Poster':data.movie_image,'Year':data.movie_year});
  })
})

app.post('/delete',function(req, res){
  // res.send(req.body);
  db.Wishlist.find({ where: {movie_imbdID: req.body.movie_imbdID }}).then(function(data){
  data.destroy().success(function() {
  // res.send(data);
  // return;
  res.redirect('/moviesite/favorites')
  })
})
})

app.listen(process.env.PORT || 3000);
