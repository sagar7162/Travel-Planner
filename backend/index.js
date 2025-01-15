const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const tripRoutes = require('./routes/tripRoutes');
const subDestRoutes = require('./routes/subDestRoutes');
const socketHandler = require('./controllers/chatController');
const cors = require('cors'); // Import the cors package

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

app.use((req, res, next) => {
    console.log("Received Cookies:", req.cookies);
    next();
});

app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from your frontend
    credentials: true, // Important for cookies, authorization headers with frontend
}));

// Connect to MongoDB
connectDB().then(() => {
    console.log("MongoDB Connected successfully");

    // Now that DB is connected, continue with routes
    app.use('/api', [userRoutes, tripRoutes, subDestRoutes]);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit process with failure
});


