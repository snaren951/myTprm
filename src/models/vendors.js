const mongoose = require("mongoose");
const vendorSchema = new mongoose.Schema({

    vendorName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20

    },
    vendorCategory:{
        type: String, 
        enum:{

            values: ["IT Services", "Hardware", "Cloud Provider","Essential Services"],
            message: `{VALUE} is not supported`
        }

    },
    url:{
        type:String,
        required: true

    },
    address:{
        type: String,
        required : true

    },
    taxId:{
        type: Number,
        required: true

    },
    servicesOffered:{
        type: String

    },
    vendorContacts:{
        type: [mongoose.Types.ObjectId],
        ref: "Users"

    }
    
}, {timestamps: true});

const Vendors = mongoose.model('Vendors', vendorSchema);

module.exports = Vendors;