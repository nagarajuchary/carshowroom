const admin = require("mongoose")
const carData = new admin.Schema({
    userName:{
        type:String
    },
    password:{
        type:String
    },
    image:{
        type:String
    },
},
{timestamps:true}
);

module.exports = admin.model("admin",carData)
