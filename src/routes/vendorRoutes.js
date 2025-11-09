const express = require("express");
const auth = require("../authentication/auth.js");

const vendorRouter = express.Router();

const Vendors = require("../models/vendors.js");

vendorRouter.post("/createVendor", auth, async function(req, res){

    try{

        const loggedInUser = req.user;

      if(!loggedInUser.userGroups.includes("Admin")){

        return res.status(401).send("Unauthorized Request - Only an Admin can create a vendor");
      }

    

        const {vendorName, vendorCategory, url, address, taxId, servicesOffered, vendorContacts} = req.body;

        const vendor = new Vendors({vendorName, vendorCategory, url, address, taxId, servicesOffered, vendorContacts});
        const dbresponse = await vendor.save();
        // console.log(vendor);
        // console.log(req.cookies);

       

        res.json (
           {
            message: "vendor Created Successfully",
            data: dbresponse

           });


    }
    catch(err){

        res.status(401).send("Something went wrong " + err.message);
    }

});



vendorRouter.get("/viewVendor", auth, async function(req, res){
try{

    const loggedInUser = req.user;
    const loggedInUserId = req.user._id;
    const userType = req.user.userType;

    //console.log("User Id: "+loggedInUserId);

    if (!userType || !loggedInUserId){

        return res.status(401).send("Invalid User");
    }

    let vendorsList;


  

   


    if (userType =="External"){

         vendorsList = await Vendors.find({vendorContacts:loggedInUserId});

    }

    else if (userType == "Internal"){

         vendorsList = await Vendors.find(); 

    }

    const msg =  vendorsList.length>0? "Vendor Data Retrieved Successfully" : "No Data Found";

      res.json({
            data: vendorsList,
            message: msg
        });


  


}

catch(err){

    res.status(401).send("something went wrong: " +err.message);
}

});





module.exports = vendorRouter;
