const express = require("express");
const adminModel = require("../models/adminModel.js");
const multer = require("multer");
const aroute = express.Router();
const jwt = require("jsonwebtoken");;
const verifyToken = require("../jwt/jwtoken.js")



const storage = multer.diskStorage({
    destination: "selectphoto/",
    filename: (req, file, pic) => { pic(null, file.originalname) },
});

const pics = multer({ storage });


// postmethod for multer/fileupload

aroute.post('/addadmindetails', pics.single("file"), async (req, res) => {
    const add = new adminModel(req.body);
    add.save();
    res.status(201).json(add);

    if (!req.file) {
        return res.status(400).json({ error: "no file" })
    }

    // this is converted to form data

    const userData = {
        username: req.body.username,
        photo: req.file.filename,
    };

    try {
        const profile = new adminModel(userData);
        profile.save();
        return res.status(201).json(profile)
    } catch (err) {
        return res.status(500).json({ err });
    }

});

aroute.post("/login", async (req, res) => {
    try {
        const User = await
            adminModel.findOne({ "username": req.body.username, "password": req.body.password })
        if (!User) {
            res.status(404).json('user not found')
        }
        const secretkey = 'my-secretkey';
        const token = jwt.sign({ "username": req.body.username, "password": req.body.password }, secretkey, { expiresIn: '1h' })
        res.status(201).json({ User, token })

    } catch (err) {
        res.status(500).json({ err: 'User login failed' })
    }
});


// getmethod for JWT

aroute.get("/adminDetails", verifyToken, async (req, res) => {
    try {
        const adminDetails = await adminModel.find();
        res.status(201).json(adminDetails)
    }
    catch (error) {
        console.log("error");
        res.status(500).json()
    }

});
aroute.get("/authors", verifyToken, async (req, res) => {

    try {
        const admins = await adminModel.find();
        res.status(201).json(admins)
    } catch (error) {
        res.status(500).json("server error")
    }

})

module.exports = aroute;
