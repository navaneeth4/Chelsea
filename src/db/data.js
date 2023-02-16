const { text } = require("express")
const mongoose=require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/Chelsea')


const cfc = mongoose.model('cfc',{
    name:{
        type:String
    },
    age:{
        type:Number
    },
    position:{
        type:String
    },
    nationality:{
        type:String
    }

})
module.exports=cfc
