
const jwt = require("jsonwebtoken");

const Users = require("../models/users.js");

const auth = async function (req, res, next){

 try {
const cookies = req.cookies;

const token = cookies.token;
if(!token){

    return res.status(401).send("Token Invaid or missing");
}

const secret = jwt.verify(token, process.env.JWT_SECRET);


const userId = secret._id;

const dbUser = await Users. findOne({_id: userId}).select("firstName lastName userGroups userType");


//console.log("Secret revealed successfully - Valid User");
req.user = dbUser;
next();

}

 
 catch (err){

    res.status(401).send("Something went wrong - Invaid Token "+err.message);
 }

}

module.exports = auth;
