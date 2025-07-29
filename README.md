# 🎵 PlayTune – Full Stack Music Streaming Platform

**PlayTune** is a fully functional music streaming platform built with **MERN Stack** as part of **Delta Inductions 2024 (Web Development Track)** at NIT Trichy. It allows users to stream, upload, and manage music seamlessly, featuring both *Normal* and *Hacker* modes. PlayTune delivers a Spotify-like experience with social and collaborative features, authentication, and playlist intelligence.

> 🚀 Currently handles 50+ songs and 10+ user sessions per day during active test cycles.

---

## 🛠 Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB Atlas
- **Auth:** DAuth Integration (OAuth 2.0)
- **Media Handling:** Cloudinary (for MP3 uploads)
- **Others:** JWT, Webhooks, Render, Vercel

---

## 🔗 Live Links

- **Deployed  Live on Vercel :** [PlayTune](https://playtune-song.vercel.app)

---

## 🎯 Features

### ✅ Normal Mode
- User Authentication (DAuth)
- Create, edit & manage Playlists
- Like/Unlike Songs
- Song search with progress bar
- Upload custom MP3 songs
- Responsive song player (play/pause)
- Playlist total duration indicator

### 🔐 Hacker Mode
- Artist Account Registration
- Artists can upload original music
- Private Playlists
- Auto-generated “Liked Songs” playlist
- Friend system (requests + accept)
- Party Mode – Merge playlists with friends
- Toggle search between songs and users
- 🎵 *Upcoming:* Lyrics fetch using external API

---

## 🧠 Development Journey

I built PlayTune from scratch by integrating **backend (Node.js)** and **frontend (React.js)** with a persistent stateful audio experience.

### Milestones:

1. Learned backend fundamentals and set up REST APIs with secure JWT.
2. Built responsive UI with Tailwind, routing with React Router.
3. Implemented full music playback system with file upload to Cloudinary.
4. Deployed backend on Render; added support for persistent configuration.
5. Implemented DAuth login and state sharing across pages for uninterrupted audio.

---

## 🚀 Local Setup Instructions

### 1. Clone the Repo:
```bash
git clone -b main https://github.com/sir-shivam/DeltaWeb-Task3.git
```

### 2. Backend Setup:
```bash
cd backend
npm install
nodemon
```

By default, runs on [localhost:4000](http://localhost:4000)

### 3. Frontend Setup:
```bash
cd front-end
npm install
npm start
```

Runs at [localhost:3000](http://localhost:3000)

📝 Update `src/utils/config.js` to match your backend URL (local or deployed).

---

## ⚠️ Notes

- Cloudinary is used for MP3 file hosting.
- Backend deployed on Render; URL provided in `config.js`.

---

## 💡 Future Scope

- Lyrics integration using Musixmatch API
- Social feed for artist uploads
- UI enhancements for mobile responsiveness

---

## 📌 Final Remarks

> PlayTune is more than a project — it is an end-to-end production-ready system that demonstrates my capability in full-stack development, state management, authentication, database design, and delivering intuitive user experiences.

---
