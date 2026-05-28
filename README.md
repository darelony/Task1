# 🐾 Pet Management System (Task 1)

Ovo je kompletna **full-stack** web aplikacija za upravljanje evidencijom kućnih ljubimaca i veterinara unutar klinike. Projekat se sastoji od **Node.js/Express** bekenda koji koristi **Sequelize ORM** za komunikaciju sa bazom podataka i **React** fontenda za interaktivan prikaz i upravljanje podacima.

---

## 🚀 Funkcionalnosti (Features)

### 🖥️ Frontend (React)
- **Dashboard sa karticama (`PetCards`)**: Vizuelni prikaz svih ljubimaca sa osnovnim informacijama (ime, vlasnik, tip, dodijeljeni veterinar, status vakcinacije).
- **Napredno filtriranje i pretraga**: Mogućnost pretrage ljubimaca uživo po imenu, kao i filtriranje prema tipu životinje (mačka, pas, zec, hrčak) ili izabranom veterinaru.
- **Upravljanje statusom (Aktivan/Neaktivan)**: Brza promjena statusa ljubimca. Neaktivni ljubimci se vizuelno zamućuju/označavaju u interfejsu (klasa `.inactive`).
- **Sistem vakcinacije**: Mogućnost vakcinacije jednim klikom (ikona 💉). Dugme se automatski onemogućava ako je ljubimac već vakcinisan, uz prikaz odgovarajućih obavještenja sa servera.
- **Dodavanje novih ljubimaca (`AddPetForm`)**: Formular sa validacijom koji povlači listu dostupnih veterinara sa bekenda i omogućava unos novog ljubimca.
- **Tabelarni prikaz (`PetTable`)**: Alternativna komponenta za tabelarni prikaz podataka sa svim akcijama.

### ⚙️ Backend (Node.js & Express)
- **REST API**: Kompletni endpointi za CRUD operacije nad ljubimcima i pregled veterinara.
- **Relaciona baza podataka (Sequelize)**: Postavljena je relacija *Jedan-prema-Mnogo* (`Veterinar.hasMany(Ljubimac)`).
- **Automatski Seeding**: Prilikom prvog pokretanja servera, ukoliko je baza prazna, sistem automatski kreira inicijalne podatke za 3 veterinara i 10 ljubimaca kako bi aplikacija odmah bila spremna za testiranje.
- **Automatsko dodjeljivanje slika**: Bekend na osnovu izabranog tipa ljubimca (`pas`, `macka`, `zec`, `hrcak`) automatski dodjeljuje putanju do odgovarajuće slike.
- **Validacija na serveru**: Endpoint za vakcinaciju provjerava trenutni status i vraća grešku `400 VEĆ_VAKCINISAN` ukoliko se pokuša ponovna vakcinacija.

---

## 🛠️ Tehnologije (Tech Stack)

**Backend:**
- Node.js
- Express.js
- Sequelize ORM (podržava SQLite, MySQL, PostgreSQL)
- CORS & Dotenv

**Frontend:**
- React (v18+)
- React Router DOM (za navigaciju između stranica)
- Axios (za HTTP zahtjeve ka bekendu)
- CSS3 (prilagođeni stilovi za kartice i formulare)

---

## 📂 Struktura projekta

```text
├── backend/
│   ├── models/
│   │   ├── Ljubimac.js       # Model za ljubimca (polja, relacije, statusi)
│   │   └── Veterinar.js      # Model za veterinara
│   ├── database.js           # Konfiguracija i povezivanje sa bazom
│   ├── seed.js               # Skripta za ručno punjenje baze (opciono)
│   └── server.js             # Glavni server fajl sa API rutama i seed logikom
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddPetForm.js # Formular za dodavanje ljubimca
│   │   │   ├── PetCards.js   # Dashboard sa karticama i filterima
│   │   │   └── PetTable.js   # Tabelarni prikaz (alternativa)
│   │   ├── App.js            # Definisanje ruter i stranica
│   │   └── index.js          # Main entry point za React