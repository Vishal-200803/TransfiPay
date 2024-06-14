const mongoose = require("mongoose")
require("dotenv").config();
exports.connect = () =>{
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log("DB connection Sucessfult"))
    .catch( (error)=>{
        console.log("DB connection issues")
        console.log(error);
        process.exit(1);
    })
}