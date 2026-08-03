# ✂️ Golden Scissor Spa & Saloon — Commercial Lounge Platform

A commercial, production-ready MERN stack web application for **Golden Scissor Spa & Saloon**, designed with the **"Imperial Gilded Noir"** aesthetic system — an ultra-luxury dark palette featuring gold (#f2ca50) accents, glassmorphic paneling, Playfair Display & Manrope typography, WebGL gilded mist background shaders, and smooth micro-interactions.

---

## 🌟 Key Features

### 👑 Public Lounge Website
- **Home:** Full-screen hero with WebGL animated background, legacy stats counter, expertise showcases, and concierge booking CTA.
- **About Us:** Sanctuary history, stat counters (5000+ clients, 10+ years), story highlights, and mission/vision cards.
- **Services:** Interactive service catalog filtered by category (Signature, Artisan, Rejuvenation, Therapy, Wellness, Lustre).
- **Pricing:** 3-tier membership structures (Essential $45, Signature $85, Royal $150).
- **Gallery:** Interactive portfolio with category filter tabs and fullscreen lightbox preview.
- **Master Stylists:** Staff roster with experience counters, star ratings, and specialty badges.
- **Membership:** Club subscription plans and reward discount details.
- **Offers:** Active promotional codes (e.g., `GOLDEN20`, `ROYAL15`).
- **Testimonials:** Verified patron reviews with admin responses.
- **Contact:** Split contact details, direct WhatsApp links, and interactive concierge callback request forms.

### 📅 Booking & Concierge Engine
- **4-Step Wizard:** Service Selection ➔ Master Stylist Picker ➔ Date & Slot Selector ➔ Final Details.
- **Double-Booking Prevention:** Real-time slot availability calculator ensuring stylists are never double-reserved.
- **Automated Notifications:** Confirmation emails (Nodemailer HTML templates) + 24-hour cancellation rule enforcement.

### 🔐 Authentication & RBAC
- **JWT & HTTP-Only Cookies:** Role-based access control supporting `customer`, `staff`, and `admin` roles.
- **Secure Password Hashing:** `bcryptjs` with salt rounds.

### 📊 Customer & Admin Dashboards
- **Customer Dashboard:** Reservation history, loyalty point counters (10% earnings per booking), saved wishlist, and active memberships.
- **Admin Dashboard:** Executive KPIs (Total Revenue, Reservations Count, Pending Approvals, Customer Growth), interactive reservation control table with status transitions (`pending` ➔ `confirmed` ➔ `completed` ➔ `cancelled`), and concierge callback manager.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, React Router v7, SCSS Modules, WebGL Shaders, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose ORM |
| **Auth** | JWT, HTTP-Only Cookies, Role-Based Access Control |
| **Uploads** | Multer, Cloudinary SDK |
| **Email** | Nodemailer |
| **Security** | Helmet, Express Rate Limit, Mongo Sanitize, XSS Clean, CORS, Compression |

---

## 📂 Folder Structure

```
golden-scissor-spa/
├── client/                      # React 19 + Vite frontend
│   ├── src/
│   │   ├── components/          # Reusable Navbar, Footer, WebGLBackground, ConciergeWidget
│   │   ├── pages/               # Home, About, Services, Pricing, Gallery, Team, Booking, etc.
│   │   │   ├── dashboard/       # Customer Dashboard
│   │   │   └── admin/           # Admin Dashboard
│   │   ├── styles/              # SCSS variables, mixins, global styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vercel.json              # Vercel SPA deployment config
│
└── server/                      # Node.js + Express backend
    ├── src/
    │   ├── config/              # MongoDB & Cloudinary SDK setup
    │   ├── controllers/         # Auth, Booking, Service, Staff, Gallery, Review, Analytics, etc.
    │   ├── middleware/          # Auth JWT guard, Role RBAC, Express Validator, Error Handler
    │   ├── models/              # Mongoose Schemas (User, Staff, Service, Booking, Review, etc.)
    │   ├── routes/              # Express API Route Groups
    │   ├── seed/                # Database Seeding Script (`seed.js`)
    │   └── services/            # Nodemailer Email Transporter
    ├── server.js                # Server entry point
    └── render.yaml              # Render deployment config
```

---

## ⚡ Quick Start Guide

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas database URI (or local MongoDB running on `mongodb://localhost:27017/golden-scissor-spa`)

### 1. Backend Setup
```bash
cd server
npm install --legacy-peer-deps

# Create environment file from sample
cp .env .env.local

# Seed initial database records (Admin, Staff, Services, Memberships, Offers)
npm run seed

# Start development server
npm run dev
```
Backend server will run on `http://localhost:5000`.

### Default Credentials (Seeded):
- **Admin:** `admin@goldenscissorspa.com` / `password123`
- **Customer:** `customer@goldenscissorspa.com` / `password123`
- **Staff:** `julian@goldenscissorspa.com` / `password123`

---

### 2. Frontend Setup
```bash
cd client
npm install

# Start Vite dev server
npm run dev
```
Frontend application will open on `http://localhost:5173`.

---

## 📡 API Endpoints

### 🔐 Auth Routes (`/api/auth`)
- `POST /register` — Register new user
- `POST /login` — Log in & receive HTTP-only cookie
- `POST /logout` — Log out user
- `GET /me` — Get current user profile
- `POST /forgot-password` — Request password reset email

### 📅 Booking Routes (`/api/bookings`)
- `GET /slots` — Get available time slots for stylist & date
- `POST /` — Reserve an experience (Auth required)
- `GET /` — List user's bookings (Customer / Admin)
- `PUT /:id/status` — Update booking status (`confirmed`, `completed`, `cancelled`) [Admin/Staff]
- `PUT /:id/cancel` — Cancel appointment (24h rule)

### 💈 Service Routes (`/api/services`)
- `GET /` — Public services list
- `POST /` — Add new service with Cloudinary image upload [Admin]
- `PUT /:id` — Edit service details [Admin]

### 🖼️ Gallery Routes (`/api/gallery`)
- `GET /` — Get gallery items filtered by category
- `POST /` — Upload portfolio photo to Cloudinary [Admin]

---

## 🚀 Deployment Instructions

### Frontend (Vercel)
1. Import `client/` directory into Vercel.
2. Set build command: `npm run build` and output directory: `dist`.
3. Add environment variable: `VITE_API_URL=https://your-backend-url.onrender.com`.

### Backend (Render)
1. Import `server/` repository into Render Web Services.
2. Build command: `npm install --legacy-peer-deps`.
3. Start command: `npm start`.
4. Configure Environment Variables (`MONGO_URI`, `JWT_SECRET`, `CLOUDINARY_*`, `EMAIL_*`).

---

## 📜 License
This software product is released under the **MIT License**.
