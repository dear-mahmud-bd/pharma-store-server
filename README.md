

# Medicine Store - Backend [API](https://pharma-server-07.vercel.app/)

## 🚀 Project Overview

The **Medicine Store Application** backend is built using **Node.js, Express.js, and MongoDB**. It provides secure authentication, manages medicines, handles orders, and integrates with **payment gateways**.


## 🔗 Live Demo
- **Live Application**: [Visit Here](https://pharma-client-07.vercel.app/)
- **Live Server**: [Visit Here](https://pharma-server-07.vercel.app/)
- **Frontend Repository**: [GitHub URL](https://github.com/dear-mahmud-bd/pharma-store-client)

## 🎯 Features
### 🔐 Authentication & Authorization
- Secure user registration with hashed passwords
- JWT-based authentication for session management
- Role-based access control (User, Admin)

### 🌍 Public Routes
- **Medicine Listing:** View available medicines
- **Medicine Details:** View medicine specifications

### 🔒 Private Routes
- **Order Medicines:** Secure order placement
- **User Dashboard:** View past orders
- **Admin Dashboard:** Manage medicines, orders, and users

### 💳 Payment Integration
- Supports **SSLCommerz** payment gateways.
- Secure payment processing

### 📊 Admin Features
- **Order Management**: Track and update orders
- **Stock Management**: Add, update, and remove medicines
- **Sales Dashboard**: Overview of revenue and sales trends

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT, bcrypt.js
- **Validation:** Zod
- **Payment Integration:** SSLCommerz
- **API Documentation:** Postman

## 📂 Folder Structure
```
backend/
│── src/
│   ├── app/
│   │   ├── config/             # Environment variables and configurations
│   │   ├── errors/             # Manage all type of errors
│   │   ├── interface/          # Global declaretion
│   │   ├── middlewares/        # Authentication & validation middleware
│   │   ├── models/             # Mongoose schemas
│   │   ├── routes/             # API routes
│   │   ├── utils/              # Helper functions
│   ├── app.ts              # Express app setup
│   ├── server.ts           # Server entry point
│── .env                    # Environment variables
│── package.json            # Dependencies & scripts
│── README.md               # Project documentation
```
---

## 🔧 Installation & Setup (Locally)

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/dear-mahmud-bd/pharma-store-server.git
cd pharma-store-server
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file and configure:

```
NODE_ENV=development
PORT=5000
DATABASE_URL=mongodb+srv://YOUR_USER_NAME:YOUR_PASS@cluster0.f86zk.mongodb.net/YOUR_STORE_NAME?retryWrites=true&w=majority&appName=Cluster0
BCRYPT_SALT_ROUNDS=YOUR_SECRET_SALT_ROUND
JWT_ACCESS_TOKEN=YOUR_SECRET_TOKEN
JWT_ACCESS_TOKEN_EXPIRES=YOUR_RECOMENDED_TIME
JWT_REFRESH_TOKEN=YOUR_SECRET_TOKEN
JWT_REFRESH_TOKEN_EXPIRES=YOUR_RECOMENDED_TIME
SSLCOMMERZ_STORE_ID=YOUR_SSLCOMMERZ_STORE_ID
SSLCOMMERZ_STORE_PASSWORD=YOUR_SSLCOMMERZ_STORE_PASSWORD

```

### 4️⃣ Run the Server

```sh
npm run dev
```
The server will be available at `http://localhost:5000/`

---

## 🔌 API Endpoints
### Authentication Routes
| Method | Endpoint           | Description       |
|--------|-------------------|-------------------|
| POST   | `/api/auth/register`    | Register a user  |
| POST   | `/api/auth/login`     | User login       |
| GET    | `/api/auth/my-profile`        | Get user details |

### Medicine Routes
| Method | Endpoint           | Description          |
|--------|-------------------|----------------------|
| GET    | `/api/medicine`      | Get all medicines   |
| GET    | `/api/medicine/:id`  | Get medicine details |
| POST   | `/api/medicine`      | Add a new medicine  |
| PATCH  | `/api/medicine/:id`  | Update medicine     |
| DELETE | `/api/medicine/:id`  | Delete medicine     |

### Order Routes
| Method | Endpoint        | Description        |
|--------|----------------|--------------------|
| POST   | `/api/order`      | Place an order    |
| GET    | `/api/order`      | Get all orders   |
| GET    | `/api/order/:id`  | Get order details |

---

## 🚀 Deployment
### Deploy on Vercel
```sh
vercel deploy --prod
```