const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 6080;
// const users = require('./models/users');
// const blogs = require('./models/blogs');
// const blogsController = require('./controller/blogsController');
// const userController = require('./controller/usersController');
const blogsRouter = require('./Router/blogsRouter');
const usersRouter = require('./Router/usersRouter');


mongoose.connect("mongodb://127.0.0.1:27017/blogging").then(() => {
      console.log("connect to db");
   })
   .catch((err) => {
      console.log(err);
   });
   
   app.use(express.urlencoded({ extended: true }));
   
   app.use("/blogs", blogsRouter);
   app.use('/users',usersRouter);


// blogsController.searchByName("day7");
// userController.getUsersByName("mohamed salah 2");
// blogsController.searchByTags("yyyygygv");
// blogsController.searchByAuthor('65ad8b5c4c7ff5a2cff5fbd0');
// blogsController.createBlogs("day8","hi in day 2" ,"65ad8b5c4c7ff5a2cff5fbd0","kknscniciencienci",["kkkkk","yyyygygv"]);

// users.create({userName:"mohamed salah 3",password:123456780,email : "mohamed98salah@gmail.com",firstName:"mohamed1" ,age : 25,follow :["65adc431fd76f3d13d1f50dd","65adc6099c3ed3fac40f252b"]}).then(data =>{
//    blogsController.createBlogs("day2","hi in day 1" ,"mosalah",data._id,"kknscniciencienci",["kkkkk","yyyygygv"]);
// })

// blogs.create({title:"day1",text :"hi in day 1" ,tags:["mmmm","kkkkk"]});



   app.listen(port, () => console.log(`Example app listening on port ${port}!`))
