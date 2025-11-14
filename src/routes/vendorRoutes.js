const express = require("express");
const auth = require("../authentication/auth.js");
const multer = require("multer");
const upload = multer({dest:'tempFiles/'});
const fs = require ("node:fs");
const csv = require ("csv-parser");

const vendorRouter = express.Router();

const Vendors = require("../models/vendors.js");
const { skip } = require("node:test");

vendorRouter.get("/vendor/:id", async function (req, res){

    console.log(req.body);


    console.log("for the /vendor ID route");
    res.send("Form the vendor ID route");

});

vendorRouter.get("/vendor", async function (req, res){


    console.log("for the /vendor route");
    res.send("From the vendor Route");

});





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

    const pageNumber = req.query.pageNumber;
    //console.log(pageNumber);

    const page = (pageNumber != undefined && pageNumber!=0)? pageNumber : 1;
    console.log(page);

   const limit = req.query.limit;
   const limitCount = (limit!= undefined ||limit != 0)?limit:null;

    //const limitCount=(limit)

    
    //const limitCount =3;
    const skipCount = (page-1)*limitCount;

    //console.log("User Id: "+loggedInUserId);

    if (!userType || !loggedInUserId){

        return res.status(401).send("Invalid User");
    }

    let vendorsList;


  

   


    if (userType =="External"){

         vendorsList = await Vendors.find({vendorContacts:loggedInUserId}).skip(skipCount).limit(limitCount);
         

    }

    else if (userType == "Internal"){

         vendorsList = await Vendors.find().skip(skipCount).limit(limitCount); 

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

vendorRouter.put("/bulkUpdateVendors", auth, upload.single('file'), async function (req, res){

    try{


        const loggedInUser = req.user;

        if(!loggedInUser.userGroups.includes("Admin")){

        return res.status(401).send("Unauthorized Request - Only an Admin can create a vendor");
      }

      

  if (!req.file){

    return res.status(400).send("No File uploaded");
  }

      const filePath = req.file.path;
      const results = [];

      fs.createReadStream(filePath).pipe(csv())
        .on('data', (row)=>{
            //console.log("reading the file");
            results.push(row);
        })
        .on('end', async ()=>{
            //console.log("File reading completed");
            //Iniitating the DB search and upadte by ID process
            const resultAfterUpdate=[];

            for (let i=0; i<results.length; i++){

                try{

                    const vendorToUpdate = await Vendors.findOneAndUpdate({_id:results[i]._id}, {vendorName: results[i].vendorName, address:results[i].address}, {new:true});
                    resultAfterUpdate.push(vendorToUpdate);
                }

                catch(err){

                    return res.status(400).send("Error in saing the record to DB: "+err);
                }
                
            }
           const totalUpdated = resultAfterUpdate.length;
            res.json({data: resultAfterUpdate, message: `${totalUpdated} records updated successfully`});

        
        
        
        })
        .on('error', ()=>console.log("Error in Reading the file"));

      
      
      
     
     


    }

    catch(err){

        res.status(401).send("Something went wrong. "+err);
    }


});




module.exports = vendorRouter;
