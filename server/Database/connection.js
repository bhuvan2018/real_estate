// mongodb+srv://bhuvanshetty2018:Bhuvan2018%40@cluster0.tkkt7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const mongoose = require('mongoose');
function RunServer(){
    try{
        mongoose.connect('mongodb+srv://bhuvanshetty2018:Bhuvan2018%40@cluster0.tkkt7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log('mongoose connected')
    }catch(error){
        console.log(error)
    }
}
module.exports = RunServer;