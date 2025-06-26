# 🐾 CatBook – The Social Network for Cats

CatBook is a "furr-stack" web application where cat lovers can create profiles for their feline friends, share their "meowments", like, comment, and interact with other cats in the community.

## 🛠️ Tech Stack

- **Frontend**: React, Axios
- **Backend**: ASP.NET Core Web API
- **Database**: PostgreSQL
- **Authentication**: Google OAuth 2.0
- **Hosting**: Docker ready - Render.com (API) + Supabase(DB)

---

## 🚀 Features

### 👤 Cat Profiles

- Add your cat's name, photo, age, breed, and bio
- Edit or delete profiles anytime

### 📸 Meow Posts

- Post updates (aka _Meowments_) with text and images
- Like and comment on other cats' posts

### 🔐 Authentication

- Sign up and login with secure Google based Auth

---

## 🧩 Project Structure

```bash
CatBook/
├── client/           # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/  # Axios API calls
│       └── App.jsx
├── server/           # ASP.NET Core backend
│   ├── Controllers/
│   ├── Models/
│   ├── DTOs/
│   ├── Data/         # EF Core + PostgreSQL
│   └── Program.cs
├── Dockerfile
└── README.md
```
