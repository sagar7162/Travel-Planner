const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const tripRoutes = require('./routes/tripRoutes');
const socketHandler = require('./controllers/chatController');

dotenv.config()
console.log("Environment variables loaded:", process.env);

const app = express();
const server = http.createServer(app);

//socket
socketHandler(server);


app.use(cookieParser());
app.use(express.json());

// Middleware
app.use((req, res, next) => {
    console.log("backend running!");
    next();
});

// Connect to MongoDB
connectDB().then(() => {
    console.log("MongoDB Connected successfully");

    // Now that DB is connected, continue with routes
    app.use('/api', [userRoutes, tripRoutes]);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit process with failure
});


