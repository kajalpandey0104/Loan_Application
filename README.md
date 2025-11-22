# Loan Origination and Approval System

This is a full-stack loan origination and approval system built with the MERN stack.

## Features

- User authentication (registration and login) with JWT.
- Separate dashboards for customers and loan officers.
- Customers can apply for loans.
- Loan officers can view and manage loan applications.
- RESTful API for managing users, loans, and customers.

## Technologies Used

### Frontend
- React
- Vite
- React Router
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT)
- bcrypt

## Project Structure

The project has two main folders:

- `frontend` – React application  
- `Backend` – Node.js/Express API  

## Getting Started

### Prerequisites
- Node.js & npm
- MongoDB

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/loan-origination-system.git
    cd loan-origination-system
    ```

2. Install backend dependencies:
    ```bash
    cd Backend
    npm install
    ```

3. Create `.env` inside Backend:
    ```
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/loan_system
    JWT_SECRET=your_jwt_secret
    ```

4. Install frontend dependencies:
    ```bash
    cd ../frontend
    npm install
    ```

## Running the Application

### Start backend:
```bash
cd Backend
npm run dev
cd frontend
npm run dev


### API Endpoints
POST /api/auth/register

POST /api/auth/login

GET /api/customer/profile

POST /api/loans/apply

GET /api/loans/status

GET /api/officer/applications

PUT /api/officer/applications/:id

yaml
Copy code

---

# 🎉 GitHub will now render everything correctly.

If you want, I can:

✔ Format your README into a **professional GitHub badge style**  
✔ Add images/screenshots  
✔ Add a project architecture diagram  

Just tell me!







cd Backend
npm run dev
