const express=require("express");
const Ticket = require("../Model/ticket.model");
const authentication = require("../Middleware/authentication");
const app=express.Router()


app.use(authentication)

app.post('/create', async (req, res) => {

   let totalTicket=[]
   
   for(let x=0;x<req.body.num_tickets;x++)
   {
      let generTicket=generateTambulaTickets()
       totalTicket.push(generTicket)
   }
  
   /// console.log(totalTicket)
    const ticket = new Ticket({userId:req.body.id,tickets:totalTicket});
    await ticket.save();

    res.send({msg:"Ticket Created Successfully",ticketId:ticket._id})

  


});

  app.get('/:id', async (req, res) => {
    const { id } = req.params;
    const { page=1} = req.query;
    const skip = (page - 1) * 6;
    const tickets = await Ticket.findOne({_id:id}).select('tickets').slice('tickets', [skip, skip + 6]);  
    res.send(tickets)
    
  });

  module.exports=app



  function generateTambulaTickets() {
    const ticket = [];
  
    const numbers = [];
    while (numbers.length < 15) {
      const num = Math.floor(Math.random() * 90) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    numbers.sort((a, b) => a - b);
  
    for (let i = 0; i < 3; i++) {
      const row = numbers.slice(i * 5, i * 5 + 5);
      ticket.push(row);
    }
  

    for (let i = 0; i < ticket.length; i++) {
      while (ticket[i].length < 9) {
        ticket[i].splice(Math.floor(Math.random() * (ticket[i].length + 1)), 0, 0);
      }
    }
  
    return ticket;
  }

