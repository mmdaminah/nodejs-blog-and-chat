const express = require('express');
const router = express.Router();
const Blog = require('../models/blog')
router.get('/addblog',(req,res)=>{
    res.render('addBlog',{title:"Add Blog"})
})
router.post('/addblog',(req,res)=>{
    const blog = new Blog(req.body)
    blog.save()
    .then(()=>res.redirect("/"))
    .catch((err)=>console.log(err))
})
router.get('/deleteblog/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result =>{
        res.redirect("/")
    })
    .catch(err=>console.log(err))
})
router.get('/editblog/:id',(req,res)=>{
    const id = req.params.id;
    console.log(id)
    Blog.findById(id)
    .then(result=>{
        console.log(result)
        res.render('editBlog',{id:result._id,name:result.name,cardTitle:result.title,description:result.description,title:"Edit Blog",})
    })
})
router.post('/editblog/:id',(req,res)=>{
    console.log(req.body)
    console.log(req.params.id)
    Blog.findByIdAndUpdate(req.params.id,req.body)
    .then(()=>res.redirect('/'))
    .catch(err=>console.log(err))
})
module.exports = router;