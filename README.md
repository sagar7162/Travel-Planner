
# Travel Planner

Travel Planner is a full-stack web application designed to help users plan and manage trips collaboratively. The platform provides intuitive trip creation, sub-destination management, expense tracking with split functionality, and real-time chat communication, making group travel planning engaging and efficient.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Features

- **User Authentication:** Secure registration and login with JWT-based authentication and cookie sessions.
- **Trip Management:** Create, update, and delete trips. Invite collaborators and manage trip details.
- **Sub-destination Management:** Add, edit, and delete sub-destinations for detailed itinerary planning.
- **Expense Management:** Track, split, and manage shared trip expenses with a detailed breakdown view.
- **Real-time Chat:** Communicate with fellow trip members in dedicated chat rooms.
- **Responsive Design:** Modern, responsive user interface built with React and styled with Tailwind CSS.

## Technologies

### Frontend
<div align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios" />
  <img src="https://img.shields.io/badge/Socket.io_Client-010101?style=for-the-badge&logo=socket.io&logoColor=white" alt="Socket.io Client" />
</div>

- React (v19.0) for building the user interface
- Tailwind CSS for styling and responsive design
- Axios for handling API requests
- js-cookie for managing authentication cookies
- Socket.io-client for real-time communication

### Backend
<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white" alt="Socket.io" />
</div>

- Node.js with Express.js for API server
- MongoDB with Mongoose ORM for database
- JSON Web Tokens (JWT) for secure authentication
- Socket.IO for real-time communication
- Cookie-parser for handling HTTP cookies

## Installation

### Prerequisites

- Node.js (v12 or higher)
- MongoDB (local instance or Docker container)

### Clone the Repository

```bash
git clone https://github.com/yourusername/Travel-Planner.git
cd Travel-Planner
```

### Install Dependencies

For Backend:
```bash
cd backend
npm install
```

For Frontend:
```bash
cd client
npm install
```

## Configuration

### Backend Configuration
Create a `.env` file in the backend directory with the following variables:

```bash
PORT=7162
MONGO_URI=mongodb://localhost:27017/travelplanner
JWT_PRIVATE_KEY=your_jwt_secret_key
```

### Frontend Configuration
The frontend is configured to connect to the backend at `http://localhost:7162/api`. If you need to change this, update the baseURL in `/client/src/utils/axios.js`.

## Usage

### Running the Application

1. **Start MongoDB** (if using local instance):
```bash
# If using Docker
docker run --name mongodb -d -p 27017:27017 mongo
```

2. **Start the Backend**:
```bash
cd backend
npm run dev
```
You should see: `Server running on port 7162` and `MongoDB Connected successfully`

3. **Start the Frontend**:
```bash
cd client
npm start
```

4. **Access the Application**:
   - Open `http://localhost:3000` in your browser
   - Register a new account or log in with existing credentials
   - Start creating and managing your trips!

### Key Workflows

1. **Creating a Trip**:
   - Click "Create Trip" in the sidebar
   - Enter trip details (name, dates)
   - Submit the form

2. **Adding Users to a Trip**:
   - Select a trip from the sidebar
   - Click "Add People" button
   - Enter email addresses (comma-separated)

3. **Managing Expenses**:
   - Select a trip
   - Click "Add Expense" to create new expenses
   - Click "Expense Break-Up" to view expense summary

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/register` | Register a new user |
| `POST` | `/api/login` | Login an existing user |

### Trip Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/trip` | Get all trips for the logged-in user |
| `POST` | `/api/trip/new` | Create a new trip |
| `PUT` | `/api/trip/:id/users` | Add users to a trip |
| `GET` | `/api/trip/:id/users` | Get all users for a specific trip |
| `DELETE` | `/api/trip/:id/trip` | Delete a trip |

### Sub-destinations
| Method | Endpoint | Description |
|--------|----------|-------------|
| `PUT` | `/api/trip/:id/newsubdest` | Add a new sub-destination |
| `GET` | `/api/trip/:id/subdestinations` | Get all sub-destinations for a trip |

### Expense Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/trip/:id/expense` | Add a new expense |
| `GET` | `/api/trip/:id/expenses` | Get all expenses for a trip |
| `PUT` | `/api/expense/:expenseId` | Update an expense |
| `DELETE` | `/api/expense/:expenseId` | Delete an expense |

### Real-time Chat (Socket.IO Events)
| Event | Description |
|-------|-------------|
| `joinRoom` | Join a chat room for a specific trip |
| `chatMessage` | Send a chat message |
| `newMessage` | Receive new chat messages |
| `previousMessages` | Retrieve past chat messages when joining a room |

### Features Completed

- ✅ **User Authentication**: Secure login/registration system with JWT
- ✅ **Trip Management**: Create, view, and delete trips 
- ✅ **Collaborative Planning**: Add users to trips by email
- ✅ **Sub-destination Management**: Add detailed locations within trips
- ✅ **Expense Tracking**: Add, split, and manage trip expenses
- ✅ **Expense Analytics**: View detailed expense breakdowns and summaries
- ✅ **Real-time Chat**: Communicate with trip members in real-time

### Development Roadmap

While all core features are implemented and the application is fully functional, here are some potential future enhancements:

- 🔲 Trip activity timeline
- 🔲 Interactive maps for visualizing destinations
- 🔲 Email notifications for trip updates
- 🔲 File/image sharing for trip documents
- 🔲 Travel checklist functionality

---

<div align="center">
  <p>Built with ❤️ by Sagar</p>
  <p>© 2025 Travel Planner</p>
</div>
