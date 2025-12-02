// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const sequelize = require('./database');
const Veterinar = require('./models/Veterinar');
const Ljubimac = require('./models/Ljubimac');



const app = express();
app.use(cors());
app.use(express.json());

// GET veterinari
app.get('/vets', async (req, res) => {
  try {
    const vets = await Veterinar.findAll();
    res.json(vets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška' });
  }
});

// GET ljubimci (sa veterinarom)
app.get('/pets', async (req, res) => {
  try {
    const pets = await Ljubimac.findAll({ include: Veterinar });
    res.json(pets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška' });
  }
});

// POST dodaj ljubimca
app.post('/pets', async (req, res) => {
  try {
    const { ime, vlasnik, datumRodjenja, vakcinisan, tip, VeterinarId } = req.body;

    let slikaUrl = '/images/default.jpg';
    if (tip === 'macka') slikaUrl = '/images/cat.jpg';
    if (tip === 'pas') slikaUrl = '/images/dog.jpg';
    if (tip === 'zec') slikaUrl = '/images/rabbit.jpg';
    if (tip === 'hrcak') slikaUrl = '/images/hamster.jpg';

    const pet = await Ljubimac.create({
      ime, vlasnik, datumRodjenja, vakcinisan, tip, slikaUrl, VeterinarId
    });

    res.status(201).json(pet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška pri dodavanju ljubimca' });
  }
});

// DELETE ljubimca (brisanje)
app.delete('/pets/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Ljubimac.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: 'Ljubimac nije pronađen' });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška pri brisanju' });
  }
});

// Toggle active/inactive
app.patch('/pets/:id/status', async (req, res) => {
  try {
    const id = req.params.id;
    const pet = await Ljubimac.findByPk(id);
    if (!pet) return res.status(404).json({ error: 'Nije pronađen ljubimac' });

    pet.aktivan = !pet.aktivan;
    await pet.save();
    res.json(pet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška pri promeni statusa' });
  }
});

// Vakcinacija (ako već vakcinisan -> 400 i error flag)
app.patch('/pets/:id/vaccinate', async (req, res) => {
  try {
    const id = req.params.id;
    const pet = await Ljubimac.findByPk(id);
    if (!pet) return res.status(404).json({ error: 'Nije pronađen ljubimac' });

    if (pet.vakcinisan) {
      return res.status(400).json({ error: 'VEĆ_VAKCINISAN', message: 'Ljubimac je već vakcinisan' });
    }

    pet.vakcinisan = true;
    await pet.save();
    res.json(pet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška pri vakcinaciji' });
  }
});


// Start server i seed (seed se radi SAMO ako nema veterinara)
async function start() {
  try {
    await sequelize.authenticate();
    console.log('DB connected');

    // Kreira tabele ako ne postoje (NE briše podatke)
    await sequelize.sync(); // za izmene modela mozes koristiti sync({ alter: true })

    const vetsCount = await Veterinar.count();
    if (vetsCount === 0) {
      const vets = await Veterinar.bulkCreate([
        { ime: 'Marko', prezime: 'Markovic', specijalnost: 'Psi' },
        { ime: 'Ana', prezime: 'Anic', specijalnost: 'Macke' },
        { ime: 'Ivan', prezime: 'Ivanovic', specijalnost: 'Mali ljubimci' }
      ], { returning: true });

      await Ljubimac.bulkCreate([
        { ime: 'Rex', vlasnik: 'Ana', datumRodjenja: '2020-05-12', vakcinisan: true, tip: 'pas', slikaUrl: '/images/dog.jpg', VeterinarId: vets[0].id },
        { ime: 'Maca', vlasnik: 'Petar', datumRodjenja: '2019-11-23', vakcinisan: false, tip: 'macka', slikaUrl: '/images/cat.jpg', VeterinarId: vets[1].id },
        { ime: 'Luna', vlasnik: 'Milan', datumRodjenja: '2021-01-30', vakcinisan: true, tip: 'macka', slikaUrl: '/images/cat.jpg', VeterinarId: vets[2].id },
        { ime: 'Max', vlasnik: 'Ivana', datumRodjenja: '2020-07-15', vakcinisan: true, tip: 'pas', slikaUrl: '/images/dog.jpg', VeterinarId: vets[0].id },
        { ime: 'Cuki', vlasnik: 'Marko', datumRodjenja: '2018-09-05', vakcinisan: false, tip: 'zec', slikaUrl: '/images/rabbit.jpg', VeterinarId: vets[1].id },
        { ime: 'Bubi', vlasnik: 'Tanja', datumRodjenja: '2022-02-10', vakcinisan: true, tip: 'hrcak', slikaUrl: '/images/hamster.jpg', VeterinarId: vets[2].id },
        { ime: 'Fifi', vlasnik: 'Nikola', datumRodjenja: '2019-12-01', vakcinisan: false, tip: 'macka', slikaUrl: '/images/cat.jpg', VeterinarId: vets[0].id },
        { ime: 'Leo', vlasnik: 'Jelena', datumRodjenja: '2021-06-20', vakcinisan: true, tip: 'pas', slikaUrl: '/images/dog.jpg', VeterinarId: vets[1].id },
        { ime: 'Mimi', vlasnik: 'Ana', datumRodjenja: '2020-03-15', vakcinisan: true, tip: 'zec', slikaUrl: '/images/rabbit.jpg', VeterinarId: vets[2].id },
        { ime: 'Riki', vlasnik: 'Petar', datumRodjenja: '2021-08-08', vakcinisan: false, tip: 'hrcak', slikaUrl: '/images/hamster.jpg', VeterinarId: vets[0].id }
      ]);

      console.log('Seed podaci dodati');
    } else {
      console.log('Seed preskocen - veterinari postoje');
    }

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server radi na portu ${PORT}`));
  } catch (err) {
    console.error('Greska pri startu:', err);
    process.exit(1);
  }
}

start();
