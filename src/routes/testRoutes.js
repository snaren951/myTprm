const express = require ("express");
const testRouter = express.Router();

console.log("This is from the testroutes.js file");

testRouter.use("/", async function(req, res){

    console.log("This is from the test Router CatchAll api");
    res.send("Test Catch Route Executed");
})





module.exports = testRouter;