# Tambula ticket 

## Registation your Self  (/user/register)   
email and password required  {email:"rishunayak22@gmail.com","password:rishu"}

## Login (/user/login)
email and password required  {email:"rishunayak22@gmail.com","password:rishu"}


## Create Ticket  (/tickets/create) 
Pass token in headers {token:"you will get token after login"}
Pass in body {num_tickets:3} to create ticket and get the ticketId Number
 
## Get Details about the Single TicketID  (/tickets/:id?page=1)
Pass token in headers {token:"you will get token after login"}
