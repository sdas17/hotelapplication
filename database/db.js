const mongoose = require('mongoose');

const mongoUrl = 'mongodb://localhost:27017/hotelsDumy';
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology:true
}) 
const db =mongoose.connection;
//three event loop 
db.on('connected',()=>{
    console.log("Connected to MogndoDb server")
}) 
db.on('error',()=>{
    console.log("error is coming")
})
db.on("disconnected",()=>{
    console.log("disconnected is coming")

})
module.exports=db;