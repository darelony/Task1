// models/Ljubimac.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Veterinar = require('./Veterinar');

const Ljubimac = sequelize.define('Ljubimac', {
  ime: { type: DataTypes.STRING, allowNull: false },
  vlasnik: { type: DataTypes.STRING, allowNull: false },
  datumRodjenja: { type: DataTypes.DATEONLY, allowNull: false },
  vakcinisan: { type: DataTypes.BOOLEAN, defaultValue: false },
  tip: { type: DataTypes.STRING, allowNull: true },
  slikaUrl: { type: DataTypes.STRING, allowNull: true },
  // novo polje za aktivan/neaktivan status
  aktivan: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
  tableName: 'ljubimci',
  underscored: true
});

// FK kolona VeterinarId (ostaje isto da bi seed-ovi radili)
Ljubimac.belongsTo(Veterinar, { foreignKey: 'VeterinarId' });
Veterinar.hasMany(Ljubimac, { foreignKey: 'VeterinarId' });

module.exports = Ljubimac;
