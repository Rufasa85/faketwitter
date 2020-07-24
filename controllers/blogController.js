const router = require("express").Router()
const db = require("../models");

router.post("/",(req,res)=>{
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

module.exports = router