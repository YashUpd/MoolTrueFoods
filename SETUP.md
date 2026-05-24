# MoolTrue Foods — Full Stack Setup Guide

## Project Structure

```
MoolTrueFoods/
├── src/                        # React frontend
│   ├── api/client.js           # Centralized API utility
│   ├── pages/Admin/            # Admin dashboard pages
│   └── ...
├── server/                     # Node.js/Express backend
│   ├── src/
│   │   ├── index.js            # Server entry point
│   │   ├── db.js               # Prisma client singleton
│   │   ├── seed.js             # Database seeder
│   │   ├── controllers/        # Business logic
│   │   ├── routes/             # API route definitions
│   │   └── middleware/         # Auth + Upload middleware
│   └── prisma/
│       └── schema.prisma       # Database schema
├── .env.local.example          # Frontend env template
└── vite.config.js              # Vite + proxy config
```

---

## Step 1: Set Up Neon.tech Database

1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new project → `mooltruefoods`
3. Copy the **Connection String** from Dashboard → Connection Details
4. It looks like: `postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require`

---

## Step 2: Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Go to **APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client ID**
4. Application type: **Web Application**
5. Add Authorized JavaScript Origins:
   - `http://localhost:5173` (dev)
   - `https://your-vercel-app.vercel.app` (prod)
6. Copy the **Client ID** (it ends in `.apps.googleusercontent.com`)

---

## Step 3: Set Up Cloudinary

1. Go to [cloudinary.com](https://cloudinary.com) and create a free account
2. Dashboard → API Keys → Copy **Cloud Name**, **API Key**, **API Secret**

---

## Step 4: Set Up Razorpay

1. Go to [razorpay.com](https://razorpay.com) and create an account
2. Dashboard → Settings → API Keys → Generate Test Keys
3. Copy **Key ID** and **Key Secret**

---

## Step 5: Configure Backend Environment

```bash
cd server
copy .env.example .env
```

Fill in your `.env` file:
```env
DATABASE_URL=postgresql://...@host.neon.tech/neondb?sslmode=require
JWT_SECRET=generate-a-64-char-random-string
GOOGLE_CLIENT_ID=your-id.apps.googleusercontent.com
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
RAZORPAY_KEY_ID=rzp_test_xxxx
RAZORPAY_KEY_SECRET=xxxx
CLIENT_URL=http://localhost:5173
ADMIN_EMAILS=your-email@gmail.com
```

---

## Step 6: Configure Frontend Environment

```bash
# In project root
copy .env.local.example .env.local
```

Fill in `.env.local`:
```env
VITE_GOOGLE_CLIENT_ID=your-id.apps.googleusercontent.com
VITE_RAZORPAY_KEY_ID=rzp_test_xxxx
```

---

## Step 7: Run Database Migrations & Seed

```bash
cd server
npm run db:push        # Push Prisma schema to Neon
npm run db:seed        # Seed all 10 products
```

---

## Step 8: Run Locally

Open **two terminals**:

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
# In project root
npm run dev
# Frontend runs on http://localhost:5173
```

Access the admin dashboard at: **http://localhost:5173/admin**

---

## Deployment

### Backend → Render
1. Go to [render.com](https://render.com) → New Web Service
2. Connect your GitHub repo, set **Root Directory** to `server`
3. Build command: `npm install && npx prisma generate`
4. Start command: `npm start`
5. Add all environment variables from `server/.env`
6. Set `NODE_ENV=production`

### Frontend → Vercel
1. Import the GitHub repo (root directory)
2. Add environment variables in Vercel dashboard:
   - `VITE_GOOGLE_CLIENT_ID`
   - `VITE_RAZORPAY_KEY_ID`
   - `VITE_API_URL` = your Render backend URL

---

## API Endpoints Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/health` | — | Health check |
| POST | `/api/auth/google` | — | Google login |
| GET | `/api/auth/me` | JWT | Get current admin |
| GET | `/api/products` | — | List all products |
| GET | `/api/products/:id` | — | Get single product |
| POST | `/api/products` | JWT | Create product (with image) |
| PUT | `/api/products/:id` | JWT | Update product (with image) |
| DELETE | `/api/products/:id` | JWT | Delete product |
| POST | `/api/orders` | — | Place new order |
| GET | `/api/orders` | JWT | List all orders |
| GET | `/api/orders/stats` | JWT | Dashboard stats |
| GET | `/api/orders/:id` | JWT | Order details |
| PATCH | `/api/orders/:id/status` | JWT | Update order/payment status |
| POST | `/api/payments/create-order` | — | Create Razorpay session |
| POST | `/api/payments/verify` | — | Verify payment signature |
