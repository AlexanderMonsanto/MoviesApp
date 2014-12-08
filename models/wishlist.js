"use strict";

module.exports = function(sequelize, DataTypes) {
  var Wishlist = sequelize.define("Wishlist", {
    movie_title: DataTypes.STRING,
    movie_image: DataTypes.STRING,
    movie_imbdID: DataTypes.STRING,
    movie_year: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Wishlist;
};
