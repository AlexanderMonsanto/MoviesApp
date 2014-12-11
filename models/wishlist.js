"use strict";

module.exports = function(sequelize, DataTypes) {
  var wishlist = sequelize.define("wishlist", {
    movie_title: DataTypes.STRING,
    movie_image: DataTypes.STRING,
    movie_imbdID: DataTypes.STRING,
    movie_year: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.wishlist.hasMany(models.comment_table)
      }
    }
  });

  return wishlist;
};
