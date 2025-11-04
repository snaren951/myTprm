const express = require("express");

const vendorRouter = express.Router();

const Vendors = require("../models/vendors.js");

vendorRouter.post("/createVendor", async function(req, res){

    try{

        const {vendorName, vendorCategory, url, address, taxId, servicesOffered, vendorContacts} = req.body;

        const vendor = new Vendors({vendorName, vendorCategory, url, address, taxId, servicesOffered, vendorContacts});
        const dbresponse = await vendor.save();

        //console.log(dbresponse);

        //console.log(await dbresponse.populate("vendorContacts", "firstName lastName email"));

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

module.exports = vendorRouter;
