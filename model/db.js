const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Msg', {

    useNewUrlParser: true,
    useUnifiedTopology:true,
}).then(function () {
    console.log("Connection connected Successfully");
}).catch(function () {
    console.log("Connection Fail");
})
const chatSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    msg: {
        type: String,
        required:true
    }
});

let  Chat  =  mongoose.model("Chat", chatSchema);
module.exports  = Chat;