const express = require ("express");
const adminModel = require ("../models/adminModel.js");
const multer = require ("multer");
const aroute = express.Router();

const storage = multer.diskStorage({
    destination:"selectphoto/",
    filename:( req, file, pic) => { pic (null, file.originalname)},
});

const pics = multer({ storage});


// postmethod

aroute.post("/addAdminDetails", pics.single("file"), (req, res)=>{

    if(!req.file){
        return res.status(400).json({error:"no file"})
    }

    var data = {
        
    }
    const addDetails = new adminModel(req.body);
    addDetails.save();
    res.status(201).json(addDetails)
});


// getmethod

aroute.get("/adminDetails", async (req, res)=>{
    try{
        const adminDetails = await adminModel.find();
        res.status(201).json(adminDetails)
    }
        catch(error){
            console.log("error");
            res.status(500).json()
        }

});

module.exports = aroute;
