const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "petclinic.sqlite"
});

// Veterinar model
const Veterinar = sequelize.define("Veterinar", {
  ime: { type: DataTypes.STRING, allowNull: false },
  prezime: { type: DataTypes.STRING, allowNull: false },
  specijalnost: { type: DataTypes.STRING }
});

// Ljubimac model
const Ljubimac = sequelize.define("Ljubimac", {
  ime: { type: DataTypes.STRING, allowNull: false },
  vlasnik: { type: DataTypes.STRING, allowNull: false },
  datumRodjenja: { type: DataTypes.STRING },
  vakcinisan: { type: DataTypes.BOOLEAN, defaultValue: false },
  slikaUrl: { type: DataTypes.STRING }
});

// Veza: jedan veterinar ima više ljubimaca
Veterinar.hasMany(Ljubimac, { as: "ljubimci" });
Ljubimac.belongsTo(Veterinar);

module.exports = { sequelize, Veterinar, Ljubimac };
