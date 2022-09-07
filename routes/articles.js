const express = require("express")
const router = express()
const Article = require("../Models/article")
router.get("/",async (req,res)=>{
    let article = await Article.find().sort({
        createdAt:"desc"
    })
    res.render("articles/articles",{articles:article})
})
router.get("/new",(req,res)=>{
    res.render("articles/new",{articles:new Article()})
})
router.get("/:id",async (req,res)=>{ 
    const foundArticle = await Article.findById(req.params.id)
    console.log(foundArticle)
    if(foundArticle == null) res.redirect("/articles")
    res.render("articles/show",{article:foundArticle})
})
router.post("/post",async (req,res)=>{
    let article = new Article({
    title : req.body.title,
    description: req.body.description,
    markdown :  req.body.markdown
    })
    try {
       article =  await article.save()
       res.redirect(`/articles/${article._id}`)
    } catch (error) {
       console.log(error) 
       res.render("articles/new",{articles:article})
    }
})
module.exports =  router