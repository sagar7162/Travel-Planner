const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config()

const pvtkey = process.env.JWT_PRIVATE_KEY;

var gentoken = (object)=>{
    return jwt.sign(object, pvtkey)
};

var decode = (string)=>{
    return jwt.verify(string, pvtkey)
};

module.exports = {gentoken, decode}