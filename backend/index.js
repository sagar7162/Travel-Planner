const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const tripRoutes = require("./routes/tripRoutes");
const subDestRoutes = require("./routes/subDestRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const socketHandler = require("./controllers/chatController");
const cors = require("cors");

dotenv.config();
console.log("Environment variables loaded:", process.env);

const app = express();
const server = http.createServer(app);

// CORS should be first
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
    exposedHeaders: ["Set-Cookie"],
  })
);

// Then other middleware
app.use(cookieParser());
app.use(express.json());

app.use((req, res, next) => {
  console.log("backend running!");
  next();
});

app.use((req, res, next) => {
  console.log("Received Cookies:", req.cookies);
  next();
});

// Socket setup
socketHandler(server);

// Routes
app.use("/api", [userRoutes, tripRoutes, subDestRoutes, expenseRoutes]);

// Connect to MongoDB and start server
connectDB()
  .then(() => {
    console.log("MongoDB Connected successfully");

    const PORT = process.env.PORT || 7162;
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });
