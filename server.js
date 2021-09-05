const express = require('express');
const ejs = require('ejs');
const app = express();
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const blogRoutes = require('./routes/blogRoutes')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

//db connect
const dbURI = "mongodb+srv://mmdamin:12341234@blogs.ujn72.mongodb.net/blogs?retryWrites=true&w=majority"
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("connected to the db");
    server.listen(3000,()=>console.log("server running on port 3000"))
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
//blog Routes
app.use(blogRoutes)
//chat Routes
app.get('/chat',(req,res)=>{
    res.render('chat')
})
app.get('/chat/login', (req,res)=>{
    res.render('chatLogin')
})
io.on('connection',(socket)=>{
    console.log("a user connected")
    socket.on('disconnect',()=>{
        console.log('user disconnected')
    })
    socket.on('chat message',(msg)=>{
        console.log(msg);
        io.emit('chat message', msg)
    })
})