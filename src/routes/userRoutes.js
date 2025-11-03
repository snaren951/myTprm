const express = require ("express");
const userRouter = express.Router();
const Users = require("../models/users.js");
const bcrypt = require("bcrypt");

//console.log("This is from the user Routes.js file");

userRouter.post("/signup", async function (req, res){

try{
    //console.log("Signup end point is requested");

  

    const {firstName, lastName, email,userType, VATID, password}= req.body;
    const passwordHash =  await bcrypt.hash(password, 11);
    //console.log("Password Hash is "+ passwordHash);
    const user = new Users({
        firstName,
        lastName,
        email,
        userType,
        VATID,
        password: passwordHash
    });
    await user.save();

    res.send("User Created Successfully");


}
catch(error){
    //console.log("Catch block executed. "+error.message);

    res.status(400).send("Something went wrong: " + error.message);
}


});

module.exports = userRouter;