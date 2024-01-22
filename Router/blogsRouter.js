const express = require('express');
const router = express.Router();
const blogsController = require('../controller/blogsController');
const path = require('path')
const multer = require('multer');
const storage = multer.diskStorage({
   destination: function (req, file, cb){
      cb(null, path.join(__dirname,"uploadeImg"))
   },
   filename:function(req,file,cb){
      cb(null, Date() + file.originalname)
   }
})

const upload = multer({storage: storage});



router.get("/", (req , res)=>{
   res.send("hi mohamed");
});

router.post("/postBlogs", upload.single('file'),async (req, res)=>{
   try{
      let photo = req.file;
      let {title,text,author,userId,tags}=req.body
      let data = await  blogsController.createBlogs(title,text,author,userId,photo,tags);
      if(data !="error"){
         res.status(200).json({
            blogs: data,
            msg: "ok",
            status: "success"
         })
      }else{
         res.status(403).send("not create blogs")
      }
   }catch(e){
      console.log(e)
   }
});



router.get("/get-all-blogs", async (req,res)=>{
   try{
      let data= await  blogsController.getAllBlogs();
      if(data != "error"){
         res.status(200).json({
            blogs: data,
            msg: "ok",
            status: "success"
         })
      }else{
         res.status(403).send("not found");
      }
   }catch(e){
      console.log(e)
   }

});

router.get("/get-all-blogs/:name", async (req, res) => {
   try {
      let name = req.params.name
   let data = await blogsController.searchByName(name);
      if (data != "error") {
      res.json({
         blogs: data,
         msg: "ok",
         status: 200,
         });
      } else {
      res.status(403).send("not found");
      }
   } catch (e) {
      console.log(e);
      }
});

router.get("/get-blogsByAuthor/:author", async (req, res) => {
   try {
      let author = req.params.author
   let data = await blogsController.searchByAuthor(author);
      if (data != "error") {
         console.log("object")
      res.json({
         blogs: data,
         msg: "ok",
         status: 200,
         });
      } else {
      res.status(403).send("not found");
      }
   } catch (e) {
      console.log(e);
      }
});


router.get("/get-blogsByTags/:tags", async (req, res) => {
   try {
      let tags = req.params.tags
   let data = await blogsController.searchByTags(tags);
      if (data != "error") {
      res.json({
         blogs: data,
         msg: "ok",
         status: 200,
         });
      } else {
      res.status(403).send("not found");
      }
   } catch (e) {
      console.log(e);
      }
});

router.post('/deleteBlogs', async (req, res)=>{
   try{
      const { title } = req.body;
      let data = blogsController.deleteBlogs(title);
      res.send('blogs is delete');
   }catch(e){
      console.log(e)
   }
})

router.post('editBlogs', async (req , res ) =>{
   try{
      let {oldTitle,newTitle}=req.body;
      let data = blogsController.editBlogs(oldTitle,newTitle);
      res.send("data edit true");
   }catch(e){
      console.log(e);
   }
})

module.exports = router;