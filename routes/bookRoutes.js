const express=require('express');
const router=express.Router();
const Book=require("../models/book");

router.get('/',(req,res)=>{
    //res.sendFile('index.html',{root:__dirname});
    //res.render('index',{title:'Home'});
    res.redirect('/books');
})
router.get('/create',(req,res)=>{
    //res.sendFile('create.html',{root:__dirname})
    res.render('create',{title:'Add Book'});
})
router.get('/books',(req,res)=>{
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        //Book.find({author:regex})
        Book.find( { $text: { $search: regex } } )
        .then((result)=>{
            res.render('index',{title:"all books",books:result})
        }).catch((err)=>console.log(err));
    }else{
        Book.find().sort({price: 1})
        .then((result)=>{
            res.render('index',{title:"all books",books:result})
        }).catch((err)=>console.log(err));
    }
})
//For doing search
router.get('/search/:author',(req,res)=>{
    var regex=new RegExp(req.params.author,"i");
    Book.find({author:regex})
    .then((result)=>{
        res.send(result.toString());
    })
})

router.post('/books',(req,res)=>{
    const book=new Book(req.body);
    book.save()
    .then((result)=>{
        res.redirect("/books")
    }).catch((err)=>console.log(err));
})

router.get('/details/:id',(req,res)=>{
    const id=req.params.id;
    Book.findById(id)
    .then((result)=>{
        res.render('details',{book:result})
    }).catch((err)=>console.log(err))
})

router.delete('/books/:id',(req,res)=>{
    const id=req.params.id;
    //when we send fetcg request which is ajax request
    //In node we cannot use redirect as a response
    //we have to send json or text data to brouser and json data have aredirect property
    Book.findByIdAndDelete(id)
    .then((result)=>{
        console.log(result);
        res.json({redirect:"/books"})
    })
    .catch((err)=>console.log("PAge Error:",err))
})

function escapeRegex(text){
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports=router;