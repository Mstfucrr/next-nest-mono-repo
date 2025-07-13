# 🛒 Dailyshop - Roadmap

## 📋 Project Purpose

Dailyshop is a platform for buying and selling second-hand electronics. Users can list their products for sale, purchase items, and benefit from AI-powered price suggestions to help sellers determine optimal price ranges based on current market data.

---

## 🚀 Key Features

- **User Registration & Login:**
  - Secure, user-friendly sign up and authentication
  - Account creation and password recovery

- **Product Listing & Management:**
  - Users can list, edit, and delete their products
  - Add/update product name, price, images
  - Sellers receive AI-powered price range suggestions based on market data

- **Product Discovery:**
  - Advanced search, sorting, and filtering by category, price, rating, and recency
  - Sort by user ratings, price changes, review count, and newest

- **Seller Account Management:**
  - Open a seller account and manage listed products
  - View, update, or delete account and profile photo
  - Manage contact and address information

- **Reviews & Feedback:**
  - Buyers can rate and review purchased products
  - "Verified purchase" badge for reviewers who bought the product
  - Users can comment on and reply to reviews
  - Report inappropriate reviews or users

- **Price Drop Notifications:**
  - Users can subscribe to price drop alerts for specific products
  - Notifications include product name, old price, and new price

- **Wallet Features:**
  - Add funds to wallet
  - View wallet balance

---

## 📅 Roadmap (10 Weeks)

### **Phase 1: Foundation (Weeks 1-2)**

- Project setup (Next.js, NestJS, PostgreSQL)
- User authentication (JWT)
- Basic user and product entities
- Initial UI and navigation

### **Phase 2: Core Features (Weeks 3-4)**

- Product CRUD (list, add, edit, delete)
- Category management
- Product image upload
- Seller account management

### **Phase 3: Discovery & Cart (Weeks 5-6)**

- Product search, sorting, and filtering
- Cart functionality (add/remove/update items)
- Cart persistence (localStorage)
- Checkout flow (multi-step form)

### **Phase 4: Payment & Wallet (Weeks 7-8)**

- Stripe integration for payments
- Wallet: add funds, view balance
- Order creation and management
- Address management

### **Phase 5: Reviews, Notifications & AI (Weeks 9-10)**

- Product reviews and ratings
- Review replies and reporting
- Price drop notifications
- AI-powered price suggestion API integration
- Final polish, testing, and deployment

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS, Zustand, React Query, React Hook Form, Shadcn/ui
- **Backend:** NestJS, TypeScript, PostgreSQL, TypeORM, JWT, Socket.io, Stripe, Redis

---

## 🎯 Success Criteria

- Secure and user-friendly authentication
- Robust product management and discovery
- AI-powered price suggestions for sellers
- Real-time notifications and wallet features
- Comprehensive review and feedback system
- Responsive, modern UI/UX
- Fully tested and production-ready deployment

---

## 🚀 Get Started

### Backend

```bash
pnpm --filter api add @nestjs/typeorm typeorm pg
pnpm --filter api add @nestjs/jwt @nestjs/passport passport passport-jwt
pnpm --filter api add bcrypt class-validator class-transformer
pnpm --filter api add @nestjs/websockets @nestjs/platform-socket.io
pnpm --filter api add stripe @nestjs/config
```

### Frontend

```bash
pnpm --filter web add zustand @tanstack/react-query
pnpm --filter web add react-hook-form @hookform/resolvers zod
pnpm --filter web add @radix-ui/react-dialog @radix-ui/react-dropdown-menu
pnpm --filter web add socket.io-client
```
