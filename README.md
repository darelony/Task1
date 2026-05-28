# 🐾 Pet Management System (Task 1)

This is a complete **full-stack** web application for managing pet and veterinarian records within a clinic. The project consists of a **Node.js/Express** backend that uses **Sequelize ORM** to communicate with the database, and a **React** frontend for an interactive data management user interface.

---

## 🚀 Features

### 🖥️ Frontend (React)
- **Dashboard with Cards (`PetCards`)**: Visual display of all pets with essential information (name, owner, type, assigned veterinarian, vaccination status).
- **Advanced Filtering and Search**: Live search for pets by name, as well as filtering by animal type (cat, dog, rabbit, hamster) or the assigned veterinarian.
- **Status Management (Active/Inactive)**: Quick toggle of the pet's status. Inactive pets are visually blurred/faded in the interface (using the `.inactive` class).
- **Vaccination System**: One-click vaccination action (syringe icon 💉). The button is automatically disabled if the pet is already vaccinated, handling real-time server responses.
- **Add New Pets (`AddPetForm`)**: A validated form that fetches the list of available veterinarians from the backend to register a new pet.
- **Table View (`PetTable`)**: Alternative component for structured tabular data display with all available CRUD actions.

### ⚙️ Backend (Node.js & Express)
- **REST API**: Complete endpoints for CRUD operations on pets and fetching veterinarian records.
- **Relational Database (Sequelize)**: Implements a *One-to-Many* relationship (`Veterinar.hasMany(Ljubimac)`).
- **Automatic Seeding**: Upon the first server startup, if the database is empty, the system automatically populates it with initial seed data (3 veterinarians and 10 pets) so the app is instantly ready for testing.
- **Dynamic Image Assignment**: The backend automatically assigns the correct image asset path based on the selected pet type (`dog`, `cat`, `rabbit`, `hamster`).
- **Server-side Validation**: The vaccination endpoint verifies the current status and returns a `400 ALREADY_VACCINATED` error if a re-vaccination is attempted.

---

## 🛠️ Tech Stack

**Backend:**
- Node.js
- Express.js
- Sequelize ORM (configured with SQLite)
- CORS & Dotenv

**Frontend:**
- React (v18+)
- React Router DOM (for navigation)
- Axios (for HTTP requests to the backend)
- CSS3 (custom styles for cards, forms, and tables)

---

## 📂 Project Structure

```text
├── backend/
│   ├── models/
│   │   ├── Ljubimac.js       # Pet model (fields, relationships, statuses)
│   │   └── Veterinar.js      # Veterinarian model
│   ├── database.js           # Database configuration and connection
│   ├── seed.js               # Script for manual database seeding
│   └── server.js             # Main entry point with API routes and auto-seed logic
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddPetForm.js # Form to add a new pet
│   │   │   ├── PetCards.js   # Dashboard with cards and filters
│   │   │   └── PetTable.js   # Tabular data display (alternative)
│   │   ├── App.js            # Router and application layout
│   │   └── index.js          # React entry point