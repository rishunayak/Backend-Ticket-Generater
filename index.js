require("dotenv").config()
const express=require("express")
const cors=require("cors")
const connect=require("./Config/Config")


const user=require("./Routes/user.route")
const ticket=require("./Routes/ticket.route")
//routes


const app=express()

app.use(express.json())
app.use(cors())



app.use("/user",user)
app.use("/tickets",ticket)
//route use






app.get("/",(req,res)=>
{
    res.send("Welecome to server")
})


app.listen(process.env.PORT,async()=>
{
    await connect
    console.log("Server started")
})