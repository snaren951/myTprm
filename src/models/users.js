const mongoose = require("mongoose");
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
    VATID:{
        type: Number
        
    }

},{timeStamps: true});

const Users = mongoose.model("Users", userSchema);



module.exports = Users;