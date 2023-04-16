const mongooes = require('mongoose');
const usrschema = new mongooes.Schema({
     
     ranking:{
        type:Number,
        required:true,
        unique:true
     },
     name:{
        type:String,
        required:true,
        trim:true
     },
    country: {
        type:String,
        required:true,
        trim:true
     },
     score:{
        type:Number,
        require:true,
        trim:true
     },
     event:{
        type:String,
        require:true,
        default:"100m" 
     },
    
});

const userRanking = new mongooes.model("UserRanking",usrschema);

 module.exports = userRanking;