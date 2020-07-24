const router = require('express').Router();
const db = require('../models');

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
        res.render("clubhouse",req.session.user)
    }
})

module.exports = router;