"use strict";

module.exports = function(sequelize, DataTypes) {
  var comment_table = sequelize.define("comment_table", {
    comment: {
      type: DataTypes.TEXT,
      allow: true,
      defaultValue: 'Dare to comment or selsoads;lfhas;df',
      validate: {
        len: {
          args:[20 , 200],
          msg: "Dangit! Your comment was not in between 20 and 200 characters"
        }
      }
      },


    wishlistId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.comment_table.belongsTo(models.wishlist)
      }
    }
  });



  return comment_table;
};

