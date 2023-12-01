var express = require('express');
var router = express.Router();
//const { router } = require('../config/app');
let Book = require('../models/Bio_books');

module.exports.DislayBooklist = async (req,res,next)=>{ //< Mark function as async
    try{
       const BookList = await Book.find(); //< Use of await keyword
       res.render('book/list', {
          title: 'Grocery List', 
          BookList: BookList,
          displayName: req.user ? req.user.displayName:''
       });
    }catch(err){
       console.error(err);
       //Handle error
       res.render('book/list', {
          error: 'Error on server'
       });
    }
 };

 module.exports.AddBook = async (req,res,next)=>{
    try{
        res.render('book/add',
        {
            title:'Add Item',
            displayName: req.user ? req.user.displayName:''
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('book/list',
        {
            error: 'Error on the server'
        });
    }
};

module.exports.ProcessBook = async (req,res,next)=>{
    try{
        let newBook = Book({
            "Item":req.body.Item,
            "Cost": req.body.Cost,
            "Quantity": req.body.Quantity,
            "Total": req.body.Total,
        });
        Book.create(newBook).then(() =>{
            res.redirect('/Groceries')
        })
    }
    catch(error){
        console.error(err);
        res.render('book/list',
        {
            error: 'Error on the server'
        });
    }
};

module.exports.EditBook = async (req,res,next)=>{
    try{
    const id = req.params.id;
    const bookToEdit = await Book.findById(id);
    res.render('book/edit',
    {
        title:'Edit Item',
        displayName: req.user ? req.user.displayName:'',
        Book:bookToEdit
    })
}
catch(error){
    console.error(err);
    res.render('book/list',
    {
        error: 'Error on the server'
    });
}
}

module.exports.ProcessEditBook = (req,res,next)=>{
    try{
        const id = req.params.id;
        let updatedBook = Book({
            "_id":id,
            "Item":req.body.Item,
            "Cost": req.body.Cost,
            "Quantity": req.body.Quantity,
            "Total": req.body.Total,
        });
        Book.findByIdAndUpdate(id,updatedBook).then(()=>{
            res.redirect('/Groceries')
        });
    }
    catch(error){
        console.error(err);
        res.render('book/list',
        {
            error: 'Error on the server'
        });
    }
}

module.exports.DeleteBook = (req,res,next)=>{
    try{
        let id = req.params.id;
        Book.deleteOne({_id:id}).then(() =>
        {
            res.redirect('/Groceries')
        })
    }
    catch(error){
        console.error(err);
        res.render('book/list',
        {
            error: 'Error on the server'
        });
    }
}