const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Veterinar = require("./Veterinar");

const Ljubimac = sequelize.define("Ljubimac", {
  ime: {
    type: DataTypes.STRING,
    allowNull: false
  },
  vlasnik: {
    type: DataTypes.STRING,
    allowNull: false
  },
  datumRodjenja: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  vakcinisan: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  slikaUrl: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

// Veza 1 veterinar → više ljubimaca
Veterinar.hasMany(Ljubimac, { foreignKey: "veterinarId" });
Ljubimac.belongsTo(Veterinar, { foreignKey: "veterinarId" });

module.exports = Ljubimac;
