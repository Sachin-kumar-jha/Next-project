# 🔐 Next.js Google Auth + OTP Verification

A full-stack auth app using **Next.js**, **NextAuth (Google OAuth)**, **MongoDB + Prisma**, with **OTP verification** and an **Admin Panel** for managing users.

---

## 🚀 Features

- Google OAuth login via NextAuth
- OTP email verification post-login
- Admin panel to block/delete users
- MongoDB with Prisma ORM
- Nodemailer for sending OTPs

---

## 🛠 Tech Stack

Next.js • Tailwind CSS • NextAuth.js • Prisma • MongoDB • Nodemailer

---

## 📦 Installation

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
npm install
```

### 2. Environment Variables

Create a `.env` file in the root of your project and add the following:

```env
# Database
DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_SECRET=your-random-secret
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email Credentials for OTP (Use Gmail App Password)
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM="Your Name <youremail@gmail.com>"
```

> 💡 To generate `NEXTAUTH_SECRET`, run:
> ```bash
> openssl rand -base64 32
> ```
>
> 🔐 For `EMAIL_PASS`, [generate a Gmail App Password](https://support.google.com/accounts/answer/185833?hl=en) and use it instead of your Gmail password.

### 3. Prisma Setup

```bash
npx prisma generate
npx prisma db push
```

Optionally, open Prisma Studio to view data:
```bash
npx prisma studio
```

---

## ▶ Run App

```bash
npm run dev
```

App will be available at: [http://localhost:3000](http://localhost:3000)

---

## 🔁 OTP Flow

1. Login with Google  
2. OTP sent via email  
3. User enters OTP at `/verify-otp`  
4. Redirected to `/user` on success

---

## 👑 Admin Panel

- URL: `/admin`  
- Access: Users with `role = "ADMIN"`
- Features: View, block, delete users

To promote a user to admin, update their role in the database:
```json
{
  "email": "admin@example.com",
  "role": "ADMIN"
}
```

---

## 📁 Project Structure

```
pages/
├─ api/auth/[...nextauth].ts
├─ api/otp/send.ts & verify.ts
├─ admin/index.tsx
├─ user/index.tsx
├─ verify-otp.tsx
prisma/schema.prisma
lib/prisma.ts
middleware.ts

```

