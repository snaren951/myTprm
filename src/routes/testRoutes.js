const express = require ("express");
const testRouter = express.Router();

console.log("This is from the testroutes.js file");

testRouter.post("/test", async function(req, res){

    console.log("This is from the test Router Signup api");
    res.send("Test Signup Executed");
})





module.exports = testRouter;