const dbConnect = require("./config/dbconnection.js");
const express = require ("express");
const app = express();
require("dotenv").config();

dbConnect().then(()=>{
    console.log("DB is connected successfully");

app.listen(8888, function (){
    console.log("Server is listening on port 8888");
});

}).
catch (err => {
    console.log("Error in connecting to the DB");
});
