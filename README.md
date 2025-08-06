# MERN Todo App Backend

This is the **backend API** for a Todo application built using **Node.js**, **Express**, and **MongoDB**. It supports user authentication with **JWT**, secure password hashing with **bcrypt**, and complete CRUD operations on todos.

## 🚀 Features

- ✅ User Sign Up & Sign In (with JWT)
- 🔐 Auth middleware to protect private routes
- 📝 Create, Read, Update, Delete (CRUD) operations for todos
- 📁 Todos linked to individual users
- 📦 MongoDB + Mongoose for database management
- ✨ Input validation using Zod

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- Bcrypt
- Zod (for validation)
- dotenv

---

## 📁 Project Structure


## 📌 Notes
- The frontend should store the JWT in localStorage and send it with each protected request.

- Each user can only access and modify their own todos.