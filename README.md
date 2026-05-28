# 🐾 Pet Management System

A modern full-stack web application for managing pets and veterinarian records inside a veterinary clinic.
The platform enables clinic staff to register pets, assign veterinarians, manage vaccination status, and monitor pet activity through an interactive and responsive dashboard.

This project demonstrates practical full-stack and backend development concepts including REST APIs, relational database modeling, CRUD operations, dynamic UI rendering, filtering systems, and server-side validation.

---

# 🚀 Features

## 🐶 Pet Management

* Create new pet records
* Delete existing pets
* Assign veterinarians
* Toggle active/inactive pet status
* Dynamic pet image assignment based on animal type

## 💉 Vaccination System

* One-click vaccination functionality
* Real-time vaccination status updates
* Automatic prevention of duplicate vaccinations
* Backend validation with proper HTTP error responses

## 🔍 Filtering & Search

* Search pets by name
* Filter pets by animal type
* Filter pets by assigned veterinarian
* Real-time dynamic filtering

## 🖥️ Frontend Dashboard

* Responsive pet cards interface
* Alternative table-based data view
* Interactive UI components
* Form validation for new pet registration

## ⚙️ Backend Functionality

* RESTful API architecture
* Relational database relationships
* Automatic database seeding
* Server-side validation
* Modular backend structure

---

# 🛠️ Tech Stack

## Backend

* Node.js
* Express.js
* Sequelize ORM
* SQLite
* Dotenv
* Cors

## Frontend

* React.js
* Axios
* React Router DOM
* CSS3

---

# 🧩 Database Architecture

The application uses a relational database structure with a One-to-Many relationship between:

* `Veterinarian`
* `Pet`

where:

* One veterinarian can manage multiple pets
* Each pet belongs to a single veterinarian

The system also includes:

* vaccination status tracking
* active/inactive state management
* dynamic asset assignment

---

# 📂 Project Structure

```text id="b1h4zc"
├── backend/
│   ├── models/
│   │   ├── Pet.js
│   │   └── Veterinarian.js
│   ├── database.js
│   ├── seed.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddPetForm.js
│   │   │   ├── PetCards.js
│   │   │   └── PetTable.js
│   │   ├── App.js
│   │   └── index.js
```

---

# 📦 Installation & Setup

## 1️⃣ Clone the Repository

```bash id="v9z21h"
git clone https://github.com/yourusername/pet-management-system.git
```

---

## 2️⃣ Backend Setup

Navigate to the backend directory:

```bash id="7zxf1u"
cd backend
```

Install dependencies:

```bash id="c8p7ql"
npm install
```

Start the backend server:

```bash id="k8v0qp"
node server.js
```

Backend runs on:

```text id="4fxjkw"
http://localhost:5000
```

The server automatically seeds the database with:

* veterinarians
* pets
* initial clinic data

---

## 3️⃣ Frontend Setup

Open a separate terminal window:

```bash id="v8gc4q"
cd frontend
```

Install frontend dependencies:

```bash id="rh54ae"
npm install
```

Start the React application:

```bash id="i57m2q"
npm start
```

Frontend runs on:

```text id="nlmfr8"
http://localhost:3000
```

---

# 🔌 API Endpoints

| Method | Route                 | Description                         |
| ------ | --------------------- | ----------------------------------- |
| GET    | `/vets`               | Get all veterinarians               |
| GET    | `/pets`               | Get all pets with veterinarian data |
| POST   | `/pets`               | Create new pet                      |
| PATCH  | `/pets/:id/status`    | Toggle pet active status            |
| PATCH  | `/pets/:id/vaccinate` | Vaccinate pet                       |
| DELETE | `/pets/:id`           | Delete pet                          |

---

# 🎯 Key Concepts Demonstrated

* Full-stack application development
* REST API design
* CRUD operations
* Relational database modeling
* One-to-Many relationships
* Backend validation
* Dynamic filtering systems
* State management
* Real-time UI updates
* Modular architecture

---

# 📌 Future Improvements

* JWT Authentication & Authorization
* Role-based permissions
* Appointment scheduling
* Medical history tracking
* Docker containerization
* Unit and integration testing
* Cloud deployment

---

# 👨‍💻 Author

Darko Matić

GitHub: https://github.com/darelony
