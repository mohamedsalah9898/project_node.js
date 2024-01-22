const users = require('../models/users');

// Register
const Register = async (_userName, _password,_email, _firstName, _age) => {
   try {
      let data = await users.create({
      userName: _userName,
      password: _password,
      email:_email,
      firstName: _firstName,
      age: _age
      });
      if (data) {
      console.log("user was registered successfully");
      return data;
      
      } else {
      console.log("error");
      }
   } catch (e) {
      console.log(e);
   }
};

// Login
const Login = async (_userName) => {
   try {
      let data = await users.find({ userName: _userName});
      if (data) {
      console.log("ok login is done");
      return data;
   } else {
      console.log("no such user found")
   }
   } catch (e) {
   console.log(e);
   }
};



//getAllUsers
const getAllUsers = async () => {     //_userName
   let data = await users.find(); //{ userName: _userName }
   try {
      console.log("get all data done");
      return data;
   } catch (e) {
      console.log(e);
   }
};


// getUsersByName
const getUsersByName = async (_userName)=>{
   try{
      let data = await users.findOne({ userName : _userName})
      if(data){
         console.log("data is done ");
         return data;
      }else{
         console.log('not found')
      }
   }catch(e){
      console.log(e)
   }
};

// search
const search = async (_userName,_firstName)=>{
   try{
      let data = await users.find({$or:[{userName:_userName},{firstName:_firstName}]});
      if(data){
         console.log('data find')
         return data;
      }else{
         console.log("error find")
      }

   }catch(e){
      console.log(e)
   }
}

// follow
const followUser = async (_userId,_followerId)=>{
   try{
      let data = await users.findOneAndUpdate({_id:_userId},{$addToSet:{follow:_followerId}})
      if(data){
         console.log("user follower done");
         return data
      }else{
         console.log("can't add follower");
      }
   }catch(e){
      console.log(e)
   }
};


// unfollow 
const unfollowUser = async (_userId,_followerId)=>{
   try{
      let data = await users.findOneAndUpdate({_id:_userId},{$pull:{follow:_followerId}})
      if(data){
         console.log("unfollow successfully")
         return data;
      }else{
         console.log("can't unfollow user")
      }
   }catch(e){
      console.log(e)
   }
};








module.exports ={Register,Login,getAllUsers,getUsersByName,search,followUser,unfollowUser}