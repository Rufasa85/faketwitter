const express = require('express');
const app = express();
const db = require('./models')
const exphbs = require('express-handlebars');
const bcrypt = require("bcrypt");
const session = require("express-session");

const PORT = process.env.PORT || 3000;
 
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 7200000
    }
}))

app.use( express.static('public'));

app.post('/signup',(req,res)=>{
    db.User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }).then(userData=>{
        res.json(userData.id)
    }).catch(err=>{
        res.status(500).end();
    })
})

app.post('/login',(req,res)=>{
    db.User.findOne({
        where:{
            email:req.body.email
        }
    }).then(user=>{
        if(!user){
            return res.status(404).send("no such user")
        } else{
            if(bcrypt.compareSync(req.body.password, user.password)){
                req.session.user = {
                    id:user.id,
                    name:user.name,
                    email:user.email
                }
                res.send("login successful!");
            } else {
                res.status(401).send("wrong password");
            }
        }
    }).catch(err=>{
        return res.status(500).end();
    })
})

app.get("/readsessions",(req,res)=>{
    res.json(req.session)
})

app.get('/secretroute',(req,res)=>{
    if(req.session.user){
        res.send(`welcome to the club ${req.session.user.name}!`)
    }else {
        res.status(401).send("log in first ya knucklehead!")
    }
})

app.post("/api/blogs",(req,res)=>{
    if(!req.session.user){
        return res.status(401).send('login first jabroni!')
    }
    db.Blog.create({
        title:req.body.title,
        body:req.body.body,
        UserId:req.session.user.id
    }).then(blog=>{
        res.json(blog.id)
    }).catch(err=>{
        res.status(500)
    })
})

db.sequelize.sync({force:false}).then(function(){
    app.listen(PORT);
})