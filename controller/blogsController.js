const blogs = require('../models/blogs');

const createBlogs = async (_title,_text,_author,_userId,_photo,_tags) => {
   try{
      let newBlogs = await blogs.create({
         title : _title,
         text : _text,
         author : _author,
         userId : _userId,
         photo : _photo,
         tags : _tags
      });
      if(newBlogs){
         console.log("blogs create done ");
         return newBlogs;
      }else{
         console.log("error of blogs create");
      }

   }catch(e){
      console.log(e)
   }

}

const getAllBlogs = async ()=>{
   try{
      let data = await blogs.find();
      if(data){
         console.log("blogs find successfully")
         return data;
      }else{
         console.log("error");
      }
   }catch(e){
      console.log(e)
   }
}

const searchByName = async (_title)=>{
   try{
      let data = await blogs.find({
         title  : _title
      });
      if(data){
         console.log("search is done by name");
         return data ;
      }
   }catch(e){
      console.log(e)
   }
}
const searchByAuthor = async (_author)=>{
   try{
      let data = await blogs.find({
         author  : _author
      });
      if(data){
         console.log("search is done by author");
         return data ;
      }
   }catch(e){
      console.log(e)
   }
}

const searchByTags = async (_tags)=>{
   try{
      let data = await blogs.find({
         tags  : _tags
      });
      if(data){
         console.log("search is done by tags");
         return data ;
      }
   }catch(e){
      console.log(e)
   }
};

const deleteBlogs = async (_title)=>{
   try{
      let data = await blogs.deleteOne({title: _title});
      if(data){
         console.log("blogs has been deleted");
      }else{
         console.log("no such blogs found")
      }
   }catch(e){
      console.log(e);
   }
}

const editBlogs = async (_title, _newTitle)=>{
   try{
      let data = await blogs.updateOne(
         { title: _title },
         { $set: { title: _newTitle } }
      );
      if(data){
         console.log('data edit done');
         return data;
      }

   }catch(e){
      console.log(e)
   }
}


module.exports ={createBlogs,getAllBlogs,searchByName,searchByAuthor,searchByTags,deleteBlogs,editBlogs};