const router = require('express').Router();
const db = require('../models');

router.get('/',(req,res)=>{
    db.Blog.findAll({
        include:[db.User]
    }).then(blogs=>{
        console.log(blogs);
        const blogsJSON = blogs.map(function(blogObj){
            return blogObj.toJSON();
        })
        console.log("---------")
        console.log(blogsJSON);
        // res.json(blogs);
        res.render("index",{blogs:blogsJSON})
    })
})

router.get("/profile/:id",(req,res)=>{
    db.User.findOne({
        where:{
            id:req.params.id
        },
        include:[db.Blog]
    }).then(dbUser=>{
        const hbsUser = dbUser.toJSON();
        res.render("profile",hbsUser)
    })
})

router.get('/signup',(req,res)=>{
    res.render('signup')
})
router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/clubhouse',(req,res)=>{
    if(!req.session.user){
        res.redirect('/login')
    } else {
        db.User.findOne({
            where:{
                id:req.session.user.id
            },
            include:[db.Blog]
        }).then(userObj=>{
            // res.json(userObj);
            console.log(userObj)
            const userObjJSON = userObj.toJSON();
            console.log('-------------')
            console.log(userObjJSON)
            res.render("clubhouse",userObjJSON)
        })
    }
})

module.exports = router;