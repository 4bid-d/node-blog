const mongoose = require("mongoose")
const marked = require("marked")
const slugify = require("slugify")
let articleSchema= new mongoose.Schema({
    title:{
        required:true,
        type:String     
    },
    description:{
        type:String     
    },
    markdown:{
    required:true,
    type:String     
    },
    createdOn:{
        type:Date, 
        default:new Date()
    },
    slug:{
        type:String,
        required:true,
        unique:true
    }
})

articleSchema.pre("validate",(next)=>{
if(this.title){
    this.slug =  slugify(this.title,{
        lower:true,
        strict:true
    })
}
console.log(this)
next()
})

module.exports = mongoose.model("Article",articleSchema)