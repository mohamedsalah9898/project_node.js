const mongoose = require('mongoose');


const blogsSchema = mongoose.Schema({
   title:{
      type : String,
      required:true,
      unique: true
   },
   text :{
      type :String
   },
   author :{
      type: String,
      required:true
   },
   userId : {
      type : mongoose.Types.ObjectId,
      ref : 'users'
   },
   photo:{
      type : String
   },
   tags: [{ type: String }]
})

const blogs = mongoose.model("blogs" , blogsSchema);
module.exports = blogs;