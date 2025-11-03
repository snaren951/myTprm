const dbConnect = require("./config/dbconnection.js");
const Users = require("./models/users.js");
const express = require ("express");
const app = express();
const userRouter = require("./routes/userRoutes.js");
const testRouter = require("./routes/testRoutes.js");
require("dotenv").config();


dbConnect().then(()=>{
    console.log("DB is connected successfully");

app.listen(process.env.PORT, function (){
    console.log("Server is listening on port ");
});

}).
catch (err => {
    console.log("Error in connecting to the DB");
});
app.use(express.json());

app.use("/",userRouter);
//app.use("/",testRouter);









