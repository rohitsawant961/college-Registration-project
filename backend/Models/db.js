const mongo = require("mongoose");

mongo.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.15",{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log("mongo connected !!!")
    }).catch((err)=>{
        console.log("mongo connection error :", err);
    })
    