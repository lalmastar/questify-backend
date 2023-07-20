const mongoose = require("mongoose");
require("dotenv").config()

const connectMongo=async ()=>{
   await mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log("connected to MongoDB");
    })
    .catch(err=>console.log(err.message))
}

module.exports=connectMongo;