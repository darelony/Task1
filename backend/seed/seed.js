const sequelize = require("../database");
const Veterinar = require("../models/Veterinar");
const Ljubimac = require("../models/Ljubimac");

async function seed() {
  await sequelize.sync({ force: true });

  const vets = await Veterinar.bulkCreate([
    { ime: "Marko", prezime: "Petrovic", specijalnost: "Opšta veterina" },
    { ime: "Ana", prezime: "Savic", specijalnost: "Egzotične životinje" },
    { ime: "Luka", prezime: "Jovanovic", specijalnost: "Hirurg" }
  ]);

  await Ljubimac.bulkCreate([
    { ime: "Maza", vlasnik: "Petar", datumRodjenja: "2020-05-01", vakcinisan: true, slikaUrl: "", veterinarId: vets[0].id },
    { ime: "Rex", vlasnik: "Jovan", datumRodjenja: "2019-03-10", vakcinisan: true, slikaUrl: "", veterinarId: vets[1].id },
    { ime: "Bela", vlasnik: "Ivana", datumRodjenja: "2021-11-02", vakcinisan: false, slikaUrl: "", veterinarId: vets[2].id },
    { ime: "Cica", vlasnik: "Milan", datumRodjenja: "2023-02-20", vakcinisan: true, slikaUrl: "", veterinarId: vets[0].id },
    { ime: "Leo", vlasnik: "Sara", datumRodjenja: "2020-08-18", vakcinisan: false, slikaUrl: "", veterinarId: vets[2].id },
    { ime: "Dona", vlasnik: "Tamara", datumRodjenja: "2018-01-14", vakcinisan: true, slikaUrl: "", veterinarId: vets[1].id },
    { ime: "Simba", vlasnik: "Vladimir", datumRodjenja: "2022-07-09", vakcinisan: true, slikaUrl: "", veterinarId: vets[2].id },
    { ime: "Milo", vlasnik: "Katarina", datumRodjenja: "2017-04-25", vakcinisan: true, slikaUrl: "", veterinarId: vets[0].id },
    { ime: "Nera", vlasnik: "Teodora", datumRodjenja: "2019-12-30", vakcinisan: false, slikaUrl: "", veterinarId: vets[1].id },
    { ime: "Toby", vlasnik: "Ognjen", datumRodjenja: "2021-09-11", vakcinisan: true, slikaUrl: "", veterinarId: vets[0].id }
  ]);

  console.log("Seed komplet!");
  process.exit();
}

seed();
