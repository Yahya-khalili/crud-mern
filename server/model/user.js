
const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
      },
    email:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
      },
    adress:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
      },
    age:{
        type: Number,
        required: true,
        minlength: 3,
        maxlength: 255
      }

});
const userloginSch = mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
      },
    email:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
      },
    password:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
      },
    
});


const userModel = mongoose.model("user" , userSchema)
const userloginModel = mongoose.model("userLogin" , userloginSch)


module.exports = userModel
module.exports = userloginModel