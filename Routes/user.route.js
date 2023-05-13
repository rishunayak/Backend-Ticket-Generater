const express=require("express")
const User = require("../Model/user.model")
const authentication = require("../Middleware/authentication")
const bcrypt =require ("bcrypt");
const jwt = require('jsonwebtoken');
const app=express.Router()


app.post("/register",async(req,res)=>
{

    const {email,password}=req.body

    try
    {
        const exist=await User.findOne({email:email})
         
        if(exist)
        {
        
            res.send("User Alredy Register")
        }
        else
        { 
            bcrypt.hash(password, 5, async(err, hashPassword)=> {
                    
                if(err)
                {
                    res.send(err)
                }
                else
                {
                    try
                    {
                        await User.create({email,password:hashPassword})
                        res.send({msg:"Successfully Registered"})
                    }
                    catch(e)
                    {
                       res.send(e)
                    }
                }
            });

        }
    }
    catch(e)
    {
        res.send(e)
     console.log(e)
    }

    

})






app.post("/login",async(req,res)=>
{
    const {email,password}=req.body
    
    try
    {
        const exist=await User.findOne({email:email})
  
        if(exist)
        {
            bcrypt.compare(password,exist.password, function(err, result) {
                if(result)
                { 
                    console.log(exist._id);
                    const token=jwt.sign({ id: exist._id }, 'auth');
                    res.send({token:token})
                   
                }
                else{
                    res.send("Wrong Credntials")
                    
                   }
            });
        }
        else
        {
            res.send("Email Doesn't Exist")
        }
    }
    catch(e)
    {
        res.send(e);
    }
})

app.use(authentication)

app.get("/",async(req,res)=>
{
    const id=req.body.id

    try
    {
        const userData=await User.findOne({_id:id})
        res.send(userData)
    }
    catch(e)
    {
        res.send(e)
    }

})

module.exports=app