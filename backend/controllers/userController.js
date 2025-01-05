const User = require('../models/User');
const { gentoken, decode } = require('../middlewares/authMiddleware')

// Register a new user
const registerUser = async (req, res) => {
    let { name, email, password } = req.body;

    try {
        const alreadyPresent = await User.findOne({ email: email });
        if (alreadyPresent) {
            return res.status(400).json({ error: "Another user with that email id already present" });
        }
        // Create a new user if not already present
        await User.create({
            name: name,
            email: email,
            password: password,
            trips: []
        });

        // Respond with a success message
        res.json({ message: "User registered successfully" });

    } catch (error) {
        // Handle any unexpected errors
        console.error(error);
        res.status(500).json({ error: "Error registering user" });
    }
};


// Log in a user
const loginUser = async (req, res) => {
    const {email, password} = req.body;

    let present  = await User.findOne({email : email, password : password});
    if(present){
        console.log(present);
        let token = gentoken({_id : present._id, email : email, password : password, trips : present.trips});
        res.cookie('authToken', token);
        res.json({
            message : "login successful",
            token : token
        });
    }
    else{
        res.status(401).json({error : "fuck error"});
    }

};


// Get user profile
const getUserProfile = async (req, res) => {
    if(req.cookies.authToken){
        const token = await req.cookies.authToken;
        res.json(decode(token));}
    else{
        res.json({error : "fuck error"});
    }
};


//signout
const signOut = async (req, res) => {
    //delete cookies
    const token = await req.cookies.authToken;
    if(token){
    res.clearCookie(token);
    res.status(201).json({success : "token deleted successfully"})
    }
    else{
        res.status(401).json({error : "error no token available"});
    }
}

module.exports = { registerUser, loginUser, getUserProfile, signOut };
