const express = require ("express");
const userRouter = express.Router();
const Users = require("../models/users.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validate = require ("../utils/validate.js");


//console.log("This is from the user Routes.js file");

userRouter.post("/signup", async function (req, res){

try{
    //console.log("Signup end point is requested");

  

    const {firstName, lastName, email,userType, password, userGroups}= req.body;
    const passwordHash =  await bcrypt.hash(password, 11);
    //console.log("Password Hash is "+ passwordHash);
    const user = new Users({
        firstName,
        lastName,
        email,
        userType,
        userGroups,
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

userRouter.post("/login",async function(req, res){

    try{
        validate(req);
        const email = req.body.email;
        const password = req.body.password;

        const user = await Users.findOne({email: email});
      if(!user){

        return res.status(401). send ("Invalid email address");
      }
      const isPasswordMatched= await user.isPasswordMatchedMethod(password);

     if (!isPasswordMatched){

        return res.status(401).send("Invalid credentials");
     }

     //when there is a user with the given email and the password is matched 
     //generate a token and share it via a cookie

     const token = await user.signJWTMethod();
     res.cookie("token", token);
     res.send("Login Successful");
        


    }
    catch(err){
        res.status(401).send("Somethign went wrong. "+err.message);


    }

});

module.exports = userRouter;