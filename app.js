const express=require('express');
const cors=require('cors');
const bookRoutes=require("./routes/bookRoutes")
const dotenv=require("dotenv");
dotenv.config({ path: __dirname+'/.env' });

const app=express();

const mongoose= require('mongoose');
const dbURI=`mongodb+srv://${process.env.db_user}:${process.env.db_password}@cluster0.r2jbq.mongodb.net/${process.env.db_name}?retryWrites=true&w=majority`;
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>{
    app.listen(3000,()=>{
        console.log("server running at port 3000");
    })
    console.log('Connected Successfully to DataBase')})
.catch((err)=>console.log(err));

//register view engine 
app.set('view engine','ejs');

//middleware and static files
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(cors());
//takes all the url encoded data from the form parses that into object that we can use on the request object
app.use(express.urlencoded({}))

//routes
app.use(bookRoutes);

/*app.use((req,res)=>{
    res.status(404).senFile("404.html",{root:__dirname})
})*/

