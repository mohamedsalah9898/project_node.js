const express = require('express');
const router = express.Router();
const usersController = require('../controller/usersController');
const bcrypt = require('bcrypt');

router.get('/',(req,res)=>{
   res.send('user router');
});



router.get('/get-all-users', async (req, res)=>{
   try{
      let data= await usersController.getAllUsers()
      if(data !="error"){
         res.json({
            users:data,
            massage : "ok",
            status: "sucssecfly"
         });
      }else{
         res.status(200).send("users not found");
      }
   }catch(e){
      console.log(e)
   }
});


router.post("/register", async (req,res)=>{
   let {userName , password ,email, firstName,age} = req.body
   bcrypt.hash(password,10,async function(err,hash){
      let data = await usersController.Register(userName , hash ,email, firstName,age);
      console.log(data);
      res.send('data is saved successfully');
   })
})

// router.post('/login' , async (req, res)=>{
//    try{
//    let {userName,password}=req.body

//    let data = await usersController.Login(userName ,password);
//    console.log(data);
//    bcrypt.compare(password , data ,(err , result)=>{
//       if (result) {
//          res.send("data is true");
//       } else {
//          res.send("password is incorrect");
//       }
//       console.log(result);
      
//    })
//    }catch(e){
//       console.log(e)
//    }
// })



router.get("/getUsersByName/:name" , async (req , res)=>{
   try{
      let name  = req.params.name;
      let data = await usersController.getUsersByName(name);
      // console.log(data)
      if(data != "error"){
         res.json({
            user: data,
            msg: "ok",
            status: 200
         })
      }else{
         res.status(403).send('not found');
      }
   }catch(e){
      console.log(e)
   };
});



router.get("/search", async(req , res)=>{
   try{
      let {userName,firstName}= req.body
   let data = await usersController.search(userName,firstName);
   if(data !="error"){
      res.json({
         user: data,
         msg: "ok",
         status: 200
      })
   }else{
      res.status(403).send('not found')
   }
   }catch(e){
      console.log(e)
   }
});



router.post("/follow", async (req,res)=>{
   try{
      let {userId,followId}= req.body;
      let data = await usersController.followUser(userId,followId);
      if(data !="error"){
         res.json({
            user: data,
            msg: "ok",
            status: 200
         })
      }else{
         res.status(403).send('not found');
      }

   }catch(e){
      console.log(e)
   }
});
router.post("/unfollow", async (req,res)=>{
   try{
      let {userId,followId} = req.body;
      let data = await usersController.unfollowUser(userId,followId);
      if(data !="error"){
         res.json({
            user: data,
            msg: "ok",
            status: 200
         })
      }else{
         res.status(403).send('not found');
      }

   }catch(e){
      console.log(e)
   }

});


module.exports = router;
