const mongoose = require("mongoose");

const dbConnect = async function () {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);

};

module.exports = dbConnect;