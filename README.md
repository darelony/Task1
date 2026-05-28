# 🛡️ Insurance Management System

A modern full-stack web application for managing insurance clients and their active insurance policies.
The platform enables insurance agents to register users, manage policy assignments, upload profile avatars, and maintain detailed customer records through an interactive and responsive interface.

This project demonstrates practical backend and full-stack development concepts including REST APIs, relational database design, file uploads, dynamic UI rendering, and many-to-many database relationships.

---

# 🚀 Features

## 👤 User Management

* Create, view, and delete client profiles
* Expandable user detail cards
* Real-time search and filtering
* Dynamic sorting functionality

## 📑 Policy Management

* Assign insurance policies to users
* Remove active policies
* Duplicate policy prevention
* Policy visualization using custom icons

## 🖼️ Avatar Upload System

* Upload and update profile images
* Automatic avatar refresh
* Local file storage support

## 🔍 Advanced UI Features

* Responsive data table layout
* Real-time filtering and sorting
* Confirmation modals
* Form validation

## ⚙️ Backend Functionality

* RESTful API architecture
* Sequelize ORM integration
* Many-to-many database relationships
* Centralized error handling
* Database lifecycle hooks
* Static file serving

---

# 🛠️ Tech Stack

## Backend

* Node.js
* Express.js
* Sequelize ORM
* SQLite
* Multer
* Dotenv
* Cors

## Frontend

* React.js
* Axios
* CSS Modules

---

# 🧩 Database Architecture

The application uses a relational database structure with a Many-to-Many relationship between:

* `Users`
* `Policies`

connected through:

* `UserPolicy`

This architecture allows:

* Multiple users to own multiple policies
* Efficient querying and policy assignment
* Duplicate prevention using composite indexes

---

# 📂 Project Structure

```text
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   ├── uploads/
│   ├── app.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.css
```

---

# 📦 Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/insurance-management-system.git
```

---

## 2️⃣ Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Seed the database:

```bash
node seed/seed.js
```

Start the backend server:

```bash
node server.js
```

Backend server runs on:

```text
http://localhost:5000
```

---

## 3️⃣ Frontend Setup

Open a separate terminal window:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React application:

```bash
npm start
```

Frontend runs on:

```text
http://localhost:3000
```

---

# 🔌 API Endpoints

| Method | Route                           | Description                   |
| ------ | ------------------------------- | ----------------------------- |
| GET    | `/users`                        | Get all users                 |
| GET    | `/users/:id`                    | Get detailed user information |
| POST   | `/users`                        | Create new user               |
| DELETE | `/users/:id`                    | Delete user                   |
| POST   | `/users/:id/policies/:policyId` | Assign policy                 |
| DELETE | `/users/:id/policies/:policyId` | Remove policy                 |
| POST   | `/users/:id/avatar`             | Upload avatar                 |
| GET    | `/policies`                     | Get all policies              |

---

# 🎯 Key Concepts Demonstrated

* Full-stack application architecture
* REST API development
* CRUD operations
* Relational database modeling
* Many-to-Many relationships
* File upload handling
* Dynamic frontend state management
* Error handling and validation
* Modular backend structure

---

# 📌 Future Improvements

* JWT Authentication & Authorization
* Role-based access control
* Cloud image storage
* Pagination support
* Docker containerization
* Unit and integration testing
* Deployment pipeline

---

# 👨‍💻 Author

Darko Matić

GitHub: https://github.com/darelony
