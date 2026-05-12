# Blogging Platform

A simple but solid server-rendered blogging platform built with **Node.js, Express.js, MongoDB, and EJS**. Users can sign up, sign in, create blog posts, upload cover images, and comment on posts.

---

# Features

- User signup and signin
- JWT-based authentication using HTTP-only cookies
- Create and publish blog posts
- Upload blog cover images with Multer
- View blog details with author information
- Add comments on blog posts
- MongoDB relationships using Mongoose references
- Server-side rendering with EJS
- Responsive UI built with Bootstrap

---

# Tech Stack

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Cookie Parser
- Multer

## Frontend
- EJS
- Bootstrap

## Other Tools
- dotenv
- nodemon

---

# Folder Structure

```bash
.
├── app.js
├── middleware/
│   └── auth.js
├── models/
│   ├── blog.js
│   ├── comment.js
│   └── user.js
├── routes/
│   ├── blog.js
│   └── user.js
├── services/
│   └── authentication.js
├── public/
│   ├── images/
│   └── Uploads/
├── views/
│   ├── home.ejs
│   ├── blog.ejs
│   ├── addBlog.ejs
│   ├── signin.ejs
│   ├── signup.ejs
│   └── partials/
└── package.json
```

---

# How It Works

- **Authentication:** Users sign up and sign in using email and password.
- **Password Security:** Passwords are hashed before saving to MongoDB.
- **Session Handling:** After login, a JWT token is stored in an HTTP-only cookie.
- **Blog Creation:** Authenticated users can create blogs with a title, body, and cover image.
- **Comments:** Signed-in users can comment on any blog post.
- **Rendering:** Blog pages are rendered on the server using EJS templates.

---

# Installation

## 1. Clone the repository

```bash
git clone <repository-url>
cd Blog
```

## 2. Install dependencies

```bash
npm install
```

## 3. Create a `.env` file

```env
PORT=8000
MONGO_URL=your_mongodb_connection_string
secret=your_jwt_secret
```

## 4. Run the project

```bash
npm run dev
```

The app will run at:

```bash
http://localhost:8000
```

---

# Learning Outcomes

This project helped me practice:

- Building backend applications with Express.js
- User authentication with JWT and cookies
- MongoDB schema design with Mongoose
- File upload handling with Multer
- Server-side rendering with EJS
- Working with relational data using MongoDB population

---

# Future Improvements

- Edit and delete blog posts
- Edit and delete comments
- Blog search and filtering
- Like and bookmark system
- User profile page
- Markdown support for blog content
- Deployment with a proper production setup

---
