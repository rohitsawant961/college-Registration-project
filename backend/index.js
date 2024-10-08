const express = require("express");
const app =express();
const bodyParser = require("body-parser"); //body parser for changing the format to JSON
const login_router = require("./Routes/Login.js");//router that handles login
const cors = require("cors")//cors that helps as an intermediate between web IP and local IP
require("dotenv").config();//loads the environmenr variable for this code its port 8080
require("./Models/db.js");//Initializes database connection.

const PORT =process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

app.use("/shreyapp",login_router);


app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})