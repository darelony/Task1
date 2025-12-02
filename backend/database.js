// database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'petclinic.sqlite',
  logging: false, // stavi true ako zelis da vidis SQL u konzoli
});

module.exports = sequelize;
