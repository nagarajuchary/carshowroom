const express = require("express");
const mongoose = require("mongoose");

const route = require("./routes/carroutes.js");
const aroute = require("./routes/adminRoute.js")

const car=express();

car.use(express.json());

const port = 4001;
const url = "mongodb://localhost:27017/carshowroom";
car.listen( port, (req , res)=>{
    console.log("",port);
})

mongoose 
.connect(url).then(console.log("db connected")).catch((err)=>{
    console.log("error", err);
})


car.use("/car",route)
car.use("/admin",aroute)


