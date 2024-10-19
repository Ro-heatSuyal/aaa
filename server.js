const express=require('express');
const app=express();
const path = require('path')
require('dotenv').config();
const userModel=require('./models/user')

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));


app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/read',async (req,res)=>{
    let users = await userModel.find()
    res.render('read',{users})
})
app.get('/delete/:userid',async (req,res)=>{
    
    await userModel.findOneAndDelete({_id: req.params.userid})
    res.redirect('/read')

})
app.get('/edit/:userid',async (req,res)=>{
   
    let user=await userModel.findOne({_id:req.params.userid})
    res.render('edit',{user})

})
app.post('/update/:userid',async (req,res)=>{
    let {name,email,image}=req.body
    let user=await userModel.findOneAndUpdate({_id: req.params.userid},{name,email,image},{new:true})
    res.redirect('/read')

})
 
app.post('/create',async (req,res)=>{
    let {name,email,image}=req.body
    let createdUser = await userModel.create({
        name:name,
        email:email,
        image:image
    //    name,email,image
    })
    res.redirect('/read')
})

const PORT = process.env.PORT
 app.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`)})