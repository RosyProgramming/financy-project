# 💰 Financy

Full Stack personal finance management application built with React, TypeScript, Node.js, GraphQL and Prisma.

The application allows users to manage income, expenses and categories, with authentication, dashboard visualization, filters, pagination and password recovery.

## 🚀 Live Demo

**Financy:** https://financy-project-chi.vercel.app

The application is deployed on Vercel.

## 🎨 Layout

Design based on the original Figma project:

https://www.figma.com/community/file/1580994817007013257/financy-

## 📸 System Preview

### 🔐 Authentication

![Login](./screens/login.png)

### 🔐 Password Recovery

![Recover Password](./screens/loginRecupera.png)

![Reset Password](./screens/redefinirSenha.png)

### 👤 Edit Profile

![Profile](./screens/perfil.png)

### 📊 Dashboard

![Dashboard](./screens/dashboard.png)

### 💸 Transactions

![Transactions](./screens/transactions.png)

### 🏷️ Categories

![Categories](./screens/categories.png)

## 🎥 Demo

![Demo](./screens/financy.gif)

## 🚀 Technologies

### Backend

* TypeScript
* Node.js
* Express 5
* GraphQL
* Apollo Server
* TypeGraphQL
* Prisma ORM
* Turso / libSQL
* Prisma libSQL adapter
* JWT
* bcrypt
* class-validator
* CORS
* Vercel

### Frontend

* TypeScript
* React
* Vite
* Apollo Client
* React Router
* Zustand
* TailwindCSS
* Shadcn UI
* React Hook Form

### Testing

* Vitest
* TypeScript

## 📋 Features

### 🔐 Authentication

* [x] User registration
* [x] Login
* [x] JWT authentication
* [x] Logout
* [x] Password recovery
* [x] Password reset
* [x] Protected routes
* [x] User-specific data access

### 💸 Transactions

* [x] Create transactions
* [x] Edit transactions
* [x] Delete transactions
* [x] List transactions
* [x] Income transactions
* [x] Expense transactions
* [x] Search transactions
* [x] Filter by type
* [x] Filter by category
* [x] Filter by month
* [x] Pagination
* [x] Transaction persistence after page refresh

### 🏷️ Categories

* [x] Create categories
* [x] Edit categories
* [x] Delete categories
* [x] List categories

### 📊 Dashboard

* [x] Financial summary
* [x] Income aggregation
* [x] Expense aggregation
* [x] Balance calculation
* [x] Financial data visualization
* [x] Add transactions directly from the dashboard

## 🧪 Automated Tests

The backend uses Vitest for automated tests.

Current tests cover important transaction service rules:

* [x] Pagination calculation
* [x] Month filtering
* [x] Transaction type filtering

Run the tests with:

```bash
cd backend
npm test
```

For a single test run:

```bash
npm test -- --run
```

## 🏗️ Architecture

```text
Financy
│
├── frontend
│   ├── React
│   ├── Apollo Client
│   ├── Zustand
│   └── Vite
│
└── backend
    ├── Express
    ├── Apollo Server
    ├── GraphQL
    ├── TypeGraphQL
    ├── Services
    ├── Resolvers
    ├── Prisma
    └── Turso / libSQL
```

### Backend

Responsible for:

* Business rules
* Authentication
* Authorization
* GraphQL API
* Database access
* Transaction management
* Category management
* User management

### Frontend

Responsible for:

* User interface
* Authentication screens
* Dashboard
* Transactions
* Categories
* Filters
* Forms
* Client-side state management

### Communication

Frontend and backend communicate through a GraphQL API.

## ☁️ Production Architecture

```text
User
  │
  ▼
Vercel
  │
  ▼
React / Vite Frontend
  │
  │ GraphQL
  ▼
Vercel
  │
  ▼
Node.js + Express + Apollo Server
  │
  ▼
Prisma + libSQL Adapter
  │
  ▼
Turso Database
```

Environment variables are used to keep credentials and sensitive configuration outside the source code.

## ⚙️ How to Run Locally

### Backend

```bash
cd backend
npm install
npm run prisma:generate
npm run dev
```

The backend runs locally on the configured development port.

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend uses the `VITE_BACKEND_URL` environment variable to connect to the GraphQL API.

## 🔐 Environment Variables

### Backend

The backend requires environment variables for:

* Database connection
* Turso authentication
* JWT configuration

These values must be stored in a local `.env` file and must not be committed to Git.

### Frontend

The frontend requires:

```env
VITE_BACKEND_URL=http://localhost:4000/graphql
```

For production, the variable points to the deployed backend GraphQL endpoint.

## 🧪 Validation

The application was manually validated in production, including:

* [x] Application loading
* [x] User registration
* [x] Login
* [x] Incorrect password handling
* [x] JWT-protected operations
* [x] Dashboard
* [x] Categories
* [x] Income transactions
* [x] Expense transactions
* [x] Transaction search
* [x] Transaction filters
* [x] Transaction pagination
* [x] Transaction editing
* [x] Transaction deletion
* [x] Logout
* [x] Password recovery
* [x] Password reset
* [x] Data persistence after refresh
* [x] Backend production build
* [x] Frontend production build

## ✨ Highlights

* Full Stack architecture using React and Node.js
* GraphQL API with Apollo Server and TypeGraphQL
* Layered backend architecture with resolvers and services
* Prisma ORM with Turso/libSQL
* JWT-based authentication
* Password recovery flow
* Transaction filtering and pagination
* Dashboard financial aggregations
* Responsive interface based on Figma
* Automated backend tests with Vitest
* Production deployment using Vercel

## 👩‍💻 Author

**Rosana Oliveira**

Full Stack Developer

React · TypeScript · JavaScript · Node.js · PHP · GraphQL · Prisma · MySQL · AWS
