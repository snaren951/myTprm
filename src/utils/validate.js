const validator = require ("validator");

const validate= function (req){

    const email = req.body.email;
        const password = req.body.password;

        if (!validator.isEmail(email)){
            throw new Error("Email is not valid");
        }

        if(!password){
            throw new Error ("Please provide the password");
        }


}

module.exports = validate;


