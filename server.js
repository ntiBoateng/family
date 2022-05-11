const express = require("express")
const app = express()
require("dotenv").config()
const path = require("path")
const MongoClient = require("mongodb").MongoClient
const hbs = require("express-handlebars")
const bodyparser = require("body-parser")
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const PORT = process.env.PORT | 4500
const Handlebars = require("handlebars")


//database


app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.json());



//hbs template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
  extname: 'hbs', 
  defaultLayout: false, 
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  layoutsDir: __dirname + '/views/layouts/',
  // partialsDir: __dirname + '/views/partials'0595741643
}))





var uri = `mongodb+srv://m001-student:${process.env.DATABASE_PASSWORD}@family.dnnds.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
MongoClient.connect(uri,{useUnifiedTopology: true},(err,client)=>{
  if(err){
    console.error(err)
  }else{
    console.log("Mongodb Connected Successfully")



const db = client.db("family")
var commentCollection = db.collection("comment")

app.post("/comment",(req,res)=>{
  commentCollection.insertOne(req.body)
  .then(result=>{
    res.redirect("/")
  }).catch(err=>{
    console.error(err)
  })
})

app.get("/",(req,res)=>{
  // res.render("index")
commentCollection.find().toArray()
.then(result=>{
  res.render("index",{context:result})
}).catch(err=>{
  console.error(err)
})
})





  }
})




app.listen(PORT,()=>{
  console.log("Server has started already")
})