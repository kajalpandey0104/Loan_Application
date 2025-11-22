**Loan Origination and Approval System**
This is a full-stack loan origination and approval system built with the MERN stack.

**Features**
User authentication (registration and login) with JWT.
Separate dashboards for customers and loan officers.
Customers can apply for loans.
Loan officers can view and manage loan applications.
RESTful API for managing users, loans, and customers.
**Technologies Used**
Frontend
React
Vite
React Router
Tailwind CSS
Axios
Backend
Node.js
Express
MongoDB (with Mongoose)
JSON Web Tokens (JWT)
bcrypt
**Project Structure**
The project has two main folders:

frontend – React application
Backend – Node.js/Express API

**Install backend dependencies:**

cd Backend
npm install
Create .env inside Backend:

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET
};

cd ../frontend
npm install
Running the Application
Start backend:
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


#  GitHub will now render everything correctly.

✔ Format your README into a **professional GitHub badge style**  
✔ Add images/screenshots  
✔ Add a project architecture diagram  


cd Backend
npm run dev
Prerequisites
Node.js & npm
MongoDB

