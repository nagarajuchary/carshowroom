const showroom = require ('mongoose');

const carData = new showroom.Schema({
    carName:{
        type:String
    },
    carModel:{
        type:String
    },
    carColor:{
        type:String
    },
    carPrice:{
        type:String
    },
    carDescription:{
        type:String
    },
},
{timestamps:true}
);
module.exports = showroom.model("carDetails", carData)