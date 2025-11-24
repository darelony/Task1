const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Veterinar = sequelize.define("Veterinar", {
  ime: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prezime: {
    type: DataTypes.STRING,
    allowNull: false
  },
  specijalnost: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Veterinar;
