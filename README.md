
# Travel Planner

Travel Planner is a full-stack web application designed to help users plan and manage trips collaboratively. The platform provides intuitive trip creation, sub-destination management, expense tracking, and real-time chat functionality, making trip planning engaging and efficient.

---

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

---

## Features

- **User Authentication:** Secure registration and login with JWT-based authentication and cookie sessions.
- **Trip Management:** Create, update, and delete trips. Invite collaborators and manage trip details.
- **Sub-destination Management:** Add, edit, and delete sub-destinations for detailed itinerary planning.
- **Real-time Chat:** Communicate with fellow trip members in dedicated chat rooms using Socket.IO.
- **Expense Tracking:** (Optional) Monitor and manage shared trip expenses.
- **Responsive Design:** Modern, responsive user interface built with React and styled with Tailwind CSS.

---

## Technologies

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Real-time Communication:** Socket.IO
- **Authentication:** JSON Web Tokens (JWT)

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v12 or higher)
- [MongoDB](https://www.mongodb.com/) (local instance or cloud-based)

### Clone the Repository

```bash
git clone https://github.com/sagar7162/Travel-Planner.git
cd travel-planner
```

### Backend Setup

1. Navigate to the backend directory (if applicable):
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm start
   ```
4. Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Configuration

- **CORS:** The backend is configured to accept requests from `http://localhost:3000`. Adjust the CORS settings in your backend if needed.
- **Socket.IO:** Ensure that the Socket.IO server URL in your frontend matches your backend URL.

---

## Usage

1. **Sign Up / Log In:** Create an account or log in to access your dashboard.
2. **Trip Management:** Create new trips, invite users, and manage trip details.
3. **Sub-destinations:** Add specific sub-destinations with descriptions to plan your itinerary.
4. **Real-time Chat:** Use the integrated chat feature to communicate with trip participants.

---

## API Endpoints

### Authentication

- `POST /api/users/signup` — Register a new user.
- `POST /api/users/login` — Log in an existing user.

### Trip Management

- `GET /api/trip` — Retrieve trips for the logged-in user.
- `POST /api/trip/new` — Create a new trip.
- `PUT /api/trip/:id/users` — Add users to a trip.
- `DELETE /api/trip/:id/trip` — Delete a trip.

### Sub-destination Management

- `PUT /api/trip/:id/newsubdest` — Add a new sub-destination.
- `PUT /api/trip/:id/editsubdest` — Edit an existing sub-destination.
- `DELETE /api/trip/:id/delsubdest` — Delete a sub-destination.

### Real-time Chat (Socket.IO)

- **Events:**
  - `joinRoom` — Join a chat room for a specific trip.
  - `chatMessage` — Send a chat message.
  - `newMessage` — Receive new chat messages.
  - `previousMessages` — Retrieve past chat messages when joining a room.

---

## Contributing

Contributions are welcome! If you'd like to improve the project or fix a bug, please open an issue or submit a pull request.

---
