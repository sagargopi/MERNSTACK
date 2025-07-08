# IRCTC Food Pantry - MERN Stack Application

A full-stack food ordering and management system built with the MERN stack (MongoDB, Express.js, React, Node.js).

## 🚀 Features

- **User Authentication**
  - Secure user registration and login
  - Role-based access control (Admin/User)
  - JWT authentication

- **Food Ordering**
  - Browse food menu
  - Add items to cart
  - Place orders
  - Order history

- **Admin Dashboard**
  - Manage food items
  - View and manage orders
  - User management

- **Responsive Design**
  - Mobile-friendly interface
  - Clean and intuitive UI

## 🛠 Tech Stack

- **Frontend**:
  - React.js
  - React Router for navigation
  - Context API for state management
  - Axios for API calls
  - Tailwind CSS for styling

- **Backend**:
  - Node.js with Express.js
  - MongoDB with Mongoose ODM
  - JWT for authentication
  - Multer for file uploads

- **Development Tools**:
  - Vite for frontend build tooling
  - Nodemon for development server
  - Postman for API testing

## 📦 Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB Atlas account or local MongoDB installation

## 🚀 Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../IrctcFoodPantry
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📂 Project Structure

```
MERNSTACK/
├── IrctcFoodPantry/      # Frontend React application
│   ├── public/           # Static files
│   └── src/              # React source code
│       ├── components/   # Reusable UI components
│       ├── context/      # React context providers
│       ├── pages/        # Page components
│       ├── App.jsx       # Main App component
│       └── main.jsx      # Entry point
│
├── backend/              # Backend Node.js/Express application
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Custom middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── server.js        # Server entry point
│
└── admin/               # Admin dashboard (React)
```

## 🔧 Environment Variables

### Backend (`.env`)
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [React Icons](https://react-icons.github.io/react-icons/) - Popular icons for React
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework

---

<div align="center">
  Made with ❤️ using the MERN stack
</div>
