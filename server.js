const express = require('express');
const ejs = require('ejs');
const app = express();
const mongoose = require('mongoose')

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
    res.render('blogs',{title:"Blogs"})
})
app.get('/addblog',(req,res)=>{
    res.render('addBlog',{title:"Add Blog"})
})
app.post('/addblog',(req,res)=>{
    console.log(req.body)
    res.redirect("/")
})
