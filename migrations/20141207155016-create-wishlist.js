"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Wishlists", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      movie_title: {
        type: DataTypes.STRING
      },
      movie_image: {
        type: DataTypes.STRING
      },
      movie_imbdID: {
        type: DataTypes.STRING
      },
      movie_year: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("Wishlists").done(done);
  }
};
