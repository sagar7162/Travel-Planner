const User = require("../models/User");
const { gentoken, decode } = require("../middlewares/authMiddleware");

// Register a new user
const registerUser = async (req, res) => {
  let { name, email, password } = req.body;

  try {
    const alreadyPresent = await User.findOne({ email: email });
    if (alreadyPresent) {
      return res
        .status(400)
        .json({ error: "Another user with that email id already present" });
    }
    await User.create({
      name: name,
      email: email,
      password: password,
      trips: [],
    });
    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error registering user" });
  }
};

// Log in a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let present = await User.findOne({ email: email, password: password });
    if (present) {
      console.log(present);
      let token = gentoken({
        _id: present._id,
        email: email,
        password: password,
        trips: present.trips,
      });

      // Corrected cookie settings
      res.cookie("authToken", token, {
        // httpOnly: true,  // Removed to allow client-side access
        secure: true,  // Required for cross-origin cookies
        sameSite: 'none',  // Required for cross-origin cookies
        path: '/',  // Explicit path
        maxAge: 3600000, // 1 hour
      });

      res.json({
        message: "login successful",
        token: token,
      });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    if (req.cookies.authToken) {
      const token = req.cookies.authToken;
      const decoded = decode(token);
      res.json(decoded);
    } else {
      res.status(401).json({ error: "No authentication token found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//signout
const signOut = async (req, res) => {
  try {
    // Correct way to clear the cookie
    res.cookie('authToken', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      expires: new Date(0)
    });
    res.status(200).json({ success: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { registerUser, loginUser, getUserProfile, signOut };