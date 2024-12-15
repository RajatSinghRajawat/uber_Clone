const mongoose = require('mongoose')




const databaseConfig = ()=>{
    mongoose.connect("mongodb://localhost:27017/uberDatabase").then(()=>{
        console.log("database connected successfully");
        
    }).catch(()=>{
        console.log("databse not connectd !");
        
    })
}

module.exports = databaseConfig