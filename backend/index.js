const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');

dotenv.config();
console.log("Environment variables loaded:", process.env);

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use((req, res, next) => {
    console.log("backend running!");
    next();
});

// Middleware

// Connect to MongoDB
connectDB().then(() => {
    console.log("MongoDB Connected successfully");

    // Now that DB is connected, continue with routes
    console.log("reached 24");
    app.use('/api', userRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit process with failure
});
