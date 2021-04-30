const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const bookSchema= new Schema({
    title:{
        type: String,
        required : true
    },
    author:{
        type: String,
        required : true
    },
    price:{
        type: Number,
        required : true
    },
    rating:{
        type: Number, 
        required : true
    },
    tags:{
        type:Array,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    cover:{
        type:String,
        required:true
    }
},{timestamps:true});//passing a constructor here

//craeting a mode based on tht  object
const Book= mongoose.model('books',bookSchema);
//books is Collection
module.exports=Book;