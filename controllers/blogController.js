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

router.delete("/:id",(req,res)=>{
    if(!req.session.user){
        return res.status(401).send('login first jabroni!')
    } else{
        db.Blog.findOne({
            where:{
                id:req.params.id
            }
        }).then(twine=>{
            if(req.session.user.id!==twine.UserId){
                return res.status(401).send('not your tweet')
            } else{
                db.Blog.destroy({
                    where:{
                        id:req.params.id
                    }
                }).then(deleted=>{
                    res.json(deleted)
                }).catch(err=>{
                    res.status(500).end()
                })
            }
        })
    }
})

module.exports = router