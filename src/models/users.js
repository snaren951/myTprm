const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true

    },
    lastName:{
        type:String,
        required: true

    },
    email:{
        type: String,
        unique: true,
        required: true

    },
    password:{
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true,
        enum:{
            values :["External", "Internal"],
            message: "{VALUE} is not supported"
        }
    },
    userGroups:{
        type: [String],
        enum:{
            values: ["Admin", "VendorManager","RiskManager","QA","Developer"],
            message: `{VALUE} is not supported`
        },
        required: function (){
         return this.userType === "Internal"

        }
    }

},
{ timestamps: true });

userSchema.methods.isPasswordMatchedMethod = async function (passwordFromRequest){
    const user = this;
    const matched = await bcrypt.compare(passwordFromRequest, user.password);
    return matched;


};

userSchema.methods.signJWTMethod = async function (){
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
    return token;

}

const Users = mongoose.model("Users", userSchema);



module.exports = Users;