var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");
var db = require('./models');

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static(__dirname + "/public"))

app.set("view engine", 'ejs');

app.get('/',function(req, res){
  res.render('index')

})

app.get('/sobre',function(req, res){
  res.render('sobre')
})

app.get('/search',function(req, res){
  request('http://www.omdbapi.com/?s=' + req.query.pelicula, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    var info = JSON.parse(body);
    console.log(info);
    res.render("search", info || []);
  }
})
})

app.get('/favorites',function(req, res){
  db.Wishlist.findAll().done(function(err, data){
    res.render('favorites',{Wishlist:data})
  })
})

app.get('/:imdbID', function(req, res){
  var ID = req.params.imdbID
  request('http://www.omdbapi.com/?i=' + ID + '&plot=full', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log(info);
    res.render("imdb", info);
  }
})
})

// app.post('/save',function(req, res){
//   db.Wishlist.findOrCreate({where: req.body}).then(function (err, data, created){
//     res.redirect('/favorites');
//   })
// })

  app.post('/favorites',function(req,res){
    db.Wishlist.findOrCreate({where: req.body}).spread(function (data, created){
      res.send({data:data,created:created});
    })
  })

//Technically Incorrect Method of Deletion. Causes Issues with Backbone.js
// app.post('/delete',function(req, res){
//   db.Wishlist.find({ where: {movie_imbdID: req.body.movie_imbdID }}).then(function(data){
//   data.destroy().success(function() {
//   res.redirect('favorites')
//   })
// })
// })

app.delete('/favorites/:id',function(req, res){
  // res.send(req.params);
  db.Wishlist.find({ where: {id: req.params.id}}).then(function(data){
    if (data){
      data.destroy().success(function(deldata){
        res.send({result:deldata})
      })
    }else{
       res.send({result:false})
    }
  })
})

app.listen(process.env.PORT || 3000);
