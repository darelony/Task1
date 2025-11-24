const express = require("express");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
app.use(cors());
app.use(express.json());

// Baza
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "petclinic.sqlite"
});

// Veterinar model
const Veterinar = sequelize.define("Veterinar", {
  ime: DataTypes.STRING,
  prezime: DataTypes.STRING,
  specijalnost: DataTypes.STRING
});

// Ljubimac model
const Ljubimac = sequelize.define("Ljubimac", {
  ime: DataTypes.STRING,
  vlasnik: DataTypes.STRING,
  datumRodjenja: DataTypes.STRING,
  vakcinisan: DataTypes.BOOLEAN,
  tip: DataTypes.STRING,
  slikaUrl: DataTypes.STRING
});

Ljubimac.belongsTo(Veterinar);
Veterinar.hasMany(Ljubimac);

// Routes
app.get("/vets", async (req, res) => {
  const vets = await Veterinar.findAll();
  res.json(vets);
});

app.get("/pets", async (req, res) => {
  const pets = await Ljubimac.findAll({ include: Veterinar });
  res.json(pets);
});

app.post("/pets", async (req, res) => {
  try {
    const { ime, vlasnik, datumRodjenja, vakcinisan, tip, VeterinarId } = req.body;

    // Odabir slike na osnovu tipa
    let slikaUrl = "/images/default.jpg";
    if(tip === "macka") slikaUrl = "/images/cat.jpg";
    if(tip === "pas") slikaUrl = "/images/dog.jpg";
    if(tip === "zec") slikaUrl = "/images/rabbit.jpg";
    if(tip === "hrcak") slikaUrl = "/images/hamster.jpg";

    const pet = await Ljubimac.create({ ime, vlasnik, datumRodjenja, vakcinisan, tip, slikaUrl, VeterinarId });
    res.status(201).json(pet);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greška pri dodavanju ljubimca" });
  }
});

// Start server i inicijalni podaci
sequelize.sync({ force: true }).then(async () => {
  const vets = await Veterinar.bulkCreate([
    { ime: "Marko", prezime: "Markovic", specijalnost: "Psi" },
    { ime: "Ana", prezime: "Anic", specijalnost: "Macke" },
    { ime: "Ivan", prezime: "Ivanovic", specijalnost: "Mali ljubimci" }
  ]);

  await Ljubimac.bulkCreate([
  { ime: "Rex", vlasnik: "Ana", datumRodjenja: "2020-05-12", vakcinisan: true, tip: "pas", slikaUrl: "/images/dog.jpg", VeterinarId: vets[0].id },
  { ime: "Maca", vlasnik: "Petar", datumRodjenja: "2019-11-23", vakcinisan: false, tip: "macka", slikaUrl: "/images/cat.jpg", VeterinarId: vets[1].id },
  { ime: "Luna", vlasnik: "Milan", datumRodjenja: "2021-01-30", vakcinisan: true, tip: "macka", slikaUrl: "/images/cat.jpg", VeterinarId: vets[2].id },
  { ime: "Max", vlasnik: "Ivana", datumRodjenja: "2020-07-15", vakcinisan: true, tip: "pas", slikaUrl: "/images/dog.jpg", VeterinarId: vets[0].id },
  { ime: "Cuki", vlasnik: "Marko", datumRodjenja: "2018-09-05", vakcinisan: false, tip: "zec", slikaUrl: "/images/rabbit.jpg", VeterinarId: vets[1].id },
  { ime: "Bubi", vlasnik: "Tanja", datumRodjenja: "2022-02-10", vakcinisan: true, tip: "hrcak", slikaUrl: "/images/hamster.jpg", VeterinarId: vets[2].id },
  { ime: "Fifi", vlasnik: "Nikola", datumRodjenja: "2019-12-01", vakcinisan: false, tip: "macka", slikaUrl: "/images/cat.jpg", VeterinarId: vets[0].id },
  { ime: "Leo", vlasnik: "Jelena", datumRodjenja: "2021-06-20", vakcinisan: true, tip: "pas", slikaUrl: "/images/dog.jpg", VeterinarId: vets[1].id },
  { ime: "Mimi", vlasnik: "Ana", datumRodjenja: "2020-03-15", vakcinisan: true, tip: "zec", slikaUrl: "/images/rabbit.jpg", VeterinarId: vets[2].id },
  { ime: "Riki", vlasnik: "Petar", datumRodjenja: "2021-08-08", vakcinisan: false, tip: "hrcak", slikaUrl: "/images/hamster.jpg", VeterinarId: vets[0].id }
]);


  app.listen(5000, () => console.log("Server radi na portu 5000"));
});
