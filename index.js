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

//Will render comments data
app.get('/favorites/:id/comments',function(req, res){
  var movid = req.params.id
  // db.wishlist.findAll({ where: {id: req.params.id}}).then(function (commentdata){
    db.comment_table.findAll({ where: {wishlistId: req.params.id}}).then(function(commentdata){
    // movieData.createComment_table({comment:req.body.comment}).then(function(theComment){
      // res.send(commentdata)
    // })
  res.render('comments',{commentdata:commentdata,movid:movid})
  // res.send({commentdata:commentdata,movid:movid})
})

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
  db.wishlist.findAll().done(function(err, data){
    res.render('favorites',{wishlist:data})
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
//   db.wishlist.findOrCreate({where: req.body}).then(function (err, data, created){
//     res.redirect('/favorites');
//   })
// })

  app.post('/favorites',function(req,res){
    db.wishlist.findOrCreate({where: req.body}).spread(function (data, created){
      res.send({data:data,created:created});
    })
  })

//Technically Incorrect Method of Deletion. Causes Issues with Backbone.js
// app.post('/delete',function(req, res){
//   db.wishlist.find({ where: {movie_imbdID: req.body.movie_imbdID }}).then(function(data){
//   data.destroy().success(function() {
//   res.redirect('favorites')
//   })
// })
// })

//Save comment data
app.post('/favorites/comment/save',function(req, res){
  var idd = req.body.wishlistId;
  db.comment_table.findOrCreate({where: req.body}).spread(function (commentdata, created){
    // res.render('comments',{commentdata:commentdata, created:created,movid:idd})
    res.redirect('/favorites/'+idd+'/comments');
  }).catch(function(error){
    res.send({error:error.errors[0]})
    // res.redirect('/favorites/'+idd+'/comments',{error:error.errors[0]});

  })
})

app.delete('/favorites/:id',function(req, res){
  // res.send(req.params);
  db.wishlist.find({ where: {id: req.params.id}}).then(function(data){
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
