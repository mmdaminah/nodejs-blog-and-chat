const express = require('express');
const ejs = require('ejs');
const app = express();
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const dbURI = "mongodb+srv://mmdamin:12341234@blogs.ujn72.mongodb.net/blogs?retryWrites=true&w=majority"
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("connected to the db");
    app.listen(3000,()=>console.log("server running on port 3000"))
})
.catch((err)=>{
    console.log(err)
})
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    Blog.find().sort({createdAt:-1})
    .then(result=>{
        res.render('blogs',{title:"Blogs",blogs:result})
    })
    .catch(err=>console.log(err))
})
app.get('/addblog',(req,res)=>{
    res.render('addBlog',{title:"Add Blog"})
})
app.post('/addblog',(req,res)=>{
    const blog = new Blog(req.body)
    blog.save()
    .then(()=>res.redirect("/"))
    .catch((err)=>console.log(err))
})
app.get('/deleteblog/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result =>{
        res.redirect("/")
    })
    .catch(err=>console.log(err))
})
app.get('/editblog/:id',(req,res)=>{
    const id = req.params.id;
    console.log(id)
    Blog.findById(id)
    .then(result=>{
        console.log(result)
        res.render('editBlog',{id:result._id,name:result.name,cardTitle:result.title,description:result.description,title:"Edit Blog",})
    })
})
app.post('/editblog/:id',(req,res)=>{
    console.log(req.body)
    console.log(req.params.id)
    Blog.findByIdAndUpdate(req.params.id,req.body)
    .then(()=>res.redirect('/'))
    .catch(err=>console.log(err))
})