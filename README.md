# trueNest 🏡

A full-stack MERN application for discovering, listing, and managing rental properties with ease.  
Built with **MongoDB, Express, React, and Node.js**, trueNest provides a seamless experience for both tenants and landlords.  

---

## ✨ Features
- 🔑 User authentication & role-based access (JWT-based)
- 🏘️ Add, edit, and delete property listings with images and details
- 🔍 Search and filter properties by location, price, and features
- ❤️ Save and manage favourite properties
- 📱 Responsive, mobile-friendly design with Tailwind CSS
- ⚡ RESTful API with secure CRUD operations

---

## 🛠️ Tech Stack
- **Frontend:** React, Tailwind CSS, Axios  
- **Backend:** Node.js, Express  
- **Database:** MongoDB (Mongoose ODM)  
- **Authentication:** JWT + bcrypt  
- **Deployment:** Render  

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)  
- MongoDB (local or Atlas)  

### Clone the Repository
```bash
git clone https://github.com/rem422/trueNest.git
cd trueNest

### Backend Setup
cd server
npm install

### Create a .env file in the server directory with:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

### Run the backend:
npm run dev

### Frontend Setup:
cd client
npm install
npm run dev

### 📂 Project Structure
trueNest/
│── client/         # React frontend
│── server/         # Express backend
│── README.md

### 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to improve.

Made with ❤️ by Rem Simiyu