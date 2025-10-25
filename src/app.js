const express = require("express");

const app = express();

app.get("/api", function (req, res, next){

    console.log("This is the route for the API");
    //res.send ("API sent the response");
    next();
});



app.use ("/", function (req, res, next){

    console.log("Hit the 2nd Route");
    //res.send ("I am the second route");
    next();
});

app.get("/", function (req, res, next){
    console.log("Hit the 1st route");
    res.send (" I am the first route");
    //next();
});




app.listen(8888, function (req, res){

    console.log ("server is listenining");
    
});
