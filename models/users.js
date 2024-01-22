const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
   
      userName: {
      type: String,
      required: true,
      unique: true
      },
      password: {
      type: String,
      required: true,
      },
      email : {
         type:String,
         required:true
      },
      firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 15
      },
      age: {
      type: Number
      },
      follow : [{type:mongoose.Types.ObjectId,
      ref : "users"
   }]
   },
   {
      strict: false,
   }
);

const users = mongoose.model("users", usersSchema);

module.exports = users