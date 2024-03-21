const express = require("express");
const carmodel = require("../models/carmodel.js");

const route = express.Router();


// postmethod
route.post("/addCar",(req, res)=>{
    const addNewCar = new carmodel(req.body);
    addNewCar.save();
    res.status(201).json(addNewCar)
});

// get method
route.get("/allCarDetails", async (req, res)=>{
    try{
        const allCarDetails = await carmodel.find();
        res.status(201).json(allCarDetails)
    }catch(error){
        console.error("error");
        res.status(500).json()
    }
});

// putmethod
route.put("/editCarDetails/:id", async (req, res)=>{
    const editCar= await carmodel.findByIdAndUpdate(
        req.params.id,
        {$set:req.body},
        {new:true}
    )
    res.status(201).json(editCar)
} );
    
// deletemethod
route.delete("/deleteCarDetails/:id", async ( req, res)=>{
    const deleteCar=await carmodel.findByIdAndDelete(req.params.id);
    res.status(201).json(deleteCar)
});

module.exports= route;