const express = require('express')
var path = require('path');
const app = express()
const port = 3000
const mainRoute = require("./routes/articles")
const mongoose = require("mongoose") 

mongoose.connect("mongodb://localhost/blog",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
app.use(express.urlencoded({extended:false}))
app.set("view engine","ejs")
app.use("/articles",mainRoute)
app.get('/', (req, res) => {
    res.send('nothing here')
  })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})